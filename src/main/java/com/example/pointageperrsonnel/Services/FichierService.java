package com.example.pointageperrsonnel.Services;

import com.example.pointageperrsonnel.Entity.Fichier;
import com.example.pointageperrsonnel.Repository.FichierRepository;
import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStreamReader;
import java.util.List;
import org.apache.commons.io.FilenameUtils;


@Service
@Transactional
public class FichierService {
      @Autowired
      private FichierRepository fichierRepository;

    // Lire le format de fichier CSV
    private boolean readDataFromCsv(MultipartFile file) {
        if (fichierRepository.findByFileName(FilenameUtils.getName(file.getOriginalFilename()))!=null) {
            return false;
        } else {

            try{
                InputStreamReader reader = new InputStreamReader(file.getInputStream());
                CSVReader csvReader = new CSVReaderBuilder(reader).withSkipLines(1).build();
                List<String[]> rows = csvReader.readAll();
                System.out.println(rows.size());
                for (String[] row : rows){
                    fichierRepository.save(new Fichier(Integer.parseInt(row[0]),row[10],rows.size(),row[15],row[12],row[18],row[5],row[21],row[6],row[19],row[2],row[9],Integer.parseInt(row[1]),row[3],row[4],row[7],row[8],row[11],row[16],row[13],row[14],row[20],row[17],"fileName"));
                }
                return true;
            } catch (Exception e){
                return false;
            }
        }

    }


    public boolean saveDataFromUploadFile(MultipartFile file) {
        boolean isFlag = false;
        String extension = "csv"; //FilenameUtils.getExtension(file.getOriginalFilename());
        if(extension.equalsIgnoreCase("csv")){
            isFlag = readDataFromCsv(file);
        }

        return isFlag;
    }



}
