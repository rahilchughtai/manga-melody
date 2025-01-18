import { Component, computed, inject, signal } from '@angular/core';
import { SearchFieldComponent } from '../../components/search-field/search-field.component';
import { ExtendedSearchFormData, SearchFormData } from '../../shared/models';
import { MangaListComponent } from '../../components/manga-list/manga-list.component';
import { rxResource } from '@angular/core/rxjs-interop';
import { MangaApiService } from '../../shared/services';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  imports: [SearchFieldComponent, MangaListComponent, MatPaginatorModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  private mangaApiService = inject(MangaApiService);
  private searchFieldSig = signal<Partial<ExtendedSearchFormData>>({});

  public handleSearchChange(searchForm: Partial<SearchFormData>) {
    this.searchFieldSig.set(searchForm);
  }

  public mangaDataResponse = rxResource({
    request: this.searchFieldSig,
    loader: ({ request }) =>
      this.mangaApiService.getJikanMangaData(
        this.mangaApiService.formDataToSearchQuery(request)
      ),
  }).asReadonly();

  public pageSig = computed(
    () => this.mangaDataResponse.value()?.pagination.current_page
  );

  public mangaListSig = computed(
    () => this.mangaDataResponse.value()?.data ?? []
  );

  public totalItemsSig = computed(
    () => this.mangaDataResponse.value()?.pagination.items.total
  );

  public pageSizeSig = computed(
    () => this.mangaDataResponse.value()?.pagination.items.per_page
  );

  pageEvent(pageEvent: PageEvent) {
    const { pageIndex, pageSize } = pageEvent;
    this.searchFieldSig.set({ page: pageIndex + 1, limit: pageSize });
  }
}
