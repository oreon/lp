package lawpro.providers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import lawpro.models.universe.*;
import lawpro.models.universe.irop.IropRequest;
import lawpro.models.universe.request.AddressFormRequest;
import lawpro.models.universe.request.ExcessRequest;
import lawpro.models.universe.request.FirmFormRequest;
import lawpro.models.universe.request.NewApplicationFormRequest;
import lawpro.models.universe.response.*;
import lawpro.utils.UserUtil;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import org.glassfish.jersey.media.multipart.FormDataMultiPart;
import org.glassfish.jersey.media.multipart.MultiPartFeature;
import org.glassfish.jersey.media.multipart.file.FileDataBodyPart;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriUtils;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.File;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Component
public class UniverseProvider {

    private static Logger LOGGER = LogManager.getLogger(UniverseProvider.class);


    @Value("${universe.api.url}")
    private String API_URL;

    public UserOptionsResponse memberOptionsByID(String id) {
        UserOptionsResponse userOptionsResponse = new UserOptionsResponse();

        UserResponse user = new UserResponse();
        Gson gson = new Gson();

        String postUrl = API_URL + "/ws-newapp/ds/forms/" + id;
        HttpClient httpClient = HttpClientBuilder.create().build();
        HttpGet get = new HttpGet(postUrl);
        get.setHeader("Content-type", "application/json");
        try {
            HttpResponse response = httpClient.execute(get);
            if (response.getStatusLine().getStatusCode() == 200 || response.getStatusLine().getStatusCode() == 403) {
                HttpEntity responseEntity = response.getEntity();
                String responseString = EntityUtils.toString(responseEntity, "UTF-8");

                UserUtil.writeResponse(responseString, "memberOptionsByIDResponse", id);

                userOptionsResponse = gson.fromJson(responseString, UserOptionsResponse.class);
            }
        } catch (IOException e) {
            LOGGER.error("UniverseProvider Error: memberOptionsByID(). Request Id: " + id + ". URL: " + postUrl, e);
            throw new RuntimeException(e);
        }

        return userOptionsResponse;
    }

    public FirmResponse firmDetailsByID(String firmNumber) {
        FirmResponse firmResponse = new FirmResponse();

        UserResponse user = new UserResponse();
        Gson gson = new Gson();

        String postUrl = API_URL + "/ws-newapp/ds/members/firm/" + firmNumber;
        HttpClient httpClient = HttpClientBuilder.create().build();
        HttpGet get = new HttpGet(postUrl);
        get.setHeader("Content-type", "application/json");

        try {
            HttpResponse response = httpClient.execute(get);
            if (response.getStatusLine().getStatusCode() == 200) {
                HttpEntity responseEntity = response.getEntity();
                String responseString = EntityUtils.toString(responseEntity, "UTF-8");

                UserUtil.writeResponse(responseString, "firmByIDResponse", firmNumber);

                Firm firm = gson.fromJson(responseString, Firm.class);
                firmResponse.setFirm(firm);
            }
        } catch (IOException e) {
            LOGGER.error("UniverseProvider Error: firmDetailsByID(). Request Firm Number: " + firmNumber + ". URL:" + postUrl, e);
            throw new RuntimeException(e);
        }

        return firmResponse;
    }

