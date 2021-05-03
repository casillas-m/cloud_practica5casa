const AWS = require('aws-sdk')
var docClient = new AWS.DynamoDB.DocumentClient()
const dynamoDB = new AWS.DynamoDB({region: 'us-east-1', apiVersion: '2012-08-10'});


exports.handler = (event, context, cb) => {
    let verb = event.httpMethod
    console.log(`Verb was ${verb}`)
    let params = ""
    //  cb(null, event)
    switch (verb) {
        case 'GET':
            params = {
                TableName: 'PlantEndDB',
                Key:{
                    "email": {S:event.email_param}
                }
            }
            dynamoDB.getItem(params, (err, data) => {
                if (err) {
                    console.log(err)
                    cb(err)
                } else {
                    //cb(null,data)
                    cb(null, {email:data.Item.email.S,name:data.Item.name.S,password:data.Item.password.S})
                }
            })
            break;
        case 'PUT':
            params = {
                TableName: 'PlantEndDB',
                Key:{
                    "email": event.email
                },
                UpdateExpression: "set password=:p",
                ExpressionAttributeValues:{
                    ":p":event.password
                },
                ReturnValues:"UPDATED_NEW"
            }
            docClient.update(params, (err, data) => {
                if (err) {
                    console.log(err)
                    cb(err)
                } else {
                    cb(null,data)
                }
            })
            break;
        case 'POST':
            params = {
                TableName: 'PlantEndDB',
                Item:{
                    "email": {S:event.email},
                    "name": {S:event.name},
                    "password": {S:event.password}
                }
            }
            dynamoDB.putItem(params, (err, data) => {
                if (err) {
                    console.log(err)
                    cb(err)
                } else {
                    cb(null,data)
                }
            })
            break;
        case 'DELETE':
            params = {
                TableName: 'PlantEndDB',
                Key:{
                    "email": {S:event.email}
                }
            }
            dynamoDB.deleteItem(params, (err, data) => {
                if (err) {
                    console.log(err)
                    cb(err)
                } else {
                    cb(null,data)
                }
            })
            break;
        default:
            // code
    }
};