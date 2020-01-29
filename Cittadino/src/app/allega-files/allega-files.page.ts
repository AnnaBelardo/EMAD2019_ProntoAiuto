import {Component, OnInit} from '@angular/core';
import {NavController, Platform} from '@ionic/angular';
import {Media, MediaObject} from '@ionic-native/media/ngx';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {LocationAccuracy} from '@ionic-native/location-accuracy/ngx';
import {HttpClient} from '@angular/common/http';
import {Uid} from '@ionic-native/uid/ngx';
import {AndroidPermissions} from '@ionic-native/android-permissions/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import {Router} from '@angular/router';
import { File } from '@ionic-native/file/ngx';


declare var cordova: any;
// import {HTTP} from '@ionic-native/http/ngx';


@Component({
  selector: 'app-allega-files',
  templateUrl: './allega-files.page.html',
  styleUrls: ['./allega-files.page.scss'],
})
export class AllegaFilesPage implements OnInit {
  constructor(public navCtrl: NavController,
              private media: Media,
              private file: File,
              private fileToUpload: File,
              public platform: Platform,
              private uid: Uid,
              private camera: Camera,
              private http: HttpClient,
              private androidPermissions: AndroidPermissions,
              private geolocation: Geolocation,
              private locationAccuracy: LocationAccuracy,
              private photoViewer: PhotoViewer,
              private router: Router,
  ) {
    this.tipoForza = this.router.getCurrentNavigation().extras.state.example;
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


  // Per le foto
  capturedSnapURL: string;
  photoList: any[] = [];
  photoName = 'fotoAllegata.jpg';
  // Per le note audio
  audioName = 'audioAllegato.3gp';
  recording = false;
  playing = false;
  audioPath: string;
  audio: MediaObject;
  audioList: any[] = [];
  informazioniAggiuntive: any;
  motivation: any;
  photoAttached = false;
  audioAttached = false;
  // Per le coordinate GPS
  locationCoords: any;
  timetest: any;
  tipoForza;
  motivi: any[] = [];

//  sendPostRequest() {
//    const headers = {
//      'Content-Type': 'application/json'
//    };
    // this.http.setDataSerializer('json');
//    this.http.post('http://httpbin.org/post', {
//      prova: 'prova',
//      asd: 'asd'
//    });
//  }

  ngOnInit() {
    switch (this.tipoForza) {
      case (1):
        this.motivi = ['Furto', 'Incidente stradale', 'Violenza domestica', 'Altro...'];
        break;
      case (2):
        this.motivi = ['Furto', 'Incidente stradale', 'Violenza domestica', 'Altro...'];
        break;
      case (3):
        this.motivi = ['Malore improvviso', 'Incidente', 'Altro...'];
        break;
      case (4):
        this.motivi = ['Incidente', 'Incendio', 'Dissesti statici', 'Altro...'];
        break;
      default:
        break;
    }
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 50,
      sourceType: this.camera.PictureSourceType.CAMERA,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
    this.camera.getPicture(options).then(imagePath => {
      const currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      const correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      this.copyFileToLocalDir(correctPath, currentName, this.photoName, imagePath);
      this.photoAttached = true;
    });
  }

  copyFileToLocalDir(namePath, currentName, newFileName, cacheImagePath) {
    this.file.copyFile(namePath, currentName, this.file.externalDataDirectory, newFileName).then(success => {
      if ( !this.photoList.some(e => e.filename === this.photoName) ) {
        const data = {filename: newFileName};
        this.photoList.push(data);
        localStorage.setItem('photolist', JSON.stringify(this.audioList));
      }
      this.file.removeFile(cacheImagePath.substring(0, cacheImagePath.lastIndexOf('/')), currentName).then(res => {
      });
    }, error => {
      alert('Error while storing file.' + error);
    });
  }

  deletePhoto() {
    this.file.removeFile(this.file.externalDataDirectory, this.photoName).then(res => {
      this.photoList = [];
      this.photoAttached = false;
    });
  }

  deleteAudio() {
    this.file.removeFile(this.file.externalDataDirectory, this.audioName).then(res => {
      this.audioList = [];
      this.audioAttached = false;
    });
  }

  showPhoto() {
    this.photoViewer.show(this.file.externalDataDirectory + this.photoName, 'Anteprima foto');
  }

  startRecord() {
    this.audioPath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.audioName;
    this.audio = this.media.create(this.audioPath);
    this.audio.startRecord();
    this.recording = true;
    this.audioAttached = true;
  }

  stopRecord() {
    this.audio.stopRecord();
    if ( !this.audioList.some(e => e.filename === this.audioName) ) {
      const data = {filename: this.audioName};
      this.audioList.push(data);
      localStorage.setItem('audiolist', JSON.stringify(this.audioList));
    }
    this.recording = false;
  }

  playAudio(file, idx) {
    this.audioPath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + file;
    this.audio = this.media.create(this.audioPath);
    this.audio.play();
    this.audio.setVolume(0.8);
    this.playing = true;
    this.audio.onStatusUpdate.subscribe((statusCode) => {
      if (statusCode === 4) {
        document.getElementById('stopButton').click();
      }
    });
  }

  stopAudio() {
    this.audio.stop();
    this.playing = false;
  }

  ionViewWillEnter() {
    this.checkGPSPermission();
  }

  inviaRichiesta() {
    // this.getAllegati();
    this.sendPostRequest();
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
    let audio = 'Null';
    let photo = 'Null';
    if (this.photoAttached) {
      photo = this.photoName;
    }
    if (this.audioAttached) {
      audio = this.audioName;
    }
    alert('Latitudine: ' + this.locationCoords.latitude + '\n' + 'Longitudine: ' + this.locationCoords.longitude + '\n' +
        'Timestamp: ' + this.timetest + '\n' + 'IMEI: ' +  this.uid.IMEI +
        '\n' + 'Motivo: ' + this.motivation + '\n' + 'Info Extra: ' + this.informazioniAggiuntive + '\n' + 'Audio: ' +
        audio + '\n' + 'Foto: ' + photo);
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

  async sendPostRequest() {
    const formData = new FormData();
    await this.to_base_64('fotoAllegata.jpg').then((res) => {
      formData.append('img_data', res);
    });
    await this.to_base_64('audioAllegato.3gp').then((res) => {
      formData.append('audio_data', res);
    });
    formData.append('lat', this.locationCoords.latitude);
    formData.append('long', this.locationCoords.longitude);
    formData.append('imei', this.uid.IMEI);
    formData.append('tipologia', this.motivation);
    formData.append('informazioni', this.informazioniAggiuntive);
    console.log('formData: ', formData.getAll('data'));
    this.http.post('http://192.168.43.119:8080/richiesta/create/', formData).subscribe((response) =>
            alert(response.toString()),
        error => (alert(error.toString()))
    );
  }

  async to_base_64(filename: string): Promise<string> {
    let returnvalue = '';
    await this.fileToUpload.readAsDataURL(cordova.file.externalApplicationStorageDirectory + 'files/', filename).then(res => {
      returnvalue = res;
    }).catch(err => {
      alert(err);
    });
    return returnvalue;
  }
}
