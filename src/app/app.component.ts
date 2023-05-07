import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  data: any[] = []

  public onClick(input: HTMLInputElement): void {
    this.uploadFileData(input);
    this.calculateBlinking();
  }

  public uploadFileData(input: HTMLInputElement): void {
    const file: File = input.files[0];
    const reader: FileReader = new FileReader();
    reader.readAsText(file);

    reader.onload = () => {
      const csvData: string = reader.result as string;
      const rows: string[] = csvData.split('\n');
      const headers: string[] = rows[0].split(',');

      for (let i = 1; i < rows.length; i++) {
        const row: string[] = rows[i].split(',');

        if (row.length === headers.length) {
          const rowData: any = {};

          for (let j = 0; j < headers.length; j++) {
            rowData[headers[j]] = row[j];
          }

          this.data.push(rowData);
        }
      }
      console.log(this.data);
    };
  }

  public calculateBlinking(): void {

  }
}
