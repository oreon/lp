package lawpro.services;

import lawpro.models.universe.Firm;
import lawpro.models.universe.response.FirmResponse;
import lawpro.models.universe.response.FirmSearchResponse;
import lawpro.models.universe.response.UserResponse;
import lawpro.providers.UniverseProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class FirmService {

    @Autowired
    private UniverseProvider universeProvider;

    public FirmSearchResponse searchFirm(String searchTerm, String firmNumber) {
        FirmSearchResponse response = new FirmSearchResponse();


        List<Firm> firms = null;

        if (firmNumber.length() > 1) {
               FirmResponse firmResponse = universeProvider.firmDetailsByID(firmNumber);
               List<Firm> firmList = new ArrayList<>();
               firmList.add(firmResponse.getFirm());
               response.setFirms(firmList);
        } else {
           response = universeProvider.firmSearch(searchTerm);
        }


        return response;
    }


    public FirmResponse getFirmDetails(String firmNumber) {
        return universeProvider.firmDetailsByID(firmNumber);
    }

    public FirmResponse getFirmDetailsByUser(String username) {
        UserResponse userResponse = universeProvider.userDetails(username);
        return universeProvider.firmDetailsByID(userResponse.getFirmKey());
    }

    public FirmResponse getFirmDetailsByFirm(String firmId) {
        FirmResponse response = universeProvider.firmDetailsByID(firmId);

        return response;
    }

}
