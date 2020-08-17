import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../core/interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DatalocalService } from 'src/app/services/datalocal.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() Noticia: Article;
  @Input() Contador: number;
  @Input() enFavoritos;

  constructor(private iab: InAppBrowser, 
              private actionSheetController: ActionSheetController,
              private socialSharing: SocialSharing,
              private datalocal: DatalocalService) { }

  ngOnInit() {}  

  abrirNoticia(){
    console.log(this.Noticia.url);
    const browser = this.iab.create(this.Noticia.url,'_system');
  }

  async lanzarMenu(){
    let guardarBorrarBtn;

    if ( this.enFavoritos ) {

      guardarBorrarBtn = {
        text: 'Borrar Favorito',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Borrar de favorito');
          this.datalocal.borrarNoticia( this.Noticia );
        }
      };

    } else {

      guardarBorrarBtn = {
        text: 'Favorito',
        icon: 'star',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Favorito');
          this.datalocal.guardarNoticia( this.Noticia );
        }
      };

    }

    const actionSheet = await this.actionSheetController.create({      
      buttons: [ {
        text: 'Compartir',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Share clicked');
          this.socialSharing.share(
            this.Noticia.title,
            this.Noticia.source.name,
            '',
            this.Noticia.url
          );
        }
      }, guardarBorrarBtn,
      {
        text: 'Cancelar',
        icon: 'close',
        cssClass: 'action-dark',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();


  }

}
