package lawpro.controllers;

import lawpro.data.Admin;
import lawpro.data.input.AddUser;
import lawpro.data.input.EditUser;
import lawpro.services.AdminService;
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
public class UsersControllerTests {

    @InjectMocks
    private UsersController instance;

    @Mock
    private AdminService adminService;

    @Test
    public void testUsers() {

        Admin adminOne = new Admin();
        adminOne.setEmail("testEmailOne");
        Admin adminTwo = new Admin();
        adminTwo.setEmail("testEmailTwo");

        List<Admin> admins = new ArrayList<>();
        admins.add(adminOne);
        admins.add(adminTwo);

        Mockito.when(adminService.getAdmins()).thenReturn(admins);

        ModelAndView returnValue = instance.users();

        Mockito.verify(adminService, Mockito.times(1)).getAdmins();

        Assert.assertTrue(returnValue.getModel().get("addUser") != null);

        Assert.assertTrue(returnValue.getModel().get("editUser") != null);

        Assert.assertTrue(returnValue.getModel().get("userActiveSwitch") != null);
        List<Admin> returnList = (List<Admin>) returnValue.getModel().get("adminUsers");

        Assert.assertTrue(returnList.size() == 2);
    }

    @Test
    public void testAddUser() {
        AddUser addUser = new AddUser();
        addUser.setUsername("testUsername");

        Mockito.doNothing().when(adminService).addUser(addUser);

        ModelAndView returnValue = instance.addUser(addUser);

        Mockito.verify(adminService, Mockito.times(1)).addUser(addUser);

        Assert.assertTrue(returnValue.getViewName().equals("redirect:" + "/dashboard/users"));
    }

    @Test
    public void testEditUser() {
        EditUser editUser = new EditUser();

        Mockito.doNothing().when(adminService).editUser(editUser);

        ModelAndView returnValue = instance.editUser(editUser);

        Mockito.verify(adminService, Mockito.times(1)).editUser(editUser);

        Assert.assertTrue(returnValue.getViewName().equals("redirect:" + "/dashboard/users"));
    }

    @Test
    public void testUserActiveSwitchActivate() {
        Mockito.doNothing().when(adminService).activateUser("testUsername");
        //Mockito.doNothing().when(adminService).deactivateUser("testUsername");

        ModelAndView returnValue = instance.userActiveSwitch("testUsername", "activate");

        Mockito.verify(adminService, Mockito.times(1)).activateUser("testUsername");

        Mockito.verify(adminService, Mockito.times(0)).deactivateUser("testUsername");

        Assert.assertTrue(returnValue.getViewName().equals("redirect:" + "/dashboard/users"));
    }

    @Test
    public void testUserActiveSwitchDeactivate() {
        //Mockito.doNothing().when(adminService).activateUser("testUsername");
        Mockito.doNothing().when(adminService).deactivateUser("testUsername");

        ModelAndView returnValue = instance.userActiveSwitch("testUsername", "deactivate");

        Mockito.verify(adminService, Mockito.times(0)).activateUser("testUsername");

        Mockito.verify(adminService, Mockito.times(1)).deactivateUser("testUsername");

        Assert.assertTrue(returnValue.getViewName().equals("redirect:" + "/dashboard/users"));
    }

    @Test
    public void testCheckUserExists() {
        Mockito.when(adminService.checkUserExists("testUsername")).thenReturn(true);
        Assert.assertTrue(instance.checkUserExists("testUsername"));
        Mockito.verify(adminService, Mockito.times(1)).checkUserExists("testUsername");

    }
}
