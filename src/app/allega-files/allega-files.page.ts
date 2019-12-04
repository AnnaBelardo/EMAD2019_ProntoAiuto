import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { File } from '@ionic-native/file/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-allega-files',
  templateUrl: './allega-files.page.html',
  styleUrls: ['./allega-files.page.scss'],
})
export class AllegaFilesPage implements OnInit {
  capturedSnapURL: string;

  cameraOptions: CameraOptions = {
    quality: 20,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  } ;
  recording = false;
  filePath: string;
  fileName: string;
  audio: MediaObject;
  audioList: any[] = [];
  constructor(public navCtrl: NavController,
              private media: Media,
              private file: File,
              public platform: Platform,
              private camera: Camera) {
    this.audioList = [];
    localStorage.setItem('audiolist', JSON.stringify(this.audioList));
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
  ionViewWillEnter() {
    this.getAudioList();
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
}
