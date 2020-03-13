package lawpro.controllers;

import common.models.RequestModel;
import lawpro.controllers.rest.ErrorMessageRestController;
import lawpro.data.ErrorMessage;
import lawpro.models.ErrorModel;
import lawpro.services.errors.ErrorService;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

@RunWith(MockitoJUnitRunner.class)
public class ErrorMessageRestControllerTests {

    @InjectMocks
    private ErrorMessageRestController instance;

    @Mock
    private ErrorService errorService;

    @Test
    public void testAdd() {
        ErrorMessage errorMessage = new ErrorMessage();
        errorMessage.setMessage("testMessage");
        ErrorModel errorModel = new ErrorModel();
        errorModel.setMessage("testMessage");
        Mockito.when(errorService.addError(errorModel)).thenReturn(errorMessage);
        ErrorMessage returnValue = instance.add(errorModel);

        Mockito.verify(errorService, Mockito.times(1)).addError(errorModel);
        Assert.assertTrue(returnValue.getMessage().equals(errorMessage.getMessage()));
    }

    @Test
    public void testEdit() {
        ErrorMessage errorMessage = new ErrorMessage();
        errorMessage.setMessage("testMessage");
        ErrorModel errorModel = new ErrorModel();
        errorModel.setMessage("testMessage");
        Mockito.when(errorService.editError(errorModel)).thenReturn(errorMessage);
        ErrorMessage returnValue = instance.edit(errorModel);

        Mockito.verify(errorService, Mockito.times(1)).editError(errorModel);
        Assert.assertTrue(returnValue.getMessage().equals(errorMessage.getMessage()));
    }

    @Test
    public void testDeleteError() {
        RequestModel requestModel = new RequestModel();
        requestModel.setId("testId");

        Mockito.when(errorService.deleteError(requestModel)).thenReturn(true);

        Assert.assertTrue(instance.delete(requestModel));

        Mockito.verify(errorService, Mockito.times(1)).deleteError(requestModel);
    }
}
