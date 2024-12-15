import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-preload',
  templateUrl: './preload.component.html',
  styleUrls: [`./preload.component.scss`]
})
export class PreloadComponent implements OnInit {

  @Input() message: string = `Por favor espere mientras firmamos sus documentos.`;

  constructor() {}

  ngOnInit() {
  }

}
