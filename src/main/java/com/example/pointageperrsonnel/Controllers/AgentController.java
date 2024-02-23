package com.example.pointageperrsonnel.Controllers;

import com.example.pointageperrsonnel.DTO.AgentDTO;
import com.example.pointageperrsonnel.Entity.*;
import com.example.pointageperrsonnel.Repository.*;
import com.example.pointageperrsonnel.Services.AgentServiceImpl;

import com.example.pointageperrsonnel.Services.PointageServiceImpl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.DayOfWeek;
import java.time.LocalDate;


import java.util.*;


@RestController
@CrossOrigin("*")
@RequestMapping(value = "/agent")
public class AgentController {
  @Autowired
  private AgentRepository agentRepository;

  @Autowired
  private PointageRepository pointageRepository;

  @Autowired
  private MotifRepository motifRepository;

  @Autowired
  private ServiceRepository serviceRepository;

  @Autowired
  private AgentServiceImpl agentService;

  @Autowired
  private PointageServiceImpl pointageService;

  @Autowired
  private StatutAgentRepository statutAgentRepository;

  /*@Autowired
  private UserRepository userRepository;*/

  /*@Autowired
  private UserService userService;*/

  //Liste des agents
    @GetMapping(value = "/allagent")
    public List<Agent> getAll(){
      return agentService.findAllAgent();
    }

  //Creation d'agent
  @PostMapping(value = "/saveagent")
    public Agent save(@RequestBody Agent agent){
        return agentRepository.save(agent);
    }

   //Affichage en fonction de son id
   @GetMapping(value = "/{idagent}")
   public Optional<Agent> agent(@PathVariable int idagent){
       return agentRepository.findById(idagent);
   }

  //Afficher un agent grace a son matricule
  @GetMapping(value = "/matricule/{matricule}")
   public Agent fingAgentByMatricule (@PathVariable String matricule){
        return agentRepository.findAgentByMatricule(matricule);
   }

    //Modifier un agent
    @PutMapping(value = "/editagent/{idagent}")
    public Agent updateAgent(@PathVariable int idagent, @RequestBody Agent agent){
        agent.setIdagent(idagent);
        return agentRepository.save(agent);
    }

    //Suppression
    @DeleteMapping(value = "/deleteagent/{idagent}")
    public void deleteAgent(@PathVariable int idagent){
        agentRepository.deleteById(idagent);
    }

   /*//Modifier statut agent
    @PutMapping(value = "/statut/{idagent}")
    public Agent agentStatut(@PathVariable int idagent, @RequestBody Agent agent){
        agent.setIdagent(idagent);
        return agentRepository.save(agent);
    }*/

   /* @PostMapping(value = "/pointagematin/{matricule}")
    public String fairePointageMatin(@PathVariable String matricule){
       Agent agent= agentRepository.findAgentByMatricule(matricule);
        Pointage pointage=new Pointage();
        Set<Agent> agents= new HashSet<>();
        if(agent!=null){
            pointage.setDatepointage(new Date());
            pointage.setHeurearrivee((new Date()));
           // pointage.setHeuredescente((new Date()));
            agents.add(agent);
            pointage.setAgents(agents);
            pointageRepository.save(pointage);
            return "Enregistrement reussit";
        }else return "Erreur";
    }

    @PostMapping(value = "/pointagesoir/{matricule}")
    public String fairePointageSoir(@PathVariable String matricule){git
        Agent agent= agentRepository.findAgentByMatricule(matricule);
        Pointage pointage=new Pointage();
        Set<Agent> agents= new HashSet<>();
        if(agent!=null){
            pointage.setDatepointage(new Date());
            //pointage.setHeurearrivee((new Date()));
            pointage.setHeuredescente((new Date()));
            agents.add(agent);
            pointage.setAgents(agents);
            pointageRepository.save(pointage);
            return "Enregistrement reussit";
        }else return "Erreur";
    }*/

    //Save fichier agent
    @PostMapping(value = "/savelistagents")
    public List<Agent> saveAgents(@RequestBody List<Agent> list){
       return agentService.saveAgent(list);
    }

