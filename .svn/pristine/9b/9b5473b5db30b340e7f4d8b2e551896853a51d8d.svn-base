package lawpro.providers.lookups;

import lawpro.data.Lookup;
import lawpro.data.LookupValue;
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

@RunWith(MockitoJUnitRunner.class)
public class LookupProviderTests {

    @InjectMocks
    private LookupProvider instance;

    @Mock
    private ILookupRepository iLookupRepository;

    @Mock
    private ILookupValuesRepository iLookupValuesRepository;

    //TODO:Add test for getLookups()
    @Test
    public void testGetLookups() {
        List<Lookup> lookups = new ArrayList<>();
        Lookup lookupOne = new Lookup();
        lookupOne.setName("testNameOne");
        lookupOne.setId("testIdOne");
        Lookup lookupTwo = new Lookup();
        lookupTwo.setName("testNameTwo");
        lookupTwo.setId("testIdTwo");
        lookups.add(lookupOne);
        lookups.add(lookupTwo);
        Mockito.when(iLookupRepository.findAll()).thenReturn(lookups);

        List<DashboardLookup> returnValue = instance.getLookups();

        Mockito.verify(iLookupRepository, Mockito.times(1)).findAll();

        Assert.assertTrue(returnValue.size() == 2);

        Assert.assertTrue(returnValue.get(1).getName().equals(lookups.get(1).getName()));

    }

    @Test
    public void testGetLookup(){
        Lookup lookup = new Lookup();
        lookup.setName("testName");
        Optional<Lookup> optionalLookups = Optional.of(lookup);

        Mockito.when(iLookupRepository.findById("id")).thenReturn(optionalLookups);

        Lookup returnLookup = instance.getLookup("id");

        /* Verify that findById() was called one time with given Id */
        Mockito.verify(iLookupRepository, Mockito.times(1)).findById("id");
        /* Verify that controller returns lookup returned from findById() */
        Assert.assertTrue(returnLookup.getName().equals(optionalLookups.get().getName()));
    }

    @Test
    public void testGetLookupByName(){
        Lookup lookup = new Lookup();
        lookup.setName("testName");
        Optional<Lookup> optionalLookup = Optional.of(lookup);

        Mockito.when(iLookupRepository.findByName("id")).thenReturn(optionalLookup);

        lookup = instance.getLookupByName("id");

        /* Verify that findByName() was called one time */
        Mockito.verify(iLookupRepository, Mockito.times(1)).findByName("id");
        /* Verify that the value returned from the controller is the value returned from findByName() */
        Assert.assertTrue(optionalLookup.get().getName().equals(lookup.getName()));
    }

    @Test
    public void testGetLookupByOldId() {
        Lookup lookupOne = new Lookup();
        lookupOne.setOldId("testIdOne");
        Lookup lookupTwo = new Lookup();
        lookupTwo.setOldId("testIdTwo");
        List<Lookup> lookups = new ArrayList<>();
        lookups.add(lookupOne);
        lookups.add(lookupTwo);
        Mockito.when(iLookupRepository.findAll()).thenReturn(lookups);

        Lookup returnValue = instance.getLookupByOldId("testIdTwo");

        Mockito.verify(iLookupRepository, Mockito.times(1)).findAll();

        Assert.assertTrue(returnValue.getOldId().equals(lookupTwo.getOldId()));
    }

    @Test
    public void testGetValuesByLookupId(){
        List<LookupValue> lookupValues = new ArrayList<>();
        LookupValue lookupValue = new LookupValue();
        lookupValue.setValue("testValue");
        lookupValues.add(lookupValue);

        Mockito.when(iLookupValuesRepository.findByLookupId("id")).thenReturn(lookupValues);

        List<LookupValue> returnList = instance.getValuesByLookupId("id");

        /* Verify that findByLookupId() was called one time with value provided */
        Mockito.verify(iLookupValuesRepository, Mockito.times(1)).findByLookupId("id");
        /* Verify value returned from findByLookupId() was the value returned from method being tested */
        Assert.assertTrue(returnList.get(0).getValue().equals(lookupValue.getValue()));
    }

    @Test
    public void testGetValueById(){
        LookupValue lookupValue = new LookupValue();
        lookupValue.setValue("testValue");
        Optional<LookupValue> optionalLookupValue = Optional.of(lookupValue);

        Mockito.when(iLookupValuesRepository.findById("id")).thenReturn(optionalLookupValue);

        LookupValue returnLookupValue = instance.getValueById("id");

        Mockito.verify(iLookupValuesRepository, Mockito.times(1)).findById("id");

        Assert.assertTrue(returnLookupValue.getValue().equals(lookupValue.getValue()));
    }


}
