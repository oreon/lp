package lawpro.controllers;

import lawpro.data.ErrorMessage;
import lawpro.services.errors.ErrorService;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;
import java.util.List;

@RunWith(MockitoJUnitRunner.class)
public class ErrorMessageControllerTests {

    @InjectMocks
    private ErrorMessageController instance;

    @Mock
    private ErrorService errorService;

    @Test
    public void testGetErrors() {

        ErrorMessage errorMessageOne = new ErrorMessage();
        errorMessageOne.setMessage("testMessageOne");

        ErrorMessage errorMessageTwo = new ErrorMessage();
        errorMessageTwo.setMessage("testMessageTwo");

        List<ErrorMessage> errorMessages = new ArrayList<>();
        errorMessages.add(errorMessageOne);
        errorMessages.add(errorMessageTwo);

        Mockito.when(errorService.getErrorMessages()).thenReturn(errorMessages);

        ModelAndView returnValue = instance.errors();

        Mockito.verify(errorService, Mockito.times(1)).getErrorMessages();

        List<ErrorMessage> returnList = (List<ErrorMessage>) returnValue.getModel().get("errors");
        Assert.assertTrue(returnList.size() == 2);
        Assert.assertTrue(returnValue.getViewName().equals("dashboard/errors"));

    }

    @Test
    public void testAdd() {
        ModelAndView returnValue = instance.add();
        Assert.assertTrue(returnValue.getViewName().equals("dashboard/errorAdd"));
    }

    @Test
    public void testEdit() {
        ErrorMessage errorMessage = new ErrorMessage();
        errorMessage.setMessage("testMessage");

        Mockito.when(errorService.getErrorMessageByID("testId")).thenReturn(errorMessage);

        ModelAndView returnValue = instance.edit("testId");

        Mockito.verify(errorService, Mockito.times(1)).getErrorMessageByID("testId");

        Assert.assertTrue(returnValue.getViewName().equals("dashboard/errorEdit"));

        Assert.assertTrue(returnValue.getModel().get("error") != null);
    }

    @Test
    public void testEditNull() {

        Mockito.when(errorService.getErrorMessageByID("testId")).thenReturn(null);

        ModelAndView returnValue = instance.edit("testId");

        Mockito.verify(errorService, Mockito.times(1)).getErrorMessageByID("testId");

        Assert.assertTrue(returnValue.getViewName().equals("redirect:/error"));

        Assert.assertTrue(returnValue.getModel().get("error") == null);
    }
}
