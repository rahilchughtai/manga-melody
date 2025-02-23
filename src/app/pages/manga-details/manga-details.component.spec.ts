import { MangaDetailsComponent } from './manga-details.component';
import { mockMangaData } from '../../shared/mocks';
import { MangaNavigationData } from '../../shared/models';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Router } from '@angular/router';

describe('MangaDetailsComponent', () => {
  let component: MangaDetailsComponent;
  let fixture: ComponentFixture<MangaDetailsComponent>;
  const mockState: MangaNavigationData = {
    mangaData: mockMangaData,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MangaDetailsComponent],
      providers: [
        provideAnimationsAsync(),
        { provide: Firestore, useValue: {} },
        { provide: Auth, useValue: {} },
        {
          provide: Router,
          useValue: {
            getCurrentNavigation: () => ({
              extras: { state: mockState },
            }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MangaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
