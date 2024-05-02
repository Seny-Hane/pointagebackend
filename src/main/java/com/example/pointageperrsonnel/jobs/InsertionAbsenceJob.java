package com.example.pointageperrsonnel.jobs;

import com.example.pointageperrsonnel.Entity.Agent;
import com.example.pointageperrsonnel.Services.AbsenceService;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@EnableScheduling
public class InsertionAbsenceJob {

    @Autowired
    AbsenceService absenceService;


    //@Scheduled(cron = "0 0 23 * * *")

    // Obtenir l'objet Authentication à partir du contexte de sécurité

   // @Scheduled(cron = "0 10 */11 * * *")
    @Scheduled(cron = "0 0 23 * * *")
    public void executeTask() {
        List<Agent> list = absenceService.ListeAgAbs();
        absenceService.saveListAgenAb(1,list);
        System.out.println("La tâche planifiée s'exécute maintenant !");
    }

}
