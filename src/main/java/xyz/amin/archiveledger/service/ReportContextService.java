package xyz.amin.archiveledger.service;

import xyz.amin.archiveledger.dto.ReportContextDto;

import java.util.List;

public interface ReportContextService {


    ReportContextDto save(ReportContextDto dto);
    ReportContextDto update(Long id, ReportContextDto dto);

    List<ReportContextDto> findAll();

    ReportContextDto findById(Long id);

    List<ReportContextDto> findByReportName(String reportName);

    List<ReportContextDto> findByReportNameAndSection(
            String reportName,
            String section
    );

    void delete(Long id);
}
