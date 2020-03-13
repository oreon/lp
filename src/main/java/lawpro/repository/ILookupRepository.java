package lawpro.repository;

import lawpro.data.Lookup;
import org.socialsignin.spring.data.dynamodb.repository.EnableScan;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;

import java.util.Optional;

@EnableScan
public interface ILookupRepository extends CrudRepository<Lookup, String> {

    Optional<Lookup> findById(String Id);
    Optional<Lookup> findByName(String name);

}
