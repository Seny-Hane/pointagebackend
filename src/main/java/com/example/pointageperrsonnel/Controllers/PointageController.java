package com.example.pointageperrsonnel.Controllers;

import com.example.pointageperrsonnel.Entity.Agent;
import com.example.pointageperrsonnel.Entity.Pointage;
import com.example.pointageperrsonnel.Entity.Service;
import com.example.pointageperrsonnel.Entity.enums.Statut_Presence;
import com.example.pointageperrsonnel.Repository.AgentRepository;
import com.example.pointageperrsonnel.Repository.MotifRepository;
import com.example.pointageperrsonnel.Repository.PointageRepository;
import com.example.pointageperrsonnel.Repository.ServiceRepository;
import com.example.pointageperrsonnel.Services.PointageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Time;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.DateTimeException;
import java.time.LocalDate;
import java.util.*;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "/pointage")
public class PointageController {
    @Autowired
    private PointageRepository pointageRepository;

    @Autowired
    private MotifRepository motifRepository;

    @Autowired
    private PointageService pointageService;

    @Autowired
    private AgentRepository agentRepository;

    @Autowired
    private ServiceRepository serviceRepository;

    //Affichage des pointages
    @GetMapping(value = "/allpointage")
    public List<Pointage> getAll(){
      return pointageRepository.findAll();
    }

    //Creation pointage for save the form
    @PostMapping(value = "/{matricule}/{codeservice}")
    public Pointage save(@PathVariable String matricule,@PathVariable int codeservice) throws Exception{
        Agent agent = agentRepository.findAgentByMatricule(matricule);
        Service service = serviceRepository.findServiceByCodeservice(codeservice);
        agent.setService(service);
        agent.setStatut_presence(Statut_Presence.PRESENT);
        Pointage pointage=new Pointage();
        Date date=new Date();
        pointage.setDatepointage((LocalDate.now()) );
        pointage.setHeurearrivee((new Date()));
        pointage.setHeuredescente(new Date());
        pointage.setAgent(agent);
//        pointage.setMotif(motifRepository.findById(1).get());
        return pointageRepository.save(pointage);
    }

    //Affichage en fonction de son id
    @GetMapping(value = "/{idpointage}")
    public Optional<Pointage> pointage(@PathVariable int idpointage){
        return pointageRepository.findById(idpointage);
    }

    //Liste pointage en fonction de la date
   @GetMapping(value = "/bydate")
    public List<Pointage> listPointageDate(){
       LocalDate dateSysteme = LocalDate.now(); // Récupérer la date système
        return pointageRepository.findByDatepointage(dateSysteme);
    }
     @GetMapping(value = "/bydate/{date}")
    public List<Pointage> listPointageDate(@PathVariable("date") String datepointage) throws ParseException {
//LocalDate date= new SimpleDateFormat("dd-MM-yyyy").parse(datepointage);
        LocalDate date =LocalDate.parse(datepointage);
         System.out.println("-----------"+date);
        return pointageRepository.findByDatepoint(date);
    }

   //Liste des pointages par agent d'un service
   @GetMapping(value = "/{datepointage1}/{datepointage2}/agent/{idagent}/{codeservice}")
   public List<Pointage> findByDatesIntervalle(@PathVariable String datepointage1, @PathVariable String datepointage2, @PathVariable int idagent, @PathVariable int codeservice) throws ParseException {

       Date datedebut= new SimpleDateFormat("dd-MM-yyyy").parse(datepointage1);
       Date datefin= new SimpleDateFormat("dd-MM-yyyy").parse(datepointage2);

      return pointageService.findByDatesIntervalle(datedebut, datefin, idagent, codeservice);
   }

   //Liste de presence par agent d'un service
   @GetMapping(value = "/listepresence/{datepointage1}/{datepointage2}/{idagent}/service/{codeservice}")
   public List<Pointage> findByInvervalleDatesAgentPresent(@PathVariable String datepointage1, @PathVariable String datepointage2, @PathVariable int idagent, @PathVariable int codeservice) throws ParseException{

       Date datedebut= new SimpleDateFormat("dd-MM-yyyy").parse(datepointage1);
       Date datefin= new SimpleDateFormat("dd-MM-yyyy").parse(datepointage2);

       return  pointageService.findByInvervalleDatesAgentPresent(datedebut, datefin, idagent, codeservice);
   }

   //Liste de presence en fonction d'une date par servcie
   @GetMapping(value = "/listepresence/{datepointage}/service/{codeservice}")
   public List<Pointage> findByPresenceDatepointage(@PathVariable String datepointage, @PathVariable int codeservice) throws ParseException{

       Date datep= new SimpleDateFormat("dd-MM-yyyy").parse(datepointage);

       return  pointageService.findByPresenceDatepointage(datep, codeservice);
   }

    //Liste de retard perriodique par agent d'un service
    @GetMapping(value = "/listeretard/{datepointage1}/{datepointage2}/{idagent}/service/{codeservice}")
    public List<Pointage> findByInvervalleDatesAgentRetard(@PathVariable String datepointage1, @PathVariable String datepointage2, @PathVariable int idagent, @PathVariable int codeservice) throws ParseException{

        Date datedebut= new SimpleDateFormat("dd-MM-yyyy").parse(datepointage1);
        Date datefin= new SimpleDateFormat("dd-MM-yyyy").parse(datepointage2);

        return  pointageService.findByInvervalleDatesAgentRetard(datedebut, datefin, idagent, codeservice);
    }

