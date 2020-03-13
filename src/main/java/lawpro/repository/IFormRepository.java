package lawpro.repository;

import lawpro.data.Form;
import org.socialsignin.spring.data.dynamodb.repository.EnableScan;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;

import java.util.Optional;

@EnableScan
public interface IFormRepository extends CrudRepository<Form, String> {

    Optional<Form> findById(String Id);
    Optional<Form> findByName(String name);
    Optional<Form> findByUrl(String url);

}
