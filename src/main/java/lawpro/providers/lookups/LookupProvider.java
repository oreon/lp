package lawpro.providers.lookups;

import lawpro.data.Lookup;
import lawpro.data.LookupValue;
import lawpro.repository.ILookupRepository;
import lawpro.repository.ILookupValuesRepository;
import lawpro.viewmodels.DashboardLookup;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Configuration
public class LookupProvider {

    @Autowired
    private ILookupRepository repo;

    @Autowired
    private ILookupValuesRepository repoLookupValues;

    public List<DashboardLookup> getLookups()
    {
        //get lookups
        List<Lookup> lookups = new ArrayList<Lookup>();
        repo.findAll().forEach(lookups::add);
        List<DashboardLookup> items = new ArrayList<>();

        lookups.forEach(x -> items.add(new DashboardLookup(x.getName(), x.getId(), "New Application Form", this.getValuesByLookupId(x.getId()).size())));

        return items;
    }

    public List<Lookup> getAllLookups()
    {
        List<Lookup> list = new ArrayList<Lookup>();
        repo.findAll().forEach(list::add);
        return list;
    }

    public Lookup getLookup(String id)
    {
        return repo.findById(id).orElse(null);
    }

    public Lookup getLookupByName(String name)
    {
        return repo.findByName(name).orElse(null);
    }

    public Lookup getLookupByOldId(String id)
    {
        List<Lookup> lookups = new ArrayList<>();
        repo.findAll().forEach(lookups::add);
        return lookups.stream().filter(x -> x.getOldId().equals(id)).findFirst().orElse(null);
    }

    public List<LookupValue> getValuesByLookupId(String id)
    {
        List<LookupValue> list = new ArrayList<>();
        repoLookupValues.findByLookupId(id).forEach(list::add);
        return list;
    }

    public LookupValue getValueById(String id)
    {
        return repoLookupValues.findById(id).orElse(null);
    }

    public List<LookupValue> getValuesByName(String name) {
        List<LookupValue> values = new ArrayList<>();
        Lookup lookup = repo.findByName(name).orElse(null);
        repoLookupValues.findByLookupId(lookup.getId()).forEach(values::add);
        values.sort(Comparator.comparing(LookupValue::getSort));
        return values;
    }
}
