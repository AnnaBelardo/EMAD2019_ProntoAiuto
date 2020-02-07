import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {LocationAccuracy} from '@ionic-native/location-accuracy/ngx';
import {AndroidPermissions} from '@ionic-native/android-permissions/ngx';
import {Uid} from '@ionic-native/uid/ngx';
import {HttpClient} from '@angular/common/http';
import {ConnectionConfig} from '../ConnectionConfig';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  urlUpdateDisp = ConnectionConfig.getBaseUrl() + '/vetture/update-disp/';
  urlPosizione = ConnectionConfig.getBaseUrl() + '/vetture/update-position/';
  urlRichiesta = ConnectionConfig.getBaseUrl() + 'richiesta/create/';
  private autoSaveInterval: number = setInterval( () => { this.sendPostRequest(this.urlPosizione); }, 10000);
  // Per le coordinate GPS
  locationCoords: any;
  var1: any;
  constructor(private router: Router,
              private androidPermissions: AndroidPermissions,
              private geolocation: Geolocation,
              private uid: Uid,
              private http: HttpClient,
              private locationAccuracy: LocationAccuracy) {
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
  }

  getLocationCoordinates() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.locationCoords.latitude = resp.coords.latitude;
      this.locationCoords.longitude = resp.coords.longitude;
      this.locationCoords.accuracy = resp.coords.accuracy;
      this.locationCoords.timestamp = resp.timestamp;
    }).catch((error) => {
      alert('Error getting location' + error);
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
          alert(err);
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
                  alert('requestPermission Error requesting location permissions ' + error);
                }
            );
      }
    });
  }
  change(event) {
   // alert('prova');
    // if(this.var1 == false && this.var2 == false){
    this.sendPostToUpdateDisp(this.urlUpdateDisp, this.var1);
    // }
  }

  askToTurnOnGPS() {
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
        () => {
          // Quando il GPS è ON prendo le coordinate accurate
          this.getLocationCoordinates();
        },
        error => alert('Error requesting location permissions ' + JSON.stringify(error))
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
          alert('Error! ' + error);
        });
      }
    }).catch(error => {
      alert('Error! ' + error);
    });
  }

  richiediSupporto() {
    this.sendPostRequest(this.urlRichiesta);
    alert('Una richiesta di supporto è stata inviata alla voltante più vicina.');
  }

  sendPostRequest(url) {
    const formData = new FormData();
    formData.append('lat', this.locationCoords.latitude);
    formData.append('long', this.locationCoords.longitude);
    if (url === this.urlRichiesta) {
      formData.append('is_supporto', 'True');
    }
    console.log('formData: ', formData.getAll('data'));
    this.http.post(url + this.uid.IMEI + '/', formData).subscribe((response) =>
            console.log(response.toString()),
        error => (console.log(error.toString()))
    );
  }


  sendPostToUpdateDisp(url, disp) {
    const formData = new FormData();
    formData.append('disponibile', disp);
    console.log('formData: ', formData.getAll('data'));
    alert(url + this.uid.IMEI + '/');
    this.http.post(url + this.uid.IMEI + '/', formData).subscribe((response) =>
            console.log(response.toString()),
        error => (alert(error.status.toString()))
    );
  }
}
