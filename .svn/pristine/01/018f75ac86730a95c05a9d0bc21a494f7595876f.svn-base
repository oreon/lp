package lawpro.providers.forms;

import lawpro.models.UserInfo;
import lawpro.models.universe.*;
import lawpro.models.universe.excess.*;
import lawpro.models.universe.irop.*;
import lawpro.models.universe.request.AddressFormRequest;
import lawpro.models.universe.request.ExcessRequest;
import lawpro.models.universe.request.FirmFormRequest;
import lawpro.models.universe.request.NewApplicationFormRequest;
import lawpro.models.universe.response.FirmResponse;
import lawpro.models.universe.response.UserResponse;
import lawpro.providers.UniverseProvider;
import lawpro.utils.SessionUtil;
import lawpro.viewmodels.*;
import lawpro.viewmodels.excess.*;
import lawpro.viewmodels.irop.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

//TODO: A lot of code in here is not necessary

@Component
public class RequestProvider {

    private final Logger LOGGER = LoggerFactory.getLogger(RequestProvider.class);

    public ExcessRequest getFormattedExcessFormRequest(NewExcessFormViewModel form, String token, FirmResponse firmResponse) {
        ExcessRequest request = new ExcessRequest();
        ExcessForm excessForm = new ExcessForm();


        Address address = new Address();
        address.setLine1(firmResponse.getFirm().getAddress().getLine1());
        address.setLine2(firmResponse.getFirm().getAddress().getLine2());
        address.setLine3(firmResponse.getFirm().getAddress().getLine3());
        address.setPostalCode(firmResponse.getFirm().getAddress().getPostalCode());
        address.setProvince(firmResponse.getFirm().getAddress().getProvince());
        address.setCity(firmResponse.getFirm().getAddress().getCity());

        WsFirmBase wsFirmBase = new WsFirmBase(firmResponse.getFirm().getName(), address);
        excessForm.setApplicantFirm(wsFirmBase);

        DateFormat format = new SimpleDateFormat("MMM dd, yyyy", Locale.ENGLISH);
        DateFormat timeFormat = new SimpleDateFormat("hh:mm:ssaa");
        try{
            Date newDate = format.parse(form.getInseptionDateSelected());
            excessForm.setInseptionDateSelected(format.format(newDate));

        }catch(Exception e)
        {
            LOGGER.error("RequestProvider Error: getFormattedNewApplicationRequest()", e);
        }
        excessForm.setUserId(form.getUserId());
        excessForm.setSource(form.getSource());
        excessForm.setSubmittedBy(form.getUserId());
        excessForm.setSubmittedDate(format.format(new Date()));
        excessForm.setSubmittedTime(timeFormat.format(new Date()));
        excessForm.setSubmittedFor(form.getSubmittedFor());
        excessForm.setCoverageRequestedOption(form.getCoverageRequestedOption());

        excessForm.setHasOfficesInsideCanada(form.getHasOfficesInsideCanada());
        excessForm.setOfficeInsideCanadaCity(form.getOfficeInsideCanadaCity());
        excessForm.setOfficeInsideCanadaProvince(form.getOfficeInsideCanadaProvince());

        excessForm.setHasOfficesOutsideCanada(form.getHasOfficesOutsideCanada());
        excessForm.setOfficeOutsideCanadaCountry(form.getOfficeOutsideCanadaCountry());


        excessForm.setHasRelatedFirms(form.getHasRelatedFirms());

        List<RelatedFirm> relatedFirmsList = new ArrayList<>();
        for(RelatedFirmViewModel firm : form.getAllRelatedFirms()) {
            RelatedFirm relatedFirm = new RelatedFirm(firm.getName(), firm.getAddress(), firm.getNumberOfLawyers(), firm.getNatureOfPractice());
            relatedFirmsList.add(relatedFirm);
        }

        RelatedFirm[] relatedFirms = new RelatedFirm[relatedFirmsList.size()];
        relatedFirms = relatedFirmsList.toArray(relatedFirms);

        excessForm.setAllRelatedFirms(relatedFirms);

        excessForm.setHasFormerFirms(form.getHasFormerFirms());

        List<PredecessorFirm> predecessorFirmsList = new ArrayList<>();
        for(PredecessorFirmViewModel model : form.getAllFormerFirms()) {
            PredecessorFirm predecessorFirm = new PredecessorFirm(model.getNumber(), model.getName(), model.getCity(), model.getProvince(),
                                                Integer.parseInt(model.getInOperationFrom()), Integer.parseInt(model.getInOperationTo()),
                                                (model.getAverageNumberOfLawyers() == "" ? "0" : model.getAverageNumberOfLawyers()), model.isDissolved());
            predecessorFirmsList.add(predecessorFirm);
        }

        PredecessorFirm[] predecessorFirms = new PredecessorFirm[predecessorFirmsList.size()];

        excessForm.setAllFormerFirms(predecessorFirmsList.toArray(predecessorFirms));

        excessForm.setHasManagementCompanies(form.getHasManagementCompanies());

        List<ManagementCompany> managementCompaniesList = new ArrayList<>();
        for(ManagementCompanyViewModel company : form.getAllMgtCompanies()) {
            ManagementCompany managementCompany = new ManagementCompany(company.getName(), company.getServiceProvided(),
                                                    Integer.parseInt(company.getInOperationFrom()), Integer.parseInt(company.getInOperationTo()));
            managementCompaniesList.add(managementCompany);
        }

        ManagementCompany[] managementCompanies = new ManagementCompany[managementCompaniesList.size()];
        excessForm.setAllMgtCompanies(managementCompaniesList.toArray(managementCompanies));

        excessForm.setNatureOfPractice(form.getNatureOfPractice());

        excessForm.setOfficeShared(form.getOfficeShared());
        excessForm.setOfficeSharedFirmName(form.getOfficeSharedFirmName());

        excessForm.setOfficeSpaceShared((form.getOfficeSpaceShared() == null ? false : form.getOfficeSpaceShared()));

        excessForm.setReceptionAreaShared((form.getReceptionAreaShared() == null ? false : form.getReceptionAreaShared()));

        excessForm.setPhoneNumberShared((form.getReceptionAreaShared() == null ? false : form.getPhoneNumberShared()));
        excessForm.setPhoneNumberSharedDetails(form.getPhoneNumberSharedDetails());

        excessForm.setFaxNumberShared((form.getFaxNumberShared() == null ? false : form.getFaxNumberShared()));
        excessForm.setFaxNumberSharedDetails(form.getFaxNumberSharedDetails());

        excessForm.setEmailAddressShared((form.getEmailAddressShared() == null ? false : form.getEmailAddressShared()));

        excessForm.setWebsiteShared((form.getWebsiteShared() == null ? false : form.getWebsiteShared()));
        excessForm.setWebsiteSharedDetails(form.getWebsiteSharedDetails());

        excessForm.setLetterheadShared((form.getLetterheadShared() == null ? false : form.getLetterheadShared()));
        excessForm.setLetterheadSharedDetails(form.getLetterheadSharedDetails());

        excessForm.setSignageShared((form.getSignageShared() == null ? false : form.getSignageShared()));
        excessForm.setSignageSharedDetails(form.getSignageSharedDetails());

        excessForm.setPromoMaterialsShared((form.getPromoMaterialsShared() == null ? false : form.getPromoMaterialsShared()));
        excessForm.setPromoMaterialsSharedDetails(form.getPromoMaterialsSharedDetails());

        excessForm.setPractisingShared((form.getPractisingShared() == null ? false : form.getPractisingShared()));
        excessForm.setPractisingSharedDetails(form.getPractisingSharedDetails());
        excessForm.setHasInnocentPartyCoverage(form.getInnocentPartyCoverage());
        excessForm.setNumberOfLawyers(form.getNumberOfLawyers());

        excessForm.setHasCounselLawyersIncluded((form.getHasCounselLawyersIncluded() == null ? false : form.getHasCounselLawyersIncluded()));

        List<OfCounselLawyer> ofCounselLawyerList = new ArrayList<>();
        for(OfCounselLawyerViewModel lawyer : form.getActingAsOfCounselLawyers()) {
            OfCounselLawyer ofCounselLawyer = new OfCounselLawyer(lawyer.getLsoKey(), lawyer.getFullName());
            ofCounselLawyerList.add(ofCounselLawyer);
        }

        OfCounselLawyer[] ofCounselLawyers = new OfCounselLawyer[ofCounselLawyerList.size()];
        excessForm.setActingAsOfCounselLawyers(ofCounselLawyerList.toArray(ofCounselLawyers));

        excessForm.setHasExcessInsurance((form.getHasOtherInsurance() == null ? false : form.getHasOtherInsurance()));

        List<CoverageDetail> coverageDetailList = new ArrayList<>();
        for(CoverageDetailViewModel coverageDetailModel : form.getOtherInsurance()) {
            CoverageDetail coverageDetail = new CoverageDetail(coverageDetailModel.getInsurerCompanyKey(), coverageDetailModel.getInsurerCompanyName(), Integer.parseInt(coverageDetailModel.getPerClaim()),
                                                                Integer.parseInt(coverageDetailModel.getPerAgg()), Integer.parseInt(coverageDetailModel.getPolicyPeriodFrom()),
                                                                    Integer.parseInt(coverageDetailModel.getPolicyPeriodTo()), coverageDetailModel.getPolicyLawFirmName());
            coverageDetailList.add(coverageDetail);
        }

        CoverageDetail[] coverageDetails = new CoverageDetail[coverageDetailList.size()];
        excessForm.setOtherInsurance(coverageDetailList.toArray(coverageDetails));
        excessForm.setPrimaryContact(form.getPrimaryContact());
        excessForm.setAdditionalCoverageContemplated(form.getAdditionalCoverageContemplated());
        excessForm.setAdditionalCoverageContemplatedDetail(form.getAdditionalCoverageContemplatedDetail());
        excessForm.setCoverageDeclined(form.getCoverageDeclined());
        excessForm.setCoverageDeclinedDetail(form.getCoverageDeclinedDetail());

        excessForm.setThirdPartyAuthorized(form.getThirdPartyAuthorized() == null ? false : form.getThirdPartyAuthorized());
        excessForm.setHasInnocentPartyCoverage(form.getHasInnocentPartyCoverage());
        excessForm.setHasInnocentPartyCoverageDeclaration(form.getHasInnocentPartyCoverageDeclaration());
        excessForm.setCoverageRequestedReason(form.getCoverageRequestedReason());
        excessForm.setAttachments(form.getAttachments());
        excessForm.setPaymentInfo(new PaymentInfo());
        excessForm.setPaymentOption(form.getPaymentOption());
        if (form.getPaymentOption() != null)
        {
            if (form.getInstallmentOption().equals("1S CASH"))
            {
                excessForm.getPaymentInfo().setType("CHEQUE");
            }
            else if (form.getInstallmentOption().equals("1S CREDIT CARD"))
            {
                excessForm.getPaymentInfo().setType("CC");
                excessForm.getPaymentInfo().setAccount(new Account());
                excessForm.getPaymentInfo().getAccount().setNumber(token);
            }
            else if (form.getInstallmentOption().equals("4S CREDIT CARD"))
            {
                excessForm.getPaymentInfo().setType("CC");
                excessForm.getPaymentInfo().setAccount(new Account());
                excessForm.getPaymentInfo().getAccount().setNumber(token);
            }
            else if (form.getInstallmentOption().equals("1S EFT"))
            {
                excessForm.getPaymentInfo().setType("BANK");
                excessForm.getPaymentInfo().setAccount(new Account());
                excessForm.getPaymentInfo().getAccount().setNumber(form.getAccountNumber());
                excessForm.getPaymentInfo().getAccount().setInstitution(form.getBankingInstitution2());
                excessForm.getPaymentInfo().getAccount().setTransit(form.getTransitNumber());
                excessForm.getPaymentInfo().getAccount().setName(form.getNameOnAccount());
            }
            else if (form.getInstallmentOption().equals("4S EFT"))
            {
                excessForm.getPaymentInfo().setType("BANK");
                excessForm.getPaymentInfo().setAccount(new Account());
                excessForm.getPaymentInfo().getAccount().setNumber(form.getAccountNumber());
                excessForm.getPaymentInfo().getAccount().setInstitution(form.getBankingInstitution2());
                excessForm.getPaymentInfo().getAccount().setTransit(form.getTransitNumber());
                excessForm.getPaymentInfo().getAccount().setName(form.getNameOnAccount());
            }
            else if (form.getInstallmentOption().equals("12S EFT"))
            {
                excessForm.getPaymentInfo().setType("BANK");
                excessForm.getPaymentInfo().setAccount(new Account());
                excessForm.getPaymentInfo().getAccount().setNumber(form.getAccountNumber());
                excessForm.getPaymentInfo().getAccount().setInstitution(form.getBankingInstitution2());
                excessForm.getPaymentInfo().getAccount().setTransit(form.getTransitNumber());
                excessForm.getPaymentInfo().getAccount().setName(form.getNameOnAccount());
            }
            else if (form.getInstallmentOption().equals("12S CREDIT CARD"))
            {
                excessForm.getPaymentInfo().setType("CC");
                excessForm.getPaymentInfo().setAccount(new Account());
                excessForm.getPaymentInfo().getAccount().setNumber(token);
            }
        }

        excessForm.setHasPaymentAuthorized(form.getPaymentAuthorized());
        excessForm.setApplicantName(form.getApplicantName());
        excessForm.setApplicantLsoNumber(form.getApplicantLsoNumber());
        excessForm.setSignatureDeclaration(form.getSignatureDeclaration());
        excessForm.setClaimsNotReported(form.getClaimsNotReported());
        excessForm.setComments(form.getComments());
        excessForm.setApplicantFirmPhone(form.getApplicantFirmPhone());
        excessForm.setApplicantFirmFax(form.getApplicantFirmFax());

        excessForm.setComments(form.getComments());
        request.setForm(excessForm);


        return request;
    }

