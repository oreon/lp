package lawpro.services;

import lawpro.models.universe.response.UserResponse;
import lawpro.providers.UniverseProvider;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

@RunWith(MockitoJUnitRunner.class)
public class UserServiceTests {

    @InjectMocks
    private UserService instance;

    @Mock
    private UniverseProvider universeProvider;

    @Test
    public void testgetUserDetails() {
        UserResponse userResponse = new UserResponse();
        userResponse.setEmail("testEmail");

        Mockito.when(universeProvider.userDetails("testId")).thenReturn(userResponse);

        UserResponse returnValue = instance.getUserDetails("testId");

        Mockito.verify(universeProvider, Mockito.times(1)).userDetails("testId");

        Assert.assertTrue(returnValue.getEmail().equals(userResponse.getEmail()));
    }

}
