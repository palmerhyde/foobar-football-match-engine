var joi = require("joi");

var user = joi.object().keys({
    "id" : joi.string().required(),
    "firstName" : joi.string().required(),
    "lastName" : joi.string().required(),
    "email" : joi.string().email().required()
});

exports.schema = user;

//    "startingEleven": {
//        "description": "The users starting 11 players.",
//            "type": "array",
//            "items": {"$ref":"player.json"}
//    },
//    "deck": {
//        "description": "The users match deck of 7 cards. This does not really belong here. We need to refactor.",
//            "type": "array",
//            "items": {"$ref":"player.json"}
//    },
//    "hand": {
//        "description": "The users current hand. This does not really belong here. We need to refactor.",
//            "type": "array",
//            "items": {"$ref":"player.json"}
//    },
//    "discard": {
//        "description": "The users discard pile. This does not really belong here. We need to refactor.",
//            "type": "array",
//            "items": {"$ref":"player.json"}
//    }
//},
//    "required": ["_id", "firstName", "surname", "email"]
//}
