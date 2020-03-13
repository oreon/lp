package lawpro.services.forms;

import lawpro.data.Form;
import lawpro.data.UserForm;
import lawpro.models.universe.Contact;
import lawpro.models.universe.Notification;
import lawpro.models.universe.request.NewApplicationFormRequest;
import lawpro.providers.forms.FormProvider;
import lawpro.repository.IFormRepository;
import lawpro.repository.IUserFormRepository;
import lawpro.viewmodels.NewApplicationFormViewModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FormService {

    @Autowired
    private FormProvider formProvider;

    @Autowired
    private IUserFormRepository iUserFormRepository;

    @Autowired
    private IFormRepository iFormRepository;

    public void deleteSavedForms(String userName, String formName) {
        List<UserForm> userForms = iUserFormRepository.findByUserName(userName);
        List<UserForm> savedForms = userForms.stream().filter(x -> x.getFormName().equals(formName)).collect(Collectors.toList());

        for (UserForm form : savedForms) {
            iUserFormRepository.delete(form);
        }
    }

    public List<Form> getFormList() {
        return formProvider.formList();
    }

    public Form getFormByUrl(String url) {
        return formProvider.findByUrl(url);
    }

    public NewApplicationFormRequest addNotificationToUser(NewApplicationFormViewModel form, NewApplicationFormRequest request) {

        Notification notification = new Notification();
        notification.setFirstName(form.getFirstName());
        notification.setLastName(form.getLastName());
        notification.setType("confirmation");

        Contact contact = new Contact();
        contact.setContactType("EMAIL");
        contact.setValue(form.getEmail());
        notification.setContactInfo(contact);

        request.getNotifications().add(notification);

        return request;
    }

    public void createForm(Form form)
    {
        iFormRepository.save(form);
    }



}
