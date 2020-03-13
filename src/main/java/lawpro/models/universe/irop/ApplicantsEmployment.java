package lawpro.models.universe.irop;

public class ApplicantsEmployment {

    private String position;
    private String firmName;
    private String startYear;
    private String endYear;

    public ApplicantsEmployment() {

    }

    public ApplicantsEmployment(String position, String firmName, String startYear, String endYear) {
        this.position = position;
        this.firmName = firmName;
        this.startYear = startYear;
        this.endYear = endYear;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getFirmName() {
        return firmName;
    }

    public void setFirmName(String firmName) {
        this.firmName = firmName;
    }

    public String getStartYear() {
        return startYear;
    }

    public void setStartYear(String startYear) {
        this.startYear = startYear;
    }

    public String getEndYear() {
        return endYear;
    }

    public void setEndYear(String endYear) {
        this.endYear = endYear;
    }
}
