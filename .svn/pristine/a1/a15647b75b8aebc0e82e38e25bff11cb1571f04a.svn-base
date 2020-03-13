package lawpro.services;


import lawpro.models.universe.Firm;
import lawpro.models.universe.response.FirmResponse;
import lawpro.models.universe.response.FirmSearchResponse;
import lawpro.providers.UniverseProvider;
import lawpro.services.FirmService;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.ArrayList;
import java.util.List;

@RunWith(MockitoJUnitRunner.class)
public class FirmServiceTests {

    @InjectMocks
    private FirmService instance;

    @Mock
    private UniverseProvider universeProvider;

    @Test
    public void testFirmSearch() throws Exception {
        Firm firm = new Firm();
        firm.setFirmNumber("testFirmNumber");
        List<Firm> firms = new ArrayList<>();
        firms.add(firm);
        FirmSearchResponse firmSearchResponse = new FirmSearchResponse();
        firmSearchResponse.setFirms(firms);

        Mockito.when(universeProvider.firmSearch("testTerm")).thenReturn(firmSearchResponse);

        FirmSearchResponse response = instance.searchFirm("testTerm", "");

        Mockito.verify(universeProvider, Mockito.times(1)).firmSearch("testTerm");

        Assert.assertTrue(response.getFirms().get(0).getFirmNumber().equals(firm.getFirmNumber()));
    }

    @Test
    public void testGetFirmDetails() throws Exception {
        Firm firm = new Firm();
        firm.setFirmNumber("testFirmNumber");
        FirmResponse firmResponse = new FirmResponse();
        firmResponse.setFirm(firm);

        Mockito.when(universeProvider.firmDetailsByID("testFirmNumber")).thenReturn(firmResponse);

        FirmResponse returnValue = instance.getFirmDetails("testFirmNumber");

        Mockito.verify(universeProvider, Mockito.times(1)).firmDetailsByID("testFirmNumber");

        Assert.assertTrue(returnValue.getFirm().getFirmNumber().equals(firm.getFirmNumber()));
    }

    @Test
    public void testGetFirmDetailsByUser() throws Exception {
        Firm firm = new Firm();
        firm.setFirmNumber("testFirmNumber");
        FirmResponse firmResponse = new FirmResponse();
        firmResponse.setFirm(firm);

        Mockito.when(universeProvider.firmDetailsByID("testUsername")).thenReturn(firmResponse);

        FirmResponse returnValue = instance.getFirmDetailsByUser("testUsername");

        Mockito.verify(universeProvider, Mockito.times(1)).firmDetailsByID("testUsername");

        Assert.assertTrue(returnValue.getFirm().getFirmNumber().equals(firm.getFirmNumber()));
    }

}
