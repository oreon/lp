package lawpro.models.universe;

public class PolicyOptions {
    private PolicyOption deduc;
    private PolicyOption natureOfLawPractice;
    private PolicyOption partTimePractice;
    private PolicyOption restrictedAreaOfPractice;
    private PolicyOption repco;

    public PolicyOption getDeduc() {
        return deduc;
    }

    public void setDeduc(PolicyOption deduc) {
        this.deduc = deduc;
    }

    public PolicyOption getNatureOfLawPractice() {
        return natureOfLawPractice;
    }

    public void setNatureOfLawPractice(PolicyOption natureOfLawPractice) {
        this.natureOfLawPractice = natureOfLawPractice;
    }

    public PolicyOption getPartTimePractice() {
        return partTimePractice;
    }

    public void setPartTimePractice(PolicyOption partTimePractice) {
        this.partTimePractice = partTimePractice;
    }

    public PolicyOption getRestrictedAreaOfPractice() {
        return restrictedAreaOfPractice;
    }

    public void setRestrictedAreaOfPractice(PolicyOption restrictedAreaOfPractice) {
        this.restrictedAreaOfPractice = restrictedAreaOfPractice;
    }

    public PolicyOption getRepco() {
        return repco;
    }

    public void setRepco(PolicyOption repco) {
        this.repco = repco;
    }

    public PolicyOptions()
    {
        this.deduc = new PolicyOption();
        this.natureOfLawPractice = new PolicyOption();
        this.partTimePractice = new PolicyOption();
        this.restrictedAreaOfPractice = new PolicyOption();
        this.repco = new PolicyOption();
    }

}
