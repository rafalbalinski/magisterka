import { Component } from '@angular/core';
import { StoreService } from "../../store/store.service";

@Component({
  selector: 'results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent {

  constructor(public store: StoreService) {}

  public calculate(): void {
    this.store.calculateNumberOfBlinks();
    this.store.calculateAverageFixationTimes();
  }

}
