import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html'
})
export class NoticeComponent implements OnInit {

  @Input() type: string = 'success'; // success | warning | error
  @Input() message: string = '';

  constructor(
    @Optional() @Inject(MAT_SNACK_BAR_DATA) public data: any,
    @Optional() public snackbarRef: MatSnackBarRef<NoticeComponent>) { }

  ngOnInit(): void {
    if(this.data){
      this.type = this.data.type;
      this.message = this.data.message;
    }
  }

  close(){
    this.snackbarRef.dismiss();
  }

}
