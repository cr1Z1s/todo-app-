const JwtStrategy = require("passport-jwt").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;

require('dotenv').config();
const pool = require("./../db");

var opts = {}
opts.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.ACCESS_TOKEN_SECRET;

module.exports = passport => {
  passport.use("user",
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const query = await pool.query("SELECT * FROM users WHERE user_id = $1", [jwt_payload.user_id]);
        if (query.rowCount > 0) {
          const user = JSON.stringify(query.rows[0]);
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (err) {
        console.error(err.message);
        return (err, false);
      }
    })
  );

};