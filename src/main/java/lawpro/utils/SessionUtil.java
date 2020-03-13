package lawpro.utils;

import lawpro.models.UserInfo;
import lawpro.models.universe.response.FirmResponse;
import lawpro.models.universe.response.UserOptionsResponse;
import lawpro.models.universe.response.UserResponse;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

public class SessionUtil {

    public static void setFromFormForMoneris(String fromForm){
        getSession().setAttribute("fromForm", fromForm);
    }

    public static String getFromFormForMoneris(){
        return (String) getSession().getAttribute("fromForm");
    }

    public static void setUserInfo(UserInfo userInfo) {
        getSession().setAttribute("userInfo", userInfo);
    }

    public static UserInfo getUserInfo() {
        return (UserInfo) getSession().getAttribute("userInfo");
    }

    public static void setErrorAndMessage(Boolean isError, String message) {
        getSession().setAttribute("error", isError);
        getSession().setAttribute("message", message);
    }

    public static void setLastForm(String form) {
        UserInfo userInfo = (UserInfo) getSession().getAttribute("userInfo");
        userInfo.setLastForm(form);
        getSession().setAttribute("userInfo", userInfo);
    }

    public static String getLastForm() {
        UserInfo userInfo = (UserInfo) getSession().getAttribute("userInfo");
        return userInfo.getLastForm();
    }

    public static String getUsername() {
        UserInfo userInfo = (UserInfo) getSession().getAttribute("userInfo");
        return userInfo.getUsername();
    }

    public static void setUserOptions(UserOptionsResponse userOptions) {
        getSession().setAttribute("options", userOptions);
    }

    public static UserOptionsResponse getUserOptions(UserOptionsResponse userOptions) {
       return (UserOptionsResponse) getSession().getAttribute("options");
    }


    public static UserResponse getUser(){
        return (UserResponse) getSession().getAttribute("user");
    }

    public static void setUserFirm(FirmResponse firm) {
        getSession().setAttribute("userFirm", firm);
    }

    public static FirmResponse getUserFirm() {
        return (FirmResponse) getSession().getAttribute("userFirm");
    }

    public static HttpSession getSession() {
        RequestAttributes requestAttributes = RequestContextHolder
                .currentRequestAttributes();
        ServletRequestAttributes attributes = (ServletRequestAttributes) requestAttributes;
        HttpServletRequest request = attributes.getRequest();
        HttpSession session = request.getSession();
        return session;
    }

    public static UserResponse getUserResponse() {
        UserInfo userInfo = SessionUtil.getUserInfo();
        return userInfo.getUser();
    }
}
