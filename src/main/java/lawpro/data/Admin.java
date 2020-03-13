package lawpro.data;


import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBIgnore;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;

import javax.persistence.Id;
import javax.persistence.Transient;

@DynamoDBTable(tableName = "adminUsers")
public class Admin extends User {

    private String role;
    private String priv;
    private boolean isActive;

    public Admin(String firstName, String lastName, String email, String id, String username, String role, String priv, boolean isActive) {
        super(firstName, lastName, email, id, username);
        this.role = role;
        this.priv = priv;
        this.isActive = isActive;
    }

    public Admin(){}

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getPriv() {
        return priv;
    }

    public void setPriv(String priv) {
        this.priv = priv;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    @DynamoDBIgnore
    public String getFullRole(){
        return "ROLE_" + this.role;
    }

    @DynamoDBIgnore
    public String getFullPriv(){
        return "PRIV_" + this.priv;
    }
}
