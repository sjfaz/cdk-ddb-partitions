import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";

/**
 * Stack to test DynamoDB partitioning with an on-demand table.
 * This stack creates a DynamoDB table with a partition key and sort key,
 * configured for on-demand billing mode.
 */

export class DynamoPartitionsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const tableName = "tbl-test-partitions";

    // On-Demand Table (tbl-test-partitions)
    const table = new dynamodb.Table(this, "TblTestPartitions", {
      tableName,
      partitionKey: { name: "pk", type: dynamodb.AttributeType.STRING },
      sortKey: { name: "sk", type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      stream: dynamodb.StreamViewType.NEW_AND_OLD_IMAGES,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // NOT for production
      warmThroughput: {
        readUnitsPerSecond: 12000,
        // Expect at least 10 partitions / active stream shards to handle this. It will be higher due to extra buffer.
        writeUnitsPerSecond: 10000,
      },
    });
  }
}
