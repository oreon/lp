package lawpro.viewmodels.excess;

public class CoverageDetailViewModel {

    private String rowId;
    private String insurerCompanyKey;
    private String insurerCompanyName;
    private String perClaim;
    private String perAgg;
    private String policyPeriodFrom;
    private String policyPeriodTo;
    private String policyLawFirmName;

    public String getRowId() {
        return rowId;
    }

    public void setRowId(String rowId) {
        this.rowId = rowId;
    }

    public String getInsurerCompanyKey() {
        return insurerCompanyKey;
    }

    public void setInsurerCompanyKey(String insurerCompanyKey) {
        this.insurerCompanyKey = insurerCompanyKey;
    }

    public String getInsurerCompanyName() {
        return insurerCompanyName;
    }

    public void setInsurerCompanyName(String insurerCompanyName) {
        this.insurerCompanyName = insurerCompanyName;
    }

    public String getPerClaim() {
        return perClaim;
    }

    public void setPerClaim(String perClaim) {
        this.perClaim = perClaim;
    }

    public String getPerAgg() {
        return perAgg;
    }

    public void setPerAgg(String perAgg) {
        this.perAgg = perAgg;
    }

    public String getPolicyPeriodFrom() {
        return policyPeriodFrom;
    }

    public void setPolicyPeriodFrom(String policyPeriodFrom) {
        this.policyPeriodFrom = policyPeriodFrom;
    }

    public String getPolicyPeriodTo() {
        return policyPeriodTo;
    }

    public void setPolicyPeriodTo(String policyPeriodTo) {
        this.policyPeriodTo = policyPeriodTo;
    }

    public String getPolicyLawFirmName() {
        return policyLawFirmName;
    }

    public void setPolicyLawFirmName(String policyLawFirmName) {
        this.policyLawFirmName = policyLawFirmName;
    }
}