    public HashMap<String, List<File>> formatExcessLetterheads(HashMap<String, ArrayList<MultipartFile>> letterheads) {
        HashMap<String, List<File>> formattedLetterheads = new HashMap<>();

        List<File> applicantLetterheads = new ArrayList<>();
        List<File> assocLetterheads = new ArrayList<>();
        List<File> manCompanyLetterheads = new ArrayList<>();

        try {
            for(MultipartFile file : letterheads.get("applicantLetterheads")) {
                File letterhead = new File(file.getOriginalFilename());
                FileOutputStream fos = new FileOutputStream(letterhead);
                fos.write(file.getBytes());
                applicantLetterheads.add(letterhead);
                fos.close();
            }

            formattedLetterheads.put("applicantLetterheads", applicantLetterheads);

            for(MultipartFile file : letterheads.get("assocLetterheads")) {
                File letterhead = new File(file.getOriginalFilename());
                FileOutputStream fos = new FileOutputStream(letterhead);
                fos.write(file.getBytes());
                assocLetterheads.add(letterhead);
                fos.close();
            }

            formattedLetterheads.put("assocLetterheads", assocLetterheads);


            for(MultipartFile file : letterheads.get("manCompanyLetterheads")) {
                File letterhead = new File(file.getOriginalFilename());
                FileOutputStream fos = new FileOutputStream(letterhead);
                fos.write(file.getBytes());
                manCompanyLetterheads.add(letterhead);
                fos.close();
            }

            formattedLetterheads.put("manCompanyLetterheads", manCompanyLetterheads);

        } catch (Exception e) {
            LOGGER.error("", e);
            System.out.println(e);
        }





        return formattedLetterheads;
    }

