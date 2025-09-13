import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../src/repositories/film-repository.js', () => ({
  listAll: vi.fn((opts, cb) => cb(null, [{ film_id: 1, title: 'A', description: '', release_year: 2000 }])),
  countAll: vi.fn((cb) => cb(null, 1)),
  listByCategory: vi.fn((args, cb) => cb(null, [])),
  countByCategory: vi.fn((args, cb) => cb(null, 0)),
}));

vi.mock('../src/repositories/store-repository.js', () => ({
  GetStoresAvailableFilm: vi.fn((filmId, cb) => cb(null, [{ store_id: 1, address: 'Main St.' }]))
}));

import * as FilmService from '../src/services/film-service.js';
import * as FilmRepo from '../src/repositories/film-repository.js';
import { GetStoresAvailableFilm } from '../src/repositories/store-repository.js';

describe('film-service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('GetFilms returns items and total with sane pagination', (done) => {
    FilmService.GetFilms({ page: 1, size: 10 }, (err, result) => {
      expect(err).toBeNull();
      expect(result.items).toHaveLength(1);
      expect(result.total).toBe(1);
      expect(FilmRepo.listAll).toHaveBeenCalled();
      expect(FilmRepo.countAll).toHaveBeenCalled();
    });
  });

  it('GetAvailable returns list of stores by film id', (done) => {
    FilmService.GetAvailable(123, (err, stores) => {
      expect(err).toBeNull();
      expect(stores).toEqual([{ store_id: 1, address: 'Main St.' }]);
      expect(GetStoresAvailableFilm).toHaveBeenCalledWith(123, expect.any(Function));
    });
  });
});
