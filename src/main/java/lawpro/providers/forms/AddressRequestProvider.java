package lawpro.providers.forms;

import lawpro.models.universe.Address;
import lawpro.models.universe.AddressForm;
import lawpro.models.universe.Contact;
import lawpro.models.universe.ContactName;
import lawpro.models.universe.request.AddressFormRequest;
import lawpro.viewmodels.irop.IropAddressViewModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class AddressRequestProvider {

    private final Logger LOGGER = LoggerFactory.getLogger(AddressRequestProvider.class);


    public AddressFormRequest getIropAddressRequest(IropAddressViewModel model) {

        AddressFormRequest request = new AddressFormRequest();
        request.setForm(new AddressForm());
        request.getForm().setFirmKey("N/A");
        request.getForm().setFirmName("N/A");
        request.getForm().setLsoKey(model.getLSONumber());
        request.getForm().setPreferredMailingAddress("home");
        request.getForm().setEffectiveDate(model.getEffectiveDate());
        ContactName contactName = new ContactName();
        contactName.setFirstName(model.getFirstName());
        contactName.setLastName(model.getLastName());
        contactName.setTitle("");
        request.getForm().setContactName(contactName);

        Address address = new Address();
        address.setLine1(model.getMailingAddress1());
        address.setLine2(model.getMailingAddress2());
        address.setLine3(model.getMailingAddress3());
        address.setCity(model.getCity());
        address.setProvince(model.getProvince());
        address.setPostalCode(model.getPostalCode());

        List<Contact> contacts = new ArrayList<>();

        if (!model.getHomePhone().isEmpty()) {
            Contact contact = new Contact();
            contact.setContactType("PHONE");
            contact.setValue(model.getHomePhone());
            contacts.add(contact);
        }

        if (!model.getEmail().isEmpty()) {
            Contact contact = new Contact();
            contact.setContactType("EMAIL");
            contact.setValue(model.getEmail());
            request.getForm().setEmail(model.getEmail());
            contacts.add(contact);
        }

        request.getForm().setContacts(contacts);

        request.getForm().setAddress(address);

        return request;
    }




}
