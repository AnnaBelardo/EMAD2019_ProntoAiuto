import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-allega-files',
  templateUrl: './allega-files.page.html',
  styleUrls: ['./allega-files.page.scss'],
})
export class AllegaFilesPage implements OnInit {

  recording = false;
  filePath: string;
  fileName: string;
  audio: MediaObject;
  audioList: any[] = [];
  constructor(public navCtrl: NavController,
              private media: Media,
              private file: File,
              public platform: Platform) {}
  ngOnInit() {
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
