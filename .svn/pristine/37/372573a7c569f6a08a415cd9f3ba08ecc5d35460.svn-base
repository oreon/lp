package lawpro.controllers;

import common.models.RequestModel;
import lawpro.controllers.rest.LookupRestController;
import lawpro.data.LookupValue;
import lawpro.models.LookupValueModel;
import lawpro.services.lookups.LookupService;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

@RunWith(MockitoJUnitRunner.class)
public class LookupRestControllerTests {

    @InjectMocks
    private LookupRestController instance;

    @Mock
    private LookupService lookupService;

    @Test
    public void testAdd() {
        LookupValueModel lookupValueModel = new LookupValueModel();
        lookupValueModel.setId("testId");
        LookupValue lookupValue = new LookupValue();
        lookupValue.setValue("testValue");

        Mockito.when(lookupService.addLookupValue(lookupValueModel)).thenReturn(lookupValue);

        LookupValue returnValue = instance.add(lookupValueModel);

        Mockito.verify(lookupService, Mockito.times(1)).addLookupValue(lookupValueModel);

        Assert.assertTrue(returnValue.getValue().equals(lookupValue.getValue()));
    }

    @Test
    public void testEdit() {
        LookupValueModel lookupValueModel = new LookupValueModel();
        lookupValueModel.setId("testId");
        LookupValue lookupValue = new LookupValue();
        lookupValue.setValue("testValue");

        Mockito.when(lookupService.editLookupValue(lookupValueModel)).thenReturn(lookupValue);

        LookupValue returnValue = instance.edit(lookupValueModel);

        Mockito.verify(lookupService, Mockito.times(1)).editLookupValue(lookupValueModel);

        Assert.assertTrue(returnValue.getValue().equals(lookupValue.getValue()));
    }

    @Test
    public void testDeleteError() {
        RequestModel requestModel = new RequestModel();
        requestModel.setId("testId");

        Mockito.when(lookupService.deleteLookupValue(requestModel)).thenReturn(true);

        Assert.assertTrue(instance.delete(requestModel));

        Mockito.verify(lookupService, Mockito.times(1)).deleteLookupValue(requestModel);
    }

}
