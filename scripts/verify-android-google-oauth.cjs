const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const projectRoot = path.resolve(__dirname, '..');
const androidAppDir = path.join(projectRoot, 'android', 'app');
const googleServicesPath = path.join(androidAppDir, 'google-services.json');
const keyPropertiesPath = path.join(projectRoot, 'android', 'key.properties');

const normalizeSha = (value) => String(value || '').replace(/:/g, '').trim().toLowerCase();

const readProperties = (filePath) => {
  const props = {};
  if (!fs.existsSync(filePath)) return props;

  for (const line of fs.readFileSync(filePath, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const separatorIndex = trimmed.indexOf('=');
    if (separatorIndex === -1) continue;

    props[trimmed.slice(0, separatorIndex).trim()] = trimmed.slice(separatorIndex + 1).trim();
  }

  return props;
};

const extractFingerprints = ({ keystore, alias, storepass, keypass }) => {
  const args = ['-list', '-v', '-keystore', keystore, '-alias', alias, '-storepass', storepass];
  if (keypass) args.push('-keypass', keypass);

  const output = execFileSync('keytool', args, {
    cwd: projectRoot,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe']
  });

  const sha1 = output.match(/SHA1:\s*([A-Fa-f0-9:]+)/)?.[1];
  const sha256 = output.match(/SHA256:\s*([A-Fa-f0-9:]+)/)?.[1];

  if (!sha1 || !sha256) {
    throw new Error(`Nao foi possivel encontrar SHA1/SHA256 para ${keystore} (${alias}).`);
  }

  return { sha1, sha256 };
};

const loadRegisteredAndroidSha1 = () => {
  if (!fs.existsSync(googleServicesPath)) {
    throw new Error(`Arquivo ausente: ${path.relative(projectRoot, googleServicesPath)}`);
  }

  const googleServices = JSON.parse(fs.readFileSync(googleServicesPath, 'utf8'));
  const clients = Array.isArray(googleServices.client) ? googleServices.client : [];
  const hashes = [];

  for (const client of clients) {
    const oauthClients = Array.isArray(client.oauth_client) ? client.oauth_client : [];

    for (const oauthClient of oauthClients) {
      if (oauthClient.client_type !== 1) continue;

      const hash = oauthClient.android_info?.certificate_hash;
      if (hash) hashes.push(hash);
    }
  }

  return hashes;
};

const expected = [
  {
    label: 'debug',
    ...extractFingerprints({
      keystore: path.join(androidAppDir, 'debug-territorios.keystore'),
      alias: 'territoriosdebug',
      storepass: 'territoriosdebug',
      keypass: 'territoriosdebug'
    })
  }
];

const releaseProps = readProperties(keyPropertiesPath);

if (releaseProps.storeFile && releaseProps.keyAlias && releaseProps.storePassword) {
  expected.push({
    label: 'release',
    ...extractFingerprints({
      keystore: path.resolve(androidAppDir, releaseProps.storeFile),
      alias: releaseProps.keyAlias,
      storepass: releaseProps.storePassword,
      keypass: releaseProps.keyPassword
    })
  });
}

const registered = loadRegisteredAndroidSha1();
const registeredNormalized = new Set(registered.map(normalizeSha));
const missing = expected.filter((item) => !registeredNormalized.has(normalizeSha(item.sha1)));

if (missing.length > 0) {
  console.error('Google Sign-In Android nao esta configurado para todas as assinaturas deste projeto.');
  console.error('');
  console.error('Cadastre estes SHA-1 no app Android do Firebase/Google Cloud e baixe um novo android/app/google-services.json:');

  for (const item of missing) {
    console.error(`- ${item.label}: ${item.sha1}`);
  }

  console.error('');
  console.error('Package name esperado: br.com.territoriospalmas.app');
  process.exit(1);
}

console.log('Google Sign-In Android OK: SHA-1 de debug/release encontrados no google-services.json.');
console.log('');
console.log('Confira tambem no Firebase Console se estes SHA-256 estao cadastrados:');
for (const item of expected) {
  console.log(`- ${item.label}: ${item.sha256}`);
}
