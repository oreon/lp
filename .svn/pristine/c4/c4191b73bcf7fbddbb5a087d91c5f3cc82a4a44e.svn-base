package lawpro.controllers;

import lawpro.services.errors.ErrorService;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

@RunWith(MockitoJUnitRunner.class)
public class ServiceControllerTests {

    @InjectMocks
    private ServiceController instance;

    @Mock
    private ErrorService errorService;

    @Test
    public void testErrorMessages() {
        Mockito.when(errorService.getNewErrorMessageCount()).thenReturn(1L);
        long returnValue = instance.errorMessages(null);
        Mockito.verify(errorService, Mockito.times(1)).getNewErrorMessageCount();
        Assert.assertTrue(returnValue == 1L);

    }

}
