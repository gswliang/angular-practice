import { Injectable } from '@angular/core';
import { Hero } from './heros/heros';
import {Observable, of} from 'rxjs'
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})


export class HeroService {
  mockHeros: Hero[]=[
    { id: 11, name: 'Dr Nice' },
    { id: 12, name: 'Narco' },
    { id: 13, name: 'Bombasto' },
    { id: 14, name: 'Celeritas' },
    { id: 15, name: 'Magneta' },
    { id: 16, name: 'RubberMan' },
    { id: 17, name: 'Dynama' },
    { id: 18, name: 'Dr IQ' },
    { id: 19, name: 'Magma' },
    { id: 20, name: 'Tornado' }
];

  constructor(private messageService: MessageService) { }
 
  getHero(id: number): Observable<Hero|undefined>{
    
    const hero = this.mockHeros.find(x=> x.id === id);
    this.messageService.add(`HeroService: fetched Id= ${id}`)
    return of(hero);    
  } 

  getHeroes():Observable<Hero[]>{
    const heroes = of(this.mockHeros);
    return heroes
  }
  
  heroSelected(hero:Hero):void{
    this.messageService.add(`Fetch Hero: ${hero.name} are selected`)
  }
}
