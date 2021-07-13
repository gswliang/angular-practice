import { Component, OnInit } from '@angular/core';
import { Hero } from './heros';
import { HeroService } from '../hero.service';


@Component({
  selector: 'app-heros',
  templateUrl: './heros.component.html',
  styleUrls: ['./heros.component.css'],
  providers:[HeroService]
})
export class HerosComponent implements OnInit {


  constructor(private heroService : HeroService){}
  mockHero: Hero[] =[];

  ngOnInit(): void {
    this.getHeroes();
  }


  getHeroes(){
    this.heroService.getHeroes()
      .subscribe(heroes => this.mockHero = heroes);
  }
  
}
