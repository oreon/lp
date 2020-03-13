package lawpro.services.forms;

import lawpro.data.Form;
import lawpro.data.FormQuestion;
import lawpro.data.Lookup;
import lawpro.data.LookupValue;
import lawpro.models.UserInfo;
import lawpro.models.universe.Address;
import lawpro.models.universe.Firm;

import lawpro.models.universe.FirmContact;
import lawpro.models.universe.response.FirmResponse;
import lawpro.models.universe.response.LawyerSearchResponse;
import lawpro.models.universe.response.UserOptionsResponse;
import lawpro.models.universe.response.UserResponse;
import lawpro.providers.UniverseProvider;
import lawpro.providers.forms.AdminFormModelProvider;
import lawpro.providers.forms.FormProvider;
import lawpro.providers.forms.FormQuestionProvider;
import lawpro.providers.lookups.LookupProvider;
import lawpro.utils.SessionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.ModelAndView;

import java.util.Comparator;
import java.util.List;

@Service
public class FormModelService {

    @Autowired
    private LookupProvider lookupProvider;

    @Autowired
    private FormQuestionProvider formQuestionProvider;

    @Autowired
    private UniverseProvider universeProvider;

    @Autowired
    private FormProvider formProvider;

    @Autowired
    private AdminFormModelProvider adminModelProvider;

    public ModelAndView getExcessModel(String url, String username, String role) {

        ModelAndView mv = new ModelAndView();
        UserInfo userInfo = SessionUtil.getUserInfo();
        Form form = formProvider.findByUrl(url);
        mv.setViewName("forms/excessform");
        mv.addObject("form", form);
        mv.addObject("role", role);

        /* GET BANKING INSTITUTIONS */
        mv.addObject("banks", lookupProvider.getValuesByName("Banking Institutions"));

        /* GET NATURE OF LAW PRACTICES FOR EXCESS FORM */
        mv.addObject("naturesOfLaw", lookupProvider.getValuesByName("Excess Form - Natures of Law Practice"));

        /* GET PROVINCES */
        mv.addObject("provinces", lookupProvider.getValuesByName("Province"));

        /* GET EXCESS LIABILITY INSURERS */
        mv.addObject("excessLiabilities", lookupProvider.getValuesByName("Excess Liability Insurers"));

        /* GET QUESTION FOR EXCESS FORM */
        List<FormQuestion> questionList = formQuestionProvider.findByFormId(form.getId());
        for (FormQuestion question : questionList) {
            mv.addObject("question" + question.getNumber(), question);
        }

        /* GET USER INFO */
        mv.addObject("userInfo", userInfo);

        if (userInfo.isAdmin()) {
            mv.addObject("userType", "Admin");
        } else if (userInfo.isLawyer()) {
            mv.addObject("userType", "Lawyer");
        } else if (userInfo.isFirm()) {
            mv.addObject("userType", "Firm");
        }
        return mv;

    }

    public ModelAndView getExcessFormModelAdmin(String url, String name, String role, UserResponse user) {

        ModelAndView mv = new ModelAndView();
        mv.setViewName("forms/excessform");

        Form form = formProvider.findByUrl(url);
        mv.addObject("form", form);

        mv.addObject("role", role);


        mv.addObject("user", user);
        mv.addObject("name", name);

        String lso = user.getLSONumber();


        UserResponse userResponse = null;

        mv.addObject("userType", "Lawyer");
        userResponse = universeProvider.userDetails(lso);
        mv.addObject("firstName", userResponse.getContactName().getFirstName());
        mv.addObject("lastName", userResponse.getContactName().getLastName());
        mv.addObject("email", userResponse.getEmail());
        mv.addObject("confirmationNumber", "");
        mv.addObject("confirmed", false);

        mv.addObject("submittedFor", user.getFirmKey());
        /* Banking institutions */
        Lookup banks = lookupProvider.getLookupByName("Banking Institutions");
        if (banks != null) {
            List<LookupValue> values = lookupProvider.getValuesByLookupId(banks.getId());
            values.sort(Comparator.comparing(LookupValue::getSort));
            mv.addObject("banks", values);
        }

        List<FormQuestion> questionList = formQuestionProvider.findByFormId(form.getId());

        for (FormQuestion question : questionList) {
            mv.addObject("question" + question.getNumber(), question);
        }

        //Natures of Law Practice
        Lookup naturesOfLaw = lookupProvider.getLookupByName("Excess Form - Natures of Law Practice");
        if (naturesOfLaw != null) {
            List<LookupValue> values = lookupProvider.getValuesByLookupId(naturesOfLaw.getId());
            values.sort(Comparator.comparing(LookupValue::getSort));
            mv.addObject("naturesOfLaw", values);
        }

        //provinces
        Lookup provinces = lookupProvider.getLookupByName("Province");
        if (provinces != null) {
            List<LookupValue> values = lookupProvider.getValuesByLookupId(provinces.getId());
            values.sort(Comparator.comparing(LookupValue::getSort));
            mv.addObject("provinces", values);
        }

        //Excess Liability Insurers
        Lookup excessLiabilities = lookupProvider.getLookupByName("Excess Liability Insurers");
        if (excessLiabilities != null) {
            List<LookupValue> values = lookupProvider.getValuesByLookupId(excessLiabilities.getId());
            values.sort(Comparator.comparing(LookupValue::getSort));
            mv.addObject("excessLiabilities", values);
        }


        return mv;
    }

