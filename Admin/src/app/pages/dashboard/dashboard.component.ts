import { Component, OnInit } from '@angular/core';
import {faTrafficLight} from '@fortawesome/free-solid-svg-icons';

import Chart from 'chart.js';
import {RichiesteService} from '../../backend/Richieste/services/RichiesteService';


@Component({
    selector: 'app-dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})


export class DashboardComponent implements OnInit {
  faTrafficLight = faTrafficLight;

  public canvas: any;
  public ctx;
  public chartColor;
  public chartEmail;
  public chartHours;
  public n_richieste: number;
  public n_vetture: number;
  public n_green_line: number;

    constructor(private richiesteService: RichiesteService) {
    }

    ngOnInit() {
      this.richiesteService.getStatistiche().subscribe((statistiche) => {
        this.n_richieste = statistiche.n_richieste;
        this.n_vetture = statistiche.n_vetture;
        this.n_green_line = statistiche.n_green_line;

        this.chartColor = '#FFFFFF';

        this.canvas = document.getElementById('chartHours');
        this.ctx = this.canvas.getContext('2d');

        this.chartHours = new Chart(this.ctx, {
          type: 'line',

          data: {
            labels: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'],
            datasets: [{
              borderColor: '#6bd098',
              backgroundColor: '#6bd098',
              pointRadius: 0,
              pointHoverRadius: 0,
              borderWidth: 3,
              data: statistiche.tempi_di_arrivo
            },
            ]
          },
          options: {
            legend: {
              display: false
            },

            tooltips: {
              enabled: true
            },

            scales: {
              yAxes: [{

                ticks: {
                  fontColor: '#9f9f9f',
                  beginAtZero: true,
                  maxTicksLimit: 5,
                  // padding: 20
                },
                gridLines: {
                  drawBorder: false,
                  zeroLineColor: '#ccc',
                  color: 'rgba(255,255,255,0.05)'
                }

              }],

              xAxes: [{
                barPercentage: 1.6,
                gridLines: {
                  drawBorder: false,
                  color: 'rgba(255,255,255,0.1)',
                  zeroLineColor: 'transparent',
                  display: false,
                },
                ticks: {
                  padding: 20,
                  fontColor: '#9f9f9f'
                }
              }]
            },
          }
        });


        this.canvas = document.getElementById('chartEmail');
        this.ctx = this.canvas.getContext('2d');
        this.chartEmail = new Chart(this.ctx, {
          type: 'pie',
          data: {
            labels: ['Paramedici', 'Polizia', 'Carabinieri', 'Pompieri'],
            datasets: [{
              label: 'Emails',
              pointRadius: 0,
              pointHoverRadius: 0,
              backgroundColor: [
                '#e3e3e3',
                '#4acccd',
                '#fcc468',
                '#ef8157'
              ],
              borderWidth: 0,
              data: [statistiche.n_paramedici, statistiche.n_polizia, statistiche.n_carabinieri, statistiche.n_pompieri]
            }]
          },

          options: {
            legend: {
              display: false
            },
            tooltips: {
              enabled: true,
              mode: 'single',
              callbacks: {
                label: function(tooltipItem, data) {
                  const allData = data.datasets[tooltipItem.datasetIndex].data;
                  const tooltipLabel = data.labels[tooltipItem.index];
                  const tooltipData = allData[tooltipItem.index];
                  return tooltipLabel + ': ' + tooltipData + ' richieste';
                }
              }
            }
          }
        });

        const speedCanvas = document.getElementById('speedChart');

        const dataFirst = {
          data: statistiche.richieste_mensili,
          fill: false,
          borderColor: '#fbc658',
          backgroundColor: 'transparent',
          pointBorderColor: '#fbc658',
          pointRadius: 4,
          pointHoverRadius: 4,
          pointBorderWidth: 8,
        };

        const dataSecond = {
          data: statistiche.green_line_mensili,
          fill: false,
          borderColor: '#51CACF',
          backgroundColor: 'transparent',
          pointBorderColor: '#51CACF',
          pointRadius: 4,
          pointHoverRadius: 4,
          pointBorderWidth: 8
        };

        const speedData = {
          labels: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'],
          datasets: [dataFirst, dataSecond]
        };

        const chartOptions = {
          legend: {
            display: false,
            position: 'top'
          }
        };

        const lineChart = new Chart(speedCanvas, {
          type: 'line',
          hover: false,
          data: speedData,
          options: chartOptions
        });
      });
    }
}
