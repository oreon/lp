package lawpro.controllers;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.web.servlet.ModelAndView;

@RunWith(MockitoJUnitRunner.class)
public class ErrorControllerTests {

    @InjectMocks
    private ErrorController instance;

    @Test
    public void testError() {
        ModelAndView returnValue = instance.error();
        Assert.assertTrue(returnValue.getViewName().equals("error"));
    }

}
