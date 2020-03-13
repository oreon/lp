package lawpro.providers;

import lawpro.data.Admin;
import lawpro.data.Lookup;
import lawpro.data.LookupValue;
import lawpro.repository.IAdminRepository;
import lawpro.repository.ILookupRepository;
import lawpro.repository.ILookupValuesRepository;
import lawpro.viewmodels.DashboardLookup;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AdminProvider {

    @Autowired
    private IAdminRepository repo;

    private static Logger LOGGER = LogManager.getLogger(AdminProvider.class);

    public boolean existsByUsername(String username)
    {
        return repo.existsByUsername(username);
    }

    public Admin findByIsActiveAndUsername(boolean active, String username)
    {
        try {
            return findAll().stream().filter(x -> x.isActive() == active && x.getUsername().equals(username)).findFirst().orElse(null);
        } catch (Exception e) {
            LOGGER.error("AdminProvider Error: findByIsActiveAndUsername(). Requested Username: " + username, e);
            throw new RuntimeException(e);
        }
    }

    public Optional<Admin> findByUsername(String username)
    {
        try {
            return repo.findByUsername(username);
        } catch (Exception e) {
            LOGGER.error("AdminProvider error. findByUsername(). Requested Username: " + username, e);
            throw new RuntimeException(e);
        }
    }

    public List<Admin> findAll()
    {
        List<Admin> list = new ArrayList<Admin>();
        repo.findAll().forEach(list::add);
        return list;
    }

}
