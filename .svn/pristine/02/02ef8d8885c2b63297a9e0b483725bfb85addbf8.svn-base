package lawpro.controllers;

import com.google.gson.Gson;
import lawpro.data.UserForm;
import lawpro.models.UserInfo;
import lawpro.models.universe.*;
import lawpro.models.universe.response.*;
import lawpro.providers.UniverseProvider;
import lawpro.providers.forms.RequestProvider;
import lawpro.repository.IUserFormRepository;
import lawpro.services.AdminService;
import lawpro.services.FirmService;
import lawpro.services.letterhead.LetterheadService;
import lawpro.services.UserService;
import lawpro.services.forms.FormModelService;
import lawpro.services.forms.FormService;
import lawpro.services.forms.FormSubmitService;
import lawpro.utils.SessionUtil;
import lawpro.utils.UserUtil;
import lawpro.viewmodels.NewApplicationFormViewModel;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.security.Principal;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

@Controller
public class FormController {

    private static Logger LOGGER = LogManager.getLogger(FormController.class);


    @Autowired
    private IUserFormRepository repo;

    @Autowired
    private FormSubmitService submitService;

    @Autowired
    private FormService formService;

    @Autowired
    private FormModelService formModelService;

    @Autowired
    private AdminService adminService;

    @Autowired
    private UserService userService;

    @Autowired
    private FirmService firmService;

    @Value("${moneris.res_key}")
    private String res_key;

    @Value("${moneris.res_id}")
    private String res_id;

    @Value("${moneris.url}")
    private String url;

    @Value("${spring.profiles.active}")
    private String env;

    @GetMapping({"/dashboard/forms"})
    public ModelAndView forms() {
        ModelAndView mv = new ModelAndView();
        mv.setViewName("dashboard/forms");
        mv.addObject("forms", formService.getFormList());
        mv.addObject("isProd", (env.equals("prod")));

        return mv;
    }

    /* FOR ALL */


    //@GetMapping("/payment")
    //public String paymentGet(HttpServletRequest request)
    //{
        //return "redirect:/forms/newapplicationform";
    //}

    //This gets the token back from moneris
    @GetMapping("/payment")
    @CrossOrigin
    public String payment(HttpServletRequest request, Principal principal) throws ParseException {

        //if (request.getHeaders("referer") != null)
        //{
        //String referrer = request.getHeaders("referer").toString();
        //if (!referrer.contains("moneris"))
        //{
        //return "redirect:/forms/newapplicationform";
        //}
        //}

        //Lookup the users saved form
        //Currently we only have the new application form, otherwise we need to know what type of form to lookup here
        List<UserForm> userForms = new ArrayList<UserForm>();
        repo.findAll().forEach(userForms::add);
        UserForm userForm = userForms.stream().filter(x -> x.getFormName().equals("NewApplicationForm") && x.getUserName().indexOf(principal.getName()) > -1).findFirst().orElse(null);

        if (userForm != null)
        {
            Gson gson = new Gson();
            NewApplicationFormViewModel form = gson.fromJson(userForm.getFormData(), NewApplicationFormViewModel.class);
            if (form != null)
            {
                String token = request.getParameter("data_key");
                LOGGER.info("Moneris return token for the user " + userForm.getUserName() + " is :" + token);
                NewApplicationFormResponse response = submitService.submit(form, token);

                if (response != null && !response.isError()) {
                    formService.deleteSavedForms(form.getUserName(), "NewApplicationForm");
                    return "redirect:forms/newapplicationform?confirmed=true&confirmationNumber=" + response.getConfirmation() + "&confirmedDate=" + response.getCreatedDate();
                } else {
                    return "redirect:error?message=" + response.getMessage();
                }
            }
        }
        return "redirect:error";
    }

    //This redirects to moneris
    @GetMapping("/forms/payment")
    public ModelAndView formPayment() {
        ModelAndView mv = new ModelAndView();
        mv.addObject("isProd", (env.equals("prod")));

        mv.addObject("res_id", res_id);
        mv.addObject("res_key", res_key);
        mv.addObject("url", url);

        mv.setViewName("forms/payment");
        return mv;
    }

