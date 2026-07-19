package xyz.amin.archiveledger.report.provider.sales;

import org.springframework.stereotype.Component;
import xyz.amin.archiveledger.dto.ArtifactDto;
import xyz.amin.archiveledger.dto.LedgerDto;
import xyz.amin.archiveledger.report.provider.ReportRowProvider;
import xyz.amin.archiveledger.service.ArtifactService;
import xyz.amin.archiveledger.service.LedgerService;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Component
public class SalesRowProvider implements ReportRowProvider {

    private final LedgerService ledgerService;

    private final SalesRowMapper mapper;

    public SalesRowProvider(

            LedgerService   ledgerService,

            SalesRowMapper mapper){

        this.ledgerService = ledgerService;

        this.mapper = mapper;

    }
    @Override
    public List<Map<String,Object>> buildRows() {

        List<LedgerDto> list =
                ledgerService.findAll();

        return list.stream()
                .map(mapper::map)
                .toList();

    }
    /*@Override
    public List<Map<String,Object>> buildRows(){

        return ledgerService
                .findAll()
                .stream()
                .map(mapper::map)
                .toList();

    }*/

}