   //Enregistrer pointage matin
   @PostMapping(value = "/matin/{matricule}/{codeservice}")
   public Pointage fairePointageMatin(@PathVariable String matricule, @PathVariable int codeservice){
       Agent agent = agentRepository.findAgentByMatricule(matricule);
       Service service = serviceRepository.findServiceByCodeservice(codeservice);
       agent.setService(service);
       Pointage pointage=new Pointage();
       Date date=new Date();
       pointage.setDatepointage((new Date()));
       pointage.setHeurearrivee((new Date()));
       //pointage.setHeuredescente(new Date());
       pointage.setAgent(agent);
       if (5 < date.getHours() && date.getHours() < 14) {
           pointage.setMotif(motifRepository.findById(1).get());
       }/*else if(9<date.getHours()&&date.getHours()<14){
           pointage.setMotif(motifRepository.findById(2).get());
       } else {
           pointage.setMotif(motifRepository.findById(3).get());
       }*/
       return pointageRepository.save(pointage);
   }

   //Verification doublons pointage
    @GetMapping(value = "/controleexistance/{matricule}")
    public boolean controle(@PathVariable String matricule){
        Agent agent = agentRepository.findAgentByMatricule(matricule);
        return pointageService.findBypointages(agent.getIdagent());
    }

   //Mise a jour pointage soir
    @PutMapping(value = "/soir/{matricule}")
    public Pointage fairePointageSoir(@PathVariable String matricule) throws Exception{
        Agent agent = agentRepository.findAgentByMatricule(matricule);
        Date date=new Date();
        /*String dateParse=date.getDay()+"-"+date.getMonth()+"-"+date.getYear();
        Date date1=new SimpleDateFormat("dd-MM-yyyy").parse(dateParse);*/
        Pointage pointage = pointageRepository.findBydatepointageAndAgent(agent.getIdagent());

        //System.out.println(date1);
        if (matricule != null) {
            pointage.setHeuredescente(date);
            //Calcul cumulheure
            Calendar calArrive=Calendar.getInstance();
            Calendar caldescente=Calendar.getInstance();

            calArrive.setTime(pointage.getHeurearrivee());
            caldescente.setTime(pointage.getHeuredescente());

            caldescente.add(Calendar.HOUR_OF_DAY,-calArrive.get(Calendar.HOUR_OF_DAY));
            caldescente.add(Calendar.MINUTE,-calArrive.get(Calendar.MINUTE));
            //caldescente.add(Calendar.HOUR,-i);
            //System.out.println(caldescente.get(Calendar.HOUR)+caldescente.get(Calendar.MINUTE));
            pointage.setCumulheure(caldescente.get(Calendar.HOUR_OF_DAY)+":"+caldescente.get(Calendar.MINUTE));
        }
        return pointageRepository.save(pointage);
    }

    //Controle mise a jour pointage descente
    @GetMapping(value = "/controleupdate/{matricule}")
    public boolean controleupdatesoir(@PathVariable String matricule){
        Agent agent=agentRepository.findAgentByMatricule(matricule);
        return pointageService.findByHeuredescente(agent.getIdagent());
    }

    //Liste des agents par service
    @GetMapping(value = "service/{codeservice}")
    public List<Agent> service(@PathVariable int codeservice){
        return agentRepository.findAgentByService(serviceRepository.findById(codeservice).get());
    }

    //Les agents n'ayant pas pointe par service en fonction d'une date
    @GetMapping(value = "/agentsAbsents/{codeservice}/{datepointage}")
    public List<Agent> listAgentsParserv(@PathVariable int codeservice, @PathVariable String datepointage)  throws ParseException {
        Date datep= new SimpleDateFormat("dd-MM-yyyy").parse(datepointage);
        return pointageService.listAgentsParserv(codeservice, datep);
    }

