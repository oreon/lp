package lawpro.models.letterheads;

public class LetterheadsSaveResponse {
    private Boolean isError;
    private String errorMessage;

    public LetterheadsSaveResponse(){}

    public LetterheadsSaveResponse(Boolean isError, String errorMessage) {
        this.isError = isError;
        this.errorMessage = errorMessage;
    }

    public Boolean getError() {
        return isError;
    }

    public void setError(Boolean error) {
        isError = error;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }
}
