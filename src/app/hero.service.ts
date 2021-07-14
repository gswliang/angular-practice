import { Injectable } from '@angular/core';
import { Hero } from './heros/heros';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operator';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  // mockHeros: Hero[] = [
  //   { id: 11, name: 'Dr Nice' },
  //   { id: 12, name: 'Narco' },
  //   { id: 13, name: 'Bombasto' },
  //   { id: 14, name: 'Celeritas' },
  //   { id: 15, name: 'Magneta' },
  //   { id: 16, name: 'RubberMan' },
  //   { id: 17, name: 'Dynama' },
  //   { id: 18, name: 'Dr IQ' },
  //   { id: 19, name: 'Magma' },
  //   { id: 20, name: 'Tornado' },
  // ];

  private heroesUrl = 'api/heroes';

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  private handlerError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  // getHero(id: number): Observable<Hero | undefined> {
  //   const hero = this.mockHeros.find((x) => x.id === id);
  //   this.messageService.add(`HeroService: fetched Id= ${id}`);
  //   return of(hero);
  // }

  getHero(id: number): Observable<Hero[]> {
    const URL = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero[]>(URL).pipe(
      tap(x => this.log(`fetched hero id = ${id}`)),
      catchError(this.handlerError<Hero>(`getHero id = ${id}`))
    )
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap((x) => this.log('fetched Heroes')),
      catchError(this.handlerError<Hero[]>('getHeroes', []))
    );
  }

  heroSelected(hero: Hero): void {
    this.messageService.add(`Fetch Hero: ${hero.name} are selected`);
  }
}
