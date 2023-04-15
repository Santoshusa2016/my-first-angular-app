import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
  errorMessage: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    //get static data associated with route: mapper in app-routes.module.ts

    // this.errorMessage = this.route.snapshot.data['message'];

    //subscribe to observable in cases on same page we get new error.
    this.route.data.subscribe(
      (data: Data) => {
        //Data, type above can be anything
        this.errorMessage = data['message'];
      }
    );
  }

}
