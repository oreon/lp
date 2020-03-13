package lawpro.controllers.rest;

import com.google.gson.Gson;
import lawpro.models.letterheads.LetterheadsSaveResponse;
import lawpro.models.universe.response.*;
import lawpro.services.FirmService;
import lawpro.services.letterhead.LetterheadService;
import lawpro.services.forms.*;
import lawpro.utils.SessionUtil;
import lawpro.utils.UserUtil;
import lawpro.viewmodels.*;
import lawpro.viewmodels.irop.IropViewModel;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.ws.rs.Produces;
import java.util.ArrayList;
import java.util.HashMap;

@RestController
@Produces("application/json")
public class FormRestController {



    @Autowired
    private FormSaveService saveService;

    @Autowired
    private FormSubmitService submitService;

    @Autowired
    private FormService formService;

    @Autowired
    private FormDetailsService formDetailsService;

    @Autowired
    private FirmService firmService;

    @Autowired
    private QuestionService questionService;

    @Autowired
    private LetterheadService letterheadService;

    @Autowired
    private Gson gson;

    private static Logger LOGGER = LogManager.getLogger(FormRestController.class);

    /* Submit Forms */
    @PostMapping("/forms/submit/firm")
    public FirmFormResponse submitFirm(@ModelAttribute FirmFormViewModel form) {
        LOGGER.info("FormRestController submitFirm() : JSON: " + new Gson().toJson(form));
        formService.deleteSavedForms(form.getFirmName(), "FirmForm");
        saveService.saveFirmForm(form);
        return submitService.submitFirm(form);
    }

    @PostMapping("/forms/submit/newapplicationform")
    public NewApplicationFormResponse submitNewApplication(@ModelAttribute NewApplicationFormViewModel form) {
        LOGGER.info("FormRestController submitNewApplicationForm() : JSON: " + new Gson().toJson(form));
        NewApplicationFormResponse response = submitService.submit(form, "");
        if (response != null) {
            formService.deleteSavedForms(form.getUserName(), "NewApplicationForm");
        }
        return response;
    }

    @PostMapping("/forms/submit/excessform")
    public NewExcessFormResponse submitExcessForm(@RequestParam String form, @RequestParam("applicantLetterheads") ArrayList<MultipartFile> applicantLetterheads,
                                                  @RequestParam("assocLetterheads") ArrayList<MultipartFile> assocLetterheads,
                                                  @RequestParam("manCompanyLetterheads") ArrayList<MultipartFile> manCompanyLetterheads) {
        LOGGER.info("FormRestController submitExcessForm() : JSON:" + form);
        NewExcessFormViewModel model = gson.fromJson(form, NewExcessFormViewModel.class);
        formService.deleteSavedForms(model.getUserId(), "NewExcessForm");
        saveService.saveExcessForm(model);
        NewExcessFormResponse response = submitService.submitExcessForm(model, "", letterheadService.groupExcessLetterheads(applicantLetterheads, assocLetterheads, manCompanyLetterheads));
        if(response != null) {
           formService.deleteSavedForms(model.getUserId(), "NewExcessForm");
        }

        return response;
    }

    @PostMapping("/forms/submit/irop")
    public IropResponse submitIropForm(@RequestBody String json) {
        LOGGER.info("FormRestController submitIropForm() : JSON: " + json);
        IropViewModel model = gson.fromJson(json, IropViewModel.class);
        formService.deleteSavedForms(model.getUserId(), "IropForm");
        saveService.saveIropForm(model);
        IropResponse response = submitService.submitIropForm(model, "");

        if(response != null) {
           formService.deleteSavedForms(model.getUserId(), "IropForm");
        }
        return response;
    }

    /* Get Form Details */
    @GetMapping("/forms/details/newapplicationform")
    public NewApplicationFormViewModel getNewApplicationFormDetails(@ModelAttribute UserDetails userDetails) {
        return formDetailsService.getNewApplicationDetails(userDetails);
    }

    @GetMapping("/forms/details/newexcessform")
    public NewExcessFormViewModel getNewExcessFormDetails(@ModelAttribute UserDetails userDetails) {
        return formDetailsService.getExcessFormDetails(userDetails);
    }

    @GetMapping("/forms/firms/search")
    public FirmSearchResponse firmSearch(String searchTerm, String firmNumber) {
        return firmService.searchFirm(searchTerm, firmNumber);
    }

    @GetMapping("/forms/firms/details")
    public FirmResponse firmDetails(String firmNumber) throws Exception {
        return firmService.getFirmDetails(firmNumber);
    }

    @GetMapping("/forms/details/iropform")
    public IropViewModel getIropDetails (@ModelAttribute UserDetails userDetails) {
        String username = SessionUtil.getUsername();
        return formDetailsService.getIropDetails(username);
    }

    @PostMapping("/forms/update/questionText")
    public Boolean updateQuestionText(String id, String text)
    {
        return questionService.updateQuestionText(id, text);
    }

    @PostMapping("/forms/update/questionInstructions")
    public Boolean updateQuestionInstructions(String id, String text) {
        return questionService.updateQuestionInstructions(id, text);
    }

    @PostMapping("/forms/update/questionHelp")
    public Boolean updateQuestionHelp(String id, String text)
    {
        return questionService.updateQuestionHelpText(id, text);
    }

    @GetMapping("/forms/excessform/firmDetailsLawyer")
    public String getFirmDetailsByLawyer(String lso) {
        FirmResponse firmResponse = firmService.getFirmDetailsByUser(lso);
        return gson.toJson(firmResponse);
    }

    @GetMapping("/forms/excessform/firmDetailsFirm")
    public String getFirmDetailsByFirm(String firmId) {
        return gson.toJson(firmService.getFirmDetailsByFirm(firmId));
    }

    @PostMapping("/forms/submit/excessformcc")
    public LetterheadsSaveResponse submitExcessCC(@RequestParam("applicantLetterheads") ArrayList<MultipartFile> applicantLetterheads,
                                                  @RequestParam("assocLetterheads") ArrayList<MultipartFile> assocLetterheads,
                                                  @RequestParam("manCompanyLetterheads") ArrayList<MultipartFile> manCompanyLetterheads,
                                                  @RequestParam("username") String username){
        return letterheadService.saveFilesForCCSubmit(username, applicantLetterheads, assocLetterheads, manCompanyLetterheads);
    }
}
