const session = require('express-session');
const albumStuff = (req,res,next) =>
{
    console.log(req.session);
    next();
}

module.exports = albumStuff;