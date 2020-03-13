package lawpro.controllers;

import lawpro.data.input.ChangePassword;
import lawpro.providers.CustomAuthenticationProvider;
import lawpro.providers.UniverseProvider;
import lawpro.services.AdminService;
import lawpro.utils.SessionUtil;
import lawpro.utils.UserUtil;
import org.apache.http.HttpRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.View;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.DefaultValue;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@Controller
public class AccountController {

    @Autowired
    AdminService adminService;

    @Autowired
    CustomAuthenticationProvider customAuthenticationProvider;

    @Value("${legacyURL}")
    private String legacyURL;

    @Value("${moneris.res_id}")
    private String resId;

    @Value("${moneris.res_key}")
    private String resKey;

    @Value("${moneris.url}")
    private String monerisUrl;

    @Value("${spring.profiles.active}")
    private String env;

    private final Logger LOGGER = LoggerFactory.getLogger(UniverseProvider.class);


    @GetMapping("/myaccount")
    public ModelAndView myAccount(Principal principal){
        ModelAndView mv = new ModelAndView();
        mv.addObject("username", principal.getName());
        mv.addObject("changePassword", new ChangePassword());
        mv.setViewName("myaccount");
        mv.addObject("isProd", (env.equals("prod")));
        return mv;
    }

    @PostMapping(value = "/myAccChangePassword")
    public ModelAndView changePassword(Authentication auth, @ModelAttribute ChangePassword changePassword){
        ModelAndView mv = new ModelAndView("redirect:" + "/myaccount");
        mv.addObject("isProd", (env.equals("prod")));
        List<String> authorities = new ArrayList<>();
        for(GrantedAuthority authority : auth.getAuthorities()){
            authorities.add(authority.getAuthority());
        }


        adminService.changeUserPassword(changePassword, authorities.contains("ROLE_ADMIN") ? true : false);
        return mv;
    }

    @GetMapping("/auth")
    public ModelAndView auth(@RequestParam String token, @RequestParam String form) {
        ModelAndView mv = new ModelAndView();
        mv.addObject("isProd", (env.equals("prod")));


        if (token == "" || token != null)
        {
            //check token is valid
            Authentication auth = customAuthenticationProvider.token(token);
            if (auth != null)
            {
                if (form.equals("newapp"))
                    mv.setViewName("redirect:/forms/newapplicationform");
                else if (form.equals("address"))
                    mv.setViewName("redirect:/forms/address");
                else if (form.equals("excess"))
                    mv.setViewName("redirect:/forms/excessform");
                else if (form.equals("irop"))
                    mv.setViewName("redirect:/forms/iropform");
                else
                    mv.setViewName("redirect:/home");
            } else {
                mv.setViewName("redirect:" + legacyURL);
            }
        } else {
            mv.setViewName("redirect:" + legacyURL);
        }

        return mv;
    }

    @RequestMapping("/moneris")
    public View goToMoneris(HttpServletRequest httpServletRequest, @ModelAttribute("custid") String customerId, @ModelAttribute("fromform") String fromForm){
        LOGGER.info("Proceeding to moneris with customer id:" + customerId + " and from:" + fromForm);
        RedirectView view = new RedirectView("/forms/payment?custid=" + customerId);
        SessionUtil.setFromFormForMoneris(fromForm);
        try {
            return view;
        } catch (Exception e) {
            LOGGER.error("Error redirecting to moneris. CustomerID = " + customerId, e);
            RedirectView errorView = new RedirectView("redirect:error?message=Error redirecting to moneris");
            return errorView;
        }
    }

    @RequestMapping("/monerisreturn")
    public ModelAndView monerisReturn() {
        ModelAndView mv = new ModelAndView();
        mv.addObject("isProd", (env.equals("prod")));
        if (SessionUtil.getFromFormForMoneris().equals("excess")) {
            mv.setViewName("redirect:/forms/excessform");
        } else if (SessionUtil.getFromFormForMoneris().equals("newapplicationform")) {
            mv.setViewName("redirect:/forms/newapplicationform");
        } else if (SessionUtil.getFromFormForMoneris().equals("iropform")) {
            mv.setViewName("redirect:/forms/iropform");
        } else {
            mv.setViewName("redirect:/error");
        }
        return mv;
    }

}
