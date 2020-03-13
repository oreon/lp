package lawpro.services.forms;


import lawpro.data.Form;
import lawpro.data.UserForm;
import lawpro.models.universe.request.NewApplicationFormRequest;
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

import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;

@RunWith(MockitoJUnitRunner.class)
public class FormServiceTests {

    @InjectMocks
    private FormService instance;

    @Mock
    private FormProvider formProvider;

    @Mock
    private IUserFormRepository iUserFormRepository;

    @Test
    public void testGetFormByUrl() {
        Form form = new Form();
        form.setOldId("testOldId");

        Mockito.when(formProvider.findByUrl("testUrl")).thenReturn(form);

        Form returnForm = instance.getFormByUrl("testUrl");

        Mockito.verify(formProvider, Mockito.times(1)).findByUrl("testUrl");

        Assert.assertTrue(returnForm.getOldId().equals(form.getOldId()));
    }

    @Test
    public void testGetFormList() {
        Form form = new Form();
        form.setOldId("testOldId");
        List<Form> forms = new ArrayList<>();
        forms.add(form);

        Mockito.when(formProvider.formList()).thenReturn(forms);

        List<Form> returnValue = instance.getFormList();

        Mockito.verify(formProvider, Mockito.times(1)).formList();

        Assert.assertTrue(returnValue.get(0).getOldId().equals(forms.get(0).getOldId()));
    }

    @Test
    public void testDeleteSavedForms() {
        UserForm userFormOne = new UserForm();
        userFormOne.setFormName("testFormName");
        UserForm userFormTwo = new UserForm();
        userFormTwo.setFormName("testFormName");

        List<UserForm> userForms = new ArrayList<>();
        userForms.add(userFormOne);
        userForms.add(userFormTwo);

        Mockito.when(iUserFormRepository.findByUserName("testUsername")).thenReturn(userForms);

        Mockito.doNothing().when(iUserFormRepository).delete(any());

        instance.deleteSavedForms("testUsername", "testFormName");

        Mockito.verify(iUserFormRepository, Mockito.times(2)).delete(any());
    }

    @Test
    public void testAddNotificationToUser() {
        NewApplicationFormViewModel newApplicationForm = new NewApplicationFormViewModel();
        newApplicationForm.setFirstName("testFirstName");
        newApplicationForm.setLastName("testLastName");
        newApplicationForm.setEmail("testEmail");

        NewApplicationFormRequest request = new NewApplicationFormRequest();

        NewApplicationFormRequest returnValue = instance.addNotificationToUser(newApplicationForm, request);

        Assert.assertTrue(returnValue.getNotifications().get(0).getFirstName().equals(newApplicationForm.getFirstName()));
    }

}

