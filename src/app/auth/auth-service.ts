import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { User } from "./user.model";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: "root" })
export class AuthService {
  user = new BehaviorSubject<User>(null); //sect20:300,302
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  //sect20:294 - this observable will be called from auth controller
  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
          environment.firebaseAPIKey,
        {
          //request body payload
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        //sect20:297
        catchError(this.handleError),
        tap((respData) => this.handleAuthentication(respData))
      );
  }

  login(email: string, password: string) {
    //sect20:298
    return this.http
      .post<AuthResponseData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDRwtdT2nuMLf3Iiywv9H4QKnpP-Ror3Gw",
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((respData) => this.handleAuthentication(respData))
      );
  }

  //sect20:299
  private handleError(errorResp: HttpErrorResponse) {
    let errorMessage = "An unknown error occurred";
    if (!errorResp.error || !errorResp.error.error) {
      //if error key, nested error key is not available
      return throwError(() => new Error(errorMessage));
    }

    switch (errorResp.error.error.message) {
      case "EMAIL_EXISTS":
        errorMessage = "Email already exists";
        break;
      case "EMAIL_NOT_FOUND":
        errorMessage = "Email does not exist";
        break;
      case "INVALID_PASSWORD":
        errorMessage = "Authentication failed";
        break;
      default:
        errorMessage = "Network error";
        break;
    }
    console.log(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  //sect20:300
  private handleAuthentication(respData: AuthResponseData) {
    console.log("authService" + respData);
    const { email, localId: userId, idToken, expiresIn } = respData;

    //expiresIn is in seconds. convert to milliseconds
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000); // convert to milliseconds
    const user = new User(email, userId, idToken, expirationDate);

    this.user.next(user); //sect20:300
    this.autoLogout(+expiresIn * 1000);
    localStorage.setItem("userData", JSON.stringify(user)); //sect20:305
  }

  //sect20:305
  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem("userData"));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    //check if token is valid using get() prop of User object
    if (loadedUser.token) {
      this.user.next(loadedUser);
      //sec20:306 (when)
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();

      this.autoLogout(expirationDuration);
    }
  }

  //sect20:304
  logout() {
    this.user.next(null); //unauthenticate user
    this.router.navigate(["/auth"]);
    localStorage.removeItem("userData"); //remove site specific data from local store
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer); //sect20:305
    }
    this.tokenExpirationTimer = null;
  }

  //sect20:306
  autoLogout(expirationDate: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDate); //expirationDate is expected in millisec, so sec*1000
  }
}

export interface AuthResponseData {
  //this domain is based on Google API Response payload
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean; //optional parameter
}
