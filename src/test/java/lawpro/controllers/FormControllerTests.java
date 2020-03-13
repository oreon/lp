package lawpro.controllers;

import lawpro.services.forms.FormService;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

@RunWith(MockitoJUnitRunner.class)
public class FormControllerTests {

    @InjectMocks
    private FormController instance;

    @Mock
    private FormService formService;


    @Test
    public void test()
    {
        Assert.assertTrue(true);
    }

}
