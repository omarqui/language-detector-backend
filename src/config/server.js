const http = require("http");
const { PORT } = process.env;

const createServer = () => {
    const server = http.createServer((req,res)=>{
        res.write("Welcone");
        res.end();
    });

    server.listen(PORT, () => {
        console.log(`Server on port ${PORT}`);
    });
}

module.exports = createServer;