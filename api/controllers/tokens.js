const TokenGenerator = require("../models/token_generator");

const TokensController = {
  Create: (req, res) => {
    const { venue, auth_token } = req.body;

    const token = TokenGenerator.jsonwebtoken(venue, auth_token);

    // Construct the response object without circular references
    const response = {
      token: token,
      message: "OK",
    };

    res.status(201).json(response);
  },
};

module.exports = TokensController;
