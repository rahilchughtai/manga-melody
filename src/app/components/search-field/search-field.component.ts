import {
  ALL_MANGA_STATUS,
  ALL_ORDER_BY_SORT_BY_ATTRIBUTES,
  GenreItem,
  MangaOrderByAttributeType,
  SearchFormData,
  MangaStatusType,
  MangaSortMethod,
} from '../../shared/models';
import { MangaGenresSorted } from '../../shared/utils/genres';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { pairwise, map, startWith, debounce, timer } from 'rxjs';

@Component({
  selector: 'app-search-field',
  imports: [
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './search-field.component.html',
  styleUrl: './search-field.component.scss',
})
export class SearchFieldComponent {
  private defaultSortMethod: MangaSortMethod = 'desc';
  private debounceTimer = 500;
  public mangaSearchForm = new FormGroup({
    searchTerm: new FormControl(''),
    status: new FormControl<MangaStatusType | null>(null),
    orderBy: new FormControl<MangaOrderByAttributeType | null>(null),
    genre: new FormControl<GenreItem[] | null>(null),
    sortBy: new FormControl<MangaSortMethod>(this.defaultSortMethod),
  });

  public allMangaGenres = MangaGenresSorted;
  public allMangaStatus = ALL_MANGA_STATUS;
  public orderByAttributes = ALL_ORDER_BY_SORT_BY_ATTRIBUTES;

  public toggleSortMethod() {
    const currentSortMethod =
      this.mangaSearchForm.get('sortBy')?.value || this.defaultSortMethod;
    const newSortMethod = currentSortMethod === 'asc' ? 'desc' : 'asc';
    this.mangaSearchForm.patchValue({ sortBy: newSortMethod });
  }

  public debouncedSearch = this.mangaSearchForm.valueChanges.pipe(
    startWith(this.mangaSearchForm.value),
    pairwise(),
    debounce(([previous, current]) =>
      previous.searchTerm !== current.searchTerm
        ? timer(this.debounceTimer)
        : timer(0)
    ),
    map(([_, current]) => current)
  );

  public search = outputFromObservable<Partial<SearchFormData>>(
    this.debouncedSearch
  );
}
