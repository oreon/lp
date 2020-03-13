package lawpro.services;

import com.google.gson.Gson;
import lawpro.models.universe.Address;
import lawpro.models.universe.Contact;
import lawpro.models.universe.response.FirmResponse;
import lawpro.models.universe.response.UserResponse;
import lawpro.providers.UniverseProvider;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class UserService {

    @Autowired
    private UniverseProvider universeProvider;

    private final Logger LOGGER = LoggerFactory.getLogger(UserService.class);

    public UserResponse getUserDetails(String username) {
        return universeProvider.userDetails(username);
    }

    public FirmResponse getFirmDetailsById(String firmNumber) {
        return universeProvider.firmDetailsByID(firmNumber);
    }
}
