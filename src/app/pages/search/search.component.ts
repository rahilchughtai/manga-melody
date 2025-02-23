import { MangaListComponent } from '../../components/manga-list/manga-list.component';
import { SearchFieldComponent } from '../../components/search-field/search-field.component';
import { ExtendedSearchFormData, SearchFormData } from '../../shared/models';
import { MangaApiService } from '../../shared/services';
import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-search',
  imports: [
    SearchFieldComponent,
    MangaListComponent,
    MatPaginatorModule,
    CommonModule,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  /** MangaApiService to fetch manga data */
  private mangaApiService = inject(MangaApiService);

  /** Signal for the search field value */
  private searchFieldSig = signal<Partial<ExtendedSearchFormData>>({});

  /** Function that reacts to changes in the search */
  public handleSearchChange(searchForm: Partial<SearchFormData>) {
    this.searchFieldSig.set(searchForm);
  }

  /** A readonly resource that fetches manga data from the Jikan API */
  public mangaDataResponse = rxResource({
    request: this.searchFieldSig,
    loader: ({ request }) =>
      this.mangaApiService.getJikanMangaData(
        this.mangaApiService.formDataToSearchQuery(request)
      ),
  }).asReadonly();

  /** Computed signal that holds the current page number */
  public pageSig = computed(
    () => this.mangaDataResponse.value()?.pagination.current_page
  );

  /** Computed signal that holds the list of manga */
  public mangaListSig = computed(
    () => this.mangaDataResponse.value()?.data ?? []
  );

  /** Computed signal that holds the total number of items */
  public totalItemsSig = computed(
    () => this.mangaDataResponse.value()?.pagination.items.total
  );

  /** Computed signal that holds the number of items per page */
  public pageSizeSig = computed(
    () => this.mangaDataResponse.value()?.pagination.items.per_page
  );

  /** Function that handles the page change event */
  public pageEvent(pageEvent: PageEvent) {
    const { pageIndex, pageSize } = pageEvent;
    this.searchFieldSig.set({ page: pageIndex + 1, limit: pageSize });
  }
}
