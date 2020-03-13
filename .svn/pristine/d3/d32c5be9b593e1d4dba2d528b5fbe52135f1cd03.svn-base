package lawpro;

import lawpro.controllers.FormController;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.context.request.RequestContextListener;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;

@RunWith(SpringRunner.class)
@SpringBootTest
public class MyLawProApplicationTests {

    @Autowired
    private FormController formController;

    @Test
    public void contextLoads() {
        Assert.assertTrue(formController != null);
    }

}
