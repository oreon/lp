package lawpro.services.forms;

import lawpro.models.universe.NewApplicationForm;
import lawpro.models.universe.request.NewApplicationFormRequest;
import lawpro.providers.forms.RequestProvider;
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
public class RequestServiceTests {

    @InjectMocks
    private RequestService instance;

    @Mock
    private RequestProvider requestProvider;
//
//    @Test
//    public void testFormatExcessFormRequest() {
//
//        NewExcessFormViewModel paramNewExcessForm = new NewExcessFormViewModel();
//        ExcessForm excessForm = new ExcessForm();
//
//        NewExcessFormRequest request = new NewExcessFormRequest();
//        request.setForm(excessForm);
//
//        Mockito.when(requestProvider.getFormattedExcessFormRequest(any(), any())).thenReturn(request);
//
//        NewExcessFormRequest returnForm = instance.formatExcessFormRequest(paramNewExcessForm, "");
//
//        /* Verify formatExcessFormRequest() is called once */
//        Mockito.verify(requestProvider, Mockito.times(1)).getFormattedExcessFormRequest(paramNewExcessForm, "");
//        /* Verify value being returned from controller is value from formatExcessFormRequest() */
//    }

    @Test
    public void testFormatNewApplicationRequest() {

        NewApplicationFormViewModel paramNewApplicationForm = new NewApplicationFormViewModel();
        NewApplicationForm newApplicationForm = new NewApplicationForm();
        newApplicationForm.setComments("testComment");

        NewApplicationFormRequest request = new NewApplicationFormRequest();
        request.setForm(newApplicationForm);

        Mockito.when(requestProvider.getFormattedNewApplicationRequest(any(), any())).thenReturn(request);

        NewApplicationFormRequest returnForm = instance.formatNewApplicationRequest(paramNewApplicationForm, "");

        /* Verify formatExcessFormRequest() is called once */
        Mockito.verify(requestProvider, Mockito.times(1)).getFormattedNewApplicationRequest(paramNewApplicationForm, "");
        /* Verify value being returned from controller is value from formatExcessFormRequest() */
        Assert.assertTrue(returnForm.getForm().getComments().equals("testComment"));
    }

}
