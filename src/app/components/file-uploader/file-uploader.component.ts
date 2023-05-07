import { Component, OnInit } from '@angular/core';
import { StoreService } from "../../store/store.service";
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit{

  isHovered: boolean = false;
  dateFormField: FormControl = new FormControl<string>(null, [Validators.required, Validators.pattern('^(\\d{4})-(\\d{2})-(\\d{2})_(\\d{2}):(\\d{2}):(\\d{2})$')])

  constructor(public store: StoreService) {}

  public ngOnInit(): void {
    this.initDataHandle();
  }

  public onDropzoneHover(event: boolean): void {
    this.isHovered = event;
  }

  public onBlinkingFileDrop(file: File): void {
    this.store.setBlinkingFile(file);
  }

  public onFixationsBlinkingFileDrop(file: File): void {
    this.store.setFixationsFile(file);
  }

  public onSave(): void {
    this.store.setDate(this.dateFormField.value)
  }

  private initDataHandle(): void {
    this.dateFormField.valueChanges
      .subscribe( () => this.store.setTimestampFormValidation(this.dateFormField.valid))
  }
}
