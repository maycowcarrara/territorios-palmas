const { existsSync, readFileSync } = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const projectRoot = path.resolve(__dirname, '..');
const apkPath = path.join(projectRoot, 'territorios-palmas-debug.apk');
const appId = 'br.com.territoriospalmas.app';

const sdkRoots = [
  process.env.ANDROID_HOME,
  process.env.ANDROID_SDK_ROOT,
  path.join(process.env.LOCALAPPDATA || '', 'Android', 'Sdk'),
  'C:\\Android\\Sdk'
].filter(Boolean);

function getSdkFromLocalProperties() {
  const localPropertiesPath = path.join(projectRoot, 'android', 'local.properties');
  if (!existsSync(localPropertiesPath)) return null;

  const content = readFileSync(localPropertiesPath, 'utf8');
  const match = content.match(/^sdk\.dir=(.+)$/m);
  if (!match) return null;

  return match[1]
    .trim()
    .replace(/\\\\/g, '\\')
    .replace(/\\:/g, ':');
}

function resolveAdbPath() {
  const allSdkRoots = [getSdkFromLocalProperties(), ...sdkRoots].filter(Boolean);

  for (const sdkRoot of allSdkRoots) {
    const adbPath = path.join(sdkRoot, 'platform-tools', 'adb.exe');
    if (existsSync(adbPath)) return adbPath;
  }

  throw new Error('ADB nao encontrado. Verifique o Android SDK ou o arquivo android/local.properties.');
}

function runAdb(args, options = {}) {
  return execFileSync(resolveAdbPath(), args, {
    cwd: projectRoot,
    encoding: 'utf8',
    stdio: options.captureOutput ? ['ignore', 'pipe', 'pipe'] : 'inherit'
  });
}

function getConnectedDevices() {
  const output = runAdb(['devices'], { captureOutput: true });
  return output
    .split(/\r?\n/)
    .slice(1)
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => line.endsWith('\tdevice'))
    .map((line) => line.split('\t')[0]);
}

function ensureApkExists() {
  if (!existsSync(apkPath)) {
    console.error(`APK nao encontrada em: ${apkPath}`);
    console.error('Rode primeiro: npm run android:debug');
    process.exit(1);
  }
}

function ensureDeviceConnected(devices) {
  if (!devices.length) {
    console.error('Nenhum dispositivo ou emulador Android conectado.');
    console.error('Use "npm run android:devices" para conferir quando conectar um aparelho.');
    process.exit(1);
  }
}

const args = new Set(process.argv.slice(2));
const devices = getConnectedDevices();

if (args.has('--devices')) {
  if (!devices.length) {
    console.log('Nenhum dispositivo conectado.');
    process.exit(0);
  }

  console.log('Dispositivos conectados:');
  devices.forEach((device) => console.log(`- ${device}`));
  process.exit(0);
}

ensureApkExists();
ensureDeviceConnected(devices);

console.log(`Instalando APK em ${devices[0]}...`);
runAdb(['install', '-r', apkPath]);

if (args.has('--launch')) {
  console.log('Abrindo o app...');
  runAdb([
    'shell',
    'monkey',
    '-p',
    appId,
    '-c',
    'android.intent.category.LAUNCHER',
    '1'
  ]);
}

console.log(`APK instalada com sucesso: ${apkPath}`);
