package lawpro.models.universe.excess;

import lawpro.models.universe.PaymentInfo;
import lawpro.models.universe.excess.FileDetail;
import lawpro.viewmodels.excess.*;

public class ExcessForm {

    public ExcessForm() {
    }

    private String userId;
    private String source;
    private String submittedBy;
    private String submittedDate;
    private String submittedTime;
    private String submittedFor;
    private String paymentOption;

    private WsFirmBase applicantFirm;
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

    private Boolean hasRelatedFirms;
    private RelatedFirm[] allRelatedFirms;

    private String inseptionDateSelected;
    private String coverageRequestedOption;
    private String coverageRequestedReason;
    private String primaryContact;

    private Boolean hasFormerFirms;
    private PredecessorFirm[] allFormerFirms;

    private Boolean hasManagementCompanies;
    private ManagementCompany[] allMgtCompanies;

    private String numberOfLawyers;

    private Boolean hasCounselLawyersIncluded;
    private OfCounselLawyer[] actingAsOfCounselLawyers;

    private Boolean hasInnocentPartyCoverage;
    private Boolean hasInnocentPartyCoverageDeclaration;
    private Boolean hasExcessInsurance;
    private CoverageDetail[] otherInsurance;

    private Boolean additionalCoverageContemplated;
    private String additionalCoverageContemplatedDetail;

    private Boolean coverageDeclined;
    private String coverageDeclinedDetail;
    private Boolean thirdPartyAuthorized;

    private Boolean hasPaymentAuthorized;
    private String applicantName;
    private String applicantLsoNumber;
    private Boolean signatureDeclaration;
    private Boolean claimsNotReported;
    private String comments;
    private PaymentInfo paymentInfo;
    private FileInfoViewModel attachments;
    private String applicantFirmPhone;
    private String applicantFirmFax;


    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getSubmittedBy() {
        return submittedBy;
    }

    public void setSubmittedBy(String submittedBy) {
        this.submittedBy = submittedBy;
    }

    public String getSubmittedDate() {
        return submittedDate;
    }

    public void setSubmittedDate(String submittedDate) {
        this.submittedDate = submittedDate;
    }

    public String getSubmittedTime() {
        return submittedTime;
    }

    public void setSubmittedTime(String submittedTime) {
        this.submittedTime = submittedTime;
    }

    public String getSubmittedFor() {
        return submittedFor;
    }

    public void setSubmittedFor(String submittedFor) {
        this.submittedFor = submittedFor;
    }

    public WsFirmBase getApplicantFirm() {
        return applicantFirm;
    }

    public void setApplicantFirm(WsFirmBase applicantFirm) {
        this.applicantFirm = applicantFirm;
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

    public RelatedFirm[] getAllRelatedFirms() {
        return allRelatedFirms;
    }

    public void setAllRelatedFirms(RelatedFirm[] allRelatedFirms) {
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

    public PredecessorFirm[] getAllFormerFirms() {
        return allFormerFirms;
    }

    public void setAllFormerFirms(PredecessorFirm[] allFormerFirms) {
        this.allFormerFirms = allFormerFirms;
    }

    public Boolean getHasManagementCompanies() {
        return hasManagementCompanies;
    }

    public void setHasManagementCompanies(Boolean hasManagementCompanies) {
        this.hasManagementCompanies = hasManagementCompanies;
    }

    public ManagementCompany[] getAllMgtCompanies() {
        return allMgtCompanies;
    }

    public void setAllMgtCompanies(ManagementCompany[] allMgtCompanies) {
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

    public OfCounselLawyer[] getActingAsOfCounselLawyers() {
        return actingAsOfCounselLawyers;
    }

    public void setActingAsOfCounselLawyers(OfCounselLawyer[] actingAsOfCounselLawyers) {
        this.actingAsOfCounselLawyers = actingAsOfCounselLawyers;
    }

    public Boolean getHasInnocentPartyCoverage() {
        return hasInnocentPartyCoverage;
    }

    public void setHasInnocentPartyCoverage(Boolean hasInnocentPartyCoverage) {
        this.hasInnocentPartyCoverage = hasInnocentPartyCoverage;
    }

    public Boolean getHasExcessInsurance() {
        return hasExcessInsurance;
    }

    public void setHasExcessInsurance(Boolean hasExcessInsurance) {
        this.hasExcessInsurance = hasExcessInsurance;
    }

    public CoverageDetail[] getOtherInsurance() {
        return otherInsurance;
    }

    public void setOtherInsurance(CoverageDetail[] otherInsurance) {
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

    public Boolean getHasInnocentPartyCoverageDeclaration() {
        return hasInnocentPartyCoverageDeclaration;
    }

    public void setHasInnocentPartyCoverageDeclaration(Boolean hasInnocentPartyCoverageDeclaration) {
        this.hasInnocentPartyCoverageDeclaration = hasInnocentPartyCoverageDeclaration;
    }

    public Boolean getHasPaymentAuthorized() {
        return hasPaymentAuthorized;
    }

    public void setHasPaymentAuthorized(Boolean hasPaymentAuthorized) {
        this.hasPaymentAuthorized = hasPaymentAuthorized;
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

    public PaymentInfo getPaymentInfo() {
        return paymentInfo;
    }

    public void setPaymentInfo(PaymentInfo paymentInfo) {
        this.paymentInfo = paymentInfo;
    }

    public FileInfoViewModel getAttachments() {
        return attachments;
    }

    public void setAttachments(FileInfoViewModel attachments) {
        this.attachments = attachments;
    }

    public String getPaymentOption() {
        return paymentOption;
    }

    public void setPaymentOption(String paymentOption) {
        this.paymentOption = paymentOption;
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