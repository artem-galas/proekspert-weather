import { Component } from '@angular/core';

@Component({
  selector: 'prw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  selectedCity: number | string = parseInt(localStorage.getItem('prw-city'), 10);
}