    public MemberContact getFormattedMemberContact(UserResponse userResponse) {
        MemberContact memberContact = new MemberContact();

        memberContact.setCity(userResponse.getAddress().getCity());
        memberContact.setEmail(userResponse.getEmail());
        memberContact.setFirstName(userResponse.getContactName().getFirstName());
        memberContact.setLastName(userResponse.getContactName().getLastName());
        memberContact.setLine1(userResponse.getAddress().getLine1());
        memberContact.setLine2(userResponse.getAddress().getLine2());
        memberContact.setLine3(userResponse.getAddress().getLine3());
        memberContact.setPhone(userResponse.getHomePhone());
        memberContact.setPostalCode(userResponse.getAddress().getPostalCode());
        memberContact.setProvince(userResponse.getAddress().getProvince());

        return memberContact;
    }

    public List<Notification> getFormattedNotifications() {
        UserInfo userInfo = SessionUtil.getUserInfo();
        List<Notification> notifications = new ArrayList<>();

        Notification notification = new Notification();
        notification.setFirstName(userInfo.getFirstName());
        notification.setLastName(userInfo.getLastName());
        notification.setType("confirmation");

        Contact contact = new Contact();
        contact.setContactType("EMAIL");
        contact.setValue(userInfo.getEmail());
        notification.setContactInfo(contact);
        notifications.add(notification);

        return notifications;
    }

