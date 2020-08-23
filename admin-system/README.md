# Admin System

[Demo](https://sls-admin.yugasun.com/)

This is an admin system developed by [Serverless Components](https://github.com/serverless/components).

This template includes:

- **Serverless RESTful API**: Using
  [@serverless/tencent-egg](https://github.com/serverless-components/tencent-egg)
  component, it contains a Servelress Cloud Function and a single API Gateway
  endpoint.

- **Serverless website using Vue.js**:
  [@serverless/tencent-website](https://github.com/serverless-components/tencent-website),
  it deploys all static files to Cloud Object Storage, and config CDN domain.

> **Notice**: The frontend project is initialed by [@vue/cli](https://cli.vuejs.org/) which is official standard tooling for Vue.js development.

### Content

1. [Prepare](#Prepare)
2. [Download](#Download)
3. [Bootstrap](#Bootstrap)
4. [Deploy](#Deploy)
5. [Development](#Development)

### Prepare

Before all below steps, you should install
[Serverless Framework](https://www.github.com/serverless/serverless) globally:

```console
$ npm i serverless -g
```

### Download

Severless cli is very convenient, it can download templates in any github
project.

```console
$ serverless create --template-url https://github.com/yugasun/serverless-demo/tree/master/admin-system
```

### Bootstrap

Copy `.env.example` file to `.env` in project root:

Add the access keys of a
[Tencent CAM Role](https://console.cloud.tencent.com/cam/capi) with
`AdministratorAccess` in the `.env` file, like below:

```
# .env
TENCENT_SECRET_ID=xxx
TENCENT_SECRET_KEY=xxx

VPC_ID=xxx
SUBNET_ID=xxx
```

Install the NPM dependencies:

```console
$ npm run bootstrap
```

### Deploy

Deploy via the `serverless` command:

```console
$ serverless deploy
```

Use the `--debug` flag if you'd like to learn what's happening behind the
scenes:

```console
$ serverless deploy --debug
```

### Development

After your first deployment, you will be able to run the frontend locally and
have it communicate to the live backend in the cloud.

```console
$ yarn start
```

### Notice

Because this project, you should create a [MySQL](https://console.cloud.tencent.com/cdb) and [Redis](https://console.cloud.tencent.com/redis) on Tencent Cloud.

And you should create a `.env` file in `backend`
folder, and set all required parameters like `.env.example`.

### License

MIT
