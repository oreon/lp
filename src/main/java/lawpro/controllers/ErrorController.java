package lawpro.controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class ErrorController {

    @Value("${spring.profiles.active}")
    private String env;

    @GetMapping("/error")
    public ModelAndView error()
    {
        ModelAndView mv = new ModelAndView();
        mv.addObject("isProd", (env.equals("prod")));
        mv.setViewName("error");
        return mv;
    }

    @GetMapping("/timeout")
    public ModelAndView timeout()
    {
        ModelAndView mv = new ModelAndView();
        mv.addObject("isProd", (env.equals("prod")));
        mv.setViewName("timeout");
        return mv;
    }

    @GetMapping("/userError")
    public ModelAndView userError(@RequestParam String msg)
    {
        ModelAndView mv = new ModelAndView();
        mv.addObject("isProd", (env.equals("prod")));
        mv.setViewName("userError");
        mv.addObject("message", msg);
        return mv;
    }
}
