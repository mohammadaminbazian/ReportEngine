package xyz.amin.archiveledger.report.generator;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import xyz.amin.archiveledger.report.model.ReportResponse;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;

@Component
public class ReportDataExporter {


    private final ObjectMapper mapper; // = new ObjectMapper();

    @Value("${report.output.path}")
    private String outputPath;

    public ReportDataExporter(ObjectMapper mapper) {
        this.mapper = mapper;
    }

    @PostConstruct
    public void init() {

        System.err.println(">>>>> Amin init<<<<"+outputPath);

    }
    //--------------------------------------------------

    public Path generate(
            ReportResponse response,
            String reportName)
            throws IOException {

        String json =
                mapper.writerWithDefaultPrettyPrinter()
                        .writeValueAsString(response);

        String js =
                "export default "
                        + json
                        + ";";
        System.err.println(">>>>> Amin2 <<<<"+outputPath);
        Path folder = Path.of(outputPath);

        Files.createDirectories(folder);

        Path file =
                folder.resolve(reportName + ".js");

        Files.writeString(file, js, StandardCharsets.UTF_8);

        return file;

    }

}
//
/*import org.springframework.stereotype.Component;
import tools.jackson.databind.ObjectMapper;
import tools.jackson.databind.SerializationFeature;
import xyz.amin.archiveledger.report.model.ReportResponse;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;

@Component
public class ReportDataExporter {

    private final ObjectMapper mapper;

    public ReportDataExporter() {

        mapper = new ObjectMapper();

        mapper.isEnabled(SerializationFeature.INDENT_OUTPUT);

    }

    //--------------------------------------------------

    public void generate(ReportResponse response,
                         Path outputFile) throws IOException {

        String json =
                mapper.writeValueAsString(response);

        StringBuilder js = new StringBuilder();

        js.append("export default ");

        js.append(json);

        js.append(";");

        Files.createDirectories(outputFile.getParent());

        Files.writeString(
                outputFile,
                js.toString(),
                StandardCharsets.UTF_8
        );

    }

}*/