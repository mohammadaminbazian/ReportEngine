package xyz.amin.archiveledger.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import xyz.amin.archiveledger.service.LedgerService;

@Controller
@RequestMapping("/api/ledger-old")
public class LedgerController_old {
    private final LedgerService ledgerService;

    public LedgerController_old(LedgerService ledgerService) {
        this.ledgerService = ledgerService;
    }

  /*  @PostMapping
    public ResponseEntity<LedgerResponse> save(@RequestBody LedgerRequest ledger) {

       LedgerResponse saveLedger =  ledgerService.save(ledger);

    return  ResponseEntity
                .status(HttpStatus.CREATED)
                .body(saveLedger);
    }*/

//    @GetMapping
//    public ResponseEntity<List<LedgerResponse>> findAll() {
//        List<LedgerResponse> ledgers = ledgerService.findAll();
//        return ResponseEntity.ok(ledgers);
//    }
}
