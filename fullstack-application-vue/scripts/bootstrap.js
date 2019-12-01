const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const ora = require('ora')

const rootDir = path.join(__dirname, '..');
const apiDir = path.join(rootDir, 'api');
const dashboardDir = path.join(rootDir, 'dashboard');

async function installDependencies(dir) {
  await exec(`cd ${dir} && npm install --registry=https://registry.npm.taobao.org/`);
}

async function bootstrap() {
  try {
    const spinner = ora(`Start install dependencies`).start();
    await Promise.all([
      installDependencies(rootDir),
      installDependencies(apiDir),
      installDependencies(dashboardDir),
    ]);
    spinner.stop();
  } catch (e) {
    throw e;
  }
}

bootstrap();
