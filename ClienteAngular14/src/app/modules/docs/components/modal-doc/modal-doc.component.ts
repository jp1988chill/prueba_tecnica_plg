import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/modules/docs/components/base-component';

@Component({
  selector: 'app-modal-doc',
  templateUrl: './modal-doc.component.html',
  styles: [
  ]
})
export class ModalDocComponent implements OnInit {

  constructor(public service: StorageService) {
    console.log(service.docCompartido);
  }

  ngOnInit(): void {
  }

  _base64ToArrayBuffer(base64) {
	  var binary_string = base64.replace(/\\n/g, '');
    binary_string =  window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array( len );
    for (var i = 0; i < len; i++)        {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }

  src = this._base64ToArrayBuffer (
    ""
  );
}
