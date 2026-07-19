package xyz.amin.archiveledger.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "Ledgers")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Ledger {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //نام اثر
    @Column(name = "artifact_name", nullable = false, length = 150)
    private String artifactName;

    //استان
    @Column(nullable = false, length = 100)
    private String province;

    //نام پیمانکار
    @Column(nullable = false, length = 100)
    private String contractor;

    //مبلغ
    @Column(nullable = false, precision = 18, scale = 2)
    private BigDecimal amount;

//    واحد پول
    @Column(nullable = false, length = 10)
    private String currency;

    //تاریخ
    @Column(name = "operation_date", nullable = false)
    private LocalDate operationDate;

    //  شرح عملیات
    @Column(length = 2000)
    private String description;

    //  وضعیت
    @Column(nullable = false, length = 30)
    private String status;

    //  زمان ثبت
    @Column(name = "created_at")
    @CreationTimestamp
    private LocalDateTime createdAt;
}
