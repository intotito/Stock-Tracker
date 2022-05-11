import { Component } from '@angular/core';
import { ImageSaverService } from './Service/image-saver.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private imageSaver: ImageSaverService) {}

  saveImage(): void{
    console.log("Image saved");
    this.imageSaver.saveImage();

    
  }
}
