import { Component, OnInit } from '@angular/core';
import {LaunchNavigator, LaunchNavigatorOptions} from '@ionic-native/launch-navigator/ngx';

@Component({
  selector: 'app-gestisci-richiesta',
  templateUrl: './gestisci-richiesta.page.html',
  styleUrls: ['./gestisci-richiesta.page.scss'],
})
export class GestisciRichiestaPage implements OnInit {

  constructor(private launchNavigator: LaunchNavigator) { }
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

}