    public ModelAndView getExcessFormModelFirm(String url, String name, String role, FirmResponse firm) {
        ModelAndView mv = new ModelAndView();
        mv.setViewName("forms/excessform");

        Form form = formProvider.findByUrl(url);
        mv.addObject("form", form);

        mv.addObject("role", role);


        mv.addObject("user", firm);
        mv.addObject("name", name);
        mv.addObject("submittedFor", firm.getFirm().getFirmNumber());


        UserResponse userResponse = null;


        mv.addObject("userType", "Firm");

        mv.addObject("firstName", firm.getFirm().getClaimAdmin().getFirstName());
        mv.addObject("lastName", firm.getFirm().getClaimAdmin().getLastName());
        mv.addObject("email", firm.getFirm().getEmail());



        mv.addObject("confirmationNumber", "");
        mv.addObject("confirmed", false);


        /* Banking institutions */
        Lookup banks = lookupProvider.getLookupByName("Banking Institutions");
        if (banks != null) {
            List<LookupValue> values = lookupProvider.getValuesByLookupId(banks.getId());
            values.sort(Comparator.comparing(LookupValue::getSort));
            mv.addObject("banks", values);
        }

        List<FormQuestion> questionList = formQuestionProvider.findByFormId(form.getId());

        for (FormQuestion question : questionList) {
            mv.addObject("question" + question.getNumber(), question);
        }

        //Natures of Law Practice
        Lookup naturesOfLaw = lookupProvider.getLookupByName("Excess Form - Natures of Law Practice");
        if (naturesOfLaw != null) {
            List<LookupValue> values = lookupProvider.getValuesByLookupId(naturesOfLaw.getId());
            values.sort(Comparator.comparing(LookupValue::getSort));
            mv.addObject("naturesOfLaw", values);
        }

        //provinces
        Lookup provinces = lookupProvider.getLookupByName("Province");
        if (provinces != null) {
            List<LookupValue> values = lookupProvider.getValuesByLookupId(provinces.getId());
            values.sort(Comparator.comparing(LookupValue::getSort));
            mv.addObject("provinces", values);
        }

        //Excess Liability Insurers
        Lookup excessLiabilities = lookupProvider.getLookupByName("Excess Liability Insurers");
        if (excessLiabilities != null) {
            List<LookupValue> values = lookupProvider.getValuesByLookupId(excessLiabilities.getId());
            values.sort(Comparator.comparing(LookupValue::getSort));
            mv.addObject("excessLiabilities", values);
        }

        return mv;
    }

