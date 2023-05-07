import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { StoreService } from "../../store/store.service";

@Component({
  selector: 'time-ranges',
  templateUrl: './time-ranges.component.html',
  styleUrls: ['./time-ranges.component.scss']
})
export class TimeRangesComponent implements OnInit{

  form: FormGroup;

  constructor(private store: StoreService) {}

  public ngOnInit(): void {
    this.initForm();
    this.initDataHandle();
  }

  public onSave(): void {
    this.store.setTimeRanges(this.form.value);
  }

  private initForm(): void {
    this.form = new FormGroup({
      taskOneDuration: new FormControl<string>( null, [Validators.required, Validators.pattern('^\\d{2}:\\d{2}\\.\\d{3}$')]),
      taskTwoDuration: new FormControl<string>( null, [Validators.required, Validators.pattern('^\\d{2}:\\d{2}\\.\\d{3}$')]),
      taskThreeDuration: new FormControl<string>( null, [Validators.required, Validators.pattern('^\\d{2}:\\d{2}\\.\\d{3}$')]),
      taskFourDuration: new FormControl<string>( null, [Validators.required, Validators.pattern('^\\d{2}:\\d{2}\\.\\d{3}$')]),
      taskFiveDuration: new FormControl<string>( null, [Validators.required, Validators.pattern('^\\d{2}:\\d{2}\\.\\d{3}$')]),
    })
  }

  private initDataHandle(): void {
    this.form.valueChanges
      .subscribe( () => this.store.setTimestampRangesFormValidation(this.form.valid))
  }
}
