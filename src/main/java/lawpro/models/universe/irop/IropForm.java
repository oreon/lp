package lawpro.models.universe.irop;

import lawpro.models.universe.PaymentInfo;

public class IropForm {

    private String applicantLsoNumber;
    private String withdrawalDate;

    private ApplicantsEmployment[] applicantsEmployment;
    private Integer yearsInPractice;
    private Integer realEstatePercent;
    private Integer criminalPercent;
    private Integer practiceHours;
    private String[] limitBuyUp;
    private String[] termLength;
    private String[] innocentBuyUp;
    private Boolean thirdPartyAuthorized;
    private String paymentOption;
    private ResidualWork residualWorkRequested;

    private PaymentInfo paymentInfo;
    private String comments;
    private Boolean claimsNotReported;
    private Boolean hasPaymentAuthorized;
    private Boolean signatureDeclaration;

    public String getApplicantLsoNumber() {
        return applicantLsoNumber;
    }

    public void setApplicantLsoNumber(String applicantLsoNumber) {
        this.applicantLsoNumber = applicantLsoNumber;
    }

    public String getWithdrawalDate() {
        return withdrawalDate;
    }

    public void setWithdrawalDate(String withdrawalDate) {
        this.withdrawalDate = withdrawalDate;
    }

    public ApplicantsEmployment[] getApplicantsEmployment() {
        return applicantsEmployment;
    }

    public void setApplicantsEmployment(ApplicantsEmployment[] applicantsEmployment) {
        this.applicantsEmployment = applicantsEmployment;
    }

    public Integer getYearsInPractice() {
        return yearsInPractice;
    }

    public void setYearsInPractice(Integer yearsInPractice) {
        this.yearsInPractice = yearsInPractice;
    }

    public Integer getRealEstatePercent() {
        return realEstatePercent;
    }

    public void setRealEstatePercent(Integer realEstatePercent) {
        this.realEstatePercent = realEstatePercent;
    }

    public Integer getCriminalPercent() {
        return criminalPercent;
    }

    public void setCriminalPercent(Integer criminalPercent) {
        this.criminalPercent = criminalPercent;
    }

    public Integer getPracticeHours() {
        return practiceHours;
    }

    public void setPracticeHours(Integer practiceHours) {
        this.practiceHours = practiceHours;
    }

    public String[] getLimitBuyUp() {
        return limitBuyUp;
    }

    public void setLimitBuyUp(String[] limitBuyUp) {
        this.limitBuyUp = limitBuyUp;
    }

    public String[] getTermLength() {
        return termLength;
    }

    public void setTermLength(String[] termLength) {
        this.termLength = termLength;
    }

    public String[] getInnocentBuyUp() {
        return innocentBuyUp;
    }

    public void setInnocentBuyUp(String[] innocentBuyUp) {
        this.innocentBuyUp = innocentBuyUp;
    }

    public Boolean getThirdPartyAuthorized() {
        return thirdPartyAuthorized;
    }

    public void setThirdPartyAuthorized(Boolean thirdPartyAuthorized) {
        this.thirdPartyAuthorized = thirdPartyAuthorized;
    }

    public String getPaymentOption() {
        return paymentOption;
    }

    public void setPaymentOption(String paymentOption) {
        this.paymentOption = paymentOption;
    }

    public ResidualWork getResidualWorkRequested() {
        return residualWorkRequested;
    }

    public void setResidualWorkRequested(ResidualWork residualWorkRequested) {
        this.residualWorkRequested = residualWorkRequested;
    }

    public PaymentInfo getPaymentInfo() {
        return paymentInfo;
    }

    public void setPaymentInfo(PaymentInfo paymentInfo) {
        this.paymentInfo = paymentInfo;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public Boolean getClaimsNotReported() {
        return claimsNotReported;
    }

    public void setClaimsNotReported(Boolean claimsNotReported) {
        this.claimsNotReported = claimsNotReported;
    }

    public Boolean getHasPaymentAuthorized() {
        return hasPaymentAuthorized;
    }

    public void setHasPaymentAuthorized(Boolean hasPaymentAuthorized) {
        this.hasPaymentAuthorized = hasPaymentAuthorized;
    }

    public Boolean getSignatureDeclaration() {
        return signatureDeclaration;
    }

    public void setSignatureDeclaration(Boolean signatureDeclaration) {
        this.signatureDeclaration = signatureDeclaration;
    }
}
