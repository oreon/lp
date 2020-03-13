package lawpro.models.universe.request;

import common.models.RequestModel;
import lawpro.models.universe.AddressForm;
import lawpro.models.universe.MemberContact;
import lawpro.models.universe.NewApplicationForm;
import lawpro.models.universe.Notification;
import lawpro.models.universe.response.UserResponse;

import java.util.ArrayList;
import java.util.List;

public class NewApplicationFormRequest extends RequestModel {
    private NewApplicationForm form;
    private List<Notification> notifications;
    public MemberContact memberContact;

    public NewApplicationFormRequest()
    {
        notifications = new ArrayList<>();
    }

    public NewApplicationForm getForm() {
        return form;
    }

    public void setForm(NewApplicationForm form) {
        this.form = form;
    }

    public List<Notification> getNotifications() {
        return notifications;
    }

    public void setNotifications(List<Notification> notifications) {
        this.notifications = notifications;
    }

    public MemberContact getMemberContact() {
        return memberContact;
    }

    public void setMemberContact(MemberContact memberContact) {
        this.memberContact = memberContact;
    }
}