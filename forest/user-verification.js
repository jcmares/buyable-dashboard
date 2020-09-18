const { collection } = require('forest-express-sequelize');
const models = require ('../models/');

// This file allows you to add to your Forest UI:
// - Smart actions: https://docs.forestadmin.com/documentation/reference-guide/actions/create-and-manage-smart-actions
// - Smart fields: https://docs.forestadmin.com/documentation/reference-guide/fields/create-and-manage-smart-fields
// - Smart relationships: https://docs.forestadmin.com/documentation/reference-guide/relationships/create-a-smart-relationship
// - Smart segments: https://docs.forestadmin.com/documentation/reference-guide/segments/smart-segments
collection('userVerification', {
  actions: [{
    name: 'Accept',
    fields: [{
      field: 'Comment',
      isRequired: true,
      type: 'String',
    }],
  },{
    name: 'Reject',
    fields: [{
      field: 'Comment',
      isRequired: true,
      type: 'String',
    }],
  }],
  fields: [{
    field: 'fullName',
    type: 'String',
    get: (product) => {
      return  models.buyableUser
      .findOne({where : {id : product.user.id } })
      .then ((user) => {
        return user.fullName;
      }); 
    }
  },
  {
    field: 'email',
    type: 'String',
    get: (product) => {
      return  models.buyableUser
      .findOne({where : {id : product.user.id } })
      .then ((user) => {
        return user.email;
      }); 
    }
  },
  {
    field: 'countryName',
    type: 'String',
    get: (product) => {
      return  models.gs1Prefix
      .findOne({where : {id : product.country.id } })
      .then ((country) => {
        return country.country;
      }); 
    }
  },{
    field: 'accepted',
    type: 'Boolean',
    get: (product) => {
      return  models.productVerification
      .findOne({where : {user_verification_id : product.id } })
      .then ((verification) => {
        return verification.accepted;
      }); 
    }
  }],
  segments: [],
});