    //Simulates a call to Universe to get logged in users details to prepopulate forms
    public UserResponse userDetails(String userid) {
        UserResponse user = new UserResponse();
        Gson gson = new Gson();


        String postUrl = API_URL + "/ws-newapp/ds/members/" + userid;
        CloseableHttpClient httpClient = HttpClients.createDefault();

        HttpGet get = new HttpGet(postUrl);
        get.setHeader("Content-type", "application/json");

        try {
            CloseableHttpResponse response = httpClient.execute(get);
            if (response.getStatusLine().getStatusCode() == 200) {
                HttpEntity responseEntity = response.getEntity();
                String responseString = EntityUtils.toString(responseEntity, "UTF-8");
                UserResponse userJson = gson.fromJson(responseString, UserResponse.class);

                UserUtil.writeResponse(responseString, "memberDetailsResponse", userid);

                if (!userJson.isError()) {
                    user.getContactName().setTitle(userJson.getContactName().getTitle());
                    user.setPreferredMailingAddress(userJson.getPreferredMailingAddress());

                    //user details
                    user.getContactName().setLastName(userJson.getContactName().getLastName());
                    user.getContactName().setFirstName(userJson.getContactName().getFirstName());
                    user.setLSONumber(userJson.getLsoKey());
                    user.setPreferredMailingAddress(userJson.getPreferredMailingAddress());
                    user.setFirmKey(userJson.getFirmKey());
                    user.setFirmName(userJson.getFirmName());
                    user.setEffectiveDate(userJson.getEffectiveDate());

                    //user address
                    Address address = new Address();
                    address.setLine1(userJson.getAddress().getLine1());
                    address.setLine2(userJson.getAddress().getLine2());
                    address.setLine3(userJson.getAddress().getLine3());
                    address.setCity(userJson.getAddress().getCity());
                    address.setProvince(userJson.getAddress().getProvince());
                    address.setPostalCode(userJson.getAddress().getPostalCode());
                    user.setAddress(address);

                    if (userJson.getContacts().stream().anyMatch(x -> x.getContactType().equals("EMAIL"))) {
                        Contact email = userJson.getContacts().stream().filter(x -> x.getContactType().equals("EMAIL")).findFirst().orElse(null);
                        if (email != null)
                            user.setEmail(email.getValue());
                    }
                    if (userJson.getContacts().stream().anyMatch(x -> x.getContactType().equals("PHONE_WORK"))) {
                        Contact workPhone = userJson.getContacts().stream().filter(x -> x.getContactType().equals("PHONE_WORK")).findFirst().orElse(null);
                        if (workPhone != null)
                            user.setWorkPhone(workPhone.getValue());
                        Contact workExt = userJson.getContacts().stream().filter(x -> x.getContactType().equals("PHONE_WORK")).findFirst().orElse(null);
                        if (workExt != null)
                            user.setWorkPhoneExt(workExt.getExt());
                    }
                    if (userJson.getContacts().stream().anyMatch(x -> x.getContactType().equals("FAX"))) {
                        Contact fax = userJson.getContacts().stream().filter(x -> x.getContactType().equals("FAX")).findFirst().orElse(null);
                        if (fax != null)
                            user.setFax(fax.getValue());
                    }
                    if (userJson.getContacts().stream().anyMatch(x -> x.getContactType().equals("PHONE"))) {
                        Contact homePhone = userJson.getContacts().stream().filter(x -> x.getContactType().equals("PHONE")).findFirst().orElse(null);
                        if (homePhone != null)
                            user.setHomePhone(homePhone.getValue());
                    }
                    if (userJson.getContacts().stream().anyMatch(x -> x.getContactType().equals("PHONE_OTHER"))) {
                        Contact phoneOther = userJson.getContacts().stream().filter(x -> x.getContactType().equals("PHONE_OTHER")).findFirst().orElse(null);
                        if (phoneOther != null)
                            user.setAddlPhone(phoneOther.getValue());
                    }
                    if (userJson.getContacts().stream().anyMatch(x -> x.getContactType().equals("WEB_SITE"))) {
                        Contact website = userJson.getContacts().stream().filter(x -> x.getContactType().equals("WEB_SITE")).findFirst().orElse(null);
                        if (website != null)
                            user.setWebsite(website.getValue());
                    }

                } else {
                    user.setError(true);
                    user.setMessage("The authentication service is not available.");
                }
            } else {
                user.setError(true);
                user.setMessage("The authentication service is not available.");
            }
            httpClient.close();
            response.close();
        } catch (IOException e) {
            LOGGER.error("UniverseProvider Error: userDetails(). Request User ID: " + userid + ". URL: " + postUrl, e);
            throw new RuntimeException(e);
        }
        return user;
    }

    public NewApplicationFormResponse newApplicationForm(String userName) {
        NewApplicationFormResponse response = new NewApplicationFormResponse();

        //TODO - API CAll to universe for this userName

        if (!response.isError()) {
            response.getForm().setInnocentPartyCoverage("Mandatory $250,000 per Claim/Aggregate Innocent Party Sublimit Only");
        }

        return response;
    }

    public NewExcessFormResponse excessForm () {
        NewExcessFormResponse response = new NewExcessFormResponse();
        return response;
    }

    public IropResponse iropForm() {
        IropResponse response = new IropResponse();
        return response;
    }

