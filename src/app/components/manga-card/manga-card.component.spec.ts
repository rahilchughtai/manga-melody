import { MangaCardComponent } from './manga-card.component';
import { mockMangaData } from '../../shared/mocks';
import {
  AuthService,
  FavoritesService,
  SnackbarService,
} from '../../shared/services';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';

describe('MangaCardComponent', () => {
  let component: MangaCardComponent;
  let fixture: ComponentFixture<MangaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MangaCardComponent],
      providers: [
        { provide: Firestore, useValue: {} },
        { provide: Auth, useValue: {} },
        AuthService,
        FavoritesService,
        SnackbarService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MangaCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('mangaData', mockMangaData);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
