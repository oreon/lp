package lawpro.models.universe.response;

import common.models.ResponseModel;
import lawpro.models.universe.excess.ExcessForm;
import lawpro.models.universe.Violation;
import lawpro.viewmodels.NewExcessFormViewModel;

import java.util.ArrayList;
import java.util.List;

public class NewExcessFormResponse extends ResponseModel {

    private NewExcessFormViewModel form;

    private List<Violation> violations;

    private String confirmation;

    private String createdDate;

    private String createdTime;

    public NewExcessFormResponse()
    {
        form = new NewExcessFormViewModel();
        violations = new ArrayList<>();
    }

    public NewExcessFormViewModel getForm() {
        return form;
    }

    public void setForm(NewExcessFormViewModel form) {
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
