package lawpro.data.input;

import java.io.Serializable;

public class ChangePassword implements Serializable {

    private String username;
    private String password;

    public ChangePassword(){}

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
