package lawpro.controllers;

import lawpro.data.Lookup;
import lawpro.data.LookupValue;
import lawpro.services.lookups.LookupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class LookupController {

    @Autowired
    private LookupService lookupService;

    @Value("${spring.profiles.active}")
    private String env;

    @GetMapping({"/dashboard/lookups"})
    public ModelAndView lookups()
    {
        ModelAndView mv = new ModelAndView();
        mv.setViewName("dashboard/lookups");
        mv.addObject("isProd", (env.equals("prod")));
        mv.addObject("lookups", lookupService.getLookups());

        return mv;
    }

    @GetMapping("/dashboard/lookup/{id}/add")
    public ModelAndView add(@PathVariable("id") String id)
    {
        ModelAndView mv = new ModelAndView();
        mv.addObject("isProd", (env.equals("prod")));
        mv.setViewName("dashboard/lookupAdd");

        Lookup lookup = lookupService.getLookupById(id);

        if (lookup != null)
        {
            mv.addObject("lookup", lookup);
        }else{
            return new ModelAndView("redirect:/error");
        }

        return mv;
    }

    @GetMapping("/dashboard/lookup/{id}/edit")
    public ModelAndView edit(@PathVariable("id") String id)
    {
        ModelAndView mv = new ModelAndView();
        mv.addObject("isProd", (env.equals("prod")));
        mv.setViewName("dashboard/lookupEdit");

        LookupValue lookupValue = lookupService.getValueById(id);

        if (lookupValue != null)
        {
            mv.addObject("lookupValue", lookupValue);
        }else{
            return new ModelAndView("redirect:/error");
        }

        return mv;
    }

    @GetMapping("/dashboard/lookup/{id}")
    public ModelAndView lookup(@PathVariable("id") String id)
    {
        ModelAndView mv = new ModelAndView();
        mv.addObject("isProd", (env.equals("prod")));
        mv.setViewName("dashboard/lookup");

        //Find lookup by id
        Lookup lookup = lookupService.getLookupById(id);

        if (lookup != null)
        {
            lookup.setLookups(lookupService.getValuesByLookupId(lookup.getId()));
            //we have lookup
            mv.addObject("lookup", lookup);
        }else{
            return new ModelAndView("redirect:error");
        }

        return mv;
    }
}
