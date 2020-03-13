package common.models;

import java.io.Serializable;

public class RequestModel implements Serializable {

    private transient String id;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
