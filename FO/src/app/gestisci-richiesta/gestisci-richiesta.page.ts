import { Component, OnInit } from '@angular/core';
import {LaunchNavigator, LaunchNavigatorOptions} from '@ionic-native/launch-navigator/ngx';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import {ViewObjectPage} from '../view-object/view-object.page';

@Component({
  selector: 'app-gestisci-richiesta',
  templateUrl: './gestisci-richiesta.page.html',
  styleUrls: ['./gestisci-richiesta.page.scss'],
})
export class GestisciRichiestaPage implements OnInit {

  constructor(private launchNavigator: LaunchNavigator,
              public alertController: AlertController,
              public modalController: ModalController) { }
  object: any = {
    name: 'Incidente',
    image1: 'assets/images/carcrash.jpg',
    image2: 'assets/images/carcrash2.jpg',
  };
  options: LaunchNavigatorOptions = {
    app: this.launchNavigator.APP.GOOGLE_MAPS
  };
  ngOnInit() {
  }

  navigate() {
    this.launchNavigator.navigate('40 58 8 40 N, 14 15 23 40 E', this.options)
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
}
