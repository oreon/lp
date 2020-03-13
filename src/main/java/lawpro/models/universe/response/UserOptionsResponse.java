package lawpro.models.universe.response;

import lawpro.models.universe.PolicyOption;
import lawpro.models.universe.PolicyOptions;

public class UserOptionsResponse {
    private String insuredId;
    private PolicyOptions policyOptions;
    private String code;
    private boolean isError;
    private String message;

    public String getInsuredId() {
        return insuredId;
    }

    public void setInsuredId(String insuredId) {
        this.insuredId = insuredId;
    }

    public PolicyOptions getPolicyOptions() {
        return policyOptions;
    }

    public void setPolicyOptions(PolicyOptions policyOptions) {
        this.policyOptions = policyOptions;
    }

    public UserOptionsResponse()
    {
        this.policyOptions = new PolicyOptions();
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public boolean isError() {
        return isError;
    }

    public void setError(boolean error) {
        isError = error;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
