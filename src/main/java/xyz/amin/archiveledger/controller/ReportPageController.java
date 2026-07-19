package xyz.amin.archiveledger.controller;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import xyz.amin.archiveledger.report.builder.ReportDataBuilder;
import xyz.amin.archiveledger.report.generator.ReportDataExporter;
import xyz.amin.archiveledger.report.model.ReportResponse;

import java.io.IOException;


@Controller
public class ReportPageController {
  private final ReportDataBuilder builder;

    private final ReportDataExporter exporter;

    public ReportPageController(ReportDataBuilder builder,
                                ReportDataExporter exporter) {

        this.builder = builder;
        this.exporter = exporter;}
    @GetMapping("/report/{reportName}")
    public String report(  @PathVariable String reportName, Model model ) {
        ReportResponse response = builder.build(reportName);
        try {
            exporter.generate( response,   reportName );
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        model.addAttribute( "reportName", reportName );

        return "index";
    }
   /* @GetMapping("/report/{reportName}")
    public String report(   @PathVariable String reportName,     Model model) throws Exception {

        System.err.println(
                "========== REPORT NAME ========== "
                        + reportName
        );
        ReportResponse response = builder.build(reportName);
        exporter.generate( response,   reportName );
        model.addAttribute("reportName",  reportName  );

       return "report";
//        return "index";

    }*/



    @GetMapping(value = {"","/"})
    public String index(){
        return "index";
    }

}
