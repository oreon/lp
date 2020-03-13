package lawpro.services.letterhead;

import lawpro.models.letterheads.LetterheadsSaveResponse;
import lawpro.providers.forms.RequestProvider;
import org.apache.commons.io.FileUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
public class LetterheadService {

    private static Logger LOGGER = LogManager.getLogger(LetterheadService.class);


    @Value("${letterhead.data.path}")
    private String LETTERHEAD_PATH;

    @Autowired
    private RequestProvider requestProvider;

    public HashMap<String, ArrayList<MultipartFile>> groupExcessLetterheads(ArrayList<MultipartFile> applicantLetterheads, ArrayList<MultipartFile> assocLetterheads, ArrayList<MultipartFile> manCompanyLetterheads) {
        HashMap<String, ArrayList<MultipartFile>> letterheads = new HashMap<>();
        letterheads.put("applicantLetterheads", applicantLetterheads);
        letterheads.put("assocLetterheads", assocLetterheads);
        letterheads.put("manCompanyLetterheads", manCompanyLetterheads);
        return letterheads;
    }

    public LetterheadsSaveResponse saveFilesForCCSubmit(String username, ArrayList<MultipartFile> applicantLetterheads, ArrayList<MultipartFile> assocLetterheads,
                                        ArrayList<MultipartFile> manCompanyLetterheads) {

        LetterheadsSaveResponse response = new LetterheadsSaveResponse();
        response.setError(false);
        File directory = new File(LETTERHEAD_PATH + username);

        try {
            if(directory.exists()) {
                FileUtils.deleteDirectory(directory);
            }

            directory.mkdir();
            File applicantDirectory = new File(directory.getPath() + "/applicantLetterheads");
            File assocDirectory = new File(directory.getPath() + "/assocLetterheads");
            File manCompanyLetterhead = new File(directory.getPath() + "/manCompanyLetterheads");
            //wierd stuff
            applicantDirectory.mkdir();
            assocDirectory.mkdir();
            manCompanyLetterhead.mkdir();

        } catch (Exception e) {
            System.out.println(e);
            LOGGER.error(e);
        }

        try {
            saveLetterheadsToUserDirectory(username, applicantLetterheads, "applicantLetterheads");
        } catch(Exception e) {
            LOGGER.error(this.getClass() + " Unable to save applicant letterheads to server", e);
            response.setError(true);
            response.setErrorMessage(e.getMessage());
        }


        try {
            saveLetterheadsToUserDirectory(username, assocLetterheads, "assocLetterheads");
        } catch (Exception e) {
            LOGGER.error(this.getClass() + " Unable to save assoc letterheads to server", e);
            response.setError(true);
            response.setErrorMessage(e.getMessage());
        }

        try {
            saveLetterheadsToUserDirectory(username, manCompanyLetterheads, "manCompanyLetterheads");
        } catch (Exception e) {
            LOGGER.error(this.getClass() + " Unable to save management company letterheads to server", e);
            response.setError(true);
            response.setErrorMessage(e.getMessage());
        }

        return response;
    }

    public HashMap<String, List<File>> getUserLetterheads (String username) {
        HashMap<String, List<File>> files = new HashMap<>();

        files.put("applicantLetterheads", getLetterheadsFromFolder(username, "applicantLetterheads"));
        files.put("assocLetterheads", getLetterheadsFromFolder(username, "assocLetterheads"));
        files.put("manCompanyLetterheads", getLetterheadsFromFolder(username, "manCompanyLetterheads"));



        return files;
    }

    private void saveLetterheadsToUserDirectory(String username, ArrayList<MultipartFile> files, String category) throws Exception{
        for (MultipartFile file : files) {
            String[] fileNameSplit = file.getOriginalFilename().split("\\\\");
            File newFile = new File(LETTERHEAD_PATH + username + "/" + category + "/" + fileNameSplit[fileNameSplit.length - 1]);
            newFile.createNewFile();
            FileOutputStream fos = new FileOutputStream(newFile);
            fos.write(file.getBytes());
            fos.close();
        }
    }

    public List<File> getLetterheadsFromFolder(String username, String folder) {
        List<File> files = new ArrayList<>();
        File directory = new File(LETTERHEAD_PATH + username + "/" + folder);
        if(directory.exists()) {
            for(File file : directory.listFiles()) {
                files.add(file);
            }
        }

        return files;
    }


}
