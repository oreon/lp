package lawpro.providers;

import lawpro.services.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.context.request.RequestContextListener;

import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class ApplicationProvider {

    private final Logger LOGGER = LoggerFactory.getLogger(ApplicationProvider.class);


    @Cacheable
    public String Version()
    {
        Properties properties = new Properties();
        String build = "0.0.0.0";
        try {
            try (InputStream is = getClass().getResourceAsStream("/application.properties")) {
                properties.load(is);
                build =  properties.get("build").toString();
                is.close();
            }
        } catch (IOException e) {
            LOGGER.error("ApplicationProvider Error: Version()", e);
        }

        return build;
    }

    public String API()
    {
        Properties properties = new Properties();
        String api = "";
        try {
            try (InputStream is = getClass().getResourceAsStream("/application.properties")) {
                properties.load(is);
                api =  properties.get("universe.api.url").toString();
                is.close();
            }
        } catch (IOException e) {
            LOGGER.error("ApplicationProvider Error: API()", e);
        }

        return api;
    }
}
