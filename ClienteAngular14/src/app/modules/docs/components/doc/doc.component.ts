import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalDocComponent } from '../modal-doc/modal-doc.component';

@Component({
  selector: 'app-doc',
  templateUrl: './doc.component.html'
})
export class DocComponent implements OnInit {

  @Input() nameDoc: string;
  @Input() success: boolean = false;
  @Input() signed: boolean = null;
  @Input() colorTxt: string = 'text'; // text-white
  @Input() borderOpacity: boolean = false;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {}

  viewDoc(){
    this.dialog.open(ModalDocComponent, {
      width: '95vw',
      minHeight: '90vh',
      maxWidth: '95vw',
      autoFocus: false,
      panelClass: 'dialog'
    });
  }

}
