const Dotenv = require('dotenv');
const { Capi } = require('tss-capi');
const path = require('path');

function scfReturn(err, data) {
  return {
    isBase64Encoded: false,
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: { error: err, data: data },
  };
}

exports.main_handler = async (event, context, callback) => {
  const query = event.queryString || {};
  const sourceText = query.q;
  if (!sourceText) {
    return scfReturn(new Error('Please set word you want to translate.'), null);
  }
  try {
    const envPath = path.join(__dirname, '.env');
    const { parsed } = Dotenv.config({
      path: envPath,
    });

    const client = new Capi({
      Region: 'ap-guangzhou',
      SecretId: parsed.TENCENT_SECRET_ID,
      SecretKey: parsed.TENCENT_SECRET_KEY,
      ServiceType: 'tmt',
      host: 'tmt.tencentcloudapi.com',
    });

    const res = await client.request(
      {
        Action: 'TextTranslate',
        Version: '2018-03-21',
        SourceText: sourceText,
        Source: 'auto',
        Target: 'zh',
        ProjectId: 0,
      },
      {
        host: 'tmt.tencentcloudapi.com',
      },
    );

    const translateText = res.Response && res.Response.TargetText;
    return scfReturn(null, translateText);
  } catch (e) {
    return scfReturn(e, null);
  }
};
