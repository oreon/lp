package lawpro.viewmodels.excess;

public class RelatedFirmViewModel {

    private String rowId;
    private String name;
    private String address;
    private int numberOfLawyers;
    private String natureOfPractice;

    public String getRowId() {
        return rowId;
    }

    public void setRowId(String rowId) {
        this.rowId = rowId;
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

    public int getNumberOfLawyers() {
        return numberOfLawyers;
    }

    public void setNumberOfLawyers(int numberOfLawyers) {
        this.numberOfLawyers = numberOfLawyers;
    }

    public String getNatureOfPractice() {
        return natureOfPractice;
    }

    public void setNatureOfPractice(String natureOfPractice) {
        this.natureOfPractice = natureOfPractice;
    }
}