    //Liste absents en fonction d'une date et service (En cours d'utilisation)
    @GetMapping(value = "/listagentsAbsents/{codeservice}/{datepointage}")
    public List<Agent> listAgentsParservice(@PathVariable int codeservice, @PathVariable String datepointage)throws ParseException  {
        Date datep= new SimpleDateFormat("dd-MM-yyyy").parse(datepointage);

        List<Agent> agents = agentService.listAgents(codeservice);
        List<Pointage> pointages = pointageService.listPointage(datep);

        List<Agent> agentListAbsent = new ArrayList<>();
        List<Agent> listAgentPointe = new ArrayList<>();

        for (Pointage pointage: pointages){
            //System.out.println(pointage.getAgent());
            listAgentPointe.add(pointage.getAgent());
        }

        for (Agent agent: agents){
           if(!listAgentPointe.contains(agent)){
               agentListAbsent.add(agent);
           }
        }
        return agentListAbsent;
    }


    //list agents par service
    @GetMapping(value = "listttAgent/{codeService}")
    public List<Agent> listAgentParService(@PathVariable int codeService){
        List<Agent> agents = agentService.listAgents(codeService);
        return  agents;
    }

    //Liste absents periodique par service
    @GetMapping(value = "/listAbsentsPerriodique/{codeservice}/{datepointage1}/{datepointage2}")
    public List<Agent> listAgentsParservice(@PathVariable int codeservice, @PathVariable String datepointage1, @PathVariable String datepointage2)throws ParseException  {

        Date datedebut=new SimpleDateFormat("dd-MM-yyyy").parse(datepointage1);
        Date datefin=new  SimpleDateFormat("dd-MM-yyyy").parse(datepointage2);

        List<Agent> agents=agentService.listAgents(codeservice);
        List<Pointage> pointages=pointageService.listPointageDatesIntervalle(datedebut, datefin);

        List<Agent> listagentsAbsent = new ArrayList<>();
        List<Agent> listAgentsPointe = new ArrayList<>();

        for(Pointage pointage: pointages){
            listAgentsPointe.add(pointage.getAgent());
        }

        for (Agent agent: agents){
            if (!listAgentsPointe.contains(agent)) {
                listagentsAbsent.add(agent);
            }
        }
       /* Vector listeDate = new Vector();
        listeDate.add(datedebut);
        listeDate.add(datefin);
        // Pour iterer sur l'ensemble de dates, il faut utiliser un Iterator
        Iterator it = listeDate.iterator();
        List<Agent> listagentsAbsent = new ArrayList<>();
        //String dte ="";
        //Date date=new SimpleDateFormat("dd-MM-yyyy").parse(dte);
        while(it.hasNext()) {
            //DateFormat shortDateFormat = DateFormat.getDateInstance(DateFormat.SHORT);
            Date date = (Date)it.next(); // tu recuperes la Date;
            SimpleDateFormat formater = new SimpleDateFormat("dd-MM-yyyy");
            //shortDateFormat.format(date);
            formater.format(date);
            //System.out.println("*****test*****"+date);
            date = new SimpleDateFormat("dd-MM-yyyy").parse(date.toString());
            listagentsAbsent.addAll(listAgentsParservice(codeservice,date.toString()));
        }*/
        return listagentsAbsent;
    }

    //Liste Absents periodique par matricule
    @GetMapping(value = "/listAbsentsPerriodiq/{matricule}/{datepointage1}/{datepointage2}")
    public List<Date> AgentAbsent(@PathVariable String matricule, @PathVariable String datepointage1, @PathVariable String datepointage2)throws ParseException {
        Date datedebut=new SimpleDateFormat("yyyy-MM-dd").parse(datepointage1);
        Date datefin=new  SimpleDateFormat("yyyy-MM-dd").parse(datepointage2);

        //Agent agent=agentRepository.findAgentByMatricule(matricule);
        List<Pointage> pointages=pointageService.listPointageAgent(datedebut, datefin,matricule);

        List<Date> listdate = new ArrayList<>();
        List<Date> listdatepointe = new ArrayList<>();
        List<Date> listdateabsent = new ArrayList<>();
        //List<Agent> listAgentsPointe = new ArrayList<>();

        for (LocalDate date = LocalDate.parse(datepointage1) ; date.isBefore(LocalDate.parse(datepointage2).plusDays(1)); date=date.plusDays(1)){
            if (date.getDayOfWeek() != DayOfWeek.SATURDAY && date.getDayOfWeek() != DayOfWeek.SUNDAY){
                listdate.add(new SimpleDateFormat("yyyy-MM-dd").parse(date.toString()));
            }
        }

        for(Pointage pointage:pointages){
            listdatepointe.add(pointage.getDatepointage());
        }

        for(Date date: listdate){
            if(!listdatepointe.contains(date)){
                listdateabsent.add(date);
            }
        }
        return  listdateabsent;
    }

