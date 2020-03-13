package lawpro.models.universe.response;

import common.models.ResponseModel;
import lawpro.models.universe.ContactName;
import lawpro.models.universe.Firm;
import lawpro.utils.UserUtil;
import lawpro.models.universe.Address;
import lawpro.models.universe.Contact;

import java.util.List;

public class UserResponse extends ResponseModel {

    private ContactName contactName;
    private Firm firm;
    private Address address;
    private String LSONumber;
    private String lsoKey;
    private String preferredMailingAddress;
    private String firmKey;
    private String firmName;
    private String effectiveDate;
    private String homePhone;
    private String workPhone;
    private String workPhoneExt;
    private String addlPhone;
    private String fax;
    private String email;
    private String website;

    public UserResponse()
    {
        LSONumber = "";
        lsoKey = "";
        preferredMailingAddress = "";
        addlPhone = "";
        address = new Address();
        address.setCity("");
        address.setLine1("");
        address.setLine2("");
        address.setLine3("");
        address.setPostalCode("");
        address.setProvince("");
        email = "";
        website = "";
        homePhone = "";
        firmKey = "";
        contactName = new ContactName();
        firmName = "";
        effectiveDate = "";
    }

    public ContactName getContactName() {
        return contactName;
    }

    public void setContactName(ContactName contactName) {
        this.contactName = contactName;
    }

    public String getFirmName() {
        return firmName;
    }

    public void setFirmName(String firmName) {
        this.firmName = firmName;
    }

    public Firm getFirm() {
        return firm;
    }

    public void setFirm(Firm firm) {
        this.firm = firm;
    }

    public String getLsoKey() {
        return lsoKey;
    }

    public String getEffectiveDate() {
        return effectiveDate;
    }

    public void setEffectiveDate(String effectiveDate) {
        this.effectiveDate = effectiveDate;
    }

    public void setLsoKey(String lsoKey) {
        this.lsoKey = lsoKey;
    }

    public String getWorkPhoneExt() {
        return workPhoneExt;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public void setWorkPhoneExt(String workPhoneExt) {
        this.workPhoneExt = workPhoneExt;
    }

    public String getLSONumber() {
        return LSONumber;
    }

    public void setLSONumber(String LSONumber) {
        this.LSONumber = LSONumber;
    }

    public String getLSONumberPartial() {
        return UserUtil.getLSONumberPartial(LSONumber);
    }

    public String getPreferredMailingAddress() {
        return preferredMailingAddress;
    }

    public void setPreferredMailingAddress(String preferredMailingAddress) {
        this.preferredMailingAddress = preferredMailingAddress;
    }

    public String getHomePhone() {
        return homePhone;
    }

    public void setHomePhone(String homePhone) {
        this.homePhone = homePhone;
    }

    public String getWorkPhone() {
        return workPhone;
    }

    public void setWorkPhone(String workPhone) {
        this.workPhone = workPhone;
    }

    public String getAddlPhone() {
        return addlPhone;
    }

    public void setAddlPhone(String addlPhone) {
        this.addlPhone = addlPhone;
    }

    public String getFax() {
        return fax;
    }

    public void setFax(String fax) {
        this.fax = fax;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    private List<Contact> contacts;

    public List<Contact> getContacts() {
        return contacts;
    }

    public void setContacts(List<Contact> contacts) {
        this.contacts = contacts;
    }

    public String getFirmKey() {
        return firmKey;
    }

    public void setFirmKey(String firmKey) {
        this.firmKey = firmKey;
    }


}
