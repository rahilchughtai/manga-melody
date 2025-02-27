import { FavoritesService } from './favorites.service';
import { mockMangaData } from '../../mocks';
import { TestBed } from '@angular/core/testing';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';

describe('FavoritesService', () => {
  let service: FavoritesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Firestore, useValue: {} },
        { provide: Auth, useValue: {} },
      ],
    });
    service = TestBed.inject(FavoritesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not add the same manga to favorites twice', () => {
    // Add a manga to favorites
    service.addMangaFavorite(mockMangaData);

    // Add the same manga to favorites
    service.addMangaFavorite(mockMangaData);

    // Ensure the manga is only added once
    expect(service.mangaFavorites().length).toBe(1);
  });

  it('should add two manga if they are different', () => {
    // Add some favorites first
    service.addMangaFavorite(mockMangaData);
    service.addMangaFavorite({ ...mockMangaData, mal_id: 123 });
    // Ensure favorites are added
    expect(service.mangaFavorites().length).toBe(2);
  });

  it('should clear all favorites', () => {
    // Add some favorites first
    service.addMangaFavorite(mockMangaData);
    // Clear the favorites
    service.clearFavorites();
    // Ensure favorites are cleared
    expect(service.mangaFavorites().length).toBe(0);
  });

  it('should return true if a given manga is already a favorite', () => {
    // Add a manga to favorites
    service.addMangaFavorite(mockMangaData);
    // Ensure the manga is a favorite
    expect(service.isFavorite(mockMangaData)()).toBeTrue();
  });

  it('should return false if a given manga is not a favorite', () => {
    // Add a manga to favorites
    service.addMangaFavorite(mockMangaData);
    // Ensure the manga is a favorite
    expect(service.isFavorite({ ...mockMangaData, mal_id: 123 })()).toBeFalse();
  });
});
