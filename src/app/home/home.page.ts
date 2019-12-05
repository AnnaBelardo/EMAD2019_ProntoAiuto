import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Uid} from '@ionic-native/uid/ngx';
import {AndroidPermissions} from '@ionic-native/android-permissions/ngx';
import {LocationAccuracy} from '@ionic-native/location-accuracy/ngx';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

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
  ionViewWillEnter() {
    this.getImeiPermission();
  }

  goToAllega() {
    this.router.navigate(['/allega-files']);
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
          alert('Persmission Granted Please Restart App!');
        }).catch(error => {
          alert('Error! ' + error);
        });
      }
    }).catch(error => {
      alert('Error! ' + error);
    });
  }
}
