import { Component } from '@angular/core';
import { Router } from '@angular/router';

const POLIZIA = 1;
const CARABINIERI = 2;
const PARAMEDICI = 3;
const POMPIERI = 4;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router) {
    const carabinieriButton = document.getElementById('carabinieriButton');
    const poliziaButton = document.getElementById('poliziaButton');
    const paramediciButton = document.getElementById('paramediciButton');
    const pompieriButton = document.getElementById('pompieriButton');
  }
  goToAllega() {
    this.router.navigate(['/allega-files']);
  }
  goToStatistiche() {
    this.router.navigate(['/cittadino-statistiche']);
  }
}
