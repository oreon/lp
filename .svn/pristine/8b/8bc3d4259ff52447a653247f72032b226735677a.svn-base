package lawpro.providers;

import lawpro.models.UserInfo;
import lawpro.models.universe.TokenResponse;
import lawpro.models.universe.response.FirmResponse;
import lawpro.models.universe.response.UserOptionsResponse;
import lawpro.models.universe.response.UserResponse;
import lawpro.utils.InMemoryUsersUtil;
import lawpro.utils.PasswordEncoderUtil;
import lawpro.data.Admin;
import lawpro.repository.IAdminRepository;
import lawpro.utils.SessionUtil;
import lawpro.utils.UserUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.*;

@Configuration
public class CustomAuthenticationProvider implements AuthenticationProvider {

    @Autowired
    InMemoryUsersUtil inMemoryUsersUtil;

    @Autowired
    PasswordEncoderUtil passwordEncoderUtil;

    @Autowired
    UniverseProvider universeProvider;

    @Autowired
    AdminProvider adminProvider;

    @Value("${spring.profiles.active}")
    String activeEnv;

    public Authentication token(String token) {
        TokenResponse tokenResponse = universeProvider.checkToken(token);
        UserInfo userInfo = null;
        if (tokenResponse.isPermitted()) {
            String[] tokenSplit = token.split("\\*");
            String username = tokenSplit[0];

            if(UserUtil.isLawyer(username)) {

                UserResponse user = universeProvider.userDetails(username);

                if (user != null && !user.isError()) {
                    Authentication authToken = getLawyerToken(tokenResponse.getLsoKey(), "TOKEN");
                    FirmResponse firmResponse = universeProvider.firmDetailsByID(user.getFirmKey());

                    SecurityContextHolder.getContext().setAuthentication(authToken);

                    UserOptionsResponse userOptions = universeProvider.memberOptionsByID(user.getLSONumber());
                    userInfo = new UserInfo(username, user.getContactName().getFirstName(), user.getContactName().getLastName(),
                            user.getEmail(), true, false,false, "", firmResponse, user.getLSONumber(), user);

                    SessionUtil.getSession().setAttribute("options", userOptions);
                    SessionUtil.getSession().setAttribute("hideMenus", true);

                    SessionUtil.setUserInfo(userInfo);
                    return authToken;
                }else if (user != null) {
                    SessionUtil.getSession().setAttribute("error", user.isError());
                    SessionUtil.getSession().setAttribute("message", user.getMessage());
                }


            } else {
                UsernamePasswordAuthenticationToken authToken = null;

                FirmResponse firmResponse = universeProvider.firmDetailsByID(username);

                if (firmResponse != null && !firmResponse.isError()) {
                    authToken = getFirmToken(firmResponse.getFirm().getFirmNumber(), "");
                    SecurityContextHolder.getContext().setAuthentication(authToken);

                    userInfo = new UserInfo(username, firmResponse.getFirm().getClaimAdmin().getFirstName(),
                            firmResponse.getFirm().getClaimAdmin().getLastName(), firmResponse.getFirm().getEmail(),
                            false, true, false, "", firmResponse, firmResponse.getFirm().getFirmNumber(), new UserResponse());
                    SessionUtil.setUserInfo(userInfo);
                    SessionUtil.getSession().setAttribute("hideMenus", true);
                } else {
                    SessionUtil.getSession().setAttribute("error", firmResponse.isError());
                    SessionUtil.getSession().setAttribute("message", firmResponse.getMessage());
                }
                return authToken;

            }


        } else {
            return null;
        }

        return null;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String username = authentication.getName();
        String password = (String) authentication.getCredentials();
        UsernamePasswordAuthenticationToken token = null;
        UserInfo userInfo = null;

        if (inMemoryUsersUtil.getInMemoryUserDetailsManager().userExists(username)) {
            token = getInMemoryToken(username, password);
            if (token != null) {
                userInfo = new UserInfo(username, "", "", "", false, false, false, "", new FirmResponse(), "A000000", new UserResponse());
                SessionUtil.setUserInfo(userInfo);
            }
        } else if (adminProvider.existsByUsername(username)) {
            Admin admin = adminProvider.findByIsActiveAndUsername(true, username);
            token = getAdminToken(password, admin);

            if (token != null) {
                FirmResponse firm = new FirmResponse();
                firm.setFirmForAdmin();
                userInfo = new UserInfo(username, "Admin", "AdminLast", admin.getEmail(), false, false, true, "", firm , "A000000", new UserResponse());
                SessionUtil.setUserInfo(userInfo);
            }
        } else {
            if (activeEnv.equals("dev") && password.equals("password")) {
                if (UserUtil.isLawyer(username)) {
                    UserResponse user = universeProvider.userDetails(username);
                    token = getLawyerToken(username, password);

                    UserOptionsResponse userOptions = universeProvider.memberOptionsByID(user.getLSONumber());
                    SessionUtil.getSession().setAttribute("options", userOptions);

                    FirmResponse firmResponse = universeProvider.firmDetailsByID(user.getFirmKey());
                    userInfo = new UserInfo(username, user.getContactName().getFirstName(), user.getContactName().getLastName(),
                            user.getEmail(), true, false,false, "", firmResponse, user.getLSONumber(), user);

                } else {
                    FirmResponse firmResponse = universeProvider.firmDetailsByID(username);
                    token = getFirmToken(username, password);
                    userInfo = new UserInfo(username, firmResponse.getFirm().getClaimAdmin().getFirstName(),
                            firmResponse.getFirm().getClaimAdmin().getLastName(), firmResponse.getFirm().getEmail(),
                            false, true, false, "", firmResponse, firmResponse.getFirm().getFirmNumber(), new UserResponse());
                }

                SessionUtil.setUserInfo(userInfo);
            }
        }


        return token;
    }

