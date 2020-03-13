package lawpro.controllers;

import lawpro.providers.AdminProvider;
import lawpro.providers.InitProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;
import java.io.FileNotFoundException;

@Controller
public class HomeController {

    @Autowired
    AdminProvider adminProvider;

    @Autowired
    InitProvider initProvider;

    @Value("${import.active}")
    String importActive;

    @Value("${import.export}")
    String importExport;

    @Value("${spring.profiles.active}")
    private String env;

    @GetMapping({"/", "/home"})
    public ModelAndView home() throws FileNotFoundException {
        //Initialize if there are no admins available


        if (importActive.equals("true"))
        {
            if (importExport.equals("true"))
            {
                initProvider.start(true);
            }else
            {
                initProvider.start(false);
            }
        }


        ModelAndView mv = new ModelAndView();
        mv.setViewName("home");
        mv.addObject("isProd", (env.equals("prod")));

        return mv;
    }

    @GetMapping("/dashboard")
    public ModelAndView dashboard()
    {
        ModelAndView mv = new ModelAndView("/dashboard/index");
        mv.addObject("isProd", (env.equals("prod")));
        return mv;
    }

    @GetMapping("/fileonline")
    public ModelAndView fileOnline() {
        ModelAndView mv = new ModelAndView("/fileonline");
        mv.addObject("isProd", (env.equals("prod")));
        return mv;
    }
}
