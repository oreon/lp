package lawpro.providers.forms;

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

@RunWith(MockitoJUnitRunner.class)
public class FormQuestionProviderTests {


    @InjectMocks
    private FormQuestionProvider instance;

    @Mock
    private IFormQuestionRepository iFormQuestionRepository;

    @Test
    public void testFindByFormId() {
        FormQuestion formQuestionOne = new FormQuestion();
        formQuestionOne.setId("testIdOne");
        FormQuestion formQuestionTwo = new FormQuestion();
        formQuestionTwo.setId("testIdTwo");

        List<FormQuestion> formQuestions = new ArrayList<>();
        formQuestions.add(formQuestionOne);
        formQuestions.add(formQuestionTwo);

        Mockito.when(iFormQuestionRepository.findByFormId("testId")).thenReturn(formQuestions);

        List<FormQuestion> returnQuestions = instance.findByFormId("testId");

        /* Verify that findByFormId() was called one time with the provided value */
        Mockito.verify(iFormQuestionRepository, Mockito.times(1)).findByFormId("testId");

        /* Verify that value being returned from findByFormId() is value return from method being tested */
        Assert.assertTrue(returnQuestions.get(0).getId().equals(formQuestionOne.getId()));
        Assert.assertTrue(returnQuestions.size() == 2);
    }

    @Test
    public void testFindByFormIdAndQuestionNumber() {
        FormQuestion formQuestionOne = new FormQuestion();
        formQuestionOne.setId("testIdOne");
        formQuestionOne.setNumber("1");
        FormQuestion formQuestionTwo = new FormQuestion();
        formQuestionTwo.setId("testIdTwo");
        formQuestionTwo.setNumber("2");
        List<FormQuestion> formQuestions = new ArrayList<>();
        formQuestions.add(formQuestionOne);
        formQuestions.add(formQuestionTwo);

        Mockito.when(iFormQuestionRepository.findByFormId("testIdTwo")).thenReturn(formQuestions);

        FormQuestion returnValue = instance.findByFormIdAndQuestionNumber("testIdTwo", formQuestionTwo.getNumber());

        Mockito.verify(iFormQuestionRepository, Mockito.times(1)).findByFormId("testIdTwo");

        Assert.assertTrue(returnValue.getId().equals(formQuestionTwo.getId()));
    }
}
