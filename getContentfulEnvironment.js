const contentfulManagement = require('contentful-management');
require('dotenv').config();

module.exports = function () {
  const contentfulClient = contentfulManagement.createClient({
    accessToken: process.env.CONTENTFUL_MANAGMENT,
  });

  return contentfulClient
    .getSpace(process.env.CONTENTFUL_SPACEID)
    .then((space) => space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT));
};
