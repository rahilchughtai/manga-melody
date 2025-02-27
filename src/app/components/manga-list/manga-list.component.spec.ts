import { MangaListComponent } from './manga-list.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('MangaListComponent', () => {
  let component: MangaListComponent;
  let fixture: ComponentFixture<MangaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MangaListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MangaListComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('mangaList', []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
