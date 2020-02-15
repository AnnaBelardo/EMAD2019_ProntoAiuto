import { Component } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import {Uid} from '@ionic-native/uid/ngx';
import {HttpClient} from '@angular/common/http';
import {Apiconfig} from './ApiConfig';
import {Router} from '@angular/router';
import {LaunchNavigator, LaunchNavigatorOptions} from '@ionic-native/launch-navigator/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  urlRifiuta = Apiconfig.url + 'richiesta/rifiuta/';
  urlAccetta = Apiconfig.url + 'richiesta/accetta/';
  options: LaunchNavigatorOptions = {
    app: this.launchNavigator.APP.GOOGLE_MAPS
  };
  constructor(
    private platform: Platform,
    private launchNavigator: LaunchNavigator,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private oneSignal: OneSignal,
    private alertCtrl: AlertController,
    private uid: Uid,
    private http: HttpClient,
    private router: Router,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString('#EF8157');
      this.splashScreen.hide();

      if (this.platform.is('cordova')) {
        this.setupPush();
      }
    });
  }

  setupPush() {
    this.oneSignal.startInit('a25229e0-e3d2-419c-8706-8c0abbe60353');
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);
    // Notifcation was received in general
    this.oneSignal.handleNotificationReceived().subscribe(data => {
      const msg = data.payload.body;
      const title = data.payload.title;
      const additionalData = data.payload.additionalData;
      if (additionalData.richiesta_from === 1 || additionalData.richiesta_from === 2 || additionalData.richiesta_from === 3) {
        this.showAlert(title, msg, additionalData);
      } else {
        this.showAlertRisposta(title, msg);
      }
    },
        error => { alert(error); }
        );

    // Notification was really clicked/opened
    // this.oneSignal.handleNotificationOpened().subscribe(data => {
      // Just a note that the data is a different place here!
      // this.showAlert('Notification opened', 'You already read this before', 'l');
    // });

    this.oneSignal.endInit();
  }

  navigate(lat, long) {
    this.launchNavigator.navigate([lat, long], this.options)
        .then(
            success => console.log('launched navigator'),
            error => console.log('launched navigator error')
        );
  }


  async showAlertRisposta(title, msg) {
    const alert = await this.alertCtrl.create({
      header: title,
      subHeader: msg,
      buttons: [
        {
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

  async showAlert(title, msg, additionalData) {
    const alertRichiesta = await this.alertCtrl.create({
      header: title,
      subHeader: msg,
      buttons: [
        {
          text: `Accetta`,
          handler: () => {
            this.http.get(this.urlAccetta + this.uid.IMEI + '/' + additionalData.req_pk + '/',
                {observe: 'response'}).subscribe((response) => {
                  if (additionalData.richiesta_from === 2) {
                    this.navigate(additionalData.lat, additionalData.long);
                  } else {
                    this.router.navigate(['gestisci-richiesta', additionalData.req_pk]);
                  }
                },
                error => (console.log(error.status))
            );
          }
        },
        {
          text: `Rifiuta`,
          handler: () => {
            this.http.get(this.urlRifiuta + this.uid.IMEI + '/' + additionalData.req_pk + '/',
                {observe: 'response'}).subscribe((response) =>
                    alert(response.status.toString()),
                error => (console.log(error.toString()))
            );
          }
        }
      ],
      // serve per bloccare la notifica
      backdropDismiss: false,
    });
    alertRichiesta.present();
  }
}
