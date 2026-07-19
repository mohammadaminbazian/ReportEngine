package xyz.amin.archiveledger.entity;



import jakarta.persistence.*;

@Entity
@Table(name = "report_context")
public class ReportContext {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * نام گزارش
     * مثال:
     * invoice
     * sales
     * warehouse
     */
    @Column(nullable = false, length = 100)
    private String reportName;

    /**
     * بخش گزارش
     * مثال:
     * context
     * rcontext
     * header
     * footer
     */
    @Column(nullable = false, length = 50)
    private String section;

    /**
     * کلید
     * مثال:
     * companyTop
     * branch
     * reportUser
     */
    @Column(nullable = false, length = 100)
    private String keyName;

    /**
     * عنوان
     */
    @Column(length = 200)
    private String label;

    /**
     * مقدار
     */
    @Column(length = 1000)
    private String value;

    /**
     * ترتیب نمایش
     */
    @Column(nullable = false)
    private Integer sortOrder = 0;

    /**
     * فعال / غیرفعال
     */
    @Column(nullable = false)
    private Boolean active = true;

    /**
     * کلید والد
     * برای ساختارهای تو در تو مانند rcontext
     */
    @Column(length = 100)
    private String parentKey;

    public ReportContext() {
    }

    // ---------- Getter & Setter ----------

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReportName() {
        return reportName;
    }

    public void setReportName(String reportName) {
        this.reportName = reportName;
    }

    public String getSection() {
        return section;
    }

    public void setSection(String section) {
        this.section = section;
    }

    public String getKeyName() {
        return keyName;
    }

    public void setKeyName(String keyName) {
        this.keyName = keyName;
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

    public Integer getSortOrder() {
        return sortOrder;
    }

    public void setSortOrder(Integer sortOrder) {
        this.sortOrder = sortOrder;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public String getParentKey() {
        return parentKey;
    }

    public void setParentKey(String parentKey) {
        this.parentKey = parentKey;
    }
}
