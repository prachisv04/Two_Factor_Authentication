package com.authentication.TwoFactorAuthentication.payload;

import lombok.Data;

@Data
public class VerifyCodeRequest {
    private String username;
    private String code;
}
