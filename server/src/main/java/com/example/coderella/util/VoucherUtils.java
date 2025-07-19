package com.example.coderella.util;

import java.util.Random;

public class VoucherUtils {

    public static String generateVoucherNumber() {
        String prefix = "RG";
        int randomNum = 100000 + new Random().nextInt(900000); // 6-digit
        return prefix + randomNum;
    }
}
