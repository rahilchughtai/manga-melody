import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  GenreItem,
  JikanApiRequestParam,
  JikanApiResponse,
  ExtendedSearchFormData
} from '../../models';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MangaApiService {
  http = inject(HttpClient);

  private BASE_URL = 'https://api.jikan.moe/v4';

  private standardParams: JikanApiRequestParam = {
    type: 'manga',
    sfw: true,
    genres_exclude: '9,49,12',
    page: 1,
    limit: 24,
    order_by: 'score',
    sort: 'desc',
  };

  private overwriteParams(params: JikanApiRequestParam) {
    return {
      ...this.standardParams,
      ...params,
    };
  }

  private mangaGenreToParam(genres: GenreItem[]): string {
    if (!genres.length) return '';
    let genreParams = '';
    genres.forEach((genre, idx) => {
      genreParams += genre.mal_id;
      if (idx !== genres.length - 1) genreParams += ',';
    });

    return genreParams;
  }

  public formDataToSearchQuery(
    formData: Partial<ExtendedSearchFormData>
  ): JikanApiRequestParam {
    const { searchTerm, status, orderBy, genre, sortBy, page, limit } = formData;
    return {
      ...(searchTerm && { q: searchTerm }),
      ...(status && { status }),
      ...(genre && { genres: this.mangaGenreToParam(genre) }),
      ...(orderBy && { order_by: orderBy }),
      ...(sortBy && { sort: sortBy }),
      ...(page && { page }),
      ...(limit && { limit }),
    };
  }

  public getJikanMangaData(
    requestParameters: JikanApiRequestParam
  ): Observable<JikanApiResponse | undefined> {
    const params = this.overwriteParams(requestParameters);
    return this.http
      .get<JikanApiResponse>(`${this.BASE_URL}/manga`, { params })
      .pipe(catchError(() => of(undefined)));
  }
}
