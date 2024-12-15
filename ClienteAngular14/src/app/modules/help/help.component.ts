import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { CarouselComponent, OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';
import { ModalCarnetComponent } from '../modals/modal-carnet/modal-carnet.component';
import {PreguntaService} from '../../core/services/firma/pregunta.service';
import {StorageService} from '../docs/components/base-component';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
  providers: [PreguntaService]
})
export class HelpComponent implements OnInit {

  owlIndex: number = 0;
  slide: boolean = false;
  steps: Array<{title: string; description: string}> = [
    {
      title: 'Paso 1',
      description: `Ingreso y registro en Firmaya.cl
      donde obtendrás un PIN de seguridad para firmar`
    },
    {
      title: 'Paso 2',
      description: ``
    },
    {
      title: 'Paso 3',
      description: `Te encontrarás con un primer grupo de documentos que deberás firmar, en donde necesitarás el PIN creado en Firmaya.cl y un código, que será enviado a tu celular a través de mensaje de texto (SMS)`
    },
    {
      title: 'Paso 4',
      description: `Continuarás con la  firma de una última sección de documentos, en donde necesitarás un código enviado a tu celular a través de mensaje de texto (SMS)`
    }
  ];

  owlOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    items: 1,
    navSpeed: 700,
    navText: ['', ''],
    nav: false,
    responsive: {
      0: {
        items: 1
      }
    }
  };

  constructor(
    public sanitizer: DomSanitizer,
    public service: StorageService,
    private preguntasServices: PreguntaService,
    private dialog: MatDialog) {}

  ngOnInit(): void {}

  getDataChange(data, owl: CarouselComponent){
    setTimeout(() => {
      owl.dotsData.dots.forEach((item, i) => {
        if(item.active){
          this.owlIndex = i;
        }
      });
    });
  }

  getFirmaya(){
    // const urlFirma= this.service.docCompartido.documentos[0].firmantes[0].signup_url;
    const signup_url: string = 'https://signpass-plus.idok.cl/users/sign_in?hash=RTd1S2ZtYW51TVBQaHdBVG5FWE9FU3NqZ1RQcHB0N0JpTWFFNDRPbXFHNWF4ckRUUDJLNC9HMy8vWEN1YmlSL2lKSVZzUE5vbTAzbkxjQmcrQzBGVXlrd2tNa3FGVG9NWWNSb2VyZHJORm9EMWsyU21QUWYrUElEZ0FMU011K0dLTU1WQWJ3SjZVMVd1Ty8zVE1WMjVoYk0wOVQya3ZoZUZNTUwwcEI3eTN1R1puOWxrVDVsenNKKzFnclh1L0pRaFNwNngrY2xtaHdVaDgzaWIxeGJhRW5yd01VdTkrcjJxd21KQWRndGpsZUM4WS9FWERiYXRkdlBybG5NVzJvanBDTTNDSnBHUG9sVVExcjJrOHZPdUV1M1NCK3BvTzd0YlE1cVFvRlNOdGJBSmZSc3FlT3o3MzhaTkgydUdZQVJiR3JKQWM1YVdmNGkrQWJpNmQvVlhFR1dpRk42SjE2dGMweDBYN3lKVEszUGEzYU1wQUx5Z09aYi9FeHBDOW9OZjlwNWpWbzFXQ2RxcUxFQU5JYmJUZz09LS1XbVlBQUVScTNEOHRuanlGdUdFUGhBPT0%3D--e48d27111c271c9cc029b84b0c847436cf85bbcb';
  }

  openCarnet(){
    this.dialog.open(ModalCarnetComponent);
  }

}
