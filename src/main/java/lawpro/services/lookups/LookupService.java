package lawpro.services.lookups;

import common.models.RequestModel;
import lawpro.data.Lookup;
import lawpro.data.LookupValue;
import lawpro.models.LookupValueModel;
import lawpro.providers.lookups.LookupProvider;
import lawpro.providers.lookups.LookupValueProvider;
import lawpro.repository.ILookupRepository;
import lawpro.repository.ILookupValuesRepository;
import lawpro.viewmodels.DashboardLookup;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class LookupService {

    @Autowired
    private LookupProvider lookupProvider;

    @Autowired
    private LookupValueProvider lookupValueProvider;

    @Autowired
    private ILookupRepository iLookupRepository;

    @Autowired
    private ILookupValuesRepository iLookupValuesRepository;

    public List<DashboardLookup> getLookups() {
        return lookupProvider.getLookups();
    }

    public Lookup getLookupById(String id) {
        return lookupProvider.getLookup(id);
    }

    public LookupValue getValueById(String id) {
        return lookupProvider.getValueById(id);
    }

    public List<LookupValue> getValuesByLookupId(String id) {
        return lookupProvider.getValuesByLookupId(id);
    }

    public LookupValue addLookupValue(LookupValueModel model) {
        //TODO: Validate data
        LookupValue lookupValue = new LookupValue();
        lookupValue.setName(model.getName());
        lookupValue.setSort(model.getSort());
        lookupValue.setValue(model.getValue());
        lookupValue.setLookupId(model.getLookupId());
        return iLookupValuesRepository.save(lookupValue);
    }

    public LookupValue editLookupValue(LookupValueModel model) {
        //TODO: Validate data
        //Verify value and name and id are populated

        //Verify lookup id exists
        LookupValue lookupValueItem = lookupValueProvider.findById(model.getId()).orElse(null);

        if (lookupValueItem != null)
        {
            lookupValueItem.setValue(model.getValue());
            lookupValueItem.setName(model.getName());
            lookupValueItem.setSort(model.getSort());

            iLookupValuesRepository.save(lookupValueItem);
        }

        return lookupValueItem;
    }

    public boolean deleteLookupValue(RequestModel request) {
        LookupValue lookupValue = lookupValueProvider.findById(request.getId()).orElse(null);

        if (lookupValue != null) {
            iLookupValuesRepository.delete(lookupValue);
            return true;
        }

        return false;
    }

    public void createLookup(Lookup lookup)
    {
        iLookupRepository.save(lookup);
    }

    public LookupValue add(LookupValue lookupValue)
    {
        lookupValue.setId(UUID.randomUUID().toString());
        return iLookupValuesRepository.save(lookupValue);
    }

}