import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry, tap } from 'rxjs/operators';

@Component({
  selector: 'page-portal',
  templateUrl: 'portal.html'
})
export class PortalPage {
  imageLoaded: any;
  imageUrl: any;
  myImage: any;
  posts: any;

  constructor(public navCtrl: NavController, private http: HttpClient) {
    this.imageLoaded = false;
    this.imageUrl = "http://bfapps1.boundlessfundraising.com/badge/cmndm/display/324978/1606";
    this.http.get("http://bfapps1.boundlessfundraising.com/badge/cmndm/display/324978/1606",{observe: 'response'})
  }

  markAsLoaded() {
    this.imageLoaded = true;
  }

}
