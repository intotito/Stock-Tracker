import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageSaverService {
  private canvas: HTMLCanvasElement;
  constructor() { }
  setCanvas(canvas: HTMLCanvasElement){
    this.canvas = canvas;
  }
  saveImage(){
    console.log(this.canvas.height+ ":" + this.canvas.width);
    var dataUrl = this.canvas.toDataURL();
    var data = dataUrl.split(',')[1];
    let blob = this.b64toBlob(data, 'image/png');
 
    var a = window.document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = 'canvasimage.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
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
