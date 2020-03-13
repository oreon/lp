package lawpro.models.universe.response;

import common.models.ResponseModel;

public class FormSubmitResponse extends ResponseModel {

    private String confirmationNumber;

    public String getConfirmationNumber() {
        return confirmationNumber;
    }

    public void setConfirmationNumber(String value) {
        confirmationNumber = value;
    }
}
