# Giffer Server

This repo contains the code for running a server for the giffer service, which is built on top of AWS Batch.

The goal for this is to make the process of uploading an mp4 video to S3 and converting it to a gif via AWS Batch simpler than the current manual process.

After uploading an image to the S3 bucket, a CloudWatch Event should fire that triggers a Lambda function, which then submits a job to AWS Batch.

## Setup

First, make a copy of `env.sample.json` and name it simply `env.json`, then fill it in with the required details.

After that, run `npm install` to install the dependencies then `npm start` to start the server.

If you'd like to run it forever, feel free to use either `pm2` or `forever`, both of which are available as modules on npm.