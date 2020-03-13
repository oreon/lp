package lawpro.services.forms;

import lawpro.models.universe.request.AddressFormRequest;
import lawpro.models.universe.request.NewApplicationFormRequest;
import lawpro.models.universe.response.AddressFormResponse;
import lawpro.models.universe.response.NewApplicationFormResponse;
import lawpro.providers.forms.FormProvider;
import lawpro.providers.UniverseProvider;
import lawpro.viewmodels.AddressFormViewModel;
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
public class FormSubmitServiceTests {

    @InjectMocks
    private FormSubmitService instance;

    @Mock
    private RequestService requestService;

    @Mock
    private FormProvider formProvider;

    @Mock
    private UniverseProvider universeProvider;

    @Test
    public void testSubmit() {
        NewApplicationFormRequest request = new NewApplicationFormRequest();

        NewApplicationFormViewModel model = new NewApplicationFormViewModel();
        model.setAccountNumber("testAccountNumber");

        NewApplicationFormResponse response = new NewApplicationFormResponse();
        response.setError(true);

        Mockito.when(requestService.formatNewApplicationRequest(model, "testToken")).thenReturn(request);

        Mockito.when(universeProvider.submitForm(request)).thenReturn(response);

        NewApplicationFormResponse returnValue = instance.submit(model, "testToken");

        Mockito.verify(requestService, Mockito.times(1)).formatNewApplicationRequest(model, "testToken");

        Mockito.verify(universeProvider, Mockito.times(1)).submitForm(request);

        Assert.assertTrue(returnValue.isError());

    }

    @Test
    public void testSubmitAddress() {
        AddressFormViewModel model = new AddressFormViewModel();
        model.setCity("testCity");

        AddressFormRequest request = new AddressFormRequest();

        AddressFormResponse response = new AddressFormResponse();
        response.setError(true);

        Mockito.when(requestService.formatAddressFormRequest(model)).thenReturn(request);

        Mockito.when(universeProvider.submitAddressForm(request)).thenReturn(response);

        AddressFormResponse returnValue = instance.submitAddress(model);

        Mockito.verify(requestService, Mockito.times(1)).formatAddressFormRequest(model);

        Mockito.verify(universeProvider, Mockito.times(1)).submitAddressForm(request);

        Assert.assertTrue(returnValue.isError());
    }


}
