package lawpro.repository;

import lawpro.data.LookupValue;
import org.socialsignin.spring.data.dynamodb.repository.EnableScan;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@EnableScan
public interface ILookupValuesRepository extends CrudRepository<LookupValue, String> {

    Optional<LookupValue> findById(String Id);
    List<LookupValue> findByLookupId(String Id);

}
