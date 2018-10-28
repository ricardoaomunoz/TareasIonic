import { Component } from '@angular/core';
import { NavController, AlertController, ToastController } from 'ionic-angular';
import { TareaProvider } from '../../providers/tarea/tarea';
import { TareasArchivadasPage } from '../tareas-archivadas/tareas-archivadas';
import { TareaHttpProvider } from '../../providers/tarea-http/tarea-http';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  tareas = []
  constructor(
    public navCtrl: NavController,
    public alerta: AlertController,
    private servicioTareas: TareaProvider,
    private tareaHttp: TareaHttpProvider,
    private toast: ToastController
    ) {
  //  this.tareas = servicioTareas.obtenerTareas();
  
  }
  ionViewDidLoad(){
    this.tareaHttp.obteberTareas().subscribe(
      (datos: any[]) => {
        this.tareas = datos; 
      }
    );
  }

  agregarTarea(){
    let alert = this.alerta.create({
      title: "Agregar tarea",
      message: "tarea....",
      inputs:[{
        type: "text",
        name: "textoTarea"
      }],
      buttons: [{text: "Cancelar"},
      {text: "Agregar",
      handler: (dato) => {
        console.log(dato);
        // this.tareas.push(dato.textoTarea);
        // this.servicioTareas.agregarTarea(dato.textoTarea);
        this.tareaHttp.agregarTareas(dato.textoTarea).subscribe(
          (datos) => {
            this.tareas.push(datos);
          }
        );
      }
    }
      ]
    });
    alert.present();
  }

  editarTarea(indice, tarea){
    let alert = this.alerta.create({
      title: "Editar tarea",
      message: "tarea....",
      inputs:[{
        type: "text",
        name: "textoTarea",
        value: tarea.titulo
      }],
      buttons: [{text: "Cancelar"},
      {text: "Guardar",
      handler: (dato) => {
        // this.servicioTareas.editarTarea(dato.textoTarea, indice);
        console.log(tarea);
        
        this.tareaHttp.editarTarea(tarea, dato.textoTarea).subscribe(
          (datos) => {
            this.tareas[indice] = datos;
          }
        );
        let toast = this.toast.create({
          message: "tarea editada exitosamente",
          duration : 2000
        });
        toast.present();
                // console.log(dato);
        // this.tareas.push(dato.textoTarea);
        // this.servicioTareas.agregarTarea(dato.textoTarea);
        // this.tareaHttp.agregarTareas(dato.textoTarea).subscribe(
        //   (datos) => {
        //     this.tareas.push(datos);
        //   }
        // );
      }
    }
      ]
    });
    alert.present();

  }
  irPaginaArchivadas(){
    this.navCtrl.push(TareasArchivadasPage);
  }
  archivarTarea(indice){
    this.servicioTareas.archivarTarea(indice)
  }

}
