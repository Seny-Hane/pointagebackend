import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppMainComponent } from './app.main.component';
import { BlocksComponent } from './components/blocks/blocks.component';
import {AgentComponent} from "./components/GestionAgent/agent/agent.component";
import {PointageComponent} from "./components/GestionPointage/pointage/pointage.component";
import {ListPointageComponent} from "./components/GestionPointage/list-pointage/list-pointage.component";
import {RapportPointageComponent} from "./components/RapportPointage/rapport-pointage/rapport-pointage.component";
import {AuthGuard} from "./service/auth.guard";
import {
    SupervisionPointageComponent
} from "./components/GestionPointage/supervision-pointage/supervision-pointage.component";
import {AbsenceJournalierComponent} from "./components/GestionPointage/absence-journalier/absence-journalier.component";
import {SuperviseurComponent} from "./components/GestionPointage/superviseur/superviseur.component";
import {AbsencePeriodiqueComponent} from "./components/GestionPointage/absence-periodique/absence-periodique.component";
import { ServicesPosteComponent } from './components/services-poste/services-poste.component';
import { AbsencePeriodiqueParServiceComponent } from './components/GestionPointage/absence-periodique-par-service/absence-periodique-par-service.component';
import { AttributionRoleComponent } from './components/GestionUtilisateur/attribution-role/attribution-role.component';
import { AjouterutilisateurComponent } from './components/GestionUtilisateur/ajouterutilisateur/ajouterutilisateur.component';
@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppMainComponent, canActivate:[AuthGuard],
                children: [
                    // {path: '', component: DashboardComponent},
                    {path: '', component: BlocksComponent},

                    //  Routing

                    {path: 'gestion/agent', component: AgentComponent, canActivate:[AuthGuard], data: {roles:  ['ROLE_DRH']}},
                    {path: 'gestion/pointage', component: PointageComponent, canActivate:[AuthGuard], data: {roles:  ['ROLE_AGENT',]}},
                    {path: 'gestion/listpointage', component: ListPointageComponent, canActivate:[AuthGuard], data: {roles:  ['ROLE_DRH']}},
                    {path: 'gestion/supervisionpointage', component: SupervisionPointageComponent, canActivate:[AuthGuard], data: {roles:  ['ROLE_SUPERVISEUR']}},
                    {path: 'gestion/superviseur', component: SuperviseurComponent, canActivate:[AuthGuard], data: {roles:  ['ROLE_CHEFDESERVICE']}},
                    {path: 'rapport/rapportpointage', component: RapportPointageComponent, canActivate:[AuthGuard], data: {roles:['ROLE_SUPERVISEUR']}},
                    {path: 'gestion/absencejournaliere', component: AbsenceJournalierComponent, canActivate:[AuthGuard], data: [{roles:  ['ROLE_DRH']},'ROLE_CHEFDESERVICE']},
                    {path: 'rapport/raportpointage', component: RapportPointageComponent, canActivate:[AuthGuard], data: {roles:['ROLE_CHEFDESERVICE']}},
                    // {path: 'gestion/absencjournaliere', component: AbsenceJournalierComponent, canActivate:[AuthGuard], data: {roles:  [ 'ROLE_CHEFDESERVICE']}},
                    {path: 'gestion/absenceperiodique', component: AbsencePeriodiqueComponent, canActivate:[AuthGuard], data: {roles:  ['ROLE_CHEFDESERVICE']}},
                  
                    // {path: 'gestion/absenceperiodiqueparservice', component: AbsencePeriodiqueParServiceComponent, canActivate:[AuthGuard], data: {roles:  ['ROLE_CHEFDESERVICE','ROLE_DRH']}},
                    {path: 'gestion/absenceperiodiqueparservice', component: AbsencePeriodiqueParServiceComponent, canActivate:[AuthGuard], data: [{roles:  ['ROLE_CHEFDESERVICE']},'ROLE_DRH']},
                    // {path: 'gestion/attributionroles', loadChildren: () => import('./components/GestionUtilisateur/attribution-role/service.module').then(t => t.serviceModule)},

                    {path: 'gestion/servicesPoste', component: ServicesPosteComponent, canActivate:[AuthGuard], data: {roles:  ['ROLE_DRH']}},
                   {path: 'gestion/ajouterutilisateur', component: AjouterutilisateurComponent, canActivate:[AuthGuard], data: {roles:  ['ROLE_DRH','ROLE_AGENT','ROLE_SUPERVISEUR','ROLE_CHEFDESERVICE']}},
                ],
            },

            {path: '**', redirectTo: 'pages/notfound'},
        ], {scrollPositionRestoration: 'enabled', anchorScrolling:'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
