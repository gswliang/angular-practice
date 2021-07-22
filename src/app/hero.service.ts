import { Injectable } from '@angular/core';
import { Hero } from './heros/heros';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroesUrl = 'api/heroes';
  httpOptions = {
    headers: new HttpHeaders({ 'content-type': 'application/json' }),
  };

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  getHero(id: number): Observable<Hero> {
    const URL = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(URL).pipe(
      tap((x) => console.log(x)),
      catchError(this.handlerError<Hero>(`getHero id = ${id}`))
    );
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap((x) => this.log('fetched Heroes')),
      catchError(this.handlerError<Hero[]>('getHeroes', []))
    );
  }

  //Edit
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((x) => this.log(`updated hero id = ${hero.id}`)),
      catchError(this.handlerError<any>('updateHero'))
    );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero) => this.log(`Add Hero w/Id: ${newHero.id}`)),
      catchError(this.handlerError<Hero>('AddHero'))
    );
  }

  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url).pipe(
      tap((x) => this.log(`Hero id = ${id} deleted!`)),
      catchError(this.handlerError<Hero>('DeleteHero'))
    );
  }

  searchHero(term: string): Observable<Hero[]> {
    // if (!term.trim()) {
    //   return this.http.get<Hero[]>(this.heroesUrl).pipe(
    //     tap(x => this.log(""))
    //   )
    // }

    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
          this.log(`found heroes matching ${term}`):
          this.log(`no hero matching ${term}`)
        ),
        catchError(this.handlerError<Hero[]>('SerachHero',[]))
    )
  }

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
}
