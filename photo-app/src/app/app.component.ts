import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PhotoService } from './photo.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  photos: any[] = [];

  constructor(private photoService: PhotoService) { }

  ngOnInit() {
    this.photoService.getPhotos().subscribe((data: any) => {
      this.photos = data;
    });
  }
}