    public ModelAndView getNewApplicationFormAdmin(String url, String name, String role, UserResponse user) {
        ModelAndView mv = new ModelAndView();

        Form form = formProvider.findByUrl(url);

        if (form != null)
        {
            mv.setViewName("forms/newapplicationform");
            mv.addObject("form", form);
            mv.addObject("addressReview", false);
            mv.addObject("edit", false);
            mv.addObject("role", role);
            mv.addObject("user", user);
            mv.addObject("firm", new Firm());

            UserOptionsResponse options = new UserOptionsResponse();
            mv.addObject("options", options);

            //Volume billings info
            Lookup volumeBillingsInfoAverage = lookupProvider.getLookupByName("Average Volume Billings Info");
            if (volumeBillingsInfoAverage != null) {
                List<LookupValue> values = lookupProvider.getValuesByLookupId(volumeBillingsInfoAverage.getId());

                values.sort(Comparator.comparing(LookupValue::getSort));

                mv.addObject("volumeBillingsInfoAverage", values);
            }

            Lookup volumeBillingsInfoAnnual = lookupProvider.getLookupByName("Annual Volume Billings Info");
            if (volumeBillingsInfoAnnual != null) {
                List<LookupValue> values = lookupProvider.getValuesByLookupId(volumeBillingsInfoAnnual.getId());

                values.sort(Comparator.comparing(LookupValue::getSort));

                mv.addObject("volumeBillingsInfoAnnual", values);
            }

            //Primary practice areas
            Lookup primaryPracticeAreas = lookupProvider.getLookupByName("Primary areas of Practice");
            if (primaryPracticeAreas != null) {
                List<LookupValue> values = lookupProvider.getValuesByLookupId(primaryPracticeAreas.getId());
                values.sort(Comparator.comparing(LookupValue::getSort));
                mv.addObject("primaryPracticeAreas", values);
            }

            //Secondary practice areas
            Lookup secondaryPracticeAreas = lookupProvider.getLookupByName("Secondary areas of Practice");
            if (secondaryPracticeAreas != null) {
                List<LookupValue> values = lookupProvider.getValuesByLookupId(secondaryPracticeAreas.getId());
                values.sort(Comparator.comparing(LookupValue::getSort));
                mv.addObject("secondaryPracticeAreas", values);
            }

            //Natures of Law Practice
            Lookup naturesOfLaw = lookupProvider.getLookupByName("Natures of Law Practice");
            if (naturesOfLaw != null) {
                List<LookupValue> values = lookupProvider.getValuesByLookupId(naturesOfLaw.getId());
                values.sort(Comparator.comparing(LookupValue::getSort));
                mv.addObject("naturesOfLaw", values);
            }

            //Excess Liability Insurers
            Lookup excessLiabilities = lookupProvider.getLookupByName("Excess Liability Insurers");
            if (excessLiabilities != null) {
                List<LookupValue> values = lookupProvider.getValuesByLookupId(excessLiabilities.getId());
                values.sort(Comparator.comparing(LookupValue::getSort));
                mv.addObject("excessLiabilities", values);
            }

            //Deductibles
            Lookup deductibles = lookupProvider.getLookupByName("Deductibles");
            if (deductibles != null) {
                List<LookupValue> values = lookupProvider.getValuesByLookupId(deductibles.getId());
                values.sort(Comparator.comparing(LookupValue::getSort));
                mv.addObject("deductibles", values);
            }

            //Banking institutions
            Lookup banks = lookupProvider.getLookupByName("Banking Institutions");
            if (banks != null) {
                List<LookupValue> values = lookupProvider.getValuesByLookupId(banks.getId());
                values.sort(Comparator.comparing(LookupValue::getSort));
                mv.addObject("banks", values);
            }

            //Get lawyers for this law firm
            //TODO: This should be refactored
            LawyerSearchResponse response = universeProvider.lawyerSearch(user.getFirmKey());
            if (response != null) {
                response.getLawyers().sort(Comparator.comparing(FirmContact::getLastName));
                mv.addObject("lawyers", response.getLawyers());
            }

            //provinces
            Lookup provinces = lookupProvider.getLookupByName("Province");
            if (provinces != null) {
                List<LookupValue> values = lookupProvider.getValuesByLookupId(provinces.getId());
                values.sort(Comparator.comparing(LookupValue::getSort));
                mv.addObject("provinces", values);
            }

            //question 2
            FormQuestion question2 = formQuestionProvider.findByFormIdAndQuestionNumber(form.getId(), "2");
            mv.addObject("question2", question2);

            //question 3
            FormQuestion question3 = formQuestionProvider.findByFormIdAndQuestionNumber(form.getId(), "3");
            mv.addObject("question3", question3);

            //question 4
            FormQuestion question4 = formQuestionProvider.findByFormIdAndQuestionNumber(form.getId(), "4");
            mv.addObject("question4", question4);

            //question 4a
            FormQuestion question4a = formQuestionProvider.findByFormIdAndQuestionNumber(form.getId(), "41");
            mv.addObject("question4a", question4a);

            //question 5
            FormQuestion question5 = formQuestionProvider.findByFormIdAndQuestionNumber(form.getId(), "5");
            mv.addObject("question5", question5);

            //question 6
            FormQuestion question6 = formQuestionProvider.findByFormIdAndQuestionNumber(form.getId(), "6");
            mv.addObject("question6", question6);

            //question 7
            FormQuestion question7 = formQuestionProvider.findByFormIdAndQuestionNumber(form.getId(), "7");
            mv.addObject("question7", question7);

            //question 7a
            FormQuestion question7a = formQuestionProvider.findByFormIdAndQuestionNumber(form.getId(), "71");
            mv.addObject("question7a", question7a);

            //question 8
            FormQuestion question8 = formQuestionProvider.findByFormIdAndQuestionNumber(form.getId(), "8");
            mv.addObject("question8", question8);

            //question 9
            FormQuestion question9 = formQuestionProvider.findByFormIdAndQuestionNumber(form.getId(), "9");
            mv.addObject("question9", question9);

            //question 9a
            FormQuestion question91 = formQuestionProvider.findByFormIdAndQuestionNumber(form.getId(), "91");
            mv.addObject("question91", question91);

            //question 10
            FormQuestion question10 = formQuestionProvider.findByFormIdAndQuestionNumber(form.getId(), "10");
            mv.addObject("question10", question10);

            //question 11
            FormQuestion question11 = formQuestionProvider.findByFormIdAndQuestionNumber(form.getId(), "11");
            mv.addObject("question11", question11);

            //question 12
            FormQuestion question12 = formQuestionProvider.findByFormIdAndQuestionNumber(form.getId(), "12");
            mv.addObject("question12", question12);

            //question 12-1
            FormQuestion question121 = formQuestionProvider.findByFormIdAndQuestionNumber(form.getId(), "121");
            mv.addObject("question121", question121);

            //question 13
            FormQuestion question13 = formQuestionProvider.findByFormIdAndQuestionNumber(form.getId(), "13");
            mv.addObject("question13", question13);

            //question 14
            FormQuestion question14 = formQuestionProvider.findByFormIdAndQuestionNumber(form.getId(), "14");
            mv.addObject("question14", question14);

            //question 16
            FormQuestion question15 = formQuestionProvider.findByFormIdAndQuestionNumber(form.getId(), "15");
            mv.addObject("question15", question15);

            //question 15-1
            FormQuestion question151 = formQuestionProvider.findByFormIdAndQuestionNumber(form.getId(), "151");
            mv.addObject("question151", question151);

            //question 15-2
            FormQuestion question152 = formQuestionProvider.findByFormIdAndQuestionNumber(form.getId(), "152");
            mv.addObject("question152", question152);

            //question 15-3
            FormQuestion question153 = formQuestionProvider.findByFormIdAndQuestionNumber(form.getId(), "153");
            mv.addObject("question153", question153);

            //question 16
            FormQuestion question16 = formQuestionProvider.findByFormIdAndQuestionNumber(form.getId(), "16");
            mv.addObject("question16", question16);

            //question 17
            FormQuestion question17 = formQuestionProvider.findByFormIdAndQuestionNumber(form.getId(), "17");
            mv.addObject("question17", question17);

            //question 18
            FormQuestion question18 = formQuestionProvider.findByFormIdAndQuestionNumber(form.getId(), "18");
            mv.addObject("question18", question18);

            //question 19
            FormQuestion question19 = formQuestionProvider.findByFormIdAndQuestionNumber(form.getId(), "19");
            mv.addObject("question19", question19);

            //question 20
            FormQuestion question20 = formQuestionProvider.findByFormIdAndQuestionNumber(form.getId(), "20");
            mv.addObject("question20", question20);

            //question 21
            FormQuestion question21 = formQuestionProvider.findByFormIdAndQuestionNumber(form.getId(), "21");
            mv.addObject("question21", question21);

            //question 22
            FormQuestion question22 = formQuestionProvider.findByFormIdAndQuestionNumber(form.getId(), "22");
            mv.addObject("question22", question22);

            //question 23
            FormQuestion question23 = formQuestionProvider.findByFormIdAndQuestionNumber(form.getId(), "23");
            mv.addObject("question23", question23);

            return mv;

        }
        else
        {
            return new ModelAndView("redirect:/error");
        }
    }

