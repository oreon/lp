package lawpro.controllers.rest;

import com.google.gson.Gson;
import lawpro.data.UserForm;
import lawpro.services.forms.FormSaveService;
import lawpro.services.forms.FormService;
import lawpro.utils.SessionUtil;
import lawpro.viewmodels.NewApplicationFormViewModel;
import lawpro.viewmodels.NewExcessFormViewModel;
import lawpro.viewmodels.irop.IropViewModel;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/forms/save")
public class SaveRestController {

    @Autowired
    private FormService formService;
    @Autowired
    private FormSaveService formSaveService;

    private static Logger LOGGER = LogManager.getLogger(SaveRestController.class);

    /* Save Forms */
    @PostMapping("/newapplicationform")
    public UserForm saveNewApplicationForm(@ModelAttribute NewApplicationFormViewModel request) {
        formService.deleteSavedForms(request.getLSONumber(), "NewApplicationForm");
        return formSaveService.saveNewApplicationForm(request);
    }

    @PostMapping("/newexcessform")
    public UserForm save(@RequestBody String request) {
        Gson gson = new Gson();
        LOGGER.info("FormRestController save() Excess form : JSON: " + request);
        NewExcessFormViewModel model = gson.fromJson(request, NewExcessFormViewModel.class);
        formService.deleteSavedForms(model.getUserId(), "NewExcessForm");
        UserForm form = formSaveService.saveExcessForm(model);
        return form;
    }

    @PostMapping("/irop")
    public UserForm saveIrop (@RequestBody String json) {
        String username = SessionUtil.getUsername();
        Gson gson = new Gson();
        IropViewModel model = gson.fromJson(json, IropViewModel.class);
        LOGGER.info("FormRestController saveIrop() : JSON : " + json);
        formService.deleteSavedForms(username, "IropForm");
        return formSaveService.saveIropForm(model);
    }


}
