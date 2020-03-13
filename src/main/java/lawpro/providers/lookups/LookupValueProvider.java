package lawpro.providers.lookups;

import lawpro.data.Lookup;
import lawpro.data.LookupValue;
import lawpro.repository.ILookupRepository;
import lawpro.repository.ILookupValuesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class LookupValueProvider {

    @Autowired
    private ILookupRepository repo;

    @Autowired
    private ILookupValuesRepository repoLookupValues;

    public List<LookupValue> getAllLookupValues()
    {
        List<LookupValue> list = new ArrayList<LookupValue>();
        repoLookupValues.findAll().forEach(list::add);
        return list;
    }


    public Optional<LookupValue> findById(String id)
    {
        return repoLookupValues.findById(id);
    }



}
