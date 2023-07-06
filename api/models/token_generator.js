const JWT = require("jsonwebtoken");
const crypto = require("crypto");

class TokenGenerator {
  static generateSecretKey() {
    const secretKey = crypto.randomBytes(32).toString("hex");
    return secretKey;
  }

  static jsonwebtoken(venue, auth_token) {
    const secretKey = TokenGenerator.generateSecretKey();

    return JWT.sign(
      {
        venue: venue,
        auth_token: auth_token,
      },
      secretKey
    );
  }
}

module.exports = TokenGenerator;
