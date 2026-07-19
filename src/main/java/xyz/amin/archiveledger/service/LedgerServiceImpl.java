package xyz.amin.archiveledger.service;

import org.springframework.stereotype.Service;
import xyz.amin.archiveledger.dto.LedgerDto;
import xyz.amin.archiveledger.dto.LedgerRequest;
import xyz.amin.archiveledger.dto.LedgerResponse;
import xyz.amin.archiveledger.entity.Ledger;
import xyz.amin.archiveledger.mapper.LedgerMapper;
import xyz.amin.archiveledger.repository.LedgerRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class LedgerServiceImpl implements LedgerService {
    private final LedgerRepository ledgerRepository;
    private final LedgerMapper mapper;

    public LedgerServiceImpl(LedgerRepository ledgerRepository, LedgerMapper mapper) {
        this.ledgerRepository = ledgerRepository;
        this.mapper = mapper;
    }
   /* @Override
    public Ledger save(Ledger ledger) {
        return ledgerRepository.save(ledger);
    }


    @Override
    public List<Ledger> findAll() {
        return ledgerRepository.findAll();
    }
    */
   /*@Override
    public LedgerResponse save(LedgerRequest ledgerRequest) {
       Ledger ledger = Ledger.builder()
               .amount(ledgerRequest.getAmount())
               .description(ledgerRequest.getDescription())
               .artifactName(ledgerRequest.getArtifactName())
               .contractor(ledgerRequest.getContractor())
               .currency(ledgerRequest.getCurrency())
               .operationDate(ledgerRequest.getOperationDate())
               .status(ledgerRequest.getStatus())
               .province(ledgerRequest.getProvince())
               .build();
       ledger = ledgerRepository.save(ledger);
        return LedgerResponse.builder()
                .id(ledger.getId())
                .amount(ledger.getAmount())
                .contractor(ledger.getContractor())
                .description(ledger.getDescription())
                .operationDate(ledger.getOperationDate())
                .build();
    }
*/
    @Override
    public LedgerDto save(LedgerDto dto) {

        Ledger entity = mapper.toEntity(dto);

        entity = ledgerRepository.save(entity);

        return mapper.toDto(entity);

    }

    @Override
    public List<LedgerDto> findAll() {
//        return List.of();
        return ledgerRepository.findAll()
                .stream()
//                .map(this::toDto)
                .map(mapper::toDto)
                .toList();
    }

    @Override
    public LedgerDto findById(Long id) {

        Ledger entity = ledgerRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Ledger not found : " + id));

        return mapper.toDto(entity);

        /*return repository.findById(id)
            .map(this::toDto)
            .orElse(null);
        */

    }

    @Override
    public void delete(Long id) {
        ledgerRepository.deleteById(id);
    }
    /*@Override
    public List<LedgerResponse> findAll(){
        List<LedgerResponse> responses = new ArrayList<>();
        for(Ledger ledger : ledgerRepository.findAll()){
            LedgerResponse response = LedgerResponse.builder()
                    .id(ledger.getId())
                    .amount(ledger.getAmount())
                    .contractor(ledger.getContractor())
                    .description(ledger.getDescription())
                    .operationDate(ledger.getOperationDate())
                    .build();
            responses.add(response)  ;
        }

        return responses;

    }*/
   /* private Ledger toEntity(LedgerDto dto) {

        return Ledger.builder()
                .id(dto.getId())
                .artifactName(dto.getArtifactName())
                .province(dto.getProvince())
                .contractor(dto.getContractor())
                .amount(dto.getAmount())
                .currency(dto.getCurrency())
                .operationDate(dto.getOperationDate())
                .description(dto.getDescription())
                .status(dto.getStatus())
                .createdAt(dto.getCreatedAt())
                .build();

    }

    private LedgerDto toDto(Ledger entity) {

        return LedgerDto.builder()
                .id(entity.getId())
                .artifactName(entity.getArtifactName())
                .province(entity.getProvince())
                .contractor(entity.getContractor())
                .amount(entity.getAmount())
                .currency(entity.getCurrency())
                .operationDate(entity.getOperationDate())
                .description(entity.getDescription())
                .status(entity.getStatus())
                .createdAt(entity.getCreatedAt())
                .build();

    }*/
}