  // Absence periodique par service (En cours d'utilisation)
  @GetMapping(value = "/AbsencePeriodiqService/{codeservice}/{datepointage1}/{datepointage2}")
  public List<AgentDTO> AgentAbsents(@PathVariable int codeservice, @PathVariable String datepointage1, @PathVariable String datepointage2)throws ParseException {
      /*Date datedebut = new SimpleDateFormat("yyyy-MM-dd").parse(datepointage1);
      Date datefin = new SimpleDateFormat("yyyy-MM-dd").parse(datepointage2);*/

      //List<Pointage> pointages= pointageService.findAllPointageByDatesIntervalle(datedebut,datefin, codeservice);

      List<Date> listdate = new ArrayList<>();
     /* List<Pointage> listdatepointe = new ArrayList<>();
      List<Pointage> listdateabsent = new ArrayList<>();
      List<Agent> listAgentsPointe = new ArrayList<>();*/

      for (LocalDate date = LocalDate.parse(datepointage1) ; date.isBefore(LocalDate.parse(datepointage2).plusDays(1)); date=date.plusDays(1)){
          if (date.getDayOfWeek() != DayOfWeek.SATURDAY && date.getDayOfWeek() != DayOfWeek.SUNDAY){
              listdate.add(new SimpleDateFormat("yyyy-MM-dd").parse(date.toString()));
          }
      }
      /*
      for(Pointage pointage: pointages){
          Pointage point=new Pointage();
          point.setDatepointage(pointage.getDatepointage());
          point.setAgent(pointage.getAgent());
          listdatepointe.add(point);
          System.out.println(point.getDatepointage());

      }*/
      List<AgentDTO> agentDTOS= new ArrayList<>();
      List<Agent> AgentsNoPointe = new ArrayList<>();
      for(Date date: listdate){
          //System.out.println(date);
          List<Agent> agents = agentService.listAgents(codeservice);
          //System.out.println(" AGENTS"+agents.size());
          List<Pointage> pointages = pointageService.listPointage(date);
          //System.out.println(" pointages"+pointages.size());
          List<Agent> agentListAbsent = new ArrayList<>();
          List<Agent> listAgentPointe = new ArrayList<>();

          for (Pointage pointage: pointages){
              //System.out.println(pointage.getAgent());
              listAgentPointe.add(pointage.getAgent());
          }
          for (Agent agent: agents){
              AgentDTO agentDTO= new AgentDTO();
              if(!listAgentPointe.contains(agent)){
                  agentDTO.setMatricule(agent.getMatricule());
                  agentDTO.setPrenomagent(agent.getPrenomagent());
                  agentDTO.setNomagent(agent.getNomagent());
                  agentDTO.setGenre(agent.getGenre());
                  agentDTO.setDatenaissance(agent.getDatenaissance());
                  agentDTO.setDateabsence(date);
                  //agent.setDaterecrutement(date);
                  //agentListAbsent.add(agent);
                  agentDTOS.add(agentDTO);
              }
          }
          //System.out.println("agentListAbsent"+agentListAbsent.size());
          //AgentsNoPointe.addAll(agentListAbsent);
      }
      //System.out.println(AgentsNoPointe.size());
      return agentDTOS;
  }


}
