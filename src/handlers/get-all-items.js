const tableName = process.env.PRODUCTS_TABLE;

const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();

exports.getAllItemsHandler = async (event) => {
    if (event.httpMethod !== 'GET') {
        throw new Error(`getAllItems only accept GET method, you tried: ${event.httpMethod}`);
    }
    // All log statements are written to CloudWatch
    console.info('received:', event);

    let response = {};

    try {
        const params = {
            TableName : tableName
        };
        const data = await docClient.scan(params).promise();
        const items = data.Items;

        response = {
            statusCode: 200,
            body: JSON.stringify(items)
        };
    } catch (ResourceNotFoundException) {
        response = {
            statusCode: 404,
            body: "Unable to call DynamoDB. Table resource not found."
        };
    }

    // All log statements are written to CloudWatch
    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
}
