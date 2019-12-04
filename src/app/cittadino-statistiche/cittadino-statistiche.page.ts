import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-cittadino-statistiche',
  templateUrl: './cittadino-statistiche.page.html',
  styleUrls: ['./cittadino-statistiche.page.scss'],
})
export class CittadinoStatistichePage implements OnInit {

  // @ts-ignore
  @ViewChild('doughnutCanvas') doughnutCanvas: ElementRef;

  private doughnutChart: Chart;

  constructor() {}

  ngOnInit() {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Stato di ebrezza', 'Distrazione', 'Cellulari'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 23, 7],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',

            ],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
          }
        ]
      }
    });
  }
}
