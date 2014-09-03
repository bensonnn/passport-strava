/**
 * Module dependencies.
 */
var util = require('util')
  , OAuth2Strategy = require('passport-oauth').OAuth2Strategy
  , InternalOAuthError = require('passport-oauth').InternalOAuthError;


/**
 * `Strategy` constructor.
 *
 * The Strava authentication strategy authenticates requests by delegating
 * to Strava using the OAuth 2.0 protocol.
 *
 * Applications must supply a `verify` callback which accepts an `accessToken`,
 * `refreshToken` and service-specific `profile`, and then calls the `done`
 * callback supplying a `user`, which should be set to `false` if the
 * credentials are not valid.  If an exception occured, `err` should be set.
 *
 * Options:
 *   - `clientID`      your Strava application's client id
 *   - `clientSecret`  your Strava application's client secret
 *   - `callbackURL`   URL to which Strava will redirect the user after granting authorization
 *
 * Examples:
 *
 *     passport.use(new StravaStrategy({
 *         clientID: '123-456-789',
 *         clientSecret: 'shhh-its-a-secret'
 *         callbackURL: 'https://www.awesomeapp.com/auth/strava/callback'
 *       },
 *       function(accessToken, refreshToken, profile, done) {
 *         User.findOrCreate(..., function (err, user) {
 *           done(err, user);
 *         });
 *       }
 *     ));
 *
 * @param {Object} options
 * @param {Function} verify
 * @api public
 */
function Strategy(options, verify) {
  options = options || {};
  options.authorizationURL = options.authorizationURL || 'https://strava.com/oauth/auth';
  options.tokenURL = options.tokenURL || 'https://strava.com/oauth/token';
  
  OAuth2Strategy.call(this, options, verify);
  this.name = 'Strava';
  
  this._oauth2.setAccessTokenName("access_token");
}

/**
 * Inherit from `OAuth2Strategy`.
 */
util.inherits(Strategy, OAuth2Strategy);


/**
 * Retrieve user profile from Strava.
 *
 * This function constructs a normalized profile, with the following properties:
 *
 *   - `provider`         always set to `Strava`
 *   - `id`               the user's Strava ID
 *   - `displayName`      the user's full name
 *
 * @param {String} accessToken
 * @param {Function} done
 * @api protected
 */
Strategy.prototype.currentAthlete = function(accessToken, done) {
  this._oauth2.post('https://www.strava.com/api/v3/athlete', accessToken, function (err, body, res) {
    if (err) { return done(new InternalOAuthError('failed to fetch user profile', err)); }
      console.log(body)
    // try {
    //   var json = JSON.parse(body);
      
    //   var profile = { provider: 'Strava' };
    //   profile.id = json.id;
    //   profile.displayName = json.full_name;
      
    //   profile._raw = body;
    //   profile._json = json;
      
    //   done(null, profile);
    // } catch(e) {
    //   done(e);
    // }
  });
}


/**
 * Expose `Strategy`.
 */
module.exports = Strategy;