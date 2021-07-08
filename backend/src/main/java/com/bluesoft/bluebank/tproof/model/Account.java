package com.bluesoft.bluebank.tproof.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "account")
public class Account {
    @Id
    private long account;
    private String name;
    private double money;

    public Account() {

    }

    public Account(long account, String name, double money) {
        super();
        this.account = account;
        this.name = name;
        this.money = money;
    }

    public double getMoney() {
        return money;
    }

    public long getAccount() {
        return account;
    }

    public String getName() {
        return name;
    }

    public void setAccount(long account) {
        this.account = account;
    }

    public void setMoney(double money) {
        this.money = money;
    }

    public void setName(String name) {
        this.name = name;
    }

}
