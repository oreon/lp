package lawpro.controllers;

import com.google.gson.Gson;
import lawpro.data.UserForm;
import lawpro.models.UserInfo;
import lawpro.models.universe.Contact;
import lawpro.models.universe.MemberContact;
import lawpro.models.universe.Notification;
import lawpro.models.universe.request.ExcessRequest;
import lawpro.models.universe.response.*;
import lawpro.providers.UniverseProvider;
import lawpro.providers.forms.RequestProvider;
import lawpro.repository.IUserFormRepository;
import lawpro.services.forms.FormService;
import lawpro.services.letterhead.LetterheadService;
import lawpro.services.UserService;
import lawpro.services.forms.FormSubmitService;
import lawpro.services.forms.RequestService;
import lawpro.utils.SessionUtil;
import lawpro.utils.UserUtil;
import lawpro.viewmodels.NewExcessFormViewModel;
import lawpro.viewmodels.irop.IropViewModel;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.security.Principal;
import java.util.*;

@Controller
public class MonerisController {

    @Autowired
    private IUserFormRepository repo;

    @Autowired
    private FormSubmitService submitService;

    @Autowired
    private LetterheadService letterheadService;

    @Autowired
    private UniverseProvider universeProvider;

    @Autowired
    private RequestProvider requestProvider;

    @Autowired
    private UserService userService;

    @Autowired
    private RequestService requestService;

    @Autowired
    private FormService formService;

    private static Logger LOGGER = LogManager.getLogger(MonerisController.class);

    @GetMapping("/monerispayment")
    @CrossOrigin
    public String returnFromMoneris(HttpServletRequest request, Principal principal) {
        String formName = request.getParameter("form_name");
        String token = request.getParameter("data_key");
        UserInfo userInfo = SessionUtil.getUserInfo();
        LOGGER.info("Moneris return token for the user " + userInfo.getUsername() + " is :" + token);
        String username = userInfo.getUsername();

        Gson gson = new Gson();

        List<UserForm> userForm = repo.findByUserName(userInfo.getUsername());

        UserForm excessForm = userForm.stream().filter(x -> x.getFormName().equals(formName)).findFirst().orElse(null);

        HashMap<String, List<File>> files = letterheadService.getUserLetterheads(username);
        FirmResponse firmResponse = null;
        NewExcessFormViewModel model = gson.fromJson(excessForm.getFormData(), NewExcessFormViewModel.class);
        UserResponse userResponse = userService.getUserDetails(username);

        if (UserUtil.isLawyer(model.getUserId())) {
            firmResponse = userService.getFirmDetailsById(userResponse.getFirmKey());
        } else {
            firmResponse =  userService.getFirmDetailsById(model.getUserId());
        }
        ExcessRequest excessRequest = requestService.formExcessRequest(model, token, firmResponse);

        List<Notification> notifications = new ArrayList<>();
        Notification notification = new Notification();
        notification.setFirstName(userResponse.getContactName().getFirstName());
        notification.setLastName(userResponse.getContactName().getLastName());
        notification.setType("confirmation");

        Contact contact = new Contact();
        contact.setContactType("EMAIL");
        contact.setValue(userResponse.getEmail());
        notification.setContactInfo(contact);
        notifications.add(notification);

        excessRequest.setNotifications(notifications);


        MemberContact memberContact = requestProvider.getFormattedMemberContact(userResponse);

        excessRequest.setMemberContact(memberContact);

        NewExcessFormResponse response = universeProvider.submitExcess(excessRequest, files);

        if (response != null && !response.isError())
        {
            formService.deleteSavedForms(model.getUserId(), "NewExcessForm");
            return "redirect:forms/excessform?confirmed=true&confirmationNumber=" + response.getConfirmation() + "&confirmedDate=" + response.getCreatedDate();
        }else
        {
            return "redirect:error?message=" + response.getMessage();
        }
    }

    @GetMapping("/iropmonerisreturn")
    @CrossOrigin
    public String monerisIropReturn(HttpServletRequest request)  {
        UserInfo userInfo = SessionUtil.getUserInfo();
        List<UserForm> userForms = repo.findByUserName(userInfo.getUsername());
        UserForm userForm = userForms.stream().filter(x -> x.getFormName().equals("IropForm")).findFirst().orElse(null);

        if (userForm != null)
        {
            Gson gson = new Gson();
            IropViewModel form = gson.fromJson(userForm.getFormData(), IropViewModel.class);
            if (form != null)
            {
                String token = request.getParameter("data_key");
                IropResponse response = submitService.submitIropForm(form, token);
                if (response != null && !response.isError()) {
                    formService.deleteSavedForms(form.getUserId(), "IropForm");
                    return "redirect:forms/iropform?confirmed=true&confirmationNumber=" + response.getConfirmation() + "&confirmedDate=" + response.getCreatedDate();
                }else {
                    return "redirect:error?message=" + response.getMessage();
                }
            }
        }
        return "redirect:error";
    }
}
