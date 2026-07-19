package xyz.amin.archiveledger.controller;

import org.springframework.web.bind.annotation.*;
import xyz.amin.archiveledger.report.builder.ReportDataBuilder;
import xyz.amin.archiveledger.report.generator.ReportDataExporter;
import xyz.amin.archiveledger.report.model.ReportResponse;

import java.nio.file.Path;

@RestController
@RequestMapping("/api/report")
@CrossOrigin("*")
public class ReportController {

    private final ReportDataBuilder builder;
    private final ReportDataExporter generator;

    public ReportController(ReportDataBuilder builder, ReportDataExporter generator) {

        this.builder = builder;

        this.generator = generator;
    }

    //--------------------------------------------------
    // Export Report
    //--------------------------------------------------

    @GetMapping("/{reportName}/export")
    public ReportResponse export( @PathVariable String reportName) {
        return builder.build(reportName);
    }

    /*@GetMapping("/{reportName}")
    public String generate( @PathVariable String reportName) throws Exception{
        ReportResponse response =  builder.build(reportName);
       //generator.generate( response, Path.of("sampleData.js") );

        //return "sampleData.js generated.";

        Path file =  generator.generate( response, reportName );

        return file.toString();

    }*/

    @GetMapping("/{reportName}")
    public ReportResponse generate(
            @PathVariable String reportName
    ) throws Exception {

        ReportResponse response =
                builder.build(reportName);

        generator.generate(response, reportName);

        return response;
    }



}