package lawpro.providers.forms;

import lawpro.data.FormQuestion;
import lawpro.data.Lookup;
import lawpro.repository.IFormQuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Component
public class FormQuestionProvider {

    @Autowired
    private IFormQuestionRepository iFormQuestionRepository;

    public List<FormQuestion> findByFormId(String formId) {
        return iFormQuestionRepository.findByFormId(formId);
    }

    public FormQuestion findByFormIdAndQuestionNumber(String formId, String questionNumber) {
        return iFormQuestionRepository.findByFormId(formId).stream().filter(x -> x.getNumber().equals(questionNumber)).findFirst().orElse(null);
    }

    public List<FormQuestion> getAllFormQuestions()
    {
        List<FormQuestion> list = new ArrayList<>();
        iFormQuestionRepository.findAll().forEach(list::add);
        return list;
    }

}
