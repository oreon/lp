package lawpro.services.forms;


import lawpro.providers.forms.FormProvider;
import lawpro.viewmodels.NewApplicationFormViewModel;
import lawpro.viewmodels.NewExcessFormViewModel;
import lawpro.viewmodels.UserDetails;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

@RunWith(MockitoJUnitRunner.class)
public class FormDetailsServiceTests {

    @InjectMocks
    private FormDetailsService instance;

    @Mock
    private FormProvider formProvider;

    @Test
    public void testGetNewExcessDetails() {
        UserDetails userDetails = new UserDetails();
        userDetails.setUserName("testUsername");
        userDetails.setFormName("testFormName");

        NewExcessFormViewModel excessForm = new NewExcessFormViewModel();
        excessForm.setAccountNumber("testAccount");
        Mockito.when(formProvider.getSavedForm(userDetails.getUserName(), userDetails.getFormName())).thenReturn(excessForm);

        NewExcessFormViewModel returnForm = instance.getExcessFormDetails(userDetails);

        /* Verify that getSavedForm() was called one time with the provided values */
        Mockito.verify(formProvider, Mockito.times(1)).getSavedForm(userDetails.getUserName(), userDetails.getFormName());

        /* Verify that value returned from getSavedForm() is value returned by method being tested */
        Assert.assertTrue(returnForm.getAccountNumber().equals(excessForm.getAccountNumber()));
    }

    @Test
    public void testGetNewApplicationDetails() {
        UserDetails userDetails = new UserDetails();
        userDetails.setUserName("testUsername");
        userDetails.setFormName("testFormName");

        NewApplicationFormViewModel newApplicationForm = new NewApplicationFormViewModel();
        newApplicationForm.setAccountNumber("testAccountNumber");

        Mockito.when(formProvider.getSavedForm(userDetails.getUserName(),
                userDetails.getFormName())).thenReturn(newApplicationForm);

        NewApplicationFormViewModel returnForm = instance.getNewApplicationDetails(userDetails);

        /* Verify that getSavedForm() was called one time with the provided values */
        Mockito.verify(formProvider, Mockito.times(1)).getSavedForm(userDetails.getUserName(), userDetails.getFormName());

        /* Verify that value returned by getSavedForm() is value returned by method being tested */
        Assert.assertTrue(returnForm.getAccountNumber().equals(newApplicationForm.getAccountNumber()));
    }

}

