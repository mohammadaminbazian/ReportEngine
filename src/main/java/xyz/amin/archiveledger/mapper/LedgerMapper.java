package xyz.amin.archiveledger.mapper;

import org.springframework.stereotype.Component;
import xyz.amin.archiveledger.dto.LedgerDto;
import xyz.amin.archiveledger.entity.Ledger;

@Component
public class LedgerMapper {

    public LedgerDto toDto(Ledger entity){

        if(entity==null){
            return null;
        }

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

    }

    //--------------------------------------------------

    public Ledger toEntity(LedgerDto dto){

        if(dto==null){
            return null;
        }

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

}