package lawpro.providers;

import com.amazonaws.waiters.WaiterTimedOutException;
import lawpro.data.ErrorMessage;
import lawpro.repository.IErrorRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Configuration
public class ErrorMessageProvider {

    @Autowired
    private IErrorRepository repo;

    private static Logger LOGGER = LogManager.getLogger(ErrorMessageProvider.class);


    public List<ErrorMessage> getErrorMessages()
    {
        List<ErrorMessage> list = new ArrayList<>();

        try {
            repo.findAll().forEach(list::add);
        } catch (Exception e) {
            LOGGER.error("ErrorMessageProvider Error getErrorMessages()", e);
        }
        return list;
    }

    public ErrorMessage getErrorMessageByID(String id)
    {
        try{
            return repo.findById(id).orElse(null);
        } catch (Exception e) {
            LOGGER.error("ErrorMessageProvider Error: getErrorMessageByID. Request ID: " + id, e);
            return null;
        }
    }

    public ErrorMessage setErrorMessage(String key, String message)
    {
//        ErrorMessage existingMessage = repo.findByKey(key).orElse(null);

        ErrorMessage existingMessage = new ErrorMessage();
        existingMessage.setKey(key);
        existingMessage.setMessage(message);
        return existingMessage;

/*        if (existingMessage == null)
        {
            ErrorMessage item = new ErrorMessage();
            item.setId(UUID.randomUUID().toString());
            item.setMessage(message);
            item.setKey(key);

            repo.save(item);

            return item;
        }
        else
        {
            existingMessage.setMessage(message);
            repo.save(existingMessage);
            return existingMessage;
        }*/
    }

    public long getNewErrorMessageCount()
    {
        //return getErrorMessages().stream().filter(x -> x.isImportedNew()).count();

        return 0;
    }

    public ErrorMessage setErrorMessage(String key, String message, boolean importedNew)
    {
        //ErrorMessage existingMessage = repo.findByKey(key).orElse(null);

        ErrorMessage existingMessage = new ErrorMessage();
        existingMessage.setKey(key);
        existingMessage.setMessage(message);

        return existingMessage;
        /*
        if (existingMessage == null)
        {
            ErrorMessage item = new ErrorMessage();
            item.setMessage(message);
            item.setKey(key);
            item.setImportedNew(importedNew);
            item.setId(UUID.randomUUID().toString());

            repo.save(item);

            return item;
        }
        else
        {
            existingMessage.setMessage(message);
            repo.save(existingMessage);
            return existingMessage;
        }*/
    }

    public ErrorMessage getAndSetErrorMessage(String key, String message)
    {
        ErrorMessage existingMessage;
        try {
            existingMessage = repo.findByKey(key).orElse(null);
        } catch (Exception e){
            existingMessage = null;
            LOGGER.error("ErrorMessageProvider Error getAndSetErrorMessage(). Requested key: " + key, e);
        }
        if (existingMessage == null)
        {
            return setErrorMessage(key, message, true);
        }else
        {
            return existingMessage;
        }
    }

}
