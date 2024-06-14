import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http'; 
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { PhotoService } from './photo.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let photoService: jasmine.SpyObj<PhotoService>;

  beforeEach(() => {
    const photoServiceSpy = jasmine.createSpyObj('PhotoService', ['getPhotos']);

    TestBed.configureTestingModule({
      imports: [AppComponent, HttpClientTestingModule],
      providers: [{ provide: PhotoService, useValue: photoServiceSpy }, HttpClient],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    photoService = TestBed.inject(PhotoService) as jasmine.SpyObj<PhotoService>;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch photos on initialization', () => {
    const mockPhotos = [{ id: 1, title: 'Photo 1' }, { id: 2, title: 'Photo 2' }];
    photoService.getPhotos.and.returnValue(of(mockPhotos));

    component.ngOnInit();

    expect(photoService.getPhotos).toHaveBeenCalled();
    expect(component.photos).toEqual(mockPhotos);
  });
});
