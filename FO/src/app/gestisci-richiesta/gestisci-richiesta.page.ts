import { Component, OnInit } from '@angular/core';
import {LaunchNavigator, LaunchNavigatorOptions} from '@ionic-native/launch-navigator/ngx';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ViewObjectPage } from '../view-object/view-object.page';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Uid} from '@ionic-native/uid/ngx';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-gestisci-richiesta',
  templateUrl: './gestisci-richiesta.page.html',
  styleUrls: ['./gestisci-richiesta.page.scss'],
})
export class GestisciRichiestaPage implements OnInit {
  pk_req;
  time: BehaviorSubject<string> = new BehaviorSubject('00:00');
  locationCoords: any;
  timer: number;
  urlPosizione = 'http://192.168.43.119:8080/vetture/update_position/';
  urlRichiesta = 'http://192.168.43.119:8080/richiesta/create/';
  interval;
  startDuration = 1;
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
    this.pk_req = this.route.snapshot.paramMap.get('pk_req');
    alert(this.pk_req);
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
    const modal = await this.modalController.create({
      component: ViewObjectPage,
      componentProps: { object: this.object
      }
    });
    return await modal.present();
  }

  startTimer(duration: number) {
    this.state = 'start';
    clearInterval(this.interval);
    this.timer = duration * 10;
    this.updateTimeValue();
    this.interval = setInterval( () => {
      this.updateTimeValue();
    }, 1000);
  }

  stopTimer() {
    this.state = 'stop';
    clearInterval(this.interval);
  }

  updateTimeValue() {
    let minutes: any = this.timer / 60;
    let seconds: any = this.timer % 60;

    minutes = String('0' + Math.floor(minutes)).slice(-2);
    seconds = String('0' + Math.floor(minutes)).slice(-2);

    const text = minutes + ':' + seconds;

    this.time.next(text);

    --this.timer;

    if (this.timer < -1) {
      this.startTimer(this.startDuration);
      this.sendPostRequest(this.urlPosizione);
    }
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
}
