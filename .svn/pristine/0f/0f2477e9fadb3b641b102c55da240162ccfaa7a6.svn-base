package lawpro.controllers;

import lawpro.data.Admin;
import lawpro.data.input.AddUser;
import lawpro.data.input.UserActiveSwitch;
import lawpro.data.input.EditUser;
import lawpro.services.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@Controller
public class UsersController {

    @Autowired
    private AdminService adminService;

    /* Get users to list */
    @GetMapping("/dashboard/users")
    public ModelAndView users(){
        ModelAndView mv = new ModelAndView();

        mv.addObject("addUser", new AddUser());
        mv.addObject("editUser", new EditUser());
        mv.addObject("userActiveSwitch", new UserActiveSwitch());
        List<Admin> admins = adminService.getAdmins();
        mv.addObject("adminUsers", admins);

        mv.setViewName("users");
        return mv;
    }


    /* Add user */
    @PostMapping(value = "/addUser")
    public ModelAndView addUser(@ModelAttribute AddUser addUser){
        adminService.addUser(addUser);
        return new ModelAndView("redirect:" + "/dashboard/users");
    }

    /* Edit user */
    @PostMapping(value = "/editUser")
    public ModelAndView editUser(@ModelAttribute EditUser editUser){
        adminService.editUser(editUser);
        return new ModelAndView("redirect:" + "/dashboard/users");
    }

    /* Deactivate user */
    @PostMapping(value = "/userActiveSwitch")
    public ModelAndView userActiveSwitch(@RequestParam ("username") String username, @RequestParam ("action") String action) {
        if(action.equals("deactivate")){
            adminService.deactivateUser(username);
        } else {
            adminService.activateUser(username);
        }
        return new ModelAndView("redirect:" + "/dashboard/users");
    }

    @PostMapping(value = "/checkUserExists")
    @ResponseBody
    public boolean checkUserExists(@RequestParam ("username") String username){
        return adminService.checkUserExists(username);
    }



}
