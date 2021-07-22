import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs/operators';
import { HeroService } from '../hero.service';
import { Hero } from '../heros/heros';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css'],
})
export class HeroSearchComponent implements OnInit {
  hero$!: Observable<Hero[]>;
  private searchTerm = new Subject<string>();

  constructor(private heroService: HeroService) {}

  //push search term into the observable stream
  search(term: string): void {
    this.searchTerm.next(term);
  }

  ngOnInit() {
    this.hero$ = this.searchTerm.pipe(
      debounceTime(300),
      distinctUntilChanged(), // ignore new term if same as previous term
      switchMap((term: string) => this.heroService.searchHero(term)) // switch to new search observable each time the term changes
    );
  }
}
