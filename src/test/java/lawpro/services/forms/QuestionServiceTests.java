package lawpro.services.forms;


import lawpro.data.FormQuestion;
import lawpro.repository.IFormQuestionRepository;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RunWith(MockitoJUnitRunner.class)
public class QuestionServiceTests {

    @InjectMocks
    private QuestionService instance;

    @Mock
    private IFormQuestionRepository iFormQuestionRepository;

    @Test
    public void testUpdateQuestionText() {
        FormQuestion question = new FormQuestion();

        Mockito.when(iFormQuestionRepository.findById("testId")).thenReturn(Optional.of(question));
        Mockito.when(iFormQuestionRepository.save(question)).thenReturn(question);

        Boolean returnValue = instance.updateQuestionHelpText("testId", "testText");

        Mockito.verify(iFormQuestionRepository, Mockito.times(1)).findById("testId");
        Mockito.verify(iFormQuestionRepository, Mockito.times(1)).save(question);

        Assert.assertTrue(returnValue);
    }

    @Test
    public void testUpdateQuestionInstructions() {
        FormQuestion question = new FormQuestion();

        Mockito.when(iFormQuestionRepository.findById("testId")).thenReturn(Optional.of(question));
        Mockito.when(iFormQuestionRepository.save(question)).thenReturn(question);

        Boolean returnValue = instance.updateQuestionInstructions("testId", "testHelp");

        Mockito.verify(iFormQuestionRepository, Mockito.times(1)).findById("testId");
        Mockito.verify(iFormQuestionRepository, Mockito.times(1)).save(question);

        Assert.assertTrue(returnValue);
    }

    @Test
    public void testUpdateQuestionHelp() {
        FormQuestion question = new FormQuestion();

        Mockito.when(iFormQuestionRepository.findById("testId")).thenReturn(Optional.of(question));
        Mockito.when(iFormQuestionRepository.save(question)).thenReturn(question);

        Boolean returnValue = instance.updateQuestionHelpText("testId", "testHelp");

        Mockito.verify(iFormQuestionRepository, Mockito.times(1)).findById("testId");
        Mockito.verify(iFormQuestionRepository, Mockito.times(1)).save(question);

        Assert.assertTrue(returnValue);
    }

    @Test
    public void testCreate() {
        FormQuestion formQuestion = new FormQuestion();
        formQuestion.setNumber("testNumber");

        Mockito.when(iFormQuestionRepository.save(formQuestion)).thenReturn(formQuestion);

        FormQuestion returnValue = instance.create(formQuestion);

        Mockito.verify(iFormQuestionRepository, Mockito.times(1)).save(formQuestion);

        Assert.assertTrue(returnValue.getNumber().equals(formQuestion.getNumber()));
    }

}

