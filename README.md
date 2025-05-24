# DynamoDB Partition Observation with Warm Throughput

This repo explores DynamoDB partition behavior using:

- A table configured with **on-demand mode + warm throughput**
- A load test that writes 100 items in parallel
- A stream reader script that shows **how those writes are spread across active shards**

## 💡 Concepts

- **Active shards** in DynamoDB Streams are a proxy for **active partitions**
- **Warm throughput** simulates high scaling readiness in on-demand mode

## 🧱 CDK Setup

The table is configured with:

- `PAY_PER_REQUEST` billing mode (on-demand)
- Streams enabled (`NEW_AND_OLD_IMAGES`)
- Warm throughput set to 10,000 WCU

## 🚀 Scripts

### 1. `partitions.js`

Check the number of active shards, our proxy for partitions given the 1:1 mapping

```bash
node utils/partitions.js
```

### 2. `load-test.js`

Runs 100 parallel writes using distinct `pkX` and `skX` values.

```bash
node utils/load-test.js
```

### 3. `load-test.js`

Check which active shards handled the inserts, observe it spread across partitions.

```bash
node utils/load-test.js
```

Note: if you run a load test with low cardinality pk then the traffic will not spread well.
