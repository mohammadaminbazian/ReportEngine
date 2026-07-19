package xyz.amin.archiveledger.report.model;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class ReportResponse {

    /**
     * اطلاعات Header / Footer / Context
     */
    private Map<String, Object> context = new LinkedHashMap<>();

    /**
     * ردیف‌های گزارش
     */
    /*private List<?> rows;

    public Map<String, Object> getContext() {
        return context;
    }

    public void setContext(Map<String, Object> context) {
        this.context = context;
    }

    public List<?> getRows() {
        return rows;
    }

    public void setRows(List<?> rows) {
        this.rows = rows;
    }*/

    /**
     * هر ردیف دقیقاً معادل یک Object در sampleData.js
     */
    private List<Map<String, Object>> rows;

    public Map<String, Object> getContext() {
        return context;
    }

    public void setContext(Map<String, Object> context) {
        this.context = context;
    }

    public List<Map<String, Object>> getRows() {
        return rows;
    }

    public void setRows(List<Map<String, Object>> rows) {
        this.rows = rows;
    }
}