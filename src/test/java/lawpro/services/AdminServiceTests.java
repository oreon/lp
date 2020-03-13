package lawpro.services;

import lawpro.data.Admin;
import lawpro.data.input.AddUser;
import lawpro.data.input.ChangePassword;
import lawpro.data.input.EditUser;
import lawpro.providers.AdminProvider;
import lawpro.repository.IAdminRepository;
import lawpro.utils.PasswordEncoderUtil;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;

@RunWith(MockitoJUnitRunner.class)
public class AdminServiceTests {

    @Mock
    IAdminRepository iAdminRepository;

    @Mock
    PasswordEncoderUtil passwordEncoder;

    @Mock
    private AdminProvider adminProvider;

    @InjectMocks
    AdminService instance;

    @Test
    public void testGetAdmins() {
        List<Admin> admins = new ArrayList<>();
        Admin admin = new Admin();
        admin.setUsername("testUsername");
        admins.add(admin);

        Mockito.when(adminProvider.findAll()).thenReturn(admins);

        List<Admin> returnedAdmins = instance.getAdmins();

        /* Verify that findAll() was called one time */
        Mockito.verify(adminProvider, Mockito.times(1)).findAll();
        /* Verify that value returned from findAll() is returned by method being tested */
        Assert.assertTrue(returnedAdmins.get(0).getUsername().equals(admin.getUsername()));
    }

    @Test
    public void testAddUser() {
        AddUser addUser = new AddUser();
        addUser.setEmail("testEmail");
        addUser.setPassword("testPassword");
        addUser.setPriv("testPriv");
        addUser.setRole("testRole");
        addUser.setUsername("testUsername");
        Mockito.when(passwordEncoder.getEncoder()).thenReturn(new BCryptPasswordEncoder());
        Mockito.when(iAdminRepository.save(any())).thenReturn(null);
        instance.addUser(addUser);
        Mockito.verify(passwordEncoder, Mockito.times(1)).getEncoder();
        Mockito.verify(iAdminRepository, Mockito.times(1)).save(any());
        Mockito.verifyNoMoreInteractions(this.iAdminRepository);
    }

    @Test
    public void testEditUser(){
        Mockito.when(passwordEncoder.getEncoder()).thenReturn(new BCryptPasswordEncoder());

        EditUser editUser =  new EditUser();
        editUser.setEmail("testEmail");
        editUser.setRole("testRole");
        editUser.setPriv("testPriv");
        editUser.setPassword("testPassword");
        editUser.setUsername("testUsername");

        Admin admin = new Admin();

        Mockito.when(iAdminRepository.findByUsername(editUser.getUsername())).thenReturn(Optional.of(admin));

        Mockito.when(iAdminRepository.save(admin)).thenReturn(admin);

        instance.editUser(editUser);

        Mockito.verify(iAdminRepository, Mockito.times(1)).findByUsername(editUser.getUsername());

        Mockito.verify(iAdminRepository, Mockito.times(1)).save(admin);
    }

    @Test
    public void testDeactivateUser() {
        Admin admin = new Admin();

        Mockito.when(iAdminRepository.findByUsername("testUsername")).thenReturn(Optional.of(admin));

        Mockito.when(iAdminRepository.save(admin)).thenReturn(admin);

        instance.deactivateUser("testUsername");

        Mockito.verify(iAdminRepository, Mockito.times(1)).findByUsername("testUsername");

        Mockito.verify(iAdminRepository, Mockito.times(1)).save(admin);

    }

    @Test
    public void testActivateUser() {
        Admin admin = new Admin();

        Mockito.when(iAdminRepository.findByUsername("testUsername")).thenReturn(Optional.of(admin));

        Mockito.when(iAdminRepository.save(admin)).thenReturn(admin);

        instance.activateUser("testUsername");

        Mockito.verify(iAdminRepository, Mockito.times(1)).findByUsername("testUsername");

        Mockito.verify(iAdminRepository, Mockito.times(1)).save(admin);
    }

    @Test
    public void testCheckUserExistsTrue() {
        Mockito.when(iAdminRepository.existsByUsername("testUsername")).thenReturn(true);

        boolean returnValue = instance.checkUserExists("testUsername");

        Mockito.verify(iAdminRepository, Mockito.times(1)).existsByUsername("testUsername");

        Assert.assertTrue(returnValue);
    }

    @Test
    public void testCheckUserExistsFalse() {
        Mockito.when(iAdminRepository.existsByUsername("testUsername")).thenReturn(false);

        boolean returnValue = instance.checkUserExists("testUsername");

        Mockito.verify(iAdminRepository, Mockito.times(1)).existsByUsername("testUsername");

        Assert.assertFalse(returnValue);
    }

    @Test
    public void testChangeUserPasswordAdmin() {
        ChangePassword changePassword = new ChangePassword();
        changePassword.setUsername("testUsername");
        changePassword.setPassword("testPassword");

        Mockito.when(passwordEncoder.getEncoder()).thenReturn(new BCryptPasswordEncoder());

        Admin admin = new Admin();
        Mockito.when(iAdminRepository.findByUsername(changePassword.getUsername())).thenReturn(Optional.of(admin));

        instance.changeUserPassword(changePassword, true);

        Mockito.verify(iAdminRepository, Mockito.times(1)).findByUsername(changePassword.getUsername());

        Mockito.verify(iAdminRepository, Mockito.times(1)).save(admin);
    }

    @Test
    public void testSave() {
        Admin admin = new Admin();
        admin.setUsername("testUsername");
        Mockito.when(iAdminRepository.save(admin)).thenReturn(admin);

        instance.save(admin);

        Mockito.verify(iAdminRepository, Mockito.times(1)).save(admin);


    }
}
