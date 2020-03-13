package lawpro.providers;

import com.google.gson.Gson;
import lawpro.data.*;
import lawpro.providers.forms.FormProvider;
import lawpro.providers.forms.FormQuestionProvider;
import lawpro.providers.lookups.LookupProvider;
import lawpro.providers.lookups.LookupValueProvider;
import lawpro.repository.ILookupRepository;
import lawpro.repository.ILookupValuesRepository;
import lawpro.services.AdminService;
import lawpro.services.forms.FormService;
import lawpro.services.forms.QuestionService;
import lawpro.services.lookups.LookupService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class InitProvider {

    private final Logger LOGGER = LoggerFactory.getLogger(InitProvider.class);


    @Autowired
    AdminProvider adminProvider;

    @Autowired
    ErrorMessageProvider errorProvider;

    @Autowired
    FormProvider formProvider;

    @Autowired
    LookupProvider lookupProvider;

    @Autowired
    LookupValueProvider lookupValueProvider;

    @Autowired
    FormQuestionProvider formQuestionProvider;

    @Autowired
    private QuestionService questionService;

    @Autowired
    private LookupService lookupService;

    @Autowired
    private FormService formService;

    @Autowired
    private AdminService adminService;

    @Autowired
    private ILookupValuesRepository lookupRepo;

    public void importBanks()
    {
        String[] numbers = {"001","002","003","004","006","010","016","030","039","117","127","177","187","219","241","242","245","250","260","265","269","270","275","277","290","292","294","301","303","307","308","309","310","311","314","315","318","319","320","321","322","323","326","327","328","330","332","334","335","336","338","339","340","342","343","344","345","346","347","349","352","355","356","357","358","359","360","361","362","364","365","366","368","369","370","372","375","376","377","378","380","507","509","522","532","535","536","540","548","550","551","568","570","580","590","597","603","604","606","608","614","618","621","623","626","627","652","701","803","806","807","808","809","810","815","819","828","829","830","834","836","837","839","840","842","846","849","853","854","865","869","879","889","890","899",""};
        String[] banks = {"Bank of Montreal","The Bank of Nova Scotia","Royal Bank of Canada","The Toronto-Dominion Bank","National Bank of Canada","Canadian Imperial Bank of Commerce","HSBC Bank Canada","Canadian Western Bank","Laurentian Bank of Canada","Government of Canada","Canada Post Office","Bank of Canada","Canada Savings Bond Redemption Certificates","ATB Financial","Bank of America, National Association","The Bank of New York Mellon","MUFG Bank, Ltd., Canada Branch","BNP Paribas","Citibank Canada","Deutsche Bank AG","Mega International Commercial Bank Co., Ltd.","JPMorgan Chase Bank, National Association","KEB Hana Bank Canada","Mizuho Bank, Ltd., Canada Branch","UBS Bank (Canada)","Société Générale (Canada)","SBI Canada Bank","Sumitomo Mitsui Banking Corporation, Canada Branch","Amex Bank of Canada","Industrial and Commercial Bank of China (Canada)","Bank of China (Canada)","Vancity Community Investment Bank","First Nations Bank of Canada","BofA Canada Bank","J.P. Morgan Bank Canada","CTBC Bank Corp. Canada","U.S. Bank National Association Branch","Canadian National - Money Orders","President's Choice Bank","Habib Canadian Bank","Rabobank Canada","Capital One Bank (Canada Branch)","Canadian Imperial Bank of Commerce","State Street","Citibank, N.A.","Comerica Bank","First Commercial Bank","VersaBank","United Overseas Bank Limited","Maple Bank GmbH","Canadian Tire Bank","UBS AG Canada Branch","ICICI Bank Canada","Zag Bank","ADS Canadian Bank","General Bank of Canada","Fifth Third Bank","Société Générale (Canada Branch)","Bridgewater Bank","The Northern Trust Company, Canada Branch","DirectCash Bank","Shinhan Bank Canada","Citco Bank Canada","M&T Bank","HomEquity Bank","Walmart Canada Bank","Barclays Bank PLC, Canada Branch","Home Bank","Wells Fargo Bank, National Association, Canadian Branch","Continental Bank of Canada","PNC Bank Canada Branch","China Construction Bank Toronto Branch","Rogers Bank","American Express C$ Travellers Cheques","Wealth One Bank of Canada","Bank of China, Toronto Branch","Thomas Cook C$ Travellers Cheques","Exchange Bank of Canada","Street Capital Bank of Canada","Cidel Bank Canada","Mega International Commercial Bank (Canada)","Community Trust Company","The Canada Trust Company","Trust La Laurentienne","Effort Trust Company","Home Savings and Loans Corporation","Investors Group Trust Co. Ltd.","Manulife Bank of Canada Limited","CIBC Trust Corporation","Montreal Trust Company of Canada","Sun Life Financial Trust Inc.","Peace Hills Trust Company","The Royal Trust Company","Royal Trust Corporation of Canada","National Trust Company","TD Mortgage Corporation","TD Pacific Mortgage Corporation","HSBC Mortgage Corporation (Canada)","Scotia Mortgage Corporation","CS Alterna Bank","Tangerine Bank","B2B Bank","People's Trust Company","Equitable Bank","Manulife Trust Company","Home Trust Company","Provincial Trust Company","Edward Jones","Latvian Credit Union Limited","DUCA Financial Services Credit Union Ltd.","Communication Technologies Credit Union Limited","Arnstein Community Credit Union Limited","Central 1 Credit Union","Pace Savings and Credit Union Limited","Fédération des caisses Desjardins du Québec","Caisse Populaire Groupe Financier Ltée.","Central 1 Credit Union","La Fédération des caisses populaires de l'Ontario Inc.","Airline Financial Credit Union Limited","Community First Credit Union Limited","Caisse populaire de Kapuskasing Ltée","Meridian Credit Union Limited","Atlantic Central","Dundalk District Credit Union Limited","Alterna Savings & Credit Union","Rapport Credit Union Limited","Atlantic Central","Concentra Bank","Golden Horseshoe Credit Union Limited","Caisse populaire acadienne ltée","Central 1 Credit Union","Credit Union Central of Manitoba Limited","Credit Union Central of Saskatchewan","L'Alliance des caisses populaires de l'Ontario Ltée","Credit Union Central Alberta Limited",""};

        System.out.println(numbers.length);
        System.out.println(banks.length);

        Lookup lookup = lookupProvider.getLookupByName("Banking Institutions");

        List<LookupValue> values = lookupService.getValuesByLookupId(lookup.getId());

        if (values.size() < 136)
        {
            for(LookupValue value:values)
            {
                lookupRepo.delete(value);
            }

            if (lookup != null)
            {
                for (int x=0; x<numbers.length;x++)
                {
                    LookupValue lookupValue = new LookupValue();
                    lookupValue.setSort(x);
                    lookupValue.setName(numbers[x] + " - " + banks[x]);
                    lookupValue.setValue(numbers[x]);
                    lookupValue.setLookupId(lookup.getId());
                    lookupValue.setId(UUID.randomUUID().toString());
                    lookupRepo.save(lookupValue);
                }
            }
        }
    }

    public void start(boolean export) {
        Gson gson = new Gson();

        if (export)
        {
            BufferedWriter writer;
            try{
                writer = new BufferedWriter(new FileWriter("./data/adminUsers.json"));

                List<Admin> admins = adminService.getAdmins();

                for(Admin admin:admins)
                {
                    String line = gson.toJson(admin, Admin.class);
                    writer.write(line);
                    writer.newLine();
                }

                writer.close();
            }catch(IOException e)
            {
                LOGGER.error("InitProvider Error: start()", e);
            }

            try{
                writer = new BufferedWriter(new FileWriter("./data/errors.json"));

                List<ErrorMessage> messages = errorProvider.getErrorMessages();

                for(ErrorMessage message:messages)
                {
                    String line = gson.toJson(message, ErrorMessage.class);
                    writer.write(line);
                    writer.newLine();
                }

                writer.close();
            }catch(IOException e)
            {
                LOGGER.error("InitProvider Error: start()", e);
            }

            try{
                writer = new BufferedWriter(new FileWriter("./data/forms.json"));

                List<Form> forms = formProvider.formList();

                for(Form form:forms)
                {
                    String line = gson.toJson(form, Form.class);
                    writer.write(line);
                    writer.newLine();
                }

                writer.close();
            }catch(IOException e)
            {
                LOGGER.error("InitProvider Error: start()", e);
            }

            try{
                writer = new BufferedWriter(new FileWriter("./data/lookups.json"));

                List<lawpro.data.Lookup> lookups = lookupProvider.getAllLookups();

                for(Lookup lookup:lookups)
                {
                    String line = gson.toJson(lookup, Lookup.class);
                    writer.write(line);
                    writer.newLine();
                }

                writer.close();
            }catch(IOException e)
            {
                LOGGER.error("InitProvider Error: start()", e);
            }

            try{
                writer = new BufferedWriter(new FileWriter("./data/lookupValues.json"));

                List<lawpro.data.LookupValue> lookupValues = lookupValueProvider.getAllLookupValues();

                for(LookupValue lookupValue:lookupValues)
                {
                    String line = gson.toJson(lookupValue, LookupValue.class);
                    writer.write(line);
                    writer.newLine();
                }

                writer.close();
            }catch(IOException e)
            {
                LOGGER.error("InitProvider Error: start()", e);
            }

            try{
                writer = new BufferedWriter(new FileWriter("./data/formQuestions.json"));

                List<lawpro.data.FormQuestion> formQuestions = formQuestionProvider.getAllFormQuestions();

                for(FormQuestion formQuestion:formQuestions)
                {
                    String line = gson.toJson(formQuestion, FormQuestion.class);
                    writer.write(line);
                    writer.newLine();
                }

                writer.close();
            }catch(IOException e)
            {
                LOGGER.error("InitProvider Error: start()", e);
            }
        }else
        {
            BufferedReader reader;
            try{
                reader = new BufferedReader(new FileReader("./data/adminUsers.json"));
                String line = reader.readLine();
                while (line != null)
                {
                    Admin admin = gson.fromJson(line, Admin.class);
                    adminService.save(admin);

                    line = reader.readLine();
                }
                reader.close();
            }catch(IOException e)
            {
                LOGGER.error("InitProvider Error: start()", e);
            }

            try{
                reader = new BufferedReader(new FileReader("./data/errors.json"));
                String line = reader.readLine();
                while (line != null)
                {
                    ErrorMessage error = gson.fromJson(line, ErrorMessage.class);
                    errorProvider.setErrorMessage(error.getKey(), error.getMessage());

                    line = reader.readLine();
                }
                reader.close();
            }catch(Exception e)
            {
                LOGGER.error("InitProvider Error: start()", e);
            }

            try{
                reader = new BufferedReader(new FileReader("./data/forms.json"));
                String line = reader.readLine();
                while (line != null)
                {
                    Form form = gson.fromJson(line, Form.class);
                    formService.createForm(form);

                    line = reader.readLine();
                }
                reader.close();
            }catch(Exception e)
            {
                LOGGER.error("InitProvider Error: start()", e);
            }

            try{
                reader = new BufferedReader(new FileReader("./data/lookups.json"));
                String line = reader.readLine();
                while (line != null)
                {
                    Lookup lookup = gson.fromJson(line, Lookup.class);
                    lookupService.createLookup(lookup);

                    line = reader.readLine();
                }
                reader.close();
            }catch(Exception e)
            {
                LOGGER.error("InitProvider Error: start()", e);
            }

            try{
                reader = new BufferedReader(new FileReader("./data/lookupValues.json"));
                String line = reader.readLine();
                while (line != null)
                {
                    LookupValue lookupValue = gson.fromJson(line, LookupValue.class);
                    lookupService.add(lookupValue);

                    line = reader.readLine();
                }
                reader.close();
            }catch(Exception e)
            {
                LOGGER.error("InitProvider Error: start()", e);

            }

            try{
                reader = new BufferedReader(new FileReader("./data/formQuestions.json"));
                String line = reader.readLine();
                while (line != null)
                {
                    FormQuestion formQuestion = gson.fromJson(line, FormQuestion.class);
                    questionService.create(formQuestion);

                    line = reader.readLine();
                }
                reader.close();
            }catch(Exception e)
            {
                LOGGER.error("InitProvider Error: start()", e);
            }

        }



    }


}
