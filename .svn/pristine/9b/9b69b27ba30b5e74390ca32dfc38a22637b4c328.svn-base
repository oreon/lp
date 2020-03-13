package lawpro.repository;

import lawpro.data.User;
import org.socialsignin.spring.data.dynamodb.repository.EnableScan;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

@EnableScan
public interface IUserRepository extends CrudRepository<User, String> {

    List<User> findByFirstName(String firstName);
    Optional<User> findById(String Id);
    Optional<User> findByEmail(String email);

}
