import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { Article } from 'src/app/core/interfaces/interfaces';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  @ViewChild('ion-segment', {static: true}) segment: IonSegment;

  categorias = ['entertainment',  'general', 'health', 'science', 'sports', 'technology'];

  noticias: Article[] = [];

  constructor(private ns: NewsService) {}

  ngOnInit(){
    this.cargarNoticias(this.categorias[0]);
  }


  cambioCategoria(evento){

    console.log(evento.detail.value);
    this.noticias = [];

    this.cargarNoticias(evento.detail.value);

  }

  cargarNoticias(categoria: string, evento?){
     //this.segment.value = this.categorias[0];


     this.ns.getTopHeadLinesCategory(categoria).subscribe((resultado)=>{
      console.log(resultado);
      this.noticias.push( ...resultado.articles);

      if (evento) {
        evento.target.complete(); 
      }

    });
  }

  loadData(evento){

    this.cargarNoticias(this.categorias[0], evento);

  }




}
