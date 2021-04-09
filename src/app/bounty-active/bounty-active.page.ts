import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

declare var google

@Component({
  selector: 'app-bounty-active',
  templateUrl: './bounty-active.page.html',
  styleUrls: ['./bounty-active.page.scss'],
})
export class BountyActivePage implements OnInit {
  // this is essentially Angular's version of document.getElementById
  @ViewChild('mapCanvas', { static: true }) mapElement: ElementRef;

  public map: any 

  constructor() { }

  ngOnInit() {
    this.loadMap();
  }

  loadMap() {
    // 41.29199582553294, -96.14293113858847
    const locationObject = new google.maps.LatLng(41.29199582553294, -96.14293113858847)

    const mapOptions = {
      zoom: 15,
      center: locationObject
    }

    this.map = new google.maps.Map(
      this.mapElement.nativeElement, // element on the page
      mapOptions // customization options
    )

    const marker = new google.maps.Marker({
      map: this.map,
      position: locationObject,
      animation: google.maps.Animation.DROP 
    })

  }

  // TODO - animate the initial map with this method
  // animateMapZoomTo(map, targetZoom) {
  //   var currentZoom = arguments[2] || map.getZoom();
  //   if (currentZoom != targetZoom) {
  //       google.maps.event.addListenerOnce(map, 'zoom_changed', function (event) {
  //       animateMapZoomTo(map, targetZoom, currentZoom + (targetZoom > currentZoom ? 1 : -1));
  //   });
  //   setTimeout(function(){ map.setZoom(currentZoom) }, 80);
  // }
  //}

}
