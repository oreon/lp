package lawpro.services.forms;

import com.google.gson.Gson;
import lawpro.data.UserForm;
import lawpro.viewmodels.AddressFormViewModel;
import lawpro.viewmodels.NewExcessFormViewModel;
import lawpro.providers.forms.FormProvider;
import lawpro.repository.IUserFormRepository;
import lawpro.viewmodels.NewApplicationFormViewModel;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import static org.mockito.ArgumentMatchers.any;

@RunWith(MockitoJUnitRunner.class)
public class FormSaveServiceTests {

    @InjectMocks
    private FormSaveService instance;

    @Mock
    private IUserFormRepository iUserFormRepository;

    @Mock
    private FormProvider formProvider;


    @Test
    public void testSaveExcessForm(){
        Gson gson = new Gson();
        NewExcessFormViewModel newExcessForm = new NewExcessFormViewModel();
       newExcessForm.setAccountNumber("testAccount");

        UserForm userForm = new UserForm();
        userForm.setFormData(gson.toJson(newExcessForm));

        Mockito.when(iUserFormRepository.save(any(UserForm.class))).thenReturn(userForm);

        UserForm finalReturn = instance.saveExcessForm(newExcessForm);

        /* Verify save() was called one time */
        Mockito.verify(iUserFormRepository, Mockito.times(1)).save(any(UserForm.class));

        /* Verify that value returned from controller is the value return from saveExcessform() */
        Assert.assertTrue(finalReturn.getFormData().equals(userForm.getFormData()));
    }

    @Test
    public void testSaveNewApplicationForm(){
        Gson gson = new Gson();
        NewApplicationFormViewModel newApplicationForm = new NewApplicationFormViewModel();
        newApplicationForm.setLSONumber("1234");

        UserForm userForm = new UserForm();
        userForm.setFormData(gson.toJson(newApplicationForm));

        Mockito.when(iUserFormRepository.save(any(UserForm.class))).thenReturn(userForm);

        UserForm finalReturn = instance.saveNewApplicationForm(newApplicationForm);

        /* Verify insert() was called one time */
        Mockito.verify(iUserFormRepository, Mockito.times(1)).save(any(UserForm.class));

        /* Verify that value returned from controller is the value return from saveExcessform() */
        Assert.assertTrue(finalReturn.getFormData().equals(userForm.getFormData()));

    }

    @Test
    public void testSaveAddress() {
        Gson gson = new Gson();
        AddressFormViewModel addressFormViewModel = new AddressFormViewModel();
        addressFormViewModel.setCity("Toronto");

        UserForm userForm = new UserForm();
        userForm.setFormName("testFormName");
        userForm.setFormData(gson.toJson(addressFormViewModel));

        Mockito.when(iUserFormRepository.save(any(UserForm.class))).thenReturn(userForm);

        UserForm returnValue = instance.saveAddressForm(addressFormViewModel);

        Mockito.verify(iUserFormRepository, Mockito.times(1)).save(any(UserForm.class));

        Assert.assertTrue(returnValue.getFormName().equals(userForm.getFormName()));
   }

}
