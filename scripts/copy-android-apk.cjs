const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const sourceApk = path.join(projectRoot, 'android', 'app', 'build', 'outputs', 'apk', 'debug', 'app-debug.apk');
const targetApk = path.join(projectRoot, 'territorios-palmas-debug.apk');

if (!fs.existsSync(sourceApk)) {
  console.error(`APK nao encontrada em: ${sourceApk}`);
  process.exit(1);
}

fs.copyFileSync(sourceApk, targetApk);
const stats = fs.statSync(targetApk);

console.log(`APK copiada para: ${targetApk}`);
console.log(`Tamanho: ${stats.size} bytes`);
