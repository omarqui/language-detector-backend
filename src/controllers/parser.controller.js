const parcerHandler = (req,res)=>{
    if(req.method != 'POST') return;

    res.write("Ta tan!");
};

module.exports = parcerHandler;