    public NewApplicationFormResponse submitForm(NewApplicationFormRequest request) {
        Gson gson = new GsonBuilder().serializeNulls().create();
        String jsonRequest = gson.toJson(request);
        String responseString = "";
        String postUrl = "";
        String formattedJson = "";
        try {
            UserUtil.writeRequest(jsonRequest, "newAppRequest", request.getForm().getLawID());

            postUrl = API_URL + "/ws-newapp/ds/forms";
            HttpClient httpClient = HttpClientBuilder.create().build();
            HttpPost post = new HttpPost(postUrl);
            StringEntity postingString = new StringEntity(jsonRequest, "UTF-8");//gson.tojson() converts your pojo to json
            post.setEntity(postingString);
            post.setHeader("Content-type", "application/json;charset=utf-8");
            HttpResponse response = httpClient.execute(post);

            HttpEntity responseEntity = response.getEntity();
            responseString = EntityUtils.toString(responseEntity, "utf-8");
            UserUtil.writeResponse(responseString, "newAppResponse", request.getForm().getLawID());
            LOGGER.info(response.getStatusLine().getStatusCode());
            if (response.getStatusLine().getStatusCode() != 201) {
                return null;
            } else {
                try {
                    return gson.fromJson(responseString, NewApplicationFormResponse.class);
                } catch(IllegalStateException e) {
                    LOGGER.error("UniverseProvider Error: submitForm(). Request String: " + jsonRequest + ". URL: " + postUrl);
                    LOGGER.error(responseString);
                    throw new RuntimeException(e);
                }
            }

        } catch (IOException e) {
            LOGGER.error("UniverseProvider Error: submitForm()");
            return null;
        }

    }

    public NewExcessFormResponse submitExcess(ExcessRequest request, HashMap<String, List<File>> letterheads) {

        Gson gson = new Gson();


        final Client client = ClientBuilder.newBuilder()
                .build();

        WebTarget target = client
                .target(API_URL + "/ws-newapp/ds/forms/xs").register(MultiPartFeature.class);

        String json = gson.toJson(request);
        FormDataMultiPart multipart = new FormDataMultiPart()
                .field("json", gson.toJson(request) , MediaType.APPLICATION_JSON_TYPE);

        List<File> applicantLetterheads = letterheads.get("applicantLetterheads");

        if (applicantLetterheads != null) {
            for(File file : applicantLetterheads) {
                FileDataBodyPart filePart = new FileDataBodyPart("files", file, MediaType.APPLICATION_OCTET_STREAM_TYPE);
                multipart.getBodyParts().add(filePart);
            }
        }

        List<File> assocLetterheads = letterheads.get("assocLetterheads");

        if(assocLetterheads != null) {
            for(File file : assocLetterheads) {
                FileDataBodyPart filePart = new FileDataBodyPart("files", file, MediaType.APPLICATION_OCTET_STREAM_TYPE);
                multipart.getBodyParts().add(filePart);
            }
        }

        List<File> manCompanyLetterheads = letterheads.get("manCompanyLetterheads");
        if(manCompanyLetterheads != null) {
            for(File file : manCompanyLetterheads) {
                FileDataBodyPart filePart = new FileDataBodyPart("files", file, MediaType.APPLICATION_OCTET_STREAM_TYPE);
                multipart.getBodyParts().add(filePart);
            }
        }

        Response response = target.request().post(Entity.entity(multipart, multipart.getMediaType()));

        String responseString = response.readEntity(String.class);

        NewExcessFormResponse formResponse = null;

        try{
            formResponse =  gson.fromJson(responseString, NewExcessFormResponse.class);
        } catch (Exception e) {
            LOGGER.error(responseString, e);
        }

        for(File file : applicantLetterheads) {
            file.delete();
        }

        for(File file : assocLetterheads) {
            file.delete();
        }

        for(File file : manCompanyLetterheads) {
            file.delete();
        }

        Integer statusCode = response.getStatus();
        LOGGER.info(statusCode);

        if(statusCode != 201) {
            LOGGER.error("Status Code: " + statusCode.toString() + " Data: " + responseString);
            NewExcessFormResponse newResponse = null;
            return newResponse;
        }

        return formResponse;
    }

