const path = require('path')
const shell = require('shelljs')

const rootDir = path.join(__dirname, '..')
const apiDir = path.join(rootDir, 'api')
const frontendDir = path.join(rootDir, 'frontend')

async function installDependencies(dir) {
  shell.cd(dir)
  shell.exec('npm install')
}

/* eslint-disable  no-console*/
async function bootstrap() {
  try {
    console.log('Start install dependencies...')
    await installDependencies(apiDir)
    await installDependencies(frontendDir)
    console.log('All dependencies installed.')
  } catch (e) {
    throw e
  }
}

bootstrap()

process.on('unhandledRejection', (e) => {
  throw e
})
