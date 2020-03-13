package lawpro.data;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAutoGeneratedKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import org.springframework.data.annotation.Id;

@DynamoDBTable(tableName = "errors")
public class ErrorMessage {

    @DynamoDBHashKey
    private String id;
    private String key;
    private String message;
    private boolean importedNew;

    public boolean isImportedNew() {
        return importedNew;
    }

    public void setImportedNew(boolean importedNew) {
        this.importedNew = importedNew;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }
}


