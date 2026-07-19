package xyz.amin.archiveledger.controller;


import org.springframework.web.bind.annotation.*;
import xyz.amin.archiveledger.dto.ReportContextDto;
import xyz.amin.archiveledger.service.ReportContextService;

import java.util.List;

@RestController
@RequestMapping("/api/report-context")
@CrossOrigin("*")
public class ReportContextController {

    private final ReportContextService service;

    public ReportContextController(ReportContextService service) {
        this.service = service;
    }

    //--------------------------------------------------
    // Insert
    //--------------------------------------------------

    @PostMapping
    public ReportContextDto save(@RequestBody ReportContextDto dto) {

        return service.save(dto);

    }
    //--------------------------------------------------
    // Update
    //--------------------------------------------------
    @PutMapping("/{id}")
    public ReportContextDto update(

            @PathVariable Long id,

            @RequestBody ReportContextDto dto) {

        return service.update(id, dto);

    }
    //--------------------------------------------------
    // Select All
    //--------------------------------------------------

    @GetMapping
    public List<ReportContextDto> findAll() {

        return service.findAll();

    }

    //--------------------------------------------------
    // Select By Id
    //--------------------------------------------------

    @GetMapping("/{id}")
    public ReportContextDto findById(@PathVariable Long id) {

        return service.findById(id);

    }

    //--------------------------------------------------
    // Select By Report Name
    //--------------------------------------------------

   /* @GetMapping("/report/{reportName}")
    public List<ReportContextDto> findByReportName(
            @PathVariable String reportName) {

        return service.findByReportName(reportName);

    }*/

    //--------------------------------------------------
    // Select By Report Name And Section
    //--------------------------------------------------

    @GetMapping("/report/{reportName}/{section}")
    public List<ReportContextDto> findByReportNameAndSection(

            @PathVariable String reportName,

            @PathVariable String section) {

        return service.findByReportNameAndSection(
                reportName,
                section
        );

    }

    //--------------------------------------------------
    // Delete
    //--------------------------------------------------
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {

        service.delete(id);

    }

}
