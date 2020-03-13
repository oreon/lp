package lawpro.viewmodels.excess;

public class PredecessorFirmViewModel {

    private String rowId;
    private String number;
    private String name;
    private String city;
    private String province;
    private String inOperationFrom;
    private String inOperationTo;
    private String averageNumberOfLawyers;
    private boolean dissolved;

    public String getRowId() {
        return rowId;
    }

    public void setRowId(String rowId) {
        this.rowId = rowId;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getInOperationFrom() {
        return inOperationFrom;
    }

    public void setInOperationFrom(String inOperationFrom) {
        this.inOperationFrom = inOperationFrom;
    }

    public String getInOperationTo() {
        return inOperationTo;
    }

    public void setInOperationTo(String inOperationTo) {
        this.inOperationTo = inOperationTo;
    }

    public String getAverageNumberOfLawyers() {
        return averageNumberOfLawyers;
    }

    public void setAverageNumberOfLawyers(String averageNumberOfLawyers) {
        this.averageNumberOfLawyers = averageNumberOfLawyers;
    }

    public boolean isDissolved() {
        return dissolved;
    }

    public void setDissolved(boolean dissolved) {
        this.dissolved = dissolved;
    }
}
