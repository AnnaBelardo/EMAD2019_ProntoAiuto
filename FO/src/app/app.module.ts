import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { OneSignal } from '@ionic-native/onesignal/ngx';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
import {Uid} from '@ionic-native/uid/ngx';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {AndroidPermissions} from '@ionic-native/android-permissions/ngx';
import {LocationAccuracy} from '@ionic-native/location-accuracy/ngx';
import { ViewObjectPageModule} from './view-object/view-object.module';
import { Media } from '@ionic-native/media/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ViewObjectPageModule, HttpClientModule ],
  providers: [
    OneSignal,
    StatusBar,
    SplashScreen,
    LaunchNavigator,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AndroidPermissions,
    Geolocation,
    LocationAccuracy,
    Uid,
    Media,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