    public NewApplicationFormRequest getFormattedNewApplicationRequest(NewApplicationFormViewModel form, String token) {

        NewApplicationFormRequest requestForm = new NewApplicationFormRequest();

        requestForm.setForm(new lawpro.models.universe.NewApplicationForm());

        requestForm.getForm().setAggregate(form.getAggregate());
        requestForm.getForm().setClaims(form.getClaims());
        requestForm.getForm().setComments(form.getComments());
        requestForm.getForm().setSendEmail(form.getConfirmationE());

        //date
        try{
            DateFormat format = new SimpleDateFormat("MMM dd, yyyy", Locale.ENGLISH);
            Date newDate = format.parse(form.getDateofPolicy());
            requestForm.getForm().setDateofPolicy(format.format(newDate));

        }catch(Exception e)
        {
            LOGGER.error("RequestProvider Error: getFormattedNewApplicationRequest()", e);
        }

        requestForm.getForm().setDeclaration(form.getDeclaration());
        requestForm.getForm().setDeduc(form.getDeduc());
        requestForm.getForm().setExcess_per_Claim(form.getExcess_per_Claim());
        requestForm.getForm().setVolume(form.getGB());
        requestForm.getForm().setInnocentPartyCoverage(form.getInnocentPartyCoverage());
        requestForm.getForm().setInstalment(form.getInstalment());
        requestForm.getForm().setLandTitle(form.getLandTitle());
        requestForm.getForm().setNameofInsurer(form.getNameofInsurer());
        requestForm.getForm().setNatureOfLawPractice(form.getNatureOfLawPractice());
        requestForm.getForm().setNonLaw(form.getNonLaw());
        requestForm.getForm().setNumberofLawyers(form.getNumberofLawyers());
        requestForm.getForm().setOntarioYears(form.getOntario_Years());
        requestForm.getForm().setOtherExcessInsurer(form.getOtherExcessInsurer());
        requestForm.getForm().setPersonalLawCorp(form.getPersonalLawCorp());
        requestForm.getForm().setPracticeOutsideOther(form.getPracticeOutsideOther());
        requestForm.getForm().setPremiumPaymentAuthorization(form.getPPA_Check());
        requestForm.getForm().setPartTimePractice(form.getPPRac());
        requestForm.getForm().setDeclarationRestrictedAreaOfPractice(form.getDeclarationR());
        requestForm.getForm().setDeclarationPartTimePractice(form.getDeclarationP());
        requestForm.getForm().setPracticeOutside(form.getPracticeOutside());
        requestForm.getForm().setPrimaryAreaOfPractice(form.getPrimaryAreaOfPractice());
        requestForm.getForm().setThirdPartyPayor(form.getThirdPartyPayor());
        requestForm.getForm().setPrivateHours(form.getPrivate_Hours());
        requestForm.getForm().setRestrictedAreaOfPractice(form.getRPrac());
        requestForm.getForm().setRepco(form.getLandTitle());
        requestForm.getForm().setSecondaryAreaOfPractice(form.getSecondaryAreaOfPractice());
        requestForm.getForm().setCertIndianStatus(form.getTCRD());
        requestForm.getForm().setLawID(form.getLSONumber());
        requestForm.getForm().setFirmID(form.getFirmID());
        requestForm.getForm().setFirmInfo(form.getFirmInfo());
        requestForm.getForm().setRepcoAllowed(form.isRepcoAllowed());
        requestForm.getForm().setPartTimePracticeAllowed(form.isPartTimePracticeAllowed());
        requestForm.getForm().setNilDeducAllowed(form.isNilDeducAllowed());

        requestForm.getForm().setPaymentInfo(new PaymentInfo());
        if (form.getInstalment() != null)
        {
            if (form.getInstalment().equals("1S CASH"))
            {
                requestForm.getForm().getPaymentInfo().setType("CHEQUE");
            }
            else if (form.getInstalment().equals("1S CREDIT CARD"))
            {
                requestForm.getForm().getPaymentInfo().setType("CC");
                requestForm.getForm().getPaymentInfo().setAccount(new Account());
                requestForm.getForm().getPaymentInfo().getAccount().setNumber(token);
            }
            else if (form.getInstalment().equals("4S CREDIT CARD"))
            {
                requestForm.getForm().getPaymentInfo().setType("CC");
                requestForm.getForm().getPaymentInfo().setAccount(new Account());
                requestForm.getForm().getPaymentInfo().getAccount().setNumber(token);
            }
            else if (form.getInstalment().equals("1S EFT"))
            {
                requestForm.getForm().getPaymentInfo().setType("BANK");
                requestForm.getForm().getPaymentInfo().setAccount(new Account());
                requestForm.getForm().getPaymentInfo().getAccount().setNumber(form.getAccountNumber());
                requestForm.getForm().getPaymentInfo().getAccount().setInstitution(form.getBankingInstitution2());
                requestForm.getForm().getPaymentInfo().getAccount().setTransit(form.getTransitNumber());
                requestForm.getForm().getPaymentInfo().getAccount().setName(form.getNameOnAccount());
            }
            else if (form.getInstalment().equals("4S EFT"))
            {
                requestForm.getForm().getPaymentInfo().setType("BANK");
                requestForm.getForm().getPaymentInfo().setAccount(new Account());
                requestForm.getForm().getPaymentInfo().getAccount().setNumber(form.getAccountNumber());
                requestForm.getForm().getPaymentInfo().getAccount().setInstitution(form.getBankingInstitution2());
                requestForm.getForm().getPaymentInfo().getAccount().setTransit(form.getTransitNumber());
                requestForm.getForm().getPaymentInfo().getAccount().setName(form.getNameOnAccount());
            }
            else if (form.getInstalment().equals("12S EFT"))
            {
                requestForm.getForm().getPaymentInfo().setType("BANK");
                requestForm.getForm().getPaymentInfo().setAccount(new Account());
                requestForm.getForm().getPaymentInfo().getAccount().setNumber(form.getAccountNumber());
                requestForm.getForm().getPaymentInfo().getAccount().setInstitution(form.getBankingInstitution2());
                requestForm.getForm().getPaymentInfo().getAccount().setTransit(form.getTransitNumber());
                requestForm.getForm().getPaymentInfo().getAccount().setName(form.getNameOnAccount());
            }
            else if (form.getInstalment().equals("12S CREDIT CARD"))
            {
                requestForm.getForm().getPaymentInfo().setType("CC");
                requestForm.getForm().getPaymentInfo().setAccount(new Account());
                requestForm.getForm().getPaymentInfo().getAccount().setNumber(token);
            }
        }

        Notification notification = new Notification();
        notification.setFirstName(form.getFirstName());
        notification.setLastName(form.getLastName());
        notification.setType("confirmation");

        Contact contact = new Contact();
        contact.setContactType("EMAIL");
        contact.setValue(form.getEmail());
        notification.setContactInfo(contact);

        requestForm.getNotifications().add(notification);

        return requestForm;
    }

