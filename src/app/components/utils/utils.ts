import { Fixation } from "../../models/fixation";

export class Utils {
  public static getNanoSeconds(time: string): number {
    const [minutes, seconds, milliseconds] = time.match(/(\d+):(\d+)\.(\d+)/).slice(1);

    const minutesNanoseconds = parseInt(minutes) * 60000000000;
    const secondsNanoseconds = parseInt(seconds) * 1000000000;
    const millisecondsNanoseconds = parseInt(milliseconds) * 1000000;

    return minutesNanoseconds + secondsNanoseconds + millisecondsNanoseconds;
  }

  public static calculateAverageFixationTimes(fixations: Fixation[]): string {
    let duration: number = 0;
    let averageDuration = 0;

    fixations.forEach( (fixation: Fixation) => duration += fixation.duration )
    averageDuration = Math.floor(duration / fixations.length);

    const minutes = Math.floor(averageDuration / 60000);
    const seconds = Math.floor((averageDuration - minutes * 60000) / 1000);
    const milliseconds = averageDuration - (minutes * 60000) - (seconds * 1000)

    console.log('minutes', minutes)
    console.log('seconds', seconds)
    console.log('milliseconds', milliseconds)
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds}`;
  }
}