    public IropResponse submitIropForm(IropRequest request) {
        IropResponse iropResponse = new IropResponse();
        Gson gson = new Gson();
        String requestJson = gson.toJson(request);
        final Client client = ClientBuilder.newBuilder()
                .build();

        WebTarget target = client
                .target(API_URL + "/ws-newapp/api/forms/irop").register(MultiPartFeature.class);

        FormDataMultiPart multipart = new FormDataMultiPart()
                .field("json", requestJson , MediaType.APPLICATION_JSON_TYPE);

        Response response = target.request().post(Entity.entity(multipart, multipart.getMediaType()));

        String responseString = response.readEntity(String.class);



        Integer statusCode = response.getStatus();
        LOGGER.info(statusCode);
        if(statusCode != 202) {
            LOGGER.error("Status Code: " + statusCode.toString() + " Data: " + responseString);
            return null;
        } else {
            try {
                iropResponse =  gson.fromJson(responseString, IropResponse.class);
                iropResponse.setError(false);
            } catch (Exception e) {
                LOGGER.error(responseString, e);
            }
        }

        return iropResponse;
    }

    public NewApplicationFormResponse validateNewApplicationForm(NewApplicationFormRequest request) {

        Gson gson = new Gson();

        String jsonRequest = gson.toJson(request);

        String responseString = "";
        try {

            UserUtil.writeRequest(jsonRequest, "newAppValidateRequest", request.getForm().getLawID());

            String postUrl = API_URL + "/ws-newapp/ds/violations/newapp";
            HttpClient httpClient = HttpClientBuilder.create().build();
            HttpPost post = new HttpPost(postUrl);
            StringEntity postingString = new StringEntity(jsonRequest, "UTF-8");//gson.tojson() converts your pojo to json
            post.setHeader("Content-type", "application/json;charset=UTF-8");
            post.setEntity(postingString);
            HttpResponse response = httpClient.execute(post);
            HttpEntity responseEntity = response.getEntity();
            responseString = EntityUtils.toString(responseEntity, "UTF-8");

            UserUtil.writeResponse(responseString, "newAppValidateResponse", request.getForm().getLawID());
        } catch (IOException e) {
            LOGGER.error("UniverseProvider Error: validateNewApplicationForm()", e);
        }
        if (responseString.isEmpty()) {
            NewApplicationFormResponse responseJson = new NewApplicationFormResponse();
            responseJson.setError(false);
            return responseJson;
        } else {
            NewApplicationFormResponse response = null;
            try {
                response = gson.fromJson(responseString, NewApplicationFormResponse.class);
            } catch (IllegalStateException e) {
                LOGGER.error("UniverseProvider Error: validateNewApplicationForm(). URL: " + API_URL + "/ws-newapp/ds/violations/newapp", e);
                throw new RuntimeException(e);
            }
            return response;
        }
    }

    public AddressFormResponse submitAddressForm(AddressFormRequest request) {
        Gson gson = new GsonBuilder().serializeNulls().create();
        String jsonRequest = gson.toJson(request);
        String responseString = "";
        String postUrl = "";
        try {
            UserUtil.writeRequest(jsonRequest, "addressRequest", request.getForm().getLsoKey());

            postUrl = API_URL + "/ws-newapp/ds/members";
            HttpClient httpClient = HttpClientBuilder.create().build();
            HttpPost post = new HttpPost(postUrl);
            StringEntity postingString = new StringEntity(jsonRequest, "UTF-8");//gson.tojson() converts your pojo to json
            post.setEntity(postingString);
            post.setHeader("Content-type", "application/json");
            HttpResponse response = httpClient.execute(post);
            HttpEntity responseEntity = response.getEntity();
            responseString = EntityUtils.toString(responseEntity, "UTF-8");

            UserUtil.writeResponse(responseString, "newAppResponse", request.getForm().getLsoKey());
        } catch (IOException e) {
            LOGGER.error("UniverseProvider Error: submitAddressForm()", e);
        }

        try {
            return gson.fromJson(responseString, AddressFormResponse.class);
        } catch(IllegalStateException e) {
            LOGGER.error("UniverseProvider Error: submitAddressForm(). Request String: " + jsonRequest + ". URL: " + postUrl  );
            throw new RuntimeException(e);
        }
    }

