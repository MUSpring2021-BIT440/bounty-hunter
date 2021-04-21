import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import jsQR from "jsqr";

@Component({
  selector: 'app-bounty-claim',
  templateUrl: './bounty-claim.page.html',
  styleUrls: ['./bounty-claim.page.scss'],
})
export class BountyClaimPage implements OnInit, OnDestroy {
  @ViewChild('scannerCanvas', { static: true }) scannerElement: ElementRef<HTMLCanvasElement>;
  @ViewChild('videoElement', { static: true }) videoElement: ElementRef;

  private canvasContext: CanvasRenderingContext2D;
  private animationFrameRequest: any;

  constructor(private router: Router) { }

  ngOnInit() {
    this.canvasContext = this.scannerElement.nativeElement.getContext('2d')
  
    this.claimBounty();
  }

  claimBounty() { 
    // Use facingMode: environment to attemt to get the front camera on phones
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then( (stream) => {
      this.videoElement.nativeElement.srcObject = stream;
      this.videoElement.nativeElement.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
      this.videoElement.nativeElement.play();
      this.animationFrameRequest = requestAnimationFrame(() => this.tick());
    });
  }

  tick() {
    if (this.videoElement.nativeElement.readyState === this.videoElement.nativeElement.HAVE_ENOUGH_DATA) {
      this.canvasContext.canvas.height = this.videoElement.nativeElement.videoHeight;
      this.canvasContext.canvas.width = this.videoElement.nativeElement.videoWidth;
      this.canvasContext.drawImage(this.videoElement.nativeElement, 0, 0, this.canvasContext.canvas.width, this.canvasContext.canvas.height);
      var imageData =  this.canvasContext.getImageData(0, 0,  this.canvasContext.canvas.width,  this.canvasContext.canvas.height);
      var code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert",
      });
      if (code) {
        console.log({code})
        alert('BOUNTY CLAIMED!');
        this.router.navigate(['bounty-board']);
      }
    }
    this.animationFrameRequest = requestAnimationFrame(() => this.tick());
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.animationFrameRequest)
  }

}
