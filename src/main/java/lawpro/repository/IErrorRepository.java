package lawpro.repository;

import lawpro.data.ErrorMessage;
import org.socialsignin.spring.data.dynamodb.repository.EnableScan;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;

import java.util.Optional;

@EnableScan
public interface IErrorRepository extends CrudRepository<ErrorMessage, String> {

    Optional<ErrorMessage> findById(String Id);
    Optional<ErrorMessage> findByKey(String key);
}
