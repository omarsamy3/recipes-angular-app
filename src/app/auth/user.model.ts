export class User {
  constructor(
    public email: string, 
    public id: string, 
    private _token: string, 
    private _tokenExpirationDate: Date
  ){}

  get token(){
    //Check if the token is expired
    if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
      return null;
    }
    return this._token;
  }
}