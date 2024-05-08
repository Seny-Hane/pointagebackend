package com.example.pointageperrsonnel.Controllers;

import com.example.pointageperrsonnel.Entity.Absence;
import com.example.pointageperrsonnel.Entity.Agent;
import com.example.pointageperrsonnel.Entity.Pointage;
import com.example.pointageperrsonnel.Repository.AbsenceRepository;
import com.example.pointageperrsonnel.Repository.AgentRepository;
import com.example.pointageperrsonnel.Services.AbsenceService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")

@RequestMapping(value = "/absence")
@AllArgsConstructor
public class AbsenceController {

    AbsenceRepository  absenceRepository;
    AgentRepository agentRepository;
    AbsenceService absenceService;


    @PostMapping("/addlistAgentAbs")
    public List<Absence> addListAbs (@PathVariable int idMotif,@PathVariable int idService,@RequestBody List<Agent> agents) {
       return absenceService.saveListAgenAb(idMotif,agents);
    }



    @GetMapping(value = "listAgentAbs")
    public List<Absence> listAgentAbs(){
        List<Absence> listAgentAB = absenceRepository.findAll();
        return  listAgentAB;
    }

    @GetMapping(value = "listAgentAbs/{id}")
    public Optional<Absence> listAgentAbsById(@PathVariable Long id){
        Optional<Absence> absents = absenceRepository.findById(id);
        return  absents;
    }

    @GetMapping(value = "/listAbsentsPerriodiqByInterDate/{datepointage1}/{datepointage2}/{codeservice}")
    public List<Absence> AgentAbsentByInterDate( @PathVariable String datepointage1, @PathVariable String datepointage2,@PathVariable int codeservice)throws ParseException {
        Date datedebut = new SimpleDateFormat("yyyy-MM-dd").parse(datepointage1);
        Date datefin = new SimpleDateFormat("yyyy-MM-dd").parse(datepointage2);

//        LocalDate datedebut =LocalDate.parse(datepointage1);
//        LocalDate datefin =LocalDate.parse(datepointage2);

        return  absenceRepository.listAbsenceByInterDate(datedebut, datefin, codeservice);

    }

    @GetMapping(value = "/listAbsentsPerriodiqByAgent/{datepointage1}/{datepointage2}/{matricule}")
    public List<Absence> AgentAbsent( @PathVariable String datepointage1, @PathVariable String datepointage2,@PathVariable String matricule)throws ParseException {
        Date datedebut = new SimpleDateFormat("yyyy-MM-dd").parse(datepointage1);
        Date datefin = new SimpleDateFormat("yyyy-MM-dd").parse(datepointage2);

//        LocalDate datedebut =LocalDate.parse(datepointage1);
//        LocalDate datefin =LocalDate.parse(datepointage2);
        return   absenceService.findAllAbsenceByDatesIntervalle(datedebut, datefin, matricule);
    }

    @PutMapping(value = "/editabsence/{idAbsent}")
    public Absence updateAbsence(@PathVariable Long idAbsent, @RequestBody Absence absence){
        absence.setId(idAbsent);
        return absenceRepository.save(absence);
    }

    @GetMapping(value = "listAgentAbsByMatricule/{matricule}")
    public List<Absence> listAgentAbs(@PathVariable String matricule){
        List<Absence> listAgentAB = absenceRepository.listAbsenceByMatricule(matricule);
        return  listAgentAB;
    }
}
