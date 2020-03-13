package lawpro.controllers.rest;

import common.models.RequestModel;
import lawpro.data.LookupValue;
import lawpro.models.LookupValueModel;
import lawpro.services.lookups.LookupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.Produces;

@RestController
@Produces("application/json")
public class LookupRestController {

    @Autowired
    private LookupService lookupService;

    @PostMapping("/dashboard/lookup/add")
    public LookupValue add(@ModelAttribute LookupValueModel model) {
        return lookupService.addLookupValue(model);
    }

    @PostMapping("/dashboard/lookup/edit")
    public LookupValue edit(@ModelAttribute LookupValueModel model) {
        return lookupService.editLookupValue(model);
    }
    @PostMapping("/dashboard/lookup/delete")
    public boolean delete(@ModelAttribute RequestModel request) {
        return lookupService.deleteLookupValue(request);
    }
}
