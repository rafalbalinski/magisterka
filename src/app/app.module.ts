import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ResultsComponent } from "./components/results/results.component";
import { FileUploaderComponent } from "./components/file-uploader/file-uploader.component";
import { DropzoneDirective } from "./directives/dropzone.directive";
import { MatIconModule } from "@angular/material/icon";
import { TimeRangesComponent } from "./components/time-ranges/time-ranges.component";
import { MatTableModule } from "@angular/material/table";

const material = [
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatIconModule,
  MatTableModule,
]

@NgModule({
  declarations: [
    AppComponent,
    ResultsComponent,
    FileUploaderComponent,
    DropzoneDirective,
    TimeRangesComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        material,
        ReactiveFormsModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
