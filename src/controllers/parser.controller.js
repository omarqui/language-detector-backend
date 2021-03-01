const url = require('url');
const parcerHandler = (req,res)=>{
    const queryObject = url.parse(req.url,true).query;
    const { q } = queryObject;

    if (q == undefined) return;

    const words = q.split(" ");
    console.log(words);

    res.write("parcer");
};

module.exports = parcerHandler;