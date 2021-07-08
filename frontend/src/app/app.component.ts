import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountsService } from './services/accounts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  accountForm!: FormGroup;
  consignForm!: FormGroup;
  retireForm!: FormGroup;
  searchForm!: FormGroup;
  accounts: any;
  count: any;
  number: any;

  constructor(
    public fb: FormBuilder,
    public accountsService: AccountsService
  ) {}
  ngOnInit(): void {
    this.accountForm = this.fb.group({
      name: ['', Validators.required],
      money: ['', Validators.required],
    });
    this.consignForm = this.fb.group({
      account: ['', Validators.required],
      money: ['', Validators.required],
    });
    this.retireForm = this.fb.group({
      account: ['', Validators.required],
      money: ['', Validators.required],
    });
    this.searchForm = this.fb.group({
      account: ['', Validators.required],
    });
    this.accountsService.getAllAccounts().subscribe(
      (response) => {
        this.accounts = response;
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  save(): void {
    this.accountsService.countAccounts().subscribe(
      (response) => {
        this.count = response + 1;
        var x = this.count.toString();
        this.number = '7502860200'
          .concat('0'.repeat(7 - x.length).toString())
          .concat(x);
        this.accountsService
          .saveAccount(this.number, this.accountForm.value)
          .subscribe(
            (response) => {
              this.accountForm.reset();
              this.accounts.push(response);
            },
            (error) => {
              console.error(error);
            }
          );
      },
      (error) => {
        console.error(error);
      }
    );
  }

  consign(): void {
    this.number = this.consignForm.value.account;
    this.accountsService.getOneAccount(this.number).subscribe(
      (response) => {
        this.accountsService
          .consignAccount(response, this.consignForm.value.money)
          .subscribe(
            (response) => {
              this.consignForm.reset();
              this.accounts.push(response);
            },
            (error) => {
              console.error(error);
            }
          );
      },
      (error) => {
        console.error(error);
      }
    );
  }

  retire(): void {
    this.number = this.retireForm.value.account;
    this.accountsService.getOneAccount(this.number).subscribe(
      (response) => {
        this.accountsService
          .retireAccount(response, this.retireForm.value.money)
          .subscribe(
            (response) => {
              this.retireForm.reset();
              this.accounts.push(response);
            },
            (error) => {
              console.error(error);
            }
          );
      },
      (error) => {
        console.error(error);
      }
    );
  }

  search(): void {
    this.number = this.searchForm.value.account;
    this.accountsService.getOneAccount(this.number).subscribe(
      (response) => {
        console.log(response.money);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
