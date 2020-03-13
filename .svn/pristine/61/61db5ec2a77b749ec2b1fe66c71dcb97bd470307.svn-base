package lawpro.providers;


import lawpro.data.Admin;
import lawpro.repository.IAdminRepository;
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

@RunWith(MockitoJUnitRunner.class)
public class AdminProviderTests {

    @InjectMocks
    private AdminProvider instance;

    @Mock
    private IAdminRepository iAdminRepository;

    @Test
    public void testExistsByUsername() {
        Mockito.when(iAdminRepository.existsByUsername("testUsername")).thenReturn(true);
        boolean returnValue = instance.existsByUsername("testUsername");
        Assert.assertTrue(returnValue);
    }

    @Test
    public void testFindByIsActiveAndUsername() {
        Admin admin = new Admin();
        admin.setId("testId");
        admin.setUsername("testUsername");
        admin.setActive(true);
        List<Admin> admins = new ArrayList<>();
        admins.add(admin);
        Mockito.when(iAdminRepository.findAll()).thenReturn(admins);

        Admin returnValue = instance.findByIsActiveAndUsername(true, "testUsername");

        Mockito.verify(iAdminRepository, Mockito.times(1)).findAll();

        Assert.assertTrue(returnValue.getId().equals(admin.getId()));
    }

    @Test
    public void testGetByUsername() {
        Admin admin = new Admin();
        admin.setUsername("testUsername");
        Optional<Admin> oAdmin = Optional.of(admin);

        Mockito.when(iAdminRepository.findByUsername("testUsername")).thenReturn(oAdmin);

        Optional<Admin> returnValue = instance.findByUsername("testUsername");

        Mockito.verify(iAdminRepository, Mockito.times(1)).findByUsername("testUsername");

        Assert.assertTrue(returnValue.get().getUsername().equals(admin.getUsername()));
    }

    @Test
    public void testFindAll() {
        Admin adminOne = new Admin();
        adminOne.setUsername("testUsernameOne");
        Admin adminTwo = new Admin();
        adminTwo.setUsername("testUsernameTwo");
        List<Admin> admins = new ArrayList<>();
        admins.add(adminOne);
        admins.add(adminTwo);

        Mockito.when(iAdminRepository.findAll()).thenReturn(admins);

        List<Admin> returnValue = instance.findAll();

        Mockito.verify(iAdminRepository, Mockito.times(1)).findAll();

        Assert.assertTrue(returnValue.size() == 2);

        Assert.assertTrue(returnValue.get(0).getUsername().equals(adminOne.getUsername()));

        Assert.assertTrue(returnValue.get(1).getUsername().equals(adminTwo.getUsername()));
    }


}

