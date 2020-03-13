package lawpro.services.lookups;


import common.models.RequestModel;
import lawpro.data.Lookup;
import lawpro.data.LookupValue;
import lawpro.models.LookupValueModel;
import lawpro.providers.lookups.LookupProvider;
import lawpro.providers.lookups.LookupValueProvider;
import lawpro.repository.ILookupRepository;
import lawpro.repository.ILookupValuesRepository;
import lawpro.viewmodels.DashboardLookup;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;

@RunWith(MockitoJUnitRunner.class)
public class LookupServiceTests {

    @InjectMocks
    private LookupService instance;

    @Mock
    private LookupProvider lookupProvider;

    @Mock
    private LookupValueProvider lookupValueProvider;

    @Mock
    private ILookupValuesRepository lookupValuesRepository;

    @Mock
    private ILookupRepository iLookupRepository;

    @Test
    public void testGetLookups() {
        List<DashboardLookup> dashboardLookupList = new ArrayList<>();
        DashboardLookup dashboardLookup = new DashboardLookup("testName", "testId", "testUsage", 1);
        dashboardLookup.setId("testId");
        dashboardLookupList.add(dashboardLookup);

        Mockito.when(lookupProvider.getLookups()).thenReturn(dashboardLookupList);

        List<DashboardLookup> returnList = instance.getLookups();

        /* Verify that getLookups() was called one time */
        Mockito.verify(lookupProvider, Mockito.times(1)).getLookups();

        /* Verify that value being returned by getLookups() is value returned by method being tested */
        Assert.assertTrue(returnList.get(0).getId().equals(dashboardLookup.getId()));
    }

    @Test
    public void testGetLookupById() {
        Lookup lookup = new Lookup();
        lookup.setName("testName");

        Mockito.when(lookupProvider.getLookup("testId")).thenReturn(lookup);

        Lookup returnValue = instance.getLookupById("testId");

        Mockito.verify(lookupProvider, Mockito.times(1)).getLookup("testId");

        Assert.assertTrue(returnValue.getName().equals(lookup.getName()));
    }

    @Test
    public void testGetValueById() {
        LookupValue lookupValue = new LookupValue();
        lookupValue.setValue("testValue");

        Mockito.when(lookupProvider.getValueById("testId")).thenReturn(lookupValue);

        LookupValue returnValue = instance.getValueById("testId");

        Mockito.verify(lookupProvider, Mockito.times(1)).getValueById("testId");

        Assert.assertTrue(returnValue.getValue().equals(lookupValue.getValue()));
    }

    @Test
    public void testGetValuesByLookupId() {
        LookupValue lookupValueOne = new LookupValue();
        lookupValueOne.setValue("testValueOne");
        LookupValue lookupValueTwo = new LookupValue();
        lookupValueTwo.setValue("testValueTwo");
        List<LookupValue> lookupValues = new ArrayList<>();
        lookupValues.add(lookupValueOne);
        lookupValues.add(lookupValueTwo);

        Mockito.when(lookupProvider.getValuesByLookupId("testId")).thenReturn(lookupValues);

        List<LookupValue> returnValue = instance.getValuesByLookupId("testId");

        Mockito.verify(lookupProvider, Mockito.times(1)).getValuesByLookupId("testId");

        Assert.assertTrue(returnValue.get(0).getValue().equals(lookupValueOne.getValue()));

        Assert.assertTrue(returnValue.get(1).getValue().equals(lookupValueTwo.getValue()));

        Assert.assertTrue(returnValue.size() == lookupValues.size());
    }

    @Test
    public void testAddLookupValue() {
        LookupValueModel lookupValueModel = new LookupValueModel();
        lookupValueModel.setName("testName");
        lookupValueModel.setSort(3);
        lookupValueModel.setValue("testValue");
        lookupValueModel.setLookupId("testLookupId");

        LookupValue lookupValue = new LookupValue();
        lookupValue.setName("testName");
        lookupValue.setSort(3);
        lookupValue.setValue("testValue");
        lookupValue.setLookupId("testLookupId");

        Mockito.when(lookupValuesRepository.save(any())).thenReturn(lookupValue);

        LookupValue returnValue = instance.addLookupValue(lookupValueModel);

        Assert.assertTrue(returnValue.getValue().equals(lookupValueModel.getValue()));
    }

    @Test
    public void testEditLookupValue() {
        LookupValue lookupValue = new LookupValue();
        lookupValue.setLookupId("testLookupId");
        lookupValue.setValue("testValue");
        lookupValue.setId("testId");

        LookupValueModel lookupValueModel = new LookupValueModel();
        lookupValueModel.setLookupId("testId");
        lookupValueModel.setValue("testValue");
        lookupValueModel.setId("testId");

        Mockito.when(lookupValueProvider.findById("testId")).thenReturn(Optional.of(lookupValue));

        Mockito.when(lookupValuesRepository.save(any(LookupValue.class))).thenReturn(lookupValue);

        LookupValue returnValue = instance.editLookupValue(lookupValueModel);

        Mockito.verify(lookupValueProvider, Mockito.times(1)).findById("testId");

        Mockito.verify(lookupValuesRepository, Mockito.times(1)).save(any(LookupValue.class));

        Assert.assertTrue(returnValue.getValue().equals(lookupValueModel.getValue()));

    }

    @Test
    public void testDeleteLookupValue() {
        RequestModel requestModel = new RequestModel();
        requestModel.setId("testId");

        LookupValue lookupValue = new LookupValue();
        lookupValue.setValue("testValue");

        Mockito.when(lookupValueProvider.findById("testId")).thenReturn(Optional.of(lookupValue));

        Mockito.doNothing().when(lookupValuesRepository).delete(any(LookupValue.class));

        boolean returnValue = instance.deleteLookupValue(requestModel);

        Mockito.verify(lookupValueProvider, Mockito.times(1)).findById("testId");

        Mockito.verify(lookupValuesRepository, Mockito.times(1)).delete(any(LookupValue.class));

        Assert.assertTrue(returnValue);
    }

    @Test
    public void testCreateLookup() {
        Lookup lookup = new Lookup();
        lookup.setId("testId");

        Mockito.when(iLookupRepository.save(lookup)).thenReturn(lookup);

        instance.createLookup(lookup);

        Mockito.verify(iLookupRepository, Mockito.times(1)).save(lookup);
    }

}

