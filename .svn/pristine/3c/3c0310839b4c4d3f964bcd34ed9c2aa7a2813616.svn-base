package lawpro.repository;

import lawpro.data.FormQuestion;
import org.socialsignin.spring.data.dynamodb.repository.EnableScan;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@EnableScan
public interface IFormQuestionRepository extends CrudRepository<FormQuestion, String> {

    Optional<FormQuestion> findById(String Id);
    List<FormQuestion> findByFormId(String Id);

}
