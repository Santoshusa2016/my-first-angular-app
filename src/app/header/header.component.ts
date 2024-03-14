import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() featureSelected = new EventEmitter<string>();

  //sect20:301
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(
    private dataService: DataStorageService,
    private authService: AuthService
  ) {}

  
  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !user ? false : true;
      console.log(!user);
      console.log(!!user);
    });
  }
  
  onSelect(feature: string): void {
    //emit dropdown menu selected
    this.featureSelected.emit(feature);
  }
  
  onSaveData() {
    this.dataService.storeRecipes();
  }
  
  onFetchData() {
    this.dataService.fetchRecipes().subscribe();
  }
  
  onLogOut() {
    this.authService.logout();
  }
  
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
