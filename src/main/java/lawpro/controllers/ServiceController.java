package lawpro.controllers;

import lawpro.providers.ErrorMessageProvider;
import lawpro.services.errors.ErrorService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Produces;

@RestController
@Produces("application/json")
public class ServiceController {

    private static Logger LOGGER = LogManager.getLogger(ServiceController.class);

    @Autowired
    private ErrorMessageProvider provider;

    @Autowired
    private ErrorService errorService;

    @PostMapping("/services/errors")
    public long errorMessages(@ModelAttribute Object object)
    {
        return errorService.getNewErrorMessageCount();
    }

    @PostMapping("/monerislog")
    public void monerisLog(HttpServletRequest request)  {

        LOGGER.info(request.toString());
    }
}
