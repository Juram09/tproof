package com.bluesoft.bluebank.tproof.repository;

import com.bluesoft.bluebank.tproof.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Account,Long> {

}
