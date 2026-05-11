const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const outputDir = path.join(projectRoot, 'android-release');
const artifacts = [
  {
    label: 'APK',
    source: path.join(projectRoot, 'android', 'app', 'build', 'outputs', 'apk', 'release', 'app-release.apk'),
    target: path.join(outputDir, 'territorios-palmas-release.apk'),
  },
  {
    label: 'AAB',
    source: path.join(projectRoot, 'android', 'app', 'build', 'outputs', 'bundle', 'release', 'app-release.aab'),
    target: path.join(outputDir, 'territorios-palmas-release.aab'),
  },
];

fs.mkdirSync(outputDir, { recursive: true });

for (const artifact of artifacts) {
  if (!fs.existsSync(artifact.source)) {
    console.error(`${artifact.label} nao encontrado em: ${artifact.source}`);
    process.exit(1);
  }

  fs.copyFileSync(artifact.source, artifact.target);
  const stats = fs.statSync(artifact.target);
  console.log(`${artifact.label} copiado para: ${artifact.target}`);
  console.log(`Tamanho: ${stats.size} bytes`);
}
