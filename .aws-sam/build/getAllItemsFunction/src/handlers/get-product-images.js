const s3 = require('aws-sdk/clients/s3');

exports.getProductImagesHandler = async (event) => {
    const bucketParams = {
        Bucket: `shine-product-images`,
        Key: `images/dress.jpg`
    };
    try {
        const s3Client = new s3({ region: process.env.REGION });

         //const command = await s3Client.getObject(bucketParams);
         const response = {};
        // Create the presigned URL.
        const url = await new Promise((resolve, reject) => {
            s3Client.getSignedUrl('getObject', bucketParams, (error, url) => {
                    if(error) reject();
                    else if(url) resolve(url);
                });
        });
        console.info(url);
        return {
            statusCode: 200,
            body: {
                url
            }
        };
        
    } catch(err) {
        console.info(err);
        return {
            statusCode: 500,
            body: err
        }
    }
}