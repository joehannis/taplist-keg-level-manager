const createAuth = async (venue, auth_token) => {
  try {
    const query = `
    INSERT INTO "auth_info" ("id", "venue", "auth_token")
    VALUES (0, $1, $2)
    ON CONFLICT ("id") DO UPDATE
    SET "venue" = $1, "auth_token" = $2
    RETURNING "id";
    `;

    const result = await pool.query(query, [venue, auth_token]);
    console.log('Auth saved successfully!');

    return result;
  } catch (err) {
    console.error('Error occurred while saving authorisation:', err);
    throw err;
  }
};

module.exports = createAuth;
