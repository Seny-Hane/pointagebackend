package com.example.pointageperrsonnel.Services;

import com.example.pointageperrsonnel.Entity.SuiviPointage;
import com.example.pointageperrsonnel.Repository.SuiviPointageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SuiviPointageImpl implements SuiviPointageService {
    @Autowired
    private SuiviPointageRepository suiviPointageRepository;

    @Override
    public List<SuiviPointage> getALLSuiviPointage() {
        return suiviPointageRepository.findAll();
    }

    @Override
    public  SuiviPointage getSuiviPointageById(long id){
        return suiviPointageRepository.findById(id).get();
    }

    @Override
    public  SuiviPointage saveSuiviPointage(SuiviPointage suiviPointage){
      return  suiviPointageRepository.save(suiviPointage);
    }
}
