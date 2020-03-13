package lawpro.providers.forms;

import lawpro.providers.lookups.LookupProvider;
import lawpro.viewmodels.NewApplicationFormViewModel;
import lawpro.viewmodels.NewExcessFormViewModel;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;


import com.google.gson.Gson;
import lawpro.data.Form;
import lawpro.data.UserForm;
import lawpro.repository.IFormRepository;
import lawpro.repository.IUserFormRepository;
import lawpro.services.forms.RequestService;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RunWith(MockitoJUnitRunner.class)
public class FormProviderTests {

    @InjectMocks
    private FormProvider instance;

    @Mock
    private IFormRepository iFormRepository;

    @Mock
    private LookupProvider provider;

    @Mock
    private IUserFormRepository iUserFormRepository;

    @Mock
    private FormQuestionProvider questionProvider;

    @Mock
    private RequestService requestService;

    @Test
    public void testFindByUrl() {
        Form form = new Form();
        form.setUrl("testUrl");
        Optional<Form> optionalForm = Optional.of(form);

        Mockito.when(iFormRepository.findByUrl("testUrl")).thenReturn(optionalForm);

        Form returnForm = instance.findByUrl("testUrl");

        /* Verify that findByUrl() was called one time while taking in the correct url */
        Mockito.verify(iFormRepository, Mockito.times(1)).findByUrl("testUrl");

        /* Verify that form being returned by findByUrl() is form returned by method being tested */
        Assert.assertTrue(returnForm.getUrl().equals(form.getUrl()));
    }

    @Test
    public void testFormList() {
        Form formOne = new Form();
        formOne.setId("testIdOne");
        Form formTwo = new Form();
        formTwo.setId("testIdTwo");
        List<Form> formList = new ArrayList<>();
        formList.add(formOne);
        formList.add(formTwo);

        Mockito.when(iFormRepository.findAll()).thenReturn(formList);

        List<Form> returnList = instance.formList();

        /* Verify findAll() was called one time */
        Mockito.verify(iFormRepository, Mockito.times(1)).findAll();

        /* Verify that list returned both forms */
        Assert.assertTrue(returnList.size() == 2);

        /* Verify that Form list returned by findAll() is Form list being returned by method being tested */
        Assert.assertTrue(returnList.get(0).getId().equals(formOne.getId()));

        /* Verify that Form list returned by findAll() is Form list being returned by method being tested */
        Assert.assertTrue(returnList.get(1).getId().equals(formTwo.getId()));
    }

    @Test
    public void testGetSavedFormExcessForm() {
        Gson gson = new Gson();
        NewExcessFormViewModel excessForm = new NewExcessFormViewModel();
        UserForm formOne = new UserForm();
        formOne.setFormName("newapplicationform");
        formOne.setId("testIdOne");
        formOne.setFormData(gson.toJson(new NewExcessFormViewModel()));
        UserForm formTwo = new UserForm();
        formTwo.setFormName("newexcessform");
        formTwo.setId("testIdTwo");
       // excessForm.setNameOnAccount("testNameOnAccount");
        formTwo.setFormData(gson.toJson(excessForm));
        List<UserForm> userFormList = new ArrayList<>();
        userFormList.add(formOne);
        userFormList.add(formTwo);

        Mockito.when(iUserFormRepository.findByUserName("testUsername")).thenReturn(userFormList);

        NewExcessFormViewModel returnExcessForm = (NewExcessFormViewModel) instance.getSavedForm("testUsername", "newexcessform");

        Mockito.verify(iUserFormRepository, Mockito.times(1)).findByUserName("testUsername");

       // Assert.assertTrue(returnExcessForm.getNameOnAccount().equals(excessForm.getNameOnAccount()));
    }

    @Test
    public void testGetSavdFormNewApplicationForm() {
        Gson gson = new Gson();
        NewApplicationFormViewModel newAppForm = new NewApplicationFormViewModel();
        UserForm formOne = new UserForm();
        formOne.setFormName("excessform");
        formOne.setId("testIdOne");
        formOne.setFormData(gson.toJson(new NewApplicationFormViewModel()));
        UserForm formTwo = new UserForm();
        formTwo.setFormName("newapplicationform");
        formTwo.setId("testIdTwo");
        newAppForm.setNameOnAccount("testNameOnAccount");
        formTwo.setFormData(gson.toJson(newAppForm));
        List<UserForm> userFormList = new ArrayList<>();
        userFormList.add(formOne);
        userFormList.add(formTwo);

        Mockito.when(iUserFormRepository.findByUserName("testUsername")).thenReturn(userFormList);

        NewApplicationFormViewModel returnForm = (NewApplicationFormViewModel) instance.getSavedForm("testUsername", "newapplicationform");

        Mockito.verify(iUserFormRepository, Mockito.times(1)).findByUserName("testUsername");

        Assert.assertTrue(returnForm.getNameOnAccount().equals(newAppForm.getNameOnAccount()));
    }

    @Test
    public void testGetFormByOldId() {
        Form formOne = new Form();
        formOne.setOldId("testOldIdOne");
        Form formTwo = new Form();
        formTwo.setOldId("testOldIdTwo");
        List<Form> forms = new ArrayList<>();
        forms.add(formOne);
        forms.add(formTwo);

        Mockito.when(iFormRepository.findAll()).thenReturn(forms);

        Form returnForm = instance.getFormByOldId("testOldIdTwo");

        Mockito.verify(iFormRepository, Mockito.times(1)).findAll();

        Assert.assertTrue(returnForm.getOldId().equals(formTwo.getOldId()));
    }

}

