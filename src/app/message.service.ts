import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  message: string|undefined;

  add(message:string){
    this.message = message;
  }

  clear(){
    this.message = undefined;
  }
}
