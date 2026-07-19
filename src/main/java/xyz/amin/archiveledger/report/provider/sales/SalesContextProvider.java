package xyz.amin.archiveledger.report.provider.sales;


import org.springframework.stereotype.Component;
import xyz.amin.archiveledger.dto.ReportContextDto;
import xyz.amin.archiveledger.report.model.ReportItem;
import xyz.amin.archiveledger.report.provider.ReportContextProvider;
import xyz.amin.archiveledger.service.ReportContextService;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;


@Component
public class SalesContextProvider implements ReportContextProvider {


    private final ReportContextService service;

    public SalesContextProvider( ReportContextService service) {

        this.service = service;

    }


    @Override
    public Map<String,Object> buildContext() {


        Map<String,Object> context =
                new LinkedHashMap<>();


        List<ReportContextDto> list =
                service.findByReportName("sales");


        for(ReportContextDto dto : list){


            context.put(

                    dto.getKeyName(),

                    new ReportItem(
                            dto.getLabel(),
                            dto.getValue()
                    )

            );

        }


        return context;

    }

}