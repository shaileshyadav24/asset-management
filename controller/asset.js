const MESSAGE_CONSTANT = require("../constant/message"),
ROUTES_CONSTANT = require("../constant/routes"),
CODE_CONSTANT = require("../constant/code"),
assetService = require("../utils/AssetService"),
express = require("express"),
joiValidator = require("../middleware/JoiValidator"),
assetSchema = require("../schema/AssetScehma"),
app = express.Router();

app.get(ROUTES_CONSTANT.GET_MASTERS, (req, res) => {
    try {
        assetService.getAllMasterData((callback) => {
            res.status(callback.status).send(callback);
        });
    }  catch(error) {
        res.status(500).send({status: 500, message: MESSAGE_CONSTANT.SERVER_ERROR_OCCURED, code: CODE_CONSTANT.SERVER_ERROR_OCCURED});
    }
});

app.get(ROUTES_CONSTANT.GET_USERS, (req, res) => {
    try {
        assetService.getAllUsers((callback) => {
            res.status(callback.status).send(callback);
        });
    }  catch(error) {
        res.status(500).send({status: 500, message: MESSAGE_CONSTANT.SERVER_ERROR_OCCURED, code: CODE_CONSTANT.SERVER_ERROR_OCCURED});
    }
});

module.exports = app;