package lawpro.utils;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@RunWith(MockitoJUnitRunner.class)
public class PasswordEncoderUtilTests {

    @InjectMocks
    private PasswordEncoderUtil instance;

    @Test
    public void testGetEncoder(){
        PasswordEncoder passwordEncoder = instance.getEncoder();
        Assert.assertNotNull(passwordEncoder);
    }

}
