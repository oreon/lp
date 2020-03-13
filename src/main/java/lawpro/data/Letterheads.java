package lawpro.data;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBIgnore;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import lawpro.repository.ILetterheadRepository;
import org.springframework.beans.factory.annotation.Autowired;

@DynamoDBTable(tableName = "letterheads")
public class Letterheads {

    @Autowired
    @DynamoDBIgnore
    private ILetterheadRepository iLetterheadRepository;

    @DynamoDBHashKey
    private String id;
    private String username;
    private String form;
    private String letterheadDetails;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getForm() {
        return form;
    }

    public void setForm(String form) {
        this.form = form;
    }

    public String getLetterheadDetails() {
        return letterheadDetails;
    }

    public void setLetterheadDetails(String letterheadDetails) {
        this.letterheadDetails = letterheadDetails;
    }
}
