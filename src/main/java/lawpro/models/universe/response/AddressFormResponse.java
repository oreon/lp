package lawpro.models.universe.response;

import common.models.ResponseModel;
import lawpro.models.universe.AddressForm;
import lawpro.models.universe.Violation;

import java.util.ArrayList;
import java.util.List;

public class AddressFormResponse extends ResponseModel {
    private AddressForm form;

    private List<Violation> violations;

    private String confirmation;

    private String createdDate;

    private String createdTime;

    public AddressFormResponse()
    {
        form = new AddressForm();
        violations = new ArrayList<>();
    }

    public AddressForm getForm() {
        return form;
    }

    public void setForm(AddressForm form) {
        this.form = form;
    }

    public List<Violation> getViolations() {
        return violations;
    }

    public void setViolations(List<Violation> violations) {
        this.violations = violations;
    }

    public String getConfirmation() {
        return confirmation;
    }

    public void setConfirmation(String confirmation) {
        this.confirmation = confirmation;
    }

    public String getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(String createdDate) {
        this.createdDate = createdDate;
    }

    public String getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(String createdTime) {
        this.createdTime = createdTime;
    }
}
