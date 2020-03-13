package lawpro.services.forms;

import lawpro.models.universe.response.NewApplicationFormResponse;
import lawpro.providers.forms.FormProvider;
import lawpro.providers.UniverseProvider;
import lawpro.utils.UserUtil;
import lawpro.viewmodels.NewApplicationFormViewModel;
import lawpro.viewmodels.NewExcessFormViewModel;
import lawpro.viewmodels.UserDetails;
import lawpro.viewmodels.irop.IropViewModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FormDetailsService {

    @Autowired
    private FormProvider formProvider;

    @Autowired
    private UniverseProvider universeProvider;

    public NewExcessFormViewModel getExcessFormDetails(UserDetails userDetails) {

        NewExcessFormViewModel userForm = (NewExcessFormViewModel) formProvider.getSavedForm(userDetails.getUserName(), userDetails.getFormName());

        if (userForm != null) {
            userForm.setFound(true);
            return userForm;
        }

        return universeProvider.excessForm().getForm();

    }

    public NewApplicationFormViewModel getNewApplicationDetails(UserDetails userDetails) {
        NewApplicationFormViewModel userForm = (NewApplicationFormViewModel)formProvider.getSavedForm(userDetails.getUserName(), userDetails.getFormName());

        if (userForm != null)
        {
            userForm.setFound(true);
            return userForm;
        }

        //Get defaults for this user from universe
        UniverseProvider provider = new UniverseProvider();
        NewApplicationFormResponse response  = provider.newApplicationForm(userDetails.getUserName());

        if (!response.isError())
        {
            return response.getForm();
        }
        else{
            return null;
        }
    }

    public IropViewModel getIropDetails(String username) {
        IropViewModel userForm = (IropViewModel) formProvider.getSavedForm(username, "IropForm");
        if(userForm != null) {
            userForm.setFound(true);
            return userForm;
        }

        return universeProvider.iropForm().getForm();
    }


}
