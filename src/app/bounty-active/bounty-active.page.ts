import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Router } from '@angular/router';

// object destructuring (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
const { Geolocation } = Plugins;
// const geolocation = Plugins.Geolocation;

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

  public userLocation: any;
  public bountyLocation: any = {
    latitude: 41.451861710348645,
    longitude: -96.48415217309466
  }
  private watcherId: string;
  private userRawPosition: any = {
    coords: {}
  }
  private userMarker: any;
  private bountyCircle: any;
  private userLocationObject: any;

  constructor(private router: Router) { }

  ngOnInit() {
    this.loadMap().then( () => {
      console.log('shit got resolved');
      this.watchLocation();
    })
  }

  loadMap() {
    return Geolocation.getCurrentPosition().then(position => {
      // the users current position
      this.userLocationObject = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)

      const mapOptions = {
        zoom: 12,
        center: this.userLocationObject
      }
      
      this.map = new google.maps.Map(
        this.mapElement.nativeElement, // element on the page
        mapOptions // customization options
      )

      return Promise.resolve()
    })
    
  }

  watchLocation() {
    console.log('Watching location');

    const positionOptions = {
      maximumAge: 0,
      enableHighAccuracy: false
    }

    this.watcherId = Geolocation.watchPosition(positionOptions, (position) => {
      
      console.log('Got watched position', position);

      if(
        !position ||
        !position.coords ||
        this.userRawPosition.coords.latitude === position.coords.latitude &&
        this.userRawPosition.coords.longitude === position.coords.longitude
      ) {
        console.log('Same location, skipping rest of function', this.userRawPosition, position);
        return false;
        }

      // save for the next time this runs
      this.userRawPosition = position;

      console.log("Position: ", position);

      this.updateUserLocation();
      this.updateBountyCircle();
  
    })

  }

  updateUserLocation() {
    // the users current position
    this.userLocationObject = new google.maps.LatLng(
      this.userRawPosition.coords.latitude,
      this.userRawPosition.coords.longitude
    )

    // this marker is the users current position
    if(this.userMarker) this.userMarker.setMap(null);
    this.userMarker = new google.maps.Marker({
      map: this.map,
      position: this.userLocationObject,
      animation: google.maps.Animation.DROP 
    })
  }

  updateBountyCircle() {
    const bountyLocationObject = new google.maps.LatLng(this.bountyLocation.latitude, this.bountyLocation.longitude)

    const distanceToBounty = Math.round(
      google.maps.geometry.spherical.computeDistanceBetween(this.userLocationObject, bountyLocationObject)
    )

    console.log('Distance to the bounty:', distanceToBounty);

    let radius
    // calculate size of the radius
    if (distanceToBounty > 1000) {
      radius = 500
    } else if (distanceToBounty <= 1000 && distanceToBounty > 500) {
      radius = 300
    } else if (distanceToBounty <= 500 && distanceToBounty > 100) {
      radius = 100
    } else {
      radius = 25
    }

    if(this.bountyCircle) this.bountyCircle.setMap(null);

    this.bountyCircle = new google.maps.Circle({
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
      map: this.map,
      center: bountyLocationObject,
      radius
    });
  }

  claimBounty() {
    this.router.navigate(['bounty-claim']);
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

  }

}
