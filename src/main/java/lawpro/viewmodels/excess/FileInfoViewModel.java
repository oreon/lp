package lawpro.viewmodels.excess;

public class FileInfoViewModel {
    private String source;
    private String description;
    private FileDetailViewModel[] files;

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public FileDetailViewModel[] getFiles() {
        return files;
    }

    public void setFiles(FileDetailViewModel[] files) {
        this.files = files;
    }
}
