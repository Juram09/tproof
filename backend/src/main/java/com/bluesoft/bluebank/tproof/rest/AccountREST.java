package com.bluesoft.bluebank.tproof.rest;

import com.bluesoft.bluebank.tproof.model.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.bluesoft.bluebank.tproof.service.AccountService;

import java.lang.Exception;
import io.sentry.Sentry;
import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/account")
public class AccountREST {

    @Autowired
    private AccountService accountService;

    @GetMapping
    private ResponseEntity<List<Account>> getAllAccounts() {
        return ResponseEntity.ok(accountService.findAll());
    }

    @RequestMapping("/getOne")
    @ResponseBody
    private Optional<Account> getOne(long id) {
        return accountService.getOne(id);
    }

    @GetMapping("/count")
    private ResponseEntity<Long> count() {
        return ResponseEntity.ok(accountService.count());
    }

    @PostMapping
    private ResponseEntity<Account> saveAccount(@RequestBody Account account) {
        try {
            Account a = accountService.save(account);
            return ResponseEntity.created(new URI("/account/" + a.getAccount())).body(a);
        } catch (Exception e) {
            Sentry.captureException(e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PutMapping("/update")
    private ResponseEntity<Account> updateAccount(@RequestBody Account account) {
        try {
            Account a = accountService.save(account);
            return ResponseEntity.created(new URI("/account/" + a.getAccount())).body(a);
        } catch (Exception e) {
            Sentry.captureException(e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("/error")
    public void triggerException() {
        try {
            throw new Exception("This is a test.");
        } catch (Exception e) {
            Sentry.captureException(e);
        }
    }
}
