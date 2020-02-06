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

@Component({
  selector: 'app-gestisci-richiesta',
  templateUrl: './gestisci-richiesta.page.html',
  styleUrls: ['./gestisci-richiesta.page.scss'],
})
export class GestisciRichiestaPage implements OnInit {
  pkReq;
  richiesta: Richiesta;
  private autoSaveInterval: number = setInterval( () => { this.sendPostRequest(this.urlPosizione); }, 10000);
  time: BehaviorSubject<string> = new BehaviorSubject('00:00');
  locationCoords: any;
  timer: number;
  urlPosizione = ConnectionConfig.getBaseUrl() + '/vetture/update_position/';
  urlRichiestaCittadino = ConnectionConfig.getBaseUrl() + '/richiesta/get/richiesta/detail/';
  urlRichiesta = ConnectionConfig.getBaseUrl() + '/richiesta/create/';
  state: 'start' | 'stop' = 'stop';
  constructor(private launchNavigator: LaunchNavigator,
              private http: HttpClient,
              private uid: Uid,
              public alertController: AlertController,
              public modalController: ModalController,
              private route: ActivatedRoute) { }
  object: any = {
    name: 'Incidente',
    image1: 'assets/images/carcrash.jpg',
    image2: 'assets/images/carcrash2.jpg',
  };
  options: LaunchNavigatorOptions = {
    app: this.launchNavigator.APP.GOOGLE_MAPS
  };
  ngOnInit() {
    this.pkReq = this.route.snapshot.paramMap.get('pk_req');
    this.getDatiRichiesta();
    alert(this.richiesta.imei);
  }

  navigate() {
    this.launchNavigator.navigate([40.7590642, 14.7832711], this.options)
        .then(
            success => console.log('launched navigator'),
            error => console.log('launched navigator error')
        );
  }

  async showalert() {
    const alert = await this.alertController.create({
      header: 'Richiesta effettuata',
      message: 'La richiesta di linea verde è stata inoltrata con successo.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentModal() {
    const infoPack: any = {
      name: this.richiesta.tipologia,
      image1: this.richiesta.selfieAllegato,
      image2: this.richiesta.fotoAllegata,
    };

    const modal = await this.modalController.create({
      component: ViewObjectPage,
      componentProps: { object: infoPack
      }
    });
    return await modal.present();
  }

  richiediSupporto() {
    this.sendPostRequest(this.urlRichiesta);
  }

  async sendPostRequest(url) {
    const formData = new FormData();
    if (url === this.urlRichiesta) {
     // append info aspettate dalla POST
      formData.append('is_supporto', 'True');
      console.log('formData: ', formData.getAll('data'));
    } else {
      formData.append('lat', this.locationCoords.latitude);
      formData.append('long', this.locationCoords.longitude);
      formData.append('imei', this.uid.IMEI);
      console.log('formData: ', formData.getAll('data'));
    }
    this.http.post(url, formData).subscribe((response) =>
            alert(response.toString()),
        error => (alert(error.toString()))
    );
  }

  getRichiesta(): Observable<Richiesta> {
    return this.http.get<Richiesta>(this.urlRichiestaCittadino + this.pkReq + '/', {responseType: 'json'});
  }

  getDatiRichiesta() {
    this.getRichiesta().subscribe(
        data => {
          this.richiesta = data;
        }
    );
  }
}
