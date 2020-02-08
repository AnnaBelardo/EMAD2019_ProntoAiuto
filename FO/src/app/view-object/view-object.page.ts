import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { IonSlides } from '@ionic/angular';
import {Media, MediaObject} from '@ionic-native/media/ngx';



@Component({
  selector: 'app-view-object',
  templateUrl: './view-object.page.html',
  styleUrls: ['./view-object.page.scss'],
})
export class ViewObjectPage implements OnInit {
  @ViewChild('slideWithNav', {static: false}) slideWithNav: IonSlides;

  object: any;
  slider: any;
  audio: MediaObject;
  playing = false;

  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true
  };

  constructor(navParams: NavParams, public viewCtrl: ModalController,
              private media: Media,
  ) {
    this.object = navParams.get('object');
    this.slider = {
          isBeginningSlide: true,
          isEndSlide: false,
          slidesItems: [
            {
              id: 1,
              image: this.object.image1
            },
            {
              id: 2,
              image: this.object.image2
            }
          ]
        };
  }

  slideNext(object, slideView) {
    slideView.slideNext(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });
  }
  // Move to previous slide
  slidePrev(object, slideView) {
    slideView.slidePrev(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });
  }

  // Method called when slide is changed by drag or navigation
  SlideDidChange(object, slideView) {
    this.checkIfNavDisabled(object, slideView);
  }

  // Call methods to check if slide is first or last to enable disbale navigation
  checkIfNavDisabled(object, slideView) {
    this.checkisBeginning(object, slideView);
    this.checkisEnd(object, slideView);
  }

  checkisBeginning(object, slideView) {
    slideView.isBeginning().then((istrue) => {
      object.isBeginningSlide = istrue;
    });
  }
  checkisEnd(object, slideView) {
    slideView.isEnd().then((istrue) => {
      object.isEndSlide = istrue;
    });
  }
  dismiss() {
    this.viewCtrl.dismiss({age: 25});
  }

  playAudio(file) {
    this.audio = this.media.create(this.object.audio);
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
  ngOnInit() {
  }

}
