import { Directive, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[dropzone]'
})
export class DropzoneDirective {
  @Output() dropped = new EventEmitter<File>();
  @Output() hovered = new EventEmitter<boolean>();

  @HostListener('drop', ['$event'])
  private onDrop($event) {
    $event.preventDefault();
    this.dropped.emit($event.dataTransfer.files[0]);
    this.hovered.emit(false);
  }

  @HostListener('dragover', ['$event'])
  private onDragOver($event) {
    $event.preventDefault();
    this.hovered.emit(true);
  }

  @HostListener('dragleave', ['$event'])
  private onDragLeave($event) {
    $event.preventDefault();
    this.hovered.emit(false);
  }
}
