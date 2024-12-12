import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { JikanApiRequestParam, JikanApiResponse } from '../../models';

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

  public getJikanMangaData(requestParameters: JikanApiRequestParam) {
    const params = this.overwriteParams(requestParameters);
    return this.http.get<JikanApiResponse>(`${this.BASE_URL}/manga`, { params });
  }
}
