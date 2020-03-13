package lawpro.services.forms;

import com.google.gson.Gson;
import lawpro.models.universe.request.AddressFormRequest;
import lawpro.models.universe.response.AddressFormResponse;
import lawpro.providers.UniverseProvider;
import lawpro.providers.forms.AddressRequestProvider;
import lawpro.providers.forms.RequestProvider;
import lawpro.viewmodels.irop.IropAddressViewModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AddressSubmitService {

    @Autowired
    private AddressRequestProvider addressRequestProvider;
    @Autowired
    private UniverseProvider universeProvider;

    private final Logger LOGGER = LoggerFactory.getLogger(AddressSubmitService.class);

    public AddressFormResponse submitIropAddress(IropAddressViewModel model) {
        AddressFormRequest request = addressRequestProvider.getIropAddressRequest(model);
        return universeProvider.submitAddressForm(request);
    }



}
