package xyz.amin.archiveledger.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import xyz.amin.archiveledger.entity.ReportContext;

import java.util.List;

@Repository
public interface ReportContextRepository extends JpaRepository<ReportContext,Long> {

    List<ReportContext> findByReportName(String reportName);

    List<ReportContext> findByReportNameAndSection(
            String reportName,
            String section
    );

    List<ReportContext> findByReportNameAndActiveTrueOrderBySortOrder(
            String reportName
    );
}