    public FirmFormResponse submitFirmForm(FirmFormRequest request) {
        Gson gson = new GsonBuilder().serializeNulls().create();
        String jsonRequest = gson.toJson(request);
        String responseString = "";
        String postUrl = "";
        try {
            UserUtil.writeRequest(jsonRequest, "firmRequest", request.getForm().getFirmNumber());

            postUrl = API_URL + "/ws-newapp/ds/members/firm";
            HttpClient httpClient = HttpClientBuilder.create().build();
            HttpPost post = new HttpPost(postUrl);
            StringEntity postingString = new StringEntity(jsonRequest, "UTF-8");//gson.tojson() converts your pojo to json
            post.setEntity(postingString);
            post.setHeader("Content-type", "application/json");
            HttpResponse response = httpClient.execute(post);
            HttpEntity responseEntity = response.getEntity();
            responseString = EntityUtils.toString(responseEntity, "UTF-8");

            UserUtil.writeResponse(responseString, "firmResponse", request.getForm().getFirmNumber());
        } catch (IOException e) {
            LOGGER.error("UniverseProvider Error: submitFirmForm()", e);
        }

        try {
            return gson.fromJson(responseString, FirmFormResponse.class);
        } catch (IllegalStateException e){
            LOGGER.error("UniverseProvider Error: submitFirmForm(). Request String: " + jsonRequest + ". URL: " + postUrl, e);
            throw new RuntimeException(e);
        }
    }

    public AddressFormResponse validateAddressForm(AddressFormRequest request) {
        Gson gson = new Gson();

        String jsonRequest = gson.toJson(request);
        String responseString = "";
        String postUrl = "";
        try {
            UserUtil.writeRequest(jsonRequest, "addressValidateRequest", request.getForm().getLsoKey());

            postUrl = API_URL + "/ws-newapp/ds/violations/member";
            HttpClient httpClient = HttpClientBuilder.create().build();
            HttpPost post = new HttpPost(postUrl);
            StringEntity postingString = new StringEntity(jsonRequest, "UTF-8");//gson.tojson() converts your pojo to json
            post.setEntity(postingString);
            post.setHeader("Content-type", "application/json");
            HttpResponse response = httpClient.execute(post);
            HttpEntity responseEntity = response.getEntity();
            responseString = EntityUtils.toString(responseEntity, "UTF-8");

            UserUtil.writeResponse(responseString, "addressValidateResponse", request.getForm().getLsoKey());
        } catch (IOException e) {
            LOGGER.error("UniverseProvider Error: validateAddressForm()", e);
        }
        if (responseString.isEmpty()) {
            AddressFormResponse responseJson = new AddressFormResponse();
            responseJson.setError(false);
            return responseJson;
        } else {
            try{
                return gson.fromJson(responseString, AddressFormResponse.class);
            }catch(IllegalStateException e){
                LOGGER.error("UniverseProvider Error: validateAddressForm(). Request String: " + jsonRequest + ". URL: " + postUrl);
                throw new RuntimeException(e);
            }
        }
    }

    public FirmFormResponse validateFirmForm(FirmFormRequest request) {
        Gson gson = new Gson();

        String jsonRequest = gson.toJson(request);
        String responseString = "";
        String postUrl = "";
        try {
            UserUtil.writeRequest(jsonRequest, "firmValidateRequest", request.getForm().getFirmNumber());

            postUrl = API_URL + "/ws-newapp/ds/violations/firm";
            HttpClient httpClient = HttpClientBuilder.create().build();
            HttpPost post = new HttpPost(postUrl);
            StringEntity postingString = new StringEntity(jsonRequest, "UTF-8");//gson.tojson() converts your pojo to json
            post.setEntity(postingString);
            post.setHeader("Content-type", "application/json");
            HttpResponse response = httpClient.execute(post);
            HttpEntity responseEntity = response.getEntity();
            responseString = EntityUtils.toString(responseEntity, "UTF-8");

            UserUtil.writeResponse(responseString, "firmValidateResponse", request.getForm().getFirmNumber());
        } catch (IOException e) {
            LOGGER.error("UniverseProvider Error: validateFirmForm()", e);
        }
        if (responseString.isEmpty()) {
            FirmFormResponse responseJson = new FirmFormResponse();
            responseJson.setError(false);
            return responseJson;
        } else {
            try {
                return gson.fromJson(responseString, FirmFormResponse.class);
            } catch (IllegalStateException e){
                LOGGER.error("UniverseProvider Error: validateFirmForm(). Request String:" + jsonRequest + ". URL: " + postUrl);
                throw new RuntimeException(e);
            }
        }
    }

//    public NewExcessFormResponse validateNewExcessForm(NewExcessFormRequest request) {
//        Gson gson = new Gson();
//
//        String jsonRequest = gson.toJson(request);
//
//        String postUrl = API_URL + "/ws-newapp/fs/ds/violations/xs";
//        String responseString = "";
//        try{
//            HttpClient httpClient = HttpClientBuilder.create().build();
//            HttpPost post = new HttpPost(postUrl);
//            StringEntity postingString = new StringEntity(jsonRequest);//gson.tojson() converts your pojo to json
//            post.setEntity(postingString);
//            post.setHeader("Content-type", "application/json");
//            HttpResponse response = httpClient.execute(post);
//            HttpEntity responseEntity = response.getEntity();
//            EntityUtils.toString(responseEntity, "UTF-8");
//
//
//        } catch (Exception e) {
//
//        }
//
//
//        if (responseString.isEmpty())
//        {
//            NewExcessFormResponse responseJson = new NewExcessFormResponse();
//            responseJson.setError(false);
//            return responseJson;
//        }else
//        {
//            return gson.fromJson(responseString, NewExcessFormResponse.class);
//        }
//
//    }

