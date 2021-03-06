import { Component } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {enableProdMode} from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal/ngx';


enableProdMode();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private oneSignal: OneSignal,
    private alertCtrl: AlertController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
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
          this.showAlert(title, msg);
        },
        error => { alert(error); }
    );

    // Notification was really clicked/opened
    this.oneSignal.handleNotificationOpened().subscribe(data => {
      // Just a note that the data is a different place here!
      this.showAlert('Notification opened', 'You already read this before');
    });

    this.oneSignal.endInit();
  }

  async showAlert(title, msg) {
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

}
