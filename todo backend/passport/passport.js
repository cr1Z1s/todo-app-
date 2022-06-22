const JwtStrategy = require("passport-jwt").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;

var opts = {}
opts.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.ACCESS_TOKEN_SECRET;

module.exports = passport => {
  passport.use("admin",
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const selectquery = await pool.query("SELECT * FROM admins_table WHERE admin_id = $1", [jwt_payload.admin_id]);
        if (selectquery.rowCount > 0) {
          const user = JSON.stringify(selectquery.rows[0]);
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (err) {
        console.log(err.message);
        return (err, false);
      }
    })
  );

};