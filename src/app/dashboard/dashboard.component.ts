import { Component, OnInit } from '@angular/core';
import { Hero } from '../heros/heros';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  topHeroes: Hero[] =[];

  constructor(private heroService: HeroService) { }

  ngOnInit(){
    this.getHeroes();
  }


  getHeroes(){
    this.heroService.getHeroes()
      .subscribe(heroes => this.topHeroes = heroes.slice(1,5));
  }
}
