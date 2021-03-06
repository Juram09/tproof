import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountsService } from './services/accounts.service';
import { MyValidator } from '../utils/validators';
import { ComponentFactoryResolver } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  alertCreate: boolean = false;
  alertConsign: boolean = false;
  badConsign: boolean = false;
  alertRetire: boolean = false;
  badRetire: boolean = false;
  alertSearch: boolean = false;
  badSearch: boolean = false;
  accountForm!: FormGroup;
  consignForm!: FormGroup;
  retireForm!: FormGroup;
  searchForm!: FormGroup;
  accounts: any;
  count: any;
  number: any;
  name: any;
  money: any;
  title: any = 'Bluebank';
  error: any;

  constructor(
    public fb: FormBuilder,
    public accountsService: AccountsService
  ) {}
  ngOnInit(): void {
    this.accountForm = this.fb.group({
      name: ['', Validators.required],
      money: ['', [Validators.required, MyValidator.isMoneyValid]],
    });
    this.consignForm = this.fb.group({
      account: ['', [Validators.required, MyValidator.isAccountValid]],
      money: ['', [Validators.required, MyValidator.isMoneyValid]],
    });
    this.retireForm = this.fb.group({
      account: ['', [Validators.required, MyValidator.isAccountValid]],
      money: ['', [Validators.required, MyValidator.isMoneyValid]],
    });
    this.searchForm = this.fb.group({
      account: ['', [Validators.required, MyValidator.isAccountValid]],
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
              this.name = this.accountForm.value.name;
              this.money = this.accountForm.value.money;
              this.alertCreate = true;
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
    this.number = this.searchForm.value.account;
    if (isNaN(this.number)) {
      this.error = 'La cuenta no es valida';
      this.badConsign = true;
    } else {
      this.accountsService.getOneAccount(this.number).subscribe(
        (response) => {
          this.money = this.consignForm.value.money;
          if (this.money < 1) {
            this.error = 'No se pueden realizar consignaciones de menos de $1';
            this.badConsign = true;
          } else {
            this.accountsService
              .consignAccount(response, this.number, this.money)
              .subscribe(
                (response) => {
                  this.alertConsign = true;
                  this.consignForm.reset();
                  this.accounts.push(response);
                },
                (error) => {
                  this.error = 'Error al realizar la consignaci??n';
                  this.badConsign = true;
                }
              );
          }
        },
        (error) => {
          this.error =
            'El numero de cuenta no se encuentra registrado en la base de datos';
          this.badConsign = true;
        }
      );
    }
  }

  retire(): void {
    this.number = this.searchForm.value.account;
    if (isNaN(this.number)) {
      this.error = 'La cuenta no es valida';
      this.badRetire = true;
    } else {
      this.accountsService.getOneAccount(this.number).subscribe(
        (response) => {
          this.money = this.retireForm.value.money;
          if (response.money < this.money) {
            this.error =
              'La cuenta numero ' +
              this.number +
              ' solo dispone de ' +
              response.money +
              ' para retirar';
            this.badRetire = true;
          } else {
            this.accountsService
              .retireAccount(response, this.number, this.money)
              .subscribe(
                (response) => {
                  this.alertRetire = true;
                  this.retireForm.reset();
                  this.accounts.push(response);
                },
                (error) => {
                  this.error = 'Error al realizar el retiro';
                  this.badRetire = true;
                }
              );
          }
        },
        (error) => {
          this.error =
            'El numero de cuenta no se encuentra registrado en la base de datos';
          this.badConsign = true;
        }
      );
    }
  }

  search(): void {
    this.number = this.searchForm.value.account;
    if (isNaN(this.number)) {
      this.error = 'La cuenta no es valida';
      this.badSearch = true;
    } else {
      this.accountsService.getOneAccount(this.number).subscribe(
        (response) => {
          console.log(response);
          this.name = response.name;
          this.money = response.money;
          this.alertSearch = true;
        },
        (error) => {
          this.error =
            'El numero de cuenta no se encuentra registrado en la base de datos';
          this.badSearch = true;
        }
      );
    }
  }

  closeAlert() {
    this.alertCreate = false;
    this.alertConsign = false;
    this.badConsign = false;
    this.alertRetire = false;
    this.badRetire = false;
    this.alertSearch = false;
    this.badSearch = false;
  }
}
