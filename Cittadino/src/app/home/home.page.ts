import {Component, Injectable, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Uid } from '@ionic-native/uid/ngx';
import {AndroidPermissions} from '@ionic-native/android-permissions/ngx';
import {HttpClient} from '@angular/common/http';
import {Apiconfig} from '../ApiConfig';
import {Observable} from 'rxjs';
import {Richiesta} from '../DataModel/Richiesta';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

@Injectable({ providedIn: 'root' })
export class HomePage implements OnInit {
  public richiesta: Richiesta;
  urlCheckRichiesta = Apiconfig.url + 'richiesta/get/cittadino/';
  POLIZIA = 1;
  CARABINIERI = 2;
  PARAMEDICI = 3;
  POMPIERI = 4;
  private autoSaveInterval: number = setInterval( () => { this.getRichiesta(); }, 5000);
  constructor(private router: Router,
              private uid: Uid,
              private androidPermissions: AndroidPermissions,
              private http: HttpClient,
  ) {

  }
  ngOnInit(): void {
  }

  ionViewWillEnter() {
    this.getImeiPermission();
    this.getCameraPermission();
  }
  goToAllega(forzaDellOrdine) {
    this.router.navigate(['/allega-files'], { state: { example: forzaDellOrdine } });
  }
  goToStatistiche() {
    this.router.navigate(['/cittadino-statistiche']);
  }

  getCameraPermission() {
    this.androidPermissions.checkPermission(
        this.androidPermissions.PERMISSION.CAMERA
    ).then(res => {
      if (res.hasPermission) {

      } else {
        // tslint:disable-next-line:no-shadowed-variable
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA).then(res => {
          // alert('Persmission Granted Please Restart App!');
        }).catch(error => {
          alert('Error! ' + error);
        });
      }
    }).catch(error => {
      alert('Error! ' + error);
    });
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

  getRichiesta() {
    const richiesta = this.http.get(this.urlCheckRichiesta + this.uid.IMEI) as Observable<Richiesta[]>;
    richiesta.subscribe((response) =>  this.richiesta = response[0]);
  }

  richiestaDisabled(): boolean {
    return !(!this.richiesta);
  }

  tempoStimatoFormattato(): string {
    return (Math.round(((this.richiesta.tempoDiArrivo / 60) + Number.EPSILON) * 100) / 100).toString();
  }
}
