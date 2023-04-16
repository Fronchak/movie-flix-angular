import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMoviePageComponent } from './update-movie-page.component';

describe('UpdateMoviePageComponent', () => {
  let component: UpdateMoviePageComponent;
  let fixture: ComponentFixture<UpdateMoviePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateMoviePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateMoviePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
