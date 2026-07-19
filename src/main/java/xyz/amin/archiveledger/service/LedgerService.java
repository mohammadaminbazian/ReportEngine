package xyz.amin.archiveledger.service;

import xyz.amin.archiveledger.dto.LedgerDto;
import xyz.amin.archiveledger.dto.LedgerRequest;
import xyz.amin.archiveledger.dto.LedgerResponse;
import xyz.amin.archiveledger.entity.Ledger;

import java.util.List;

public interface LedgerService {

    //LedgerResponse save(LedgerRequest ledger);

    //List<LedgerResponse> findAll();

    LedgerDto save(LedgerDto dto);

    List<LedgerDto> findAll();

    LedgerDto findById(Long id);

    void delete(Long id);
}
