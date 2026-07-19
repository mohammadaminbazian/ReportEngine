package xyz.amin.archiveledger.report.provider;

import java.util.List;
import java.util.Map;

public interface ReportRowProvider {

//    List<ReportRow> buildRows();
        List<Map<String,Object>> buildRows();

}