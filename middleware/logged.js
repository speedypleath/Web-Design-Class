const session = require('express-session');
const logged = (req,res,next) =>
{
    console.log(req.session.on);
    next();
}
module.exports = logged;