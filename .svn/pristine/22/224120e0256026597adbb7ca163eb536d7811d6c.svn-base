package lawpro.services;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.google.gson.Gson;
import lawpro.providers.AdminProvider;
import lawpro.providers.UniverseProvider;
import lawpro.utils.PasswordEncoderUtil;
import lawpro.data.Admin;
import lawpro.data.input.ChangePassword;
import lawpro.data.input.EditUser;
import lawpro.data.input.AddUser;
import lawpro.repository.IAdminRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AdminService {

    private static Logger LOGGER = LogManager.getLogger(AdminService.class);


    @Autowired
    private AdminProvider adminProvider;

    @Autowired
    private PasswordEncoderUtil passwordEncoderUtil;

    @Autowired
    private IAdminRepository iAdminRepository;

    private Gson gson = new Gson();

    /* Get list of admins */
    public List<Admin> getAdmins(){
        List<Admin> list = new ArrayList<>();
        adminProvider.findAll().forEach(list::add);
        return list;
    }

    /* Add user */
    public void addUser(AddUser addUser){

        PasswordEncoder encoder = passwordEncoderUtil.getEncoder();
        Admin admin = new Admin();
        admin.setUsername(addUser.getUsername());
        admin.setPassword(encoder.encode(addUser.getPassword()));
        admin.setEmail(addUser.getEmail());
        admin.setRole(addUser.getRole().toUpperCase());
        admin.setPriv(addUser.getPriv().toUpperCase());
        admin.setActive(true);
        iAdminRepository.save(admin);

    }

    /* Edit user */
    public void editUser(EditUser editUser){

        PasswordEncoder encoder = passwordEncoderUtil.getEncoder();

        Optional<Admin> admin = iAdminRepository.findByUsername(editUser.getUsername());
        if(!editUser.getPassword().isEmpty())
            admin.get().setPassword(encoder.encode(editUser.getPassword()));


        admin.get().setEmail(editUser.getEmail());
        admin.get().setRole(editUser.getRole());
        admin.get().setPriv(editUser.getPriv());

        iAdminRepository.save(admin.get());
    }

    /* Deactivate user */
    public void deactivateUser(String username){

        Optional<Admin> admin = iAdminRepository.findByUsername(username);
        admin.get().setActive(false);

        iAdminRepository.save(admin.get());
}

    /* Activate user */
    public void activateUser(String username){
        Optional<Admin> admin = iAdminRepository.findByUsername(username);
        admin.get().setActive(true);

        iAdminRepository.save(admin.get());
    }

    /* Check if user exists */
    public boolean checkUserExists(String username){
        try{
            return iAdminRepository.existsByUsername(username);
        } catch (Exception e){
            LOGGER.error(e);
            throw new RuntimeException(e);
        }
    }

    /* Change user password (My Account page) */
    public void changeUserPassword(ChangePassword changePassword, boolean isAdmin){

      PasswordEncoder encoder = passwordEncoderUtil.getEncoder();

      if(isAdmin) {
          Optional<Admin> admin = iAdminRepository.findByUsername(changePassword.getUsername());
          admin.get().setPassword(encoder.encode(changePassword.getPassword()));
          iAdminRepository.save(admin.get());
      }
    }

    public void save(Admin admin)
    {
        admin.setId(UUID.randomUUID().toString());
        try {
            iAdminRepository.save(admin);
        } catch (Exception e){
            LOGGER.error("AdminService Error: save(). Requested Admin object: " + gson.toJson(admin));
            throw new RuntimeException(e);
        }
    }
}
