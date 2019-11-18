const QRCode = require('qrcode');

function scfReturn(err, data) {
  return {
    isBase64Encoded: false,
    statusCode: 200,
    headers: { 'Content-Type': 'text/html' },
    body: err ? `<h1>${err.message}</h1>` : `<img src="${data}"/>`,
  };
}

exports.main_handler = async (event, context, callback) => {
  const options = event.queryString || {};
  const levelList = ['L', 'M', 'Q', 'H'];
  const formatList = ['jpg', 'jpeg', 'png'];

  const level = levelList.indexOf(options.level) === -1 ? 'M' : options.level;
  const format =
    formatList.indexOf(options.format) === -1 ? 'jpeg' : options.format;

  try {
    const dataUrl = await QRCode.toDataURL(options.q || 'yugasun.com', {
      errorCorrectionLevel: level,
      type: `image/${format}`,
      quality: 1,
      margin: 1,
    });
    return scfReturn(null, dataUrl);
  } catch (e) {
    return scfReturn(e, null);
  }
};
