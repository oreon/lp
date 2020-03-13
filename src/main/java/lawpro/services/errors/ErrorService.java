package lawpro.services.errors;

import common.models.RequestModel;
import lawpro.data.ErrorMessage;
import lawpro.models.ErrorModel;
import lawpro.providers.ErrorMessageProvider;
import lawpro.repository.IErrorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ErrorService {

    @Autowired
    private ErrorMessageProvider errorMessageProvider;

    @Autowired
    private IErrorRepository iErrorRepository;

    public List<ErrorMessage> getErrorMessages() {
        return errorMessageProvider.getErrorMessages();
    }

    public ErrorMessage getErrorMessageByID(String id) {
        return errorMessageProvider.getErrorMessageByID(id);
    }

    public ErrorMessage addError(ErrorModel error) {
        //TODO: Validate data
        ErrorMessage errorMessage = new ErrorMessage();
        errorMessage.setImportedNew(false);
        errorMessage.setMessage(error.getMessage());
        errorMessage.setKey(error.getKey());

        return iErrorRepository.save(errorMessage);
    }

    public ErrorMessage editError(ErrorModel error) {
        //TODO: Validate data
        ErrorMessage errorItem = iErrorRepository.findById(error.getId()).orElse(null);

        if (errorItem != null) {
            errorItem.setMessage(error.getMessage());
            errorItem.setKey(error.getKey());
            errorItem.setImportedNew(false);

            iErrorRepository.save(errorItem);
        }

        return errorItem;
    }

    public boolean deleteError(RequestModel request) {
        ErrorMessage error = iErrorRepository.findById(request.getId()).orElse(null);

        if (error != null) {
            iErrorRepository.delete(error);
            return true;
        }

        return false;
    }

    public long getNewErrorMessageCount() {
        return errorMessageProvider.getNewErrorMessageCount();
    }

}
