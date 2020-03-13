package lawpro.services.forms;

import com.google.gson.Gson;
import lawpro.data.UserForm;
import lawpro.providers.forms.FormProvider;
import lawpro.repository.IUserFormRepository;
import lawpro.viewmodels.AddressFormViewModel;
import lawpro.viewmodels.FirmFormViewModel;
import lawpro.viewmodels.NewApplicationFormViewModel;
import lawpro.viewmodels.NewExcessFormViewModel;
import lawpro.viewmodels.irop.IropViewModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.UUID;

@Service
public class FormSaveService {

    @Autowired
    private FormProvider formProvider;

    @Autowired
    private IUserFormRepository userFormRepo;

    public UserForm saveAddressForm(AddressFormViewModel form)
    {
        Gson gson = new Gson();
        UserForm userForm = new UserForm();
        userForm.setFormName("AddressForm");
        userForm.setUserName(form.getLSONumber());
        userForm.setFormData(gson.toJson(form));
        userForm.setId(UUID.randomUUID().toString());

        userForm = userFormRepo.save(userForm);

        return userForm;
    }

    public UserForm saveFirmForm(FirmFormViewModel form)
    {
        Gson gson = new Gson();
        UserForm userForm = new UserForm();
        userForm.setFormName("FirmForm");
        userForm.setUserName(form.getFirmName());
        userForm.setFormData(gson.toJson(form));
        userForm.setId(UUID.randomUUID().toString());

        userForm = userFormRepo.save(userForm);

        return userForm;
    }

    public UserForm saveExcessForm(NewExcessFormViewModel form) {

        Gson gson = new Gson();
        UserForm userForm = new UserForm();
        userForm.setFormName("NewExcessForm");
        userForm.setUserName(form.getUserId());
        userForm.setFormData(gson.toJson(form));
        userForm.setLastModified(new Date().toString());

        userForm.setId(UUID.randomUUID().toString());
        userForm = userFormRepo.save(userForm);

        return userForm;
    }

    public UserForm saveNewApplicationForm(NewApplicationFormViewModel form) {

        //TODO: Validate data
        Gson gson = new Gson();
        UserForm userForm = new UserForm();
        userForm.setFormName("NewApplicationForm");
        userForm.setUserName(form.getLSONumber());
        userForm.setFormData(gson.toJson(form));
        userForm.setLastModified(new Date().toString());

        userForm.setId(UUID.randomUUID().toString());
        userForm = userFormRepo.save(userForm);

        return userForm;
    }

    public UserForm saveIropForm(IropViewModel form) {

        Gson gson = new Gson();
        UserForm userForm = new UserForm();
        userForm.setFormName("IropForm");
        userForm.setUserName(form.getUserId());
        userForm.setFormData(gson.toJson(form));
        userForm.setLastModified(new Date().toString());

        userForm.setId(UUID.randomUUID().toString());
        userForm = userFormRepo.save(userForm);

        return userForm;
    }

}
