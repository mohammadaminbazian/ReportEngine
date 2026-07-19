package xyz.amin.archiveledger.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import xyz.amin.archiveledger.dto.LedgerRequest;
import xyz.amin.archiveledger.dto.LedgerResponse;
import xyz.amin.archiveledger.entity.Ledger;

import java.util.List;

@Repository
public interface LedgerRepository  extends JpaRepository<Ledger, Long> {




}
