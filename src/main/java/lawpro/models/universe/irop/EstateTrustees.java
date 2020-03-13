package lawpro.models.universe.irop;

public class EstateTrustees {

    private String clientName;
    private String startDate;
    private Boolean familyMember;
    private String periodFrom;
    private String periodTo;
    private Boolean noticeToClient;
    private String estateValue;
    private String accountPassingDate;
    private Boolean alreadyActing;

    public EstateTrustees(){
    }

    public EstateTrustees(String clientName, String startDate, Boolean familyMember, String periodFrom, String periodTo, Boolean noticeToClient, String estateValue, String accountPassingDate, Boolean alreadyActing) {
        this.clientName = clientName;
        this.startDate = startDate;
        this.familyMember = familyMember;
        this.periodFrom = periodFrom;
        this.periodTo = periodTo;
        this.noticeToClient = noticeToClient;
        this.estateValue = estateValue;
        this.accountPassingDate = accountPassingDate;
        this.alreadyActing = alreadyActing;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public Boolean getFamilyMember() {
        return familyMember;
    }

    public void setFamilyMember(Boolean familyMember) {
        this.familyMember = familyMember;
    }

    public String getPeriodFrom() {
        return periodFrom;
    }

    public void setPeriodFrom(String periodFrom) {
        this.periodFrom = periodFrom;
    }

    public String getPeriodTo() {
        return periodTo;
    }

    public void setPeriodTo(String periodTo) {
        this.periodTo = periodTo;
    }

    public Boolean getNoticeToClient() {
        return noticeToClient;
    }

    public void setNoticeToClient(Boolean noticeToClient) {
        this.noticeToClient = noticeToClient;
    }

    public String getEstateValue() {
        return estateValue;
    }

    public void setEstateValue(String estateValue) {
        this.estateValue = estateValue;
    }

    public String getAccountPassingDate() {
        return accountPassingDate;
    }

    public void setAccountPassingDate(String accountPassingDate) {
        this.accountPassingDate = accountPassingDate;
    }

    public Boolean getAlreadyActing() {
        return alreadyActing;
    }

    public void setAlreadyActing(Boolean alreadyActing) {
        this.alreadyActing = alreadyActing;
    }
}
