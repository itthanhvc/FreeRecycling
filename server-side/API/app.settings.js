function AppSettings() {
    this.app = null;
}
AppSettings.prototype.initialize = function (expApp) {
    this.app = expApp;
    //PORT
    //development
    this.app.set('port', process.env.PORT || 3000);
    this.app.set('env', 'development');
    this.app.set('env.MONGO_URL', 'mongodb://localhost:27017/freerecycling');
    this.app.set('env.JWT_SECRET', 'Modern Web Application - CS 527');
    this.app.enable("case sensitive routing");
    this.app.set("strict routing", true);
    this.app.set("view cache", true);
    //Run in proxy or load balancer
    this.app.set("trust proxy", true);
    // Hide framework name
    this.app.set("x-powered-by", false);
}
AppSettings.prototype.getConfig = function (key) {
    return this.app.get(key);
}
module.exports = new AppSettings();
