package lawpro.services.forms;

import com.google.gson.Gson;
import lawpro.data.UserForm;
import lawpro.repository.IUserFormRepository;
import lawpro.viewmodels.irop.IropAddressViewModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AddressSaveService {

    @Autowired
    private IUserFormRepository userFormRepository;

    public UserForm saveAddressIrop(IropAddressViewModel model) {
        Gson gson = new Gson();
        UserForm userForm = new UserForm();
        userForm.setFormName("AddressForm");
        userForm.setUserName(model.getLSONumber());
        userForm.setFormData(gson.toJson(model));
        userForm.setId(UUID.randomUUID().toString());

        userForm = userFormRepository.save(userForm);

        return userForm;
    }



}
