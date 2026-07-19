package xyz.amin.archiveledger.report.builder;

import org.springframework.stereotype.Component;
import xyz.amin.archiveledger.report.model.ReportResponse;
import xyz.amin.archiveledger.report.provider.ReportDataProvider;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class ReportDataBuilder {


    private final Map<String,ReportDataProvider> providers;



    public ReportDataBuilder(
            List<ReportDataProvider> list){


        providers =
                list.stream()
                        .collect(Collectors.toMap(
                                ReportDataProvider::getReportName,
                                p -> p
                        ));

    }



    public ReportResponse build(String reportName){


        ReportDataProvider provider =
                providers.get(reportName);



        if(provider == null){

            throw new RuntimeException(
                    "Report not found : "
                            + reportName
            );

        }


        return provider.build();

    }

}