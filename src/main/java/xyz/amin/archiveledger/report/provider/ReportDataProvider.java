package xyz.amin.archiveledger.report.provider;

import xyz.amin.archiveledger.report.model.ReportResponse;

public interface ReportDataProvider {

    /**
     * نام گزارش
     */
    String getReportName();

    /**
     * ساخت داده گزارش
     */
    ReportResponse build();

}