    public ModelAndView getAddressFormAdmin(String url, String name, String role, UserResponse user) {
        ModelAndView mv = new ModelAndView();

        Form form = formProvider.findByUrl(url);

        if (form != null) {
            mv.setViewName("forms/address");
            mv.addObject("form", form);
            mv.addObject("addressReview", true);
            mv.addObject("edit", false);

            if (role.equals("admin")) {
                UserResponse adminUserResponse = new UserResponse();
                adminUserResponse.setAddress(new Address());
                adminUserResponse.setFirm(new Firm());
                mv.addObject("user", adminUserResponse);
            }

            //Natures of Law Practice
            Lookup naturesOfLaw = lookupProvider.getLookupByName("Natures of Law Practice");
            if (naturesOfLaw != null) {
                List<LookupValue> values = lookupProvider.getValuesByLookupId(naturesOfLaw.getId());
                values.sort(Comparator.comparing(LookupValue::getSort));
                mv.addObject("naturesOfLaw", values);
            }

            //Get lawyers for this law firm
            //TODO: This should be refactored
            LawyerSearchResponse response = universeProvider.lawyerSearch(user.getFirmKey());
            if (response != null) {

                //sort by lso number
                response.getLawyers().sort(Comparator.comparing(FirmContact::getLastName));

                mv.addObject("lawyers", response.getLawyers());
            }

            //provinces
            Lookup provinces = lookupProvider.getLookupByName("Province");
            if (provinces != null) {
                List<LookupValue> values = lookupProvider.getValuesByLookupId(provinces.getId());
                values.sort(Comparator.comparing(LookupValue::getSort));
                mv.addObject("provinces", values);
            }

            return mv;
        }
        else
        {
            return new ModelAndView("redirect:/error");
        }
    }

