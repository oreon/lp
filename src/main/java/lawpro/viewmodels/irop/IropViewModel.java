package lawpro.viewmodels.irop;


import org.dozer.Mapping;

public class IropViewModel {

    private Boolean found;

    private String userId;

    private String applicantLastEngage;
    private IropEmploymentViewModel[] employment;

    private String yearsInLaw;
    private String realEstatePerc;
    private String criminalLawPerc;

    private String hoursDevotedPractice;

    private String[] coverageBuyUp;
    private String[] coverageTerm;
    private String[] innocentBuyUp;

    private Boolean applyingForResidual;

    private Boolean protectionRespectAttorney;
    private PoaAppointmentViewModel[] poaAppointments;
    private String poaNoNotificationReason;

    private Boolean protectionRespectInterVevo;
    private IvAppointmentViewModel[] ivAppointments;
    private String ivNoNotificationReason;

    private Boolean protectionRespectEstate;
    private EstateAppointmentViewModel[] estateAppointments;
    private String estateNoNotificationReason;

    private Boolean thirdParty;
    private String paymentOption;

    private String bankingInstitution;
    private String bankingInstitutionShort;
    private String transitNumber;
    private String accountNumber;
    private String nameOnAccount;

    private Boolean ppaCheck;
    private Boolean awareOfClaims;
    private String comments;
    private Boolean declaration;

    public Boolean getFound() {
        return found;
    }

    public void setFound(Boolean found) {
        this.found = found;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getApplicantLastEngage() {
        return applicantLastEngage;
    }

    public void setApplicantLastEngage(String applicantLastEngage) {
        this.applicantLastEngage = applicantLastEngage;
    }

    public IropEmploymentViewModel[] getEmployment() {
        return employment;
    }

    public void setEmployment(IropEmploymentViewModel[] employment) {
        this.employment = employment;
    }

    public String getYearsInLaw() {
        return yearsInLaw;
    }

    public void setYearsInLaw(String yearsInLaw) {
        this.yearsInLaw = yearsInLaw;
    }

    public String getRealEstatePerc() {
        return realEstatePerc;
    }

    public void setRealEstatePerc(String realEstatePerc) {
        this.realEstatePerc = realEstatePerc;
    }

    public String getCriminalLawPerc() {
        return criminalLawPerc;
    }

    public void setCriminalLawPerc(String criminalLawPerc) {
        this.criminalLawPerc = criminalLawPerc;
    }

    public String getHoursDevotedPractice() {
        return hoursDevotedPractice;
    }

    public void setHoursDevotedPractice(String hoursDevotedPractice) {
        this.hoursDevotedPractice = hoursDevotedPractice;
    }

    public String[] getCoverageBuyUp() {
        return coverageBuyUp;
    }

    public void setCoverageBuyUp(String[] coverageBuyUp) {
        this.coverageBuyUp = coverageBuyUp;
    }

    public String[] getCoverageTerm() {
        return coverageTerm;
    }

    public void setCoverageTerm(String[] coverageTerm) {
        this.coverageTerm = coverageTerm;
    }

    public String[] getInnocentBuyUp() {
        return innocentBuyUp;
    }

    public void setInnocentBuyUp(String[] innocentBuyUp) {
        this.innocentBuyUp = innocentBuyUp;
    }

    public Boolean getApplyingForResidual() {
        return applyingForResidual;
    }

    public void setApplyingForResidual(Boolean applyingForResidual) {
        this.applyingForResidual = applyingForResidual;
    }

    public Boolean getProtectionRespectAttorney() {
        return protectionRespectAttorney;
    }

    public void setProtectionRespectAttorney(Boolean protectionRespectAttorney) {
        this.protectionRespectAttorney = protectionRespectAttorney;
    }

    public PoaAppointmentViewModel[] getPoaAppointments() {
        return poaAppointments;
    }

    public void setPoaAppointments(PoaAppointmentViewModel[] poaAppointments) {
        this.poaAppointments = poaAppointments;
    }

    public String getPoaNoNotificationReason() {
        return poaNoNotificationReason;
    }

    public void setPoaNoNotificationReason(String poaNoNotificationReason) {
        this.poaNoNotificationReason = poaNoNotificationReason;
    }

    public Boolean getProtectionRespectInterVevo() {
        return protectionRespectInterVevo;
    }

    public void setProtectionRespectInterVevo(Boolean protectionRespectInterVevo) {
        this.protectionRespectInterVevo = protectionRespectInterVevo;
    }

    public IvAppointmentViewModel[] getIvAppointments() {
        return ivAppointments;
    }

    public void setIvAppointments(IvAppointmentViewModel[] ivAppointments) {
        this.ivAppointments = ivAppointments;
    }

    public String getIvNoNotificationReason() {
        return ivNoNotificationReason;
    }

    public void setIvNoNotificationReason(String ivNoNotificationReason) {
        this.ivNoNotificationReason = ivNoNotificationReason;
    }

    public Boolean getProtectionRespectEstate() {
        return protectionRespectEstate;
    }

    public void setProtectionRespectEstate(Boolean protectionRespectEstate) {
        this.protectionRespectEstate = protectionRespectEstate;
    }

    public EstateAppointmentViewModel[] getEstateAppointments() {
        return estateAppointments;
    }

    public void setEstateAppointments(EstateAppointmentViewModel[] estateAppointments) {
        this.estateAppointments = estateAppointments;
    }

    public String getEstateNoNotificationReason() {
        return estateNoNotificationReason;
    }

    public void setEstateNoNotificationReason(String estateNoNotificationsReason) {
        this.estateNoNotificationReason = estateNoNotificationsReason;
    }

    public Boolean getThirdParty() {
        return thirdParty;
    }

    public void setThirdParty(Boolean thirdParty) {
        this.thirdParty = thirdParty;
    }

    public String getPaymentOption() {
        return paymentOption;
    }

    public void setPaymentOption(String paymentOption) {
        this.paymentOption = paymentOption;
    }

    public String getBankingInstitution() {
        return bankingInstitution;
    }

    public void setBankingInstitution(String bankingInstitution) {
        this.bankingInstitution = bankingInstitution;
    }

    public String getBankingInstitutionShort() {
        return bankingInstitutionShort;
    }

    public void setBankingInstitutionShort(String bankingInstitutionShort) {
        this.bankingInstitutionShort = bankingInstitutionShort;
    }

    public String getTransitNumber() {
        return transitNumber;
    }

    public void setTransitNumber(String transitNumber) {
        this.transitNumber = transitNumber;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getNameOnAccount() {
        return nameOnAccount;
    }

    public void setNameOnAccount(String nameOnAccount) {
        this.nameOnAccount = nameOnAccount;
    }

    public Boolean getPpaCheck() {
        return ppaCheck;
    }

    public void setPpaCheck(Boolean ppaCheck) {
        this.ppaCheck = ppaCheck;
    }

    public Boolean getAwareOfClaims() {
        return awareOfClaims;
    }

    public void setAwareOfClaims(Boolean awareOfClaims) {
        this.awareOfClaims = awareOfClaims;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public Boolean getDeclaration() {
        return declaration;
    }

    public void setDeclaration(Boolean declaration) {
        this.declaration = declaration;
    }
}