    @Override
    public boolean supports(Class<?> args0){
        return true;
    }

    private UsernamePasswordAuthenticationToken getInMemoryToken(String username, String password) {
        UserDetails user =inMemoryUsersUtil.getInMemoryUserDetailsManager().loadUserByUsername(username);
        if(passwordEncoderUtil.getEncoder().matches(password, user.getPassword())) {
            return new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
        } else {
            return null;
        }
    }

    private UsernamePasswordAuthenticationToken getAdminToken(String password, Admin admin) {
        if(admin != null) {
            if (passwordEncoderUtil.getEncoder().matches(password, admin.getPassword()) && admin.isActive()) {
                List<GrantedAuthority> authorities = new ArrayList<>();
                authorities.add(new SimpleGrantedAuthority(admin.getFullRole()));
                authorities.add(new SimpleGrantedAuthority(admin.getFullPriv()));

                Collection<GrantedAuthority> finalAuthorities = authorities;
                UserDetails adminUserDetails =
                        User.builder()
                                .username(admin.getUsername())
                                .password(admin.getPassword())
                                .roles("ADMIN").authorities(finalAuthorities)
                                .build();
                return new UsernamePasswordAuthenticationToken(adminUserDetails, null, authorities);
            } else {
                return null;
            }
        } else {
            return null;
        }

    }

    private UsernamePasswordAuthenticationToken getLawyerToken(String username, String password) {
        Collection<GrantedAuthority> authorities = new ArrayList<>(Arrays.asList(new SimpleGrantedAuthority("ROLE_USER")));
        UserResponse user = universeProvider.userDetails(username);
        UsernamePasswordAuthenticationToken token = null;
        if (user != null && !user.isError()) {
            UserDetails userDetails = User.builder().username(UserUtil.getLSONumberPartial(user.getLSONumber())).password(password).roles("USER").authorities(authorities).build();
            token = new UsernamePasswordAuthenticationToken(userDetails, password, authorities);
            SessionUtil.setErrorAndMessage(user.isError(), user.getMessage());
        } else if (user != null) {
            SessionUtil.setErrorAndMessage(user.isError(), user.getMessage());
        }
        return token;
    }

    private UsernamePasswordAuthenticationToken getFirmToken(String username, String password) {
        FirmResponse firm = universeProvider.firmDetailsByID(username);
        UsernamePasswordAuthenticationToken token = null;
        Collection<GrantedAuthority> authorities = new ArrayList<>(Arrays.asList(new SimpleGrantedAuthority("ROLE_USER")));

        if (firm != null && !firm.isError()) {
            UserDetails userDetails = User.builder().username(firm.getFirm().getFirmNumber()).password(password).roles("USER").authorities(authorities).build();
            token = new UsernamePasswordAuthenticationToken(userDetails, password, authorities);
            SessionUtil.setErrorAndMessage(firm.isError(), firm.getMessage());
        } else if (firm != null) {
            SessionUtil.setErrorAndMessage(firm.isError(), firm.getMessage());
        }

        return token;

    }


}
