import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Vetture} from '../../backend/Vetture/CRUD/DataModel/Vetture';
import {HttpClient} from '@angular/common/http';
import {VettureService} from '../../backend/Vetture/services/VettureService';
import {Router} from '@angular/router';
import {VetturePosizione} from '../../backend/Vetture/CRUD/DataModel/VetturePosizione';

declare var google: any;

@Component({
  moduleId: module.id,
  selector: 'app-maps-cmp',
  templateUrl: 'maps.component.html'
})

export class MapsComponent implements OnInit {
  private markers = [];
  private map: any;
  private autoSaveInterval: number = setInterval( () => {this.refreshMarkers()}, 10000);

  constructor(private http: HttpClient, private vettureService: VettureService, private router: Router) {
  }

  ngOnInit() {
    const myLatlng = new google.maps.LatLng(40.955043, 14.275701);
    const mapOptions = {
      zoom: 13,
      center: myLatlng,
      scrollwheel: false, // we disable de scroll over the map, it is a really annoing when you scroll through page
      styles: [{'featureType': 'water', 'stylers': [{'saturation': 43}, {'lightness': -11}, {'hue': '#0088ff'}]},
        {
          'featureType': 'road', 'elementType': 'geometry.fill', 'stylers': [{'hue': '#ff0000'}, {'saturation': -100},
            {'lightness': 99}]
        }, {
          'featureType': 'road', 'elementType': 'geometry.stroke', 'stylers': [{'color': '#808080'},
            {'lightness': 54}]
        },
        {'featureType': 'landscape.man_made', 'elementType': 'geometry.fill', 'stylers': [{'color': '#ece2d9'}]},
        {'featureType': 'poi.park', 'elementType': 'geometry.fill', 'stylers': [{'color': '#ccdca1'}]},
        {'featureType': 'road', 'elementType': 'labels.text.fill', 'stylers': [{'color': '#767676'}]},
        {'featureType': 'road', 'elementType': 'labels.text.stroke', 'stylers': [{'color': '#ffffff'}]},
        {'featureType': 'poi', 'stylers': [{'visibility': 'off'}]},
        {'featureType': 'landscape.natural', 'elementType': 'geometry.fill', 'stylers': [{'visibility': 'on'}, {'color': '#b8cb93'}]},
        {'featureType': 'poi.park', 'stylers': [{'visibility': 'on'}]},
        {'featureType': 'poi.sports_complex', 'stylers': [{'visibility': 'on'}]},
        {'featureType': 'poi.medical', 'stylers': [{'visibility': 'on'}]},
        {'featureType': 'poi.business', 'stylers': [{'visibility': 'simplified'}]}]

    };
    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    const trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(this.map);

    this.vettureService.getAllVettureAndPosition().subscribe(response => {
        this.inizializzaMarkers(response);
      }
    );
  }

  inizializzaMarkers(response: any) {
    for (const vet of response) {
      let icon;
      switch (vet.tipologia.toString()) {
        case 'Motociclo': {
          icon = 'http://maps.google.com/mapfiles/kml/shapes/motorcycling.png';
          break;
        }
        case 'Autovettura': {
          icon = 'http://maps.google.com/mapfiles/kml/shapes/cabs.png';
          break;
        }
        default: {
          icon = 'http://maps.google.com/mapfiles/kml/paddle/red-circle.png';
          break;
        }
      }
      const data = new Date(vet.ultimo_aggiornamento.toString());
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(vet.long, vet.lat),
        icon: icon,
        title: 'ID: ' + vet.identificativo.toString() + '\nStato: ' + vet.stato.toString() + '\nTipologia: ' +
          vet.tipologia.toString() + '\nAggiornato: ' + data.toDateString() + ' ' + data.toTimeString() + '\nLat: ' +
          vet.lat + '\nLong: ' + vet.long,
      });
      marker.setMap(this.map);
      this.markers.push(marker);
    }
  }

  clearMarkers() {
    for (const mark of this.markers) {
      mark.setMap(null);
    }
  }

  setMarkers() {
    for (const mark of this.markers) {
      mark.setMap(this.map);
    }
  }

  refreshMarkers() {
    this.clearMarkers();
    this.vettureService.getAllVettureAndPosition().subscribe(response => {
        this.inizializzaMarkers(response);
      }
    );
  }

}
