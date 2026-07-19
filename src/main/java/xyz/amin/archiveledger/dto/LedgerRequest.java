package xyz.amin.archiveledger.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LedgerRequest  {
    private String artifactName;

    private String province;

    private String contractor;

    private BigDecimal amount;

    private String currency;

    private LocalDate operationDate;

    private String description;

    private String status;
}
