var crypto = require('crypto');

var secretKey = require("../constant/SECRET_KEY.js").SECRET_KEY;

var encryptionTechnique = 'aes256';

var iv = require("../constant/IV_KEY.js").IV_KEY;

module.exports = {
    createEncryptData: function(string) {
        var encryptKey  = crypto.createCipheriv(encryptionTechnique, secretKey, iv);
        var encryptString = encryptKey.update(string, "utf8", "hex");
        encryptString += encryptKey.final("hex");
        return encryptString;
    },

    decryptEncryptData: function(string) {
        var decryptKey  = crypto.createDecipheriv(encryptionTechnique, secretKey, iv);
        var decryptString = decryptKey.update(string, "utf8", "hex");
        decryptString += decryptKey.final("hex");
        return decryptString;  
    }
}