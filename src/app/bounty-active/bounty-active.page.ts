import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { Geolocation } = Plugins;
declare var google

@Component({
  selector: 'app-bounty-active',
  templateUrl: './bounty-active.page.html',
  styleUrls: ['./bounty-active.page.scss'],
})
export class BountyActivePage implements OnInit, OnDestroy {
  // this is essentially Angular's version of document.getElementById
  @ViewChild('mapCanvas', { static: true }) mapElement: ElementRef;

  public map: any 
  public gpsInterval: any;
  public currentPosition: any;
  public bountyPosition: any;

  constructor() { }

  ngOnInit() {
    this.loadMap();
  }

  loadMap() {

    Geolocation.getCurrentPosition().then((position) => {

      console.log(position);

      // Step 1. Find out our current location
      this.currentPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
          center: this.currentPosition,
          zoom: 15,
          mapTypeId: "terrain"
      };

      // Step 2. Create the map with our current location at the center
      this.map = new google.maps.Map(
        this.mapElement.nativeElement, // element on the page
        mapOptions // customization options
      )

      // Step 3. Add marker for our current location (should be centered on map)
      new google.maps.Marker({
        map: this.map,
        position: this.currentPosition,
        animation: google.maps.Animation.DROP 
      })

      // Step 4. Find position of bounty
      // add Brock's house (or in the future, a bounty) to the map
      // 41.42215905152405, -96.46686456025819
      this.bountyPosition = new google.maps.LatLng(41.42215905152405, -96.46686456025819)

      // Step 5. Add bounty marker to map
      // new google.maps.Marker({
      //   map: this.map,
      //   position: bountyPosition,
      //   animation: google.maps.Animation.DROP 
      // })

      // Step 7: Update Radius
      this.updateRadius();

      this.setPositionWatcher();
    })
  }

  setPositionWatcher() {
    // Step 8: Set up loop to track location
    this.gpsInterval = Geolocation.watchPosition({
      enableHighAccuracy: false,
      maximumAge: 5000
    }, (position, err) => {
      if(err) {
        console.log('Got error', err)
        return;
      }

      console.log('Got a new position', position, err)
      this.currentPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      this.updateRadius();
    })
  }

  updateRadius(): void {
    // Step 6. Figure out how far away my current location is from the bounty
    const distance = Math.round(google.maps.geometry.spherical.computeDistanceBetween(this.bountyPosition, this.currentPosition))

    console.log("Distance away", distance)

    let radius = 0

    if(distance > 2000) {
      radius = 1000
    } else if(distance <= 2000 && distance > 1000) {
      radius = 500
    } else if(distance <= 1000 && distance > 50) {
      radius = 250
    } else if(distance <= 50) {
      radius = 100
    } else {
      radius = 1
    }

    console.log('Setting radius', radius)

    // Step 7. Instead of marker for bounty, let's overlay a circle
    new google.maps.Circle({
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
      map: this.map,
      center: this.bountyPosition,
      radius
    });
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

  ngOnDestroy() {
    Geolocation.clearWatch(this.gpsInterval)
  }

}
