const connection = require('./../config/connection');

exports.updateBusinessDataQuery = (organization, businessType, website, city, country, address, zipCode, facebook, twitter, instagram, userId) => connection.query('UPDATE "user" SET organisation_name=$1, business_type=$2, website=$3, city=$4, country=$5, address=$6, zip_code=$7, facebook=$8, instagram=$9, twitter=$10 WHERE id=$11 RETURNING *', [organization, businessType, website, city, country, address, zipCode, facebook, instagram, twitter, userId]);
