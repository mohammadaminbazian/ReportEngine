package xyz.amin.archiveledger.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LedgerDto {

    private Long id;

    private String artifactName;

    private String province;

    private String contractor;

    private BigDecimal amount;

    private String currency;

    private LocalDate operationDate;

    private String description;

    private String status;

    private LocalDateTime createdAt;

}