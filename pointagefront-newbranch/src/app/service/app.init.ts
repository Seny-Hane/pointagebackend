import {KeycloakService} from "keycloak-angular";

export function initializeKeycloak(keycloak: KeycloakService):()=> Promise<boolean> {
    return () =>
        keycloak.init({
            config: {
                //url: 'http://localhost:8080/auth',
                // en production
                  url: 'http://digipost.sn.post:8082/auth',
                //  url:'http://10.10.3.138:8080',
                //url: 'http://10.14.14.232:8180/auth',
                // en production
                  realm: 'Digital-Poste',
                //  realm:'digitalpost',
                //clientId: 'pointageFront',
                //  clientId: 'Frontend_Pointage',
                // en cours
                  clientId: 'Frontend_Pointage_local',
               //secret: '2454520b-3b80-4a76-a8a0-132fbe96c71c'
            },
            initOptions: {
                onLoad: 'login-required',
                // onLoad: 'check-sso',
                checkLoginIframe:false
          },
            loadUserProfileAtStartUp: true
        });
}
