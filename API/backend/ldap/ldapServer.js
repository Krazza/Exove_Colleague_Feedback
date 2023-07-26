"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ldap = require("ldapjs");
var cors_1 = require("cors");
var jsonwebtoken_1 = require("jsonwebtoken");
require('dotenv').config();
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
var createNewClient = function () {
    var client = ldap.createClient({
        url: 'ldap://localhost:389',
    });
    return client;
};
var generateJwtToken = function (payload) {
    var secretKey = process.env.JWT_SECRET || 'default_secret_key';
    var token = jsonwebtoken_1.default.sign(payload, secretKey);
    return token;
};
app.post('/auth', function (req, res) {
    var _a = req.body, username = _a.username, password = _a.password;
    console.log("".concat(username, " is trying to login with ").concat(password, " as a pwd"));
    var client = createNewClient();
    var bindDN = "uid=".concat(username, ",ou=People,dc=test,dc=com");
    client.bind(bindDN, password, function (err) {
        if (err) {
            console.error(err);
            res.status(401).send('Authentication failed');
            return;
        }
        var searchOptions = {
            scope: 'sub',
            filter: "(&(uid=".concat(username, ")(objectClass=posixAccount))"),
            attributes: ['cn', 'uid', 'uidNumber', 'gidNumber', 'description', 'mail', 'jpegPhoto', 'telephoneNumber'],
        };
        client.search("uid=".concat(username, ",ou=People,dc=test,dc=com"), searchOptions, function (err, result) {
            if (err) {
                console.error(err);
                res.status(500).send('Error retrieving user info');
                return;
            }
            var userAttributes = [];
            result.on('searchEntry', function (entry) {
                var user = {};
                entry.attributes.forEach(function (attribute) {
                    var key = attribute.type;
                    var values = attribute.vals;
                    var value = values.join(', ');
                    user[key] = value;
                });
                userAttributes.push(user);
            });
            result.on('end', function () {
                console.log("authentication successfull");
                var userData = userAttributes[0];
                var payload = {
                    user: {
                        role: userData.description,
                        username: userData.cn,
                        email: userData.mail,
                        id: userData.uidNumber,
                        phoneNumber: userData.telephoneNumber,
                        groupId: userData.gidNumber,
                        imagePath: userData.jpegPhoto,
                    },
                };
                console.log("payload", payload);
                var token = generateJwtToken(payload);
                console.log('token', token);
                res.status(200).send({
                    message: 'Authentication successful',
                    user: userAttributes[0],
                    token: token
                });
            });
        });
    });
});
// Start the server
var PORT = 5005;
app.listen(PORT, function () {
    console.log("Server started on port ".concat(PORT));
});
