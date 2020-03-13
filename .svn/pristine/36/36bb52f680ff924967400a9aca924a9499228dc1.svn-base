package lawpro.controllers.rest;

import com.google.gson.Gson;
import lawpro.models.universe.response.AddressFormResponse;
import lawpro.models.universe.response.FirmFormResponse;
import lawpro.models.universe.response.NewApplicationFormResponse;
import lawpro.services.forms.FormSaveService;
import lawpro.services.forms.FormService;
import lawpro.services.forms.FormValidationService;
import lawpro.services.forms.RequestService;
import lawpro.viewmodels.AddressFormViewModel;
import lawpro.viewmodels.FirmFormViewModel;
import lawpro.viewmodels.NewApplicationFormViewModel;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/forms/validate")
public class ValidationRestController {

    @Autowired
    private FormSaveService formSaveService;
    @Autowired
    private FormValidationService validationService;
    @Autowired
    private RequestService requestService;
    @Autowired
    private FormService formService;

    private static Logger LOGGER = LogManager.getLogger(FormRestController.class);

    /* Validate Forms */
    @PostMapping("/newapplicationform")
    public NewApplicationFormResponse validateNewApplicationForm(@ModelAttribute NewApplicationFormViewModel form) {
        LOGGER.info("FormRestController validateNewApplicationForm() : JSON:" + new Gson().toJson(form));
        formSaveService.saveNewApplicationForm(form);
        return validationService.validateNewApplicationForm(requestService.formatNewApplicationRequest(form, ""));
    }

    @PostMapping("/address")
    public AddressFormResponse validateAddress(@ModelAttribute AddressFormViewModel form) {
        LOGGER.info("FormRestController validateAddress() : JSON:" + new Gson().toJson(form));
        formService.deleteSavedForms(form.getLSONumber(), "AddressForm");
        formSaveService.saveAddressForm(form);
        return validationService.validateAddressForm(requestService.formatAddressFormRequest(form));
    }

    @PostMapping("/firm")
    public FirmFormResponse validateFirm(@ModelAttribute FirmFormViewModel form) {
        //add delete
        formSaveService.saveFirmForm(form);
        return validationService.validateFirmForm(requestService.formatFirmFormRequest(form));
    }
}
