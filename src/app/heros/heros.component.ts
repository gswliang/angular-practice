import { Component, OnInit } from '@angular/core';
import { Hero } from './heros';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heros',
  templateUrl: './heros.component.html',
  styleUrls: ['./heros.component.css'],
  providers: [HeroService],
})
export class HerosComponent implements OnInit {
  constructor(private heroService: HeroService) {}
  mockHero: Hero[] = [];
  heroName: string = '';

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes() {
    this.heroService
      .getHeroes()
      .subscribe((heroes) => (this.mockHero = heroes));
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    console.log('You just added:', name);

    this.heroService
      .addHero({ name } as Hero)
      .subscribe((hero) => this.mockHero.push(hero));

  }

  delete(hero: Hero): void {
    this.mockHero = this.mockHero.filter(x => x !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
}
