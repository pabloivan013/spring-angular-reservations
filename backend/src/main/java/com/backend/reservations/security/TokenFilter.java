package com.backend.reservations.security;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.stereotype.Component;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

//@Component
public class TokenFilter implements Filter {

    JwtDecoder jwtDecoder;
    ObjectMapper objectMapper = new ObjectMapper();
    
    public TokenFilter(final JwtDecoder jwtDecoder) {
        this.jwtDecoder = jwtDecoder;
    }

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest httpRequest = (HttpServletRequest) req;
        // String headerToken = httpRequest.getHeader("Authorization");
        // if (headerToken == null || !headerToken.startsWith("Bearer")) {
        //     chain.doFilter(req, res);
        //     return;
        // }
        // headerToken = headerToken.replace("Bearer ", "");
        // System.out.println("HEADER TOKEN: " + headerToken);
        // String claims = jwtDecoder.decode(headerToken).getClaims().toString();
        // System.out.println("TOKENFILTER CLAIMS: " + claims);
        System.out.println("ClaimsJWT 0: ");
        String claimsJwt="";

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth != null && auth instanceof JwtAuthenticationToken) {
            JwtAuthenticationToken jwt = (JwtAuthenticationToken) auth;
            if (jwt != null)
            claimsJwt = jwt.getToken().getClaims().toString();
        }

        System.out.println("ClaimsJWT: " + claimsJwt);
        chain.doFilter(req, res);
    }

    
}
