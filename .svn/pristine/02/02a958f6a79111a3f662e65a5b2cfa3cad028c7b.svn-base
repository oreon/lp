package lawpro.services;

import lawpro.data.input.Token;
import lawpro.providers.TokenProvider;
import lawpro.repository.ITokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.web.authentication.rememberme.PersistentRememberMeToken;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class TokenService implements PersistentTokenRepository {

    @Autowired
    private TokenProvider tokenProvider;

    @Autowired
    private ITokenRepository iTokenRepository;

    @Override
    public void createNewToken(PersistentRememberMeToken token) {
        iTokenRepository.save(new Token(null,
                token.getUsername(),
                token.getSeries(),
                token.getTokenValue(),
                token.getDate()));
    }

    @Override
    public void updateToken(String series, String value, Date lastUsed) {
        Token token = tokenProvider.getAll().stream().filter(x -> x.getSeries().equals(series)).findFirst().orElse(null);

        if (token != null)
            iTokenRepository.save(new Token(token.getId(), token.getUsername(), series, value, lastUsed));
    }

    @Override
    public PersistentRememberMeToken getTokenForSeries(String seriesId) {
        return tokenProvider.getTokenForSeries(seriesId);
    }

    @Override
    public void removeUserTokens(String username) {
        Token token = tokenProvider.getAll().stream().filter(x -> x.getUsername().equals(username)).findFirst().orElse(null);
        if (token != null) {
            iTokenRepository.delete(token);
        }
    }
}
