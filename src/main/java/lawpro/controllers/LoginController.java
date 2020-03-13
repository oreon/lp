package lawpro.controllers;

import org.apache.http.HttpResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Controller
public class LoginController {

    @Value("${spring.profiles.active}")
    public String env;

    @Value("${legacyURL}")
    public String legacyURL;

    @PostMapping(value = "/login")
    public String login(HttpServletRequest request, HttpServletResponse test)
    {
        //process login
        return "redirect:/home";
    }

    @GetMapping("/login")
    public ModelAndView loginGet(HttpServletRequest request, HttpResponse response)
    {
        ModelAndView mv = new ModelAndView();
        if (env.equals("prod"))
        {
            mv.setViewName("redirect:" + legacyURL);
        }else{
            HttpSession httpSession = request.getSession(false);
            if (httpSession != null)
            {
                Object errorObj = httpSession.getAttribute("error");
                if (errorObj != null) {
                    try {
                        boolean error = (boolean) errorObj;
                        if (error) {
                            String message = httpSession.getAttribute("message").toString();
                            mv.setViewName("login");
                            mv.addObject("errorMessage", message);
                        }
                    } catch (Exception e) {
                        //reset session since this should always be a boolean
                        request.getSession().invalidate();
                    }
                }

            }
            mv.setViewName("login");
        }

        mv.addObject("isProd", (env.equals("prod")));
        return mv;
    }
}
