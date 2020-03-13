package lawpro.controllers;

import lawpro.controllers.rest.FormRestController;
import lawpro.data.UserForm;
import lawpro.models.universe.response.*;
import lawpro.services.FirmService;
import lawpro.services.forms.*;
import lawpro.viewmodels.AddressFormViewModel;
import lawpro.viewmodels.NewApplicationFormViewModel;
import lawpro.viewmodels.UserDetails;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import static org.mockito.ArgumentMatchers.any;


@RunWith(MockitoJUnitRunner.class)
public class FormRestControllerTests {

    @InjectMocks
    private FormRestController instance;

    @Mock
    private FormSaveService formSaveService;

    @Mock
    private FormService formService;

    @Mock
    private FormValidationService formValidationService;

    @Mock
    private RequestService requestService;

    @Mock
    private FormSubmitService formSubmitService;

    @Mock
    private FormDetailsService formDetailsService;

    @Mock
    private FirmService firmService;

    @Mock
    private QuestionService questionService;
    //
//    @Test
//    public void testSaveExcessForm() {
//        NewExcessFormViewModel model = new NewExcessFormViewModel();
//        model.setLsoNumber("testLso");
//
//        UserForm userForm = new UserForm();
//        userForm.setUserName("testUsername");
//
//        Mockito.doNothing().when(formService).deleteSavedForms(model.getLsoNumber(), "NewExcessForm");
//
//        Mockito.when(formSaveService.saveExcessForm(model)).thenReturn(userForm);
//
//        UserForm returnValue = instance.save(model);
//
//        Mockito.verify(formService, Mockito.times(1)).deleteSavedForms(model.getLsoNumber(), "NewExcessForm");
//
//        Mockito.verify(formSaveService, Mockito.times(1)).saveExcessForm(model);
//
//        Assert.assertTrue(returnValue.getUserName().equals(userForm.getUserName()));
//    }


    @Test
    public void testValidateExcessForm() {
//        NewExcessFormViewModel model = new NewExcessFormViewModel();
////        model.setLsoNumber("testLso");
//
//        UserForm userForm = new UserForm();
//        userForm.setUserName("testUsername");
//
//        NewExcessFormRequest request = new NewExcessFormRequest();
//
//        NewExcessFormResponse response = new NewExcessFormResponse();
//        response.setError(true);
//
//        Mockito.when(formSaveService.saveExcessForm(model)).thenReturn(null);
//
//        Mockito.when(requestService.formatExcessFormRequest(model, "")).thenReturn(request);
//
//        Mockito.when(formValidationService.validateExcessForm(request)).thenReturn(response);
//
//        NewExcessFormResponse returnValue = instance.validateExcessForm(model);
//
//        Mockito.verify(formSaveService, Mockito.times(1)).saveExcessForm(model);
//
//        Mockito.verify(requestService, Mockito.times(1)).formatExcessFormRequest(model, "");
//
//        Mockito.verify(formValidationService, Mockito.times(1)).validateExcessForm(request);
//
//        Assert.assertTrue(returnValue.isError());
    }

    @Test
    public void testSubmitAddress() {
        AddressFormViewModel model = new AddressFormViewModel();
        model.setLSONumber("testLso");

        UserForm userForm = new UserForm();
        userForm.setUserName("testUsername");

        AddressFormResponse response = new AddressFormResponse();
        response.setError(true);

        Mockito.doNothing().when(formService).deleteSavedForms(model.getLSONumber(), "AddressForm");

        Mockito.when(formSaveService.saveAddressForm(model)).thenReturn(userForm);

        Mockito.when(formSubmitService.submitAddress(model)).thenReturn(response);


        Mockito.verify(formService, Mockito.times(1)).deleteSavedForms(model.getLSONumber(), "AddressForm");

        Mockito.verify(formSaveService, Mockito.times(1)).saveAddressForm(model);

        Mockito.verify(formSubmitService, Mockito.times(1)).submitAddress(model);

    }

