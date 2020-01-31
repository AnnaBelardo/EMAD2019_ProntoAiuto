import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {LocationAccuracy} from '@ionic-native/location-accuracy/ngx';
import {AndroidPermissions} from '@ionic-native/android-permissions/ngx';
import {Uid} from '@ionic-native/uid/ngx';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private autoSaveInterval: number = setInterval( () => { this.sendPostRequest(); }, 10000);
  // Per le coordinate GPS
  locationCoords: any;
  url = 'http://192.168.43.119:8080/vetture/update-position/';
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

  askToTurnOnGPS() {
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
        () => {
          // Quando il GPS è ON prendo le coordinate accurate
          this.getLocationCoordinates();
        },
        error => alert('Error requesting location permissions ' + JSON.stringify(error))
    );
  }

  goToGestisciRichiesta() {
    this.router.navigate(['/gestisci-richiesta']);
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

  sendPostRequest() {
    const formData = new FormData();
    formData.append('lat', this.locationCoords.latitude);
    formData.append('long', this.locationCoords.longitude);
    console.log('formData: ', formData.getAll('data'));
    this.http.post(this.url + this.uid.IMEI + '/', formData).subscribe((response) =>
            console.log(response.toString()),
        error => (console.log(error.toString()))
    );
  }
}
