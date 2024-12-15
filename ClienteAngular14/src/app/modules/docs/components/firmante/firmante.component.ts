import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-firmante',
  templateUrl: './firmante.component.html'
})
export class FirmanteComponent implements OnInit {

  @Input() type: string = '';
  @Input() name: string = '';
  @Input() signed: boolean = false;

  constructor() { }

  ngOnInit(): void {}

}
