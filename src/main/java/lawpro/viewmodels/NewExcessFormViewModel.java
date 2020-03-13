package lawpro.viewmodels;

import lawpro.models.universe.excess.FileDetail;
import lawpro.models.universe.excess.FileInfo;
import lawpro.viewmodels.excess.*;

public class NewExcessFormViewModel {

    public NewExcessFormViewModel() {
    }

    private String firstName;
    private String lastName;
    private String email;
    private String userId;
    private String source;
    private String submittedFor;
    private String applicantFirmName;
    private String applicantFirmAddress;
    private Boolean hasOfficesInsideCanada;
    private String officeInsideCanadaCity;
    private String officeInsideCanadaProvince;
    private Boolean hasOfficesOutsideCanada;
    private String officeOutsideCanadaCountry;
    private String[] natureOfPractice;
    private Boolean officeShared;
    private String officeSharedFirmName;
    private Boolean officeSpaceShared;
    private Boolean receptionAreaShared;
    private Boolean phoneNumberShared;
    private String phoneNumberSharedDetails;
    private Boolean faxNumberShared;
    private String faxNumberSharedDetails;
    private Boolean emailAddressShared;
    private Boolean websiteShared;
    private String websiteSharedDetails;
    private Boolean letterheadShared;
    private String letterheadSharedDetails;
    private Boolean signageShared;
    private String signageSharedDetails;
    private Boolean promoMaterialsShared;
    private String promoMaterialsSharedDetails;
    private Boolean practisingShared;
    private String practisingSharedDetails;
    private String applicantFirmPhone;
    private String applicantFirmFax;

    private Boolean hasRelatedFirms;
    private RelatedFirmViewModel[] allRelatedFirms;

    private String inseptionDateSelected;
    private String coverageRequestedOption;
    private String coverageRequestedReason;
    private String primaryContact;

    private Boolean hasFormerFirms;
    private PredecessorFirmViewModel[] allFormerFirms;

    private Boolean hasManagementCompanies;
    private ManagementCompanyViewModel[] allMgtCompanies;

    private String numberOfLawyers;

    private Boolean hasCounselLawyersIncluded;
    private OfCounselLawyerViewModel[] actingAsOfCounselLawyers;

    private Boolean innocentPartyCoverage;

    private Boolean hasOtherInsurance;
    private CoverageDetailViewModel[] otherInsurance;

    private Boolean additionalCoverageContemplated;
    private String additionalCoverageContemplatedDetail;

    private Boolean coverageDeclined;
    private String coverageDeclinedDetail;
    private Boolean thirdPartyAuthorized;
    private Boolean hasInnocentPartyCoverage;
    private Boolean hasInnocentPartyCoverageDeclaration;

    private String paymentOption;
    private String bankingInstitution;
    private String transitNumber;
    private String bankingInstitution2;
    private String accountNumber;
    private String nameOnAccount;
    private String installmentOption;

    private Boolean paymentAuthorized;
    private String applicantName;
    private String applicantLsoNumber;
    private Boolean signatureDeclaration;
    private Boolean claimsNotReported;
    private String comments;
    private FileInfoViewModel attachments;
    private Boolean found;

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getSubmittedFor() {
        return submittedFor;
    }

