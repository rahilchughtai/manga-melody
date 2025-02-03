import { MangaDetailsComponent } from './manga-details.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('MangaDetailsComponent', () => {
  let component: MangaDetailsComponent;
  let fixture: ComponentFixture<MangaDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MangaDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MangaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
