package com.authentication.TwoFactorAuthentication.service;

import com.authentication.TwoFactorAuthentication.config.JwtConfig;
import com.authentication.TwoFactorAuthentication.model.User;
import com.authentication.TwoFactorAuthentication.repository.UserRepository;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.stream.Collectors;
import io.jsonwebtoken.security.Keys;

import static io.jsonwebtoken.Jwts.SIG.HS512;

@Service
@Slf4j

public class JwtTokenManager {

    @Autowired
    UserRepository userRepository;

    private final JwtConfig jwtConfig;

    public JwtTokenManager(JwtConfig jwtConfig) {
        this.jwtConfig = jwtConfig;
    }

    public String generateToken(Authentication authentication) {
        System.out.println(authentication);
        User u = userRepository.findByUsername(authentication.getName()).get();
        Long now = System.currentTimeMillis();
        return Jwts.builder()
                .setSubject(authentication.getName())
                .claim("authorities", authentication.getAuthorities().stream()
                        .map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
                .setIssuedAt(new Date(now))
                .setExpiration(new Date(now + jwtConfig.getExpiration() * 3000))  // in milliseconds
                .signWith(SignatureAlgorithm.HS256, u.getSecret().getBytes())
                .compact();
    }
    public Claims getClaimsFromJWT(String token) {
        return Jwts.parser()
                .setSigningKey(jwtConfig.getSecret().getBytes())
                .build().parseSignedClaims(token).getPayload();
    }

    public boolean validateToken(String authToken) {
        try {
            Jwts.parser()
                    .setSigningKey(jwtConfig.getSecret().getBytes())
                    .build().parseSignedClaims(authToken).getPayload();

            return true;
        } catch (SignatureException ex) {
            log.error("Invalid JWT signature");
        } catch (MalformedJwtException ex) {
            log.error("Invalid JWT token");
        } catch (ExpiredJwtException ex) {
            log.error("Expired JWT token");
        } catch (UnsupportedJwtException ex) {
            log.error("Unsupported JWT token");
        } catch (IllegalArgumentException ex) {
            log.error("JWT claims string is empty.");
        }
        return false;
    }
}
