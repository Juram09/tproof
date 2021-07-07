package com.bluesoft.bluebank.tproof.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "account")
public class Account {
    @Id
    private int number;
    private String name;
    private double money;

    public Account(){

    }
    public Account(int account, String name, double money){
        super();
        this.number=account;
        this.name=name;
        this.money=money;
    }

    public double getMoney() {
        return money;
    }

    public int getAccount() {
        return number;
    }

    public String getName() {
        return name;
    }

    public void setAccount(int account) {
        this.number = account;
    }

    public void setMoney(double money) {
        this.money = money;
    }

    public void setName(String name) {
        this.name = name;
    }

}