    public AddressFormRequest formatAddressFormRequest(AddressFormViewModel form) {

        AddressFormRequest requestForm = new AddressFormRequest();

        requestForm.setForm(new lawpro.models.universe.AddressForm());

        ContactName contactName = new ContactName();
        contactName.setFirstName(form.getFirstName());
        contactName.setLastName(form.getLastName());
        contactName.setTitle(form.getPosition());
        requestForm.getForm().setContactName(contactName);

        requestForm.getForm().setLsoKey(form.getLSONumber());
        requestForm.getForm().setFirmName(form.getFirmName());
        requestForm.getForm().setFirmKey(form.getFirmNumber());

        List<Contact> contacts = new ArrayList<>();

        if (!form.getFaxNumber().isEmpty())
        {
            Contact contact = new Contact();
            contact.setContactType("FAX");
            contact.setValue(form.getFaxNumber());
            contacts.add(contact);
        }

        if (!form.getEmail().isEmpty())
        {
            Contact contact = new Contact();
            contact.setContactType("EMAIL");
            contact.setValue(form.getEmail());
            contacts.add(contact);
            requestForm.getForm().setEmail(form.getEmail());
        }

        if (!form.getWorkPhone().isEmpty())
        {
            Contact contact = new Contact();
            contact.setContactType("PHONE_WORK");
            contact.setValue(form.getWorkPhone());
            if (!form.getWorkPhoneExt().isEmpty())
            {
                contact.setExt(form.getWorkPhoneExt());
            }
            contacts.add(contact);
        }

        if (!form.getHomePhone().isEmpty())
        {
            Contact contact = new Contact();
            contact.setContactType("PHONE");
            contact.setValue(form.getHomePhone());
            contacts.add(contact);
        }

        if (!form.getAddlPhone().isEmpty())
        {
            Contact contact = new Contact();
            contact.setContactType("PHONE_OTHER");
            contact.setValue(form.getAddlPhone());
            contacts.add(contact);
        }

        if (!form.getWebsite().isEmpty())
        {
            Contact contact = new Contact();
            contact.setContactType("WEB_SITE");
            contact.setValue(form.getWebsite());
            contacts.add(contact);
        }

        requestForm.getForm().setContacts(contacts);

        requestForm.getForm().setPreferredMailingAddress(form.getPreferredMailing());

        //date
        DateFormat format = new SimpleDateFormat("MMM dd, yyyy", Locale.ENGLISH);
        if (form.getEffectiveDate().isEmpty())
        {
            Date newDate = Calendar.getInstance().getTime();
            DateFormat printFormat = new SimpleDateFormat("MMM dd, yyyy");
            requestForm.getForm().setEffectiveDate(printFormat.format(newDate));
        }else{
            try{

                Date newDate = format.parse(form.getEffectiveDate());
                DateFormat printFormat = new SimpleDateFormat("MMM dd, yyyy");
                requestForm.getForm().setEffectiveDate(printFormat.format(newDate));
            } catch(ParseException e)
            {
                LOGGER.error("RequestProvider Error: formatAddressRequest()", e);
                try {
                    Date newDate = format.parse(form.getEffectiveDate());
                    DateFormat printFormat = new SimpleDateFormat("MMM dd, yyyy");
                    requestForm.getForm().setEffectiveDate(printFormat.format(newDate));
                } catch (ParseException eTwo) {
                    LOGGER.error("RequestProvider Error: formatAddressRequest()", eTwo);
                }
            }
        }

        if (requestForm.getForm().getPreferredMailingAddress().equals("firm"))
        {
            Address address = new Address();
            address.setLine1(form.getMailingAddress1Value());
            address.setLine2(form.getMailingAddress2Value());
            address.setLine3(form.getMailingAddress3Value());
            address.setCity(form.getCityValue());
            address.setProvince(form.getProvinceValue());
            address.setPostalCode(form.getPostalCodeValue().toUpperCase());
            requestForm.getForm().setAddress(address);
        }else{
            Address address = new Address();
            address.setLine1(form.getMailingAddress1());
            address.setLine2(form.getMailingAddress2());
            address.setLine3(form.getMailingAddress3());
            address.setPostalCode(form.getPostalCode().toUpperCase());
            address.setCity(form.getCity());
            address.setProvince(form.getProvince());
            if (address.getProvince().equals("Other"))
            {
                address.setProvince(form.getProvinceOther());
            }
            requestForm.getForm().setAddress(address);
        }



        return requestForm;
    }

