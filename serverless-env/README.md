# serverless-env

Management demo for serverless environment.

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
$ serverless create --template-url https://github.com/yugasun/tencent-serverless-demo/tree/master/serverless-env
```

### Deploy

Deploy via the `serverless` command:

```console
$ serverless
```

Use the `--debug` flag if you'd like to learn what's happening behind the
scenes:

```console
$ serverless --debug
```

### License

MIT