    //Liste absences en fonction d'une date par servcie
    @GetMapping(value = "/listeabsence/{datepointage}/service/{codeservice}")
    public List<Pointage> findByAbsenceDatepointage(@PathVariable String datepointage, @PathVariable int codeservice) throws ParseException{

        Date datep= new SimpleDateFormat("dd-MM-yyyy").parse(datepointage);

        return  pointageService.findByAbsenceDatepointage(datep, codeservice);
    }

    //Liste pointage perriodique par service
    @GetMapping(value = "/listeperriodique/{datepointage1}/{datepointage2}/{codeservice}")
     public  List<Pointage> findAllPointageByDatesIntervalle(@PathVariable String datepointage1, @PathVariable String datepointage2, @PathVariable int codeservice) throws ParseException {
       //List<Agent> agent=agentRepository.findAgentByService(serviceRepository.findById(codeservice).get());

      // Date datedebut= new SimpleDateFormat("dd-MM-yyyy").parse(datepointage1);
       //Date datefin= new SimpleDateFormat("dd-MM-yyyy").parse(datepointage2);

        LocalDate datedebut =LocalDate.parse(datepointage1);
        LocalDate datefin =LocalDate.parse(datepointage2);
        return pointageRepository.findAllPointageByDatesIntervalle(datedebut, datefin, codeservice);
    }


    //Liste pointage perriodique global
    @GetMapping(value = "/listeglobale/{datepointage1}/{datepointage2}")
    public  List<Pointage> findAllPointage(@PathVariable String datepointage1, @PathVariable String datepointage2) throws ParseException {
        //List<Agent> agent=agentRepository.findAgentByService(serviceRepository.findById(codeservice).get());

        Date datedebut= new SimpleDateFormat("dd-MM-yyyy").parse(datepointage1);
        Date datefin= new SimpleDateFormat("dd-MM-yyyy").parse(datepointage2);

        return pointageService.findAllPointage(datedebut, datefin);
    }

    /*//Liste des absents par service
    @GetMapping(value = "/absents/{datepointage1}/{datepointage2}/{codeservice}")
    public List<Agent> findAgents(@PathVariable String datepointage1, @PathVariable String datepointage2, @PathVariable int codeservice) throws ParseException{

        Date datedebut= new SimpleDateFormat("dd-MM-yyyy").parse(datepointage1);
        Date datefin= new SimpleDateFormat("dd-MM-yyyy").parse(datepointage2);

       return agentRepository.findAgents(datedebut, datefin, codeservice);
    }*/

    //Liste des absents par service en fonction d'une date
    /*@GetMapping(value = "/absents/{datepointage}/{codeservice}")
    public List<Agent> findAgents(@PathVariable String datepointage, @PathVariable int codeservice) throws ParseException {

       //Date datepoint=new SimpleDateFormat("dd-MM-yyyy").parse(datepointage);
       Date datepoint=new SimpleDateFormat("dd-MM-yyyy").parse(datepointage);

        return agentRepository.findList(datepoint, codeservice);
   }*/

    //Cumulheure global
    @GetMapping(value = "/cumulheureGlobal/{datepointage1}/{datepointage2}/{matricule}/{codeservice}")
    public Collection<Pointage> getCumulheure(@PathVariable String datepointage1, @PathVariable String datepointage2, @PathVariable String matricule, @PathVariable int codeservice)throws ParseException{
        //Agent agent=agentRepository.findAgentByMatricule(matricule);

        Date datedebut= new SimpleDateFormat("dd-MM-yyyy").parse(datepointage1);
        Date datefin= new SimpleDateFormat("dd-MM-yyyy").parse(datepointage2);


        return pointageService.getCumulheure(datedebut,datefin,matricule,codeservice);
    }

    //Recuperation de la date du serveur
    @GetMapping(value = "/heureserveur")
    public int systeme(){
        return pointageRepository.systeme();
    }

    //Modification pointage
    @PutMapping(value = "/editpointage/{idpointage}")
    public Pointage updatePointage(@PathVariable int idpointage, @RequestBody Pointage pointage){
        pointage.setIdpointage(idpointage);
        return pointageRepository.save(pointage);
    }

    //Suppression
    @DeleteMapping(value = "/deletepointage/{idpointage}")
    public void deletePointage(@PathVariable int idpointage){
        pointageRepository.deleteById(idpointage);
    }

    @GetMapping(value = "/listPointageDateInvterByService/{datepointage1}/{datepointage2}/{codeservice}")
    public Collection<Pointage> getListePointageByService(@PathVariable String datepointage1, @PathVariable String datepointage2, @PathVariable int codeservice){
//        Date datedebut= new SimpleDateFormat("dd-MM-yyyy").parse(datepointage1);
//        Date datefin= new SimpleDateFormat("dd-MM-yyyy").parse(datepointage2);
        LocalDate datedebut =LocalDate.parse(datepointage1);
        LocalDate datefin =LocalDate.parse(datepointage2);

        return pointageService.listPointageDateIntervallByService(datedebut,datefin,codeservice);
    }

//    @GetMapping(value = "/agentAbsent/{codeservice}")
//    public List<Pointage> findAgentsAbsent(@PathVariable int codeservice) {
//        return pointageService.listAbsence(codeservice);
//    }

}

