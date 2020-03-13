package lawpro.services.forms;

import lawpro.data.FormQuestion;
import lawpro.providers.forms.FormQuestionProvider;
import lawpro.repository.IFormQuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class QuestionService {

    @Autowired
    private FormQuestionProvider formQuestionProvider;

    @Autowired
    private IFormQuestionRepository iFormQuestionRepository;

    public Boolean updateQuestionText(String id, String text) {
        FormQuestion question = iFormQuestionRepository.findById(id).orElse(null);
        if (question != null) {
            question.setText(text);
            iFormQuestionRepository.save(question);
            return true;
        } else {
            return false;
        }
    }

    public Boolean updateQuestionInstructions(String id, String instructions) {
        FormQuestion question = iFormQuestionRepository.findById(id).orElse(null);

        if (question != null) {
            question.setInstructions(instructions);
            iFormQuestionRepository.save(question);
            return true;
        } else {
            return false;
        }
    }

    public Boolean updateQuestionHelpText(String id, String helpText) {
        FormQuestion question = iFormQuestionRepository.findById(id).orElse(null);
        if (question != null)
        {
            question.setHelp(helpText);
            iFormQuestionRepository.save(question);
            return true;
        } else {
            return false;
        }
    }

    public FormQuestion create(FormQuestion formQuestion) {
        formQuestion.setId(UUID.randomUUID().toString());
        return iFormQuestionRepository.save(formQuestion);
    }

}
