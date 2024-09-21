import AWS, { S3 } from 'aws-sdk';
import { UserRepositories } from '../types/github';
import { json } from 'stream/consumers';
const s3: S3 = new AWS.S3();

const bucketName: string = 'repofromlambda';
const key: string = 'repo-data.json';

export const uploadToS3 = async (userRepository: UserRepositories) => {
    const userRespositoryJsonForm: string = JSON.stringify(userRepository, null, 2)

    const s3Params = {
        Bucket: bucketName,
        Key: key,
        Body: userRespositoryJsonForm,
        ContentType: 'application/json'
    };

    try {
        const upload = await s3.putObject(s3Params).promise();
    } catch (error) {
        console.log('Error uploading file');
    }
}