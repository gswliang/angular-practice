import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import { Location} from '@angular/common'

import { HeroService } from '../hero.service';
import { Hero } from '../heros/heros';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero|undefined;
  test: string ='';
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero() : void{
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(x => this.hero = x)

  }

  goBack(){
    this.location.back();

  }
  nameChange(event:any){
    this.test = event.target.value;
    console.log(this.test)
  }

}
