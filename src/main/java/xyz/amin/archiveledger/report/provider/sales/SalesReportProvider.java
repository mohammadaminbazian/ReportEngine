package xyz.amin.archiveledger.report.provider.sales;

import org.springframework.stereotype.Component;

import xyz.amin.archiveledger.report.model.ReportResponse;
import xyz.amin.archiveledger.report.provider.ReportDataProvider;


@Component
public class SalesReportProvider   implements ReportDataProvider {

    /*private final ReportContextService contextService;

    public SalesReportProvider(
            ReportContextService contextService) {

        this.contextService = contextService;

    }*/

    private final SalesContextProvider contextProvider;

    private final SalesRowProvider rowProvider;

    public SalesReportProvider(
            SalesContextProvider contextProvider,
            SalesRowProvider rowProvider) {

        this.contextProvider = contextProvider;
        this.rowProvider = rowProvider;
    }


        //--------------------------------------------------

    @Override
    public String getReportName() {

        return "sales";

    }

    //--------------------------------------------------

  /*  @Override
    public ReportResponse build() {

        ReportResponse response =
                new ReportResponse();

        Map<String, Object> context =
                new LinkedHashMap<>();

        List<ReportContextDto> list =
                contextService.findByReportName(
                        getReportName()
                );

        for (ReportContextDto dto : list) {

            context.put(

                    dto.getKeyName(),

                    new ReportItem(
                            dto.getLabel(),
                            dto.getValue()
                    )

            );

        }

        response.setContext(context);

        // فعلاً Mock
        response.setRows(Collections.emptyList());

        return response;

    }*/

    @Override
    public ReportResponse build() {

        ReportResponse response =
                new ReportResponse();

        response.setContext(
                contextProvider.buildContext()
        );

        response.setRows(
                rowProvider.buildRows()
        );

        return response;

    }

}
