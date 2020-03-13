package lawpro.services.forms;

import lawpro.models.universe.MemberContact;
import lawpro.models.universe.request.AddressFormRequest;
import lawpro.models.universe.request.ExcessRequest;
import lawpro.models.universe.request.FirmFormRequest;
import lawpro.models.universe.request.NewApplicationFormRequest;
import lawpro.models.universe.response.FirmResponse;
import lawpro.models.universe.response.UserResponse;
import lawpro.providers.forms.RequestProvider;
import lawpro.viewmodels.AddressFormViewModel;
import lawpro.viewmodels.FirmFormViewModel;
import lawpro.viewmodels.NewApplicationFormViewModel;
import lawpro.viewmodels.NewExcessFormViewModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RequestService {

    @Autowired
    private RequestProvider requestProvider;

    public NewApplicationFormRequest formatNewApplicationRequest(NewApplicationFormViewModel form, String token) {
        return requestProvider.getFormattedNewApplicationRequest(form, token);
    }

    public AddressFormRequest formatAddressFormRequest(AddressFormViewModel form) {
        return requestProvider.formatAddressFormRequest(form);
    }

    public FirmFormRequest formatFirmFormRequest(FirmFormViewModel form)
    {
        return requestProvider.formatFirmFormRequest(form);
    }

    public MemberContact formatMemberDetails(UserResponse response)
    {
        return requestProvider.getFormattedMemberContact(response);
    }

    public ExcessRequest formExcessRequest (NewExcessFormViewModel form, String token, FirmResponse firmResponse) {
        return requestProvider.getFormattedExcessFormRequest(form, token, firmResponse);
    }

}
