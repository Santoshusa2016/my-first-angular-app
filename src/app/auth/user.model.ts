export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpiration: Date
  ) {}

  get token() {
    //token can be accessed only via get method. sect20:302
    //user.token
    if (!this._tokenExpiration || this._tokenExpiration < new Date()) {
      return null;
    }
    return this._token;
  }
}