    @Test
    public void testSubmitNewApplication() {
        NewApplicationFormResponse response = new NewApplicationFormResponse();
        response.setError(true);

        NewApplicationFormViewModel model = new NewApplicationFormViewModel();
        model.setLSONumber("testLso");

        Mockito.when(formSubmitService.submit(model, "")).thenReturn(response);

        NewApplicationFormResponse returnValue = instance.submitNewApplication(model);

        Mockito.verify(formSubmitService, Mockito.times(1)).submit(model, "");

        Assert.assertTrue(returnValue.isError());
    }

    @Test
    public void testGetNewApplicationFormDetails() {
        NewApplicationFormViewModel model = new NewApplicationFormViewModel();
        model.setLSONumber("testLso");

        UserDetails userDetails = new UserDetails();
        userDetails.setFormName("testFormName");

        Mockito.when(formDetailsService.getNewApplicationDetails(userDetails)).thenReturn(model);

        NewApplicationFormViewModel returnValue = instance.getNewApplicationFormDetails(userDetails);

        Mockito.verify(formDetailsService, Mockito.times(1)).getNewApplicationDetails(userDetails);

        Assert.assertTrue(returnValue.getLSONumber().equals(model.getLSONumber()));
    }

    @Test
    public void testGetNewExcessFormDetails() {
//        NewExcessFormViewModel model = new NewExcessFormViewModel();
//        model.setLsoNumber("testLso");
//
//        UserDetails userDetails = new UserDetails();
//        userDetails.setFormName("testFormName");
//
//        Mockito.when(formDetailsService.getExcessFormDetails(userDetails)).thenReturn(model);
//
//        NewExcessFormViewModel returnValue = instance.getNewExcessFormDetails(userDetails);
//
//        Mockito.verify(formDetailsService, Mockito.times(1)).getExcessFormDetails(userDetails);
//
//        Assert.assertTrue(returnValue.getLsoNumber().equals(model.getLsoNumber()));
    }

    @Test
    public void testFirmSearch() {
        FirmSearchResponse response = new FirmSearchResponse();
        response.setError(true);

        Mockito.when(firmService.searchFirm("testTerm", "testFirmNumber")).thenReturn(response);

        FirmSearchResponse returnValue = instance.firmSearch("testTerm", "testFirmNumber");

        Mockito.verify(firmService, Mockito.times(1)).searchFirm("testTerm", "testFirmNumber");

        Assert.assertTrue(returnValue.isError());
    }

    @Test
    public void testFirmDetails() throws Exception {
        FirmResponse response = new FirmResponse();
        response.setError(true);

        Mockito.when(firmService.getFirmDetails("testNumber")).thenReturn(response);

        FirmResponse returnValue = instance.firmDetails("testNumber");

        Mockito.verify(firmService, Mockito.times(1)).getFirmDetails("testNumber");

        Assert.assertTrue(returnValue.isError());
    }

    @Test
    public void testUpdateQuestionText() {
        Mockito.when(questionService.updateQuestionText("testId", "testText")).thenReturn(true);
        Assert.assertTrue(instance.updateQuestionText("testId", "testText"));
        Mockito.verify(questionService, Mockito.times(1)).updateQuestionText("testId", "testText");
    }

    @Test
    public void testUpdateQuestionInstructions() {
        Mockito.when(questionService.updateQuestionInstructions("testId", "testText")).thenReturn(true);
        Assert.assertTrue(instance.updateQuestionInstructions("testId", "testText"));
        Mockito.verify(questionService, Mockito.times(1)).updateQuestionInstructions("testId", "testText");
    }

    @Test
    public void testUpdateQuestionHelp() {
        Mockito.when(questionService.updateQuestionHelpText("testId", "testText")).thenReturn(true);
        Assert.assertTrue(instance.updateQuestionHelp("testId", "testText"));
        Mockito.verify(questionService, Mockito.times(1)).updateQuestionHelpText("testId", "testText");
    }








}
