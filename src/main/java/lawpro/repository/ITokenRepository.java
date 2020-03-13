package lawpro.repository;

import lawpro.data.input.Token;
import org.socialsignin.spring.data.dynamodb.repository.EnableScan;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;

@EnableScan
public interface ITokenRepository extends CrudRepository<Token, String> {

    Token findBySeries(String series);
    Token findByUsername(String username);
}
