package lawpro.data;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAutoGeneratedKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBIgnore;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import lawpro.repository.IFormQuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;

import java.util.List;

@DynamoDBTable(tableName = "forms")
public class Form {

    @DynamoDBHashKey
    private String id;
    private String name;
    private String url;

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Autowired
    @DynamoDBIgnore
    private IFormQuestionRepository repo;

    @Transient
    @DynamoDBIgnore
    private List<FormQuestion> questions;

    @Transient
    @DynamoDBIgnore
    public List<FormQuestion> getQuestions() {
        return questions;
    }

    @Transient
    @DynamoDBIgnore
    public void setLookups(List<FormQuestion> questions) {
        this.questions = questions;
    }

    private String oldId;

    public String getOldId() {
        return oldId;
    }

    public void setOldId(String oldId) {
        this.oldId = oldId;
    }
}


