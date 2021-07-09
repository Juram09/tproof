import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import * as Sentry from '@sentry/angular';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  private API_SERVER = 'http://localhost:8080/account';
  constructor(private httpClient: HttpClient) {}

  public getAllAccounts(): Observable<any> {
    return this.httpClient.get(this.API_SERVER).pipe(
      catchError((error) => {
        return this.handleError(error);
      }),
      map((response: any) => response)
    );
  }

  public getOneAccount(number: any): Observable<any> {
    return this.httpClient
      .get(this.API_SERVER.concat('/getOne?id=').concat(number))
      .pipe(
        catchError((error) => {
          return this.handleError(error);
        }),
        map((response: any) => response)
      );
  }

  public saveAccount(number: any, account: any): Observable<any> {
    account.account = number;
    let a = this.httpClient.post(this.API_SERVER, account).pipe(
      catchError((error) => {
        return this.handleError(error);
      }),
      map((response: any) => response)
    );
    console.log(a);
    return a;
  }

  public consignAccount(
    account: any,
    number: any,
    money: any
  ): Observable<any> {
    account.money = account.money + Number(money);
    account.account = number;
    return this.httpClient.put(this.API_SERVER.concat('/update'), account).pipe(
      catchError((error) => {
        return this.handleError(error);
      }),
      map((response: any) => response)
    );
  }

  public retireAccount(account: any, number: any, money: any): Observable<any> {
    account.money = account.money - Number(money);
    account.account = number;
    return this.httpClient.put(this.API_SERVER.concat('/update'), account).pipe(
      catchError((error) => {
        return this.handleError(error);
      }),
      map((response: any) => response)
    );
  }

  public countAccounts(): Observable<any> {
    return this.httpClient.get(this.API_SERVER.concat('/count')).pipe(
      catchError((error) => {
        return this.handleError(error);
      }),
      map((response: any) => response)
    );
  }
  private handleError(error: HttpErrorResponse) {
    Sentry.captureException(error);
    return throwError('Error');
  }
}
