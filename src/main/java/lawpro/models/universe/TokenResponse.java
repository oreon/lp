package lawpro.models.universe;

public class TokenResponse {

    private String lsoKey;
    private boolean permitted;

    public String getLsoKey() {
        return lsoKey;
    }

    public void setLsoKey(String lsoKey) {
        this.lsoKey = lsoKey;
    }

    public boolean isPermitted() {
        return permitted;
    }

    public void setPermitted(boolean permitted) {
        this.permitted = permitted;
    }
}
