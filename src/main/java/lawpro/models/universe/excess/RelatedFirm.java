package lawpro.models.universe.excess;

public class RelatedFirm {

    private String name;
    private String address;
    private Integer numberOfLawyers;
    private String natureOfPractice;

    public RelatedFirm() {
    }

    public RelatedFirm(String name, String address, Integer numberOfLawyers, String natureOfPractice) {
        this.name = name;
        this.address = address;
        this.numberOfLawyers = numberOfLawyers;
        this.natureOfPractice = natureOfPractice;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getNumberOfLawyers() {
        return numberOfLawyers;
    }

    public void setNumberOfLawyers(Integer numberOfLawyers) {
        this.numberOfLawyers = numberOfLawyers;
    }

    public String getNatureOfPractice() {
        return natureOfPractice;
    }

    public void setNatureOfPractice(String natureOfPractice) {
        this.natureOfPractice = natureOfPractice;
    }
}
