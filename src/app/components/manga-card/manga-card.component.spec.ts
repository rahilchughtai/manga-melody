import { MangaCardComponent } from './manga-card.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('MangaCardComponent', () => {
  let component: MangaCardComponent;
  let fixture: ComponentFixture<MangaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MangaCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MangaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