    public FirmFormRequest formatFirmFormRequest(FirmFormViewModel form) {

        FirmFormRequest requestForm = new FirmFormRequest();

        requestForm.setForm(new lawpro.models.universe.FirmForm());

        requestForm.getForm().setFirmName(form.getFirmName());
        requestForm.getForm().setFirmNumber(form.getFirmNumber());
        requestForm.getForm().setNop(form.getFirmNatureOfLawPractice());

        List<Contact> contacts = new ArrayList<>();

        if (!form.getFirmFaxNumber().isEmpty())
        {
            Contact contact = new Contact();
            contact.setContactType("FAX");
            contact.setValue(form.getFirmFaxNumber());
            contacts.add(contact);
        }

        if (!form.getFirmPhoneNumber().isEmpty())
        {
            Contact contact = new Contact();
            contact.setContactType("PHONE");
            contact.setValue(form.getFirmPhoneNumber());
            contacts.add(contact);
        }

        if (!form.getFirmWebsite().isEmpty())
        {
            Contact contact = new Contact();
            contact.setContactType("WEB_SITE");
            contact.setValue(form.getFirmWebsite());
            contacts.add(contact);
        }

        if (!form.getFirmEmail().isEmpty())
        {
            Contact contact = new Contact();
            contact.setContactType("EMAIL");
            contact.setValue(form.getFirmEmail());
            contacts.add(contact);
        }

        requestForm.getForm().setContacts(contacts);

        //date
        DateFormat format = new SimpleDateFormat("MMM dd, yyyy", Locale.ENGLISH);
        if (form.getFirmEffectiveDate().isEmpty())
        {
            Date newDate = Calendar.getInstance().getTime();
            DateFormat printFormat = new SimpleDateFormat("dd MMM yyyy");
            requestForm.getForm().setEffectiveDate(printFormat.format(newDate));
        }else{
            try{

                Date newDate = format.parse(form.getFirmEffectiveDate());
                DateFormat printFormat = new SimpleDateFormat("dd MMM yyyy");
                requestForm.getForm().setEffectiveDate(printFormat.format(newDate));
            } catch(ParseException e)
            {
                LOGGER.error("RequestProvider Error: formatAddressRequest()", e);
                try {
                    Date newDate = format.parse(form.getFirmEffectiveDate());
                    DateFormat printFormat = new SimpleDateFormat("dd MMM yyyy");
                    requestForm.getForm().setEffectiveDate(printFormat.format(newDate));
                } catch (ParseException eTwo) {
                    LOGGER.error("RequestProvider Error: formatAddressRequest()", eTwo);
                }
            }
        }

        Address address = new Address();
        address.setLine1(form.getFirmAddress1());
        address.setLine2(form.getFirmAddress2());
        address.setLine3(form.getFirmAddress3());
        address.setCity(form.getFirmCity());
        address.setProvince(form.getFirmProvince());
        address.setPostalCode(form.getFirmPostalCode());
        requestForm.getForm().setAddress(address);

        //managing lawyer
        FirmContact managingLawyer = new FirmContact();
        managingLawyer.setEmail(form.getFirmManagingPartnerEmail());
        managingLawyer.setFirstName(form.getFirmManagingPartnerFirstName());
        managingLawyer.setLastName(form.getFirmManagingPartnerLastName());
        managingLawyer.setLsoKey(form.getFirmManagingPartnerLSO());
        managingLawyer.setTitle(form.getFirmManagingPartnerTitle());
        requestForm.getForm().setManagingLawyer(managingLawyer);

        //claim admin
        FirmContact claimAdmin = new FirmContact();
        claimAdmin.setEmail(form.getFirmClaimsContactEmail());
        claimAdmin.setFirstName(form.getFirmClaimsContactFirstName());
        claimAdmin.setLastName(form.getFirmClaimsContactLastName());
        claimAdmin.setLsoKey(form.getFirmClaimsContactLSO());
        claimAdmin.setTitle(form.getFirmClaimsContactTitle());
        requestForm.getForm().setClaimAdmin(claimAdmin);

        //claim admin
        FirmContact officeManager = new FirmContact();
        officeManager.setEmail(form.getFirmOfficeAdminEmail());
        officeManager.setFirstName(form.getFirmOfficeAdminFirstName());
        officeManager.setLastName(form.getFirmOfficeAdminLastName());
        officeManager.setLsoKey(form.getFirmOfficeAdminLSO());
        officeManager.setTitle(form.getFirmOfficeAdminTitle());
        requestForm.getForm().setOfficeManager(officeManager);

        //claim admin
        FirmContact cpdContact = new FirmContact();
        cpdContact.setEmail(form.getFirmCPDContactEmail());
        cpdContact.setFirstName(form.getFirmCPDContactFirstName());
        cpdContact.setLastName(form.getFirmCPDContactLastName());
        cpdContact.setLsoKey(form.getFirmCPDContactLSO());
        cpdContact.setTitle(form.getFirmCPDContactTitle());
        requestForm.getForm().setCpdContact(cpdContact);

        return requestForm;
    }

