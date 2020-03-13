package lawpro.services.forms;

import lawpro.models.UserInfo;
import lawpro.models.universe.Contact;
import lawpro.models.universe.MemberContact;
import lawpro.models.universe.Notification;
import lawpro.models.universe.irop.IropRequest;
import lawpro.models.universe.request.AddressFormRequest;
import lawpro.models.universe.request.ExcessRequest;
import lawpro.models.universe.request.FirmFormRequest;
import lawpro.models.universe.request.NewApplicationFormRequest;
import lawpro.models.universe.response.*;
import lawpro.providers.UniverseProvider;
import lawpro.providers.forms.RequestProvider;
import lawpro.utils.SessionUtil;
import lawpro.utils.UserUtil;
import lawpro.viewmodels.AddressFormViewModel;
import lawpro.viewmodels.FirmFormViewModel;
import lawpro.viewmodels.NewApplicationFormViewModel;
import lawpro.viewmodels.NewExcessFormViewModel;
import lawpro.viewmodels.irop.IropViewModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
public class FormSubmitService {

    @Autowired
    private RequestService requestService;

    @Autowired
    private RequestProvider requestProvider;

    @Autowired
    private UniverseProvider universeProvider;

    public NewApplicationFormResponse submit(NewApplicationFormViewModel form, String token) {
        if (token.length() > 1)
            form.setAccountNumber(token);

        NewApplicationFormRequest request = new NewApplicationFormRequest();

        request = requestService.formatNewApplicationRequest(form, token);

        //Get member contact details
        UserResponse userResponse = universeProvider.userDetails(form.getLSONumber());

        if (userResponse != null)
        {
            request.setMemberContact(requestService.formatMemberDetails(userResponse));
        }

        //Send to Universe API
        return universeProvider.submitForm(request);

    }

    public AddressFormResponse submitAddress(AddressFormViewModel form) {

        AddressFormRequest request = new AddressFormRequest();

        request = requestService.formatAddressFormRequest(form);

        //Send to Universe API
        return universeProvider.submitAddressForm(request);


    }

    public FirmFormResponse submitFirm(FirmFormViewModel form)
    {
        FirmFormRequest request = new FirmFormRequest();

        request = requestService.formatFirmFormRequest(form);

        return universeProvider.submitFirmForm(request);
    }

    public NewExcessFormResponse submitExcessForm(NewExcessFormViewModel form, String token, HashMap<String, ArrayList<MultipartFile>> letterheads) {

        UserInfo userInfo = SessionUtil.getUserInfo();

        UserResponse userResponse = SessionUtil.getUserResponse();

        ExcessRequest excessRequest = requestProvider.getFormattedExcessFormRequest(form, token, userInfo.getFirm());

        HashMap<String, List<File>> formattedLetterheads = requestProvider.formatExcessLetterheads(letterheads);


        excessRequest.setNotifications(requestProvider.getFormattedNotifications());



        MemberContact memberContact = requestProvider.getFormattedMemberContact(userResponse);

        excessRequest.setMemberContact(memberContact);

         //TODO deal with this
//        if(userResponse != null) {
//            request.setMemberContact(requestService.formatMemberDetails(userResponse));
//        }

        return universeProvider.submitExcess(excessRequest, formattedLetterheads);
    }

    public IropResponse submitIropForm(IropViewModel model, String token) {
        IropRequest request = new IropRequest();
        request.setForm(requestProvider.formatIropForm(model, token));

        UserResponse userResponse = universeProvider.userDetails(model.getUserId());
        request.setMemberContact(requestProvider.getFormattedMemberContact(userResponse));

        request.setNotifications(requestProvider.getFormattedNotifications());

        return universeProvider.submitIropForm(request);
    }


}
