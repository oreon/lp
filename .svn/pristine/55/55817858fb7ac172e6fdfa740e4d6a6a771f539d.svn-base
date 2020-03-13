package lawpro;

import lawpro.repository.ITokenRepository;
import lawpro.services.CustomUserDetailsService;
import lawpro.services.TokenService;
import lawpro.utils.PasswordEncoderUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import lawpro.utils.InMemoryUsersUtil;
import lawpro.providers.CustomAuthenticationProvider;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    CustomAuthenticationProvider customAuthenticationProvider;

    @Autowired
    InMemoryUsersUtil inMemoryUsersUtil;

    @Autowired
    PasswordEncoderUtil passwordEncoderUtil;

    @Value("${spring.profiles.active}")
    String activeProfileValue;

    @Bean(name="activeProfile")
    public ActiveProfile activeProfile() { return() -> activeProfileValue; }

    public interface ActiveProfile
    {
        String activeProfile();
    }

    @Autowired
    TokenService tokenService;

    @Autowired
    CustomUserDetailsService customUserDetailsService;

    @Value("${legacyURL}")
    String legacyURL;

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(customAuthenticationProvider);

    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .antMatchers("/", "/payment", "/auth", "/home", "/login", "/timeout", "/error", "/css/**/**", "/logout", "/css/**", "/js/**", "/img/**", "/fonts/**", "/style.css", "/script.js", "/address.js","/monerislog").permitAll()
                .anyRequest().authenticated()
                .and()
                .csrf()
                .ignoringAntMatchers("/login", "/payment","/monerislog")
                .and()
                .formLogin()
                .loginPage(legacyURL)
                .loginProcessingUrl("/login")
                .defaultSuccessUrl("/home", true)
                .permitAll()
                .and()
                .rememberMe().rememberMeParameter("remember-me")
                .tokenRepository(tokenService)
                .userDetailsService(customUserDetailsService)
                .tokenValiditySeconds(999999999)
                .and()
                .logout().logoutUrl("/logout")
                .deleteCookies("JSESSIONID")
                .invalidateHttpSession(true)
                .logoutSuccessUrl(legacyURL)
                .permitAll();
    }

    @Bean
    @Override
    public UserDetailsService userDetailsService() {

        PasswordEncoder encoder = passwordEncoderUtil.getEncoder();

        ArrayList<UserDetails> users = new ArrayList<UserDetails>();
        InMemoryUserDetailsManager inMemoryUserDetailsManager = new InMemoryUserDetailsManager(users);
        inMemoryUsersUtil.setInMemoryUserDetailsManager(inMemoryUserDetailsManager);

        return new InMemoryUserDetailsManager(users);
    }
}