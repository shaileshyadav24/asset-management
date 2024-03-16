const app = require('express')(),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    tokenValidationMiddleware = require('./middleware/TokenVerification'),
    adminValidationMiddleware = require('./middleware/AdminVerification'),
    MESSAGE_CONSTANT = require('./constant/message'),
    CODE_CONSTANT = require('./constant/node');

const PORT = 5555;

app.listen(PORT, () => { console.log("APP IS RUNNING ON PORT:", PORT) });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Methods", 'GET, POST, PUT, DELETE');
    res.header("Access-Control-Expose-Headers", 'Authorization');
    next();
});

app.use("/auth", require("./controller/auth"));
app.use("/resource", tokenValidationMiddleware, require("./controller/resource"));
app.use("/assetManagement", tokenValidationMiddleware, require("./controller/asset"));
app.use("/admin", [tokenValidationMiddleware, adminValidationMiddleware], require("./controller/passwordManagement"));
app.use("/password", tokenValidationMiddleware, require("./controller/changePassword"));

app.use((req, res) => {

    res.status(400).send({
        status: 400,
        url: req.originalUrl,
        message: MESSAGE_CONSTANT.URL_NOT_FOUND, code: CODE_CONSTANT.URL_NOT_FOUND
    });

});