    @GetMapping("/dashboard/forms/{url}")
    public ModelAndView formAdmin(@PathVariable("url") String url, Principal principal) {
        String username = SessionUtil.getUsername();
        String role = "admin";

        ModelAndView mv = null;
        UserResponse user = new UserResponse();
        user.setFirm(new Firm());
        user.setAddress(new Address());

        if(formService.getFormByUrl(url) != null) {
            switch (url.toLowerCase()) {
                case "excessform":
                    mv = formModelService.getExcessModel(url, username, role);
                    break;
                case "newapplicationform" :
                    mv = formModelService.getNewApplicationFormAdmin(url, username, role, user);
                    break;
                case "address" :
                    mv = formModelService.getAddressFormAdmin(url, username, role, user);
                    break;
                case "iropform" :
                    user = userService.getUserDetails(username);
                    mv = formModelService.getIropForm(url, username, role, user);
                    break;
                default:
                    break;
            }
        } else {
            return new ModelAndView("redirect:/error");
        }
        mv.addObject("isProd", (env.equals("prod")));

        return mv;
    }

    @GetMapping("/forms/{url}")
    public ModelAndView formUser(@PathVariable("url") String url, @RequestParam(defaultValue = "") String confirmed,
                                 @RequestParam(defaultValue = "")String confirmationNumber, Principal principal, HttpServletRequest request) {
        String username = SessionUtil.getUserInfo().getUsername();
        String role = "user";

        ModelAndView mv = null;


        UserResponse user = null;
        FirmResponse firmResponse = null;
        boolean isLawyer = UserUtil.isLawyer(username);
        if(formService.getFormByUrl(url) != null) {
            switch (url.toLowerCase()) {
                case "excessform":
                    mv = formModelService.getExcessModel(url, username, role);
                    if(isLawyer) {
                        user = userService.getUserDetails(username);
                    }
                    break;
                case "newapplicationform" :
                    user = userService.getUserDetails(username);
                    mv = formModelService.getNewApplicationFormAdmin(url, username, role, user);
                    break;
                case "address" :
                    user = userService.getUserDetails(username);
                    mv = formModelService.getAddressFormAdmin(url, username, role, user);
                    break;
                case "iropform" :
                    user = userService.getUserDetails(username);
                    mv = formModelService.getIropForm(url, username, role, user);
                    break;
                default:
                    break;
            }

            if (isLawyer && !user.isError()) {
                //user.setFirm(provider.firmDetailsByID(user.getFirmKey()).getFirm());
                user.setFirm(firmService.getFirmDetails(user.getFirmKey()).getFirm());

                boolean edit = false;
                if (user.getFirm().getFirmNumber().equals("000000") || user.getFirm().getFirmNumber().equals("960806") || user.getFirm() == null)
                {
                    edit = false;
                }else{
                    if (user.getFirm().getManagingLawyer().getLsoKey().equals(UserUtil.getLSONumberPartial(user.getLSONumber())))
                    {
                        edit = true;
                    }
                    if (user.getFirm().getClaimAdmin().getLsoKey().equals(UserUtil.getLSONumberPartial(user.getLSONumber())))
                    {
                        edit = true;
                    }
                    if (user.getFirm().getCpdContact().getLsoKey().equals(UserUtil.getLSONumberPartial(user.getLSONumber())))
                    {
                        edit = true;
                    }
                    if (user.getFirm().getOfficeManager().getLsoKey().equals(UserUtil.getLSONumberPartial(user.getLSONumber())))
                    {
                        edit = true;
                    }

                    if (user.getFirm().getManagingLawyer().getLsoKey().isEmpty() && user.getFirm().getClaimAdmin().getLsoKey().isEmpty() && user.getFirm().getCpdContact().getLsoKey().isEmpty() && user.getFirm().getOfficeManager().getLsoKey().isEmpty())
                    {
                        edit = true;
                    }
                }

                mv.addObject("user", user);
                mv.addObject("name", username);
                mv.addObject("edit", edit);

                HttpSession httpSession = request.getSession();
                UserOptionsResponse options = (UserOptionsResponse)httpSession.getAttribute("options");

                if (options.isError() && url.toLowerCase().equals("newapplicationform"))
                {
                    mv.setViewName("redirect:/userError?msg=" + options.getMessage());
                    return mv;
                }
                mv.addObject("options", options);
            }

            mv.addObject("confirmed", confirmed.equals("true") ? true : false);

            mv.addObject("confirmationNumber", confirmationNumber);

            return mv;
        } else {
            return new ModelAndView("redirect:/error");
        }
    }


}
