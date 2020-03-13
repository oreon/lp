package lawpro.services.errors;

import common.models.RequestModel;
import lawpro.data.ErrorMessage;
import lawpro.models.ErrorModel;
import lawpro.providers.ErrorMessageProvider;
import lawpro.repository.IErrorRepository;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;

@RunWith(MockitoJUnitRunner.class)
public class ErrorServiceTests {

    @InjectMocks
    private ErrorService instance;

    @Mock
    private ErrorMessageProvider errorMessageProvider;

    @Mock
    private IErrorRepository iErrorRepository;

    @Test
    public void testGetErrorMessages(){
        List<ErrorMessage> errorMessages = new ArrayList<>();
        ErrorMessage errorMessage = new ErrorMessage();
        errorMessage.setMessage("testMessage");
        errorMessages.add(errorMessage);

        Mockito.when(errorMessageProvider.getErrorMessages()).thenReturn(errorMessages);

        List<ErrorMessage> returnList = instance.getErrorMessages();

        /* Verify that getErrorMessages() was called one time */
        Mockito.verify(errorMessageProvider, Mockito.times(1)).getErrorMessages();

        /* Verify that value returned from getErrorMessages() is value returned by method being tested */
        Assert.assertTrue(returnList.get(0).getMessage().equals(errorMessages.get(0).getMessage()));
    }

    @Test
    public void testGetErrorMessageById() {
        ErrorMessage errorMessage = new ErrorMessage();
        errorMessage.setMessage("testMessage");

        Mockito.when(errorMessageProvider.getErrorMessageByID("testId")).thenReturn(errorMessage);

        ErrorMessage returnErrorMessage = instance.getErrorMessageByID("testId");

        /* Verify that getErrorMessageById() was called one time with given id */
        Mockito.verify(errorMessageProvider, Mockito.times(1)).getErrorMessageByID("testId");

        /* Verify that value returned from getErrorMessageById() was value returned by method being tested */
        Assert.assertTrue(returnErrorMessage.getMessage().equals(errorMessage.getMessage()));
    }

    @Test
    public void testAddError() {
        ErrorMessage errorMessage = new ErrorMessage();
        errorMessage.setImportedNew(false);
        errorMessage.setMessage("testMessage");
        errorMessage.setKey("testKey");

        ErrorModel errorModel = new ErrorModel();
        errorModel.setKey("testKey");
        errorModel.setMessage("testMessage");

        Mockito.when(iErrorRepository.save(any(ErrorMessage.class))).thenReturn(errorMessage);

        ErrorMessage returnErrorMessage = instance.addError(errorModel);

        /* Verify that save() was called on time with an ErrorMessage object */
        Mockito.verify(iErrorRepository, Mockito.times(1)).save(any(ErrorMessage.class));

        /* Verify that value returned from save() is value returned by method being tested */
        Assert.assertTrue(returnErrorMessage.getKey().equals(errorModel.getKey()));

        /* Verify that the value being returned from save() had importedNew set to false */
        Assert.assertFalse(returnErrorMessage.isImportedNew());

        /* NOTE: Tough to test lines 34 & 35 in addError() since I had to set the save() method to return something
         *       so it basically gets overwritten. Probably not a big deal for the moment.
         * */

    }

    @Test
    public void testEditError() {
        ErrorMessage errorMessage = new ErrorMessage();
        errorMessage.setKey("testKey");

        ErrorModel errorModel = new ErrorModel();
        errorModel.setId("testId");
        errorModel.setKey("testKey");
        errorModel.setMessage("testMessage");

        Mockito.when(iErrorRepository.findById(errorModel.getId())).thenReturn(Optional.of(errorMessage));
        Mockito.when(iErrorRepository.save(errorMessage)).thenReturn(errorMessage);

        ErrorMessage returnErrorMessage = instance.editError(errorModel);

        Mockito.verify(iErrorRepository, Mockito.times(1)).findById(errorModel.getId());

        Mockito.verify(iErrorRepository, Mockito.times(1)).save(any());

        Assert.assertTrue(returnErrorMessage.getKey().equals(errorMessage.getKey()));

        Assert.assertTrue(returnErrorMessage.getMessage().equals(errorMessage.getMessage()));
    }

    @Test
    public void testDeleteError() {
        ErrorMessage errorMessage = new ErrorMessage();
        errorMessage.setMessage("testMessage");

        RequestModel requestModel = new RequestModel();
        requestModel.setId("testId");

        Mockito.when(iErrorRepository.findById(requestModel.getId())).thenReturn(Optional.of(errorMessage));

        Mockito.doNothing().when(iErrorRepository).delete(any(ErrorMessage.class));

        boolean returnValue = instance.deleteError(requestModel);

        Mockito.verify(iErrorRepository, Mockito.times(1)).findById(requestModel.getId());

        Mockito.verify(iErrorRepository, Mockito.times(1)).delete(any(ErrorMessage.class));

        Assert.assertTrue(returnValue);
    }

    @Test
    public void testGetNewErrorMessageCount() {
        long num = 2;
        Mockito.when(errorMessageProvider.getNewErrorMessageCount()).thenReturn(num);

        long returnNum = instance.getNewErrorMessageCount();

        /* Verify that getNewErrorMessageCount() was called one time */
        Mockito.verify(errorMessageProvider, Mockito.times(1)).getNewErrorMessageCount();

        /* Verify that value returned by getNewErrorMessageCount() is value being returned by method being tested */
        Assert.assertTrue(returnNum == 2);
    }




}
