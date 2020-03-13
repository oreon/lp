package lawpro.repository;

import lawpro.data.UserForm;
import org.socialsignin.spring.data.dynamodb.repository.EnableScan;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@EnableScan
public interface IUserFormRepository extends CrudRepository<UserForm, String> {

    Optional<UserForm> findById(String Id);
    List<UserForm> findByUserName(String user);
    List<UserForm> findByFormName(String formName);
    UserForm findByUserNameAndFormName (String username, String formName);
}