    public ModelAndView getIropForm(String url, String name, String role, UserResponse user) {

        ModelAndView mv = new ModelAndView();
        mv.setViewName("forms/irop/irop");
        mv.addObject("role", role);
        mv.addObject("userInfo", SessionUtil.getUserInfo());
        if (role.equals("admin")) {
            UserResponse adminUserResponse = new UserResponse();
            Firm firm = new Firm();
            firm.setEffectiveDate("");
            adminUserResponse.setFirm(firm);
            mv.addObject("user", adminUserResponse);
        } else {
            mv.addObject("user", user);

        }

        mv.addObject("name", user.getLSONumber());
        mv.addObject("edit", false);
        mv.addObject("addressReview", false);

        Form form = formProvider.findByUrl(url);
        mv.addObject("form", form);
        List<FormQuestion> questionList = formQuestionProvider.findByFormId(form.getId());

        for (FormQuestion question : questionList) {
            mv.addObject("question" + question.getNumber(), question);
        }

        /* Banking institutions */
        Lookup banks = lookupProvider.getLookupByName("Banking Institutions");
        if (banks != null) {
            List<LookupValue> values = lookupProvider.getValuesByLookupId(banks.getId());
            values.sort(Comparator.comparing(LookupValue::getSort));
            mv.addObject("banks", values);
        }

        Lookup provinces = lookupProvider.getLookupByName("Province");
        if (provinces != null) {
            List<LookupValue> values = lookupProvider.getValuesByLookupId(provinces.getId());
            values.sort(Comparator.comparing(LookupValue::getSort));
            mv.addObject("provinces", values);
        }


        Lookup naturesOfLaw = lookupProvider.getLookupByName("Excess Form - Natures of Law Practice");
        if (naturesOfLaw != null) {
            List<LookupValue> values = lookupProvider.getValuesByLookupId(naturesOfLaw.getId());
            values.sort(Comparator.comparing(LookupValue::getSort));
            mv.addObject("naturesOfLaw", values);
        }

        return mv;
    }

}
