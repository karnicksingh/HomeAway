const User = require("../models/user.js");
module.exports.renderSinupForm = (req, res) => {
    res.render("users/signup");
};


module.exports.Sinup = async (req, res,next) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registredUser = await User.register(newUser, password);
        console.log(registredUser);
        req.login(registredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", " Welcome to Homeaway!");
            res.redirect("/listings")
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}


module.exports.renderLoginForm = (req, res) => {
    res.render("users/login");
}


module.exports.Login = async (req, res) => {
    req.flash("success", "Welcome back to HomeAway");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};
module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", " You are logged out!");
        res.redirect("/listings")
    });
}