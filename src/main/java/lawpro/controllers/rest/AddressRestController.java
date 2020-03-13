package lawpro.controllers.rest;

import com.google.gson.Gson;
import lawpro.models.universe.response.AddressFormResponse;
import lawpro.services.forms.*;
import lawpro.viewmodels.AddressFormViewModel;
import lawpro.viewmodels.irop.IropAddressViewModel;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AddressRestController {

    @Autowired
    private FormService formService;
    @Autowired
    private FormSaveService formSaveService;
    @Autowired
    private FormSubmitService formSubmitService;
    @Autowired
    private AddressSubmitService addressSubmitService;
    @Autowired
    private AddressSaveService addressSaveService;

    private static Logger LOGGER = LogManager.getLogger(AddressRestController.class);


    @PostMapping("/forms/submit/address")
    public AddressFormResponse submitAddressNewApp(@ModelAttribute AddressFormViewModel form) {
        LOGGER.info("AddressRestController submitAddressNewApp() : JSON: " + new Gson().toJson(form));
        return formSubmitService.submitAddress(form);
    }

    @PostMapping("/forms/submit/irop/address")
    public AddressFormResponse submitAddressIrop(@RequestBody String json) {
        LOGGER.info("AddressRestController submitAddressIrop() : JSON: " + json);
        Gson gson = new Gson();
        IropAddressViewModel model = gson.fromJson(json, IropAddressViewModel.class);
        return addressSubmitService.submitIropAddress(model);
    }


}