    public void setSubmittedFor(String submittedFor) {
        this.submittedFor = submittedFor;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getApplicantFirmName() {
        return applicantFirmName;
    }

    public void setApplicantFirmName(String applicantFirmName) {
        this.applicantFirmName = applicantFirmName;
    }

    public String getApplicantFirmAddress() {
        return applicantFirmAddress;
    }

    public void setApplicantFirmAddress(String applicantFirmAddress) {
        this.applicantFirmAddress = applicantFirmAddress;
    }

    public Boolean getHasOfficesInsideCanada() {
        return hasOfficesInsideCanada;
    }

    public void setHasOfficesInsideCanada(Boolean hasOfficesInsideCanada) {
        this.hasOfficesInsideCanada = hasOfficesInsideCanada;
    }

    public String getOfficeInsideCanadaCity() {
        return officeInsideCanadaCity;
    }

    public void setOfficeInsideCanadaCity(String officeInsideCanadaCity) {
        this.officeInsideCanadaCity = officeInsideCanadaCity;
    }

    public String getOfficeInsideCanadaProvince() {
        return officeInsideCanadaProvince;
    }

    public void setOfficeInsideCanadaProvince(String officeInsideCanadaProvince) {
        this.officeInsideCanadaProvince = officeInsideCanadaProvince;
    }

    public Boolean getHasOfficesOutsideCanada() {
        return hasOfficesOutsideCanada;
    }

    public void setHasOfficesOutsideCanada(Boolean hasOfficesOutsideCanada) {
        this.hasOfficesOutsideCanada = hasOfficesOutsideCanada;
    }

    public String getOfficeOutsideCanadaCountry() {
        return officeOutsideCanadaCountry;
    }

    public void setOfficeOutsideCanadaCountry(String officeOutsideCanadaCountry) {
        this.officeOutsideCanadaCountry = officeOutsideCanadaCountry;
    }

    public String[] getNatureOfPractice() {
        return natureOfPractice;
    }

    public void setNatureOfPractice(String[] natureOfPractice) {
        this.natureOfPractice = natureOfPractice;
    }

    public Boolean getOfficeShared() {
        return officeShared;
    }

    public void setOfficeShared(Boolean officeShared) {
        this.officeShared = officeShared;
    }

    public String getOfficeSharedFirmName() {
        return officeSharedFirmName;
    }

    public void setOfficeSharedFirmName(String officeSharedFirmName) {
        this.officeSharedFirmName = officeSharedFirmName;
    }

    public Boolean getOfficeSpaceShared() {
        return officeSpaceShared;
    }

    public void setOfficeSpaceShared(Boolean officeSpaceShared) {
        this.officeSpaceShared = officeSpaceShared;
    }

    public Boolean getReceptionAreaShared() {
        return receptionAreaShared;
    }

    public void setReceptionAreaShared(Boolean receptionAreaShared) {
        this.receptionAreaShared = receptionAreaShared;
    }

    public Boolean getPhoneNumberShared() {
        return phoneNumberShared;
    }

    public void setPhoneNumberShared(Boolean phoneNumberShared) {
        this.phoneNumberShared = phoneNumberShared;
    }

    public String getPhoneNumberSharedDetails() {
        return phoneNumberSharedDetails;
    }

    public void setPhoneNumberSharedDetails(String phoneNumberSharedDetails) {
        this.phoneNumberSharedDetails = phoneNumberSharedDetails;
    }

    public Boolean getFaxNumberShared() {
        return faxNumberShared;
    }

    public void setFaxNumberShared(Boolean faxNumberShared) {
        this.faxNumberShared = faxNumberShared;
    }

    public String getFaxNumberSharedDetails() {
        return faxNumberSharedDetails;
    }

    public void setFaxNumberSharedDetails(String faxNumberSharedDetails) {
        this.faxNumberSharedDetails = faxNumberSharedDetails;
    }

    public Boolean getEmailAddressShared() {
        return emailAddressShared;
    }

    public void setEmailAddressShared(Boolean emailAddressShared) {
        this.emailAddressShared = emailAddressShared;
    }

    public Boolean getWebsiteShared() {
        return websiteShared;
    }

    public void setWebsiteShared(Boolean websiteShared) {
        this.websiteShared = websiteShared;
    }

    public String getWebsiteSharedDetails() {
        return websiteSharedDetails;
    }

    public void setWebsiteSharedDetails(String websiteSharedDetails) {
        this.websiteSharedDetails = websiteSharedDetails;
    }

    public Boolean getLetterheadShared() {
        return letterheadShared;
    }

    public void setLetterheadShared(Boolean letterheadShared) {
        this.letterheadShared = letterheadShared;
    }

    public String getLetterheadSharedDetails() {
        return letterheadSharedDetails;
    }

    public void setLetterheadSharedDetails(String letterheadSharedDetails) {
        this.letterheadSharedDetails = letterheadSharedDetails;
    }

    public Boolean getSignageShared() {
        return signageShared;
    }

    public void setSignageShared(Boolean signageShared) {
        this.signageShared = signageShared;
    }

    public String getSignageSharedDetails() {
        return signageSharedDetails;
    }

    public void setSignageSharedDetails(String signageSharedDetails) {
        this.signageSharedDetails = signageSharedDetails;
    }

    public Boolean getPromoMaterialsShared() {
        return promoMaterialsShared;
    }

    public void setPromoMaterialsShared(Boolean promoMaterialsShared) {
        this.promoMaterialsShared = promoMaterialsShared;
    }

    public String getPromoMaterialsSharedDetails() {
        return promoMaterialsSharedDetails;
    }

    public void setPromoMaterialsSharedDetails(String promoMaterialsSharedDetails) {
        this.promoMaterialsSharedDetails = promoMaterialsSharedDetails;
    }

    public Boolean getPractisingShared() {
        return practisingShared;
    }

    public void setPractisingShared(Boolean practisingShared) {
        this.practisingShared = practisingShared;
    }

    public String getPractisingSharedDetails() {
        return practisingSharedDetails;
    }

    public void setPractisingSharedDetails(String practisingSharedDetails) {
        this.practisingSharedDetails = practisingSharedDetails;
    }

    public Boolean getHasRelatedFirms() {
        return hasRelatedFirms;
    }

    public void setHasRelatedFirms(Boolean hasRelatedFirms) {
        this.hasRelatedFirms = hasRelatedFirms;
    }

    public RelatedFirmViewModel[] getAllRelatedFirms() {
        return allRelatedFirms;
    }

    public void setAllRelatedFirms(RelatedFirmViewModel[] allRelatedFirms) {
        this.allRelatedFirms = allRelatedFirms;
    }

    public String getInseptionDateSelected() {
        return inseptionDateSelected;
    }

    public void setInseptionDateSelected(String inseptionDateSelected) {
        this.inseptionDateSelected = inseptionDateSelected;
    }

    public String getCoverageRequestedOption() {
        return coverageRequestedOption;
    }

    public void setCoverageRequestedOption(String coverageRequestedOption) {
        this.coverageRequestedOption = coverageRequestedOption;
    }

    public String getCoverageRequestedReason() {
        return coverageRequestedReason;
    }

    public void setCoverageRequestedReason(String coverageRequestedReason) {
        this.coverageRequestedReason = coverageRequestedReason;
    }

    public String getPrimaryContact() {
        return primaryContact;
    }

    public void setPrimaryContact(String primaryContact) {
        this.primaryContact = primaryContact;
    }

    public Boolean getHasFormerFirms() {
        return hasFormerFirms;
    }

    public void setHasFormerFirms(Boolean hasFormerFirms) {
        this.hasFormerFirms = hasFormerFirms;
    }

    public PredecessorFirmViewModel[] getAllFormerFirms() {
        return allFormerFirms;
    }

    public void setAllFormerFirms(PredecessorFirmViewModel[] allFormerFirms) {
        this.allFormerFirms = allFormerFirms;
    }

    public Boolean getHasManagementCompanies() {
        return hasManagementCompanies;
    }

    public void setHasManagementCompanies(Boolean hasManagementCompanies) {
        this.hasManagementCompanies = hasManagementCompanies;
    }

    public ManagementCompanyViewModel[] getAllMgtCompanies() {
        return allMgtCompanies;
    }

    public void setAllMgtCompanies(ManagementCompanyViewModel[] allMgtCompanies) {
        this.allMgtCompanies = allMgtCompanies;
    }

    public String getNumberOfLawyers() {
        return numberOfLawyers;
    }

    public void setNumberOfLawyers(String numberOfLawyers) {
        this.numberOfLawyers = numberOfLawyers;
    }

    public Boolean getHasCounselLawyersIncluded() {
        return hasCounselLawyersIncluded;
    }

    public void setHasCounselLawyersIncluded(Boolean hasCounselLawyersIncluded) {
        this.hasCounselLawyersIncluded = hasCounselLawyersIncluded;
    }

    public OfCounselLawyerViewModel[] getActingAsOfCounselLawyers() {
        return actingAsOfCounselLawyers;
    }

    public void setActingAsOfCounselLawyers(OfCounselLawyerViewModel[] actingAsOfCounselLawyers) {
        this.actingAsOfCounselLawyers = actingAsOfCounselLawyers;
    }

    public Boolean getInnocentPartyCoverage() {
        return innocentPartyCoverage;
    }

    public void setInnocentPartyCoverage(Boolean innocentPartyCoverage) {
        this.innocentPartyCoverage = innocentPartyCoverage;
    }

    public Boolean getHasOtherInsurance() {
        return hasOtherInsurance;
    }

    public void setHasOtherInsurance(Boolean hasOtherInsurance) {
        this.hasOtherInsurance = hasOtherInsurance;
    }

    public CoverageDetailViewModel[] getOtherInsurance() {
        return otherInsurance;
    }

    public void setOtherInsurance(CoverageDetailViewModel[] otherInsurance) {
        this.otherInsurance = otherInsurance;
    }

    public Boolean getAdditionalCoverageContemplated() {
        return additionalCoverageContemplated;
    }

    public void setAdditionalCoverageContemplated(Boolean additionalCoverageContemplated) {
        this.additionalCoverageContemplated = additionalCoverageContemplated;
    }

    public String getAdditionalCoverageContemplatedDetail() {
        return additionalCoverageContemplatedDetail;
    }

    public void setAdditionalCoverageContemplatedDetail(String additionalCoverageContemplatedDetail) {
        this.additionalCoverageContemplatedDetail = additionalCoverageContemplatedDetail;
    }

    public Boolean getCoverageDeclined() {
        return coverageDeclined;
    }

    public void setCoverageDeclined(Boolean coverageDeclined) {
        this.coverageDeclined = coverageDeclined;
    }

    public String getCoverageDeclinedDetail() {
        return coverageDeclinedDetail;
    }

    public void setCoverageDeclinedDetail(String coverageDeclinedDetail) {
        this.coverageDeclinedDetail = coverageDeclinedDetail;
    }

    public Boolean getThirdPartyAuthorized() {
        return thirdPartyAuthorized;
    }

    public void setThirdPartyAuthorized(Boolean thirdPartyAuthorized) {
        this.thirdPartyAuthorized = thirdPartyAuthorized;
    }

    public Boolean getHasInnocentPartyCoverage() {
        return hasInnocentPartyCoverage;
    }

    public void setHasInnocentPartyCoverage(Boolean hasInnocentPartyCoverage) {
        this.hasInnocentPartyCoverage = hasInnocentPartyCoverage;
    }

    public Boolean getHasInnocentPartyCoverageDeclaration() {
        return hasInnocentPartyCoverageDeclaration;
    }

    public void setHasInnocentPartyCoverageDeclaration(Boolean hasInnocentPartyCoverageDeclaration) {
        this.hasInnocentPartyCoverageDeclaration = hasInnocentPartyCoverageDeclaration;
    }

    public String getPaymentOption() {
        return paymentOption;
    }

    public void setPaymentOption(String paymentOption) {
        this.paymentOption = paymentOption;
    }

    public String getInstallmentOption() {
        return installmentOption;
    }

    public void setInstallmentOption(String installmentOption) {
        this.installmentOption = installmentOption;
    }

    public String getBankingInstitution() {
        return bankingInstitution;
    }

    public void setBankingInstitution(String bankingInstitution) {
        this.bankingInstitution = bankingInstitution;
    }

    public String getTransitNumber() {
        return transitNumber;
    }

    public void setTransitNumber(String transitNumber) {
        this.transitNumber = transitNumber;
    }

    public String getBankingInstitution2() {
        return bankingInstitution2;
    }

    public void setBankingInstitution2(String bankingInstitution2) {
        this.bankingInstitution2 = bankingInstitution2;
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

    public Boolean getPaymentAuthorized() {
        return paymentAuthorized;
    }

    public void setPaymentAuthorized(Boolean paymentAuthorized) {
        this.paymentAuthorized = paymentAuthorized;
    }

    public String getApplicantName() {
        return applicantName;
    }

    public void setApplicantName(String applicantName) {
        this.applicantName = applicantName;
    }

    public String getApplicantLsoNumber() {
        return applicantLsoNumber;
    }

    public void setApplicantLsoNumber(String applicantLsoNumber) {
        this.applicantLsoNumber = applicantLsoNumber;
    }

    public Boolean getSignatureDeclaration() {
        return signatureDeclaration;
    }

    public void setSignatureDeclaration(Boolean signatureDeclaration) {
        this.signatureDeclaration = signatureDeclaration;
    }

    public Boolean getClaimsNotReported() {
        return claimsNotReported;
    }

    public void setClaimsNotReported(Boolean claimsNotReported) {
        this.claimsNotReported = claimsNotReported;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public FileInfoViewModel getAttachments() {
        return attachments;
    }

    public void setAttachments(FileInfoViewModel attachments) {
        this.attachments = attachments;
    }

    public Boolean getFound() {
        return found;
    }

    public void setFound(Boolean found) {
        this.found = found;
    }

    public String getApplicantFirmPhone() {
        return applicantFirmPhone;
    }

    public void setApplicantFirmPhone(String applicantFirmPhone) {
        this.applicantFirmPhone = applicantFirmPhone;
    }

    public String getApplicantFirmFax() {
        return applicantFirmFax;
    }

    public void setApplicantFirmFax(String applicantFirmFax) {
        this.applicantFirmFax = applicantFirmFax;
    }
}