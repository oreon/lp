package lawpro.models.universe.irop;

public class InterVevosTrust {

    private Boolean interVevosTrust;
    private Boolean writtenNotice;
    private String noNotificationReason;
    private InterVevos[] interVevos;

    public Boolean getInterVevosTrust() {
        return interVevosTrust;
    }

    public void setInterVevosTrust(Boolean interVevosTrust) {
        this.interVevosTrust = interVevosTrust;
    }

    public Boolean getWrittenNotice() {
        return writtenNotice;
    }

    public void setWrittenNotice(Boolean writtenNotice) {
        this.writtenNotice = writtenNotice;
    }

    public String getNoNotificationReason() {
        return noNotificationReason;
    }

    public void setNoNotificationReason(String noNotificationReason) {
        this.noNotificationReason = noNotificationReason;
    }

    public InterVevos[] getInterVevos() {
        return interVevos;
    }

    public void setInterVevos(InterVevos[] interVevos) {
        this.interVevos = interVevos;
    }
}
