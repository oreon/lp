package lawpro.services;

import lawpro.data.Admin;
import lawpro.repository.IAdminRepository;
import lawpro.utils.InMemoryUsersUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Component
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    IAdminRepository iAdminRepository;

    @Autowired
    InMemoryUsersUtil inMemoryUsersUtil;

    @Override
    public UserDetails loadUserByUsername(String username){
        InMemoryUserDetailsManager inMemoryUserDetailsManager = inMemoryUsersUtil.getInMemoryUserDetailsManager();
        UserDetails user = null;
        UserDetails admin = null;
        Optional<Admin> adminRepo = null;
        if(inMemoryUserDetailsManager.userExists(username)){
            user = inMemoryUserDetailsManager.loadUserByUsername(username);
            return user;
        } else {
            adminRepo = iAdminRepository.findByUsername(username);
            List<GrantedAuthority> authorities = new ArrayList<>();
            if (adminRepo.isPresent())
            {
                authorities.add(new SimpleGrantedAuthority(adminRepo.get().getFullRole()));
                authorities.add(new SimpleGrantedAuthority(adminRepo.get().getFullPriv()));

                Collection<GrantedAuthority> finalAuthorities = authorities;
                admin = User.builder().username(adminRepo.get().getUsername())
                        .password(adminRepo.get().getPassword()).roles("ADMIN").authorities(finalAuthorities).build();
            }
            return admin;
        }
    }

}
