import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Uid } from '@ionic-native/uid/ngx';
import {AndroidPermissions} from '@ionic-native/android-permissions/ngx';
import {LocationAccuracy} from '@ionic-native/location-accuracy/ngx';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  POLIZIA = 1;
  CARABINIERI = 2;
  PARAMEDICI = 3;
  POMPIERI = 4;
  constructor(private router: Router,
              private uid: Uid,
              private androidPermissions: AndroidPermissions,
              private locationAccuracy: LocationAccuracy,
  ) {
    const carabinieriButton = document.getElementById('carabinieriButton');
    const poliziaButton = document.getElementById('poliziaButton');
    const paramediciButton = document.getElementById('paramediciButton');
    const pompieriButton = document.getElementById('pompieriButton');
  }
  ngOnInit(): void {
  }
  ionViewWillEnter() {
    this.getImeiPermission();
  }
  goToAllega(forzaDellOrdine) {
    this.router.navigate(['/allega-files'], { state: { example: forzaDellOrdine } });
  }
  goToStatistiche() {
    this.router.navigate(['/cittadino-statistiche']);
  }

  getImeiPermission() {
    this.androidPermissions.checkPermission(
        this.androidPermissions.PERMISSION.READ_PHOE_STATE
    ).then(res => {
      if (res.hasPermission) {

      } else {
        // tslint:disable-next-line:no-shadowed-variable
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_PHONE_STATE).then(res => {
          // alert('Persmission Granted Please Restart App!');
        }).catch(error => {
          alert('Error! ' + error);
        });
      }
    }).catch(error => {
      alert('Error! ' + error);
    });
  }
}
