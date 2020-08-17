import { environment } from './../../environments/environment';
import { RespuestaTopHeadLines } from './../core/interfaces/interfaces';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-Key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  //UrlMain:string = `http://newsapi.org/v2/top-headlines?country=us&apiKey=138f0dbeff134fb7a39014638de514c5`;
  headlinesPage = 0;

  categoriaActual: string;
  categoriaPage = 0;
  
  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>(query: string){

    query = apiUrl + query;
    //console.log(query);

    return this.http.get<T>( query, { headers } );
  }

  getTopHeadLines(){
    this.headlinesPage++;
    return this.ejecutarQuery<RespuestaTopHeadLines>(`/top-headlines?country=us&page=${ this.headlinesPage }`);
   // return this.http.get<RespuestaTopHeadLines>(this.UrlMain);
  }

  getTopHeadLinesCategory(categoria: string){
    //console.log(categoria);
    if (this.categoriaActual === categoria) {
      this.categoriaPage++;
    }else{
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }

    //console.log(`/top-headlines?country=us&category=business&category=${categoria}`);
    return this.ejecutarQuery<RespuestaTopHeadLines>(`/top-headlines?country=co&category=business&category=${categoria}&page=${ this.categoriaPage }`);
   // return this.http.get('https://newsapi.org/v2/top-headlines?country=de&category=business&apiKey=138f0dbeff134fb7a39014638de514c5');
  }



}
