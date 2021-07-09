import { TestBed } from '@angular/core/testing';

import { AccountsService } from './accounts.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('AccountsService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: AccountsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    //service = TestBed.inject(AccountsService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AccountsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('tests for get services', () => {
    it('should return all accounts', () => {
      //arrange
      const expectData = [
        {
          account: 1,
          name: 'asd',
          money: 100,
        },
        {
          account: 2,
          name: 'asd',
          money: 100,
        },
      ];
      let dataError,
        dataResponse = '1';
      //act
      service.getAllAccounts().subscribe(
        (response) => {
          dataResponse = response;
        },
        (error) => {
          dataError = error;
        }
      );
      const req = httpTestingController.expectOne(
        'http://localhost:8080/account'
      );
      req.flush(expectData);
      //assert
      expect(dataResponse.length).toEqual(2);
      expect(req.request.method).toEqual('GET');
      expect(dataError).toBeUndefined;
    });
    it('should return one account', () => {
      //arrange
      const expectData = [
        {
          account: 1,
          name: 'asd',
          money: 100,
        },
      ];
      let dataError,
        dataResponse = '1';
      //act
      service.getOneAccount(1).subscribe(
        (response) => {
          dataResponse = response;
        },
        (error) => {
          dataError = error;
        }
      );
      const req = httpTestingController.expectOne(
        'http://localhost:8080/account/getOne?id=1'
      );
      req.flush(expectData);
      //assert
      expect(dataResponse.length).toEqual(1);
      expect(req.request.method).toEqual('GET');
      expect(dataError).toBeUndefined;
    });
    it('should return the number of accounts', () => {
      //arrange
      const expectData = [1];
      let dataError,
        dataResponse = '1';
      //act
      service.countAccounts().subscribe(
        (response) => {
          dataResponse = response;
        },
        (error) => {
          dataError = error;
        }
      );
      const req = httpTestingController.expectOne(
        'http://localhost:8080/account/count'
      );
      req.flush(expectData);
      //assert
      expect(dataResponse.length).toEqual(1);
      expect(req.request.method).toEqual('GET');
      expect(dataError).toBeUndefined;
    });
  });
});
