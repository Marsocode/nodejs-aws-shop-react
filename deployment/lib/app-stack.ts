import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { StaticSite } from './site-construct';
import { PREFIX } from '../consts';

export class AppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const site = new StaticSite(this, `${PREFIX}Site`, {
      sitePath: '../dist',
    });

    new cdk.CfnOutput(this, `${PREFIX}URL`, {
      value: site.url,
    });
  }
}