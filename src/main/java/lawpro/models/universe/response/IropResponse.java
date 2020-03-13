package lawpro.models.universe.response;

import common.models.ResponseModel;
import lawpro.models.universe.Violation;
import lawpro.models.universe.irop.IropForm;
import lawpro.viewmodels.NewExcessFormViewModel;
import lawpro.viewmodels.irop.IropViewModel;

import java.util.ArrayList;
import java.util.List;

public class IropResponse extends ResponseModel {

    private IropViewModel form;
    private List<Violation> violations;

    private String confirmation;

    private String createdDate;

    private String createdTime;

    public IropViewModel getForm() {
        return form;
    }

    public void setForm(IropViewModel form) {
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
