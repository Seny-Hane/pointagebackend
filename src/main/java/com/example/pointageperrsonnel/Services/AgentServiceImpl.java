package com.example.pointageperrsonnel.Services;

import com.example.pointageperrsonnel.Entity.Agent;
import com.example.pointageperrsonnel.Entity.Fichier;
import com.example.pointageperrsonnel.Entity.Pointage;
import com.example.pointageperrsonnel.Repository.AgentRepository;
import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStreamReader;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class AgentServiceImpl implements AgentService{
    @Autowired
    private AgentRepository agentRepository;

    // Lire le format de fichier CSV
    private boolean readDataFromCsv(MultipartFile file) {
        if (agentRepository.findByFileName(FilenameUtils.getName(file.getOriginalFilename()))!=null) {
            return false;
        } else {
            try{
                InputStreamReader reader = new InputStreamReader(file.getInputStream());
                CSVReader csvReader = new CSVReaderBuilder(reader).withSkipLines(1).build();
                List<String[]> rows = csvReader.readAll();
                for (String[] row : rows){
                    //agentRepository.save(new Fichier(Integer.parseInt(row[0]),row[10],rows.size(),row[15],row[12],row[18],row[5],row[21],row[6],row[19],row[2],row[9],Integer.parseInt(row[1]),row[3],row[4],row[7],row[8],row[11],row[16],row[13],row[14],row[20],row[17],FilenameUtils.getName(file.getOriginalFilename())));
                }
                return true;
            } catch (Exception e){
                return false;
            }
        }

    }

    //sauvegarde des donnees
    public boolean saveDataFromUploadFile(MultipartFile file) {
        boolean isFlag = false;
        String extension = FilenameUtils.getExtension(file.getOriginalFilename());
        if(extension.equalsIgnoreCase("csv")){
            isFlag = readDataFromCsv(file);
        }

        return isFlag;
    }


    //Sauvegarde de fichier agent
    public List<Agent> saveAgent(List<Agent> list){
        for(int i=0; i< list.size();i++){
            agentRepository.save(list.get(i));
        }
        return list;
    }

    //liste agent par service en fonction du codeservice
    @Override
    public List<Agent> listAgents(int codeservice){
        return agentRepository.listAgents(codeservice);
    }

    @Override
    public  List<Agent> findAllAgent() {
        return agentRepository.findAll();
    }

    @Override
    public List<Agent> listAbsence(LocalDate datepointage1, LocalDate datepointage2, int codeservice) {
        return agentRepository.findAgents(datepointage1,datepointage2,codeservice);

    }


    //Controle matricule
   /*@Override
    public boolean verifierExistanceMatricule(String matricule){
       Optional<Agent> agentOptional = agentRepository.findByMatriculeVerif(matricule);

        return  agentOptional.isPresent();
    }*/

}