    public FirmSearchResponse firmSearch(String searchTerm) {

        ArrayList<Firm> results = new ArrayList<>();

        Gson gson = new Gson();
        String postUrl = API_URL + "/ws-newapp/ds/members/firm/name/" + UriUtils.encode(searchTerm, "UTF-8");
        HttpClient httpClient = HttpClientBuilder.create().build();
        HttpGet get = new HttpGet(postUrl);
        get.setHeader("Content-type", "application/json");
        try {
            HttpResponse response = httpClient.execute(get);
            if (response.getStatusLine().getStatusCode() == 200) {
                HttpEntity responseEntity = response.getEntity();
                String responseString = EntityUtils.toString(responseEntity, "UTF-8");
                results = gson.fromJson(responseString, ArrayList.class);

                UserUtil.writeResponse(responseString, "firmSearchResponse", searchTerm);
            }
        } catch (IOException e) {
            LOGGER.error("UniverseProvider Error: firmSearch(). Request SearchTerm: " + searchTerm + ". URL: " + postUrl, e);
            throw new RuntimeException(e);
        }

        FirmSearchResponse searchResponse = new FirmSearchResponse();
        searchResponse.setFirms(results);
        return searchResponse;
    }

    public LawyerSearchResponse lawyerSearch(String firmID) {
        ArrayList<FirmContact> results = new ArrayList<>();

        Gson gson = new Gson();

        String postUrl = API_URL + "/ws-newapp/ds/members/firm/lawyers/" + firmID;
        HttpClient httpClient = HttpClientBuilder.create().build();
        HttpGet get = new HttpGet(postUrl);
        get.setHeader("Content-type", "application/json");

        try {
            HttpResponse response = httpClient.execute(get);
            if (response.getStatusLine().getStatusCode() == 200) {
                HttpEntity responseEntity = response.getEntity();
                String responseString = EntityUtils.toString(responseEntity, "UTF-8");

                Type listType = new TypeToken<ArrayList<FirmContact>>() {
                }.getType();
                results = gson.fromJson(responseString, listType);

                UserUtil.writeResponse(responseString, "lawyerSearchResponse", firmID);
            }
        } catch (IOException e) {
            LOGGER.error("UniverseProvider Error: lawyerSearch(). Request FirmID: " + firmID + ". URL: " + postUrl, e);
            throw new RuntimeException(e);
        }
        LawyerSearchResponse searchResponse = new LawyerSearchResponse();
        searchResponse.setLawyers(results);
        return searchResponse;
    }


    public TokenResponse checkToken(String token) {
        TokenResponse tokenResponse = new TokenResponse();
        Gson gson = new Gson();

        String postUrl = API_URL + "/ws-newapp/ds/authenticate/" + token;
        HttpClient httpClient = HttpClientBuilder.create().build();
        HttpGet get = new HttpGet(postUrl);
        get.setHeader("Content-type", "application/json");
        try {
            HttpResponse response = httpClient.execute(get);
            if (response.getStatusLine().getStatusCode() == 200) {
                HttpEntity responseEntity = response.getEntity();
                String responseString = EntityUtils.toString(responseEntity, "UTF-8");

                UserUtil.writeResponse(responseString, "tokenResponse", token.substring(0,8));

                tokenResponse = gson.fromJson(responseString, TokenResponse.class);
            }
        } catch (IOException e) {
            LOGGER.error("UniverseProvider Error: checkToken(). Request Token: " + token + ". URL: " + postUrl, e);
            throw new RuntimeException(e);
        }

        return tokenResponse;
    }
}
