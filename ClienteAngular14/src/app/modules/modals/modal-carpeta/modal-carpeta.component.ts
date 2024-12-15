import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-modal-carpeta-digital',
  templateUrl: './modal-carpeta.component.html',
  styleUrls: ['./modal-carpeta.component.scss']
})
export class ModalCarpetaComponent implements OnInit, AfterViewInit {

  url = '';

  @ViewChild('iframe') iframe: ElementRef;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.iframe.nativeElement.setAttribute('src', this.url);
  }

}
