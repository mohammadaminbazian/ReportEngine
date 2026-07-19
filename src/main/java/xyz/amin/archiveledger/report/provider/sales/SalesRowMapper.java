package xyz.amin.archiveledger.report.provider.sales;

import org.springframework.stereotype.Component;
import xyz.amin.archiveledger.dto.LedgerDto;
import xyz.amin.archiveledger.mapper.ReportRowMapper;

import java.util.LinkedHashMap;
import java.util.Map;

@Component
public class SalesRowMapper  implements ReportRowMapper<LedgerDto> {

    public Map<String,Object> map(LedgerDto dto){

        Map<String,Object> row =
                new LinkedHashMap<>();

        row.put("id",dto.getId());

        row.put("artifactName",dto.getArtifactName());

        row.put("province",dto.getProvince());

        row.put("contractor",dto.getContractor());

        row.put("amount",dto.getAmount());

        row.put("currency",dto.getCurrency());

        row.put("operationDate",dto.getOperationDate());

        row.put("description",dto.getDescription());

        row.put("status",dto.getStatus());

        return row;

    }

}