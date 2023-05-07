import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Blink } from "../models/blink";
import { Fixation } from "../models/fixation";
import { StringTimeRanges } from "../models/string-time-ranges";
import { TimeRanges } from "../models/time-ranges";
import { Utils } from "../components/utils/utils";
import { NumberOfBlinks } from "../models/number-of-blinks";
import { AverageFixationTimes } from "../models/average-fixation-times";

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  readonly timestamp: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  readonly timestampRanges: BehaviorSubject<TimeRanges> = new BehaviorSubject<TimeRanges>(undefined);
  readonly blinks: BehaviorSubject<Blink[]> = new BehaviorSubject<Blink[]>([]);
  readonly fixations: BehaviorSubject<Fixation[]> = new BehaviorSubject<Fixation[]>([]);

  readonly timestampRangesFormValidation: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  readonly timestampFormValidation: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  readonly numberOfBlinks: BehaviorSubject<NumberOfBlinks> = new BehaviorSubject<NumberOfBlinks>({taskOne: 0, taskTwo: 0, taskThree: 0, taskFour: 0, taskFive: 0});
  readonly averageFixationTimes: BehaviorSubject<AverageFixationTimes> = new BehaviorSubject<AverageFixationTimes>({taskOne: '00:00.00', taskTwo: '00:00.00', taskThree: '00:00.00', taskFour: '00:00.00', taskFive: '00:00.00'});

  public setDate(dateString: string): void {
    const [date, time] = dateString.split('_');
    const [year, month, day] = date.split('-');
    const [hour, minute, second] = time.split(':');
    const dateObj = new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute), Number(second));
    const timestamp = dateObj.getTime() * 1000000;
    this.timestamp.next(timestamp);
  }

  public setTimeRanges(stringTimeRanges: StringTimeRanges): void {
    this.timestampRanges.next({
      taskOneDuration: Utils.getNanoSeconds(stringTimeRanges.taskOneDuration),
      taskTwoDuration: Utils.getNanoSeconds(stringTimeRanges.taskTwoDuration),
      taskThreeDuration: Utils.getNanoSeconds(stringTimeRanges.taskThreeDuration),
      taskFourDuration: Utils.getNanoSeconds(stringTimeRanges.taskFourDuration),
      taskFiveDuration: Utils.getNanoSeconds(stringTimeRanges.taskFiveDuration),
    })
  }

  public setBlinkingFile(file: File): void {
    const reader: FileReader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      const csvData: string = reader.result as string;
      const rows: string[] = csvData.split('\n');
      rows.forEach((row: string) => {
        const rowCells: string[] = row.split(',');
        const blink: Blink = {
          sectionId: rowCells[0],
          recordingId: rowCells[1],
          blinkId: rowCells[2],
          startTimestamp: Number(rowCells[3]),
          endTimestamp: Number(rowCells[4]),
          duration: Number(rowCells[5]),
        };
        this.blinks.value.push(blink);
      })
    };
  }

  public setFixationsFile(file: File): void {
    const reader: FileReader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      const csvData: string = reader.result as string;
      const rows: string[] = csvData.split('\n');
      rows.forEach((row: string) => {
        const rowCells: string[] = row.split(',');
        const fixation: Fixation = {
          sectionId: rowCells[0],
          recordingId: rowCells[1],
          fixationId: rowCells[2],
          startTimestamp: Number(rowCells[3]),
          endTimestamp: Number(rowCells[4]),
          duration: Number(rowCells[5]),
        };
        this.fixations.value.push(fixation);
      })
    };
  }

  public setTimestampRangesFormValidation(validation: boolean): void {
    this.timestampRangesFormValidation.next(validation);
  }

  public setTimestampFormValidation(validation: boolean): void {
    this.timestampFormValidation.next(validation);
  }

  public calculateNumberOfBlinks(): void {
    const taskOneEndTime = this.timestamp.value + this.timestampRanges.value.taskOneDuration;
    const taskTwoEndTime = taskOneEndTime + this.timestampRanges.value.taskTwoDuration;
    const taskThreeEndTime = taskTwoEndTime + this.timestampRanges.value.taskThreeDuration;
    const taskFourEndTime = taskThreeEndTime + this.timestampRanges.value.taskFourDuration;
    const taskFiveEndTime = taskFourEndTime + this.timestampRanges.value.taskFiveDuration;

    this.numberOfBlinks.next({
      taskOne: this.blinks.value.filter( (blink: Blink) => blink.startTimestamp >= this.timestamp.value && blink.startTimestamp < taskOneEndTime).length,
      taskTwo: this.blinks.value.filter( (blink: Blink) => blink.startTimestamp >= taskOneEndTime && blink.startTimestamp < taskTwoEndTime).length,
      taskThree: this.blinks.value.filter( (blink: Blink) => blink.startTimestamp >= taskTwoEndTime && blink.startTimestamp < taskThreeEndTime).length,
      taskFour: this.blinks.value.filter( (blink: Blink) => blink.startTimestamp >= taskThreeEndTime && blink.startTimestamp < taskFourEndTime).length,
      taskFive: this.blinks.value.filter( (blink: Blink) => blink.startTimestamp >= taskFourEndTime && blink.startTimestamp < taskFiveEndTime).length
    })

  }

  public calculateAverageFixationTimes(): void {
    const taskOneEndTime = this.timestamp.value + this.timestampRanges.value.taskOneDuration;
    const taskTwoEndTime = taskOneEndTime + this.timestampRanges.value.taskTwoDuration;
    const taskThreeEndTime = taskTwoEndTime + this.timestampRanges.value.taskThreeDuration;
    const taskFourEndTime = taskThreeEndTime + this.timestampRanges.value.taskFourDuration;
    const taskFiveEndTime = taskFourEndTime + this.timestampRanges.value.taskFiveDuration;

    const taskOneFixations: Fixation[] = this.fixations.value.filter( (fixation: Fixation) => fixation.startTimestamp >= this.timestamp.value && fixation.startTimestamp < taskOneEndTime)
    const taskTwoFixations: Fixation[] = this.fixations.value.filter( (fixation: Fixation) => fixation.startTimestamp >= taskOneEndTime && fixation.startTimestamp < taskTwoEndTime)
    const taskThreeFixations: Fixation[] = this.fixations.value.filter( (fixation: Fixation) => fixation.startTimestamp >= taskTwoEndTime && fixation.startTimestamp < taskThreeEndTime)
    const taskFourFixations: Fixation[] = this.fixations.value.filter( (fixation: Fixation) => fixation.startTimestamp >= taskThreeEndTime && fixation.startTimestamp < taskFourEndTime)
    const taskFiveFixations: Fixation[] = this.fixations.value.filter( (fixation: Fixation) => fixation.startTimestamp >= taskFourEndTime && fixation.startTimestamp < taskFiveEndTime)

    this.averageFixationTimes.next({
      taskOne: Utils.calculateAverageFixationTimes(taskOneFixations),
      taskTwo: Utils.calculateAverageFixationTimes(taskTwoFixations),
      taskThree: Utils.calculateAverageFixationTimes(taskThreeFixations),
      taskFour: Utils.calculateAverageFixationTimes(taskFourFixations),
      taskFive: Utils.calculateAverageFixationTimes(taskFiveFixations),
    })
  }
}
