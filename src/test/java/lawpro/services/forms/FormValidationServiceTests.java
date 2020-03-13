package lawpro.services.forms;

import lawpro.data.ErrorMessage;
import lawpro.models.universe.Violation;
import lawpro.models.universe.request.AddressFormRequest;
import lawpro.models.universe.request.NewApplicationFormRequest;
import lawpro.models.universe.response.AddressFormResponse;
import lawpro.models.universe.response.NewApplicationFormResponse;
import lawpro.models.universe.response.NewExcessFormResponse;
import lawpro.providers.ErrorMessageProvider;
import lawpro.providers.UniverseProvider;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import static org.mockito.ArgumentMatchers.any;


import java.util.ArrayList;
import java.util.List;

@RunWith(MockitoJUnitRunner.class)
public class FormValidationServiceTests {

    @InjectMocks
    private FormValidationService instance;

    @Mock
    private ErrorMessageProvider errorMessageProvider;

    @Mock
    private UniverseProvider universeProvider;

    @Test /* Test validateNewApplicationForm() with no violations returned */
    public void testValidateNewApplicationFormEmptyResponse() {
        NewApplicationFormResponse newApplicationFormResponse = new NewApplicationFormResponse();
        newApplicationFormResponse.setViolations(new ArrayList<>());
        newApplicationFormResponse.setConfirmation("testConfirmation");

        NewApplicationFormRequest request = new NewApplicationFormRequest();

        Mockito.when(universeProvider.validateNewApplicationForm(request)).thenReturn(newApplicationFormResponse);

        NewApplicationFormResponse response = instance.validateNewApplicationForm(request);

        /* Verify that validateNewExcessForm() was called one time */
        Mockito.verify(universeProvider, Mockito.times(1)).validateNewApplicationForm(request);

        /* Verify that response from validateNewExcessForm() was returned by method being tested */
        Assert.assertTrue(response.getConfirmation().equals(newApplicationFormResponse.getConfirmation()));

        /* Verify that violations is empty/error is set false and the code in the if statement was not invoked */
        Assert.assertTrue(!response.isError());

        Assert.assertTrue(response.getViolations().size() == 0);
    }

    @Test /* Test validateNewApplicationForm() with violations returned */
    public void testValidateNewApplicationFormWithViolations() {
        NewApplicationFormResponse newApplicationFormResponse = new NewApplicationFormResponse();

        newApplicationFormResponse.setViolations(getTestViolations());

        NewApplicationFormRequest request = new NewApplicationFormRequest();

        ErrorMessage errorMessageOne = new ErrorMessage();
        errorMessageOne.setMessage("testErrorMessageOne");
        ErrorMessage errorMessageTwo = new ErrorMessage();
        errorMessageTwo.setMessage("testErrorMessageTwo");

        Mockito.when(universeProvider.validateNewApplicationForm(request)).thenReturn(newApplicationFormResponse);

        Mockito.when(errorMessageProvider.getAndSetErrorMessage("testName0", "testMessage0")).thenReturn(errorMessageOne);

        Mockito.when(errorMessageProvider.getAndSetErrorMessage("testName1", "testMessage1")).thenReturn(errorMessageTwo);

        NewApplicationFormResponse finalResponse = instance.validateNewApplicationForm(request);

        /* Verify that validateNewExcessForm() was called one time, passing in the given response */
        Mockito.verify(universeProvider, Mockito.times(1)).validateNewApplicationForm(request);

        /* Verify getAndSetErrorMessage() was called once for first Violation */
        Mockito.verify(errorMessageProvider, Mockito.times(1)).getAndSetErrorMessage("testName0", "testMessage0");

        /* Verify getAndSetErrorMessage() was called once for second Violation */
        Mockito.verify(errorMessageProvider, Mockito.times(1)).getAndSetErrorMessage("testName1", "testMessage1");

        /* Verify that response from validateExcessForm() was returned by method being tested */
        Assert.assertTrue(finalResponse.getViolations().get(0).getMessage()
                .equals(newApplicationFormResponse.getViolations().get(0).getMessage()));

        /* Verify that violations isn't empty/error is set to true and the code in the if statement was invoked */
        Assert.assertTrue(finalResponse.isError());

        Assert.assertTrue(finalResponse.getViolations().size() == 2);
    }

    @Test
    public void testValidateAddressFormEmptyResponse() {
        AddressFormResponse addressFormResponse = new AddressFormResponse();
        addressFormResponse.setViolations(new ArrayList<>());
        addressFormResponse.setConfirmation("testConfirmation");

        AddressFormRequest request = new AddressFormRequest();

        Mockito.when(universeProvider.validateAddressForm(request)).thenReturn(addressFormResponse);

        AddressFormResponse response = instance.validateAddressForm(request);

        /* Verify that validateNewExcessForm() was called one time */
        Mockito.verify(universeProvider, Mockito.times(1)).validateAddressForm(request);

        /* Verify that response from validateNewExcessForm() was returned by method being tested */
        Assert.assertTrue(response.getConfirmation().equals(addressFormResponse.getConfirmation()));

        /* Verify that violations is empty/error is set false and the code in the if statement was not invoked */
        Assert.assertTrue(!response.isError());

        Assert.assertTrue(response.getViolations().size() == 0);
    }
//
//    @Test
//    public void testValidateAddressFormWithViolations() {
//        AddressFormResponse addressFormResponse = new AddressFormResponse();
//
//        addressFormResponse.setViolations(getTestViolations());
//
//        AddressFormRequest request = new AddressFormRequest();
//
//        ErrorMessage errorMessageOne = new ErrorMessage();
//        errorMessageOne.setMessage("testErrorMessageOne");
//        ErrorMessage errorMessageTwo = new ErrorMessage();
//        errorMessageTwo.setMessage("testErrorMessageTwo");
//
//        Mockito.when(universeProvider.validateAddressForm(request)).thenReturn(addressFormResponse);
//
//        Mockito.when(errorMessageProvider.getAndSetErrorMessage("testName0", "testMessage0")).thenReturn(errorMessageOne);
//
//        Mockito.when(errorMessageProvider.getAndSetErrorMessage("testName1", "testMessage1")).thenReturn(errorMessageTwo);
//
//        AddressFormResponse finalResponse = instance.validateAddressForm(request);
//
//        /* Verify that validateNewExcessForm() was called one time, passing in the given response */
//        Mockito.verify(universeProvider, Mockito.times(1)).validateAddressForm(request);
//
//        /* Verify getAndSetErrorMessage() was called once for first Violation */
//        Mockito.verify(errorMessageProvider, Mockito.times(1)).getAndSetErrorMessage("testName0", "testMessage0");
//
//        /* Verify getAndSetErrorMessage() was called once for second Violation */
//        Mockito.verify(errorMessageProvider, Mockito.times(1)).getAndSetErrorMessage("testName1", "testMessage1");
//
//        /* Verify that response from validateExcessForm() was returned by method being tested */
//        Assert.assertTrue(finalResponse.getViolations().get(0).getMessage()
//                .equals(addressFormResponse.getViolations().get(0).getMessage()));
//
//        /* Verify that violations isn't empty/error is set to true and the code in the if statement was invoked */
//        Assert.assertTrue(finalResponse.isError());
//
//        Assert.assertTrue(finalResponse.getViolations().size() == 2);
//    }
//
    public List<Violation> getTestViolations(){
        List<Violation> violations = new ArrayList<>();
        for(int i = 0; i < 2; i++) {
            Violation violation = new Violation();
            violation.setName("testName" + i);
            violation.setMessage("testMessage" + i);
            violations.add(violation);
        }
        return violations;
    }


}
