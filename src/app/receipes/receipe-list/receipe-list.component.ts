import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ReceipeService } from 'src/app/shared/receipe.service';
import { Receipe } from '../receipe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-receipe-list',
  templateUrl: './receipe-list.component.html',
  styleUrls: ['./receipe-list.component.css']
})
export class ReceipeListComponent implements OnInit, OnDestroy{
  //event emitter,
  //@Output() receipeItemSelected = new EventEmitter<Receipe>();
  receipes: Receipe[];
  subscription: Subscription;

  constructor(private receipeSvc: ReceipeService
    , private router: Router
    , private route: ActivatedRoute){
  }

  //chap09: services & DI
  ngOnInit(): void {
    this.receipes = this.receipeSvc.getReceipe();

    //sect16:234
    this.subscription = this.receipeSvc.recipesChanged.subscribe(
      (recipes: Receipe[]) => {
        this.receipes = recipes;
      }
    );
  }

  //chapter06: Event/Data binding
  /*onReceipeSelected(receipe:Receipe){
    this.receipeItemSelected.emit(receipe);
  }*/

  //chapter11: Routing
  onNewRecipe():void{
    this.router.navigate(['new'], { relativeTo: this.route}); //relative route
  }

  //sect16:239
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
