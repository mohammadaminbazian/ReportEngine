package xyz.amin.archiveledger.report.model;

public class ReportItem {

    private String label;

    private String value;

    public ReportItem() {
    }

    public ReportItem(String label, String value) {
        this.label = label;
        this.value = value;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}