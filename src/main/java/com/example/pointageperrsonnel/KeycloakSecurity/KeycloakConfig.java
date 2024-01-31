package com.example.pointageperrsonnel.KeycloakSecurity;

import org.jboss.resteasy.client.jaxrs.ResteasyClientBuilder;
import org.keycloak.OAuth2Constants;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;

public class KeycloakConfig {

    static Keycloak keycloak = null;
    final static String serverUrl = "http://10.14.14.232:8180/auth";
    //final static String serverUrl = "http://digipost.sn.post:8082/auth";
    public final static String realm = "Digital-Poste";
    final static String clientId = "Backend_Pointage";
    //final static String clientSecret = "2454520b-3b80-4a76-a8a0-132fbe96c71c";
    final static String clientSecret = "ab85cc96-76ed-4e94-8dad-d1b01e8748b5";
    final static String userName = "diago";
    final static String password = "1234";

    public KeycloakConfig(){}

    public static Keycloak getInstance(){
        if(keycloak == null){
            keycloak = KeycloakBuilder.builder()
                    .serverUrl(serverUrl)
                    .realm(realm)
                    .grantType(OAuth2Constants.PASSWORD)
                    .username(userName)
                    .password(password)
                    .clientId(clientId)
                    .clientSecret(clientSecret)
                    .resteasyClient(new ResteasyClientBuilder()
                            .connectionPoolSize(10)
                            .build()
                    )
                    .build();
        }
        return keycloak;
    }

}
