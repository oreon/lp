package lawpro.providers;

import lawpro.data.input.Token;
import lawpro.repository.ITokenRepository;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.security.web.authentication.rememberme.PersistentRememberMeToken;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;

@RunWith(MockitoJUnitRunner.class)
public class TokenProviderTests {

    @InjectMocks
    private TokenProvider instance;

    @Mock
    private ITokenRepository iTokenRepository;


    @Test
    public void testGetTokenForSeriesNotNull() {

        Token tokenOne = new Token();
        tokenOne.setSeries("testSeriesOne");
        tokenOne.setUsername("testUsernameOne");
        tokenOne.setDate(new Date());
        tokenOne.setTokenValue("testTokenValueOne");

        Token tokenTwo = new Token();
        tokenTwo.setSeries("testSeriesTwo");

        List<Token> tokens = new ArrayList<>();
        tokens.add(tokenOne);
        tokens.add(tokenTwo);

        Mockito.when(iTokenRepository.findAll()).thenReturn(tokens);

        PersistentRememberMeToken returnValue = instance.getTokenForSeries("testSeriesOne");

        Mockito.verify(iTokenRepository, Mockito.times(1)).findAll();

        Assert.assertTrue(returnValue.getUsername().equals(tokenOne.getUsername()));

    }


    @Test
    public void testGetAll() {
        Token tokenOne = new Token();
        tokenOne.setUsername("testUsernameOne");
        Token tokenTwo = new Token();
        tokenTwo.setUsername("testUsernameTwo");
        List<Token> tokens = new ArrayList<>();
        tokens.add(tokenOne);
        tokens.add(tokenTwo);

        Mockito.when(iTokenRepository.findAll()).thenReturn(tokens);

        List<Token> returnValue = instance.getAll();

        Mockito.verify(iTokenRepository, Mockito.times(1)).findAll();

        Assert.assertTrue(returnValue.size() == 2);

    }

}
