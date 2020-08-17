import { RespuestaTopHeadLines, Article } from './../../core/interfaces/interfaces';
import { NewsService } from './../../services/news.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {


  noticias: Article[] = [];


  constructor(private ns: NewsService) {}


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

   this.cargarNoticias();
    
  }

  loadData(evento){
    console.log(evento);
      this.cargarNoticias(evento);
  }

  cargarNoticias(evento?){
    this.ns.getTopHeadLines().subscribe((resp)=>{
      console.log(resp);
      this.noticias.push( ...resp.articles );

      if (resp.articles.length === 0) {
        evento.target.disabled = true;
        evento.target.complete(); 
        return;
      }

      if (evento) {
        evento.target.complete();        
      }

    });
  }

}
