package com.bluesoft.bluebank.tproof.rest;

import com.bluesoft.bluebank.tproof.model.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.bluesoft.bluebank.tproof.service.AccountService;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/account")
public class AccountREST {

    @Autowired
    private AccountService accountService;

    @GetMapping
    private ResponseEntity<List<Account>> getAllAccounts() {
        return ResponseEntity.ok(accountService.findAll());
    }

    @PostMapping
    private ResponseEntity<Account> saveAccount(@RequestBody Account account) {
        try {
            Account a = accountService.save(account);
            return ResponseEntity.created(new URI("/account/" + a.getAccount())).body(a);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

    }
}
