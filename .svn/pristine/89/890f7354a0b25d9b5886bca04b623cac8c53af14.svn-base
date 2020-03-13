package lawpro.controllers;

import lawpro.data.ErrorMessage;
import lawpro.providers.ErrorMessageProvider;
import lawpro.services.errors.ErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class ErrorMessageController {

    @Autowired
    private ErrorService errorService;

    @Value("${spring.profiles.active}")
    private String env;

    @GetMapping({"/dashboard/errors"})
    public ModelAndView errors()
    {
        ModelAndView mv = new ModelAndView();
        mv.addObject("isProd", (env.equals("prod")));
        mv.setViewName("dashboard/errors");
        mv.addObject("errors", errorService.getErrorMessages());

        return mv;
    }

    @GetMapping("/dashboard/errors/add")
    public ModelAndView add()
    {
        ModelAndView mv = new ModelAndView();
        mv.addObject("isProd", (env.equals("prod")));
        mv.setViewName("dashboard/errorAdd");

        return mv;
    }

    @GetMapping("/dashboard/errors/{id}/edit")
    public ModelAndView edit(@PathVariable("id") String id)
    {
        ModelAndView mv = new ModelAndView();
        mv.addObject("isProd", (env.equals("prod")));
        mv.setViewName("dashboard/errorEdit");

        ErrorMessage message = errorService.getErrorMessageByID(id);

        if (message != null)
        {
            mv.addObject("error", message);
        }else{
            mv.setViewName("redirect:/error");
        }

        return mv;
    }

}
