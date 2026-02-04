import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

// Configuração para ES Modules (já que seu projeto usa "type": "module")
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Lê o package.json para pegar a versão oficial que você editou manualmente
const packagePath = path.join(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
const novaVersao = packageJson.version;

console.log(`📌 Versão detectada no package.json: ${novaVersao}`);

// Dados para salvar
const dadosVersao = {
    version: novaVersao,
    buildDate: new Date().toLocaleString('pt-BR', { 
        day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' 
    })
};

const conteudoJson = JSON.stringify(dadosVersao, null, 2);

// Caminhos onde o arquivo deve ser salvo
const caminhos = [
    path.join(__dirname, 'src', 'version.json'),    // Usado pelo Import do React
    path.join(__dirname, 'public', 'version.json')  // Usado pelo Fetch (online)
];

// Salva nos dois lugares
caminhos.forEach(caminho => {
    try {
        // Garante que a pasta existe (caso public ou src não existam, o que é raro)
        const dir = path.dirname(caminho);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

        fs.writeFileSync(caminho, conteudoJson);
        console.log(`✅ Atualizado: ${caminho}`);
    } catch (erro) {
        console.error(`❌ Erro ao salvar em ${caminho}:`, erro);
    }
});

console.log(`🚀 Versão ${novaVersao} sincronizada com sucesso!`);