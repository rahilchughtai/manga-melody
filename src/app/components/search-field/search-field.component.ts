import { Component, OnInit, output } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GenreItem, MangaOrderByAttributeType, MangaSortMethod, MangaStatusType } from '../../shared/models';
import { CommonModule } from '@angular/common';
interface SearchForm {
  mangaStatus: MangaStatusType | null;
  mangaSearchTerm: string;
  mangaGenre: GenreItem[];
  mangaOrderBy: MangaOrderByAttributeType | null;
  mangaSortMethod: MangaSortMethod;
}

@Component({
  selector: 'app-search-field',
  imports: [
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule

  ],
  templateUrl: './search-field.component.html',
  styleUrl: './search-field.component.scss'
})

export class SearchFieldComponent implements OnInit {
  mangaSearchForm = new FormGroup({
    searchTerm: new FormControl(''),
    genre: new FormControl([]),
  })

  search = output<SearchForm>();

  ngOnInit() {
    this.mangaSearchForm.valueChanges.subscribe((formValue) => {
      console.log(formValue);
    });

  }
}