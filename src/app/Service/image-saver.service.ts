import { Injectable } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery';
import { Base64ToGalleryOptions } from '@ionic-native/base64-to-gallery';

@Injectable({
  providedIn: 'root'
})
export class ImageSaverService {
  private symbol: string;
  private canvas: HTMLCanvasElement;
  constructor(private platform: Platform, 
 //   private base64ToGallery: Base64ToGallery, 
    private toastCtrl: ToastController) { }
  setCanvas(canvas: HTMLCanvasElement, symbol: string){
    this.canvas = canvas;
    this.symbol = symbol;
  }
  saveImage(){
// https://devdactic.com/ionic-canvas-drawing-files/

    console.log(this.canvas.height+ ":" + this.canvas.width);
    var dataUrl = this.canvas.toDataURL();
    var data = dataUrl.split(',')[1];
    let blob = this.b64toBlob(data, 'image/png');
 
    if (this.platform.is('cordova')) {
 /*     const options: Base64ToGalleryOptions = { prefix: 'canvas_', mediaScanner:  true };
   
      this.base64ToGallery.base64ToGallery(dataUrl, options).then(
        async res => {
          const toast = await this.toastCtrl.create({
            message: 'Image saved to camera roll.',
            duration: 2000
          });
          toast.present();
        },
        err => console.log('Error saving image to gallery ', err)
      );
      */         } else{
      var a = window.document.createElement('a');
      a.href = window.URL.createObjectURL(blob);
      a.download = this.symbol + ".png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }

  
  // https://forum.ionicframework.com/t/save-base64-encoded-image-to-specific-filepath/96180/3
  b64toBlob(b64Data, contentType) {
  contentType = contentType || '';
  var sliceSize = 512;
  var byteCharacters = atob(b64Data);
  var byteArrays = [];
 
  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);
 
    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
 
    var byteArray = new Uint8Array(byteNumbers);
 
    byteArrays.push(byteArray);
  }
 
  var blob = new Blob(byteArrays, { type: contentType });
  return blob;
}
}
