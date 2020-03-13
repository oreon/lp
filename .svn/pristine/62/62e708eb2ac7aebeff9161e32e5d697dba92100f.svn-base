package lawpro.services;

import lawpro.data.input.Token;
import lawpro.providers.TokenProvider;
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
public class TokenServiceTests {

    @InjectMocks
    private TokenService instance;

    @Mock
    private ITokenRepository iTokenRepository;

    @Mock
    private TokenProvider tokenProvider;

    @Test
    public void testGetTokenForSeries(){
        PersistentRememberMeToken token = new PersistentRememberMeToken("testUsername", "testSeries", "testValue", new Date());

        Mockito.when(tokenProvider.getTokenForSeries("testSeries")).thenReturn(token);

        PersistentRememberMeToken returnValue = instance.getTokenForSeries("testSeries");

        Mockito.verify(tokenProvider, Mockito.times(1)).getTokenForSeries("testSeries");

        Assert.assertTrue(returnValue.getUsername().equals("testUsername"));
    }

    @Test
    public void testGetTokenForSeriesNull() {
        PersistentRememberMeToken returnValue = instance.getTokenForSeries("testSeries");
        Assert.assertTrue(returnValue == null);
    }

    @Test
    public void testRemoveUserTokens() {

        Token tokenOne = new Token();
        tokenOne.setUsername("testUsernameOne");
        Token tokenTwo = new Token();
        tokenTwo.setUsername("testUsernameTwo");
        List<Token> tokens = new ArrayList<>();
        tokens.add(tokenOne);
        tokens.add(tokenTwo);

        Mockito.when(tokenProvider.getAll()).thenReturn(tokens);

        Mockito.doNothing().when(iTokenRepository).delete(tokenTwo);

        instance.removeUserTokens("testUsernameTwo");

        Mockito.verify(tokenProvider, Mockito.times(1)).getAll();

        Mockito.verify(iTokenRepository, Mockito.times(1)).delete(tokenTwo);
    }

    @Test
    public void testCreateNewToken() {

        PersistentRememberMeToken persistenToken = new PersistentRememberMeToken("testUsername", "testSeries",
                "testValue", new Date());

        Token token = new Token();
        token.setId("testId");

        Mockito.when(iTokenRepository.save(any(Token.class))).thenReturn(token);

        instance.createNewToken(persistenToken);

        Mockito.verify(iTokenRepository, Mockito.times(1)).save(any(Token.class));

    }

    @Test
    public void testUpdateToken() {
        Token tokenOne = new Token();
        tokenOne.setSeries("testSeriesOne");
        Token tokenTwo = new Token();
        tokenTwo.setSeries("testSeriesTwo");

        List<Token> tokens = new ArrayList<>();
        tokens.add(tokenOne);
        tokens.add(tokenTwo);

        Mockito.when(tokenProvider.getAll()).thenReturn(tokens);

        Mockito.when(iTokenRepository.save(any(Token.class))).thenReturn(tokenTwo);

        instance.updateToken("testSeriesTwo", "testValue", new Date());

        Mockito.verify(tokenProvider, Mockito.times(1)).getAll();

        Mockito.verify(iTokenRepository, Mockito.times(1)).save(any(Token.class));

    }
}
