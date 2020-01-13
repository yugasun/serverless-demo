const path = require('path');
const fs = require('fs');
const request = require('request-promise-native');
const { uploadToCos } = require('./utils');

const packagesUrl =
  'https://serverless-components-info-1251556596.cos.ap-guangzhou.myqcloud.com/components-with-stats.json';

const url = 'https://api.npmjs.org/downloads/point';
const taobaoUrl = 'https://registry.npm.taobao.org/downloads/range';
const cnpmUrl = 'https://registry.cnpmjs.org/downloads/range';
const repoUrl = 'https://api.github.com/repos';
const filename = 'components-with-stats.json';
const filePath = path.join('/tmp', filename);

function getYesterday() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate() - 1;
  const date = `${today.getFullYear()}-${month > 9 ? month : `0${month}`}-${
    day > 9 ? day : `0${day}`
  }`;
  return date;
}

async function getJsonFile() {
  return request.get(packagesUrl, { json: true });
}

async function updateNpmDownload(packages, yesterday) {
  return Promise.all(
    packages.map((pkg) => {
      return Promise.all([
        request.get(`${url}/${yesterday}/${pkg.name}`, {
          json: true,
          retry: {
            times: 5,
            interval: 1000,
          },
        }),
        request.get(`${taobaoUrl}/${yesterday}:${yesterday}/${pkg.name}`, {
          json: true,
          retry: {
            times: 5,
            interval: 1000,
          },
        }),
        request.get(`${cnpmUrl}/${yesterday}:${yesterday}/${pkg.name}`, {
          json: true,
          retry: {
            times: 5,
            interval: 1000,
          },
        }),
      ]).then(
        ([
          pkgNpmDownloadYesterdayResult,
          pkgTaobaoDownloadYesterdayResult,
          pkgCnpmDownloadYesterdayResult,
        ]) => {
          let yesterdayNpmDownload = 0;
          let yesterdayTaobaoDownload = 0;
          let yesterdayCnpmDownload = 0;
          try {
            yesterdayNpmDownload = pkgNpmDownloadYesterdayResult.downloads || 0;
          } catch (e) {}

          try {
            yesterdayTaobaoDownload = pkgTaobaoDownloadYesterdayResult.downloads
              .length
              ? pkgTaobaoDownloadYesterdayResult.downloads[0].downloads
              : 0;
          } catch (e) {}

          try {
            yesterdayCnpmDownload = pkgCnpmDownloadYesterdayResult.downloads
              .length
              ? pkgCnpmDownloadYesterdayResult.downloads[0].downloads
              : 0;
          } catch (e) {}

          pkg.npmDownloads =
            pkg.npmDownloads +
            (yesterdayNpmDownload +
              yesterdayTaobaoDownload +
              yesterdayCnpmDownload);

          return pkg;
        },
      );
    }),
  );
}

async function updateGithubStars(packages) {
  return Promise.all(
    packages.map(async (pkg) => {
      try {
        const url = `${repoUrl}/${pkg.repoUrl.replace(
          'https://github.com/',
          '',
        )}`;
        const res = await request.get(url, {
          json: true,
          headers: {
            'User-Agent': 'Node.js',
            'Content-Type': 'application/json',
          },
        });
        pkg.githubStars = res.stargazers_count;
        return pkg;
      } catch (e) {
        console.log(e);
        return pkg;
      }
    }),
  );
}

async function main() {
  const yesterday = getYesterday();
  console.log('Start update comopnents infos...')
  console.log('Date: ', yesterday);
  const packages = await getJsonFile();
  let newJson = await updateNpmDownload(packages, yesterday);

  // divide github star get, because this api maybe errors
  newJson = await updateGithubStars(newJson);
  fs.writeFileSync(filePath, JSON.stringify(newJson));

  const res = await uploadToCos('ap-guangzhou', filename, filePath);
  if (res === true) {
    console.log('Update success Date: ', yesterday);
  } else {
    console.log('Update Failed.')
  }

  return newJson;
}

exports.main_handler = main;
