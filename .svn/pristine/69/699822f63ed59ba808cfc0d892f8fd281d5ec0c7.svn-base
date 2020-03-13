package lawpro.models.universe;

import java.util.ArrayList;
import java.util.List;

public class Firm {
    private String firmNumber;
    private String name;
    private Address address;
    private String phoneNumber;
    private String faxNumber;
    private String email;
    private String website;
    private FirmContact managingLawyer;
    private FirmContact officeManager;
    private FirmContact claimAdmin;
    private FirmContact cpdContact;
    private String nop;
    private List<Contact> contacts;
    private boolean canEdit;
    private String effectiveDate;

    public Firm()
    {
        this.managingLawyer = new FirmContact();
        this.officeManager = new FirmContact();
        this.claimAdmin = new FirmContact();
        this.cpdContact = new FirmContact();
        this.contacts = new ArrayList<Contact>();
        this.address = new Address();
    }

    public String getEffectiveDate() {
        return effectiveDate;
    }

    public void setEffectiveDate(String effectiveDate) {
        this.effectiveDate = effectiveDate;
    }

    public boolean isCanEdit() {
        return canEdit;
    }

    public void setCanEdit(boolean canEdit) {
        this.canEdit = canEdit;
    }

    public String getFirmNumber() {
        return firmNumber;
    }

    public void setFirmNumber(String firmNumber) {
        this.firmNumber = firmNumber;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhoneNumber() {
        if (getContacts() != null && getContacts().stream().anyMatch(x -> x.getContactType().equals("PHONE")))
        {
            Contact contact = getContacts().stream().filter(x -> x.getContactType().equals("PHONE")).findFirst().orElse(null);
            if (contact != null)
                phoneNumber = contact.getValue();
        }

        return phoneNumber;
    }

    public String getFaxNumber() {
        if (getContacts() != null && getContacts().stream().anyMatch(x -> x.getContactType().equals("FAX")))
        {
            Contact contact = getContacts().stream().filter(x -> x.getContactType().equals("FAX")).findFirst().orElse(null);
            if (contact != null)
                faxNumber = contact.getValue();
        }

        return faxNumber;
    }

    public String getEmail() {
        if (getContacts() != null && getContacts().stream().anyMatch(x -> x.getContactType().equals("EMAIL")))
        {
            Contact contact = getContacts().stream().filter(x -> x.getContactType().equals("EMAIL")).findFirst().orElse(null);
            if (contact != null)
                email = contact.getValue();
        }

        return email;
    }

    public String getWebsite() {
        if (getContacts() != null && getContacts().stream().anyMatch(x -> x.getContactType().equals("WEB_SITE")))
        {
            Contact contact = getContacts().stream().filter(x -> x.getContactType().equals("WEB_SITE")).findFirst().orElse(null);
            if (contact != null)
                website = contact.getValue();
        }

        return website;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public String getNop() {
        return nop;
    }

    public void setNop(String nop) {
        this.nop = nop;
    }

    public List<Contact> getContacts() {
        return contacts;
    }

    public void setContacts(List<Contact> contacts) {
        this.contacts = contacts;
    }

    public FirmContact getManagingLawyer() {
        return managingLawyer;
    }

    public void setManagingLawyer(FirmContact managingLawyer) {
        this.managingLawyer = managingLawyer;
    }

    public FirmContact getOfficeManager() {
        return officeManager;
    }

    public void setOfficeManager(FirmContact officeManager) {
        this.officeManager = officeManager;
    }

    public FirmContact getClaimAdmin() {
        return claimAdmin;
    }

    public void setClaimAdmin(FirmContact claimAdmin) {
        this.claimAdmin = claimAdmin;
    }

    public FirmContact getCpdContact() {
        return cpdContact;
    }

    public void setCpdContact(FirmContact cpdContact) {
        this.cpdContact = cpdContact;
    }
}
