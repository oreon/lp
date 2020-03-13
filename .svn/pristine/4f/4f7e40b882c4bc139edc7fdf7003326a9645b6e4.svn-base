package lawpro.controllers;

import lawpro.data.Lookup;
import lawpro.data.LookupValue;
import lawpro.services.lookups.LookupService;
import lawpro.viewmodels.DashboardLookup;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;
import java.util.List;

@RunWith(MockitoJUnitRunner.class)
public class LookupControllerTests {

    @InjectMocks
    private LookupController instance;

    @Mock
    private LookupService lookupService;

    @Test
    public void testLookups() {
        DashboardLookup lookupOne = new DashboardLookup();
        DashboardLookup lookupTwo = new DashboardLookup();
        List<DashboardLookup> lookups = new ArrayList<>();
        lookups.add(lookupOne);
        lookups.add(lookupTwo);

        Mockito.when(lookupService.getLookups()).thenReturn(lookups);

        ModelAndView returnValue = instance.lookups();

        Mockito.verify(lookupService, Mockito.times(1)).getLookups();

        Assert.assertTrue(returnValue.getViewName().equals("dashboard/lookups"));
        List<DashboardLookup> returnList = (List<DashboardLookup>) returnValue.getModel().get("lookups");

        Assert.assertTrue(returnList.size() == 2);
    }

    @Test
    public void testAdd() {
        Lookup lookup = new Lookup();
        lookup.setId("testId");
        Mockito.when(lookupService.getLookupById("testId")).thenReturn(lookup);

        ModelAndView returnValue = instance.add("testId");

        Mockito.verify(lookupService, Mockito.times(1)).getLookupById("testId");

        Assert.assertTrue(returnValue.getViewName().equals("dashboard/lookupAdd"));

        Lookup returnLookup = (Lookup) returnValue.getModel().get("lookup");

        Assert.assertTrue(returnLookup.getId().equals("testId"));
    }

    @Test
    public void testAddNull() {
        Mockito.when(lookupService.getLookupById("testId")).thenReturn(null);
        ModelAndView returnValue = instance.add("testId");
        Mockito.verify(lookupService, Mockito.times(1)).getLookupById("testId");
        Assert.assertTrue(returnValue.getViewName().equals("redirect:/error"));
        Assert.assertTrue(returnValue.getModel().get("lookup") == null);
    }

    @Test
    public void testEdit() {
        LookupValue lookupValue = new LookupValue();
        lookupValue.setId("testId");
        Mockito.when(lookupService.getValueById("testId")).thenReturn(lookupValue);

        ModelAndView returnValue = instance.edit("testId");

        Mockito.verify(lookupService, Mockito.times(1)).getValueById("testId");

        LookupValue returnLookup = (LookupValue) returnValue.getModel().get("lookupValue");

        Assert.assertTrue(returnLookup.getId().equals("testId"));

        Assert.assertTrue(returnValue.getViewName().equals("dashboard/lookupEdit"));
    }

    @Test
    public void testEditNull() {
        Mockito.when(lookupService.getValueById("testId")).thenReturn(null);
        ModelAndView returnValue = instance.edit("testId");
        Mockito.verify(lookupService, Mockito.times(1)).getValueById("testId");
        Assert.assertTrue(returnValue.getViewName().equals("redirect:/error"));
        Assert.assertTrue(returnValue.getModel().get("lookupValue") == null);
    }

    @Test
    public void testLookup() {

        Lookup lookup = new Lookup();
        lookup.setId("testId");

        LookupValue lookupValueOne = new LookupValue();
        LookupValue lookupValueTwo = new LookupValue();
        List<LookupValue> lookupValues = new ArrayList<>();
        lookupValues.add(lookupValueOne);
        lookupValues.add(lookupValueTwo);

        Mockito.when(lookupService.getLookupById("testId")).thenReturn(lookup);

        Mockito.when(lookupService.getValuesByLookupId("testId")).thenReturn(lookupValues);

        ModelAndView returnValue = instance.lookup("testId");

        Mockito.verify(lookupService, Mockito.times(1)).getLookupById("testId");

        Mockito.verify(lookupService, Mockito.times(1)).getValuesByLookupId("testId");

        Assert.assertTrue(returnValue.getViewName().equals("dashboard/lookup"));

        Lookup returnLookup = (Lookup) returnValue.getModel().get("lookup");

        Assert.assertTrue(returnLookup.getLookups().size() == 2);
    }

    @Test
    public void testLookupNull() {


        Mockito.when(lookupService.getLookupById("testId")).thenReturn(null);

        //Mockito.when(lookupService.getValuesByLookupId("testId")).thenReturn(null);

        ModelAndView returnValue = instance.lookup("testId");

        Mockito.verify(lookupService, Mockito.times(1)).getLookupById("testId");

        Mockito.verify(lookupService, Mockito.times(0)).getValuesByLookupId("testId");

        Assert.assertTrue(returnValue.getViewName().equals("redirect:error"));

        Assert.assertTrue(returnValue.getModel().get("lookup") == null);

    }

}
