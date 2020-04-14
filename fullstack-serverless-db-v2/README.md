# fullstack-serverless-db

This is a template of serverless fullstack application. It aims to be the
simplest possible way to build a serverless fullstack application, including a
Vue.js application on the front-end bundled with Parcel and back-end API using
postgresql.

This template includes:

- **Serverless RESTful API**: Using
  [@serverless/tencent-express](https://github.com/serverless-components/tencent-express/tree/v2)
  component, it contains a Servelress Cloud Function and a single API Gateway
  endpoint.

- **Serverless website using Vue.js**:
  [@serverless/tencent-website](https://github.com/serverless-components/tencent-website/tree/v2),
  it deploys all static files to Cloud Object Storage.

- **Serverless Postgresql**:
  [@serverless/tencent-postgresql](https://github.com/serverless-components/tencent-postgresql/tree/v2),
  it auto create a postgresql database for backend using.

&nbsp;

1. [Prepare](#Prepare)
2. [Download](#Download)
3. [Bootstrap](#Bootstrap)
4. [Deploy](#Deploy)
5. [Development](#Development)

&nbsp;

### Prepare

Before all below steps, you should install
[Serverless Framework](https://www.github.com/serverless/serverless) globally:

```console
$ npm i serverless -g
```

### Download

Severless cli is very convenient, it can download templates in any github
project which should contain `serverless.yml` file.

```console
$ serverless create --template-url https://github.com/yugasun/tencent-serverless-demo/tree/master/fullstack-serverless-db-v2
```

### Bootstrap

Copy `.env.example` file to `.env` in project root:

Add the access keys of a
[Tencent CAM Role](https://console.cloud.tencent.com/cam/capi) with
`AdministratorAccess` in the `.env` file, like below:

```dotenv
# .env
TENCENT_SECRET_ID=xxx
TENCENT_SECRET_KEY=xxx

# change to your requirement
REGION=ap-guangzhou
ZONE=ap-guangzhou-2
VPC_ID=vpc-xxx
SUBNET_ID=subnet-xxx
```

Install the NPM dependencies:

```console
$ npm run bootstrap
```

### Support commands

Deploy:

```console
$ npm run deploy
```

Get deploy info:

```console
$ npm run info
```

Remove:

```console
$ npm run remove
```

### License

MIT

```

```
