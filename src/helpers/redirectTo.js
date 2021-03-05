const redirectTo = location => {
    return (req, res) => {
        res.writeHead(302, {
            'Location': location
        });
    };
}

module.exports = redirectTo;