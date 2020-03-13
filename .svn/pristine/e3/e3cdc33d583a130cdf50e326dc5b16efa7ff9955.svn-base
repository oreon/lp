package lawpro.controllers;

import lawpro.data.Admin;
import lawpro.providers.AdminProvider;
import lawpro.providers.InitProvider;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;
import java.util.List;

@RunWith(MockitoJUnitRunner.class)
public class HomeControllerTests {

    @InjectMocks
    private HomeController instance;

    @Mock
    private AdminProvider adminProvider;

    @Mock
    private InitProvider initProvider;

    @Test
    public void testHome() throws Exception{
        List<Admin> admins = new ArrayList<>();
        Admin admin = new Admin();
        admin.setActive(true);
        admins.add(admin);
        //Mockito.when(adminProvider.findAll()).thenReturn(admins);

        ModelAndView returnValue = instance.home();
        //Mockito.verify(adminProvider, Mockito.times(1)).findAll();
        Assert.assertTrue(returnValue.getViewName().equals("home"));
    }

    @Test
    public void testHomeNull() throws Exception{
        List<Admin> admins = new ArrayList<>();

        //Mockito.when(adminProvider.findAll()).thenReturn(admins);
        ModelAndView returnValue = instance.home();
        //Mockito.verify(adminProvider, Mockito.times(1)).findAll();
        Assert.assertTrue(returnValue.getViewName().equals("home"));
    }

    @Test
    public void testDashboard() {
        Assert.assertTrue(instance.dashboard().equals("/dashboard/index"));
    }

    @Test
    public void testFileOnline() {
        Assert.assertTrue(instance.fileOnline().equals("/fileonline"));
    }



}
