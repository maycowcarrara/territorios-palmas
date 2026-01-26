import fs from 'fs';

// Caminho para o package.json
const packageJsonPath = './package.json';

// 1. Ler o package.json atual
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

// 2. Lógica para incrementar a versão (Patch)
const versaoAtual = packageJson.version; // Ex: "1.2.32"
const partes = versaoAtual.split('.'); // Vira ["1", "2", "32"]

// Pega o último número, soma 1 e garante que é um número inteiro
const novoPatch = parseInt(partes[2]) + 1;

// Remonta a versão (Ex: "1.2.33")
partes[2] = novoPatch;
const novaVersao = partes.join('.');

// 3. Atualiza o objeto do package.json e salva no disco
packageJson.version = novaVersao;
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

// 4. Gera a data de build
const date = new Date();
const buildDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')} às ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

// 5. Cria o arquivo para o React ler
const versionInfo = {
    version: novaVersao,
    buildDate: buildDate
};

// Salva o arquivo dentro da pasta src
fs.writeFileSync('./src/version.json', JSON.stringify(versionInfo, null, 2));

console.log(`🚀 Versão atualizada: ${versaoAtual} -> ${novaVersao}`);
console.log(`📅 Build: ${buildDate}`);