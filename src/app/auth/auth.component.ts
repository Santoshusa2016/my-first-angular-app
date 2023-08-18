import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthResponseData, AuthService } from "./auth-service";
import { Observable } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
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
    email = "santoshusa2016@gmail.com";
    pwd = "bablooappu";

    //sect20:298
    let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, pwd);
      console.log("Timepass");
    } else {
      setTimeout(() => {
        authObs = this.authService.signUp(email, pwd);
        console.log("Timepass");
      }, 10000);
    }

    //subscribe to method returned by HttpClient with single observerer
    authObs.subscribe({
      next: (respData) => {
        console.log(respData);
        this.isLoading = false;
        this.router.navigate(["recipes"]); //sect20:301
      },
      error: (errorMsg) => {
        //sect20:297 - The error is not handled in service which does house keeping
        this.error = errorMsg;
        console.log(errorMsg);
      },
    });

    form.reset();
  }
}
