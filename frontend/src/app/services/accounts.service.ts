import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  private API_SERVER = 'http://localhost:8080/account';
  constructor(private httpClient: HttpClient) {}

  public getAllAccounts(): Observable<any> {
    return this.httpClient.get(this.API_SERVER);
  }

  public getOneAccount(number: any): Observable<any> {
    return this.httpClient.get(
      this.API_SERVER.concat('/getOne?id=').concat(number)
    );
  }

  public saveAccount(number: any, account: any): Observable<any> {
    account.account = number;
    return this.httpClient.post(this.API_SERVER, account);
  }

  public consignAccount(
    account: any,
    number: any,
    money: any
  ): Observable<any> {
    account.money = account.money + Number(money);
    account.account = number;
    return this.httpClient.put(this.API_SERVER.concat('/update'), account);
  }

  public retireAccount(account: any, number: any, money: any): Observable<any> {
    account.money = account.money - Number(money);
    account.account = number;
    return this.httpClient.put(this.API_SERVER.concat('/update'), account);
  }

  public countAccounts(): Observable<any> {
    return this.httpClient.get(this.API_SERVER.concat('/count'));
  }
}
