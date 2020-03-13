package lawpro.controllers.rest;

import common.models.RequestModel;
import lawpro.data.ErrorMessage;
import lawpro.models.ErrorModel;
import lawpro.repository.IErrorRepository;
import lawpro.services.errors.ErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.ws.rs.Produces;

@RestController
@Produces("application/json")
public class ErrorMessageRestController {

    @Autowired
    private IErrorRepository repo;

    @Autowired
    private ErrorService errorService;

    @PostMapping("/dashboard/errors/add")
    public ErrorMessage add(@ModelAttribute ErrorModel error) {
      return errorService.addError(error);
    }

    @PostMapping("/dashboard/errors/edit")
    public ErrorMessage edit(@ModelAttribute ErrorModel error) {
        return errorService.editError(error);
    }
    @PostMapping("/dashboard/errors/delete")
    public boolean delete(@ModelAttribute RequestModel request) {
        return errorService.deleteError(request);
    }
}
