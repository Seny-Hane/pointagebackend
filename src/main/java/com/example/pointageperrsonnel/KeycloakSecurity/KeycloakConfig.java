package com.example.pointageperrsonnel.KeycloakSecurity;

import org.jboss.resteasy.client.jaxrs.ResteasyClientBuilder;
import org.keycloak.OAuth2Constants;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

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

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .csrf(csrf -> csrf.disable())
                .cors(Customizer.withDefaults())
                //.authorizeHttpRequests(ar -> ar.requestMatchers("/api/user/**").permitAll())
                .authorizeHttpRequests(ar -> ar.anyRequest().authenticated())
                // .httpBasic(Customizer.withDefaults())
                /***** ces deux methodes se sont les memes */
                // .oauth2ResourceServer(OAuth2ResourceServerConfigurer::jwt)
                .oauth2ResourceServer(oa -> oa.jwt(Customizer.withDefaults()))
                .build();
    }

}
