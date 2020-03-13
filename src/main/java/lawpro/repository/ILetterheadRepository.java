package lawpro.repository;

import lawpro.data.Letterheads;
import org.socialsignin.spring.data.dynamodb.repository.EnableScan;
import org.springframework.data.repository.CrudRepository;

@EnableScan
public interface ILetterheadRepository extends CrudRepository<Letterheads, String> {
    Letterheads findByUsername(String username);
}
