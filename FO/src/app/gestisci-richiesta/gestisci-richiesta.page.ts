import { Component, OnInit } from '@angular/core';
import {LaunchNavigator, LaunchNavigatorOptions} from '@ionic-native/launch-navigator/ngx';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ViewObjectPage } from '../view-object/view-object.page';
import {BehaviorSubject, Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Uid} from '@ionic-native/uid/ngx';
import {ActivatedRoute} from '@angular/router';
import {Richiesta} from './Richiesta';
import {ConnectionConfig} from '../ConnectionConfig';
import {OneSignal} from '@ionic-native/onesignal/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-gestisci-richiesta',
  templateUrl: './gestisci-richiesta.page.html',
  styleUrls: ['./gestisci-richiesta.page.scss'],
})
export class GestisciRichiestaPage implements OnInit {
  pkReq;
  latitudine;
  longitudine;
  tipologia;
  informazioni;
  returnStm = false;
  retunResponse = false;
  private autoSaveInterval: number = setInterval( () => { this.sendPostRequest(this.urlPosizione); }, 10000);
  locationCoords: any;
  timer: number;
  urlPosizione = ConnectionConfig.getBaseUrl() + '/vetture/update_position/';
  urlLineaVerde = ConnectionConfig.getBaseUrl() + '/richiesta/richiesta-linea-verde/';
  urlRichiestaCittadino = ConnectionConfig.getBaseUrl() + '/richiesta/get/richiesta/detail/';
  urlRichiesta = ConnectionConfig.getBaseUrl() + '/richiesta/create/';
  urlRichiestaSupporto = ConnectionConfig.getBaseUrl() + '/richiesta/create-supporto/';
  state: 'start' | 'stop' = 'stop';
  isTablet: any;
  constructor(private launchNavigator: LaunchNavigator,
              private http: HttpClient,
              private uid: Uid,
              private oneSignal: OneSignal,
              public alertController: AlertController,
              public modalController: ModalController,
              private route: ActivatedRoute,
              public platform: Platform) {
    this.isTablet = platform.is('tablet');
  }
  object: any;
  options: LaunchNavigatorOptions = {
    app: this.launchNavigator.APP.GOOGLE_MAPS
  };
  ngOnInit() {
    this.pkReq = this.route.snapshot.paramMap.get('pk_req');
    // alert(this.pkReq);
    this.getDatiRichiesta();
  }

  navigate() {
    this.launchNavigator.navigate([this.latitudine, this.longitudine], this.options)
        .then(
            success => console.log('launched navigator'),
            error => console.log('launched navigator error')
        );
  }
  async alertError(errore) {
    const alert = await this.alertController.create({
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
  async richiestaLineaVerde() {
    this.sendPostLineaVerde(this.urlLineaVerde + this.pkReq + '/');
    const alert = await this.alertController.create({
      header: 'Richiesta effettuata',
      message: 'La richiesta di linea verde è stata inoltrata con successo.',
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
    if (this.returnStm) {
      await alert.present();
    }
  }

  async presentModal() {
   //  alert(this.object.audio);
    if (this.isTablet) {
      const modal = await this.modalController.create({
        component: ViewObjectPage,
        componentProps: { object: this.object
        },
        cssClass: 'customModal'
      });
      return await modal.present();
    } else {
      const modal = await this.modalController.create({
        component: ViewObjectPage,
        componentProps: { object: this.object
        }
      });
      return await modal.present();
    }
  }

  async sendPostRequest(url) {
    const formData = new FormData();
    formData.append('lat', this.locationCoords.latitude);
    formData.append('long', this.locationCoords.longitude);
    formData.append('imei', this.uid.IMEI);
    console.log('formData: ', formData.getAll('data'));
    this.http.post(url + this.uid.IMEI + '/', formData).subscribe((response) => this.retunResponse = true, // alert(response.toString()),
        error => (this.alertError('Error!' + error.toString()))
    );
  }

  async richiediSupporto(fo: string) {
    this.oneSignal.getPermissionSubscriptionState().then((status) =>
        this.sendPostRequestSupporto(status.subscriptionStatus.userId, fo));
    const alert = await this.alertController.create({
      header: 'Richiesta effettuata',
      message: 'La richiesta di supporto è stata inoltrata con successo.',
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
    if (this.retunResponse) {
      await alert.present();
    }
  }

  async sendPostRequestSupporto(playerId: string, fo: string) {
    const formData = new FormData();
    formData.append('playerId', playerId);
    formData.append('imei', this.uid.IMEI);
    formData.append('forza_ordine', fo);
    formData.append('id_richiesta', this.pkReq);
    console.log('formData: ', formData.getAll('data'));
    this.http.post(this.urlRichiestaSupporto, formData,
        {observe: 'response'}).subscribe((response) => {
          console.log(response.status.toString());
          this.retunResponse = true;
        },
        error => (this.alertError('Error' + error.status.toString()))
    );
  }

  async sendPostLineaVerde(url) {
    const formData = new FormData();
    this.http.post(url, formData).subscribe((response) =>
            this.returnStm = true,
        error => (this.alertError('Error!' + error.toString()))
    );
  }


  getRichiesta(): Observable<Richiesta> {
    return this.http.get(this.urlRichiestaCittadino + this.pkReq + '/') as Observable<Richiesta>;
  }

  getDatiRichiesta() {
    this.getRichiesta().subscribe(
        data => {
          this.latitudine = data.lat;
          this.longitudine = data.long;
          this.tipologia = data.tipologia;
          this.informazioni = data.informazioni;
          this.object = {
            image1: ConnectionConfig.getBaseUrl() + data.selfie,
            image2: ConnectionConfig.getBaseUrl() + data.foto,
            audio: ConnectionConfig.getBaseUrl() + data.audio,
          };
        }
    );
  }
}
