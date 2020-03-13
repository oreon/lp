package lawpro.models.universe;

import lawpro.utils.UserUtil;

public class FirmContact {

    private String firstName;
    private String lastName;
    private String title;
    private String lsoKey;
    private String email;

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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getLsoKey() {

        if (lsoKey != null && !lsoKey.isEmpty())
        {
            return UserUtil.getLSONumberPartial(lsoKey);
        }else
        {
            if (!this.firstName.isEmpty())
            {
                return "Non-lawyer";
            }
        }

        return lsoKey;
    }

    public void setLsoKey(String lsoKey) {
        this.lsoKey = lsoKey;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public FirmContact()
    {
        this.email = "";
        this.firstName = "";
        this.lastName = "";
        this.title = "";
        this.lsoKey = "";
    }

}

