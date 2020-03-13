package lawpro.utils;

import lawpro.data.User;
import lawpro.models.UserInfo;
import lawpro.models.universe.Firm;
import lawpro.models.universe.response.FirmResponse;
import lawpro.models.universe.response.UserResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.PrintWriter;
import java.sql.Timestamp;
import java.util.Date;

public class UserUtil {

    private static Boolean logRequests = false;

    private UserUtil()
    {}

    public static String getLSONumberPartial(String LSONumber)
    {
        if (LSONumber != null && LSONumber.length() > 2)
        {
            if (LSONumber.startsWith("A0"))
                return LSONumber.substring(2);
            else if (LSONumber.startsWith("A"))
                return LSONumber.substring(1);
            else
                return LSONumber;
        }else
            return LSONumber;
    }

    public static void writeResponse(String responseString, String filename, String lsoNumber)
    {
        if (logRequests)
        {
            Date date = new Date();
            long time = date.getTime();
            Timestamp ts = new Timestamp(time);

            PrintWriter pw2 = null;
            try {
                String test = UserUtil.class.getProtectionDomain().getCodeSource().getLocation().getPath();
                pw2 = new PrintWriter(new FileOutputStream("c:/responses/" + filename + "_" + lsoNumber + ".txt"), true);
            } catch (FileNotFoundException e) {
                e.printStackTrace();
            }
            pw2.write(responseString);
            pw2.close();
        }
    }

    public static void writeRequest(String responseString, String filename, String lsoNumber)
    {
        if (logRequests)
        {
            Date date = new Date();
            long time = date.getTime();
            Timestamp ts = new Timestamp(time);

            PrintWriter pw2 = null;
            try {
                String test = UserUtil.class.getProtectionDomain().getCodeSource().getLocation().getPath();
                pw2 = new PrintWriter(new FileOutputStream("c:/requests/" + filename + "_" + lsoNumber + ".txt"), true);
            } catch (FileNotFoundException e) {
                e.printStackTrace();
            }
            pw2.write(responseString);
            pw2.close();
        }
    }

    public static boolean isLawyer(String username){
        String testString = username.substring(username.length() - 1);
        if (Character.isLetter(testString.charAt(0))) {
            return true;
        } else {
            return false;
        }
    }



}