    public IropForm formatIropForm(IropViewModel model, String token) {

        IropForm iropForm = new IropForm();

        iropForm.setApplicantLsoNumber(model.getUserId());
        iropForm.setWithdrawalDate(model.getApplicantLastEngage());

        List<ApplicantsEmployment> applicantsEmploymentList = new ArrayList<>();

        for (IropEmploymentViewModel employmentModel : model.getEmployment()) {
            ApplicantsEmployment employment = new ApplicantsEmployment(employmentModel.getPosition(), employmentModel.getFirmName(),
                    employmentModel.getStartYear(), employmentModel.getEndYear());

            applicantsEmploymentList.add(employment);
        }

        ApplicantsEmployment[] applicantsEmployments = new ApplicantsEmployment[applicantsEmploymentList.size()];
        iropForm.setApplicantsEmployment(applicantsEmploymentList.toArray(applicantsEmployments));

        iropForm.setYearsInPractice(Integer.parseInt(model.getYearsInLaw()));
        iropForm.setRealEstatePercent(Integer.parseInt(model.getRealEstatePerc()));
        iropForm.setCriminalPercent(Integer.parseInt(model.getCriminalLawPerc()));
        iropForm.setPracticeHours(Integer.parseInt(model.getHoursDevotedPractice()));
        iropForm.setLimitBuyUp(model.getCoverageBuyUp());

        //TODO change this to real
        iropForm.setTermLength(model.getCoverageTerm());

        iropForm.setInnocentBuyUp(model.getInnocentBuyUp());

        iropForm.setThirdPartyAuthorized(model.getThirdParty());
        iropForm.setPaymentOption(model.getPaymentOption());

        /* RESIDUAL WORK REQUESTED */
        ResidualWork residualWorkRequested = new ResidualWork();

        residualWorkRequested.setResidualWorkRequested(false);

        /* POWER OF ATTORNEYS */
        PowerOfAttorney powerOfAttorney = new PowerOfAttorney();
        powerOfAttorney.setPowerOfAttorney(model.getProtectionRespectAttorney());

        List<PowerOfAttorneys> powerOfAttorneysList = new ArrayList<>();

        for (PoaAppointmentViewModel poaAppointment : model.getPoaAppointments()) {

            PowerOfAttorneys powerOfAttorneys = new PowerOfAttorneys(poaAppointment.getClientName(), poaAppointment.getAppointmentMade(), poaAppointment.getFamilyMember(),
                    poaAppointment.getDurationFrom(), poaAppointment.getDurationTo(), poaAppointment.getNature(), poaAppointment.getWrittenNotice(), poaAppointment.getActing());

            if (!powerOfAttorneys.getNoticeToClient()) {
                powerOfAttorney.setWrittenNotice(false);
            }
            powerOfAttorneysList.add(powerOfAttorneys);
        }

        PowerOfAttorneys[] powerOfAttorneys = new PowerOfAttorneys[powerOfAttorneysList.size()];
        powerOfAttorney.setPowerOfAttorneys(powerOfAttorneysList.toArray(powerOfAttorneys));

        powerOfAttorney.setNoNotificationReason(model.getPoaNoNotificationReason());
        residualWorkRequested.setPowerOfAttorney(powerOfAttorney);

        /* INTER VEVOS TRUST */
        InterVevosTrust interVevosTrust = new InterVevosTrust();
        interVevosTrust.setInterVevosTrust(model.getProtectionRespectInterVevo());

        List<InterVevos> interVevosList = new ArrayList<>();
        interVevosTrust.setWrittenNotice(true);

        for (IvAppointmentViewModel ivAppointment : model.getIvAppointments()) {
            InterVevos interVevos = new InterVevos(ivAppointment.getClientName(), ivAppointment.getAppointmentMade(), ivAppointment.getFamilyMember(),
                    ivAppointment.getDurationFrom(), ivAppointment.getDurationTo(), ivAppointment.getNature(), ivAppointment.getWrittenNotice(), ivAppointment.getActing());
            if (!interVevos.getNoticeToClient()) {
                interVevosTrust.setWrittenNotice(false);
            }
            interVevosList.add(interVevos);
        }

        InterVevos[] interVevos = new InterVevos[interVevosList.size()];
        interVevosTrust.setInterVevos(interVevosList.toArray(interVevos));
        interVevosTrust.setNoNotificationReason(model.getIvNoNotificationReason());

        residualWorkRequested.setInterVevosTrust(interVevosTrust);

        /* ESTATE */
        EstateTrustee estateTrustee = new EstateTrustee();
        estateTrustee.setEstateTrustee(model.getProtectionRespectEstate());

        estateTrustee.setWrittenNotice(true);

        List<EstateTrustees> estateTrusteesList = new ArrayList<>();

        for (EstateAppointmentViewModel estate : model.getEstateAppointments()) {
            EstateTrustees estateTrustees = new EstateTrustees(estate.getClientName(), estate.getAppointmentMade(), estate.getFamilyMember(), estate.getDurationFrom(), estate.getDurationTo(),
                    estate.getWrittenNotice(), estate.getEstimatedValue(), estate.getPassingDate(), estate.getActing());
            if (!estateTrustees.getNoticeToClient()) {
                estateTrustee.setWrittenNotice(false);
            }
            estateTrusteesList.add(estateTrustees);
        }

        EstateTrustees[] estateTrustees = new EstateTrustees[estateTrusteesList.size()];
        estateTrustee.setEstateTrustees(estateTrusteesList.toArray(estateTrustees));
        estateTrustee.setNoNotificationReason(model.getEstateNoNotificationReason());

        residualWorkRequested.setEstateTrustee(estateTrustee);

        iropForm.setResidualWorkRequested(residualWorkRequested);

        PaymentInfo paymentInfo = new PaymentInfo();

        if (model.getPaymentOption() != null) {
            String paymentOption = model.getPaymentOption();

            if (paymentOption.equals("AN CHEQUE")) {
                paymentInfo.setType("CHEQUE");
                iropForm.setPaymentOption("ANNUALLY");
            } else if (paymentOption.equals("AN EFT")) {
                paymentInfo.setType("BANK");
                paymentInfo.setAccount(new Account());
                paymentInfo.getAccount().setNumber(model.getAccountNumber());
                paymentInfo.getAccount().setInstitution(model.getBankingInstitutionShort());
                paymentInfo.getAccount().setTransit(model.getTransitNumber());
                paymentInfo.getAccount().setName(model.getNameOnAccount());
                iropForm.setPaymentOption("ANNUALLY");
            } else if (paymentOption.equals("AN CREDIT CARD")) {
                paymentInfo.setType("CC");
                paymentInfo.setAccount(new Account());
                paymentInfo.getAccount().setNumber(token);
                iropForm.setPaymentOption("ANNUALLY");
            } else if (paymentOption.equals("1S CHEQUE")) {
                paymentInfo.setType("CHEQUE");
                iropForm.setPaymentOption("LUMPSUM");
            } else if (paymentOption.equals("1S EFT")) {
                paymentInfo.setType("BANK");
                paymentInfo.setAccount(new Account());
                paymentInfo.getAccount().setNumber(model.getAccountNumber());
                paymentInfo.getAccount().setInstitution(model.getBankingInstitutionShort());
                paymentInfo.getAccount().setTransit(model.getTransitNumber());
                paymentInfo.getAccount().setName(model.getNameOnAccount());
                iropForm.setPaymentOption("LUMPSUM");
            } else if (paymentOption.equals("1S CREDIT CARD")) {
                paymentInfo.setType("CC");
                paymentInfo.setAccount(new Account());
                paymentInfo.getAccount().setNumber(token);
                iropForm.setPaymentOption("LUMPSUM");
            }
        }

        iropForm.setPaymentInfo(paymentInfo);
        iropForm.setComments(model.getComments());
        iropForm.setClaimsNotReported(model.getAwareOfClaims());
        iropForm.setHasPaymentAuthorized(model.getPpaCheck());
        iropForm.setSignatureDeclaration(model.getDeclaration());

        return iropForm;
    }

}
