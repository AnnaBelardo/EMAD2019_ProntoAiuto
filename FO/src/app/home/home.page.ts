import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {LocationAccuracy} from '@ionic-native/location-accuracy/ngx';
import {AndroidPermissions} from '@ionic-native/android-permissions/ngx';
import {Uid} from '@ionic-native/uid/ngx';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {ConnectionConfig} from '../ConnectionConfig';
import {Observable} from 'rxjs';
import {Disponibilita} from '../gestisci-richiesta/Disponibilita';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import {AlertController} from '@ionic/angular';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  urlUpdateDisp = ConnectionConfig.getBaseUrl() + '/vetture/update-disp/';
  urlPosizione = ConnectionConfig.getBaseUrl() + '/vetture/update-position/';
  urlRichiesta = ConnectionConfig.getBaseUrl() + '/richiesta/create/';
  urlDisponibilita = ConnectionConfig.getBaseUrl() + '/vetture/get-disp/';
  private autoSaveInterval: number = setInterval( () => { this.sendPostRequestPosizione(); }, 10000);
  // Per le coordinate GPS
  locationCoords: any;
  isDisponibile: any;
  forzaOrdine: string;
  isTablet: any;

  constructor(private router: Router,
              private androidPermissions: AndroidPermissions,
              private geolocation: Geolocation,
              private uid: Uid,
              private oneSignal: OneSignal,
              private http: HttpClient,
              private locationAccuracy: LocationAccuracy,
              private alertCtrl: AlertController,
              public platform: Platform) {
    this.isTablet = platform.is('tablet');
    this.locationCoords = {
      latitude: '',
      longitude: '',
      accuracy: '',
      timestamp: ''
    };
  }

  getImei() {
    alert(this.uid.IMEI);
    alert(this.locationCoords.latitude);
    alert(this.locationCoords.longitude);
  }

  ionViewWillEnter() {
     this.checkGPSPermission();
     this.getImeiPermission();
     this.getDisponibilitaDati();
  }

  getDisponibilita(): Observable<Disponibilita> {
    return this.http.get(this.urlDisponibilita + this.uid.IMEI + '/') as Observable<Disponibilita>;
  }

  getDisponibilitaDati() {
    this.getDisponibilita().subscribe(
        data => {
         this.isDisponibile = data.disponibile;
        }
    );
  }
  async alertError(errore) {
    const alert = await this.alertCtrl.create({
      header: 'Errore!',
      subHeader: errore,
      buttons: [
        {
          cssClass: 'customAlertButton',
          text: `Chiudi`,
          handler: () => {
            // E.g: Navigate to a specific screen
            alert.dismiss();
          }
        },
      ]
    });
    await  alert.present();
  }
  getLocationCoordinates() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.locationCoords.latitude = resp.coords.latitude;
      this.locationCoords.longitude = resp.coords.longitude;
      this.locationCoords.accuracy = resp.coords.accuracy;
      this.locationCoords.timestamp = resp.timestamp;
    }).catch((error) => {
      this.alertError('Error getting location ' + error);
    });
  }

  checkGPSPermission() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
        result => {
          if (result.hasPermission) {

            // Se ha i permessi mostro il pulsante per attivarlo
            this.askToTurnOnGPS();
          } else {

            // Se non ha i permessi, li chiedo
            this.requestGPSPermission();
          }
        },
        err => {
          this.alertError('Errore GPS ' + err);
        }
    );
  }

  requestGPSPermission() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        console.log('4');
      } else {
        // Finestra di dialogo per la richiesta dei permessi
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
            .then(
                () => {
                  // Metodo per attivare il GPS
                  this.askToTurnOnGPS();
                },
                error => {
                  // Se l'utente rifiuta mostro l'errore
                  this.alertError('requestPermission Error requesting location permissions ' + error);
                }
            );
      }
    });
  }

  change(event) {
    this.sendPostToUpdateDisp(this.urlUpdateDisp, this.isDisponibile);
  }

  askToTurnOnGPS() {
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
        () => {
          // Quando il GPS è ON prendo le coordinate accurate
          this.getLocationCoordinates();
        },
        error => this.alertError('Error requesting location permissions ' + JSON.stringify(error))
    );
  }



  getImeiPermission() {
    this.androidPermissions.checkPermission(
        this.androidPermissions.PERMISSION.READ_PHONE_STATE
    ).then(res => {
      if (res.hasPermission) {

      } else {
        // tslint:disable-next-line:no-shadowed-variable
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_PHONE_STATE).then(res => {
          // alert('Persmission Granted Please Restart App!');
        }).catch(error => {
          this.alertError('Error! ' + error);
        });
      }
    }).catch(error => {
      this.alertError('Error! ' + error);
    });
  }

  async richiediSupporto(fo: string) {
    this.oneSignal.getPermissionSubscriptionState().then((status) =>
        this.sendPostRequestSupporto(status.subscriptionStatus.userId, fo));
    const alert = await this.alertCtrl.create({
      header: 'Richiesta Inoltrata',
      subHeader: 'Una richiesta di supporto è stata inviata alla voltante più vicina.',
      buttons: [
        {
          cssClass: 'customAlertButton',
          text: `Chiudi`,
          handler: () => {
            // E.g: Navigate to a specific screen
            alert.dismiss();
          }
        },
      ]
    });
    alert.present();
  }

  async sendPostRequestSupporto(playerId: string, fo: string) {
    const formData = new FormData();
    formData.append('playerId', playerId);
    formData.append('lat', this.locationCoords.latitude);
    formData.append('long', this.locationCoords.longitude);
    formData.append('imei', this.uid.IMEI);
    formData.append('tipologia', 'Supporto');
    formData.append('is_supporto', null);
    formData.append('informazioni', null);
    formData.append('forza_ordine', fo);
    console.log('formData: ', formData.getAll('data'));
    this.http.post(this.urlRichiesta, formData,
        {observe: 'response'}).subscribe((response) => {
          console.log(response.status.toString());
        },
        error => (this.alertError('Error' + error.status.toString()))
    );
  }

  sendPostRequestPosizione() {
    const formData = new FormData();
    formData.append('lat', this.locationCoords.latitude);
    formData.append('long', this.locationCoords.longitude);
    formData.append('imei', this.uid.IMEI);
    console.log('formData: ', formData.getAll('data'));
    this.http.post(this.urlPosizione + this.uid.IMEI + '/', formData).subscribe((response) =>
            console.log(response.toString()),
        error => (console.log(error.toString()))
    );
  }


  sendPostToUpdateDisp(url, disp) {
    const formData = new FormData();
    formData.append('disponibile', disp);
    console.log('formData: ', formData.getAll('data'));
    this.http.post(url + this.uid.IMEI + '/', formData, {observe: 'response'}).subscribe((response) =>
            console.log(response.status.toString()),
        (error: HttpErrorResponse) => (alert(error.message))
    );
  }
}
