import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { File } from '@ionic-native/file/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import { Uid } from '@ionic-native/uid/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'app-allega-files',
  templateUrl: './allega-files.page.html',
  styleUrls: ['./allega-files.page.scss'],
})
export class AllegaFilesPage implements OnInit {
  // Per le foto
  capturedSnapURL: string;
  cameraOptions: CameraOptions = {
    quality: 20,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  } ;
  // Per le note audio
  recording = false;
  filePath: string;
  fileName: string;
  audio: MediaObject;
  audioList: any[] = [];
  informazioniAggiuntive: any;
  motivation: any;
  // Per le coordinate GPS
  locationCoords: any;
  timetest: any;
  constructor(public navCtrl: NavController,
              private media: Media,
              private file: File,
              public platform: Platform,
              private uid: Uid,
              private camera: Camera,
              private http: HttpClient,
              private androidPermissions: AndroidPermissions,
              private geolocation: Geolocation,
              private locationAccuracy: LocationAccuracy) {
    this.audioList = [];
    localStorage.setItem('audiolist', JSON.stringify(this.audioList));
    this.locationCoords = {
      latitude: '',
      longitude: '',
      accuracy: '',
      timestamp: ''
    };
    this.timetest = Date.now();
  }

  ngOnInit() {
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(this.cameraOptions).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      const base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
      console.log(err);
    });
  }

  getAudioList() {
    if (localStorage.getItem('audiolist')) {
      this.audioList = JSON.parse(localStorage.getItem('audiolist'));
      console.log(this.audioList);
    }
  }



  startRecord() {
    this.fileName = 'record' + new Date().getDate() + new Date().getMonth() + new Date().getFullYear()
        + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.3gp';
    this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.fileName;
    this.audio = this.media.create(this.filePath);
    this.audio.startRecord();
    this.recording = true;
  }

  stopRecord() {
    this.audio.stopRecord();
    const data = { filename: this.fileName };
    this.audioList = [];
    this.audioList.push(data);
    localStorage.setItem('audiolist', JSON.stringify(this.audioList));
    this.recording = false;
    this.getAudioList();
  }

  playAudio(file, idx) {
    this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + file;
    this.audio = this.media.create(this.filePath);
    this.audio.play();
    this.audio.setVolume(0.8);
  }

  ionViewWillEnter() {
    this.getAudioList();
    this.checkGPSPermission();
  }

  inviaRichiesta() {
    this.getAllegati();
  }

  // Memorizzo le coordinate per riutilizzarle
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

  getAllegati() {
    alert('Latitude: ' + this.locationCoords.latitude + '\n' + 'Longitude: ' + this.locationCoords.longitude + '\n' +
        'Audio: ' + this.fileName + '\n' + 'Timestamp: ' + this.timetest + '\n' + 'IMEI:' +  this.uid.IMEI +
        '\n' + 'Text area:' + this.informazioniAggiuntive + '\n' + 'Motivation:' + this.motivation);
  }

  // Check per vedere se l'applicazione ha l'accesso al GPS
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

  sendPostRequest() {
      this.http.post('https://someapi.com/posts', {
          content: 'hello',
          submittedBy: 'Josh'
      }).subscribe((response) => {
          console.log(response);
      });
    }
}
