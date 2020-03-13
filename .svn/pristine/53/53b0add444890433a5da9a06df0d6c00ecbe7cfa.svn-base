package lawpro.controllers;

import lawpro.services.AdminService;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.security.core.Authentication;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.servlet.ModelAndView;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@RunWith(MockitoJUnitRunner.class)
public class AccountControllerTests {

    @InjectMocks
    private AccountController instance;

    @Mock
    private AdminService adminService;

    @Mock
    private Principal principal;

    @Mock
    private Authentication authentication;

    @Test
    public void testMyAccount() {
        Mockito.when(principal.getName()).thenReturn("testName");

        ModelAndView returnValue = instance.myAccount(principal);

        Assert.assertTrue(returnValue.getModel().get("username").equals("testName"));
        Assert.assertTrue(returnValue.getModel().get("changePassword") != null);
        Assert.assertTrue(returnValue.getViewName().equals("myaccount"));
    }


}
