#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { ServerlessSaaSStack } from "../lib/serverless-saas-stack";

const getEnv = (varName: string) => {
	const val = process.env[varName];
	if (!!!val) {
		throw new Error(`${varName} is empty`);
	}
	return val!;
};

const app = new cdk.App();
const s3SourceBucket = getEnv("CDK_PARAM_S3_BUCKET_NAME");
const sourceZip = getEnv("CDK_SOURCE_NAME");
new ServerlessSaaSStack(app, "serverless-saas-pipeline", {
	s3SourceBucket,
	sourceZip,
});
