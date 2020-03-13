package lawpro.providers.lookups;


import lawpro.data.LookupValue;
import lawpro.repository.ILookupValuesRepository;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.Optional;

@RunWith(MockitoJUnitRunner.class)
public class LookupValueProviderTests {

    @InjectMocks
    private LookupValueProvider instance;

    @Mock
    private ILookupValuesRepository iLookupValuesRepository;

    @Test
    public void testFindById() {
        LookupValue lookupValue = new LookupValue();
        lookupValue.setValue("testValue");

        Mockito.when(iLookupValuesRepository.findById("testId")).thenReturn(Optional.of(lookupValue));

        Optional<LookupValue> returnValue = instance.findById("testId");

        /* Verify that findById() was called one time with provided value */
        Mockito.verify(iLookupValuesRepository, Mockito.times(1)).findById("testId");

        /* Verify that value returned by findById() is value returned by method being tested */
        Assert.assertTrue(returnValue.get().getValue().equals(lookupValue.getValue()));
    }



}

