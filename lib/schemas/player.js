var joi = require("joi");

var playerPositions = [
    "Goalkeeper",
    "Defender",
    "Midfielder",
    "Attacker",
    "GK",
    "LB",
    "CB",
    "RB",
    "LDM",
    "CDM",
    "RDM",
    "LM",
    "CM",
    "RM",
    "LAM",
    "CAM",
    "RAM",
    "LW",
    "RW",
    "ST",
    "CF"
];

var playerSchema = function () {
    return joi.object().keys({
        "id" : joi.string().required(),
        "firstName" : joi.string().required(),
        "lastName" : joi.string().required(),
        "position" : joi.any().valid(...playerPositions).required(),
        "crossing" : joi.number().integer().required(),
        "dribbling" : joi.number().integer().required(),
        "finishing" : joi.number().integer().required(),
        "gkdiving" : joi.number().integer().required(),
        "gkhandling" : joi.number().integer().required(),
        "gkpositioning" : joi.number().integer().required(),
        "gkreflexes" : joi.number().integer().required(),
        "heading" : joi.number().integer().required(),
        "interceptions" : joi.number().integer().required(),
        "longpassing" : joi.number().integer().required(),
        "longshots" : joi.number().integer().required(),
        "marking" : joi.number().integer().required(),
        "positioning" : joi.number().integer().required(),
        "shortpassing" : joi.number().integer().required(),
        "slidingtackle" : joi.number().integer().required(),
        "shotpower" : joi.number().integer().required(),
        "standingtackle" : joi.number().integer().required(),
        "strength" : joi.number().integer().required(),
        "vision" : joi.number().integer().required(),
        "volleys" : joi.number().integer().required()
    })
};

exports.schema = playerSchema;