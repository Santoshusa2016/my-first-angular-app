import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth-service';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  //318: Creating a component programmatically
  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective;
  private closeSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnDestroy(): void {
    //unsubscribe when Auth component is removed or cleared.
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onHandleError() {
    this.error = null;
  }

  onSubmit(form: NgForm) {
    //sect20:294
    if (!form.valid) {
      return;
    }
    this.isLoading = true;

    //sect20:295
    let email = form.value.email;
    let pwd = form.value.password;
    email = 'santoshusa2016@gmail.com';
    pwd = 'bablooappu';

    //sect20:298
    let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, pwd);
      console.log('Timepass');
    } else {
      setTimeout(() => {
        authObs = this.authService.signUp(email, pwd);
        console.log('Timepass');
      }, 10000);
    }

    //subscribe to method returned by HttpClient with single observerer
    authObs.subscribe({
      next: (respData) => {
        console.log(respData);
        this.isLoading = false;
        this.router.navigate(['recipes']); //sect20:301
      },
      error: (errorMsg) => {
        //sect20:297 - The error is not handled in service which does house keeping
        this.error = errorMsg;
        this.showErrorAlert(this.error);
        console.log(errorMsg);
      },
    });

    form.reset();
  }

  showErrorAlert(error: string) {
    //317: Dynamically create alert
    //step 01: Create factory which knows how to create component
    const alertCompFactory =
      this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

    //step02: attach to DOM
    const hostViewContainerRef = this.alertHost.viewcontainerRef;
    hostViewContainerRef.clear(); //clear if any other comp was added earlier
    const componentRef = hostViewContainerRef.createComponent(alertCompFactory);

    //step03: concrete class
    componentRef.instance.message = error;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}
