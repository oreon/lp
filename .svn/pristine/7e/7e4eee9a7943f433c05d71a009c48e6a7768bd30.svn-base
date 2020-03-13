package lawpro.providers.forms;

import com.google.gson.Gson;
import lawpro.data.*;
import lawpro.providers.UniverseProvider;
import lawpro.providers.lookups.LookupProvider;
import lawpro.services.forms.RequestService;
import lawpro.viewmodels.NewExcessFormViewModel;
import lawpro.models.universe.request.NewApplicationFormRequest;
import lawpro.models.universe.response.NewApplicationFormResponse;
import lawpro.repository.IFormRepository;
import lawpro.repository.IUserFormRepository;
import lawpro.viewmodels.NewApplicationFormViewModel;
import lawpro.viewmodels.irop.IropViewModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

import java.util.*;

@Configuration
public class FormProvider {

    @Autowired
    private IFormRepository repo;

    @Autowired
    private IUserFormRepository repoUserForms;
    
    public Form findByUrl(String url) {
        return repo.findByUrl(url).orElse(null);
    }

    public List<Form> formList()
    {
        List<Form> list = new ArrayList<Form>();
        repo.findAll().forEach(list::add);
        return list;
    }

    public Object getSavedForm(String userName, String formName)
    {
        List<UserForm> userForms = repoUserForms.findByUserName(userName);
        UserForm savedForm = userForms.stream().filter(x -> x.getFormName().equals(formName)).findFirst().orElse(null);
        Object form = null;
        if (savedForm != null)
        {
            Gson gson = new Gson();

            if(savedForm.getFormName().equalsIgnoreCase("newapplicationform")){
                form = gson.fromJson(savedForm.getFormData(), NewApplicationFormViewModel.class);
            } else if (savedForm.getFormName().equalsIgnoreCase("newexcessform")){
                form = gson.fromJson(savedForm.getFormData(), NewExcessFormViewModel.class);
            } else if (savedForm.getFormName().equalsIgnoreCase("iropform")) {
                form = gson.fromJson(savedForm.getFormData(), IropViewModel.class);

            }
        }

        return form;
    }

    public Form getFormByOldId(String id)
    {
        List<Form> forms = new ArrayList<>();
        repo.findAll().forEach(forms::add);
        return forms.stream().filter(x -> x.getOldId().equals(id)).findFirst().orElse(null);
    }

}
