import {Component, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';



@Component({
  selector: 'app-enrolamiento',
  templateUrl: './enrolamiento.component.html'
})

export class EnrolamientoComponent implements OnInit{
  rut: string = '';
  clave: string = '';

  constructor(
    private cookiesSvc:CookieService,
  private router: Router,
  private routeActivate: ActivatedRoute
    ) {
  }

  ngOnInit(): void {
    this.routeActivate.queryParams.subscribe(param => {
      const {rut, token} = param;
      this.rut = rut || '';
      this.clave = token || '';

    });
    console.log('entre a enrolamiento');
    this.formEnrolamiento();
  }

  formEnrolamiento(){
    var getCookie: string = atob(this.cookiesSvc.get('enrolamiento'));
    var cookie = JSON.parse(getCookie);
    console.log(getCookie);
    console.log(cookie.rut);
    console.log(cookie.claveDinamica);

    if (cookie.rut === this.rut) {
      setTimeout(() => {
        this.router.navigate(['/home'], {queryParams: {rut: this.rut}});
      }, 5000);

    }
  }

}
