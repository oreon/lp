package lawpro.providers;

import lawpro.data.input.Token;
import lawpro.repository.ITokenRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.web.authentication.rememberme.PersistentRememberMeToken;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class TokenProvider {

    @Autowired
    private ITokenRepository iTokenRepository;

    private static Logger LOGGER = LogManager.getLogger(TokenProvider.class);


    public PersistentRememberMeToken getTokenForSeries(String seriesId) {
        Token token = getAll().stream().filter(x -> x.getSeries().equals(seriesId)).findFirst().orElse(null);
        if(token != null) {
            return new PersistentRememberMeToken(token.getUsername(), token.getSeries(), token.getTokenValue(), token.getDate());
        } else {
            return null;
        }
    }


    public List<Token> getAll()
    {
        List<Token> tokens = new ArrayList<>();
        try {
            iTokenRepository.findAll().forEach(tokens::add);
        } catch(Exception e){
            LOGGER.error("TokenProvider Error: getAll()", e);
        }
        return tokens;
    }
}
