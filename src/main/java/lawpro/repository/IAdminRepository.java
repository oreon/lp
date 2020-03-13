package lawpro.repository;

import lawpro.data.Admin;
import org.socialsignin.spring.data.dynamodb.repository.EnableScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@EnableScan
public interface IAdminRepository extends CrudRepository<Admin, String> {

    Optional<Admin> findByUsername(String username);
    boolean existsByUsername(String username);
}
