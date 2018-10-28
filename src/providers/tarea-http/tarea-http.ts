import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the TareaHttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TareaHttpProvider {
  url 
  headers
  constructor(public http: HttpClient) {
    this.url = localStorage.getItem('url');
    let jwt = localStorage.getItem('jwt');
    console.log(jwt);
    
    this.headers = new HttpHeaders({ 'Authorization' : 'Bearer ' + jwt});
    console.log('Hello TareaHttpProvider Provider');
  }
  obteberTareas(){
   
    
    return this.http.get(this.url + 'tareas', { headers: this.headers})
      // datos => {
      //   console.log(datos);
        
      // }
  }

  agregarTareas(tarea){
   return this.http.post(this.url + 'tareas', {tarea: {
      titulo:tarea,
      finalizada:false
     }}, { headers: this.headers})
     //.subscribe(
    //   datos => console.log(datos)
      
    //)
  }

  editarTarea(tarea, itemChange){
    return this.http.put(this.url + 'tareas/' + tarea.id, {tarea:{
      titulo:itemChange
      
     }}, { headers: this.headers})//.subscribe(
    //   datos => console.log(datos)
      
    // )
}

}
