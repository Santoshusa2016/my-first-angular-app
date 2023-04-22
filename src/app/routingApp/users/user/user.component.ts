import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: {id: number, name: string};
  paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    console.log("User component called");
    
    //good for first time page load when we have snapshot populated
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.paramMap.get('name')
    };

    //recommended for all other use cases
    this.paramsSubscription = this.route.params
      .subscribe(
        //ES6 arrow functions
        (params: Params) => {
          this.user.id = params['id'];
          this.user.name = params['name'];
        }
      );
  }

  ngOnDestroy() {
    //this is to ensure when component is destroyed we unsubscribe
    this.paramsSubscription.unsubscribe();
  }

}
