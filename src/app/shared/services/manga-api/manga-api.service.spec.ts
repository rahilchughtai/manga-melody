import { MangaApiService } from './manga-api.service';
import { JikanApiResponse } from '../../models';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';

fdescribe('MangaApiService', () => {
  let service: MangaApiService;
  let httpTesting: HttpTestingController;

  const mockResponse: JikanApiResponse = {
    data: [],
    pagination: {
      current_page: 1,
      items: {
        count: 0,
        per_page: 0,
        total: 0,
      },
      has_next_page: false,
      last_visible_page: 1,
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(MangaApiService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify(); // Ensure no unmatched requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the API with the correct standard parameters', async () => {
    const mangaData$ = service.getJikanMangaData({});
    const response = firstValueFrom(mangaData$);
    const req = httpTesting.expectOne(
      'https://api.jikan.moe/v4/manga?type=manga&sfw=true&genres_exclude=9,49,12&page=1&limit=24&order_by=score&sort=desc'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
    expect(await response).toEqual(mockResponse);
  });

  it('should overwrite the parameters with custom ones', async () => {
    const mangaData$ = service.getJikanMangaData({ limit: 10, page: 2 });
    const response = firstValueFrom(mangaData$);
    const req = httpTesting.expectOne(req =>
      req.url.startsWith('https://api.jikan.moe/v4/manga')
    );
    expect(req.request.params.get('limit')).toBe('10');
    expect(req.request.params.get('page')).toBe('2');
    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
    expect(await response).toEqual(mockResponse);
  });

  it('should create an empty query from empty form data', () => {
    const query = service.formDataToSearchQuery({});
    expect(query).toEqual({});
  });

  it('should overwrite the given parameters', () => {
    const query = service.formDataToSearchQuery({ limit: 10, page: 2 });
    expect(query).toEqual({
      limit: 10,
      page: 2,
    });
  });
});
