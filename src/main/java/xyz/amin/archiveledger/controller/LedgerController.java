package xyz.amin.archiveledger.controller;

import org.springframework.web.bind.annotation.*;
import xyz.amin.archiveledger.dto.LedgerDto;
import xyz.amin.archiveledger.service.LedgerService;

import java.util.List;

@RestController
@RequestMapping("/api/ledgers")
@CrossOrigin("*")
public class LedgerController {

    private final LedgerService service;

    public LedgerController(LedgerService service) {

        this.service = service;

    }

    //--------------------------------------------------
    // Insert
    //--------------------------------------------------

    @PostMapping
    public LedgerDto save(
            @RequestBody LedgerDto dto){

        return service.save(dto);

    }

    //--------------------------------------------------
    // Select All
    //--------------------------------------------------

    @GetMapping
    public List<LedgerDto> findAll(){

        return service.findAll();

    }

    //--------------------------------------------------
    // Select By Id
    //--------------------------------------------------

    @GetMapping("/{id}")
    public LedgerDto findById(
            @PathVariable Long id){

        return service.findById(id);

    }

    //--------------------------------------------------
    // Delete
    //--------------------------------------------------

    @DeleteMapping("/{id}")
    public void delete(
            @PathVariable Long id){

        service.delete(id);

    }

}