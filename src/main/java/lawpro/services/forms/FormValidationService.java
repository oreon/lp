package lawpro.services.forms;

import lawpro.data.ErrorMessage;
import lawpro.models.universe.Violation;
import lawpro.models.universe.request.FirmFormRequest;
import lawpro.models.universe.request.NewApplicationFormRequest;
import lawpro.models.universe.request.AddressFormRequest;
import lawpro.models.universe.response.AddressFormResponse;
import lawpro.models.universe.response.FirmFormResponse;
import lawpro.models.universe.response.NewApplicationFormResponse;
import lawpro.models.universe.response.NewExcessFormResponse;
import lawpro.providers.ErrorMessageProvider;
import lawpro.providers.UniverseProvider;
import lawpro.repository.IErrorRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.UUID;

@Service
public class FormValidationService {

    private final Logger LOGGER = LoggerFactory.getLogger(FormValidationService.class);


    @Autowired
    private ErrorMessageProvider errorProvider;

    @Autowired
    private UniverseProvider universeProvider;

    @Autowired
    private IErrorRepository iErrorRepository;

//    public NewExcessFormResponse validateExcessForm(NewExcessFormRequest request){
//
//
//            NewExcessFormResponse response = universeProvider.validateNewExcessForm(request);
//
//            if(!response.getViolations().isEmpty()) {
//
//                response.setError(true);
//
//                ArrayList<Violation> violations = new ArrayList<>();
//                for (Violation violation : response.getViolations()) {
//                    Violation.Constraint constraint = violation.getConstraints().stream().findFirst().orElse(null);
//                    String errorMessageKey = violation.getName();
//                    if (constraint != null)
//                    {
//                        errorMessageKey += "_" + constraint.getType();
//                    }
//                    ErrorMessage errorMessage = getAndSetErrorMessage(errorMessageKey, violation.getMessage());
//                    Violation violationItem = new Violation();
//                    violationItem.setMessage(violation.getMessage()); //TODO: Pull directly from the API for now
//                    violationItem.setName(errorMessage.getKey());
//                    violations.add(violationItem);
//                }
//                response.setViolations(violations);
//                return response;
//            } else {
//                return response;
//            }
//
//
//    }

    public NewApplicationFormResponse validateNewApplicationForm(NewApplicationFormRequest request) {

        //Send to Universe API
            NewApplicationFormResponse response = universeProvider.validateNewApplicationForm(request);
            if (!response.getViolations().isEmpty()) {

                response.setError(true);

                //Replace violations with custom error messages
                ArrayList<Violation> violations = new ArrayList<>();
                for (Violation violation : response.getViolations()) {
                    Violation.Constraint constraint = violation.getConstraints().stream().findFirst().orElse(null);
                    String errorMessageKey = violation.getName();
                    errorMessageKey += "_" + violation.getCode();
                    ErrorMessage errorMessage = getAndSetErrorMessage(errorMessageKey, violation.getMessage());
                    Violation violationItem = new Violation();
                    violationItem.setMessage(violation.getMessage()); //TODO: This is temporarily turned off to pull from the DB, we are pulling directly from the violation API
                    violationItem.setName(errorMessage.getKey());
                    violations.add(violationItem);
                }
                response.setViolations(violations);

                return response;
            } else {
                return response;
            }

    }

    public AddressFormResponse validateAddressForm(AddressFormRequest request) {

        //Send to Universe API
            AddressFormResponse response = universeProvider.validateAddressForm(request);
            if (!response.getViolations().isEmpty()) {

                response.setError(true);

                //Replace violations with custom error messages
                ArrayList<Violation> violations = new ArrayList<>();
                for (Violation violation : response.getViolations()) {

                    String errorMessageKey = violation.getName();
                    errorMessageKey += "_" + violation.getCode();
                    ErrorMessage errorMessage = getAndSetErrorMessage(errorMessageKey, violation.getMessage());
                    Violation violationItem = new Violation();
                    violationItem.setMessage(violation.getMessage()); //TODO: Pulling directly from API right now
                    violationItem.setName(errorMessage.getKey());
                    violations.add(violationItem);
                }
                response.setViolations(violations);

                return response;
            } else {
                return response;
            }
    }

    public FirmFormResponse validateFirmForm(FirmFormRequest request) {

        //Send to Universe API
        FirmFormResponse response = universeProvider.validateFirmForm(request);
        if (!response.getViolations().isEmpty()) {

            response.setError(true);

            //Replace violations with custom error messages
            ArrayList<Violation> violations = new ArrayList<>();
            for (Violation violation : response.getViolations()) {

                String errorMessageKey = violation.getName();
                errorMessageKey += "_" + violation.getCode();
                ErrorMessage errorMessage = getAndSetErrorMessage(errorMessageKey, violation.getMessage());
                Violation violationItem = new Violation();
                violationItem.setMessage(violation.getMessage()); //TODO: Pulling directly from API right now
                violationItem.setName(errorMessage.getKey());
                violations.add(violationItem);
            }
            response.setViolations(violations);

            return response;
        } else {
            return response;
        }
    }


    public ErrorMessage getAndSetErrorMessage(String key, String message)
    {
        ErrorMessage existingMessage = iErrorRepository.findByKey(key).orElse(null);

        if (existingMessage == null)
        {
            ErrorMessage item = new ErrorMessage();
            item.setMessage(message);
            item.setKey(key);
            item.setImportedNew(true);
            item.setId(UUID.randomUUID().toString());

            iErrorRepository.save(item);

            return item;
        }else {
            existingMessage.setMessage(message);
            iErrorRepository.save(existingMessage);
            return existingMessage;
        }
    }
}
