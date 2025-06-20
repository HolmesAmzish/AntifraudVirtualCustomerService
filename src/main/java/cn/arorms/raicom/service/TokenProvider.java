package cn.arorms.raicom.service;

import io.jsonwebtoken.*;
import org.springframework.stereotype.Component;

import java.util.Date;

/**
 * TokenProvider
 * @version 1.0 2025-06-20
 * @author Amzish
 */
@Component
public class TokenProvider {

    // Set token key
    private static final String SECRET_KEY = "BlessedIsHeThatWatchethAndKeepethHisGarments";

    // Set expiration to seven days
    private static final long EXPIRATION = 3600 * 24 * 7;

    /**
     * Generate token with username
     */
    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION * 1000))
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .compact();
    }

    /**
     * Get username from token
     */
    public String getUsernameFromToken(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    /**
     * Validate the token
     */
    public boolean validateToken(String token, String username) {
        try {
            String extractedUsername = getUsernameFromToken(token);
            return (extractedUsername.equals(username) && !isTokenExpired(token));
        } catch (JwtException e) {
            // Jwt 解析失败或已过期
            return false;
        }
    }

    /**
     * Check the token expiration
     */
    private boolean isTokenExpired(String token) {
        Date expirationDate = Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();

        return expirationDate.before(new Date());
    }
}