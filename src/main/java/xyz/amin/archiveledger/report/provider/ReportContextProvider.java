package xyz.amin.archiveledger.report.provider;

import java.util.Map;

public interface ReportContextProvider {

    Map<String,Object> buildContext();

}