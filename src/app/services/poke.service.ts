import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { Pokemon } from '../interfaces/pokemon.interface';

@Injectable({
  providedIn: 'root'
})
export class PokeService {
  private pokemonApiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  getPokemonList(limit: number = 5, offset: number = 0): Observable<{ pokemons: Pokemon[], total: number }> {
    return this.http.get<any>(`${this.pokemonApiUrl}?limit=${limit}&offset=${offset}`).pipe(
      map((response) => ({
        pokemonUrls: response.results as { name: string, url: string }[],
        total: response.count as number,
      })),
      switchMap((result) =>
        forkJoin(
          result.pokemonUrls.map((pokemon) => 
            this.http.get<Pokemon>(pokemon.url)
          )
        ).pipe(
          map((pokemons: Pokemon[]) => ({
            pokemons: pokemons,
            total: result.total,
          }))
        )
      )
    );
  }
}
