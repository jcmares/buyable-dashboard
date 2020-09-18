const express = require('express');
const { PermissionMiddlewareCreator } = require('forest-express-sequelize');
const { userVerification } = require('../models');
const superagent = require('superagent');
const { getToken } = require('../service/authentication');
const models = require('../models/');
const { response } = require('express');

const router = express.Router();
const permissionMiddlewareCreator = new PermissionMiddlewareCreator('userVerification');

// This file contains the logic of every route in Forest Admin for the collection userVerification:
// - Native routes are already generated but can be extended/overriden - Learn how to extend a route here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/extend-a-route
// - Smart action routes will need to be added as you create new Smart Actions - Learn how to create a Smart Action here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/actions/create-and-manage-smart-actions

// Create a User Verification
router.post('/userVerification', permissionMiddlewareCreator.create(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#create-a-record
  next();
});

// Update a User Verification
router.put('/userVerification/:recordId', permissionMiddlewareCreator.update(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#update-a-record
  next();
});

// Delete a User Verification
router.delete('/userVerification/:recordId', permissionMiddlewareCreator.delete(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#delete-a-record
  next();
});

// Get a list of User Verifications
router.get('/userVerification', permissionMiddlewareCreator.list(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#get-a-list-of-records
  next();
});

// Get a number of User Verifications
router.get('/userVerification/count', permissionMiddlewareCreator.list(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#get-a-number-of-records
  next();
});

// Get a User Verification
router.get('/userVerification/:recordId', permissionMiddlewareCreator.details(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#get-a-record
  next();
});

// Export a list of User Verifications
router.get('/userVerification.csv', permissionMiddlewareCreator.export(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#export-a-list-of-records
  next();
});

// Delete a list of User Verifications
router.delete('/userVerification', permissionMiddlewareCreator.delete(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#delete-a-list-of-records
  next();
});

router.post('/actions/accept', permissionMiddlewareCreator.smartAction(), (req, res) => {  
  let id = req.body.data.attributes.ids[0]
  let comment = req.body.data.attributes.values['Comment']
  let username = req.user.email
  
  getToken(username)
      .then((token)=> {
        superagent
          .post('https://031b28219372.ngrok.io/verification/accept-product')
          .send({
            userVerificationId : id ,
            comment: comment,
            accepted: true,
          })
          .set('Authorization', 'Bearer ' + token.accessToken )
          .set('Accept', 'application/json')
          .then((response) => {
            console.log('RESPONSE: ' + JSON.stringify (response.body));
            res.send({success: true , refresh: {relationships: ['emitted_transactions'] } });
            
          });
      }).catch((error) => {
        throw error;
      });
  
});

router.post('/actions/reject', permissionMiddlewareCreator.smartAction(), (req, res) => {  
  let id = req.body.data.attributes.ids[0]
  let comment = req.body.data.attributes.values['Comment']
  let username = req.user.email

  getToken(username)
      .then((token) => {
        superagent
        .post('https://031b28219372.ngrok.io/verification/accept-product')
        .send({
           userVerificationId : id ,
           comment: comment,
           accepted: false,
        })
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token.accessToken )
        .then((response) => {
          console.log('RESPONSE: ' + response.body );
          res.send({success: true , refresh: {relationships: ['emitted_transactions'] } });
          
        });
      }).catch((error) => {
        throw error;
      });  

});


module.exports = router;
