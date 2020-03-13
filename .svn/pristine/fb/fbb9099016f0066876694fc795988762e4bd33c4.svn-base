package lawpro.models;


import lawpro.models.universe.response.FirmResponse;
import lawpro.models.universe.response.UserResponse;
import lawpro.utils.UserUtil;

public class UserInfo {

    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private Boolean isLawyer;
    private Boolean isFirm;
    private Boolean isAdmin;
    private String lastForm;
    private FirmResponse firm;
    private String key;
    private UserResponse user;

    public UserInfo() {
    }

    public UserInfo(String username, String firstName, String lastName, String email, Boolean isLawyer,
                    Boolean isFirm, Boolean isAdmin, String lastForm, FirmResponse firm, String key, UserResponse user) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.isLawyer = isLawyer;
        this.isFirm = isFirm;
        this.isAdmin = isAdmin;
        this.lastForm = lastForm;
        this.firm = firm;
        this.key = key;
        this.user = user;

    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setIsLawyer(Boolean isLawyer) {
        this.isLawyer = isLawyer;
    }

    public Boolean isLawyer() {
        return this.isLawyer;
    }

    public void setIsFirm(Boolean isFirm) {
        this.isFirm = isFirm;
    }

    public Boolean isFirm() {
        return this.isFirm;
    }

    public void setIsAdmin(Boolean isAdmin) {
        this.isAdmin = isAdmin;
    }

    public Boolean isAdmin() {
        return this.isAdmin;
    }

    public String getLastForm() {
        return lastForm;
    }

    public void setLastForm(String lastForm) {
        this.lastForm = lastForm;
    }

    public FirmResponse getFirm() {
        return firm;
    }

    public void setFirm(FirmResponse firm) {
        this.firm = firm;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getLSONumberPartial() {
        return UserUtil.getLSONumberPartial(this.username);
    }

    public UserResponse getUser() {
        return user;
    }

    public void setUser(UserResponse user) {
        this.user = user;
    }
}
