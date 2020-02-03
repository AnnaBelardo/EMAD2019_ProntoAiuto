import {Observable} from 'rxjs';
import {Vetture} from '../../backend/Vetture/CRUD/DataModel/Vetture';
import {HttpClient} from '@angular/common/http';
import {VettureService} from '../../backend/Vetture/services/VettureService';
import {Router} from '@angular/router';
import {VetturePosizione} from '../../backend/Vetture/CRUD/DataModel/VetturePosizione';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import tt from '@tomtom-international/web-sdk-maps';



@Component({
  moduleId: module.id,
  selector: 'app-maps-cmp',
  templateUrl: 'maps.component.html',
  styleUrls: ['maps.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class MapsComponent implements OnInit {
  private markers = [];
  private map: any;
  private autoSaveInterval: number = setInterval( () => { this.refreshMarkers(); }, 10000);

  constructor(private http: HttpClient, private vettureService: VettureService, private router: Router) {
  }

  ngOnInit() {
    this.map = tt.map({
      key: 'pBDtSNH15AVCe1kLOKb1lgvdgWtGCHaG',
      container: 'map',
      style: 'tomtom://vector/1/basic-main',
      center: [14.792207, 40.762352],
      zoom: 12,
    });
    this.map.setLanguage('it-IT');
    this.map.addControl(new tt.NavigationControl());
    this.vettureService.getAllVettureAndPosition().subscribe(response => {
        this.inizializzaMarkers(response);
      }
    );
  }

  inizializzaMarkers(response: any) {
    for (const vet of response) {
      let color: string;
      if (vet.disponibile) {
        color = '#5327c3';
      } else {
        color = '#cc0000';
      }
      const data = vet.ultimo_aggiornamento.toString();
      const stato = vet.stato.toString();
      const tipologia = vet.tipologia.toString();
      const popuptext = '<b>Stato</b><br/>' + stato + '<br>' + '<b>Tipologia</b><br/>' + tipologia + '<br>' +
        '<b>Ultimo Aggiornamento</b><br/>' + this.stringoToDate(data) + '<br>' +
        '<b>Lat, Long</b><br/>' + vet.lat + ', ' +  vet.long + '<br>';
      this.createMarker('ic_map_poi_008-black.png', [vet.long, vet.lat], color, popuptext);
    }
  }

  clearMarkers() {
    for (const mark of this.markers) {
      mark.remove();
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

  createMarker(icon, position, color, popupText) {
    const markerElement = document.createElement('div');
    markerElement.className = 'marker';

    const markerContentElement = document.createElement('div');
    markerContentElement.className = 'marker-content';
    markerContentElement.style.backgroundColor = color;
    markerElement.appendChild(markerContentElement);

    const iconElement = document.createElement('div');
    iconElement.className = 'marker-icon';
    iconElement.style.backgroundImage =
      'url(./assets/sdk_tomtom/images/' + icon + ')';
    markerContentElement.appendChild(iconElement);

    const popup = new tt.Popup({offset: 30}).setHTML(popupText);
    // add marker to map
    const marker = new tt.Marker({element: markerElement, anchor: 'bottom'})
      .setLngLat(position)
      .setPopup(popup)
      .addTo(this.map);
    this.markers.push(marker);

  }

  stringoToDate(s: string) {
    const data = new Date(s);
    return data.toDateString() + ' - ' + data.getHours() + ':' + data.getMinutes() + ':' + data.getSeconds();
  }
}
