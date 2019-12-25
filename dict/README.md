## Dict

[Demo](http://service-7kqwzu92-1251556596.gz.apigw.tencentcs.com/release/dict?q=hello)

### Prepare

You should copy `.env.example` to `.env`, then set `TENCENT_SECRET_ID` and `TENCENT_SECRET_KEY` to your tencent account config.

### Usage

```shell
# 1. install dependencies
$ npm install

# 2. install scfcli global, refer to https://cloud.tencent.com/document/product/583/33449
$ pip install scf

# 3. deploy
$ scf deploy -f
```