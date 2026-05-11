# PROJECT FULL CONTEXT
Generated automatically

Total files: 24

---
## FILE: eslint.config.js

```js
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])

```

---
## FILE: firebase.json

```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**/*.@(js|css|png|jpg|jpeg|gif|webp|svg)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=31536000, immutable"
          }
        ]
      },
      {
        "source": "**/*.@(html|json)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "no-cache, no-store, must-revalidate"
          }
        ]
      },
      {
        "source": "sw.js",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "no-cache, no-store, must-revalidate"
          }
        ]
      }
    ]
  }
}
```

---
## FILE: gerar-versao.js

```js
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packagePath = path.join(__dirname, 'package.json');

// 1. Lê o package.json atual
const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
const versaoAtual = packageJson.version; // Ex: "1.8.116"

// 2. Incrementa o último número (Patch)
const partes = versaoAtual.split('.');
partes[2] = parseInt(partes[2]) + 1;
const novaVersao = partes.join('.'); // Ex: "1.8.117"

console.log(`🆙 Atualizando versão: ${versaoAtual} -> ${novaVersao}`);

// 3. Salva a NOVA versão de volta no package.json (para ficar salvo para a próxima)
packageJson.version = novaVersao;
fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));

// 4. Prepara os dados para o app (version.json)
const dadosVersao = {
    version: novaVersao,
    buildDate: new Date().toLocaleString('pt-BR', {
        day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'
    })
};

const conteudoJson = JSON.stringify(dadosVersao, null, 2);

// 5. Salva nos arquivos do projeto
const caminhos = [
    path.join(__dirname, 'src', 'version.json'),
    path.join(__dirname, 'public', 'version.json')
];

caminhos.forEach(caminho => {
    try {
        const dir = path.dirname(caminho);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(caminho, conteudoJson);
        console.log(`✅ Atualizado: ${caminho}`);
    } catch (erro) {
        console.error(`❌ Erro ao salvar em ${caminho}:`, erro);
    }
});

console.log(`🚀 Versão ${novaVersao} definida com sucesso!`);
```

---
## FILE: index.html

```html
<!doctype html>
<html lang="en" data-theme="light">

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
  <meta name="theme-color" content="#2563eb" />
  <title>Territórios Palmas PR</title>
</head>

<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>

</html>
```

---
## FILE: kmz\mapa.json

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "id": 1,
        "nome": "T01- SALÃO DO REINO",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4869661,
            "lng": -51.9957653,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4866876,
            "lng": -51.9969562,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4859674,
            "lng": -51.99554,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4857081,
            "lng": -51.9967738,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4848919,
            "lng": -51.9953576,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4846998,
            "lng": -51.9965593,
            "tipo": "quadra"
          },
          {
            "nome": "Auto Elétrica Zoinho",
            "lat": -26.4862946,
            "lng": -51.9973404,
            "tipo": "referencia"
          },
          {
            "nome": "Chico Eletro Materiais de construções e acabamentos",
            "lat": -26.4843918,
            "lng": -51.9967613,
            "tipo": "referencia"
          },
          {
            "nome": "Colégio HBC",
            "lat": -26.4847104,
            "lng": -51.9952103,
            "tipo": "referencia"
          },
          {
            "nome": "Cris Confecções",
            "lat": -26.4856842,
            "lng": -51.9972473,
            "tipo": "referencia"
          },
          {
            "nome": "Guincho Os Piá Chapeação Pintura E Serviço De Guincho",
            "lat": -26.4867019,
            "lng": -51.9956226,
            "tipo": "referencia"
          },
          {
            "nome": "PRÉDIO DE APARTAMENTOS",
            "lat": -26.4856601,
            "lng": -51.9957729,
            "tipo": "condominio"
          },
          {
            "nome": "Salão Do Reino Das Testemunhas De Jeová",
            "lat": -26.4863643,
            "lng": -51.995359,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.996999,
              -26.484229
            ],
            [
              -51.997701,
              -26.48715
            ],
            [
              -51.995086,
              -26.487593
            ],
            [
              -51.99456,
              -26.484607
            ],
            [
              -51.996999,
              -26.484229
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 2,
        "nome": "T02 - SUPERMERCADO UNIÃO",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4871773,
            "lng": -51.9940809,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4870813,
            "lng": -51.9947568,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.486169,
            "lng": -51.99392,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4851799,
            "lng": -51.9937698,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4851127,
            "lng": -51.9943384,
            "tipo": "quadra"
          },
          {
            "nome": "Farmácia São João",
            "lat": -26.4866495,
            "lng": -51.9943478,
            "tipo": "referencia"
          },
          {
            "nome": "Supermercado União",
            "lat": -26.4863547,
            "lng": -51.9945929,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.99456,
              -26.484607
            ],
            [
              -51.995086,
              -26.487593
            ],
            [
              -51.993922,
              -26.48778
            ],
            [
              -51.993332,
              -26.484794
            ],
            [
              -51.99456,
              -26.484607
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 3,
        "nome": "T03 - MARECHAL SANDUICHERIA",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4875625,
            "lng": -51.9917592,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4874185,
            "lng": -51.9930037,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4864294,
            "lng": -51.9915124,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4863717,
            "lng": -51.9928643,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4854979,
            "lng": -51.9913193,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4855843,
            "lng": -51.9926711,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4852098,
            "lng": -51.9926067,
            "tipo": "quadra"
          },
          {
            "nome": "Lobas Advocacia",
            "lat": -26.4867586,
            "lng": -51.9934614,
            "tipo": "referencia"
          },
          {
            "nome": "Marechal Sanduicheria Palmas",
            "lat": -26.4871073,
            "lng": -51.9915716,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.993342,
              -26.484852
            ],
            [
              -51.993922,
              -26.48778
            ],
            [
              -51.9912337,
              -26.488308
            ],
            [
              -51.990632,
              -26.485195
            ],
            [
              -51.993342,
              -26.484852
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 4,
        "nome": "T04 - MARTIKAIAS",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4845232,
            "lng": -51.9912295,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4843696,
            "lng": -51.9924097,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4839086,
            "lng": -51.9907489,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4830395,
            "lng": -51.9909666,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4827899,
            "lng": -51.9923721,
            "tipo": "quadra"
          },
          {
            "nome": "Lojas Benoit",
            "lat": -26.4834215,
            "lng": -51.9905203,
            "tipo": "referencia"
          },
          {
            "nome": "Martikaias",
            "lat": -26.4843849,
            "lng": -51.9911246,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.993012,
              -26.482345
            ],
            [
              -51.993323,
              -26.484669
            ],
            [
              -51.990656,
              -26.485064
            ],
            [
              -51.990201,
              -26.482816
            ],
            [
              -51.993012,
              -26.482345
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 5,
        "nome": "T05 - AGROBOI",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4842735,
            "lng": -51.9936971,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4841103,
            "lng": -51.9942443,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4834285,
            "lng": -51.9934611,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4833084,
            "lng": -51.9940941,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4825978,
            "lng": -51.9932948,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4825162,
            "lng": -51.9940244,
            "tipo": "quadra"
          },
          {
            "nome": "Agroboi",
            "lat": -26.4844837,
            "lng": -51.994315,
            "tipo": "referencia"
          },
          {
            "nome": "Relojoaria Orient",
            "lat": -26.4828721,
            "lng": -51.9941822,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.994175,
              -26.482141
            ],
            [
              -51.994583,
              -26.484455
            ],
            [
              -51.993342,
              -26.484654
            ],
            [
              -51.993027,
              -26.482319
            ],
            [
              -51.994175,
              -26.482141
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 6,
        "nome": "T06 - MERCADO NO PONTO",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4840623,
            "lng": -51.9949631,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4838126,
            "lng": -51.9962932,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4831788,
            "lng": -51.9950111,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4829339,
            "lng": -51.9961484,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4823529,
            "lng": -51.9949253,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4822185,
            "lng": -51.9959499,
            "tipo": "quadra"
          },
          {
            "nome": "No Ponto Mix Atacadista - Palmas",
            "lat": -26.4832641,
            "lng": -51.9961585,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.996418,
              -26.481776
            ],
            [
              -51.996982,
              -26.4841
            ],
            [
              -51.994604,
              -26.484456
            ],
            [
              -51.99424,
              -26.48214
            ],
            [
              -51.996418,
              -26.481776
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 7,
        "nome": "T07 - CODIPA",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4877349,
            "lng": -51.9969569,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4880059,
            "lng": -51.9957403,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4882748,
            "lng": -51.9946245,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.488438,
            "lng": -51.9931225,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4887741,
            "lng": -51.9920281,
            "tipo": "quadra"
          },
          {
            "nome": "Codipa",
            "lat": -26.4879864,
            "lng": -51.9978548,
            "tipo": "referencia"
          },
          {
            "nome": "Da Colônɑ",
            "lat": -26.4878111,
            "lng": -51.9978442,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.997747,
              -26.487252
            ],
            [
              -51.997974,
              -26.488218
            ],
            [
              -51.991472,
              -26.489413
            ],
            [
              -51.991263,
              -26.488405
            ],
            [
              -51.997747,
              -26.487252
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 8,
        "nome": "T08 - POSTO PANDA",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4888008,
            "lng": -51.9972036,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4890142,
            "lng": -51.9960407,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4893022,
            "lng": -51.9947103,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4895423,
            "lng": -51.9934658,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4896671,
            "lng": -51.9921247,
            "tipo": "quadra"
          },
          {
            "nome": "Condomínio Turatto I",
            "lat": -26.488767,
            "lng": -51.9959085,
            "tipo": "condominio"
          },
          {
            "nome": "Shell Select",
            "lat": -26.4887453,
            "lng": -51.9979195,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.997985,
              -26.488275
            ],
            [
              -51.998253,
              -26.489293
            ],
            [
              -51.9917034,
              -26.4904166
            ],
            [
              -51.9915045,
              -26.4894828
            ],
            [
              -51.997985,
              -26.488275
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 9,
        "nome": "T09 - DISTRIBUIDORA COLONIA",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4899051,
            "lng": -51.9975362,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4900512,
            "lng": -51.9962446,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4902433,
            "lng": -51.9949571,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4906946,
            "lng": -51.9937126,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4908002,
            "lng": -51.9923822,
            "tipo": "quadra"
          },
          {
            "nome": "Menegusso Máquinas - Concessionária Stihl e Locadora de Máquinas",
            "lat": -26.4893882,
            "lng": -51.9982094,
            "tipo": "referencia"
          },
          {
            "nome": "Nona Maria Sorveteria - A Sua Casa do Sorvete!",
            "lat": -26.4900571,
            "lng": -51.9944388,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.998253,
              -26.489341
            ],
            [
              -51.998457,
              -26.490311
            ],
            [
              -51.991961,
              -26.491484
            ],
            [
              -51.991752,
              -26.490465
            ],
            [
              -51.998253,
              -26.489341
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 10,
        "nome": "T10 - CELINHO LANCHES",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4879125,
            "lng": -51.9893913,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4880277,
            "lng": -51.990829,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4868658,
            "lng": -51.9892089,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4868178,
            "lng": -51.990711,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4859151,
            "lng": -51.9892197,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4857903,
            "lng": -51.9903355,
            "tipo": "quadra"
          },
          {
            "nome": "Colegio Dom Carlos",
            "lat": -26.4875679,
            "lng": -51.9892943,
            "tipo": "referencia"
          },
          {
            "nome": "Célinho Lanches",
            "lat": -26.4872105,
            "lng": -51.990423,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.990632,
              -26.485195
            ],
            [
              -51.991201,
              -26.488294
            ],
            [
              -51.988917,
              -26.488711
            ],
            [
              -51.988348,
              -26.485557
            ],
            [
              -51.990632,
              -26.485195
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 11,
        "nome": "T11- BERTE AUTOMOVEIS",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4883638,
            "lng": -51.9872992,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4882102,
            "lng": -51.9881682,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4873267,
            "lng": -51.9870203,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4871443,
            "lng": -51.9878571,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4862416,
            "lng": -51.986752,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4859728,
            "lng": -51.9876962,
            "tipo": "quadra"
          },
          {
            "nome": "Berté Automóveis",
            "lat": -26.4886782,
            "lng": -51.9878593,
            "tipo": "referencia"
          },
          {
            "nome": "CRAS",
            "lat": -26.4875415,
            "lng": -51.9884243,
            "tipo": "referencia"
          },
          {
            "nome": "Residencial Idealle",
            "lat": -26.488915,
            "lng": -51.9873717,
            "tipo": "condominio"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.988348,
              -26.485557
            ],
            [
              -51.988868,
              -26.488697
            ],
            [
              -51.986766,
              -26.4891
            ],
            [
              -51.986165,
              -26.485883
            ],
            [
              -51.988348,
              -26.485557
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 12,
        "nome": "T12 - LA BELLA ITALIA",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4849353,
            "lng": -51.9889932,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4847,
            "lng": -51.9901627,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4843014,
            "lng": -51.9884299,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4839702,
            "lng": -51.9900607,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4834228,
            "lng": -51.9887464,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4831732,
            "lng": -51.9898783,
            "tipo": "quadra"
          },
          {
            "nome": "Bufufa Lanches",
            "lat": -26.4853265,
            "lng": -51.9884154,
            "tipo": "referencia"
          },
          {
            "nome": "Restaurante La Bella Italia",
            "lat": -26.4844444,
            "lng": -51.9888889,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.990191,
              -26.482845
            ],
            [
              -51.9906,
              -26.485107
            ],
            [
              -51.988347,
              -26.485443
            ],
            [
              -51.987897,
              -26.483205
            ],
            [
              -51.990191,
              -26.482845
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 13,
        "nome": "T13 - BELLAGIO PIZZARIA",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4853218,
            "lng": -51.9865444,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4850985,
            "lng": -51.9876521,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4846328,
            "lng": -51.9864397,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4844023,
            "lng": -51.9875663,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4838502,
            "lng": -51.9862842,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4836101,
            "lng": -51.9873624,
            "tipo": "quadra"
          },
          {
            "nome": "Bellagio Pizzaria",
            "lat": -26.4846104,
            "lng": -51.9878748,
            "tipo": "referencia"
          },
          {
            "nome": "Funerária Santa Clara",
            "lat": -26.4854719,
            "lng": -51.9869163,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.987897,
              -26.483234
            ],
            [
              -51.988283,
              -26.485424
            ],
            [
              -51.986118,
              -26.485791
            ],
            [
              -51.985751,
              -26.48358
            ],
            [
              -51.987897,
              -26.483234
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 14,
        "nome": "T14 - CLUBE UNIÃO ",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4824865,
            "lng": -51.9898172,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4825345,
            "lng": -51.9889803,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4826065,
            "lng": -51.9881917,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4815262,
            "lng": -51.9896348,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4817278,
            "lng": -51.9882186,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.480489,
            "lng": -51.9894953,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4806427,
            "lng": -51.9879504,
            "tipo": "quadra"
          },
          {
            "nome": "Clube União Recreativo Palmense",
            "lat": -26.482779,
            "lng": -51.9888306,
            "tipo": "referencia"
          },
          {
            "nome": "Colégio Bom Jesus",
            "lat": -26.4815596,
            "lng": -51.9894592,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.989625,
              -26.479918
            ],
            [
              -51.990141,
              -26.482767
            ],
            [
              -51.987868,
              -26.483143
            ],
            [
              -51.987278,
              -26.48031
            ],
            [
              -51.989625,
              -26.479918
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 15,
        "nome": "T15 - PIZZARELLA",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4828994,
            "lng": -51.9862016,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4827169,
            "lng": -51.987253,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4819775,
            "lng": -51.9860406,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4817566,
            "lng": -51.9870277,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4810268,
            "lng": -51.9858582,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4808155,
            "lng": -51.9867058,
            "tipo": "quadra"
          },
          {
            "nome": "Lanchonete Sinus",
            "lat": -26.483196,
            "lng": -51.9865872,
            "tipo": "referencia"
          },
          {
            "nome": "Pizzarella",
            "lat": -26.4822513,
            "lng": -51.987213,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.987278,
              -26.48031
            ],
            [
              -51.987814,
              -26.483133
            ],
            [
              -51.985716,
              -26.483501
            ],
            [
              -51.985173,
              -26.480647
            ],
            [
              -51.987278,
              -26.48031
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 16,
        "nome": "T16 - RAÇÕES DALLÓ",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4814484,
            "lng": -51.9958505,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4816789,
            "lng": -51.9946704,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4806417,
            "lng": -51.9955072,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4808914,
            "lng": -51.9944451,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4799695,
            "lng": -51.9953678,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4800464,
            "lng": -51.9943378,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4782217,
            "lng": -51.995121,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.4783753,
            "lng": -51.9941017,
            "tipo": "quadra"
          },
          {
            "nome": "Loja do Magrão",
            "lat": -26.4789447,
            "lng": -51.9946383,
            "tipo": "referencia"
          },
          {
            "nome": "Rações Dalló",
            "lat": -26.4816595,
            "lng": -51.9961602,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.995486,
              -26.477477
            ],
            [
              -51.99638,
              -26.481688
            ],
            [
              -51.994192,
              -26.482072
            ],
            [
              -51.993569,
              -26.477789
            ],
            [
              -51.995486,
              -26.477477
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 17,
        "nome": "T17 - SUPER 1,99",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4820542,
            "lng": -51.9918907,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4822846,
            "lng": -51.9907535,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.481017,
            "lng": -51.9918693,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4812091,
            "lng": -51.990496,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4802488,
            "lng": -51.9916547,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4798551,
            "lng": -51.9903887,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4790292,
            "lng": -51.9911719,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.4782129,
            "lng": -51.9930602,
            "tipo": "quadra"
          },
          {
            "nome": "9",
            "lat": -26.4815167,
            "lng": -51.9939186,
            "tipo": "quadra"
          },
          {
            "nome": "Instituto Santa Pelizzari / Hospital Santa Pelizzari",
            "lat": -26.4815962,
            "lng": -51.9918031,
            "tipo": "referencia"
          },
          {
            "nome": "Parque da gruta de Palmas",
            "lat": -26.4796206,
            "lng": -51.9927972,
            "tipo": "referencia"
          },
          {
            "nome": "Universo Vip Barbershop",
            "lat": -26.4812908,
            "lng": -51.9939858,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.993526,
              -26.477789
            ],
            [
              -51.994192,
              -26.482072
            ],
            [
              -51.990259,
              -26.482747
            ],
            [
              -51.989707,
              -26.479839
            ],
            [
              -51.989022,
              -26.479911
            ],
            [
              -51.98872,
              -26.478572
            ],
            [
              -51.993526,
              -26.477789
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 18,
        "nome": "T18 - RODOVIARIA",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4910514,
            "lng": -51.9911209,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4914211,
            "lng": -51.9900266,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4915315,
            "lng": -51.9889429,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4919892,
            "lng": -51.9882342,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4916276,
            "lng": -51.9874409,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4900144,
            "lng": -51.9909814,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.49012,
            "lng": -51.9897476,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.4903793,
            "lng": -51.9885997,
            "tipo": "quadra"
          },
          {
            "nome": "9",
            "lat": -26.4904849,
            "lng": -51.9874946,
            "tipo": "quadra"
          },
          {
            "nome": "10",
            "lat": -26.4889293,
            "lng": -51.990724,
            "tipo": "quadra"
          },
          {
            "nome": "11",
            "lat": -26.489419,
            "lng": -51.9896189,
            "tipo": "quadra"
          },
          {
            "nome": "12",
            "lat": -26.4892462,
            "lng": -51.988428,
            "tipo": "quadra"
          },
          {
            "nome": "13",
            "lat": -26.4896207,
            "lng": -51.9872264,
            "tipo": "quadra"
          },
          {
            "nome": "R.T. Burger",
            "lat": -26.4889399,
            "lng": -51.9896587,
            "tipo": "referencia"
          },
          {
            "nome": "Rodoviária de Palmas - Paraná",
            "lat": -26.4913945,
            "lng": -51.990056,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.991191,
              -26.48841
            ],
            [
              -51.991846,
              -26.491536
            ],
            [
              -51.987415,
              -26.492382
            ],
            [
              -51.986772,
              -26.489199
            ],
            [
              -51.991191,
              -26.48841
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 19,
        "nome": "T19 - GOLD ATACADO",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4931159,
            "lng": -51.9916359,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4932215,
            "lng": -51.9906167,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.493452,
            "lng": -51.9892863,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4937209,
            "lng": -51.9883422,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4921461,
            "lng": -51.9913033,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4923285,
            "lng": -51.9902197,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4925206,
            "lng": -51.9890288,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.4926262,
            "lng": -51.98831,
            "tipo": "quadra"
          },
          {
            "nome": "9",
            "lat": -26.4927126,
            "lng": -51.9876877,
            "tipo": "quadra"
          },
          {
            "nome": "Auto Posto Horizonte III",
            "lat": -26.493818,
            "lng": -51.9881213,
            "tipo": "referencia"
          },
          {
            "nome": "Gold Atacado de alimentos e bebidas LTDA",
            "lat": -26.4920478,
            "lng": -51.9903411,
            "tipo": "referencia"
          },
          {
            "nome": "Residencial Stulher",
            "lat": -26.4921683,
            "lng": -51.9890334,
            "tipo": "condominio"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.991846,
              -26.491536
            ],
            [
              -51.992349,
              -26.493639
            ],
            [
              -51.987766,
              -26.494529
            ],
            [
              -51.987415,
              -26.492382
            ],
            [
              -51.991846,
              -26.491536
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 20,
        "nome": "T20 - RESERVATORIO SANEPAR",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4920391,
            "lng": -51.9980285,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4922312,
            "lng": -51.9967411,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4924328,
            "lng": -51.9955073,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4910309,
            "lng": -51.9977496,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4912325,
            "lng": -51.9965479,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4914918,
            "lng": -51.9952605,
            "tipo": "quadra"
          },
          {
            "nome": "Escola Municipal Nossa Senhora de Fátima",
            "lat": -26.4921952,
            "lng": -51.9964822,
            "tipo": "referencia"
          },
          {
            "nome": "Reservatório Sanepar",
            "lat": -26.4910288,
            "lng": -51.9956387,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.998467,
              -26.490444
            ],
            [
              -51.998917,
              -26.492458
            ],
            [
              -51.994943,
              -26.493153
            ],
            [
              -51.994525,
              -26.491136
            ],
            [
              -51.998467,
              -26.490444
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 21,
        "nome": "T21 - MERCADO DIVINO",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4927497,
            "lng": -51.9941447,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4929609,
            "lng": -51.9928787,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4916934,
            "lng": -51.9939516,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4919815,
            "lng": -51.9927607,
            "tipo": "quadra"
          },
          {
            "nome": "Mercado Divino",
            "lat": -26.4935238,
            "lng": -51.9925266,
            "tipo": "referencia"
          },
          {
            "nome": "Postos Moisés",
            "lat": -26.4915703,
            "lng": -51.992841,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.994525,
              -26.491136
            ],
            [
              -51.994943,
              -26.493153
            ],
            [
              -51.992441,
              -26.493632
            ],
            [
              -51.991988,
              -26.491575
            ],
            [
              -51.994525,
              -26.491136
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 22,
        "nome": "T22 - TUNA SUSHI",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.485521,
            "lng": -51.9851716,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4857899,
            "lng": -51.9836481,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4859627,
            "lng": -51.9824036,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.484916,
            "lng": -51.9849677,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4850505,
            "lng": -51.9835301,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4853289,
            "lng": -51.9822426,
            "tipo": "quadra"
          },
          {
            "nome": "RESIDENCIAL NOVA ERA",
            "lat": -26.4852001,
            "lng": -51.98448,
            "tipo": "condominio"
          },
          {
            "nome": "Tuna Sushi",
            "lat": -26.4858055,
            "lng": -51.9820213,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.985734,
              -26.484373
            ],
            [
              -51.986007,
              -26.485765
            ],
            [
              -51.982029,
              -26.486444
            ],
            [
              -51.981758,
              -26.485021
            ],
            [
              -51.985734,
              -26.484373
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 23,
        "nome": "T23 - RESTAURANTE PALADARE",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4839941,
            "lng": -51.9849999,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4843398,
            "lng": -51.9832619,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4843879,
            "lng": -51.9820388,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4832163,
            "lng": -51.9847103,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4834948,
            "lng": -51.9831224,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4837445,
            "lng": -51.9819315,
            "tipo": "quadra"
          },
          {
            "nome": "Escola de Música Sonar",
            "lat": -26.4830009,
            "lng": -51.9854076,
            "tipo": "referencia"
          },
          {
            "nome": "Paladare",
            "lat": -26.4842602,
            "lng": -51.9853115,
            "tipo": "referencia"
          },
          {
            "nome": "RESIDENCIAL FRAPORTI",
            "lat": -26.4844098,
            "lng": -51.9842891,
            "tipo": "condominio"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.985422,
              -26.482794
            ],
            [
              -51.985712,
              -26.484312
            ],
            [
              -51.981732,
              -26.484926
            ],
            [
              -51.981431,
              -26.483428
            ],
            [
              -51.985422,
              -26.482794
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 24,
        "nome": "T24 - SOS GÁS",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.482256,
            "lng": -51.9845493,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4825345,
            "lng": -51.9830795,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4826785,
            "lng": -51.981674,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4827265,
            "lng": -51.9808801,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4812861,
            "lng": -51.9842704,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4814973,
            "lng": -51.9827791,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4816126,
            "lng": -51.9816203,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.4818335,
            "lng": -51.9803436,
            "tipo": "quadra"
          },
          {
            "nome": "SOS Gás",
            "lat": -26.481417,
            "lng": -51.9807721,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.985455,
              -26.482727
            ],
            [
              -51.981061,
              -26.483428
            ],
            [
              -51.979469,
              -26.481491
            ],
            [
              -51.983375,
              -26.480844
            ],
            [
              -51.983431,
              -26.481094
            ],
            [
              -51.985083,
              -26.480821
            ],
            [
              -51.985455,
              -26.482727
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 25,
        "nome": "T25 - VW COPAUTO",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4908391,
            "lng": -51.9861878,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4910311,
            "lng": -51.9847179,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4912661,
            "lng": -51.9834718,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4914582,
            "lng": -51.9826028,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4916022,
            "lng": -51.9817874,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4916598,
            "lng": -51.9807359,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4899365,
            "lng": -51.9844819,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.4902291,
            "lng": -51.9832358,
            "tipo": "quadra"
          },
          {
            "nome": "9",
            "lat": -26.4902387,
            "lng": -51.9822916,
            "tipo": "quadra"
          },
          {
            "nome": "10",
            "lat": -26.4904979,
            "lng": -51.9814441,
            "tipo": "quadra"
          },
          {
            "nome": "17",
            "lat": -26.4896196,
            "lng": -51.9860376,
            "tipo": "quadra"
          },
          {
            "nome": "Clínica do Idoso",
            "lat": -26.4894495,
            "lng": -51.9858999,
            "tipo": "referencia"
          },
          {
            "nome": "MERCADO ECONÔMICO",
            "lat": -26.4914457,
            "lng": -51.9831835,
            "tipo": "referencia"
          },
          {
            "nome": "Residencial Universitário",
            "lat": -26.4902903,
            "lng": -51.9855388,
            "tipo": "condominio"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.986693,
              -26.489149
            ],
            [
              -51.987115,
              -26.491222
            ],
            [
              -51.981367,
              -26.492257
            ],
            [
              -51.980669,
              -26.492339
            ],
            [
              -51.980089,
              -26.49234
            ],
            [
              -51.979623,
              -26.492092
            ],
            [
              -51.979509,
              -26.49135
            ],
            [
              -51.980953,
              -26.490234
            ],
            [
              -51.986693,
              -26.489149
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 26,
        "nome": "T26 - CÍRCULO MILITAR",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4885729,
            "lng": -51.9857908,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4889762,
            "lng": -51.9843854,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4890479,
            "lng": -51.9829461,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4892976,
            "lng": -51.9820878,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4871037,
            "lng": -51.9848789,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4879052,
            "lng": -51.9826886,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4880781,
            "lng": -51.982002,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.4868778,
            "lng": -51.9827637,
            "tipo": "quadra"
          },
          {
            "nome": "Jacson Insulfilm",
            "lat": -26.4894961,
            "lng": -51.9834434,
            "tipo": "referencia"
          },
          {
            "nome": "Up Sports Centro Esportivo",
            "lat": -26.4866199,
            "lng": -51.9827575,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.986118,
              -26.485791
            ],
            [
              -51.986766,
              -26.4891
            ],
            [
              -51.98164,
              -26.490031
            ],
            [
              -51.981607,
              -26.486612
            ],
            [
              -51.986118,
              -26.485791
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 27,
        "nome": "T27 - MAQSERV",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4767284,
            "lng": -51.9946811,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4767477,
            "lng": -51.9935867,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.47548,
            "lng": -51.9945523,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4747885,
            "lng": -51.9933721,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4745196,
            "lng": -51.9944665,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4731559,
            "lng": -51.994209,
            "tipo": "quadra"
          },
          {
            "nome": "Dn@ Informática Ltda",
            "lat": -26.4766901,
            "lng": -51.9943434,
            "tipo": "referencia"
          },
          {
            "nome": "Maq Serv",
            "lat": -26.4774696,
            "lng": -51.9936086,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.9947831,
              -26.472698
            ],
            [
              -51.9955101,
              -26.477411
            ],
            [
              -51.9935681,
              -26.477694
            ],
            [
              -51.9928381,
              -26.472953
            ],
            [
              -51.9947831,
              -26.472698
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 28,
        "nome": "T28 - EM FRENTE ENTRADA DA GRUTA",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4768437,
            "lng": -51.9927713,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4771798,
            "lng": -51.9918808,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4773239,
            "lng": -51.9911493,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4757489,
            "lng": -51.9924709,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4760946,
            "lng": -51.9917287,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4747117,
            "lng": -51.9921705,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4750574,
            "lng": -51.9915892,
            "tipo": "quadra"
          },
          {
            "nome": "Park,s sorvetes e milk shake bebidas",
            "lat": -26.4779595,
            "lng": -51.9914001,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.992933,
              -26.474201
            ],
            [
              -51.993544,
              -26.477718
            ],
            [
              -51.990519,
              -26.478225
            ],
            [
              -51.991131,
              -26.474364
            ],
            [
              -51.992933,
              -26.474201
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 29,
        "nome": "T29 - PIZZAS DA CASA ",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4793254,
            "lng": -51.9873975,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4794406,
            "lng": -51.9853912,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4795487,
            "lng": -51.9842108,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4791525,
            "lng": -51.9857023,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4775351,
            "lng": -51.989381,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4786243,
            "lng": -51.9852731,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.477203,
            "lng": -51.9875798,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.4770589,
            "lng": -51.986464,
            "tipo": "quadra"
          },
          {
            "nome": "Pista de Skate Palmas",
            "lat": -26.4792279,
            "lng": -51.9857062,
            "tipo": "referencia"
          },
          {
            "nome": "Pizzas da Casa",
            "lat": -26.478489,
            "lng": -51.988301,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.985978,
              -26.479669
            ],
            [
              -51.983326,
              -26.480074
            ],
            [
              -51.982981,
              -26.478385
            ],
            [
              -51.985149,
              -26.477975
            ],
            [
              -51.985859,
              -26.477277
            ],
            [
              -51.986999,
              -26.476179
            ],
            [
              -51.98664,
              -26.475856
            ],
            [
              -51.987509,
              -26.475055
            ],
            [
              -51.989697,
              -26.477129
            ],
            [
              -51.990164,
              -26.478297
            ],
            [
              -51.98872,
              -26.478572
            ],
            [
              -51.988906,
              -26.479939
            ],
            [
              -51.986132,
              -26.480364
            ],
            [
              -51.985978,
              -26.479669
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 30,
        "nome": "T30 - EM FRENTE A CADEIA",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4756913,
            "lng": -51.9957754,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4743275,
            "lng": -51.9953033,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4731751,
            "lng": -51.9950673,
            "tipo": "quadra"
          },
          {
            "nome": "Demóbille Argenta",
            "lat": -26.4753291,
            "lng": -51.9967105,
            "tipo": "referencia"
          },
          {
            "nome": "Lanchonete Sinus II",
            "lat": -26.4772227,
            "lng": -51.9958675,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.995575,
              -26.472633
            ],
            [
              -51.995743,
              -26.47375
            ],
            [
              -51.996003,
              -26.474003
            ],
            [
              -51.996987,
              -26.475247
            ],
            [
              -51.996362,
              -26.476049
            ],
            [
              -51.995994,
              -26.476714
            ],
            [
              -51.995962,
              -26.477307
            ],
            [
              -51.995506,
              -26.477389
            ],
            [
              -51.994789,
              -26.472737
            ],
            [
              -51.995575,
              -26.472633
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 31,
        "nome": "T31- SUPERMERCADO FOSCARINI",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4807107,
            "lng": -51.9780418,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4797696,
            "lng": -51.9773552,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4795775,
            "lng": -51.9763038,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4788285,
            "lng": -51.9771406,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4788669,
            "lng": -51.9760248,
            "tipo": "quadra"
          },
          {
            "nome": "Supermercado Foscarini",
            "lat": -26.4793766,
            "lng": -51.9762392,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.977558,
              -26.478204
            ],
            [
              -51.978094,
              -26.480336
            ],
            [
              -51.979102,
              -26.481306
            ],
            [
              -51.979151,
              -26.481474
            ],
            [
              -51.977391,
              -26.480951
            ],
            [
              -51.976662,
              -26.480471
            ],
            [
              -51.975627,
              -26.479688
            ],
            [
              -51.975512,
              -26.479506
            ],
            [
              -51.975736,
              -26.478529
            ],
            [
              -51.977558,
              -26.478204
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 32,
        "nome": "T32 - MERCADO PERETTI",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4806147,
            "lng": -51.9799301,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4804802,
            "lng": -51.9789001,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4795967,
            "lng": -51.9798228,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4794815,
            "lng": -51.9783637,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4784828,
            "lng": -51.9794795,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4784828,
            "lng": -51.9782135,
            "tipo": "quadra"
          },
          {
            "nome": "Cami Farma",
            "lat": -26.478749,
            "lng": -51.9789971,
            "tipo": "referencia"
          },
          {
            "nome": "Mercado Peretti",
            "lat": -26.480053,
            "lng": -51.9804124,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.980183,
              -26.477743
            ],
            [
              -51.980837,
              -26.481176
            ],
            [
              -51.979341,
              -26.48146
            ],
            [
              -51.978118,
              -26.480245
            ],
            [
              -51.977558,
              -26.478204
            ],
            [
              -51.980183,
              -26.477743
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 33,
        "nome": "T33 - SANTUARIO/LOJA FABI",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4798464,
            "lng": -51.9824621,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4804226,
            "lng": -51.9813463,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4788285,
            "lng": -51.98199,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4791742,
            "lng": -51.9808528,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4781178,
            "lng": -51.9817325,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4782331,
            "lng": -51.9807562,
            "tipo": "quadra"
          },
          {
            "nome": "LOJA FABI",
            "lat": -26.4779325,
            "lng": -51.9819425,
            "tipo": "referencia"
          },
          {
            "nome": "Residencial VIBRE",
            "lat": -26.4798393,
            "lng": -51.9830972,
            "tipo": "condominio"
          },
          {
            "nome": "Residencial Vila Real",
            "lat": -26.4808176,
            "lng": -51.9826551,
            "tipo": "condominio"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.9828492,
              -26.478238
            ],
            [
              -51.983412,
              -26.480768
            ],
            [
              -51.980912,
              -26.481172
            ],
            [
              -51.980242,
              -26.477738
            ],
            [
              -51.9812452,
              -26.4776038
            ],
            [
              -51.9828492,
              -26.478238
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 34,
        "nome": "T34 - BOLICHE",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4852846,
            "lng": -51.9978653,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4850734,
            "lng": -51.999024,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4841803,
            "lng": -51.9993887,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4844588,
            "lng": -51.9976507,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4833065,
            "lng": -51.9991956,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4836234,
            "lng": -51.9973396,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4826246,
            "lng": -51.9984339,
            "tipo": "quadra"
          },
          {
            "nome": "Boliche Palmas",
            "lat": -26.4859518,
            "lng": -51.997611,
            "tipo": "referencia"
          },
          {
            "nome": "Comércio De Sucatas Palmense",
            "lat": -26.4836428,
            "lng": -51.9996206,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -52.001041,
              -26.485523
            ],
            [
              -51.997549,
              -26.486035
            ],
            [
              -51.996684,
              -26.48257
            ],
            [
              -51.997715,
              -26.482378
            ],
            [
              -51.998868,
              -26.481937
            ],
            [
              -51.999888,
              -26.481692
            ],
            [
              -52.001041,
              -26.485523
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 35,
        "nome": "T35 - CENTRO DO IDOSO/COLÉGIO SESI",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4844396,
            "lng": -52.0031653,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4842969,
            "lng": -52.0019501,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4838456,
            "lng": -52.0016068,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4829413,
            "lng": -52.0017447,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4824132,
            "lng": -52.0005752,
            "tipo": "quadra"
          },
          {
            "nome": "CENTRO DO IDOSO",
            "lat": -26.4838481,
            "lng": -52.0021655,
            "tipo": "referencia"
          },
          {
            "nome": "Colégio Sesi - Palmas",
            "lat": -26.4850782,
            "lng": -52.0028667,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.99996,
              -26.481757
            ],
            [
              -52.002323,
              -26.482366
            ],
            [
              -52.002479,
              -26.482969
            ],
            [
              -52.002463,
              -26.48343
            ],
            [
              -52.00249,
              -26.48379
            ],
            [
              -52.002617,
              -26.48395
            ],
            [
              -52.003441,
              -26.484198
            ],
            [
              -52.004094,
              -26.485379
            ],
            [
              -52.001084,
              -26.485557
            ],
            [
              -51.99996,
              -26.481757
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 36,
        "nome": "T36 - ALTO DA GLÓRIA LADO DIREITO ANTES DO CAIC",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4817296,
            "lng": -52.0051151,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4807225,
            "lng": -52.0046107,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.480007,
            "lng": -52.0054475,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4795641,
            "lng": -52.0049917,
            "tipo": "quadra"
          },
          {
            "nome": "JUAREZ AUTO MECANICA",
            "lat": -26.4809346,
            "lng": -52.0056434,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -52.005518,
              -26.479116
            ],
            [
              -52.005958,
              -26.48194
            ],
            [
              -52.0043,
              -26.482175
            ],
            [
              -52.003586,
              -26.479731
            ],
            [
              -52.005518,
              -26.479116
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 37,
        "nome": "T37 - ALTO DA GLÓRIA EM FRENTE AO CAIC",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4812989,
            "lng": -52.007779,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4814667,
            "lng": -52.0066062,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4807996,
            "lng": -52.0075752,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4809673,
            "lng": -52.0064346,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4802042,
            "lng": -52.0076395,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4804103,
            "lng": -52.0068422,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4798774,
            "lng": -52.0063541,
            "tipo": "quadra"
          },
          {
            "nome": "Duarte Espaço Gastronômico",
            "lat": -26.4814502,
            "lng": -52.0060097,
            "tipo": "referencia"
          },
          {
            "nome": "Mercado Nunes",
            "lat": -26.4807098,
            "lng": -52.0072797,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -52.006993,
              -26.47956
            ],
            [
              -52.007099,
              -26.480062
            ],
            [
              -52.007983,
              -26.479973
            ],
            [
              -52.008428,
              -26.481429
            ],
            [
              -52.007297,
              -26.481733
            ],
            [
              -52.006005,
              -26.481912
            ],
            [
              -52.005631,
              -26.479704
            ],
            [
              -52.006993,
              -26.47956
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 38,
        "nome": "T39 - CADEIA PÚBLICA",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4814907,
            "lng": -51.9978918,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.480564,
            "lng": -51.9973794,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4795268,
            "lng": -51.9975082,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4797045,
            "lng": -51.996363,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4791427,
            "lng": -52.0001045,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4784993,
            "lng": -51.9964434,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4757623,
            "lng": -51.9973365,
            "tipo": "quadra"
          },
          {
            "nome": "Condomínio Residencial Viver Bem",
            "lat": -26.4821706,
            "lng": -51.998,
            "tipo": "condominio"
          },
          {
            "nome": "Condomínio Residencial Viver Bem",
            "lat": -26.4821706,
            "lng": -51.998,
            "tipo": "condominio"
          },
          {
            "nome": "Liesch Atacadista Palmas",
            "lat": -26.4815904,
            "lng": -51.9988997,
            "tipo": "referencia"
          },
          {
            "nome": "Supermercado Dois Vizinhos",
            "lat": -26.478665,
            "lng": -51.9961185,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.997593,
              -26.482339
            ],
            [
              -51.996707,
              -26.482486
            ],
            [
              -51.995914,
              -26.479443
            ],
            [
              -51.995879,
              -26.479241
            ],
            [
              -51.995864,
              -26.479064
            ],
            [
              -51.995958,
              -26.478735
            ],
            [
              -51.996126,
              -26.478047
            ],
            [
              -51.996101,
              -26.477587
            ],
            [
              -51.996077,
              -26.476838
            ],
            [
              -51.996239,
              -26.476487
            ],
            [
              -51.996902,
              -26.475513
            ],
            [
              -51.997199,
              -26.475277
            ],
            [
              -51.997383,
              -26.475203
            ],
            [
              -51.997666,
              -26.475149
            ],
            [
              -51.998057,
              -26.47514
            ],
            [
              -51.998558,
              -26.475149
            ],
            [
              -51.999652,
              -26.476924
            ],
            [
              -52.000133,
              -26.477042
            ],
            [
              -52.001328,
              -26.477216
            ],
            [
              -52.001145,
              -26.479898
            ],
            [
              -51.999511,
              -26.480004
            ],
            [
              -51.999601,
              -26.480532
            ],
            [
              -51.998953,
              -26.480651
            ],
            [
              -51.999469,
              -26.481681
            ],
            [
              -51.99913,
              -26.481787
            ],
            [
              -51.998784,
              -26.481915
            ],
            [
              -51.998019,
              -26.482199
            ],
            [
              -51.997593,
              -26.482339
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 39,
        "nome": "T40 - PERTO DO CONDOMÍNIO TITO CARRARO",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4719684,
            "lng": -51.9973009,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4715938,
            "lng": -51.9968396,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4712096,
            "lng": -51.9963138,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4709791,
            "lng": -51.9960027,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4705566,
            "lng": -51.9956916,
            "tipo": "quadra"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.996276,
              -26.470223
            ],
            [
              -51.997972,
              -26.471956
            ],
            [
              -51.996979,
              -26.472883
            ],
            [
              -51.994941,
              -26.470708
            ],
            [
              -51.996276,
              -26.470223
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 40,
        "nome": "T41 - MARINI LAGOÃO",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4742736,
            "lng": -51.9979857,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4729147,
            "lng": -51.9999759,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4717955,
            "lng": -51.9989531,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4728519,
            "lng": -51.9977944,
            "tipo": "quadra"
          },
          {
            "nome": "Crivo Chapeação e Pintura / Estética Automotiva / Oficina.",
            "lat": -26.4747437,
            "lng": -51.9974182,
            "tipo": "referencia"
          },
          {
            "nome": "Marini Bem Viver - Bairro Lagoão",
            "lat": -26.4741233,
            "lng": -52.0003123,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.999069,
              -26.471156
            ],
            [
              -52.000332,
              -26.472205
            ],
            [
              -52.000605,
              -26.472753
            ],
            [
              -52.000699,
              -26.473852
            ],
            [
              -52.000495,
              -26.474136
            ],
            [
              -52.000056,
              -26.474378
            ],
            [
              -51.99894,
              -26.474873
            ],
            [
              -51.998379,
              -26.475005
            ],
            [
              -51.997467,
              -26.475031
            ],
            [
              -51.997003,
              -26.475238
            ],
            [
              -51.99591,
              -26.47389
            ],
            [
              -51.999069,
              -26.471156
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 41,
        "nome": "T42 - LAGOÃO CHURRASCARIA SAMPAIO",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4711904,
            "lng": -51.9983952,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4711136,
            "lng": -51.9976979,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4701148,
            "lng": -51.9973867,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4702781,
            "lng": -51.9967108,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4692696,
            "lng": -51.9961529,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4698267,
            "lng": -51.9956701,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4691928,
            "lng": -51.9954877,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.4684622,
            "lng": -51.9952988,
            "tipo": "quadra"
          },
          {
            "nome": "Churrascaria Sampaio",
            "lat": -26.4705562,
            "lng": -51.9976812,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.998992,
              -26.471135
            ],
            [
              -51.998016,
              -26.471966
            ],
            [
              -51.9962,
              -26.470141
            ],
            [
              -51.995515,
              -26.470442
            ],
            [
              -51.994775,
              -26.468416
            ],
            [
              -51.995494,
              -26.468245
            ],
            [
              -51.995905,
              -26.468602
            ],
            [
              -51.998992,
              -26.471135
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 42,
        "nome": "T43 - PERTO DO CONDOMÍNIO TITO CARRARO",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4728711,
            "lng": -51.9961422,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4719107,
            "lng": -51.9955146,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.471469,
            "lng": -51.9950371,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4710799,
            "lng": -51.9949727,
            "tipo": "quadra"
          },
          {
            "nome": "Cavalheiro Barber Club",
            "lat": -26.4736616,
            "lng": -51.9959836,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.99693,
              -26.472899
            ],
            [
              -51.995857,
              -26.473821
            ],
            [
              -51.995578,
              -26.472683
            ],
            [
              -51.99458,
              -26.471924
            ],
            [
              -51.994794,
              -26.470753
            ],
            [
              -51.99488,
              -26.470695
            ],
            [
              -51.99693,
              -26.472899
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 43,
        "nome": "T44 - JFEY E FILHOS HÍPICA",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4714511,
            "lng": -52.0009592,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4709324,
            "lng": -51.9999507,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4704138,
            "lng": -51.9987061,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.469972,
            "lng": -51.9994035,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4706635,
            "lng": -52.0016995,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4698952,
            "lng": -52.0007339,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4692229,
            "lng": -52.0000258,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.4689348,
            "lng": -52.0034912,
            "tipo": "quadra"
          },
          {
            "nome": "9",
            "lat": -26.4680208,
            "lng": -52.004296,
            "tipo": "quadra"
          },
          {
            "nome": "10",
            "lat": -26.4676462,
            "lng": -52.0036523,
            "tipo": "quadra"
          },
          {
            "nome": "11",
            "lat": -26.4684914,
            "lng": -52.0029442,
            "tipo": "quadra"
          },
          {
            "nome": "12",
            "lat": -26.4681457,
            "lng": -52.001292,
            "tipo": "quadra"
          },
          {
            "nome": "J Fey e Filhos",
            "lat": -26.4685706,
            "lng": -52.0003882,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -52.000782,
              -26.472363
            ],
            [
              -51.99827,
              -26.470406
            ],
            [
              -52.001364,
              -26.467398
            ],
            [
              -52.002299,
              -26.467868
            ],
            [
              -52.003164,
              -26.46664
            ],
            [
              -52.004054,
              -26.466246
            ],
            [
              -52.004084,
              -26.46661
            ],
            [
              -52.00415,
              -26.467045
            ],
            [
              -52.004356,
              -26.467285
            ],
            [
              -52.004936,
              -26.467696
            ],
            [
              -52.004067,
              -26.469042
            ],
            [
              -52.003452,
              -26.469588
            ],
            [
              -52.002592,
              -26.470354
            ],
            [
              -52.001777,
              -26.47128
            ],
            [
              -52.000782,
              -26.472363
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 44,
        "nome": "T45 - LAGOA DA HÍPICA",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4695735,
            "lng": -51.9984349,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4694102,
            "lng": -51.9976517,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4691125,
            "lng": -51.9971904,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4687475,
            "lng": -51.9967827,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4684018,
            "lng": -51.9964501,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4673068,
            "lng": -51.9963279,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4675949,
            "lng": -51.9957056,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.4685843,
            "lng": -51.9990572,
            "tipo": "quadra"
          },
          {
            "nome": "Parque Municipal Hípica",
            "lat": -26.4688035,
            "lng": -51.998168,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -52.000032,
              -26.468477
            ],
            [
              -51.998165,
              -26.470417
            ],
            [
              -51.995665,
              -26.468362
            ],
            [
              -51.995054,
              -26.465894
            ],
            [
              -51.997714,
              -26.467061
            ],
            [
              -52.000032,
              -26.468477
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 45,
        "nome": "T46 - EM FRENTE A LAGOA DA HÍPICA",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4670616,
            "lng": -52.0011121,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4678255,
            "lng": -52.0002106,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4666774,
            "lng": -52.0005382,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4674473,
            "lng": -51.9996174,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4670679,
            "lng": -51.9992741,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4664292,
            "lng": -52.0015003,
            "tipo": "quadra"
          },
          {
            "nome": "Centro da Juventude de Palmas",
            "lat": -26.4660868,
            "lng": -52.0006146,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -52.003066,
              -26.466638
            ],
            [
              -52.002373,
              -26.467507
            ],
            [
              -52.001665,
              -26.466888
            ],
            [
              -52.000088,
              -26.468477
            ],
            [
              -51.998447,
              -26.467459
            ],
            [
              -51.994745,
              -26.465658
            ],
            [
              -51.997782,
              -26.463286
            ],
            [
              -52.003066,
              -26.466638
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 46,
        "nome": "T47 - POSTO DE SAÚDE LAGOÃO",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4710186,
            "lng": -52.005733,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4715852,
            "lng": -52.0047996,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4707977,
            "lng": -52.0045206,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4712587,
            "lng": -52.0034048,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4701638,
            "lng": -52.004113,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4697472,
            "lng": -52.004941,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.470231,
            "lng": -52.003201,
            "tipo": "quadra"
          },
          {
            "nome": "Mercado Favero",
            "lat": -26.4693954,
            "lng": -52.0039564,
            "tipo": "referencia"
          },
          {
            "nome": "Posto de Saúde Lagoão",
            "lat": -26.4698041,
            "lng": -52.0043213,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -52.004317,
              -26.468846
            ],
            [
              -52.006752,
              -26.471017
            ],
            [
              -52.003646,
              -26.472549
            ],
            [
              -52.00245,
              -26.470609
            ],
            [
              -52.003421,
              -26.469771
            ],
            [
              -52.004317,
              -26.468846
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 47,
        "nome": "T48 - EM FRENTE APAE",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4726128,
            "lng": -52.0027718,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4735348,
            "lng": -52.0011089,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4718349,
            "lng": -52.0025251,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4717485,
            "lng": -52.0017526,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4728817,
            "lng": -52.0009158,
            "tipo": "quadra"
          },
          {
            "nome": "BIG LANCHES",
            "lat": -26.4726154,
            "lng": -52.0033923,
            "tipo": "referencia"
          },
          {
            "nome": "Sicoob",
            "lat": -26.4734939,
            "lng": -52.0014147,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -52.002032,
              -26.471117
            ],
            [
              -52.002558,
              -26.471165
            ],
            [
              -52.002939,
              -26.471453
            ],
            [
              -52.003646,
              -26.472549
            ],
            [
              -52.000825,
              -26.474007
            ],
            [
              -52.00075,
              -26.473215
            ],
            [
              -52.000734,
              -26.472552
            ],
            [
              -52.002032,
              -26.471117
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 48,
        "nome": "T49 - EM FRENTE ESCOLA NERASI",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4699585,
            "lng": -52.0082026,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4703234,
            "lng": -52.0069151,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4691325,
            "lng": -52.0086103,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.468902,
            "lng": -52.0073657,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4694206,
            "lng": -52.0059066,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4681721,
            "lng": -52.006722,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4685178,
            "lng": -52.0051126,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.4673845,
            "lng": -52.0055847,
            "tipo": "quadra"
          },
          {
            "nome": "Chapeaçao e pintura RML",
            "lat": -26.4687484,
            "lng": -52.0045036,
            "tipo": "referencia"
          },
          {
            "nome": "Funerária e Floricultura Cristo Rei",
            "lat": -26.4701074,
            "lng": -52.0066822,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -52.009467,
              -26.469741
            ],
            [
              -52.00675,
              -26.470992
            ],
            [
              -52.004309,
              -26.468819
            ],
            [
              -52.005707,
              -26.466622
            ],
            [
              -52.009372,
              -26.469507
            ],
            [
              -52.009467,
              -26.469741
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 49,
        "nome": "T50 - COMPRE MAIS",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4909309,
            "lng": -51.9994531,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4883767,
            "lng": -51.9994102,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4873012,
            "lng": -51.9988094,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4864754,
            "lng": -51.9980369,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4863986,
            "lng": -51.9991742,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4865618,
            "lng": -52.0000968,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4859417,
            "lng": -52.0017937,
            "tipo": "quadra"
          },
          {
            "nome": "Compre Mais | Palmas - PR loja 35",
            "lat": -26.4901646,
            "lng": -51.9987566,
            "tipo": "referencia"
          },
          {
            "nome": "Hotel Palmas",
            "lat": -26.4864593,
            "lng": -51.998557,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -52.005979,
              -26.492022
            ],
            [
              -52.00342,
              -26.49172
            ],
            [
              -52.000808,
              -26.491485
            ],
            [
              -51.998849,
              -26.491352
            ],
            [
              -51.997598,
              -26.486141
            ],
            [
              -52.000393,
              -26.485657
            ],
            [
              -52.002063,
              -26.485598
            ],
            [
              -52.003746,
              -26.485488
            ],
            [
              -52.004485,
              -26.485458
            ],
            [
              -52.004634,
              -26.485479
            ],
            [
              -52.0048,
              -26.485652
            ],
            [
              -52.005052,
              -26.485791
            ],
            [
              -52.005339,
              -26.485846
            ],
            [
              -52.005631,
              -26.485838
            ],
            [
              -52.00609,
              -26.485692
            ],
            [
              -52.005979,
              -26.492022
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 50,
        "nome": "T51 - LOTEAMENTO BENEDETI",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4994514,
            "lng": -51.9909217,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4998451,
            "lng": -51.9903316,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4995186,
            "lng": -51.9896986,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.50069,
            "lng": -51.9904175,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.5004061,
            "lng": -51.9898013,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.5002291,
            "lng": -51.9893124,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.5021398,
            "lng": -51.9898166,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.502063,
            "lng": -51.9910397,
            "tipo": "quadra"
          },
          {
            "nome": "9",
            "lat": -26.50248,
            "lng": -51.990724,
            "tipo": "quadra"
          },
          {
            "nome": "10",
            "lat": -26.4980993,
            "lng": -51.9871544,
            "tipo": "quadra"
          },
          {
            "nome": "Arena Amigos da Bola",
            "lat": -26.4972345,
            "lng": -51.9900903,
            "tipo": "referencia"
          },
          {
            "nome": "Bortoluzzi Sementes",
            "lat": -26.4991385,
            "lng": -51.9911535,
            "tipo": "referencia"
          },
          {
            "nome": "WeigertAutoEletrica",
            "lat": -26.4987008,
            "lng": -51.990875,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.992017,
              -26.502192
            ],
            [
              -51.990923,
              -26.502931
            ],
            [
              -51.988863,
              -26.502067
            ],
            [
              -51.988584,
              -26.501155
            ],
            [
              -51.986588,
              -26.497362
            ],
            [
              -51.989936,
              -26.49669
            ],
            [
              -51.991014,
              -26.498486
            ],
            [
              -51.991626,
              -26.499134
            ],
            [
              -51.992468,
              -26.499849
            ],
            [
              -51.992017,
              -26.502192
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 51,
        "nome": "T52 - KLUBEGI MERCADO IDEAL",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4988002,
            "lng": -51.9860708,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4989923,
            "lng": -51.9851695,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4991939,
            "lng": -51.9841288,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4979169,
            "lng": -51.9864999,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4978785,
            "lng": -51.9858895,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4983105,
            "lng": -51.9847404,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4982049,
            "lng": -51.9837319,
            "tipo": "quadra"
          },
          {
            "nome": "Mercado Ideal",
            "lat": -26.4982964,
            "lng": -51.9856743,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.986562,
              -26.497401
            ],
            [
              -51.987641,
              -26.499446
            ],
            [
              -51.986863,
              -26.49911
            ],
            [
              -51.983703,
              -26.499561
            ],
            [
              -51.983296,
              -26.498063
            ],
            [
              -51.986562,
              -26.497401
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 52,
        "nome": "T53 - KLUBEGI REGIÃO ACESSO LOTEAMENTO BENEDETI",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.5004229,
            "lng": -51.9878088,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4998324,
            "lng": -51.9867225,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.499674,
            "lng": -51.985427,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.5007782,
            "lng": -51.9856952,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.5002309,
            "lng": -51.9845043,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.5013158,
            "lng": -51.9857274,
            "tipo": "quadra"
          },
          {
            "nome": "Elson acabamentos",
            "lat": -26.5004597,
            "lng": -51.9850895,
            "tipo": "referencia"
          },
          {
            "nome": "Posto de Saude da Klubegi",
            "lat": -26.5009231,
            "lng": -51.9860572,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.988544,
              -26.501112
            ],
            [
              -51.9876,
              -26.501892
            ],
            [
              -51.986267,
              -26.502007
            ],
            [
              -51.983802,
              -26.500927
            ],
            [
              -51.983737,
              -26.499549
            ],
            [
              -51.986897,
              -26.499127
            ],
            [
              -51.987686,
              -26.499492
            ],
            [
              -51.988544,
              -26.501112
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 53,
        "nome": "T54 - COLÉGIO MONSENHOR",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4946714,
            "lng": -51.9885119,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4967166,
            "lng": -51.9877286,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4959485,
            "lng": -51.9875248,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4969759,
            "lng": -51.9869133,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4962365,
            "lng": -51.9856902,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4971295,
            "lng": -51.9859262,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.49736,
            "lng": -51.9845744,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.4966782,
            "lng": -51.9845744,
            "tipo": "quadra"
          },
          {
            "nome": "Do Grilo Conveniência",
            "lat": -26.4953832,
            "lng": -51.9864566,
            "tipo": "referencia"
          },
          {
            "nome": "Mercado Amigão",
            "lat": -26.4965586,
            "lng": -51.9864643,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.988992,
              -26.494356
            ],
            [
              -51.989891,
              -26.496646
            ],
            [
              -51.98359,
              -26.498005
            ],
            [
              -51.983392,
              -26.497414
            ],
            [
              -51.98366,
              -26.497256
            ],
            [
              -51.984419,
              -26.495849
            ],
            [
              -51.984894,
              -26.495578
            ],
            [
              -51.986881,
              -26.49505
            ],
            [
              -51.987268,
              -26.494844
            ],
            [
              -51.987568,
              -26.494587
            ],
            [
              -51.988992,
              -26.494356
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 54,
        "nome": "T55 - PÁTIO DA PREFEITURA PRÓXIMO A COAMO",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4984621,
            "lng": -51.9769993,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4978092,
            "lng": -51.9771066,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.5002192,
            "lng": -51.9739952,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.5002385,
            "lng": -51.9734051,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.5003057,
            "lng": -51.9727721,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4992687,
            "lng": -51.9742098,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4990767,
            "lng": -51.9731369,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.498683,
            "lng": -51.9719246,
            "tipo": "quadra"
          },
          {
            "nome": "Secretária de Infraestrutura",
            "lat": -26.4993745,
            "lng": -51.9725127,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.977614,
              -26.498036
            ],
            [
              -51.977598,
              -26.502092
            ],
            [
              -51.976493,
              -26.501957
            ],
            [
              -51.972556,
              -26.500887
            ],
            [
              -51.972695,
              -26.500008
            ],
            [
              -51.971703,
              -26.49984
            ],
            [
              -51.971778,
              -26.498198
            ],
            [
              -51.974416,
              -26.496894
            ],
            [
              -51.977512,
              -26.497312
            ],
            [
              -51.977614,
              -26.498036
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 55,
        "nome": "T56 - VERDES CAMPOS",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.5012466,
            "lng": -51.9651118,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.5013481,
            "lng": -51.9645098,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.501617,
            "lng": -51.9640806,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.5017946,
            "lng": -51.9637534,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.502025,
            "lng": -51.963335,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.5001383,
            "lng": -51.9643864,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.500412,
            "lng": -51.9639894,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.5005608,
            "lng": -51.9630292,
            "tipo": "quadra"
          },
          {
            "nome": "9",
            "lat": -26.500868,
            "lng": -51.9632759,
            "tipo": "quadra"
          },
          {
            "nome": "10",
            "lat": -26.5012761,
            "lng": -51.9634315,
            "tipo": "quadra"
          },
          {
            "nome": "11",
            "lat": -26.5002391,
            "lng": -51.9621923,
            "tipo": "quadra"
          },
          {
            "nome": "Oficina do Pinguim",
            "lat": -26.5001938,
            "lng": -51.9630566,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.963259,
              -26.502695
            ],
            [
              -51.960995,
              -26.500074
            ],
            [
              -51.96666,
              -26.49774
            ],
            [
              -51.967336,
              -26.498604
            ],
            [
              -51.966338,
              -26.501341
            ],
            [
              -51.965845,
              -26.501667
            ],
            [
              -51.9643,
              -26.501955
            ],
            [
              -51.963259,
              -26.502695
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 56,
        "nome": "T57 - CASCATINHA PRÓXIMO A ETA SANEPAR ",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4938052,
            "lng": -51.9830596,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.493786,
            "lng": -51.9820619,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.493786,
            "lng": -51.9811177,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4932387,
            "lng": -51.9838321,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4924225,
            "lng": -51.9836819,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4924321,
            "lng": -51.9828129,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4925954,
            "lng": -51.9819009,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.4929795,
            "lng": -51.9807851,
            "tipo": "quadra"
          },
          {
            "nome": "Brilhan Car Chapeação e Pintura",
            "lat": -26.4934272,
            "lng": -51.9832783,
            "tipo": "referencia"
          },
          {
            "nome": "CMEI Brinquedoteca",
            "lat": -26.4936121,
            "lng": -51.9808875,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.984396,
              -26.493622
            ],
            [
              -51.98343,
              -26.493794
            ],
            [
              -51.983624,
              -26.494543
            ],
            [
              -51.983484,
              -26.494754
            ],
            [
              -51.979675,
              -26.494121
            ],
            [
              -51.980287,
              -26.492738
            ],
            [
              -51.980705,
              -26.492413
            ],
            [
              -51.984089,
              -26.491836
            ],
            [
              -51.984396,
              -26.493622
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 57,
        "nome": "T58 - HOTEL DI FRATELLI",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4940361,
            "lng": -51.9870529,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4928742,
            "lng": -51.9868169,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4918907,
            "lng": -51.9866048,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.494641,
            "lng": -51.9862268,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4940169,
            "lng": -51.9861946,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4931427,
            "lng": -51.9857526,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4921596,
            "lng": -51.9851457,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.4948135,
            "lng": -51.9852483,
            "tipo": "quadra"
          },
          {
            "nome": "9",
            "lat": -26.4932867,
            "lng": -51.9847977,
            "tipo": "quadra"
          },
          {
            "nome": "10",
            "lat": -26.4946598,
            "lng": -51.9842935,
            "tipo": "quadra"
          },
          {
            "nome": "11",
            "lat": -26.4953416,
            "lng": -51.9833279,
            "tipo": "quadra"
          },
          {
            "nome": "12",
            "lat": -26.4970565,
            "lng": -51.9817712,
            "tipo": "quadra"
          },
          {
            "nome": "13",
            "lat": -26.4962302,
            "lng": -51.9814853,
            "tipo": "quadra"
          },
          {
            "nome": "14",
            "lat": -26.4962494,
            "lng": -51.9807128,
            "tipo": "quadra"
          },
          {
            "nome": "15",
            "lat": -26.4962782,
            "lng": -51.9801656,
            "tipo": "quadra"
          },
          {
            "nome": "16",
            "lat": -26.4970272,
            "lng": -51.9807986,
            "tipo": "quadra"
          },
          {
            "nome": "DETRAN-Departamento Estadual de Trânsito",
            "lat": -26.4917571,
            "lng": -51.9858772,
            "tipo": "referencia"
          },
          {
            "nome": "Hotel Di Fratelli",
            "lat": -26.4944316,
            "lng": -51.9873456,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.987077,
              -26.491336
            ],
            [
              -51.987668,
              -26.494226
            ],
            [
              -51.987282,
              -26.494658
            ],
            [
              -51.986467,
              -26.495033
            ],
            [
              -51.984707,
              -26.495504
            ],
            [
              -51.984288,
              -26.495765
            ],
            [
              -51.983548,
              -26.497184
            ],
            [
              -51.983087,
              -26.497443
            ],
            [
              -51.978656,
              -26.497645
            ],
            [
              -51.979471,
              -26.494985
            ],
            [
              -51.983688,
              -26.494774
            ],
            [
              -51.983548,
              -26.493833
            ],
            [
              -51.984396,
              -26.493622
            ],
            [
              -51.984089,
              -26.491836
            ],
            [
              -51.987077,
              -26.491336
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 58,
        "nome": "T59 - SÃO FRANCISCO - OCUPAÇÃO",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.5021888,
            "lng": -51.9998169,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.5017567,
            "lng": -51.9995916,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.5014399,
            "lng": -51.9992483,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.5010942,
            "lng": -51.9987226,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.5005085,
            "lng": -51.998669,
            "tipo": "quadra"
          },
          {
            "nome": "📍",
            "lat": -26.5025153,
            "lng": -52.0000422,
            "tipo": "quadra"
          },
          {
            "nome": "📍",
            "lat": -26.5024384,
            "lng": -51.9987119,
            "tipo": "quadra"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.998618,
              -26.499938
            ],
            [
              -52.000756,
              -26.502473
            ],
            [
              -51.999811,
              -26.503304
            ],
            [
              -51.997794,
              -26.502288
            ],
            [
              -51.997376,
              -26.501268
            ],
            [
              -51.998618,
              -26.499938
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 59,
        "nome": "T60 - SÃO FRANCISCO EM FRENTE A GUARARAPES",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4944239,
            "lng": -51.9969051,
            "tipo": "quadra"
          },
          {
            "nome": "1",
            "lat": -26.4967216,
            "lng": -52.0010722,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4969454,
            "lng": -52.0004338,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4971999,
            "lng": -51.9998652,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4965282,
            "lng": -51.9997343,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4957985,
            "lng": -52.0002121,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4962449,
            "lng": -51.9990319,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4955152,
            "lng": -51.9999975,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.4953376,
            "lng": -52.0016176,
            "tipo": "quadra"
          },
          {
            "nome": "9",
            "lat": -26.4940989,
            "lng": -52.0002443,
            "tipo": "quadra"
          },
          {
            "nome": "10",
            "lat": -26.493009,
            "lng": -51.9994393,
            "tipo": "quadra"
          },
          {
            "nome": "11",
            "lat": -26.4928554,
            "lng": -51.9991174,
            "tipo": "quadra"
          },
          {
            "nome": "12",
            "lat": -26.4931661,
            "lng": -51.9975059,
            "tipo": "quadra"
          },
          {
            "nome": "Mercado Serrinha",
            "lat": -26.4938424,
            "lng": -52.0004573,
            "tipo": "referencia"
          },
          {
            "nome": "Mercearia Machado's",
            "lat": -26.4956933,
            "lng": -52.0009983,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.996366,
              -26.493012
            ],
            [
              -51.997716,
              -26.492748
            ],
            [
              -51.999125,
              -26.492465
            ],
            [
              -51.999725,
              -26.49297
            ],
            [
              -52.000475,
              -26.493742
            ],
            [
              -52.002036,
              -26.494772
            ],
            [
              -52.002489,
              -26.495722
            ],
            [
              -52.003527,
              -26.496864
            ],
            [
              -52.003806,
              -26.497482
            ],
            [
              -52.00254,
              -26.497664
            ],
            [
              -52.000808,
              -26.497093
            ],
            [
              -52.000443,
              -26.497199
            ],
            [
              -51.999493,
              -26.49764
            ],
            [
              -51.998437,
              -26.496719
            ],
            [
              -51.997578,
              -26.494818
            ],
            [
              -51.996076,
              -26.494894
            ],
            [
              -51.995904,
              -26.494721
            ],
            [
              -51.996366,
              -26.493012
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 60,
        "nome": "T61 - SÃO FRANCISCO MERCADO FAMILIAR",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.5013439,
            "lng": -52.0002997,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4998998,
            "lng": -52.0003963,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.5002647,
            "lng": -52.0000208,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.5006526,
            "lng": -51.9996667,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4988244,
            "lng": -51.9997472,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4997942,
            "lng": -51.9995487,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.5001821,
            "lng": -51.9990874,
            "tipo": "quadra"
          },
          {
            "nome": "Mercado Familiar",
            "lat": -26.4999628,
            "lng": -52.000696,
            "tipo": "referencia"
          },
          {
            "nome": "Mercado Vila Nova",
            "lat": -26.499159,
            "lng": -52.0001109,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.999553,
              -26.49772
            ],
            [
              -52.000175,
              -26.499093
            ],
            [
              -52.000218,
              -26.499295
            ],
            [
              -52.001044,
              -26.500351
            ],
            [
              -52.000819,
              -26.500792
            ],
            [
              -52.000626,
              -26.5011
            ],
            [
              -52.00039,
              -26.501964
            ],
            [
              -51.998618,
              -26.499938
            ],
            [
              -51.99907,
              -26.497998
            ],
            [
              -51.999553,
              -26.49772
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 61,
        "nome": "T62 SÃO FRANCISCO EM FRENTE MERCADO FAMILIAR",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4998326,
            "lng": -52.0022309,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.5000919,
            "lng": -52.0018447,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.5003703,
            "lng": -52.0015872,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4997558,
            "lng": -52.000922,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4994677,
            "lng": -52.0014048,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4991797,
            "lng": -52.0017267,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4987956,
            "lng": -52.001834,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.4981907,
            "lng": -52.001952,
            "tipo": "quadra"
          },
          {
            "nome": "9",
            "lat": -26.4976915,
            "lng": -52.001158,
            "tipo": "quadra"
          },
          {
            "nome": "10",
            "lat": -26.4978019,
            "lng": -52.0003993,
            "tipo": "quadra"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -52.001434,
              -26.500751
            ],
            [
              -52.000254,
              -26.499286
            ],
            [
              -52.000136,
              -26.498917
            ],
            [
              -51.999476,
              -26.497688
            ],
            [
              -52.000748,
              -26.497073
            ],
            [
              -52.002121,
              -26.498019
            ],
            [
              -52.002491,
              -26.499997
            ],
            [
              -52.001434,
              -26.500751
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 62,
        "nome": "T63 - DIVINO - HOTEL ANTARES",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4944012,
            "lng": -51.9907248,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.49467,
            "lng": -51.9897002,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4959086,
            "lng": -51.9900809,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4969264,
            "lng": -51.9917707,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4971521,
            "lng": -51.9912075,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4974209,
            "lng": -51.9921087,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4977384,
            "lng": -51.9912612,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4985607,
            "lng": -51.9916637,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.4998473,
            "lng": -51.9927309,
            "tipo": "quadra"
          },
          {
            "nome": "9",
            "lat": -26.5033928,
            "lng": -51.9936675,
            "tipo": "quadra"
          },
          {
            "nome": "10",
            "lat": -26.5034456,
            "lng": -51.9922621,
            "tipo": "quadra"
          },
          {
            "nome": "11",
            "lat": -26.504794,
            "lng": -51.9926766,
            "tipo": "quadra"
          },
          {
            "nome": "12",
            "lat": -26.5070412,
            "lng": -51.9930023,
            "tipo": "quadra"
          },
          {
            "nome": "13",
            "lat": -26.5101855,
            "lng": -51.9925517,
            "tipo": "quadra"
          },
          {
            "nome": "Hotel Antares",
            "lat": -26.4944467,
            "lng": -51.9896943,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.991196,
              -26.493934
            ],
            [
              -51.991493,
              -26.495564
            ],
            [
              -51.992523,
              -26.497215
            ],
            [
              -51.992872,
              -26.499035
            ],
            [
              -51.993237,
              -26.499784
            ],
            [
              -51.993832,
              -26.501522
            ],
            [
              -51.993848,
              -26.50374
            ],
            [
              -51.993526,
              -26.512131
            ],
            [
              -51.992145,
              -26.511833
            ],
            [
              -51.991096,
              -26.511248
            ],
            [
              -51.990608,
              -26.505295
            ],
            [
              -51.992188,
              -26.502057
            ],
            [
              -51.992555,
              -26.499962
            ],
            [
              -51.991402,
              -26.4989
            ],
            [
              -51.99052,
              -26.4976
            ],
            [
              -51.989849,
              -26.496458
            ],
            [
              -51.989029,
              -26.494321
            ],
            [
              -51.991196,
              -26.493934
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 63,
        "nome": "T64 - BARRACÃO DO KIKO",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4936618,
            "lng": -51.9944799,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4942091,
            "lng": -51.9956708,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.49443,
            "lng": -51.9945335,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4952365,
            "lng": -51.9943833,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4938923,
            "lng": -51.99279,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4939889,
            "lng": -51.9920874,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4941467,
            "lng": -51.9916102,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.495491,
            "lng": -51.9936541,
            "tipo": "quadra"
          },
          {
            "nome": "9",
            "lat": -26.4960383,
            "lng": -51.9944373,
            "tipo": "quadra"
          },
          {
            "nome": "10",
            "lat": -26.4959813,
            "lng": -51.9937288,
            "tipo": "quadra"
          },
          {
            "nome": "11",
            "lat": -26.4973407,
            "lng": -51.9956922,
            "tipo": "quadra"
          },
          {
            "nome": "12",
            "lat": -26.4975044,
            "lng": -51.9948501,
            "tipo": "quadra"
          },
          {
            "nome": "13",
            "lat": -26.4980805,
            "lng": -51.994877,
            "tipo": "quadra"
          },
          {
            "nome": "14",
            "lat": -26.498709,
            "lng": -51.994935,
            "tipo": "quadra"
          },
          {
            "nome": "15",
            "lat": -26.5007109,
            "lng": -51.9965872,
            "tipo": "quadra"
          },
          {
            "nome": "Império das Rações",
            "lat": -26.4936761,
            "lng": -51.9929469,
            "tipo": "referencia"
          },
          {
            "nome": "Loja Richard",
            "lat": -26.4934627,
            "lng": -51.9942709,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.995892,
              -26.4946
            ],
            [
              -51.995967,
              -26.494946
            ],
            [
              -51.995409,
              -26.495037
            ],
            [
              -51.99549,
              -26.495714
            ],
            [
              -51.997061,
              -26.499694
            ],
            [
              -51.997394,
              -26.50101
            ],
            [
              -51.995693,
              -26.502392
            ],
            [
              -51.994159,
              -26.501423
            ],
            [
              -51.993199,
              -26.499027
            ],
            [
              -51.992593,
              -26.497155
            ],
            [
              -51.991702,
              -26.495729
            ],
            [
              -51.991509,
              -26.49535
            ],
            [
              -51.991196,
              -26.493934
            ],
            [
              -51.995929,
              -26.493045
            ],
            [
              -51.995892,
              -26.4946
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 64,
        "nome": "T65 - SERRINHA",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4917992,
            "lng": -51.9997397,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4925673,
            "lng": -52.000083,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4919336,
            "lng": -52.0008126,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4924905,
            "lng": -52.0009843,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4933404,
            "lng": -52.0009038,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4920296,
            "lng": -52.0028082,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4926249,
            "lng": -52.0024648,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.493422,
            "lng": -52.0027491,
            "tipo": "quadra"
          },
          {
            "nome": "9",
            "lat": -26.4939069,
            "lng": -52.001848,
            "tipo": "quadra"
          },
          {
            "nome": "10",
            "lat": -26.4938732,
            "lng": -52.0013061,
            "tipo": "quadra"
          },
          {
            "nome": "11",
            "lat": -26.4938156,
            "lng": -52.0033661,
            "tipo": "quadra"
          },
          {
            "nome": "12",
            "lat": -26.4942733,
            "lng": -52.0025266,
            "tipo": "quadra"
          },
          {
            "nome": "13",
            "lat": -26.4943933,
            "lng": -52.0019527,
            "tipo": "quadra"
          },
          {
            "nome": "14",
            "lat": -26.4924729,
            "lng": -52.0045651,
            "tipo": "quadra"
          },
          {
            "nome": "15",
            "lat": -26.4934307,
            "lng": -52.0094816,
            "tipo": "quadra"
          },
          {
            "nome": "Posto Delta",
            "lat": -26.4947707,
            "lng": -52.0090632,
            "tipo": "referencia"
          },
          {
            "nome": "Retifica Wilson",
            "lat": -26.4919269,
            "lng": -52.0027854,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.9987584,
              -26.4914372
            ],
            [
              -51.9997874,
              -26.4914252
            ],
            [
              -52.0031234,
              -26.4917372
            ],
            [
              -52.0068304,
              -26.4921892
            ],
            [
              -52.0077544,
              -26.4919552
            ],
            [
              -52.0079804,
              -26.4919592
            ],
            [
              -52.0088714,
              -26.4921482
            ],
            [
              -52.0098974,
              -26.4923692
            ],
            [
              -52.0108683,
              -26.4925852
            ],
            [
              -52.0114043,
              -26.4927402
            ],
            [
              -52.0118443,
              -26.4931722
            ],
            [
              -52.0071794,
              -26.4964312
            ],
            [
              -52.0057684,
              -26.4974152
            ],
            [
              -52.0049044,
              -26.4980802
            ],
            [
              -52.0042494,
              -26.4987552
            ],
            [
              -52.0036804,
              -26.4970542
            ],
            [
              -52.0034364,
              -26.4966172
            ],
            [
              -52.0029824,
              -26.4961372
            ],
            [
              -52.0025474,
              -26.4957072
            ],
            [
              -52.0024634,
              -26.4955402
            ],
            [
              -52.0023254,
              -26.4951842
            ],
            [
              -52.0020934,
              -26.4947552
            ],
            [
              -52.0019174,
              -26.4945812
            ],
            [
              -52.0015454,
              -26.4943132
            ],
            [
              -52.0007424,
              -26.4938122
            ],
            [
              -52.0003914,
              -26.4935072
            ],
            [
              -51.9997244,
              -26.4927302
            ],
            [
              -51.9992844,
              -26.4924222
            ],
            [
              -51.9989874,
              -26.4923372
            ],
            [
              -51.9987584,
              -26.4914372
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 65,
        "nome": "T66 - ALTO DA GLÓRIA COLÉGIO CAIC",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4830661,
            "lng": -52.0093234,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4830709,
            "lng": -52.0088513,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4827519,
            "lng": -52.0085485,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4849482,
            "lng": -52.0076819,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4846313,
            "lng": -52.0067699,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4850923,
            "lng": -52.006094,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4853083,
            "lng": -52.0050426,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.4834663,
            "lng": -52.0027373,
            "tipo": "quadra"
          },
          {
            "nome": "9",
            "lat": -26.4828181,
            "lng": -52.0035688,
            "tipo": "quadra"
          },
          {
            "nome": "10",
            "lat": -26.482722,
            "lng": -52.0040623,
            "tipo": "quadra"
          },
          {
            "nome": "11",
            "lat": -26.4825685,
            "lng": -52.0055697,
            "tipo": "quadra"
          },
          {
            "nome": "12",
            "lat": -26.4825301,
            "lng": -52.0058647,
            "tipo": "quadra"
          },
          {
            "nome": "13",
            "lat": -26.4824869,
            "lng": -52.0062134,
            "tipo": "quadra"
          },
          {
            "nome": "CAIC Senhor Bom Jesus",
            "lat": -26.4822307,
            "lng": -52.0072274,
            "tipo": "referencia"
          },
          {
            "nome": "Mercado Nossa Senhora Aparecida",
            "lat": -26.4825656,
            "lng": -52.0026609,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -52.00244,
              -26.48254
            ],
            [
              -52.005676,
              -26.48204
            ],
            [
              -52.007884,
              -26.481636
            ],
            [
              -52.008698,
              -26.48129
            ],
            [
              -52.010576,
              -26.482827
            ],
            [
              -52.009771,
              -26.483874
            ],
            [
              -52.008047,
              -26.484997
            ],
            [
              -52.006149,
              -26.485581
            ],
            [
              -52.005506,
              -26.485781
            ],
            [
              -52.004948,
              -26.485738
            ],
            [
              -52.004698,
              -26.485425
            ],
            [
              -52.004163,
              -26.485412
            ],
            [
              -52.003853,
              -26.484926
            ],
            [
              -52.003328,
              -26.484112
            ],
            [
              -52.002738,
              -26.483975
            ],
            [
              -52.00256,
              -26.483836
            ],
            [
              -52.002479,
              -26.482969
            ],
            [
              -52.00244,
              -26.48254
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 66,
        "nome": "T67 - ALTO DA GLÓRIA",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4789749,
            "lng": -52.0053328,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4787733,
            "lng": -52.0048608,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4782931,
            "lng": -52.0049466,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4778705,
            "lng": -52.0049251,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4779186,
            "lng": -52.004099,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4774,
            "lng": -52.0043458,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4772271,
            "lng": -52.003863,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.4766893,
            "lng": -52.0034016,
            "tipo": "quadra"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -52.0053637,
              -26.478112
            ],
            [
              -52.0055287,
              -26.479116
            ],
            [
              -52.0049127,
              -26.479236
            ],
            [
              -52.0026117,
              -26.477128
            ],
            [
              -52.0034217,
              -26.476273
            ],
            [
              -52.0053637,
              -26.478112
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 67,
        "nome": "T68 - OCUPAÇÃO ATRÁS DOS BOMBEIROS",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4798104,
            "lng": -52.0104397,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4799689,
            "lng": -52.0098389,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4782643,
            "lng": -52.0091737,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.47873,
            "lng": -52.0083208,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4792246,
            "lng": -52.0079507,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4797768,
            "lng": -52.0075564,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4786292,
            "lng": -52.0069207,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.4792195,
            "lng": -52.0063702,
            "tipo": "quadra"
          },
          {
            "nome": "9",
            "lat": -26.4782163,
            "lng": -52.006792,
            "tipo": "quadra"
          },
          {
            "nome": "10",
            "lat": -26.478754,
            "lng": -52.0059229,
            "tipo": "quadra"
          },
          {
            "nome": "11",
            "lat": -26.4775632,
            "lng": -52.0063521,
            "tipo": "quadra"
          },
          {
            "nome": "12",
            "lat": -26.4779666,
            "lng": -52.0060731,
            "tipo": "quadra"
          },
          {
            "nome": "13",
            "lat": -26.4777265,
            "lng": -52.0087768,
            "tipo": "quadra"
          },
          {
            "nome": "14",
            "lat": -26.4779233,
            "lng": -52.0073391,
            "tipo": "quadra"
          },
          {
            "nome": "15",
            "lat": -26.477011,
            "lng": -52.0064218,
            "tipo": "quadra"
          },
          {
            "nome": "HLM chapeação e pintura em geral",
            "lat": -26.4793348,
            "lng": -52.0056815,
            "tipo": "referencia"
          },
          {
            "nome": "Mercearia Muniz",
            "lat": -26.478252,
            "lng": -52.006125,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -52.0107,
              -26.479127
            ],
            [
              -52.010705,
              -26.480054
            ],
            [
              -52.01019,
              -26.480145
            ],
            [
              -52.009756,
              -26.480443
            ],
            [
              -52.009042,
              -26.47955
            ],
            [
              -52.00842,
              -26.479895
            ],
            [
              -52.007099,
              -26.480062
            ],
            [
              -52.006993,
              -26.479492
            ],
            [
              -52.005628,
              -26.479674
            ],
            [
              -52.005368,
              -26.478061
            ],
            [
              -52.005191,
              -26.477821
            ],
            [
              -52.006199,
              -26.477144
            ],
            [
              -52.005282,
              -26.475968
            ],
            [
              -52.006296,
              -26.47567
            ],
            [
              -52.007969,
              -26.477034
            ],
            [
              -52.009708,
              -26.477096
            ],
            [
              -52.009992,
              -26.478061
            ],
            [
              -52.0107,
              -26.479127
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 68,
        "nome": "T69 - LAGOÃO ALCAST",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4751412,
            "lng": -52.0059994,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4733742,
            "lng": -52.0058063,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4743345,
            "lng": -52.0049695,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4723802,
            "lng": -52.0064989,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4718197,
            "lng": -52.0064596,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4733742,
            "lng": -52.004197,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4733742,
            "lng": -52.0033816,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4739792,
            "lng": -52.0037371,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.4749204,
            "lng": -52.0042146,
            "tipo": "quadra"
          },
          {
            "nome": "9",
            "lat": -26.4739504,
            "lng": -52.0028022,
            "tipo": "quadra"
          },
          {
            "nome": "10",
            "lat": -26.4744882,
            "lng": -52.0013002,
            "tipo": "quadra"
          },
          {
            "nome": "11",
            "lat": -26.475218,
            "lng": -52.003682,
            "tipo": "quadra"
          },
          {
            "nome": "12",
            "lat": -26.4751988,
            "lng": -52.0023726,
            "tipo": "quadra"
          },
          {
            "nome": "13",
            "lat": -26.4749107,
            "lng": -52.0003019,
            "tipo": "quadra"
          },
          {
            "nome": "14",
            "lat": -26.4765097,
            "lng": -52.0008062,
            "tipo": "quadra"
          },
          {
            "nome": "15",
            "lat": -26.4753861,
            "lng": -52.0031343,
            "tipo": "quadra"
          },
          {
            "nome": "Alcast do Brasil",
            "lat": -26.47287,
            "lng": -52.003852,
            "tipo": "referencia"
          },
          {
            "nome": "Posto Idaza Lagoão",
            "lat": -26.4750457,
            "lng": -51.9992901,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.999715,
              -26.476894
            ],
            [
              -51.998595,
              -26.475135
            ],
            [
              -51.999312,
              -26.474868
            ],
            [
              -52.002555,
              -26.473312
            ],
            [
              -52.006767,
              -26.47109
            ],
            [
              -52.0073,
              -26.471931
            ],
            [
              -52.007048,
              -26.474028
            ],
            [
              -52.00742,
              -26.474457
            ],
            [
              -52.00687,
              -26.47477
            ],
            [
              -52.006056,
              -26.475431
            ],
            [
              -52.005422,
              -26.475827
            ],
            [
              -52.004786,
              -26.476235
            ],
            [
              -52.0037,
              -26.476488
            ],
            [
              -52.003426,
              -26.476215
            ],
            [
              -52.003288,
              -26.476348
            ],
            [
              -52.003084,
              -26.476656
            ],
            [
              -52.002669,
              -26.47703
            ],
            [
              -52.002084,
              -26.47715
            ],
            [
              -52.001503,
              -26.477203
            ],
            [
              -51.999715,
              -26.476894
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 69,
        "nome": "T70 - VILA OPERARIA PROXIMO A PARQUE DE EXPOSIÇÃO",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4786774,
            "lng": -52.0127995,
            "tipo": "quadra"
          },
          {
            "nome": "1",
            "lat": -26.4757867,
            "lng": -52.0167585,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4765262,
            "lng": -52.0154281,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4772561,
            "lng": -52.0139475,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4760364,
            "lng": -52.015192,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4753114,
            "lng": -52.0157124,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4754074,
            "lng": -52.014956,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4755755,
            "lng": -52.0139797,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.4749416,
            "lng": -52.0135827,
            "tipo": "quadra"
          },
          {
            "nome": "9",
            "lat": -26.4750905,
            "lng": -52.0114047,
            "tipo": "quadra"
          },
          {
            "nome": "10",
            "lat": -26.4749752,
            "lng": -52.0109854,
            "tipo": "quadra"
          },
          {
            "nome": "11",
            "lat": -26.4745719,
            "lng": -52.0113931,
            "tipo": "quadra"
          },
          {
            "nome": "12",
            "lat": -26.4745286,
            "lng": -52.0118142,
            "tipo": "quadra"
          },
          {
            "nome": "13",
            "lat": -26.4749418,
            "lng": -52.0119876,
            "tipo": "quadra"
          },
          {
            "nome": "14",
            "lat": -26.4739354,
            "lng": -52.0141682,
            "tipo": "quadra"
          },
          {
            "nome": "15",
            "lat": -26.4751935,
            "lng": -52.0164964,
            "tipo": "quadra"
          },
          {
            "nome": "Escola Municipal Pequena Águia",
            "lat": -26.4746597,
            "lng": -52.0137577,
            "tipo": "referencia"
          },
          {
            "nome": "Metalmaq",
            "lat": -26.4775912,
            "lng": -52.0141371,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -52.010994,
              -26.475565
            ],
            [
              -52.010768,
              -26.474662
            ],
            [
              -52.011109,
              -26.473321
            ],
            [
              -52.011326,
              -26.47332
            ],
            [
              -52.011557,
              -26.474335
            ],
            [
              -52.01341,
              -26.474136
            ],
            [
              -52.014518,
              -26.47324
            ],
            [
              -52.015371,
              -26.473692
            ],
            [
              -52.017356,
              -26.473721
            ],
            [
              -52.017393,
              -26.474777
            ],
            [
              -52.017839,
              -26.476352
            ],
            [
              -52.015924,
              -26.476659
            ],
            [
              -52.015387,
              -26.476828
            ],
            [
              -52.0125063,
              -26.4796081
            ],
            [
              -52.010994,
              -26.475565
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 70,
        "nome": "T71 - LAGOÃO MERCADO MARTINELLI",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4737892,
            "lng": -52.0125206,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4728881,
            "lng": -52.0122156,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4722927,
            "lng": -52.0121942,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4716012,
            "lng": -52.0124517,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4709481,
            "lng": -52.012516,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4703335,
            "lng": -52.0127092,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4700838,
            "lng": -52.0115934,
            "tipo": "quadra"
          },
          {
            "nome": "Mercado MARTINELLI",
            "lat": -26.4702656,
            "lng": -52.0129727,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -52.013062,
              -26.470175
            ],
            [
              -52.013137,
              -26.47201
            ],
            [
              -52.012979,
              -26.472459
            ],
            [
              -52.012864,
              -26.472978
            ],
            [
              -52.012958,
              -26.473542
            ],
            [
              -52.013376,
              -26.474041
            ],
            [
              -52.011576,
              -26.474291
            ],
            [
              -52.01141,
              -26.473395
            ],
            [
              -52.011917,
              -26.470584
            ],
            [
              -52.01075,
              -26.47036
            ],
            [
              -52.010772,
              -26.469712
            ],
            [
              -52.013062,
              -26.470175
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 71,
        "nome": "T72 - LAGOÃO ESCOLA NERASI",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4727729,
            "lng": -52.0109282,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4721006,
            "lng": -52.01125,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4719277,
            "lng": -52.0100269,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4718413,
            "lng": -52.0091472,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4716108,
            "lng": -52.0086215,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4713515,
            "lng": -52.0109067,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4713515,
            "lng": -52.0103274,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.4714763,
            "lng": -52.0092437,
            "tipo": "quadra"
          },
          {
            "nome": "9",
            "lat": -26.4709145,
            "lng": -52.0112124,
            "tipo": "quadra"
          },
          {
            "nome": "10",
            "lat": -26.4718077,
            "lng": -52.0079127,
            "tipo": "quadra"
          },
          {
            "nome": "11",
            "lat": -26.4700213,
            "lng": -52.010399,
            "tipo": "quadra"
          },
          {
            "nome": "Escola Municipal Nerasi Menin Calza",
            "lat": -26.4706895,
            "lng": -52.0082638,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -52.010722,
              -26.469729
            ],
            [
              -52.010695,
              -26.470361
            ],
            [
              -52.011846,
              -26.470615
            ],
            [
              -52.011399,
              -26.473333
            ],
            [
              -52.007526,
              -26.472157
            ],
            [
              -52.007493,
              -26.47075
            ],
            [
              -52.009489,
              -26.469808
            ],
            [
              -52.010722,
              -26.469729
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 72,
        "nome": "T73 - PALMAS 1 - LADO A",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4701306,
            "lng": -52.0169411,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4700249,
            "lng": -52.0164368,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4698232,
            "lng": -52.0159219,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4702746,
            "lng": -52.015836,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4700921,
            "lng": -52.0148168,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4701402,
            "lng": -52.0140658,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4703707,
            "lng": -52.0134435,
            "tipo": "quadra"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -52.017373,
              -26.470487
            ],
            [
              -52.01313,
              -26.470487
            ],
            [
              -52.013108,
              -26.470098
            ],
            [
              -52.014771,
              -26.469344
            ],
            [
              -52.017191,
              -26.469719
            ],
            [
              -52.017373,
              -26.470487
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 73,
        "nome": "T74 - PALMAS 1 - LADO B",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4714847,
            "lng": -52.016984,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4706108,
            "lng": -52.0162652,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4710525,
            "lng": -52.0161686,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4713983,
            "lng": -52.0162652,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4707309,
            "lng": -52.0149108,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4711198,
            "lng": -52.0149108,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.471672,
            "lng": -52.015423,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.4709661,
            "lng": -52.0135428,
            "tipo": "quadra"
          },
          {
            "nome": "9",
            "lat": -26.4717825,
            "lng": -52.0142696,
            "tipo": "quadra"
          },
          {
            "nome": "10",
            "lat": -26.4716384,
            "lng": -52.0137332,
            "tipo": "quadra"
          },
          {
            "nome": "11",
            "lat": -26.4716384,
            "lng": -52.0133791,
            "tipo": "quadra"
          },
          {
            "nome": "12",
            "lat": -26.4723443,
            "lng": -52.0139638,
            "tipo": "quadra"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -52.017378,
              -26.47052
            ],
            [
              -52.017507,
              -26.4709
            ],
            [
              -52.017523,
              -26.47198
            ],
            [
              -52.014836,
              -26.472557
            ],
            [
              -52.013049,
              -26.472552
            ],
            [
              -52.013194,
              -26.471889
            ],
            [
              -52.013173,
              -26.470535
            ],
            [
              -52.017378,
              -26.47052
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 74,
        "nome": "T76 - ELDORADO - DIVISÃO A",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4691254,
            "lng": -52.0198355,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4689524,
            "lng": -52.0192453,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4687652,
            "lng": -52.0188537,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4685251,
            "lng": -52.0182636,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4680256,
            "lng": -52.0191219,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4676127,
            "lng": -52.0196584,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4677567,
            "lng": -52.0202485,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.467824,
            "lng": -52.0208815,
            "tipo": "quadra"
          },
          {
            "nome": "9",
            "lat": -26.4677951,
            "lng": -52.0217612,
            "tipo": "quadra"
          },
          {
            "nome": "CMEI Vovó Maria do Eldorado",
            "lat": -26.46861,
            "lng": -52.0204459,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -52.022167,
              -26.467655
            ],
            [
              -52.02156,
              -26.468605
            ],
            [
              -52.020724,
              -26.46848
            ],
            [
              -52.019275,
              -26.469964
            ],
            [
              -52.01758,
              -26.468874
            ],
            [
              -52.019104,
              -26.467376
            ],
            [
              -52.021453,
              -26.467482
            ],
            [
              -52.022167,
              -26.467655
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 75,
        "nome": "T77 - ELDORADO - DIVISÃO C",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4694567,
            "lng": -52.0269004,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.469764,
            "lng": -52.026439,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4696007,
            "lng": -52.0260313,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4695239,
            "lng": -52.0253339,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4693798,
            "lng": -52.0250443,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4696968,
            "lng": -52.0244756,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4695431,
            "lng": -52.0238855,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.4694471,
            "lng": -52.0235315,
            "tipo": "quadra"
          },
          {
            "nome": "9",
            "lat": -26.4690053,
            "lng": -52.0231882,
            "tipo": "quadra"
          },
          {
            "nome": "10",
            "lat": -26.4691486,
            "lng": -52.0227067,
            "tipo": "quadra"
          },
          {
            "nome": "11",
            "lat": -26.4691054,
            "lng": -52.02224,
            "tipo": "quadra"
          },
          {
            "nome": "12",
            "lat": -26.4690478,
            "lng": -52.0254479,
            "tipo": "quadra"
          },
          {
            "nome": "13",
            "lat": -26.4689806,
            "lng": -52.024949,
            "tipo": "quadra"
          },
          {
            "nome": "14",
            "lat": -26.468971,
            "lng": -52.0244716,
            "tipo": "quadra"
          },
          {
            "nome": "15",
            "lat": -26.4689902,
            "lng": -52.0239405,
            "tipo": "quadra"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -52.021968,
              -26.468586
            ],
            [
              -52.024661,
              -26.468858
            ],
            [
              -52.02715,
              -26.469057
            ],
            [
              -52.027182,
              -26.470219
            ],
            [
              -52.024538,
              -26.470046
            ],
            [
              -52.02243,
              -26.469724
            ],
            [
              -52.022011,
              -26.469744
            ],
            [
              -52.021968,
              -26.468586
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 76,
        "nome": "T78 - ELDORADO - DIVISÃO B",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.46804,
            "lng": -52.0258865,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.467968,
            "lng": -52.0255163,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4681889,
            "lng": -52.0249155,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4684963,
            "lng": -52.0244113,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.468405,
            "lng": -52.0239821,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4680345,
            "lng": -52.023624,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4682177,
            "lng": -52.0228556,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.468016,
            "lng": -52.0224372,
            "tipo": "quadra"
          },
          {
            "nome": "Supermercado supereconômico",
            "lat": -26.4686659,
            "lng": -52.023618,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -52.026136,
              -26.467065
            ],
            [
              -52.026001,
              -26.468919
            ],
            [
              -52.02157,
              -26.468535
            ],
            [
              -52.022278,
              -26.467613
            ],
            [
              -52.024708,
              -26.467176
            ],
            [
              -52.026136,
              -26.467065
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 77,
        "nome": "T79 - EM FRENTE AO PALMAS 1",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4685295,
            "lng": -52.0167614,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4687776,
            "lng": -52.016297,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4686239,
            "lng": -52.015546,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4686239,
            "lng": -52.0147306,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4690081,
            "lng": -52.013765,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4692962,
            "lng": -52.0125419,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4692386,
            "lng": -52.0110614,
            "tipo": "quadra"
          },
          {
            "nome": "CRISTO REI AGROPECUARIA",
            "lat": -26.4695798,
            "lng": -52.0101943,
            "tipo": "referencia"
          },
          {
            "nome": "Mercado Melpan",
            "lat": -26.4690798,
            "lng": -52.0162662,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -52.016935,
              -26.46796
            ],
            [
              -52.017342,
              -26.469413
            ],
            [
              -52.014773,
              -26.46928
            ],
            [
              -52.013169,
              -26.470015
            ],
            [
              -52.01289,
              -26.470049
            ],
            [
              -52.011876,
              -26.469765
            ],
            [
              -52.01054,
              -26.469583
            ],
            [
              -52.009548,
              -26.469756
            ],
            [
              -52.00936,
              -26.469448
            ],
            [
              -52.014596,
              -26.46819
            ],
            [
              -52.016935,
              -26.46796
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 78,
        "nome": "T80 - LAGOÃO - UPA DIVISÃO A",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4642923,
            "lng": -52.0131588,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4642358,
            "lng": -52.0120044,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4650426,
            "lng": -52.0122941,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4650042,
            "lng": -52.0115646,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4650282,
            "lng": -52.0106955,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4644279,
            "lng": -52.0094081,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4654881,
            "lng": -52.0099617,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.4639715,
            "lng": -52.0085398,
            "tipo": "quadra"
          },
          {
            "nome": "9",
            "lat": -26.4643173,
            "lng": -52.0080409,
            "tipo": "quadra"
          },
          {
            "nome": "10",
            "lat": -26.4668477,
            "lng": -52.0065604,
            "tipo": "quadra"
          },
          {
            "nome": "11",
            "lat": -26.4675638,
            "lng": -52.0076815,
            "tipo": "quadra"
          },
          {
            "nome": "12",
            "lat": -26.4652155,
            "lng": -52.0072041,
            "tipo": "quadra"
          },
          {
            "nome": "UPA - Unidade de Pronto Atendimento - Palmas, PR",
            "lat": -26.4663713,
            "lng": -52.0073017,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -52.013969,
              -26.463924
            ],
            [
              -52.01381,
              -26.46437
            ],
            [
              -52.011419,
              -26.466098
            ],
            [
              -52.010525,
              -26.466973
            ],
            [
              -52.009597,
              -26.466331
            ],
            [
              -52.007805,
              -26.468214
            ],
            [
              -52.006855,
              -26.467475
            ],
            [
              -52.005829,
              -26.466598
            ],
            [
              -52.005755,
              -26.464736
            ],
            [
              -52.008014,
              -26.463544
            ],
            [
              -52.0093,
              -26.462924
            ],
            [
              -52.01005,
              -26.46335
            ],
            [
              -52.009372,
              -26.463952
            ],
            [
              -52.013969,
              -26.463924
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 79,
        "nome": "T81 - LAGOÃO - UPA DIVISÃO B",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4680093,
            "lng": -52.0133359,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4676924,
            "lng": -52.0124937,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4682398,
            "lng": -52.0116407,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.468919,
            "lng": -52.010523,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4687269,
            "lng": -52.0095144,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4678337,
            "lng": -52.0105789,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4668711,
            "lng": -52.011453,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.4671881,
            "lng": -52.0096827,
            "tipo": "quadra"
          },
          {
            "nome": "9",
            "lat": -26.4680957,
            "lng": -52.008755,
            "tipo": "quadra"
          },
          {
            "nome": "Mecânica Car Racing",
            "lat": -26.4686866,
            "lng": -52.0111437,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -52.01448,
              -26.468139
            ],
            [
              -52.00931,
              -26.46938
            ],
            [
              -52.007857,
              -26.468202
            ],
            [
              -52.009619,
              -26.466413
            ],
            [
              -52.010546,
              -26.467082
            ],
            [
              -52.011501,
              -26.46614
            ],
            [
              -52.01448,
              -26.468139
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 80,
        "nome": "T82- AEROPORTO LADO ESQUERDO",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4773037,
            "lng": -51.9831313,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4773902,
            "lng": -51.9811381,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4775006,
            "lng": -51.9804974,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4772797,
            "lng": -51.9791747,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4769724,
            "lng": -51.9776942,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.476569,
            "lng": -51.9785954,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4758344,
            "lng": -51.9791962,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.4758007,
            "lng": -51.9786598,
            "tipo": "quadra"
          },
          {
            "nome": "9",
            "lat": -26.4748596,
            "lng": -51.9783164,
            "tipo": "quadra"
          },
          {
            "nome": "10",
            "lat": -26.4738512,
            "lng": -51.980548,
            "tipo": "quadra"
          },
          {
            "nome": "11",
            "lat": -26.4737792,
            "lng": -51.980017,
            "tipo": "quadra"
          },
          {
            "nome": "12",
            "lat": -26.4737312,
            "lng": -51.9793893,
            "tipo": "quadra"
          },
          {
            "nome": "13",
            "lat": -26.4737647,
            "lng": -51.9789172,
            "tipo": "quadra"
          },
          {
            "nome": "14",
            "lat": -26.4739088,
            "lng": -51.9781716,
            "tipo": "quadra"
          },
          {
            "nome": "15",
            "lat": -26.4721705,
            "lng": -51.9797541,
            "tipo": "quadra"
          },
          {
            "nome": "16",
            "lat": -26.4724202,
            "lng": -51.9790245,
            "tipo": "quadra"
          },
          {
            "nome": "17",
            "lat": -26.4722473,
            "lng": -51.9784881,
            "tipo": "quadra"
          },
          {
            "nome": "18",
            "lat": -26.4726507,
            "lng": -51.9778658,
            "tipo": "quadra"
          },
          {
            "nome": "19",
            "lat": -26.4716423,
            "lng": -51.977029,
            "tipo": "quadra"
          },
          {
            "nome": "20",
            "lat": -26.4697167,
            "lng": -51.9763959,
            "tipo": "quadra"
          },
          {
            "nome": "21",
            "lat": -26.4699856,
            "lng": -51.975484,
            "tipo": "quadra"
          },
          {
            "nome": "22",
            "lat": -26.4686218,
            "lng": -51.9761562,
            "tipo": "quadra"
          },
          {
            "nome": "23",
            "lat": -26.4678089,
            "lng": -51.9769555,
            "tipo": "quadra"
          },
          {
            "nome": "Aeroporto de Palmas paraná (SSPS)",
            "lat": -26.4735478,
            "lng": -51.9756746,
            "tipo": "referencia"
          },
          {
            "nome": "Cemitério Jardim da Paz",
            "lat": -26.4709909,
            "lng": -51.9774527,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.977036,
              -26.46758
            ],
            [
              -51.978109,
              -26.467462
            ],
            [
              -51.97959,
              -26.471294
            ],
            [
              -51.980266,
              -26.472609
            ],
            [
              -51.984182,
              -26.476777
            ],
            [
              -51.982755,
              -26.478179
            ],
            [
              -51.981166,
              -26.477616
            ],
            [
              -51.9768,
              -26.478289
            ],
            [
              -51.974096,
              -26.468041
            ],
            [
              -51.977036,
              -26.46758
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 81,
        "nome": "T83- AEROPORTO LADO DIREITO ",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4745592,
            "lng": -51.9750331,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4759518,
            "lng": -51.9746039,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4747609,
            "lng": -51.9728659,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.474396,
            "lng": -51.9734881,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4742711,
            "lng": -51.9742177,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4709131,
            "lng": -51.9743732,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.470817,
            "lng": -51.9735299,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.4709371,
            "lng": -51.9718359,
            "tipo": "quadra"
          },
          {
            "nome": "9",
            "lat": -26.4698518,
            "lng": -51.9711438,
            "tipo": "quadra"
          },
          {
            "nome": "10",
            "lat": -26.4692179,
            "lng": -51.9716696,
            "tipo": "quadra"
          },
          {
            "nome": "Escola Municipal Tia Dalva",
            "lat": -26.4751795,
            "lng": -51.9745242,
            "tipo": "referencia"
          },
          {
            "nome": "Mercearia Dois Irmãos",
            "lat": -26.4727037,
            "lng": -51.9745621,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.97043,
              -26.468748
            ],
            [
              -51.97403,
              -26.468124
            ],
            [
              -51.976595,
              -26.47829
            ],
            [
              -51.975672,
              -26.478367
            ],
            [
              -51.975822,
              -26.477579
            ],
            [
              -51.971724,
              -26.475178
            ],
            [
              -51.969342,
              -26.470357
            ],
            [
              -51.97043,
              -26.468748
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 82,
        "nome": "T84 - ROCIO LADO ESQUERDO",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4661827,
            "lng": -51.9730371,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4661987,
            "lng": -51.9724185,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4647324,
            "lng": -51.9737345,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4651326,
            "lng": -51.9727726,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.465276,
            "lng": -51.9718645,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4640025,
            "lng": -51.9739813,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4640072,
            "lng": -51.9733751,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.4640265,
            "lng": -51.9729084,
            "tipo": "quadra"
          },
          {
            "nome": "9",
            "lat": -26.46309,
            "lng": -51.9732195,
            "tipo": "quadra"
          },
          {
            "nome": "10",
            "lat": -26.4631188,
            "lng": -51.9725865,
            "tipo": "quadra"
          },
          {
            "nome": "11",
            "lat": -26.4622256,
            "lng": -51.9725972,
            "tipo": "quadra"
          },
          {
            "nome": "12",
            "lat": -26.4628211,
            "lng": -51.9712132,
            "tipo": "quadra"
          },
          {
            "nome": "13",
            "lat": -26.461851,
            "lng": -51.9720286,
            "tipo": "quadra"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.972907,
              -26.467004
            ],
            [
              -51.971106,
              -26.464593
            ],
            [
              -51.969777,
              -26.46174
            ],
            [
              -51.971206,
              -26.461264
            ],
            [
              -51.973755,
              -26.461177
            ],
            [
              -51.974086,
              -26.463516
            ],
            [
              -51.974174,
              -26.464149
            ],
            [
              -51.973946,
              -26.464842
            ],
            [
              -51.973525,
              -26.465401
            ],
            [
              -51.973489,
              -26.465697
            ],
            [
              -51.973475,
              -26.465838
            ],
            [
              -51.9735,
              -26.465995
            ],
            [
              -51.973043,
              -26.466555
            ],
            [
              -51.972907,
              -26.467004
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 83,
        "nome": "T85 - ROCIO LADO DIREITO ",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4672281,
            "lng": -51.9710995,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4637341,
            "lng": -51.9679023,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4642295,
            "lng": -51.9674433,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4641719,
            "lng": -51.966703,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4642391,
            "lng": -51.9660378,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4649787,
            "lng": -51.9658018,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4643056,
            "lng": -51.9653926,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.4626488,
            "lng": -51.9678165,
            "tipo": "quadra"
          },
          {
            "nome": "9",
            "lat": -26.4627083,
            "lng": -51.9670437,
            "tipo": "quadra"
          },
          {
            "nome": "10",
            "lat": -26.4627947,
            "lng": -51.9663893,
            "tipo": "quadra"
          },
          {
            "nome": "11",
            "lat": -26.463102,
            "lng": -51.9657133,
            "tipo": "quadra"
          },
          {
            "nome": "12",
            "lat": -26.4631098,
            "lng": -51.9649849,
            "tipo": "quadra"
          },
          {
            "nome": "13",
            "lat": -26.4611985,
            "lng": -51.9689859,
            "tipo": "quadra"
          },
          {
            "nome": "14",
            "lat": -26.4614002,
            "lng": -51.968074,
            "tipo": "quadra"
          },
          {
            "nome": "15",
            "lat": -26.4616709,
            "lng": -51.9667862,
            "tipo": "quadra"
          },
          {
            "nome": "16",
            "lat": -26.4618246,
            "lng": -51.9653378,
            "tipo": "quadra"
          },
          {
            "nome": "17",
            "lat": -26.4601516,
            "lng": -51.968074,
            "tipo": "quadra"
          },
          {
            "nome": "18",
            "lat": -26.4603647,
            "lng": -51.9668613,
            "tipo": "quadra"
          },
          {
            "nome": "19",
            "lat": -26.4592871,
            "lng": -51.9679881,
            "tipo": "quadra"
          },
          {
            "nome": "Colégio Estadual Quilombola Maria Joana Ferreira",
            "lat": -26.4681296,
            "lng": -51.9703758,
            "tipo": "referencia"
          },
          {
            "nome": "📍",
            "lat": -26.464047,
            "lng": -51.9653511,
            "tipo": "quadra"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.970468,
              -26.468671
            ],
            [
              -51.968819,
              -26.465315
            ],
            [
              -51.964966,
              -26.466132
            ],
            [
              -51.963872,
              -26.462636
            ],
            [
              -51.964585,
              -26.461718
            ],
            [
              -51.965886,
              -26.458974
            ],
            [
              -51.96709,
              -26.457055
            ],
            [
              -51.968907,
              -26.459172
            ],
            [
              -51.969572,
              -26.461381
            ],
            [
              -51.970318,
              -26.463604
            ],
            [
              -51.972957,
              -26.467878
            ],
            [
              -51.970468,
              -26.468671
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 84,
        "nome": "T86- FORTUNATO",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4806406,
            "lng": -51.9764889,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4799107,
            "lng": -51.9750083,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4807558,
            "lng": -51.9740427,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4814088,
            "lng": -51.9732059,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.481889,
            "lng": -51.9726265,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4823307,
            "lng": -51.9719399,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4822347,
            "lng": -51.9712532,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.4822923,
            "lng": -51.9704808,
            "tipo": "quadra"
          },
          {
            "nome": "9",
            "lat": -26.4793057,
            "lng": -51.9742251,
            "tipo": "quadra"
          },
          {
            "nome": "10",
            "lat": -26.4797666,
            "lng": -51.9737128,
            "tipo": "quadra"
          },
          {
            "nome": "11",
            "lat": -26.4805877,
            "lng": -51.9728379,
            "tipo": "quadra"
          },
          {
            "nome": "12",
            "lat": -26.478355,
            "lng": -51.972884,
            "tipo": "quadra"
          },
          {
            "nome": "13",
            "lat": -26.4779324,
            "lng": -51.9723261,
            "tipo": "quadra"
          },
          {
            "nome": "14",
            "lat": -26.4777212,
            "lng": -51.9719613,
            "tipo": "quadra"
          },
          {
            "nome": "15",
            "lat": -26.4773946,
            "lng": -51.9715107,
            "tipo": "quadra"
          },
          {
            "nome": "16",
            "lat": -26.4770873,
            "lng": -51.9706953,
            "tipo": "quadra"
          },
          {
            "nome": "17",
            "lat": -26.4775579,
            "lng": -51.9695795,
            "tipo": "quadra"
          },
          {
            "nome": "18",
            "lat": -26.4787439,
            "lng": -51.9682277,
            "tipo": "quadra"
          },
          {
            "nome": "19",
            "lat": -26.4783214,
            "lng": -51.9675303,
            "tipo": "quadra"
          },
          {
            "nome": "20",
            "lat": -26.4767368,
            "lng": -51.9671173,
            "tipo": "quadra"
          },
          {
            "nome": "21",
            "lat": -26.4793297,
            "lng": -51.9661946,
            "tipo": "quadra"
          },
          {
            "nome": "22",
            "lat": -26.4794066,
            "lng": -51.9642527,
            "tipo": "quadra"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.9774768,
              -26.4810854
            ],
            [
              -51.972574,
              -26.482531
            ],
            [
              -51.97178,
              -26.4828
            ],
            [
              -51.970235,
              -26.482886
            ],
            [
              -51.969913,
              -26.483212
            ],
            [
              -51.967993,
              -26.483827
            ],
            [
              -51.96251,
              -26.479026
            ],
            [
              -51.968755,
              -26.475405
            ],
            [
              -51.971533,
              -26.475568
            ],
            [
              -51.974456,
              -26.478419
            ],
            [
              -51.975212,
              -26.479389
            ],
            [
              -51.975658,
              -26.479763
            ],
            [
              -51.9774768,
              -26.4810854
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 85,
        "nome": "T38 - AO LADO DO MERCADO LIESCH",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4820141,
            "lng": -52.0034734,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4816711,
            "lng": -52.0004889,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4813158,
            "lng": -52.0026185,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4805352,
            "lng": -52.0033661,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4801154,
            "lng": -52.0031925,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.48073,
            "lng": -52.0009609,
            "tipo": "quadra"
          },
          {
            "nome": "MERCADÃO DOS MÓVEIS",
            "lat": -26.4814321,
            "lng": -51.9998016,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -52.0035967,
              -26.4797358
            ],
            [
              -52.0042607,
              -26.4821898
            ],
            [
              -52.0025337,
              -26.4824688
            ],
            [
              -52.0023057,
              -26.4823068
            ],
            [
              -51.9998477,
              -26.4816858
            ],
            [
              -51.9996547,
              -26.4816688
            ],
            [
              -51.9994667,
              -26.4805958
            ],
            [
              -51.9996417,
              -26.4803108
            ],
            [
              -52.0011837,
              -26.4801878
            ],
            [
              -52.0018387,
              -26.4803748
            ],
            [
              -52.0035967,
              -26.4797358
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 86,
        "nome": "T75 - PITANGA",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4617376,
            "lng": -52.0030977,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4562819,
            "lng": -51.9990208,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4558209,
            "lng": -51.9964029,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4547451,
            "lng": -51.9949438,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4548603,
            "lng": -51.9920685,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4614879,
            "lng": -51.9924976,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4571656,
            "lng": -51.9936993,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4624676,
            "lng": -51.9886567,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.463428,
            "lng": -51.9832923,
            "tipo": "quadra"
          },
          {
            "nome": "9",
            "lat": -26.4594324,
            "lng": -51.9896009,
            "tipo": "quadra"
          },
          {
            "nome": "10",
            "lat": -26.4493659,
            "lng": -52.0073034,
            "tipo": "quadra"
          },
          {
            "nome": "11",
            "lat": -26.4576651,
            "lng": -52.0140411,
            "tipo": "quadra"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -52.013969,
              -26.463924
            ],
            [
              -52.0097239,
              -26.4638499
            ],
            [
              -52.0103033,
              -26.463312
            ],
            [
              -52.009402,
              -26.462755
            ],
            [
              -52.0056469,
              -26.4646183
            ],
            [
              -52.005707,
              -26.466622
            ],
            [
              -52.0049174,
              -26.4674804
            ],
            [
              -52.0042951,
              -26.4669233
            ],
            [
              -52.0042093,
              -26.4660974
            ],
            [
              -52.0030935,
              -26.46652
            ],
            [
              -51.9977291,
              -26.4631007
            ],
            [
              -51.9945104,
              -26.4655595
            ],
            [
              -51.9810349,
              -26.4652138
            ],
            [
              -51.9804771,
              -26.462851
            ],
            [
              -51.9879658,
              -26.4569344
            ],
            [
              -51.9906266,
              -26.4536878
            ],
            [
              -51.9949181,
              -26.4527848
            ],
            [
              -52.0089943,
              -26.4476169
            ],
            [
              -52.0153243,
              -26.4567615
            ],
            [
              -52.013969,
              -26.463924
            ]
          ]
        ]
      }
    }
  ]
}
```

---
## FILE: package.json

```json
{
  "name": "territorios-palmas",
  "private": true,
  "version": "1.8.125",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "update-version": "node gerar-versao.js",
    "build": "npm run update-version && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext js,jsx",
    "git-push": "git add . && git commit -m \"Update\" && git push",
    "deploy": "npm run build && firebase deploy"
  },
  "dependencies": {
    "firebase": "^12.8.0",
    "jspdf": "^4.0.0",
    "jspdf-autotable": "^5.0.7",
    "leaflet": "^1.9.4",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-leaflet": "^5.0.0",
    "react-router-dom": "^7.13.0"
  },
  "devDependencies": {
    "@eslint/js": "^9.39.1",
    "@types/react": "^19.2.5",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^5.1.1",
    "autoprefixer": "^10.4.23",
    "eslint": "^9.39.1",
    "eslint-plugin-react-hooks": "^7.0.1",
    "eslint-plugin-react-refresh": "^0.4.24",
    "globals": "^16.5.0",
    "postcss": "^8.5.6",
    "tailwindcss": "^3.4.17",
    "vite": "^7.2.4",
    "vite-plugin-pwa": "^1.2.0"
  }
}
```

---
## FILE: postcss.config.js

```js
export default {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
    },
}
```

---
## FILE: public\mapa.json

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "id": 1,
        "nome": "T01- SALÃO DO REINO",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4869661,
            "lng": -51.9957653,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4866876,
            "lng": -51.9969562,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4859674,
            "lng": -51.99554,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4857081,
            "lng": -51.9967738,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4848919,
            "lng": -51.9953576,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4846998,
            "lng": -51.9965593,
            "tipo": "quadra"
          },
          {
            "nome": "Auto Elétrica Zoinho",
            "lat": -26.4862946,
            "lng": -51.9973404,
            "tipo": "referencia"
          },
          {
            "nome": "Chico Eletro Materiais de construções e acabamentos",
            "lat": -26.4843918,
            "lng": -51.9967613,
            "tipo": "referencia"
          },
          {
            "nome": "Colégio HBC",
            "lat": -26.4847104,
            "lng": -51.9952103,
            "tipo": "referencia"
          },
          {
            "nome": "Cris Confecções",
            "lat": -26.4856842,
            "lng": -51.9972473,
            "tipo": "referencia"
          },
          {
            "nome": "Guincho Os Piá Chapeação Pintura E Serviço De Guincho",
            "lat": -26.4867019,
            "lng": -51.9956226,
            "tipo": "referencia"
          },
          {
            "nome": "PRÉDIO DE APARTAMENTOS",
            "lat": -26.4856601,
            "lng": -51.9957729,
            "tipo": "condominio"
          },
          {
            "nome": "Salão Do Reino Das Testemunhas De Jeová",
            "lat": -26.4863643,
            "lng": -51.995359,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.996999,
              -26.484229
            ],
            [
              -51.997701,
              -26.48715
            ],
            [
              -51.995086,
              -26.487593
            ],
            [
              -51.99456,
              -26.484607
            ],
            [
              -51.996999,
              -26.484229
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 2,
        "nome": "T02 - SUPERMERCADO UNIÃO",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4871773,
            "lng": -51.9940809,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4870813,
            "lng": -51.9947568,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.486169,
            "lng": -51.99392,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4851799,
            "lng": -51.9937698,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4851127,
            "lng": -51.9943384,
            "tipo": "quadra"
          },
          {
            "nome": "Farmácia São João",
            "lat": -26.4866495,
            "lng": -51.9943478,
            "tipo": "referencia"
          },
          {
            "nome": "Supermercado União",
            "lat": -26.4863547,
            "lng": -51.9945929,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.99456,
              -26.484607
            ],
            [
              -51.995086,
              -26.487593
            ],
            [
              -51.993922,
              -26.48778
            ],
            [
              -51.993332,
              -26.484794
            ],
            [
              -51.99456,
              -26.484607
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 3,
        "nome": "T03 - MARECHAL SANDUICHERIA",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4875625,
            "lng": -51.9917592,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4874185,
            "lng": -51.9930037,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4864294,
            "lng": -51.9915124,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4863717,
            "lng": -51.9928643,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4854979,
            "lng": -51.9913193,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4855843,
            "lng": -51.9926711,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4852098,
            "lng": -51.9926067,
            "tipo": "quadra"
          },
          {
            "nome": "Lobas Advocacia",
            "lat": -26.4867586,
            "lng": -51.9934614,
            "tipo": "referencia"
          },
          {
            "nome": "Marechal Sanduicheria Palmas",
            "lat": -26.4871073,
            "lng": -51.9915716,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.993342,
              -26.484852
            ],
            [
              -51.993922,
              -26.48778
            ],
            [
              -51.9912337,
              -26.488308
            ],
            [
              -51.990632,
              -26.485195
            ],
            [
              -51.993342,
              -26.484852
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 4,
        "nome": "T04 - MARTIKAIAS",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4845232,
            "lng": -51.9912295,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4843696,
            "lng": -51.9924097,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4839086,
            "lng": -51.9907489,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4830395,
            "lng": -51.9909666,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4827899,
            "lng": -51.9923721,
            "tipo": "quadra"
          },
          {
            "nome": "Lojas Benoit",
            "lat": -26.4834215,
            "lng": -51.9905203,
            "tipo": "referencia"
          },
          {
            "nome": "Martikaias",
            "lat": -26.4843849,
            "lng": -51.9911246,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.993012,
              -26.482345
            ],
            [
              -51.993323,
              -26.484669
            ],
            [
              -51.990656,
              -26.485064
            ],
            [
              -51.990201,
              -26.482816
            ],
            [
              -51.993012,
              -26.482345
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 5,
        "nome": "T05 - AGROBOI",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4842735,
            "lng": -51.9936971,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4841103,
            "lng": -51.9942443,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4834285,
            "lng": -51.9934611,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4833084,
            "lng": -51.9940941,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4825978,
            "lng": -51.9932948,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4825162,
            "lng": -51.9940244,
            "tipo": "quadra"
          },
          {
            "nome": "Agroboi",
            "lat": -26.4844837,
            "lng": -51.994315,
            "tipo": "referencia"
          },
          {
            "nome": "Relojoaria Orient",
            "lat": -26.4828721,
            "lng": -51.9941822,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.994175,
              -26.482141
            ],
            [
              -51.994583,
              -26.484455
            ],
            [
              -51.993342,
              -26.484654
            ],
            [
              -51.993027,
              -26.482319
            ],
            [
              -51.994175,
              -26.482141
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 6,
        "nome": "T06 - MERCADO NO PONTO",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4840623,
            "lng": -51.9949631,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4838126,
            "lng": -51.9962932,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4831788,
            "lng": -51.9950111,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4829339,
            "lng": -51.9961484,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4823529,
            "lng": -51.9949253,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4822185,
            "lng": -51.9959499,
            "tipo": "quadra"
          },
          {
            "nome": "No Ponto Mix Atacadista - Palmas",
            "lat": -26.4832641,
            "lng": -51.9961585,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.996418,
              -26.481776
            ],
            [
              -51.996982,
              -26.4841
            ],
            [
              -51.994604,
              -26.484456
            ],
            [
              -51.99424,
              -26.48214
            ],
            [
              -51.996418,
              -26.481776
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 7,
        "nome": "T07 - CODIPA",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4877349,
            "lng": -51.9969569,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4880059,
            "lng": -51.9957403,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4882748,
            "lng": -51.9946245,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.488438,
            "lng": -51.9931225,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4887741,
            "lng": -51.9920281,
            "tipo": "quadra"
          },
          {
            "nome": "Codipa",
            "lat": -26.4879864,
            "lng": -51.9978548,
            "tipo": "referencia"
          },
          {
            "nome": "Da Colônɑ",
            "lat": -26.4878111,
            "lng": -51.9978442,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.997747,
              -26.487252
            ],
            [
              -51.997974,
              -26.488218
            ],
            [
              -51.991472,
              -26.489413
            ],
            [
              -51.991263,
              -26.488405
            ],
            [
              -51.997747,
              -26.487252
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 8,
        "nome": "T08 - POSTO PANDA",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4888008,
            "lng": -51.9972036,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4890142,
            "lng": -51.9960407,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4893022,
            "lng": -51.9947103,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4895423,
            "lng": -51.9934658,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4896671,
            "lng": -51.9921247,
            "tipo": "quadra"
          },
          {
            "nome": "Condomínio Turatto I",
            "lat": -26.488767,
            "lng": -51.9959085,
            "tipo": "condominio"
          },
          {
            "nome": "Shell Select",
            "lat": -26.4887453,
            "lng": -51.9979195,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.997985,
              -26.488275
            ],
            [
              -51.998253,
              -26.489293
            ],
            [
              -51.9917034,
              -26.4904166
            ],
            [
              -51.9915045,
              -26.4894828
            ],
            [
              -51.997985,
              -26.488275
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 9,
        "nome": "T09 - DISTRIBUIDORA COLONIA",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4899051,
            "lng": -51.9975362,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4900512,
            "lng": -51.9962446,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4902433,
            "lng": -51.9949571,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4906946,
            "lng": -51.9937126,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4908002,
            "lng": -51.9923822,
            "tipo": "quadra"
          },
          {
            "nome": "Menegusso Máquinas - Concessionária Stihl e Locadora de Máquinas",
            "lat": -26.4893882,
            "lng": -51.9982094,
            "tipo": "referencia"
          },
          {
            "nome": "Nona Maria Sorveteria - A Sua Casa do Sorvete!",
            "lat": -26.4900571,
            "lng": -51.9944388,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.998253,
              -26.489341
            ],
            [
              -51.998457,
              -26.490311
            ],
            [
              -51.991961,
              -26.491484
            ],
            [
              -51.991752,
              -26.490465
            ],
            [
              -51.998253,
              -26.489341
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 10,
        "nome": "T10 - CELINHO LANCHES",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4879125,
            "lng": -51.9893913,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4880277,
            "lng": -51.990829,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4868658,
            "lng": -51.9892089,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4868178,
            "lng": -51.990711,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4859151,
            "lng": -51.9892197,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4857903,
            "lng": -51.9903355,
            "tipo": "quadra"
          },
          {
            "nome": "Colegio Dom Carlos",
            "lat": -26.4875679,
            "lng": -51.9892943,
            "tipo": "referencia"
          },
          {
            "nome": "Célinho Lanches",
            "lat": -26.4872105,
            "lng": -51.990423,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.990632,
              -26.485195
            ],
            [
              -51.991201,
              -26.488294
            ],
            [
              -51.988917,
              -26.488711
            ],
            [
              -51.988348,
              -26.485557
            ],
            [
              -51.990632,
              -26.485195
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 11,
        "nome": "T11- BERTE AUTOMOVEIS",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4883638,
            "lng": -51.9872992,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4882102,
            "lng": -51.9881682,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4873267,
            "lng": -51.9870203,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4871443,
            "lng": -51.9878571,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4862416,
            "lng": -51.986752,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4859728,
            "lng": -51.9876962,
            "tipo": "quadra"
          },
          {
            "nome": "Berté Automóveis",
            "lat": -26.4886782,
            "lng": -51.9878593,
            "tipo": "referencia"
          },
          {
            "nome": "CRAS",
            "lat": -26.4875415,
            "lng": -51.9884243,
            "tipo": "referencia"
          },
          {
            "nome": "Residencial Idealle",
            "lat": -26.488915,
            "lng": -51.9873717,
            "tipo": "condominio"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.988348,
              -26.485557
            ],
            [
              -51.988868,
              -26.488697
            ],
            [
              -51.986766,
              -26.4891
            ],
            [
              -51.986165,
              -26.485883
            ],
            [
              -51.988348,
              -26.485557
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 12,
        "nome": "T12 - LA BELLA ITALIA",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4849353,
            "lng": -51.9889932,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4847,
            "lng": -51.9901627,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4843014,
            "lng": -51.9884299,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4839702,
            "lng": -51.9900607,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4834228,
            "lng": -51.9887464,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4831732,
            "lng": -51.9898783,
            "tipo": "quadra"
          },
          {
            "nome": "Bufufa Lanches",
            "lat": -26.4853265,
            "lng": -51.9884154,
            "tipo": "referencia"
          },
          {
            "nome": "Restaurante La Bella Italia",
            "lat": -26.4844444,
            "lng": -51.9888889,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.990191,
              -26.482845
            ],
            [
              -51.9906,
              -26.485107
            ],
            [
              -51.988347,
              -26.485443
            ],
            [
              -51.987897,
              -26.483205
            ],
            [
              -51.990191,
              -26.482845
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 13,
        "nome": "T13 - BELLAGIO PIZZARIA",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4853218,
            "lng": -51.9865444,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4850985,
            "lng": -51.9876521,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4846328,
            "lng": -51.9864397,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4844023,
            "lng": -51.9875663,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4838502,
            "lng": -51.9862842,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4836101,
            "lng": -51.9873624,
            "tipo": "quadra"
          },
          {
            "nome": "Bellagio Pizzaria",
            "lat": -26.4846104,
            "lng": -51.9878748,
            "tipo": "referencia"
          },
          {
            "nome": "Funerária Santa Clara",
            "lat": -26.4854719,
            "lng": -51.9869163,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.987897,
              -26.483234
            ],
            [
              -51.988283,
              -26.485424
            ],
            [
              -51.986118,
              -26.485791
            ],
            [
              -51.985751,
              -26.48358
            ],
            [
              -51.987897,
              -26.483234
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 14,
        "nome": "T14 - CLUBE UNIÃO ",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4824865,
            "lng": -51.9898172,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4825345,
            "lng": -51.9889803,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4826065,
            "lng": -51.9881917,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4815262,
            "lng": -51.9896348,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4817278,
            "lng": -51.9882186,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.480489,
            "lng": -51.9894953,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4806427,
            "lng": -51.9879504,
            "tipo": "quadra"
          },
          {
            "nome": "Clube União Recreativo Palmense",
            "lat": -26.482779,
            "lng": -51.9888306,
            "tipo": "referencia"
          },
          {
            "nome": "Colégio Bom Jesus",
            "lat": -26.4815596,
            "lng": -51.9894592,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.989625,
              -26.479918
            ],
            [
              -51.990141,
              -26.482767
            ],
            [
              -51.987868,
              -26.483143
            ],
            [
              -51.987278,
              -26.48031
            ],
            [
              -51.989625,
              -26.479918
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 15,
        "nome": "T15 - PIZZARELLA",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4828994,
            "lng": -51.9862016,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4827169,
            "lng": -51.987253,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4819775,
            "lng": -51.9860406,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4817566,
            "lng": -51.9870277,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4810268,
            "lng": -51.9858582,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4808155,
            "lng": -51.9867058,
            "tipo": "quadra"
          },
          {
            "nome": "Lanchonete Sinus",
            "lat": -26.483196,
            "lng": -51.9865872,
            "tipo": "referencia"
          },
          {
            "nome": "Pizzarella",
            "lat": -26.4822513,
            "lng": -51.987213,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.987278,
              -26.48031
            ],
            [
              -51.987814,
              -26.483133
            ],
            [
              -51.985716,
              -26.483501
            ],
            [
              -51.985173,
              -26.480647
            ],
            [
              -51.987278,
              -26.48031
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 16,
        "nome": "T16 - RAÇÕES DALLÓ",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4814484,
            "lng": -51.9958505,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4816789,
            "lng": -51.9946704,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4806417,
            "lng": -51.9955072,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4808914,
            "lng": -51.9944451,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4799695,
            "lng": -51.9953678,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4800464,
            "lng": -51.9943378,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4782217,
            "lng": -51.995121,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.4783753,
            "lng": -51.9941017,
            "tipo": "quadra"
          },
          {
            "nome": "Loja do Magrão",
            "lat": -26.4789447,
            "lng": -51.9946383,
            "tipo": "referencia"
          },
          {
            "nome": "Rações Dalló",
            "lat": -26.4816595,
            "lng": -51.9961602,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.995486,
              -26.477477
            ],
            [
              -51.99638,
              -26.481688
            ],
            [
              -51.994192,
              -26.482072
            ],
            [
              -51.993569,
              -26.477789
            ],
            [
              -51.995486,
              -26.477477
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 17,
        "nome": "T17 - SUPER 1,99",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4820542,
            "lng": -51.9918907,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4822846,
            "lng": -51.9907535,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.481017,
            "lng": -51.9918693,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4812091,
            "lng": -51.990496,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4802488,
            "lng": -51.9916547,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4798551,
            "lng": -51.9903887,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4790292,
            "lng": -51.9911719,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.4782129,
            "lng": -51.9930602,
            "tipo": "quadra"
          },
          {
            "nome": "9",
            "lat": -26.4815167,
            "lng": -51.9939186,
            "tipo": "quadra"
          },
          {
            "nome": "Instituto Santa Pelizzari / Hospital Santa Pelizzari",
            "lat": -26.4815962,
            "lng": -51.9918031,
            "tipo": "referencia"
          },
          {
            "nome": "Parque da gruta de Palmas",
            "lat": -26.4796206,
            "lng": -51.9927972,
            "tipo": "referencia"
          },
          {
            "nome": "Universo Vip Barbershop",
            "lat": -26.4812908,
            "lng": -51.9939858,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.993526,
              -26.477789
            ],
            [
              -51.994192,
              -26.482072
            ],
            [
              -51.990259,
              -26.482747
            ],
            [
              -51.989707,
              -26.479839
            ],
            [
              -51.989022,
              -26.479911
            ],
            [
              -51.98872,
              -26.478572
            ],
            [
              -51.993526,
              -26.477789
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 18,
        "nome": "T18 - RODOVIARIA",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4910514,
            "lng": -51.9911209,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4914211,
            "lng": -51.9900266,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4915315,
            "lng": -51.9889429,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4919892,
            "lng": -51.9882342,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4916276,
            "lng": -51.9874409,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4900144,
            "lng": -51.9909814,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.49012,
            "lng": -51.9897476,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.4903793,
            "lng": -51.9885997,
            "tipo": "quadra"
          },
          {
            "nome": "9",
            "lat": -26.4904849,
            "lng": -51.9874946,
            "tipo": "quadra"
          },
          {
            "nome": "10",
            "lat": -26.4889293,
            "lng": -51.990724,
            "tipo": "quadra"
          },
          {
            "nome": "11",
            "lat": -26.489419,
            "lng": -51.9896189,
            "tipo": "quadra"
          },
          {
            "nome": "12",
            "lat": -26.4892462,
            "lng": -51.988428,
            "tipo": "quadra"
          },
          {
            "nome": "13",
            "lat": -26.4896207,
            "lng": -51.9872264,
            "tipo": "quadra"
          },
          {
            "nome": "R.T. Burger",
            "lat": -26.4889399,
            "lng": -51.9896587,
            "tipo": "referencia"
          },
          {
            "nome": "Rodoviária de Palmas - Paraná",
            "lat": -26.4913945,
            "lng": -51.990056,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.991191,
              -26.48841
            ],
            [
              -51.991846,
              -26.491536
            ],
            [
              -51.987415,
              -26.492382
            ],
            [
              -51.986772,
              -26.489199
            ],
            [
              -51.991191,
              -26.48841
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 19,
        "nome": "T19 - GOLD ATACADO",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4931159,
            "lng": -51.9916359,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4932215,
            "lng": -51.9906167,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.493452,
            "lng": -51.9892863,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4937209,
            "lng": -51.9883422,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4921461,
            "lng": -51.9913033,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4923285,
            "lng": -51.9902197,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4925206,
            "lng": -51.9890288,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.4926262,
            "lng": -51.98831,
            "tipo": "quadra"
          },
          {
            "nome": "9",
            "lat": -26.4927126,
            "lng": -51.9876877,
            "tipo": "quadra"
          },
          {
            "nome": "Auto Posto Horizonte III",
            "lat": -26.493818,
            "lng": -51.9881213,
            "tipo": "referencia"
          },
          {
            "nome": "Gold Atacado de alimentos e bebidas LTDA",
            "lat": -26.4920478,
            "lng": -51.9903411,
            "tipo": "referencia"
          },
          {
            "nome": "Residencial Stulher",
            "lat": -26.4921683,
            "lng": -51.9890334,
            "tipo": "condominio"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.991846,
              -26.491536
            ],
            [
              -51.992349,
              -26.493639
            ],
            [
              -51.987766,
              -26.494529
            ],
            [
              -51.987415,
              -26.492382
            ],
            [
              -51.991846,
              -26.491536
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 20,
        "nome": "T20 - RESERVATORIO SANEPAR",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4920391,
            "lng": -51.9980285,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4922312,
            "lng": -51.9967411,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4924328,
            "lng": -51.9955073,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4910309,
            "lng": -51.9977496,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4912325,
            "lng": -51.9965479,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4914918,
            "lng": -51.9952605,
            "tipo": "quadra"
          },
          {
            "nome": "Escola Municipal Nossa Senhora de Fátima",
            "lat": -26.4921952,
            "lng": -51.9964822,
            "tipo": "referencia"
          },
          {
            "nome": "Reservatório Sanepar",
            "lat": -26.4910288,
            "lng": -51.9956387,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.998467,
              -26.490444
            ],
            [
              -51.998917,
              -26.492458
            ],
            [
              -51.994943,
              -26.493153
            ],
            [
              -51.994525,
              -26.491136
            ],
            [
              -51.998467,
              -26.490444
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 21,
        "nome": "T21 - MERCADO DIVINO",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4927497,
            "lng": -51.9941447,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4929609,
            "lng": -51.9928787,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4916934,
            "lng": -51.9939516,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4919815,
            "lng": -51.9927607,
            "tipo": "quadra"
          },
          {
            "nome": "Mercado Divino",
            "lat": -26.4935238,
            "lng": -51.9925266,
            "tipo": "referencia"
          },
          {
            "nome": "Postos Moisés",
            "lat": -26.4915703,
            "lng": -51.992841,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.994525,
              -26.491136
            ],
            [
              -51.994943,
              -26.493153
            ],
            [
              -51.992441,
              -26.493632
            ],
            [
              -51.991988,
              -26.491575
            ],
            [
              -51.994525,
              -26.491136
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 22,
        "nome": "T22 - TUNA SUSHI",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.485521,
            "lng": -51.9851716,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4857899,
            "lng": -51.9836481,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4859627,
            "lng": -51.9824036,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.484916,
            "lng": -51.9849677,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4850505,
            "lng": -51.9835301,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4853289,
            "lng": -51.9822426,
            "tipo": "quadra"
          },
          {
            "nome": "RESIDENCIAL NOVA ERA",
            "lat": -26.4852001,
            "lng": -51.98448,
            "tipo": "condominio"
          },
          {
            "nome": "Tuna Sushi",
            "lat": -26.4858055,
            "lng": -51.9820213,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.985734,
              -26.484373
            ],
            [
              -51.986007,
              -26.485765
            ],
            [
              -51.982029,
              -26.486444
            ],
            [
              -51.981758,
              -26.485021
            ],
            [
              -51.985734,
              -26.484373
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 23,
        "nome": "T23 - RESTAURANTE PALADARE",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4839941,
            "lng": -51.9849999,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4843398,
            "lng": -51.9832619,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4843879,
            "lng": -51.9820388,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4832163,
            "lng": -51.9847103,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4834948,
            "lng": -51.9831224,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4837445,
            "lng": -51.9819315,
            "tipo": "quadra"
          },
          {
            "nome": "Escola de Música Sonar",
            "lat": -26.4830009,
            "lng": -51.9854076,
            "tipo": "referencia"
          },
          {
            "nome": "Paladare",
            "lat": -26.4842602,
            "lng": -51.9853115,
            "tipo": "referencia"
          },
          {
            "nome": "RESIDENCIAL FRAPORTI",
            "lat": -26.4844098,
            "lng": -51.9842891,
            "tipo": "condominio"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.985422,
              -26.482794
            ],
            [
              -51.985712,
              -26.484312
            ],
            [
              -51.981732,
              -26.484926
            ],
            [
              -51.981431,
              -26.483428
            ],
            [
              -51.985422,
              -26.482794
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 24,
        "nome": "T24 - SOS GÁS",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.482256,
            "lng": -51.9845493,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4825345,
            "lng": -51.9830795,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4826785,
            "lng": -51.981674,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4827265,
            "lng": -51.9808801,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4812861,
            "lng": -51.9842704,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4814973,
            "lng": -51.9827791,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4816126,
            "lng": -51.9816203,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.4818335,
            "lng": -51.9803436,
            "tipo": "quadra"
          },
          {
            "nome": "SOS Gás",
            "lat": -26.481417,
            "lng": -51.9807721,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.985455,
              -26.482727
            ],
            [
              -51.981061,
              -26.483428
            ],
            [
              -51.979469,
              -26.481491
            ],
            [
              -51.983375,
              -26.480844
            ],
            [
              -51.983431,
              -26.481094
            ],
            [
              -51.985083,
              -26.480821
            ],
            [
              -51.985455,
              -26.482727
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 25,
        "nome": "T25 - VW COPAUTO",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4908391,
            "lng": -51.9861878,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4910311,
            "lng": -51.9847179,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4912661,
            "lng": -51.9834718,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4914582,
            "lng": -51.9826028,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4916022,
            "lng": -51.9817874,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4916598,
            "lng": -51.9807359,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4899365,
            "lng": -51.9844819,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.4902291,
            "lng": -51.9832358,
            "tipo": "quadra"
          },
          {
            "nome": "9",
            "lat": -26.4902387,
            "lng": -51.9822916,
            "tipo": "quadra"
          },
          {
            "nome": "10",
            "lat": -26.4904979,
            "lng": -51.9814441,
            "tipo": "quadra"
          },
          {
            "nome": "17",
            "lat": -26.4896196,
            "lng": -51.9860376,
            "tipo": "quadra"
          },
          {
            "nome": "Clínica do Idoso",
            "lat": -26.4894495,
            "lng": -51.9858999,
            "tipo": "referencia"
          },
          {
            "nome": "MERCADO ECONÔMICO",
            "lat": -26.4914457,
            "lng": -51.9831835,
            "tipo": "referencia"
          },
          {
            "nome": "Residencial Universitário",
            "lat": -26.4902903,
            "lng": -51.9855388,
            "tipo": "condominio"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.986693,
              -26.489149
            ],
            [
              -51.987115,
              -26.491222
            ],
            [
              -51.981367,
              -26.492257
            ],
            [
              -51.980669,
              -26.492339
            ],
            [
              -51.980089,
              -26.49234
            ],
            [
              -51.979623,
              -26.492092
            ],
            [
              -51.979509,
              -26.49135
            ],
            [
              -51.980953,
              -26.490234
            ],
            [
              -51.986693,
              -26.489149
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 26,
        "nome": "T26 - CÍRCULO MILITAR",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4885729,
            "lng": -51.9857908,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4889762,
            "lng": -51.9843854,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4890479,
            "lng": -51.9829461,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4892976,
            "lng": -51.9820878,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4871037,
            "lng": -51.9848789,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4879052,
            "lng": -51.9826886,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4880781,
            "lng": -51.982002,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.4868778,
            "lng": -51.9827637,
            "tipo": "quadra"
          },
          {
            "nome": "Jacson Insulfilm",
            "lat": -26.4894961,
            "lng": -51.9834434,
            "tipo": "referencia"
          },
          {
            "nome": "Up Sports Centro Esportivo",
            "lat": -26.4866199,
            "lng": -51.9827575,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.986118,
              -26.485791
            ],
            [
              -51.986766,
              -26.4891
            ],
            [
              -51.98164,
              -26.490031
            ],
            [
              -51.981607,
              -26.486612
            ],
            [
              -51.986118,
              -26.485791
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 27,
        "nome": "T27 - MAQSERV",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4767284,
            "lng": -51.9946811,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4767477,
            "lng": -51.9935867,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.47548,
            "lng": -51.9945523,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4747885,
            "lng": -51.9933721,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4745196,
            "lng": -51.9944665,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4731559,
            "lng": -51.994209,
            "tipo": "quadra"
          },
          {
            "nome": "Dn@ Informática Ltda",
            "lat": -26.4766901,
            "lng": -51.9943434,
            "tipo": "referencia"
          },
          {
            "nome": "Maq Serv",
            "lat": -26.4774696,
            "lng": -51.9936086,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.9947831,
              -26.472698
            ],
            [
              -51.9955101,
              -26.477411
            ],
            [
              -51.9935681,
              -26.477694
            ],
            [
              -51.9928381,
              -26.472953
            ],
            [
              -51.9947831,
              -26.472698
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 28,
        "nome": "T28 - EM FRENTE ENTRADA DA GRUTA",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4768437,
            "lng": -51.9927713,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4771798,
            "lng": -51.9918808,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4773239,
            "lng": -51.9911493,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4757489,
            "lng": -51.9924709,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4760946,
            "lng": -51.9917287,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4747117,
            "lng": -51.9921705,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4750574,
            "lng": -51.9915892,
            "tipo": "quadra"
          },
          {
            "nome": "Park,s sorvetes e milk shake bebidas",
            "lat": -26.4779595,
            "lng": -51.9914001,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.992933,
              -26.474201
            ],
            [
              -51.993544,
              -26.477718
            ],
            [
              -51.990519,
              -26.478225
            ],
            [
              -51.991131,
              -26.474364
            ],
            [
              -51.992933,
              -26.474201
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 29,
        "nome": "T29 - PIZZAS DA CASA ",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4793254,
            "lng": -51.9873975,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4794406,
            "lng": -51.9853912,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4795487,
            "lng": -51.9842108,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4791525,
            "lng": -51.9857023,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4775351,
            "lng": -51.989381,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4786243,
            "lng": -51.9852731,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.477203,
            "lng": -51.9875798,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.4770589,
            "lng": -51.986464,
            "tipo": "quadra"
          },
          {
            "nome": "Pista de Skate Palmas",
            "lat": -26.4792279,
            "lng": -51.9857062,
            "tipo": "referencia"
          },
          {
            "nome": "Pizzas da Casa",
            "lat": -26.478489,
            "lng": -51.988301,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.985978,
              -26.479669
            ],
            [
              -51.983326,
              -26.480074
            ],
            [
              -51.982981,
              -26.478385
            ],
            [
              -51.985149,
              -26.477975
            ],
            [
              -51.985859,
              -26.477277
            ],
            [
              -51.986999,
              -26.476179
            ],
            [
              -51.98664,
              -26.475856
            ],
            [
              -51.987509,
              -26.475055
            ],
            [
              -51.989697,
              -26.477129
            ],
            [
              -51.990164,
              -26.478297
            ],
            [
              -51.98872,
              -26.478572
            ],
            [
              -51.988906,
              -26.479939
            ],
            [
              -51.986132,
              -26.480364
            ],
            [
              -51.985978,
              -26.479669
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 30,
        "nome": "T30 - EM FRENTE A CADEIA",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4756913,
            "lng": -51.9957754,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4743275,
            "lng": -51.9953033,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4731751,
            "lng": -51.9950673,
            "tipo": "quadra"
          },
          {
            "nome": "Demóbille Argenta",
            "lat": -26.4753291,
            "lng": -51.9967105,
            "tipo": "referencia"
          },
          {
            "nome": "Lanchonete Sinus II",
            "lat": -26.4772227,
            "lng": -51.9958675,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.995575,
              -26.472633
            ],
            [
              -51.995743,
              -26.47375
            ],
            [
              -51.996003,
              -26.474003
            ],
            [
              -51.996987,
              -26.475247
            ],
            [
              -51.996362,
              -26.476049
            ],
            [
              -51.995994,
              -26.476714
            ],
            [
              -51.995962,
              -26.477307
            ],
            [
              -51.995506,
              -26.477389
            ],
            [
              -51.994789,
              -26.472737
            ],
            [
              -51.995575,
              -26.472633
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 31,
        "nome": "T31- SUPERMERCADO FOSCARINI",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4807107,
            "lng": -51.9780418,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4797696,
            "lng": -51.9773552,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4795775,
            "lng": -51.9763038,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4788285,
            "lng": -51.9771406,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4788669,
            "lng": -51.9760248,
            "tipo": "quadra"
          },
          {
            "nome": "Supermercado Foscarini",
            "lat": -26.4793766,
            "lng": -51.9762392,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.977558,
              -26.478204
            ],
            [
              -51.978094,
              -26.480336
            ],
            [
              -51.979102,
              -26.481306
            ],
            [
              -51.979151,
              -26.481474
            ],
            [
              -51.977391,
              -26.480951
            ],
            [
              -51.976662,
              -26.480471
            ],
            [
              -51.975627,
              -26.479688
            ],
            [
              -51.975512,
              -26.479506
            ],
            [
              -51.975736,
              -26.478529
            ],
            [
              -51.977558,
              -26.478204
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 32,
        "nome": "T32 - MERCADO PERETTI",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4806147,
            "lng": -51.9799301,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4804802,
            "lng": -51.9789001,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4795967,
            "lng": -51.9798228,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4794815,
            "lng": -51.9783637,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4784828,
            "lng": -51.9794795,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4784828,
            "lng": -51.9782135,
            "tipo": "quadra"
          },
          {
            "nome": "Cami Farma",
            "lat": -26.478749,
            "lng": -51.9789971,
            "tipo": "referencia"
          },
          {
            "nome": "Mercado Peretti",
            "lat": -26.480053,
            "lng": -51.9804124,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.980183,
              -26.477743
            ],
            [
              -51.980837,
              -26.481176
            ],
            [
              -51.979341,
              -26.48146
            ],
            [
              -51.978118,
              -26.480245
            ],
            [
              -51.977558,
              -26.478204
            ],
            [
              -51.980183,
              -26.477743
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 33,
        "nome": "T33 - SANTUARIO/LOJA FABI",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4798464,
            "lng": -51.9824621,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4804226,
            "lng": -51.9813463,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4788285,
            "lng": -51.98199,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4791742,
            "lng": -51.9808528,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4781178,
            "lng": -51.9817325,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4782331,
            "lng": -51.9807562,
            "tipo": "quadra"
          },
          {
            "nome": "LOJA FABI",
            "lat": -26.4779325,
            "lng": -51.9819425,
            "tipo": "referencia"
          },
          {
            "nome": "Residencial VIBRE",
            "lat": -26.4798393,
            "lng": -51.9830972,
            "tipo": "condominio"
          },
          {
            "nome": "Residencial Vila Real",
            "lat": -26.4808176,
            "lng": -51.9826551,
            "tipo": "condominio"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.9828492,
              -26.478238
            ],
            [
              -51.983412,
              -26.480768
            ],
            [
              -51.980912,
              -26.481172
            ],
            [
              -51.980242,
              -26.477738
            ],
            [
              -51.9812452,
              -26.4776038
            ],
            [
              -51.9828492,
              -26.478238
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 34,
        "nome": "T34 - BOLICHE",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4852846,
            "lng": -51.9978653,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4850734,
            "lng": -51.999024,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4841803,
            "lng": -51.9993887,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4844588,
            "lng": -51.9976507,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4833065,
            "lng": -51.9991956,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4836234,
            "lng": -51.9973396,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4826246,
            "lng": -51.9984339,
            "tipo": "quadra"
          },
          {
            "nome": "Boliche Palmas",
            "lat": -26.4859518,
            "lng": -51.997611,
            "tipo": "referencia"
          },
          {
            "nome": "Comércio De Sucatas Palmense",
            "lat": -26.4836428,
            "lng": -51.9996206,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -52.001041,
              -26.485523
            ],
            [
              -51.997549,
              -26.486035
            ],
            [
              -51.996684,
              -26.48257
            ],
            [
              -51.997715,
              -26.482378
            ],
            [
              -51.998868,
              -26.481937
            ],
            [
              -51.999888,
              -26.481692
            ],
            [
              -52.001041,
              -26.485523
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 35,
        "nome": "T35 - CENTRO DO IDOSO/COLÉGIO SESI",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4844396,
            "lng": -52.0031653,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4842969,
            "lng": -52.0019501,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4838456,
            "lng": -52.0016068,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4829413,
            "lng": -52.0017447,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4824132,
            "lng": -52.0005752,
            "tipo": "quadra"
          },
          {
            "nome": "CENTRO DO IDOSO",
            "lat": -26.4838481,
            "lng": -52.0021655,
            "tipo": "referencia"
          },
          {
            "nome": "Colégio Sesi - Palmas",
            "lat": -26.4850782,
            "lng": -52.0028667,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.99996,
              -26.481757
            ],
            [
              -52.002323,
              -26.482366
            ],
            [
              -52.002479,
              -26.482969
            ],
            [
              -52.002463,
              -26.48343
            ],
            [
              -52.00249,
              -26.48379
            ],
            [
              -52.002617,
              -26.48395
            ],
            [
              -52.003441,
              -26.484198
            ],
            [
              -52.004094,
              -26.485379
            ],
            [
              -52.001084,
              -26.485557
            ],
            [
              -51.99996,
              -26.481757
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 36,
        "nome": "T36 - ALTO DA GLÓRIA LADO DIREITO ANTES DO CAIC",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4817296,
            "lng": -52.0051151,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4807225,
            "lng": -52.0046107,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.480007,
            "lng": -52.0054475,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4795641,
            "lng": -52.0049917,
            "tipo": "quadra"
          },
          {
            "nome": "JUAREZ AUTO MECANICA",
            "lat": -26.4809346,
            "lng": -52.0056434,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -52.005518,
              -26.479116
            ],
            [
              -52.005958,
              -26.48194
            ],
            [
              -52.0043,
              -26.482175
            ],
            [
              -52.003586,
              -26.479731
            ],
            [
              -52.005518,
              -26.479116
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 37,
        "nome": "T37 - ALTO DA GLÓRIA EM FRENTE AO CAIC",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4812989,
            "lng": -52.007779,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4814667,
            "lng": -52.0066062,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4807996,
            "lng": -52.0075752,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4809673,
            "lng": -52.0064346,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4802042,
            "lng": -52.0076395,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4804103,
            "lng": -52.0068422,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4798774,
            "lng": -52.0063541,
            "tipo": "quadra"
          },
          {
            "nome": "Duarte Espaço Gastronômico",
            "lat": -26.4814502,
            "lng": -52.0060097,
            "tipo": "referencia"
          },
          {
            "nome": "Mercado Nunes",
            "lat": -26.4807098,
            "lng": -52.0072797,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -52.006993,
              -26.47956
            ],
            [
              -52.007099,
              -26.480062
            ],
            [
              -52.007983,
              -26.479973
            ],
            [
              -52.008428,
              -26.481429
            ],
            [
              -52.007297,
              -26.481733
            ],
            [
              -52.006005,
              -26.481912
            ],
            [
              -52.005631,
              -26.479704
            ],
            [
              -52.006993,
              -26.47956
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 38,
        "nome": "T39 - CADEIA PÚBLICA",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4814907,
            "lng": -51.9978918,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.480564,
            "lng": -51.9973794,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4795268,
            "lng": -51.9975082,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4797045,
            "lng": -51.996363,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4791427,
            "lng": -52.0001045,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4784993,
            "lng": -51.9964434,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4757623,
            "lng": -51.9973365,
            "tipo": "quadra"
          },
          {
            "nome": "Condomínio Residencial Viver Bem",
            "lat": -26.4821706,
            "lng": -51.998,
            "tipo": "condominio"
          },
          {
            "nome": "Condomínio Residencial Viver Bem",
            "lat": -26.4821706,
            "lng": -51.998,
            "tipo": "condominio"
          },
          {
            "nome": "Liesch Atacadista Palmas",
            "lat": -26.4815904,
            "lng": -51.9988997,
            "tipo": "referencia"
          },
          {
            "nome": "Supermercado Dois Vizinhos",
            "lat": -26.478665,
            "lng": -51.9961185,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.997593,
              -26.482339
            ],
            [
              -51.996707,
              -26.482486
            ],
            [
              -51.995914,
              -26.479443
            ],
            [
              -51.995879,
              -26.479241
            ],
            [
              -51.995864,
              -26.479064
            ],
            [
              -51.995958,
              -26.478735
            ],
            [
              -51.996126,
              -26.478047
            ],
            [
              -51.996101,
              -26.477587
            ],
            [
              -51.996077,
              -26.476838
            ],
            [
              -51.996239,
              -26.476487
            ],
            [
              -51.996902,
              -26.475513
            ],
            [
              -51.997199,
              -26.475277
            ],
            [
              -51.997383,
              -26.475203
            ],
            [
              -51.997666,
              -26.475149
            ],
            [
              -51.998057,
              -26.47514
            ],
            [
              -51.998558,
              -26.475149
            ],
            [
              -51.999652,
              -26.476924
            ],
            [
              -52.000133,
              -26.477042
            ],
            [
              -52.001328,
              -26.477216
            ],
            [
              -52.001145,
              -26.479898
            ],
            [
              -51.999511,
              -26.480004
            ],
            [
              -51.999601,
              -26.480532
            ],
            [
              -51.998953,
              -26.480651
            ],
            [
              -51.999469,
              -26.481681
            ],
            [
              -51.99913,
              -26.481787
            ],
            [
              -51.998784,
              -26.481915
            ],
            [
              -51.998019,
              -26.482199
            ],
            [
              -51.997593,
              -26.482339
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 39,
        "nome": "T40 - PERTO DO CONDOMÍNIO TITO CARRARO",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4719684,
            "lng": -51.9973009,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4715938,
            "lng": -51.9968396,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4712096,
            "lng": -51.9963138,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4709791,
            "lng": -51.9960027,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4705566,
            "lng": -51.9956916,
            "tipo": "quadra"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.996276,
              -26.470223
            ],
            [
              -51.997972,
              -26.471956
            ],
            [
              -51.996979,
              -26.472883
            ],
            [
              -51.994941,
              -26.470708
            ],
            [
              -51.996276,
              -26.470223
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 40,
        "nome": "T41 - MARINI LAGOÃO",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4742736,
            "lng": -51.9979857,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4729147,
            "lng": -51.9999759,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4717955,
            "lng": -51.9989531,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4728519,
            "lng": -51.9977944,
            "tipo": "quadra"
          },
          {
            "nome": "Crivo Chapeação e Pintura / Estética Automotiva / Oficina.",
            "lat": -26.4747437,
            "lng": -51.9974182,
            "tipo": "referencia"
          },
          {
            "nome": "Marini Bem Viver - Bairro Lagoão",
            "lat": -26.4741233,
            "lng": -52.0003123,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.999069,
              -26.471156
            ],
            [
              -52.000332,
              -26.472205
            ],
            [
              -52.000605,
              -26.472753
            ],
            [
              -52.000699,
              -26.473852
            ],
            [
              -52.000495,
              -26.474136
            ],
            [
              -52.000056,
              -26.474378
            ],
            [
              -51.99894,
              -26.474873
            ],
            [
              -51.998379,
              -26.475005
            ],
            [
              -51.997467,
              -26.475031
            ],
            [
              -51.997003,
              -26.475238
            ],
            [
              -51.99591,
              -26.47389
            ],
            [
              -51.999069,
              -26.471156
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 41,
        "nome": "T42 - LAGOÃO CHURRASCARIA SAMPAIO",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4711904,
            "lng": -51.9983952,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4711136,
            "lng": -51.9976979,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4701148,
            "lng": -51.9973867,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4702781,
            "lng": -51.9967108,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4692696,
            "lng": -51.9961529,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4698267,
            "lng": -51.9956701,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4691928,
            "lng": -51.9954877,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.4684622,
            "lng": -51.9952988,
            "tipo": "quadra"
          },
          {
            "nome": "Churrascaria Sampaio",
            "lat": -26.4705562,
            "lng": -51.9976812,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.998992,
              -26.471135
            ],
            [
              -51.998016,
              -26.471966
            ],
            [
              -51.9962,
              -26.470141
            ],
            [
              -51.995515,
              -26.470442
            ],
            [
              -51.994775,
              -26.468416
            ],
            [
              -51.995494,
              -26.468245
            ],
            [
              -51.995905,
              -26.468602
            ],
            [
              -51.998992,
              -26.471135
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 42,
        "nome": "T43 - PERTO DO CONDOMÍNIO TITO CARRARO",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4728711,
            "lng": -51.9961422,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4719107,
            "lng": -51.9955146,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.471469,
            "lng": -51.9950371,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4710799,
            "lng": -51.9949727,
            "tipo": "quadra"
          },
          {
            "nome": "Cavalheiro Barber Club",
            "lat": -26.4736616,
            "lng": -51.9959836,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.99693,
              -26.472899
            ],
            [
              -51.995857,
              -26.473821
            ],
            [
              -51.995578,
              -26.472683
            ],
            [
              -51.99458,
              -26.471924
            ],
            [
              -51.994794,
              -26.470753
            ],
            [
              -51.99488,
              -26.470695
            ],
            [
              -51.99693,
              -26.472899
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 43,
        "nome": "T44 - JFEY E FILHOS HÍPICA",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4714511,
            "lng": -52.0009592,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4709324,
            "lng": -51.9999507,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4704138,
            "lng": -51.9987061,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.469972,
            "lng": -51.9994035,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4706635,
            "lng": -52.0016995,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4698952,
            "lng": -52.0007339,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4692229,
            "lng": -52.0000258,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.4689348,
            "lng": -52.0034912,
            "tipo": "quadra"
          },
          {
            "nome": "9",
            "lat": -26.4680208,
            "lng": -52.004296,
            "tipo": "quadra"
          },
          {
            "nome": "10",
            "lat": -26.4676462,
            "lng": -52.0036523,
            "tipo": "quadra"
          },
          {
            "nome": "11",
            "lat": -26.4684914,
            "lng": -52.0029442,
            "tipo": "quadra"
          },
          {
            "nome": "12",
            "lat": -26.4681457,
            "lng": -52.001292,
            "tipo": "quadra"
          },
          {
            "nome": "J Fey e Filhos",
            "lat": -26.4685706,
            "lng": -52.0003882,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -52.000782,
              -26.472363
            ],
            [
              -51.99827,
              -26.470406
            ],
            [
              -52.001364,
              -26.467398
            ],
            [
              -52.002299,
              -26.467868
            ],
            [
              -52.003164,
              -26.46664
            ],
            [
              -52.004054,
              -26.466246
            ],
            [
              -52.004084,
              -26.46661
            ],
            [
              -52.00415,
              -26.467045
            ],
            [
              -52.004356,
              -26.467285
            ],
            [
              -52.004936,
              -26.467696
            ],
            [
              -52.004067,
              -26.469042
            ],
            [
              -52.003452,
              -26.469588
            ],
            [
              -52.002592,
              -26.470354
            ],
            [
              -52.001777,
              -26.47128
            ],
            [
              -52.000782,
              -26.472363
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 44,
        "nome": "T45 - LAGOA DA HÍPICA",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4695735,
            "lng": -51.9984349,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4694102,
            "lng": -51.9976517,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4691125,
            "lng": -51.9971904,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4687475,
            "lng": -51.9967827,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4684018,
            "lng": -51.9964501,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4673068,
            "lng": -51.9963279,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4675949,
            "lng": -51.9957056,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.4685843,
            "lng": -51.9990572,
            "tipo": "quadra"
          },
          {
            "nome": "Parque Municipal Hípica",
            "lat": -26.4688035,
            "lng": -51.998168,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -52.000032,
              -26.468477
            ],
            [
              -51.998165,
              -26.470417
            ],
            [
              -51.995665,
              -26.468362
            ],
            [
              -51.995054,
              -26.465894
            ],
            [
              -51.997714,
              -26.467061
            ],
            [
              -52.000032,
              -26.468477
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 45,
        "nome": "T46 - EM FRENTE A LAGOA DA HÍPICA",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4670616,
            "lng": -52.0011121,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4678255,
            "lng": -52.0002106,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4666774,
            "lng": -52.0005382,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4674473,
            "lng": -51.9996174,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4670679,
            "lng": -51.9992741,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4664292,
            "lng": -52.0015003,
            "tipo": "quadra"
          },
          {
            "nome": "Centro da Juventude de Palmas",
            "lat": -26.4660868,
            "lng": -52.0006146,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -52.003066,
              -26.466638
            ],
            [
              -52.002373,
              -26.467507
            ],
            [
              -52.001665,
              -26.466888
            ],
            [
              -52.000088,
              -26.468477
            ],
            [
              -51.998447,
              -26.467459
            ],
            [
              -51.994745,
              -26.465658
            ],
            [
              -51.997782,
              -26.463286
            ],
            [
              -52.003066,
              -26.466638
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 46,
        "nome": "T47 - POSTO DE SAÚDE LAGOÃO",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4710186,
            "lng": -52.005733,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4715852,
            "lng": -52.0047996,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4707977,
            "lng": -52.0045206,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4712587,
            "lng": -52.0034048,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4701638,
            "lng": -52.004113,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4697472,
            "lng": -52.004941,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.470231,
            "lng": -52.003201,
            "tipo": "quadra"
          },
          {
            "nome": "Mercado Favero",
            "lat": -26.4693954,
            "lng": -52.0039564,
            "tipo": "referencia"
          },
          {
            "nome": "Posto de Saúde Lagoão",
            "lat": -26.4698041,
            "lng": -52.0043213,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -52.004317,
              -26.468846
            ],
            [
              -52.006752,
              -26.471017
            ],
            [
              -52.003646,
              -26.472549
            ],
            [
              -52.00245,
              -26.470609
            ],
            [
              -52.003421,
              -26.469771
            ],
            [
              -52.004317,
              -26.468846
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 47,
        "nome": "T48 - EM FRENTE APAE",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4726128,
            "lng": -52.0027718,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4735348,
            "lng": -52.0011089,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4718349,
            "lng": -52.0025251,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4717485,
            "lng": -52.0017526,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4728817,
            "lng": -52.0009158,
            "tipo": "quadra"
          },
          {
            "nome": "BIG LANCHES",
            "lat": -26.4726154,
            "lng": -52.0033923,
            "tipo": "referencia"
          },
          {
            "nome": "Sicoob",
            "lat": -26.4734939,
            "lng": -52.0014147,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -52.002032,
              -26.471117
            ],
            [
              -52.002558,
              -26.471165
            ],
            [
              -52.002939,
              -26.471453
            ],
            [
              -52.003646,
              -26.472549
            ],
            [
              -52.000825,
              -26.474007
            ],
            [
              -52.00075,
              -26.473215
            ],
            [
              -52.000734,
              -26.472552
            ],
            [
              -52.002032,
              -26.471117
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 48,
        "nome": "T49 - EM FRENTE ESCOLA NERASI",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4699585,
            "lng": -52.0082026,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4703234,
            "lng": -52.0069151,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4691325,
            "lng": -52.0086103,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.468902,
            "lng": -52.0073657,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4694206,
            "lng": -52.0059066,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4681721,
            "lng": -52.006722,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4685178,
            "lng": -52.0051126,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.4673845,
            "lng": -52.0055847,
            "tipo": "quadra"
          },
          {
            "nome": "Chapeaçao e pintura RML",
            "lat": -26.4687484,
            "lng": -52.0045036,
            "tipo": "referencia"
          },
          {
            "nome": "Funerária e Floricultura Cristo Rei",
            "lat": -26.4701074,
            "lng": -52.0066822,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -52.009467,
              -26.469741
            ],
            [
              -52.00675,
              -26.470992
            ],
            [
              -52.004309,
              -26.468819
            ],
            [
              -52.005707,
              -26.466622
            ],
            [
              -52.009372,
              -26.469507
            ],
            [
              -52.009467,
              -26.469741
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 49,
        "nome": "T50 - COMPRE MAIS",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4909309,
            "lng": -51.9994531,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4883767,
            "lng": -51.9994102,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4873012,
            "lng": -51.9988094,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4864754,
            "lng": -51.9980369,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4863986,
            "lng": -51.9991742,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4865618,
            "lng": -52.0000968,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4859417,
            "lng": -52.0017937,
            "tipo": "quadra"
          },
          {
            "nome": "Compre Mais | Palmas - PR loja 35",
            "lat": -26.4901646,
            "lng": -51.9987566,
            "tipo": "referencia"
          },
          {
            "nome": "Hotel Palmas",
            "lat": -26.4864593,
            "lng": -51.998557,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -52.005979,
              -26.492022
            ],
            [
              -52.00342,
              -26.49172
            ],
            [
              -52.000808,
              -26.491485
            ],
            [
              -51.998849,
              -26.491352
            ],
            [
              -51.997598,
              -26.486141
            ],
            [
              -52.000393,
              -26.485657
            ],
            [
              -52.002063,
              -26.485598
            ],
            [
              -52.003746,
              -26.485488
            ],
            [
              -52.004485,
              -26.485458
            ],
            [
              -52.004634,
              -26.485479
            ],
            [
              -52.0048,
              -26.485652
            ],
            [
              -52.005052,
              -26.485791
            ],
            [
              -52.005339,
              -26.485846
            ],
            [
              -52.005631,
              -26.485838
            ],
            [
              -52.00609,
              -26.485692
            ],
            [
              -52.005979,
              -26.492022
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 50,
        "nome": "T51 - LOTEAMENTO BENEDETI",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4994514,
            "lng": -51.9909217,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4998451,
            "lng": -51.9903316,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4995186,
            "lng": -51.9896986,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.50069,
            "lng": -51.9904175,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.5004061,
            "lng": -51.9898013,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.5002291,
            "lng": -51.9893124,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.5021398,
            "lng": -51.9898166,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.502063,
            "lng": -51.9910397,
            "tipo": "quadra"
          },
          {
            "nome": "9",
            "lat": -26.50248,
            "lng": -51.990724,
            "tipo": "quadra"
          },
          {
            "nome": "10",
            "lat": -26.4980993,
            "lng": -51.9871544,
            "tipo": "quadra"
          },
          {
            "nome": "Arena Amigos da Bola",
            "lat": -26.4972345,
            "lng": -51.9900903,
            "tipo": "referencia"
          },
          {
            "nome": "Bortoluzzi Sementes",
            "lat": -26.4991385,
            "lng": -51.9911535,
            "tipo": "referencia"
          },
          {
            "nome": "WeigertAutoEletrica",
            "lat": -26.4987008,
            "lng": -51.990875,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.992017,
              -26.502192
            ],
            [
              -51.990923,
              -26.502931
            ],
            [
              -51.988863,
              -26.502067
            ],
            [
              -51.988584,
              -26.501155
            ],
            [
              -51.986588,
              -26.497362
            ],
            [
              -51.989936,
              -26.49669
            ],
            [
              -51.991014,
              -26.498486
            ],
            [
              -51.991626,
              -26.499134
            ],
            [
              -51.992468,
              -26.499849
            ],
            [
              -51.992017,
              -26.502192
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 51,
        "nome": "T52 - KLUBEGI MERCADO IDEAL",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4988002,
            "lng": -51.9860708,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4989923,
            "lng": -51.9851695,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4991939,
            "lng": -51.9841288,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4979169,
            "lng": -51.9864999,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4978785,
            "lng": -51.9858895,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4983105,
            "lng": -51.9847404,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4982049,
            "lng": -51.9837319,
            "tipo": "quadra"
          },
          {
            "nome": "Mercado Ideal",
            "lat": -26.4982964,
            "lng": -51.9856743,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.986562,
              -26.497401
            ],
            [
              -51.987641,
              -26.499446
            ],
            [
              -51.986863,
              -26.49911
            ],
            [
              -51.983703,
              -26.499561
            ],
            [
              -51.983296,
              -26.498063
            ],
            [
              -51.986562,
              -26.497401
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 52,
        "nome": "T53 - KLUBEGI REGIÃO ACESSO LOTEAMENTO BENEDETI",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.5004229,
            "lng": -51.9878088,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4998324,
            "lng": -51.9867225,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.499674,
            "lng": -51.985427,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.5007782,
            "lng": -51.9856952,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.5002309,
            "lng": -51.9845043,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.5013158,
            "lng": -51.9857274,
            "tipo": "quadra"
          },
          {
            "nome": "Elson acabamentos",
            "lat": -26.5004597,
            "lng": -51.9850895,
            "tipo": "referencia"
          },
          {
            "nome": "Posto de Saude da Klubegi",
            "lat": -26.5009231,
            "lng": -51.9860572,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.988544,
              -26.501112
            ],
            [
              -51.9876,
              -26.501892
            ],
            [
              -51.986267,
              -26.502007
            ],
            [
              -51.983802,
              -26.500927
            ],
            [
              -51.983737,
              -26.499549
            ],
            [
              -51.986897,
              -26.499127
            ],
            [
              -51.987686,
              -26.499492
            ],
            [
              -51.988544,
              -26.501112
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 53,
        "nome": "T54 - COLÉGIO MONSENHOR",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4946714,
            "lng": -51.9885119,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4967166,
            "lng": -51.9877286,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4959485,
            "lng": -51.9875248,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4969759,
            "lng": -51.9869133,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4962365,
            "lng": -51.9856902,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4971295,
            "lng": -51.9859262,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.49736,
            "lng": -51.9845744,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.4966782,
            "lng": -51.9845744,
            "tipo": "quadra"
          },
          {
            "nome": "Do Grilo Conveniência",
            "lat": -26.4953832,
            "lng": -51.9864566,
            "tipo": "referencia"
          },
          {
            "nome": "Mercado Amigão",
            "lat": -26.4965586,
            "lng": -51.9864643,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.988992,
              -26.494356
            ],
            [
              -51.989891,
              -26.496646
            ],
            [
              -51.98359,
              -26.498005
            ],
            [
              -51.983392,
              -26.497414
            ],
            [
              -51.98366,
              -26.497256
            ],
            [
              -51.984419,
              -26.495849
            ],
            [
              -51.984894,
              -26.495578
            ],
            [
              -51.986881,
              -26.49505
            ],
            [
              -51.987268,
              -26.494844
            ],
            [
              -51.987568,
              -26.494587
            ],
            [
              -51.988992,
              -26.494356
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 54,
        "nome": "T55 - PÁTIO DA PREFEITURA PRÓXIMO A COAMO",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4984621,
            "lng": -51.9769993,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4978092,
            "lng": -51.9771066,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.5002192,
            "lng": -51.9739952,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.5002385,
            "lng": -51.9734051,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.5003057,
            "lng": -51.9727721,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4992687,
            "lng": -51.9742098,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4990767,
            "lng": -51.9731369,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.498683,
            "lng": -51.9719246,
            "tipo": "quadra"
          },
          {
            "nome": "Secretária de Infraestrutura",
            "lat": -26.4993745,
            "lng": -51.9725127,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.977614,
              -26.498036
            ],
            [
              -51.977598,
              -26.502092
            ],
            [
              -51.976493,
              -26.501957
            ],
            [
              -51.972556,
              -26.500887
            ],
            [
              -51.972695,
              -26.500008
            ],
            [
              -51.971703,
              -26.49984
            ],
            [
              -51.971778,
              -26.498198
            ],
            [
              -51.974416,
              -26.496894
            ],
            [
              -51.977512,
              -26.497312
            ],
            [
              -51.977614,
              -26.498036
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 55,
        "nome": "T56 - VERDES CAMPOS",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.5012466,
            "lng": -51.9651118,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.5013481,
            "lng": -51.9645098,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.501617,
            "lng": -51.9640806,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.5017946,
            "lng": -51.9637534,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.502025,
            "lng": -51.963335,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.5001383,
            "lng": -51.9643864,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.500412,
            "lng": -51.9639894,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.5005608,
            "lng": -51.9630292,
            "tipo": "quadra"
          },
          {
            "nome": "9",
            "lat": -26.500868,
            "lng": -51.9632759,
            "tipo": "quadra"
          },
          {
            "nome": "10",
            "lat": -26.5012761,
            "lng": -51.9634315,
            "tipo": "quadra"
          },
          {
            "nome": "11",
            "lat": -26.5002391,
            "lng": -51.9621923,
            "tipo": "quadra"
          },
          {
            "nome": "Oficina do Pinguim",
            "lat": -26.5001938,
            "lng": -51.9630566,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.963259,
              -26.502695
            ],
            [
              -51.960995,
              -26.500074
            ],
            [
              -51.96666,
              -26.49774
            ],
            [
              -51.967336,
              -26.498604
            ],
            [
              -51.966338,
              -26.501341
            ],
            [
              -51.965845,
              -26.501667
            ],
            [
              -51.9643,
              -26.501955
            ],
            [
              -51.963259,
              -26.502695
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 56,
        "nome": "T57 - CASCATINHA PRÓXIMO A ETA SANEPAR ",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4938052,
            "lng": -51.9830596,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.493786,
            "lng": -51.9820619,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.493786,
            "lng": -51.9811177,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4932387,
            "lng": -51.9838321,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4924225,
            "lng": -51.9836819,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4924321,
            "lng": -51.9828129,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4925954,
            "lng": -51.9819009,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.4929795,
            "lng": -51.9807851,
            "tipo": "quadra"
          },
          {
            "nome": "Brilhan Car Chapeação e Pintura",
            "lat": -26.4934272,
            "lng": -51.9832783,
            "tipo": "referencia"
          },
          {
            "nome": "CMEI Brinquedoteca",
            "lat": -26.4936121,
            "lng": -51.9808875,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.984396,
              -26.493622
            ],
            [
              -51.98343,
              -26.493794
            ],
            [
              -51.983624,
              -26.494543
            ],
            [
              -51.983484,
              -26.494754
            ],
            [
              -51.979675,
              -26.494121
            ],
            [
              -51.980287,
              -26.492738
            ],
            [
              -51.980705,
              -26.492413
            ],
            [
              -51.984089,
              -26.491836
            ],
            [
              -51.984396,
              -26.493622
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 57,
        "nome": "T58 - HOTEL DI FRATELLI",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4940361,
            "lng": -51.9870529,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4928742,
            "lng": -51.9868169,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4918907,
            "lng": -51.9866048,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.494641,
            "lng": -51.9862268,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4940169,
            "lng": -51.9861946,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4931427,
            "lng": -51.9857526,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4921596,
            "lng": -51.9851457,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.4948135,
            "lng": -51.9852483,
            "tipo": "quadra"
          },
          {
            "nome": "9",
            "lat": -26.4932867,
            "lng": -51.9847977,
            "tipo": "quadra"
          },
          {
            "nome": "10",
            "lat": -26.4946598,
            "lng": -51.9842935,
            "tipo": "quadra"
          },
          {
            "nome": "11",
            "lat": -26.4953416,
            "lng": -51.9833279,
            "tipo": "quadra"
          },
          {
            "nome": "12",
            "lat": -26.4970565,
            "lng": -51.9817712,
            "tipo": "quadra"
          },
          {
            "nome": "13",
            "lat": -26.4962302,
            "lng": -51.9814853,
            "tipo": "quadra"
          },
          {
            "nome": "14",
            "lat": -26.4962494,
            "lng": -51.9807128,
            "tipo": "quadra"
          },
          {
            "nome": "15",
            "lat": -26.4962782,
            "lng": -51.9801656,
            "tipo": "quadra"
          },
          {
            "nome": "16",
            "lat": -26.4970272,
            "lng": -51.9807986,
            "tipo": "quadra"
          },
          {
            "nome": "DETRAN-Departamento Estadual de Trânsito",
            "lat": -26.4917571,
            "lng": -51.9858772,
            "tipo": "referencia"
          },
          {
            "nome": "Hotel Di Fratelli",
            "lat": -26.4944316,
            "lng": -51.9873456,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.987077,
              -26.491336
            ],
            [
              -51.987668,
              -26.494226
            ],
            [
              -51.987282,
              -26.494658
            ],
            [
              -51.986467,
              -26.495033
            ],
            [
              -51.984707,
              -26.495504
            ],
            [
              -51.984288,
              -26.495765
            ],
            [
              -51.983548,
              -26.497184
            ],
            [
              -51.983087,
              -26.497443
            ],
            [
              -51.978656,
              -26.497645
            ],
            [
              -51.979471,
              -26.494985
            ],
            [
              -51.983688,
              -26.494774
            ],
            [
              -51.983548,
              -26.493833
            ],
            [
              -51.984396,
              -26.493622
            ],
            [
              -51.984089,
              -26.491836
            ],
            [
              -51.987077,
              -26.491336
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 58,
        "nome": "T59 - SÃO FRANCISCO - OCUPAÇÃO",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.5021888,
            "lng": -51.9998169,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.5017567,
            "lng": -51.9995916,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.5014399,
            "lng": -51.9992483,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.5010942,
            "lng": -51.9987226,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.5005085,
            "lng": -51.998669,
            "tipo": "quadra"
          },
          {
            "nome": "📍",
            "lat": -26.5025153,
            "lng": -52.0000422,
            "tipo": "quadra"
          },
          {
            "nome": "📍",
            "lat": -26.5024384,
            "lng": -51.9987119,
            "tipo": "quadra"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.998618,
              -26.499938
            ],
            [
              -52.000756,
              -26.502473
            ],
            [
              -51.999811,
              -26.503304
            ],
            [
              -51.997794,
              -26.502288
            ],
            [
              -51.997376,
              -26.501268
            ],
            [
              -51.998618,
              -26.499938
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 59,
        "nome": "T60 - SÃO FRANCISCO EM FRENTE A GUARARAPES",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4944239,
            "lng": -51.9969051,
            "tipo": "quadra"
          },
          {
            "nome": "1",
            "lat": -26.4967216,
            "lng": -52.0010722,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4969454,
            "lng": -52.0004338,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4971999,
            "lng": -51.9998652,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4965282,
            "lng": -51.9997343,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4957985,
            "lng": -52.0002121,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4962449,
            "lng": -51.9990319,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4955152,
            "lng": -51.9999975,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.4953376,
            "lng": -52.0016176,
            "tipo": "quadra"
          },
          {
            "nome": "9",
            "lat": -26.4940989,
            "lng": -52.0002443,
            "tipo": "quadra"
          },
          {
            "nome": "10",
            "lat": -26.493009,
            "lng": -51.9994393,
            "tipo": "quadra"
          },
          {
            "nome": "11",
            "lat": -26.4928554,
            "lng": -51.9991174,
            "tipo": "quadra"
          },
          {
            "nome": "12",
            "lat": -26.4931661,
            "lng": -51.9975059,
            "tipo": "quadra"
          },
          {
            "nome": "Mercado Serrinha",
            "lat": -26.4938424,
            "lng": -52.0004573,
            "tipo": "referencia"
          },
          {
            "nome": "Mercearia Machado's",
            "lat": -26.4956933,
            "lng": -52.0009983,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.996366,
              -26.493012
            ],
            [
              -51.997716,
              -26.492748
            ],
            [
              -51.999125,
              -26.492465
            ],
            [
              -51.999725,
              -26.49297
            ],
            [
              -52.000475,
              -26.493742
            ],
            [
              -52.002036,
              -26.494772
            ],
            [
              -52.002489,
              -26.495722
            ],
            [
              -52.003527,
              -26.496864
            ],
            [
              -52.003806,
              -26.497482
            ],
            [
              -52.00254,
              -26.497664
            ],
            [
              -52.000808,
              -26.497093
            ],
            [
              -52.000443,
              -26.497199
            ],
            [
              -51.999493,
              -26.49764
            ],
            [
              -51.998437,
              -26.496719
            ],
            [
              -51.997578,
              -26.494818
            ],
            [
              -51.996076,
              -26.494894
            ],
            [
              -51.995904,
              -26.494721
            ],
            [
              -51.996366,
              -26.493012
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 60,
        "nome": "T61 - SÃO FRANCISCO MERCADO FAMILIAR",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.5013439,
            "lng": -52.0002997,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4998998,
            "lng": -52.0003963,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.5002647,
            "lng": -52.0000208,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.5006526,
            "lng": -51.9996667,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4988244,
            "lng": -51.9997472,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4997942,
            "lng": -51.9995487,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.5001821,
            "lng": -51.9990874,
            "tipo": "quadra"
          },
          {
            "nome": "Mercado Familiar",
            "lat": -26.4999628,
            "lng": -52.000696,
            "tipo": "referencia"
          },
          {
            "nome": "Mercado Vila Nova",
            "lat": -26.499159,
            "lng": -52.0001109,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.999553,
              -26.49772
            ],
            [
              -52.000175,
              -26.499093
            ],
            [
              -52.000218,
              -26.499295
            ],
            [
              -52.001044,
              -26.500351
            ],
            [
              -52.000819,
              -26.500792
            ],
            [
              -52.000626,
              -26.5011
            ],
            [
              -52.00039,
              -26.501964
            ],
            [
              -51.998618,
              -26.499938
            ],
            [
              -51.99907,
              -26.497998
            ],
            [
              -51.999553,
              -26.49772
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 61,
        "nome": "T62 - SÃO FRANCISCO EM FRENTE MERCADO FAMILIAR",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4998326,
            "lng": -52.0022309,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.5000919,
            "lng": -52.0018447,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.5003703,
            "lng": -52.0015872,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4997558,
            "lng": -52.000922,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4994677,
            "lng": -52.0014048,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4991797,
            "lng": -52.0017267,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4987956,
            "lng": -52.001834,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.4981907,
            "lng": -52.001952,
            "tipo": "quadra"
          },
          {
            "nome": "9",
            "lat": -26.4976915,
            "lng": -52.001158,
            "tipo": "quadra"
          },
          {
            "nome": "10",
            "lat": -26.4978019,
            "lng": -52.0003993,
            "tipo": "quadra"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -52.001434,
              -26.500751
            ],
            [
              -52.000254,
              -26.499286
            ],
            [
              -52.000136,
              -26.498917
            ],
            [
              -51.999476,
              -26.497688
            ],
            [
              -52.000748,
              -26.497073
            ],
            [
              -52.002121,
              -26.498019
            ],
            [
              -52.002491,
              -26.499997
            ],
            [
              -52.001434,
              -26.500751
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 62,
        "nome": "T63 - DIVINO - HOTEL ANTARES",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4944012,
            "lng": -51.9907248,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.49467,
            "lng": -51.9897002,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4959086,
            "lng": -51.9900809,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4969264,
            "lng": -51.9917707,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4971521,
            "lng": -51.9912075,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4974209,
            "lng": -51.9921087,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4977384,
            "lng": -51.9912612,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4985607,
            "lng": -51.9916637,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.4998473,
            "lng": -51.9927309,
            "tipo": "quadra"
          },
          {
            "nome": "9",
            "lat": -26.5033928,
            "lng": -51.9936675,
            "tipo": "quadra"
          },
          {
            "nome": "10",
            "lat": -26.5034456,
            "lng": -51.9922621,
            "tipo": "quadra"
          },
          {
            "nome": "11",
            "lat": -26.504794,
            "lng": -51.9926766,
            "tipo": "quadra"
          },
          {
            "nome": "12",
            "lat": -26.5070412,
            "lng": -51.9930023,
            "tipo": "quadra"
          },
          {
            "nome": "13",
            "lat": -26.5101855,
            "lng": -51.9925517,
            "tipo": "quadra"
          },
          {
            "nome": "Hotel Antares",
            "lat": -26.4944467,
            "lng": -51.9896943,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.991196,
              -26.493934
            ],
            [
              -51.991493,
              -26.495564
            ],
            [
              -51.992523,
              -26.497215
            ],
            [
              -51.992872,
              -26.499035
            ],
            [
              -51.993237,
              -26.499784
            ],
            [
              -51.993832,
              -26.501522
            ],
            [
              -51.993848,
              -26.50374
            ],
            [
              -51.993526,
              -26.512131
            ],
            [
              -51.992145,
              -26.511833
            ],
            [
              -51.991096,
              -26.511248
            ],
            [
              -51.990608,
              -26.505295
            ],
            [
              -51.992188,
              -26.502057
            ],
            [
              -51.992555,
              -26.499962
            ],
            [
              -51.991402,
              -26.4989
            ],
            [
              -51.99052,
              -26.4976
            ],
            [
              -51.989849,
              -26.496458
            ],
            [
              -51.989029,
              -26.494321
            ],
            [
              -51.991196,
              -26.493934
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 63,
        "nome": "T64 - BARRACÃO DO KIKO",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4936618,
            "lng": -51.9944799,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4942091,
            "lng": -51.9956708,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.49443,
            "lng": -51.9945335,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4952365,
            "lng": -51.9943833,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4938923,
            "lng": -51.99279,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4939889,
            "lng": -51.9920874,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4941467,
            "lng": -51.9916102,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.495491,
            "lng": -51.9936541,
            "tipo": "quadra"
          },
          {
            "nome": "9",
            "lat": -26.4960383,
            "lng": -51.9944373,
            "tipo": "quadra"
          },
          {
            "nome": "10",
            "lat": -26.4959813,
            "lng": -51.9937288,
            "tipo": "quadra"
          },
          {
            "nome": "11",
            "lat": -26.4973407,
            "lng": -51.9956922,
            "tipo": "quadra"
          },
          {
            "nome": "12",
            "lat": -26.4975044,
            "lng": -51.9948501,
            "tipo": "quadra"
          },
          {
            "nome": "13",
            "lat": -26.4980805,
            "lng": -51.994877,
            "tipo": "quadra"
          },
          {
            "nome": "14",
            "lat": -26.498709,
            "lng": -51.994935,
            "tipo": "quadra"
          },
          {
            "nome": "15",
            "lat": -26.5007109,
            "lng": -51.9965872,
            "tipo": "quadra"
          },
          {
            "nome": "Império das Rações",
            "lat": -26.4936761,
            "lng": -51.9929469,
            "tipo": "referencia"
          },
          {
            "nome": "Loja Richard",
            "lat": -26.4934627,
            "lng": -51.9942709,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.995892,
              -26.4946
            ],
            [
              -51.995967,
              -26.494946
            ],
            [
              -51.995409,
              -26.495037
            ],
            [
              -51.99549,
              -26.495714
            ],
            [
              -51.997061,
              -26.499694
            ],
            [
              -51.997394,
              -26.50101
            ],
            [
              -51.995693,
              -26.502392
            ],
            [
              -51.994159,
              -26.501423
            ],
            [
              -51.993199,
              -26.499027
            ],
            [
              -51.992593,
              -26.497155
            ],
            [
              -51.991702,
              -26.495729
            ],
            [
              -51.991509,
              -26.49535
            ],
            [
              -51.991196,
              -26.493934
            ],
            [
              -51.995929,
              -26.493045
            ],
            [
              -51.995892,
              -26.4946
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 64,
        "nome": "T65 - SERRINHA",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4917992,
            "lng": -51.9997397,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4925673,
            "lng": -52.000083,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4919336,
            "lng": -52.0008126,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4924905,
            "lng": -52.0009843,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4933404,
            "lng": -52.0009038,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4920296,
            "lng": -52.0028082,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4926249,
            "lng": -52.0024648,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.493422,
            "lng": -52.0027491,
            "tipo": "quadra"
          },
          {
            "nome": "9",
            "lat": -26.4939069,
            "lng": -52.001848,
            "tipo": "quadra"
          },
          {
            "nome": "10",
            "lat": -26.4938732,
            "lng": -52.0013061,
            "tipo": "quadra"
          },
          {
            "nome": "11",
            "lat": -26.4938156,
            "lng": -52.0033661,
            "tipo": "quadra"
          },
          {
            "nome": "12",
            "lat": -26.4942733,
            "lng": -52.0025266,
            "tipo": "quadra"
          },
          {
            "nome": "13",
            "lat": -26.4943933,
            "lng": -52.0019527,
            "tipo": "quadra"
          },
          {
            "nome": "14",
            "lat": -26.4924729,
            "lng": -52.0045651,
            "tipo": "quadra"
          },
          {
            "nome": "15",
            "lat": -26.4934307,
            "lng": -52.0094816,
            "tipo": "quadra"
          },
          {
            "nome": "Posto Delta",
            "lat": -26.4947707,
            "lng": -52.0090632,
            "tipo": "referencia"
          },
          {
            "nome": "Retifica Wilson",
            "lat": -26.4919269,
            "lng": -52.0027854,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.9987584,
              -26.4914372
            ],
            [
              -51.9997874,
              -26.4914252
            ],
            [
              -52.0031234,
              -26.4917372
            ],
            [
              -52.0068304,
              -26.4921892
            ],
            [
              -52.0077544,
              -26.4919552
            ],
            [
              -52.0079804,
              -26.4919592
            ],
            [
              -52.0088714,
              -26.4921482
            ],
            [
              -52.0098974,
              -26.4923692
            ],
            [
              -52.0108683,
              -26.4925852
            ],
            [
              -52.0114043,
              -26.4927402
            ],
            [
              -52.0118443,
              -26.4931722
            ],
            [
              -52.0071794,
              -26.4964312
            ],
            [
              -52.0057684,
              -26.4974152
            ],
            [
              -52.0049044,
              -26.4980802
            ],
            [
              -52.0042494,
              -26.4987552
            ],
            [
              -52.0036804,
              -26.4970542
            ],
            [
              -52.0034364,
              -26.4966172
            ],
            [
              -52.0029824,
              -26.4961372
            ],
            [
              -52.0025474,
              -26.4957072
            ],
            [
              -52.0024634,
              -26.4955402
            ],
            [
              -52.0023254,
              -26.4951842
            ],
            [
              -52.0020934,
              -26.4947552
            ],
            [
              -52.0019174,
              -26.4945812
            ],
            [
              -52.0015454,
              -26.4943132
            ],
            [
              -52.0007424,
              -26.4938122
            ],
            [
              -52.0003914,
              -26.4935072
            ],
            [
              -51.9997244,
              -26.4927302
            ],
            [
              -51.9992844,
              -26.4924222
            ],
            [
              -51.9989874,
              -26.4923372
            ],
            [
              -51.9987584,
              -26.4914372
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 65,
        "nome": "T66 - ALTO DA GLÓRIA COLÉGIO CAIC",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4830661,
            "lng": -52.0093234,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4830709,
            "lng": -52.0088513,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4827519,
            "lng": -52.0085485,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4849482,
            "lng": -52.0076819,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4846313,
            "lng": -52.0067699,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4850923,
            "lng": -52.006094,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4853083,
            "lng": -52.0050426,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.4834663,
            "lng": -52.0027373,
            "tipo": "quadra"
          },
          {
            "nome": "9",
            "lat": -26.4828181,
            "lng": -52.0035688,
            "tipo": "quadra"
          },
          {
            "nome": "10",
            "lat": -26.482722,
            "lng": -52.0040623,
            "tipo": "quadra"
          },
          {
            "nome": "11",
            "lat": -26.4825685,
            "lng": -52.0055697,
            "tipo": "quadra"
          },
          {
            "nome": "12",
            "lat": -26.4825301,
            "lng": -52.0058647,
            "tipo": "quadra"
          },
          {
            "nome": "13",
            "lat": -26.4824869,
            "lng": -52.0062134,
            "tipo": "quadra"
          },
          {
            "nome": "CAIC Senhor Bom Jesus",
            "lat": -26.4822307,
            "lng": -52.0072274,
            "tipo": "referencia"
          },
          {
            "nome": "Mercado Nossa Senhora Aparecida",
            "lat": -26.4825656,
            "lng": -52.0026609,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -52.00244,
              -26.48254
            ],
            [
              -52.005676,
              -26.48204
            ],
            [
              -52.007884,
              -26.481636
            ],
            [
              -52.008698,
              -26.48129
            ],
            [
              -52.010576,
              -26.482827
            ],
            [
              -52.009771,
              -26.483874
            ],
            [
              -52.008047,
              -26.484997
            ],
            [
              -52.006149,
              -26.485581
            ],
            [
              -52.005506,
              -26.485781
            ],
            [
              -52.004948,
              -26.485738
            ],
            [
              -52.004698,
              -26.485425
            ],
            [
              -52.004163,
              -26.485412
            ],
            [
              -52.003853,
              -26.484926
            ],
            [
              -52.003328,
              -26.484112
            ],
            [
              -52.002738,
              -26.483975
            ],
            [
              -52.00256,
              -26.483836
            ],
            [
              -52.002479,
              -26.482969
            ],
            [
              -52.00244,
              -26.48254
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 66,
        "nome": "T67 - ALTO DA GLÓRIA",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4789749,
            "lng": -52.0053328,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4787733,
            "lng": -52.0048608,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4782931,
            "lng": -52.0049466,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4778705,
            "lng": -52.0049251,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4779186,
            "lng": -52.004099,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4774,
            "lng": -52.0043458,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4772271,
            "lng": -52.003863,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.4766893,
            "lng": -52.0034016,
            "tipo": "quadra"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -52.0053637,
              -26.478112
            ],
            [
              -52.0055287,
              -26.479116
            ],
            [
              -52.0049127,
              -26.479236
            ],
            [
              -52.0026117,
              -26.477128
            ],
            [
              -52.0034217,
              -26.476273
            ],
            [
              -52.0053637,
              -26.478112
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 67,
        "nome": "T68 - OCUPAÇÃO ATRÁS DOS BOMBEIROS",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4798104,
            "lng": -52.0104397,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4799689,
            "lng": -52.0098389,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4782643,
            "lng": -52.0091737,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.47873,
            "lng": -52.0083208,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4792246,
            "lng": -52.0079507,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4797768,
            "lng": -52.0075564,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4786292,
            "lng": -52.0069207,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.4792195,
            "lng": -52.0063702,
            "tipo": "quadra"
          },
          {
            "nome": "9",
            "lat": -26.4782163,
            "lng": -52.006792,
            "tipo": "quadra"
          },
          {
            "nome": "10",
            "lat": -26.478754,
            "lng": -52.0059229,
            "tipo": "quadra"
          },
          {
            "nome": "11",
            "lat": -26.4775632,
            "lng": -52.0063521,
            "tipo": "quadra"
          },
          {
            "nome": "12",
            "lat": -26.4779666,
            "lng": -52.0060731,
            "tipo": "quadra"
          },
          {
            "nome": "13",
            "lat": -26.4777265,
            "lng": -52.0087768,
            "tipo": "quadra"
          },
          {
            "nome": "14",
            "lat": -26.4779233,
            "lng": -52.0073391,
            "tipo": "quadra"
          },
          {
            "nome": "15",
            "lat": -26.477011,
            "lng": -52.0064218,
            "tipo": "quadra"
          },
          {
            "nome": "HLM chapeação e pintura em geral",
            "lat": -26.4793348,
            "lng": -52.0056815,
            "tipo": "referencia"
          },
          {
            "nome": "Mercearia Muniz",
            "lat": -26.478252,
            "lng": -52.006125,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -52.0107,
              -26.479127
            ],
            [
              -52.010705,
              -26.480054
            ],
            [
              -52.01019,
              -26.480145
            ],
            [
              -52.009756,
              -26.480443
            ],
            [
              -52.009042,
              -26.47955
            ],
            [
              -52.00842,
              -26.479895
            ],
            [
              -52.007099,
              -26.480062
            ],
            [
              -52.006993,
              -26.479492
            ],
            [
              -52.005628,
              -26.479674
            ],
            [
              -52.005368,
              -26.478061
            ],
            [
              -52.005191,
              -26.477821
            ],
            [
              -52.006199,
              -26.477144
            ],
            [
              -52.005282,
              -26.475968
            ],
            [
              -52.006296,
              -26.47567
            ],
            [
              -52.007969,
              -26.477034
            ],
            [
              -52.009708,
              -26.477096
            ],
            [
              -52.009992,
              -26.478061
            ],
            [
              -52.0107,
              -26.479127
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 68,
        "nome": "T69 - LAGOÃO ALCAST",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4751412,
            "lng": -52.0059994,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4733742,
            "lng": -52.0058063,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4743345,
            "lng": -52.0049695,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4723802,
            "lng": -52.0064989,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4718197,
            "lng": -52.0064596,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4733742,
            "lng": -52.004197,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4733742,
            "lng": -52.0033816,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4739792,
            "lng": -52.0037371,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.4749204,
            "lng": -52.0042146,
            "tipo": "quadra"
          },
          {
            "nome": "9",
            "lat": -26.4739504,
            "lng": -52.0028022,
            "tipo": "quadra"
          },
          {
            "nome": "10",
            "lat": -26.4744882,
            "lng": -52.0013002,
            "tipo": "quadra"
          },
          {
            "nome": "11",
            "lat": -26.475218,
            "lng": -52.003682,
            "tipo": "quadra"
          },
          {
            "nome": "12",
            "lat": -26.4751988,
            "lng": -52.0023726,
            "tipo": "quadra"
          },
          {
            "nome": "13",
            "lat": -26.4749107,
            "lng": -52.0003019,
            "tipo": "quadra"
          },
          {
            "nome": "14",
            "lat": -26.4765097,
            "lng": -52.0008062,
            "tipo": "quadra"
          },
          {
            "nome": "15",
            "lat": -26.4753861,
            "lng": -52.0031343,
            "tipo": "quadra"
          },
          {
            "nome": "Alcast do Brasil",
            "lat": -26.47287,
            "lng": -52.003852,
            "tipo": "referencia"
          },
          {
            "nome": "Posto Idaza Lagoão",
            "lat": -26.4750457,
            "lng": -51.9992901,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.999715,
              -26.476894
            ],
            [
              -51.998595,
              -26.475135
            ],
            [
              -51.999312,
              -26.474868
            ],
            [
              -52.002555,
              -26.473312
            ],
            [
              -52.006767,
              -26.47109
            ],
            [
              -52.0073,
              -26.471931
            ],
            [
              -52.007048,
              -26.474028
            ],
            [
              -52.00742,
              -26.474457
            ],
            [
              -52.00687,
              -26.47477
            ],
            [
              -52.006056,
              -26.475431
            ],
            [
              -52.005422,
              -26.475827
            ],
            [
              -52.004786,
              -26.476235
            ],
            [
              -52.0037,
              -26.476488
            ],
            [
              -52.003426,
              -26.476215
            ],
            [
              -52.003288,
              -26.476348
            ],
            [
              -52.003084,
              -26.476656
            ],
            [
              -52.002669,
              -26.47703
            ],
            [
              -52.002084,
              -26.47715
            ],
            [
              -52.001503,
              -26.477203
            ],
            [
              -51.999715,
              -26.476894
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 69,
        "nome": "T70 - VILA OPERARIA PROXIMO A PARQUE DE EXPOSIÇÃO",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4786774,
            "lng": -52.0127995,
            "tipo": "quadra"
          },
          {
            "nome": "1",
            "lat": -26.4757867,
            "lng": -52.0167585,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4765262,
            "lng": -52.0154281,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4772561,
            "lng": -52.0139475,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4760364,
            "lng": -52.015192,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4753114,
            "lng": -52.0157124,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4754074,
            "lng": -52.014956,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4755755,
            "lng": -52.0139797,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.4749416,
            "lng": -52.0135827,
            "tipo": "quadra"
          },
          {
            "nome": "9",
            "lat": -26.4750905,
            "lng": -52.0114047,
            "tipo": "quadra"
          },
          {
            "nome": "10",
            "lat": -26.4749752,
            "lng": -52.0109854,
            "tipo": "quadra"
          },
          {
            "nome": "11",
            "lat": -26.4745719,
            "lng": -52.0113931,
            "tipo": "quadra"
          },
          {
            "nome": "12",
            "lat": -26.4745286,
            "lng": -52.0118142,
            "tipo": "quadra"
          },
          {
            "nome": "13",
            "lat": -26.4749418,
            "lng": -52.0119876,
            "tipo": "quadra"
          },
          {
            "nome": "14",
            "lat": -26.4739354,
            "lng": -52.0141682,
            "tipo": "quadra"
          },
          {
            "nome": "15",
            "lat": -26.4751935,
            "lng": -52.0164964,
            "tipo": "quadra"
          },
          {
            "nome": "Escola Municipal Pequena Águia",
            "lat": -26.4746597,
            "lng": -52.0137577,
            "tipo": "referencia"
          },
          {
            "nome": "Metalmaq",
            "lat": -26.4775912,
            "lng": -52.0141371,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -52.010994,
              -26.475565
            ],
            [
              -52.010768,
              -26.474662
            ],
            [
              -52.011109,
              -26.473321
            ],
            [
              -52.011326,
              -26.47332
            ],
            [
              -52.011557,
              -26.474335
            ],
            [
              -52.01341,
              -26.474136
            ],
            [
              -52.014518,
              -26.47324
            ],
            [
              -52.015371,
              -26.473692
            ],
            [
              -52.017356,
              -26.473721
            ],
            [
              -52.017393,
              -26.474777
            ],
            [
              -52.017839,
              -26.476352
            ],
            [
              -52.015924,
              -26.476659
            ],
            [
              -52.015387,
              -26.476828
            ],
            [
              -52.0125063,
              -26.4796081
            ],
            [
              -52.010994,
              -26.475565
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 70,
        "nome": "T71 - LAGOÃO MERCADO MARTINELLI",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4737892,
            "lng": -52.0125206,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4728881,
            "lng": -52.0122156,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4722927,
            "lng": -52.0121942,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4716012,
            "lng": -52.0124517,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4709481,
            "lng": -52.012516,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4703335,
            "lng": -52.0127092,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4700838,
            "lng": -52.0115934,
            "tipo": "quadra"
          },
          {
            "nome": "Mercado MARTINELLI",
            "lat": -26.4702656,
            "lng": -52.0129727,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -52.013062,
              -26.470175
            ],
            [
              -52.013137,
              -26.47201
            ],
            [
              -52.012979,
              -26.472459
            ],
            [
              -52.012864,
              -26.472978
            ],
            [
              -52.012958,
              -26.473542
            ],
            [
              -52.013376,
              -26.474041
            ],
            [
              -52.011576,
              -26.474291
            ],
            [
              -52.01141,
              -26.473395
            ],
            [
              -52.011917,
              -26.470584
            ],
            [
              -52.01075,
              -26.47036
            ],
            [
              -52.010772,
              -26.469712
            ],
            [
              -52.013062,
              -26.470175
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 71,
        "nome": "T72 - LAGOÃO ESCOLA NERASI",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4727729,
            "lng": -52.0109282,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4721006,
            "lng": -52.01125,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4719277,
            "lng": -52.0100269,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4718413,
            "lng": -52.0091472,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4716108,
            "lng": -52.0086215,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4713515,
            "lng": -52.0109067,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4713515,
            "lng": -52.0103274,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.4714763,
            "lng": -52.0092437,
            "tipo": "quadra"
          },
          {
            "nome": "9",
            "lat": -26.4709145,
            "lng": -52.0112124,
            "tipo": "quadra"
          },
          {
            "nome": "10",
            "lat": -26.4718077,
            "lng": -52.0079127,
            "tipo": "quadra"
          },
          {
            "nome": "11",
            "lat": -26.4700213,
            "lng": -52.010399,
            "tipo": "quadra"
          },
          {
            "nome": "Escola Municipal Nerasi Menin Calza",
            "lat": -26.4706895,
            "lng": -52.0082638,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -52.010722,
              -26.469729
            ],
            [
              -52.010695,
              -26.470361
            ],
            [
              -52.011846,
              -26.470615
            ],
            [
              -52.011399,
              -26.473333
            ],
            [
              -52.007526,
              -26.472157
            ],
            [
              -52.007493,
              -26.47075
            ],
            [
              -52.009489,
              -26.469808
            ],
            [
              -52.010722,
              -26.469729
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 72,
        "nome": "T73 - PALMAS 1 - LADO A",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4701306,
            "lng": -52.0169411,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4700249,
            "lng": -52.0164368,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4698232,
            "lng": -52.0159219,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4702746,
            "lng": -52.015836,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4700921,
            "lng": -52.0148168,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4701402,
            "lng": -52.0140658,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4703707,
            "lng": -52.0134435,
            "tipo": "quadra"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -52.017373,
              -26.470487
            ],
            [
              -52.01313,
              -26.470487
            ],
            [
              -52.013108,
              -26.470098
            ],
            [
              -52.014771,
              -26.469344
            ],
            [
              -52.017191,
              -26.469719
            ],
            [
              -52.017373,
              -26.470487
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 73,
        "nome": "T74 - PALMAS 1 - LADO B",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4714847,
            "lng": -52.016984,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4706108,
            "lng": -52.0162652,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4710525,
            "lng": -52.0161686,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4713983,
            "lng": -52.0162652,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4707309,
            "lng": -52.0149108,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4711198,
            "lng": -52.0149108,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.471672,
            "lng": -52.015423,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.4709661,
            "lng": -52.0135428,
            "tipo": "quadra"
          },
          {
            "nome": "9",
            "lat": -26.4717825,
            "lng": -52.0142696,
            "tipo": "quadra"
          },
          {
            "nome": "10",
            "lat": -26.4716384,
            "lng": -52.0137332,
            "tipo": "quadra"
          },
          {
            "nome": "11",
            "lat": -26.4716384,
            "lng": -52.0133791,
            "tipo": "quadra"
          },
          {
            "nome": "12",
            "lat": -26.4723443,
            "lng": -52.0139638,
            "tipo": "quadra"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -52.017378,
              -26.47052
            ],
            [
              -52.017507,
              -26.4709
            ],
            [
              -52.017523,
              -26.47198
            ],
            [
              -52.014836,
              -26.472557
            ],
            [
              -52.013049,
              -26.472552
            ],
            [
              -52.013194,
              -26.471889
            ],
            [
              -52.013173,
              -26.470535
            ],
            [
              -52.017378,
              -26.47052
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 74,
        "nome": "T76 - ELDORADO - DIVISÃO A",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4691254,
            "lng": -52.0198355,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4689524,
            "lng": -52.0192453,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4687652,
            "lng": -52.0188537,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4685251,
            "lng": -52.0182636,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4680256,
            "lng": -52.0191219,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4676127,
            "lng": -52.0196584,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4677567,
            "lng": -52.0202485,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.467824,
            "lng": -52.0208815,
            "tipo": "quadra"
          },
          {
            "nome": "9",
            "lat": -26.4677951,
            "lng": -52.0217612,
            "tipo": "quadra"
          },
          {
            "nome": "CMEI Vovó Maria do Eldorado",
            "lat": -26.46861,
            "lng": -52.0204459,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -52.022167,
              -26.467655
            ],
            [
              -52.02156,
              -26.468605
            ],
            [
              -52.020724,
              -26.46848
            ],
            [
              -52.019275,
              -26.469964
            ],
            [
              -52.01758,
              -26.468874
            ],
            [
              -52.019104,
              -26.467376
            ],
            [
              -52.021453,
              -26.467482
            ],
            [
              -52.022167,
              -26.467655
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 75,
        "nome": "T77 - ELDORADO - DIVISÃO C",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4694567,
            "lng": -52.0269004,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.469764,
            "lng": -52.026439,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4696007,
            "lng": -52.0260313,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4695239,
            "lng": -52.0253339,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4693798,
            "lng": -52.0250443,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4696968,
            "lng": -52.0244756,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4695431,
            "lng": -52.0238855,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.4694471,
            "lng": -52.0235315,
            "tipo": "quadra"
          },
          {
            "nome": "9",
            "lat": -26.4690053,
            "lng": -52.0231882,
            "tipo": "quadra"
          },
          {
            "nome": "10",
            "lat": -26.4691486,
            "lng": -52.0227067,
            "tipo": "quadra"
          },
          {
            "nome": "11",
            "lat": -26.4691054,
            "lng": -52.02224,
            "tipo": "quadra"
          },
          {
            "nome": "12",
            "lat": -26.4690478,
            "lng": -52.0254479,
            "tipo": "quadra"
          },
          {
            "nome": "13",
            "lat": -26.4689806,
            "lng": -52.024949,
            "tipo": "quadra"
          },
          {
            "nome": "14",
            "lat": -26.468971,
            "lng": -52.0244716,
            "tipo": "quadra"
          },
          {
            "nome": "15",
            "lat": -26.4689902,
            "lng": -52.0239405,
            "tipo": "quadra"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -52.021968,
              -26.468586
            ],
            [
              -52.024661,
              -26.468858
            ],
            [
              -52.02715,
              -26.469057
            ],
            [
              -52.027182,
              -26.470219
            ],
            [
              -52.024538,
              -26.470046
            ],
            [
              -52.02243,
              -26.469724
            ],
            [
              -52.022011,
              -26.469744
            ],
            [
              -52.021968,
              -26.468586
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 76,
        "nome": "T78 - ELDORADO - DIVISÃO B",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.46804,
            "lng": -52.0258865,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.467968,
            "lng": -52.0255163,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4681889,
            "lng": -52.0249155,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4684963,
            "lng": -52.0244113,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.468405,
            "lng": -52.0239821,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4680345,
            "lng": -52.023624,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4682177,
            "lng": -52.0228556,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.468016,
            "lng": -52.0224372,
            "tipo": "quadra"
          },
          {
            "nome": "Supermercado supereconômico",
            "lat": -26.4686659,
            "lng": -52.023618,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -52.026136,
              -26.467065
            ],
            [
              -52.026001,
              -26.468919
            ],
            [
              -52.02157,
              -26.468535
            ],
            [
              -52.022278,
              -26.467613
            ],
            [
              -52.024708,
              -26.467176
            ],
            [
              -52.026136,
              -26.467065
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 77,
        "nome": "T79 - EM FRENTE AO PALMAS 1",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4685295,
            "lng": -52.0167614,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4687776,
            "lng": -52.016297,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4686239,
            "lng": -52.015546,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4686239,
            "lng": -52.0147306,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4690081,
            "lng": -52.013765,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4692962,
            "lng": -52.0125419,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4692386,
            "lng": -52.0110614,
            "tipo": "quadra"
          },
          {
            "nome": "CRISTO REI AGROPECUARIA",
            "lat": -26.4695798,
            "lng": -52.0101943,
            "tipo": "referencia"
          },
          {
            "nome": "Mercado Melpan",
            "lat": -26.4690798,
            "lng": -52.0162662,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -52.016935,
              -26.46796
            ],
            [
              -52.017342,
              -26.469413
            ],
            [
              -52.014773,
              -26.46928
            ],
            [
              -52.013169,
              -26.470015
            ],
            [
              -52.01289,
              -26.470049
            ],
            [
              -52.011876,
              -26.469765
            ],
            [
              -52.01054,
              -26.469583
            ],
            [
              -52.009548,
              -26.469756
            ],
            [
              -52.00936,
              -26.469448
            ],
            [
              -52.014596,
              -26.46819
            ],
            [
              -52.016935,
              -26.46796
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 78,
        "nome": "T80 - LAGOÃO - UPA DIVISÃO A",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4642923,
            "lng": -52.0131588,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4642358,
            "lng": -52.0120044,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4650426,
            "lng": -52.0122941,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4650042,
            "lng": -52.0115646,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4650282,
            "lng": -52.0106955,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4644279,
            "lng": -52.0094081,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4654881,
            "lng": -52.0099617,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.4639715,
            "lng": -52.0085398,
            "tipo": "quadra"
          },
          {
            "nome": "9",
            "lat": -26.4643173,
            "lng": -52.0080409,
            "tipo": "quadra"
          },
          {
            "nome": "10",
            "lat": -26.4668477,
            "lng": -52.0065604,
            "tipo": "quadra"
          },
          {
            "nome": "11",
            "lat": -26.4675638,
            "lng": -52.0076815,
            "tipo": "quadra"
          },
          {
            "nome": "12",
            "lat": -26.4652155,
            "lng": -52.0072041,
            "tipo": "quadra"
          },
          {
            "nome": "UPA - Unidade de Pronto Atendimento - Palmas, PR",
            "lat": -26.4663713,
            "lng": -52.0073017,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -52.013969,
              -26.463924
            ],
            [
              -52.01381,
              -26.46437
            ],
            [
              -52.011419,
              -26.466098
            ],
            [
              -52.010525,
              -26.466973
            ],
            [
              -52.009597,
              -26.466331
            ],
            [
              -52.007805,
              -26.468214
            ],
            [
              -52.006855,
              -26.467475
            ],
            [
              -52.005829,
              -26.466598
            ],
            [
              -52.005755,
              -26.464736
            ],
            [
              -52.008014,
              -26.463544
            ],
            [
              -52.0093,
              -26.462924
            ],
            [
              -52.01005,
              -26.46335
            ],
            [
              -52.009372,
              -26.463952
            ],
            [
              -52.013969,
              -26.463924
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 79,
        "nome": "T81 - LAGOÃO - UPA DIVISÃO B",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4680093,
            "lng": -52.0133359,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4676924,
            "lng": -52.0124937,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4682398,
            "lng": -52.0116407,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.468919,
            "lng": -52.010523,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4687269,
            "lng": -52.0095144,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4678337,
            "lng": -52.0105789,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4668711,
            "lng": -52.011453,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.4671881,
            "lng": -52.0096827,
            "tipo": "quadra"
          },
          {
            "nome": "9",
            "lat": -26.4680957,
            "lng": -52.008755,
            "tipo": "quadra"
          },
          {
            "nome": "Mecânica Car Racing",
            "lat": -26.4686866,
            "lng": -52.0111437,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -52.01448,
              -26.468139
            ],
            [
              -52.00931,
              -26.46938
            ],
            [
              -52.007857,
              -26.468202
            ],
            [
              -52.009619,
              -26.466413
            ],
            [
              -52.010546,
              -26.467082
            ],
            [
              -52.011501,
              -26.46614
            ],
            [
              -52.01448,
              -26.468139
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 80,
        "nome": "T82- AEROPORTO LADO ESQUERDO",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4773037,
            "lng": -51.9831313,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4773902,
            "lng": -51.9811381,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4775006,
            "lng": -51.9804974,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4772797,
            "lng": -51.9791747,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4769724,
            "lng": -51.9776942,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.476569,
            "lng": -51.9785954,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4758344,
            "lng": -51.9791962,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.4758007,
            "lng": -51.9786598,
            "tipo": "quadra"
          },
          {
            "nome": "9",
            "lat": -26.4748596,
            "lng": -51.9783164,
            "tipo": "quadra"
          },
          {
            "nome": "10",
            "lat": -26.4738512,
            "lng": -51.980548,
            "tipo": "quadra"
          },
          {
            "nome": "11",
            "lat": -26.4737792,
            "lng": -51.980017,
            "tipo": "quadra"
          },
          {
            "nome": "12",
            "lat": -26.4737312,
            "lng": -51.9793893,
            "tipo": "quadra"
          },
          {
            "nome": "13",
            "lat": -26.4737647,
            "lng": -51.9789172,
            "tipo": "quadra"
          },
          {
            "nome": "14",
            "lat": -26.4739088,
            "lng": -51.9781716,
            "tipo": "quadra"
          },
          {
            "nome": "15",
            "lat": -26.4721705,
            "lng": -51.9797541,
            "tipo": "quadra"
          },
          {
            "nome": "16",
            "lat": -26.4724202,
            "lng": -51.9790245,
            "tipo": "quadra"
          },
          {
            "nome": "17",
            "lat": -26.4722473,
            "lng": -51.9784881,
            "tipo": "quadra"
          },
          {
            "nome": "18",
            "lat": -26.4726507,
            "lng": -51.9778658,
            "tipo": "quadra"
          },
          {
            "nome": "19",
            "lat": -26.4716423,
            "lng": -51.977029,
            "tipo": "quadra"
          },
          {
            "nome": "20",
            "lat": -26.4697167,
            "lng": -51.9763959,
            "tipo": "quadra"
          },
          {
            "nome": "21",
            "lat": -26.4699856,
            "lng": -51.975484,
            "tipo": "quadra"
          },
          {
            "nome": "22",
            "lat": -26.4686218,
            "lng": -51.9761562,
            "tipo": "quadra"
          },
          {
            "nome": "23",
            "lat": -26.4678089,
            "lng": -51.9769555,
            "tipo": "quadra"
          },
          {
            "nome": "Aeroporto de Palmas paraná (SSPS)",
            "lat": -26.4735478,
            "lng": -51.9756746,
            "tipo": "referencia"
          },
          {
            "nome": "Cemitério Jardim da Paz",
            "lat": -26.4709909,
            "lng": -51.9774527,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.977036,
              -26.46758
            ],
            [
              -51.978109,
              -26.467462
            ],
            [
              -51.97959,
              -26.471294
            ],
            [
              -51.980266,
              -26.472609
            ],
            [
              -51.984182,
              -26.476777
            ],
            [
              -51.982755,
              -26.478179
            ],
            [
              -51.981166,
              -26.477616
            ],
            [
              -51.9768,
              -26.478289
            ],
            [
              -51.974096,
              -26.468041
            ],
            [
              -51.977036,
              -26.46758
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 81,
        "nome": "T83- AEROPORTO LADO DIREITO ",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4745592,
            "lng": -51.9750331,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4759518,
            "lng": -51.9746039,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4747609,
            "lng": -51.9728659,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.474396,
            "lng": -51.9734881,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4742711,
            "lng": -51.9742177,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4709131,
            "lng": -51.9743732,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.470817,
            "lng": -51.9735299,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.4709371,
            "lng": -51.9718359,
            "tipo": "quadra"
          },
          {
            "nome": "9",
            "lat": -26.4698518,
            "lng": -51.9711438,
            "tipo": "quadra"
          },
          {
            "nome": "10",
            "lat": -26.4692179,
            "lng": -51.9716696,
            "tipo": "quadra"
          },
          {
            "nome": "Escola Municipal Tia Dalva",
            "lat": -26.4751795,
            "lng": -51.9745242,
            "tipo": "referencia"
          },
          {
            "nome": "Mercearia Dois Irmãos",
            "lat": -26.4727037,
            "lng": -51.9745621,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.97043,
              -26.468748
            ],
            [
              -51.97403,
              -26.468124
            ],
            [
              -51.976595,
              -26.47829
            ],
            [
              -51.975672,
              -26.478367
            ],
            [
              -51.975822,
              -26.477579
            ],
            [
              -51.971724,
              -26.475178
            ],
            [
              -51.969342,
              -26.470357
            ],
            [
              -51.97043,
              -26.468748
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 82,
        "nome": "T84 - ROCIO LADO ESQUERDO",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4661827,
            "lng": -51.9730371,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4661987,
            "lng": -51.9724185,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4647324,
            "lng": -51.9737345,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4651326,
            "lng": -51.9727726,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.465276,
            "lng": -51.9718645,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4640025,
            "lng": -51.9739813,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4640072,
            "lng": -51.9733751,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.4640265,
            "lng": -51.9729084,
            "tipo": "quadra"
          },
          {
            "nome": "9",
            "lat": -26.46309,
            "lng": -51.9732195,
            "tipo": "quadra"
          },
          {
            "nome": "10",
            "lat": -26.4631188,
            "lng": -51.9725865,
            "tipo": "quadra"
          },
          {
            "nome": "11",
            "lat": -26.4622256,
            "lng": -51.9725972,
            "tipo": "quadra"
          },
          {
            "nome": "12",
            "lat": -26.4628211,
            "lng": -51.9712132,
            "tipo": "quadra"
          },
          {
            "nome": "13",
            "lat": -26.461851,
            "lng": -51.9720286,
            "tipo": "quadra"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.972907,
              -26.467004
            ],
            [
              -51.971106,
              -26.464593
            ],
            [
              -51.969777,
              -26.46174
            ],
            [
              -51.971206,
              -26.461264
            ],
            [
              -51.973755,
              -26.461177
            ],
            [
              -51.974086,
              -26.463516
            ],
            [
              -51.974174,
              -26.464149
            ],
            [
              -51.973946,
              -26.464842
            ],
            [
              -51.973525,
              -26.465401
            ],
            [
              -51.973489,
              -26.465697
            ],
            [
              -51.973475,
              -26.465838
            ],
            [
              -51.9735,
              -26.465995
            ],
            [
              -51.973043,
              -26.466555
            ],
            [
              -51.972907,
              -26.467004
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 83,
        "nome": "T85 - ROCIO LADO DIREITO ",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4672281,
            "lng": -51.9710995,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4637341,
            "lng": -51.9679023,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4642295,
            "lng": -51.9674433,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4641719,
            "lng": -51.966703,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4642391,
            "lng": -51.9660378,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4649787,
            "lng": -51.9658018,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4643056,
            "lng": -51.9653926,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.4626488,
            "lng": -51.9678165,
            "tipo": "quadra"
          },
          {
            "nome": "9",
            "lat": -26.4627083,
            "lng": -51.9670437,
            "tipo": "quadra"
          },
          {
            "nome": "10",
            "lat": -26.4627947,
            "lng": -51.9663893,
            "tipo": "quadra"
          },
          {
            "nome": "11",
            "lat": -26.463102,
            "lng": -51.9657133,
            "tipo": "quadra"
          },
          {
            "nome": "12",
            "lat": -26.4631098,
            "lng": -51.9649849,
            "tipo": "quadra"
          },
          {
            "nome": "13",
            "lat": -26.4611985,
            "lng": -51.9689859,
            "tipo": "quadra"
          },
          {
            "nome": "14",
            "lat": -26.4614002,
            "lng": -51.968074,
            "tipo": "quadra"
          },
          {
            "nome": "15",
            "lat": -26.4616709,
            "lng": -51.9667862,
            "tipo": "quadra"
          },
          {
            "nome": "16",
            "lat": -26.4618246,
            "lng": -51.9653378,
            "tipo": "quadra"
          },
          {
            "nome": "17",
            "lat": -26.4601516,
            "lng": -51.968074,
            "tipo": "quadra"
          },
          {
            "nome": "18",
            "lat": -26.4603647,
            "lng": -51.9668613,
            "tipo": "quadra"
          },
          {
            "nome": "19",
            "lat": -26.4592871,
            "lng": -51.9679881,
            "tipo": "quadra"
          },
          {
            "nome": "Colégio Estadual Quilombola Maria Joana Ferreira",
            "lat": -26.4681296,
            "lng": -51.9703758,
            "tipo": "referencia"
          },
          {
            "nome": "📍",
            "lat": -26.464047,
            "lng": -51.9653511,
            "tipo": "quadra"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.970468,
              -26.468671
            ],
            [
              -51.968819,
              -26.465315
            ],
            [
              -51.964966,
              -26.466132
            ],
            [
              -51.963872,
              -26.462636
            ],
            [
              -51.964585,
              -26.461718
            ],
            [
              -51.965886,
              -26.458974
            ],
            [
              -51.96709,
              -26.457055
            ],
            [
              -51.968907,
              -26.459172
            ],
            [
              -51.969572,
              -26.461381
            ],
            [
              -51.970318,
              -26.463604
            ],
            [
              -51.972957,
              -26.467878
            ],
            [
              -51.970468,
              -26.468671
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 84,
        "nome": "T86- FORTUNATO",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4806406,
            "lng": -51.9764889,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4799107,
            "lng": -51.9750083,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4807558,
            "lng": -51.9740427,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4814088,
            "lng": -51.9732059,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.481889,
            "lng": -51.9726265,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4823307,
            "lng": -51.9719399,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4822347,
            "lng": -51.9712532,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.4822923,
            "lng": -51.9704808,
            "tipo": "quadra"
          },
          {
            "nome": "9",
            "lat": -26.4793057,
            "lng": -51.9742251,
            "tipo": "quadra"
          },
          {
            "nome": "10",
            "lat": -26.4797666,
            "lng": -51.9737128,
            "tipo": "quadra"
          },
          {
            "nome": "11",
            "lat": -26.4805877,
            "lng": -51.9728379,
            "tipo": "quadra"
          },
          {
            "nome": "12",
            "lat": -26.478355,
            "lng": -51.972884,
            "tipo": "quadra"
          },
          {
            "nome": "13",
            "lat": -26.4779324,
            "lng": -51.9723261,
            "tipo": "quadra"
          },
          {
            "nome": "14",
            "lat": -26.4777212,
            "lng": -51.9719613,
            "tipo": "quadra"
          },
          {
            "nome": "15",
            "lat": -26.4773946,
            "lng": -51.9715107,
            "tipo": "quadra"
          },
          {
            "nome": "16",
            "lat": -26.4770873,
            "lng": -51.9706953,
            "tipo": "quadra"
          },
          {
            "nome": "17",
            "lat": -26.4775579,
            "lng": -51.9695795,
            "tipo": "quadra"
          },
          {
            "nome": "18",
            "lat": -26.4787439,
            "lng": -51.9682277,
            "tipo": "quadra"
          },
          {
            "nome": "19",
            "lat": -26.4783214,
            "lng": -51.9675303,
            "tipo": "quadra"
          },
          {
            "nome": "20",
            "lat": -26.4767368,
            "lng": -51.9671173,
            "tipo": "quadra"
          },
          {
            "nome": "21",
            "lat": -26.4793297,
            "lng": -51.9661946,
            "tipo": "quadra"
          },
          {
            "nome": "22",
            "lat": -26.4794066,
            "lng": -51.9642527,
            "tipo": "quadra"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -51.9774768,
              -26.4810854
            ],
            [
              -51.972574,
              -26.482531
            ],
            [
              -51.97178,
              -26.4828
            ],
            [
              -51.970235,
              -26.482886
            ],
            [
              -51.969913,
              -26.483212
            ],
            [
              -51.967993,
              -26.483827
            ],
            [
              -51.96251,
              -26.479026
            ],
            [
              -51.968755,
              -26.475405
            ],
            [
              -51.971533,
              -26.475568
            ],
            [
              -51.974456,
              -26.478419
            ],
            [
              -51.975212,
              -26.479389
            ],
            [
              -51.975658,
              -26.479763
            ],
            [
              -51.9774768,
              -26.4810854
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 85,
        "nome": "T38 - AO LADO DO MERCADO LIESCH",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4820141,
            "lng": -52.0034734,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4816711,
            "lng": -52.0004889,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4813158,
            "lng": -52.0026185,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4805352,
            "lng": -52.0033661,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4801154,
            "lng": -52.0031925,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.48073,
            "lng": -52.0009609,
            "tipo": "quadra"
          },
          {
            "nome": "MERCADÃO DOS MÓVEIS",
            "lat": -26.4814321,
            "lng": -51.9998016,
            "tipo": "referencia"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -52.0035967,
              -26.4797358
            ],
            [
              -52.0042607,
              -26.4821898
            ],
            [
              -52.0025337,
              -26.4824688
            ],
            [
              -52.0023057,
              -26.4823068
            ],
            [
              -51.9998477,
              -26.4816858
            ],
            [
              -51.9996547,
              -26.4816688
            ],
            [
              -51.9994667,
              -26.4805958
            ],
            [
              -51.9996417,
              -26.4803108
            ],
            [
              -52.0011837,
              -26.4801878
            ],
            [
              -52.0018387,
              -26.4803748
            ],
            [
              -52.0035967,
              -26.4797358
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 86,
        "nome": "T75 - PITANGA",
        "pontos": [
          {
            "nome": "1",
            "lat": -26.4617376,
            "lng": -52.0030977,
            "tipo": "quadra"
          },
          {
            "nome": "2",
            "lat": -26.4562819,
            "lng": -51.9990208,
            "tipo": "quadra"
          },
          {
            "nome": "3",
            "lat": -26.4558209,
            "lng": -51.9964029,
            "tipo": "quadra"
          },
          {
            "nome": "4",
            "lat": -26.4547451,
            "lng": -51.9949438,
            "tipo": "quadra"
          },
          {
            "nome": "5",
            "lat": -26.4548603,
            "lng": -51.9920685,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4614879,
            "lng": -51.9924976,
            "tipo": "quadra"
          },
          {
            "nome": "6",
            "lat": -26.4571656,
            "lng": -51.9936993,
            "tipo": "quadra"
          },
          {
            "nome": "7",
            "lat": -26.4624676,
            "lng": -51.9886567,
            "tipo": "quadra"
          },
          {
            "nome": "8",
            "lat": -26.463428,
            "lng": -51.9832923,
            "tipo": "quadra"
          },
          {
            "nome": "9",
            "lat": -26.4594324,
            "lng": -51.9896009,
            "tipo": "quadra"
          },
          {
            "nome": "10",
            "lat": -26.4493659,
            "lng": -52.0073034,
            "tipo": "quadra"
          },
          {
            "nome": "11",
            "lat": -26.4576651,
            "lng": -52.0140411,
            "tipo": "quadra"
          }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -52.013969,
              -26.463924
            ],
            [
              -52.0097239,
              -26.4638499
            ],
            [
              -52.0103033,
              -26.463312
            ],
            [
              -52.009402,
              -26.462755
            ],
            [
              -52.0056469,
              -26.4646183
            ],
            [
              -52.005707,
              -26.466622
            ],
            [
              -52.0049174,
              -26.4674804
            ],
            [
              -52.0042951,
              -26.4669233
            ],
            [
              -52.0042093,
              -26.4660974
            ],
            [
              -52.0030935,
              -26.46652
            ],
            [
              -51.9977291,
              -26.4631007
            ],
            [
              -51.9945104,
              -26.4655595
            ],
            [
              -51.9810349,
              -26.4652138
            ],
            [
              -51.9804771,
              -26.462851
            ],
            [
              -51.9879658,
              -26.4569344
            ],
            [
              -51.9906266,
              -26.4536878
            ],
            [
              -51.9949181,
              -26.4527848
            ],
            [
              -52.0089943,
              -26.4476169
            ],
            [
              -52.0153243,
              -26.4567615
            ],
            [
              -52.013969,
              -26.463924
            ]
          ]
        ]
      }
    }
  ]
}
```

---
## FILE: public\version.json

```json
{
  "version": "1.8.125",
  "buildDate": "27/02, 11:19"
}
```

---
## FILE: README.md

```md
# 🗺️ Territórios Palmas

Sistema de gestão digital de territórios de pregação, desenvolvido como uma **PWA (Progressive Web App)** moderna para substituir os cartões físicos. O sistema oferece controle em tempo real de designações, progresso de quadras e relatórios administrativos detalhados.

![Status](https://img.shields.io/badge/Versão-1.8.120-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Firebase](https://img.shields.io/badge/Firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Python](https://img.shields.io/badge/Python-KMZ_Converter-yellow?style=for-the-badge&logo=python&logoColor=white)

## 📱 Visão Geral

O **Territórios Palmas** permite que dirigentes visualizem seus mapas designados, marquem quadras concluídas e adicionem observações. Para os administradores, oferece um painel robusto para gerenciar usuários, designar territórios via WhatsApp e gerar relatórios em PDF para auditoria (S-13).

## 🚀 Funcionalidades Principais

### 🗺️ Mapa Inteligente (`Mapa.jsx`)

- **Multicamadas:** Alternância entre **Google Maps (Satélite/Híbrido)**, **Google Maps (Padrão)** e **OpenStreetMap**.
- **Visualização de Status:** Cores dinâmicas baseadas no status (Livre, Meu, Ocupado, Concluído) e tempo sem trabalhar (escala de laranja).
- **Controle de Elementos:** Botões para mostrar/ocultar **Condomínios**, **Pontos de Referência** e **Cores** (modo impressão).
- **Quadras Interativas:**
  - Clique para marcar como feita (Verde) ou pendente (Vermelho).
  - **Notas/Chat:** Sistema de observações por quadra (clique direito ou longo) para registrar "Não bater", "Cão bravo", etc.
- **Geolocalização:** Rastreamento da posição do usuário e compartilhamento de localização via WhatsApp.

### ⚙️ Administração e Gestão (`AdminPanel.jsx`)

- **Gestão de Usuários:** Aprovação de novos cadastros, promoção a Admin e edição de WhatsApp.
- **Designação Ágil:**
  - Envio de link "Deep Link" direto para o WhatsApp do dirigente (abre o mapa focado no território).
  - Controle de devolução e histórico de ciclos.
- **Notificações:** Sistema de "sininho" (`SininhoNotificacoes`) para avisar sobre novas designações ou devoluções.

### 📊 Relatórios Avançados (`Relatorios.jsx`)

- **Filtros Poderosos:**
  - Por Status (Livre/Ocupado).
  - Por Tempo Ocioso (+2, +4, +6 meses - Críticos).
  - Busca por nome, número ou dirigente.
- **Histórico Completo:** Visualização expandida de ciclos anteriores (quem trabalhou, quando pegou, quando devolveu).
- **Exportação PDF:** Geração de relatórios formatados (estilo S-13) usando `jspdf-autotable`.

### 🛠️ Ferramentas Técnicas

- **Conversor KMZ (`conversor.py`):** Script Python personalizado que converte arquivos `.kmz` (do Google Earth) para `geoJson`, mapeando ícones personalizados para números de quadras.
- **PWA Instalável:** Funciona offline (cache) e pode ser instalado na tela inicial (Android/iOS).
- **Auto-Update:** Sistema de verificação de versão (`AutoUpdate.jsx`) que força a atualização do cache quando uma nova versão é publicada.

---

## 📸 Screenshots

*(Espaço reservado para colocar prints das telas: Login, Mapa com Zoom, Modal de Notas e Relatório PDF)*

---

## 🔧 Instalação e Configuração

### Pré-requisitos

- Node.js (v18+)
- Conta no Firebase (Firestore, Auth, Hosting)
- Python 3 (para conversão de mapas)

### 1. Clonar e Instalar Dependências

```bash
git clone [https://github.com/maycowcarrara/territorios-palmas.git](https://github.com/maycowcarrara/territorios-palmas.git)
cd territorios-palmas
npm install
```

### 2. Configurar o Firebase

Crie um arquivo `src/firebase.js` com suas credenciais:

**JavaScript**

```
import { initializeApp } from "firebase/app";
// ... suas configurações do Firebase Console
export const db = getFirestore(app);
export const auth = getAuth(app);
```

### 3. Executar em Desenvolvimento

**Bash**

```
npm run dev
```

### 4. Deploy

O projeto possui script de deploy automático que atualiza a versão:

**Bash**

```
npm run deploy
# Isso executa: update-version -> build -> firebase deploy
```

---

## 📱 Como Testar no Celular

Como o sistema utiliza Geolocalização e Login Google, testar no celular requer cuidados específicos (HTTPS).

### Opção 1: Firebase Preview (Recomendada) ⭐

Cria um link temporário seguro (HTTPS) idêntico à produção, ideal para testar **GPS e Login** sem afetar o site principal.

1. Gere a build atualizada:
   **Bash**

   ```
   npm run build
   ```
2. Faça o deploy para um canal de teste (ex: `teste-mobile`):
   **Bash**

   ```
   npx firebase hosting:channel:deploy teste-mobile
   ```
3. Acesse o link gerado no terminal (ex: `https://territorios-palmas--teste-mobile...web.app`).

   * **Dica:** Para atualizar, basta rodar os mesmos comandos novamente.

### Opção 2: Rede Local (Wi-Fi)

Útil para ajustes visuais rápidos, mas **o GPS pode falhar** por falta de HTTPS.

1. Rode o servidor expondo o IP:
   **Bash**

   ```
   npm run dev -- --host
   ```
2. Acesse o IP mostrado (ex: `http://192.168.0.X:5173`) no celular.
3. **Nota:** Para o Login funcionar, adicione esse IP em *Authentication > Settings > Authorized Domains* no Firebase Console.

---

## 🗺️ Processamento de Mapas (Python)

O sistema utiliza um arquivo `mapa.json` gerado a partir de arquivos KMZ. O script `kmz/conversor.py` faz essa mágica.

**Como usar:**

1. Salve seus arquivos no diretório `kmz/`: `poligonos.kmz`, `quadras.kmz`, `referencias.kmz`, `condominios.kmz`.
2. Certifique-se de que os ícones no Google Earth correspondam à tabela `ICON_MAPPING` no script Python.
3. Execute o conversor:

**Bash**

```
cd kmz
python conversor.py
```

4. O arquivo `mapa.json` será gerado. Mova-o para a pasta `public/`.

---

## 📄 Estrutura do Banco de Dados (Firestore)

* **`usuarios`** : `{ email, nome, role (admin/comum/aguardando), whatsapp }`
* **`territorios`** :
* ID: `t_{numero}`
* Campos: `status`, `designadoPara`, `quadras_feitas` (array), `notas_quadras` (map), `historico` (array de ciclos).
* **`notificacoes`** : `{ para, texto, lida, tipo }`

---

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## 📜 Licença

Desenvolvido para uso local em Palmas-PR.

```

---
## FILE: src\AdminPanel.jsx

```jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, onSnapshot, doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

const AdminPanel = () => {
    const [usuarios, setUsuarios] = useState([]);

    // Estados para NOVO usuário
    const [novoEmail, setNovoEmail] = useState('');
    const [novoNome, setNovoNome] = useState('');
    const [novoWhats, setNovoWhats] = useState('');
    const [loadingAdd, setLoadingAdd] = useState(false);

    // Estados para EDIÇÃO inline
    const [editandoId, setEditandoId] = useState(null);
    const [dadosEditados, setDadosEditados] = useState({});

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "usuarios"), (snapshot) => {
            const lista = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            // Ordenar: Pendentes primeiro, depois Admins, depois resto
            lista.sort((a, b) => {
                if (a.role === 'aguardando' && b.role !== 'aguardando') return -1;
                if (a.role !== 'aguardando' && b.role === 'aguardando') return 1;
                if (a.role === 'admin' && b.role !== 'admin') return -1;
                if (a.role !== 'admin' && b.role === 'admin') return 1;
                return a.nome?.localeCompare(b.nome);
            });
            setUsuarios(lista);
        });
        return () => unsub();
    }, []);

    // --- ADICIONAR NOVO ---
    const handleAdicionar = async (e) => {
        e.preventDefault();
        if (!novoEmail) return;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(novoEmail)) {
            alert("❌ E-mail inválido! Por favor, verifique o formato.");
            return;
        }

        if (!novoEmail.includes('@gmail.com')) {
            alert("❌ Por favor, use um e-mail @gmail.com para compatibilidade com o login.");
            return;
        }

        const whatsLimpo = novoWhats.replace(/\D/g, '');
        if (novoWhats && (whatsLimpo.length < 10 || whatsLimpo.length > 11)) {
            alert("❌ WhatsApp inválido! O número deve ter DDD + 8 ou 9 dígitos.");
            return;
        }

        setLoadingAdd(true);
        const emailFormatado = novoEmail.trim().toLowerCase();

        try {
            await setDoc(doc(db, "usuarios", emailFormatado), {
                role: 'comum',
                nome: novoNome || 'Novo Dirigente',
                whatsapp: whatsLimpo,
                criadoEm: new Date()
            });
            setNovoEmail('');
            setNovoNome('');
            setNovoWhats('');
            alert("✅ Usuário adicionado com sucesso!");
        } catch (error) {
            console.error("Erro ao adicionar:", error);
            alert("❌ Erro: Verifique permissões.");
        }
        setLoadingAdd(false);
    };

    // --- AÇÕES RÁPIDAS (ATUALIZADO COM CONFIRMAÇÃO) ---
    const mudarRole = async (user, novaRole) => {
        // Define a mensagem baseada na ação
        const acao = novaRole === 'admin' ? 'PROMOVER a Administrador' : 'REBAIXAR para Dirigente';
        const alerta = novaRole === 'admin' 
            ? `⚠️ ATENÇÃO: Você está prestes a tornar ${user.nome || user.id} um ADMINISTRADOR.\n\nEle terá acesso total ao sistema, incluindo edição e exclusão de dados.\n\nDeseja continuar?`
            : `Deseja remover as permissões de administrador de ${user.nome || user.id}?`;

        if (confirm(alerta)) {
            try {
                await updateDoc(doc(db, "usuarios", user.id), { role: novaRole });
            } catch (e) { alert("Erro ao mudar permissão."); }
        }
    };

    const remover = async (email) => {
        if (confirm(`Tem certeza que deseja EXCLUIR DEFINITIVAMENTE o usuário ${email}?\n\nEssa ação não pode ser desfeita.`)) {
            try {
                await deleteDoc(doc(db, "usuarios", email));
            } catch (e) { alert("Erro ao remover."); }
        }
    };

    // --- LÓGICA DE EDIÇÃO ---
    const iniciarEdicao = (user) => {
        setEditandoId(user.id);
        setDadosEditados({ ...user });
    };

    const cancelarEdicao = () => {
        setEditandoId(null);
        setDadosEditados({});
    };

    const salvarEdicao = async () => {
        if (!editandoId) return;

        try {
            await updateDoc(doc(db, "usuarios", editandoId), {
                nome: dadosEditados.nome,
                whatsapp: dadosEditados.whatsapp
            });
            setEditandoId(null);
        } catch (error) {
            console.error(error);
            alert("Erro ao salvar alterações.");
        }
    };

    const handleEditChange = (campo, valor) => {
        setDadosEditados(prev => ({ ...prev, [campo]: valor }));
    };

    // --- CONTADORES ---
    const totalUsers = usuarios.length;
    const totalAdmins = usuarios.filter(u => u.role === 'admin').length;
    const totalPendentes = usuarios.filter(u => u.role === 'aguardando').length;
    const formatarTelefone = (valor) => {
        return valor
            .replace(/\D/g, '')
            .replace(/^(\d{2})(\d)/g, '($1) $2')
            .replace(/(\d)(\d{4})$/, '$1-$2');
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 font-sans">
            <div className="max-w-7xl mx-auto">
                {/* HEADER */}
                <header className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center md:justify-start gap-2">
                            <span className="bg-blue-600 text-white rounded-lg p-1.5 text-xl">🛡️</span>
                            Painel Admin
                        </h1>
                        <p className="text-gray-500 mt-1 text-sm">Gerencie usuários e permissões do sistema.</p>
                    </div>
                    <Link to="/app" className="px-5 py-2.5 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300 shadow-sm hover:bg-gray-50 hover:text-blue-600 transition-all flex items-center gap-2 active:scale-95">
                        ← Voltar ao Mapa
                    </Link>
                </header>

                {/* CARDS DE RESUMO */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Total Dirigentes</p>
                            <p className="text-3xl font-bold text-gray-700">{totalUsers}</p>
                        </div>
                        <div className="text-3xl opacity-20">👥</div>
                    </div>
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Admins</p>
                            <p className="text-3xl font-bold text-blue-600">{totalAdmins}</p>
                        </div>
                        <div className="text-3xl opacity-20">🛡️</div>
                    </div>
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Pendentes</p>
                            <p className={`text-3xl font-bold ${totalPendentes > 0 ? 'text-red-500 animate-pulse' : 'text-green-500'}`}>{totalPendentes}</p>
                        </div>
                        <div className="text-3xl opacity-20">⏳</div>
                    </div>
                </div>

                {/* FORMULÁRIO DE CADASTRO */}
                <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden mb-8">
                    <div className="p-4 bg-gray-50 border-b border-gray-200">
                        <h3 className="font-bold text-gray-700 flex items-center gap-2">
                            ✨ Cadastrar Novo Usuário
                        </h3>
                    </div>
                    <div className="p-5">
                        <form onSubmit={handleAdicionar} className="flex flex-col md:flex-row gap-3 items-end">
                            <div className="flex-1 w-full">
                                <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Nome Completo</label>
                                <input
                                    type="text"
                                    placeholder="Ex: João Silva"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    value={novoNome}
                                    onChange={e => setNovoNome(e.target.value)}
                                />
                            </div>
                            <div className="flex-1 w-full">
                                <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">E-mail (Google)</label>
                                <input
                                    type="email"
                                    placeholder="Ex: joao@gmail.com"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    value={novoEmail}
                                    onChange={e => setNovoEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="w-full md:w-48">
                                <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">WhatsApp</label>
                                <input
                                    type="text"
                                    placeholder="(46) 99999-9999"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    value={novoWhats}
                                    maxLength={15}
                                    onChange={e => setNovoWhats(formatarTelefone(e.target.value))}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loadingAdd}
                                className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-lg shadow-md hover:shadow-lg transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {loadingAdd ? 'Salvando...' : '+ Adicionar'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* --- MODO MOBILE: CARDS (RESPONSIVO) --- */}
                <div className="md:hidden space-y-4">
                    {usuarios.map((user) => (
                        <div key={user.id} className={`bg-white p-4 rounded-xl shadow-sm border border-gray-200 ${editandoId === user.id ? 'ring-2 ring-blue-100 bg-blue-50/20' : ''}`}>
                            
                            {/* Cabeçalho do Card */}
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center font-bold text-sm border border-gray-200">
                                        {(user.nome || user.id || '?')[0].toUpperCase()}
                                    </div>
                                    <div>
                                        {editandoId === user.id ? (
                                            <input
                                                type="text"
                                                value={dadosEditados.nome || ''}
                                                onChange={e => handleEditChange('nome', e.target.value)}
                                                className="w-full px-2 py-1 text-sm border border-blue-300 rounded focus:ring-1 focus:ring-blue-500 outline-none bg-white"
                                                placeholder="Nome"
                                            />
                                        ) : (
                                            <h4 className="font-bold text-gray-800 text-base">{user.nome || 'Sem Nome'}</h4>
                                        )}
                                        <p className="text-xs text-gray-500 font-mono truncate max-w-[150px]">{user.id}</p>
                                    </div>
                                </div>
                                
                                {/* Badge de Role */}
                                <div>
                                    {user.role === 'admin' ? (
                                        <span className="px-2 py-1 rounded text-[10px] font-bold bg-purple-100 text-purple-700 border border-purple-200">ADMIN</span>
                                    ) : user.role === 'aguardando' ? (
                                        <span className="px-2 py-1 rounded text-[10px] font-bold bg-red-100 text-red-700 border border-red-200 animate-pulse">PENDENTE</span>
                                    ) : (
                                        <span className="px-2 py-1 rounded text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-100">DIRIGENTE</span>
                                    )}
                                </div>
                            </div>

                            {/* Corpo do Card (Whatsapp) */}
                            <div className="mb-4 pl-[3.25rem]">
                                {editandoId === user.id ? (
                                    <input
                                        type="text"
                                        value={dadosEditados.whatsapp || ''}
                                        onChange={e => handleEditChange('whatsapp', e.target.value)}
                                        className="w-full px-2 py-1 text-sm border border-blue-300 rounded focus:ring-1 focus:ring-blue-500 outline-none bg-white"
                                        placeholder="WhatsApp"
                                    />
                                ) : (
                                    user.whatsapp ? (
                                        <a href={`https://wa.me/${user.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-green-700 font-medium">
                                            <span className="text-xs">🟢</span> {user.whatsapp}
                                        </a>
                                    ) : (
                                        <span className="text-gray-300 text-sm italic">Sem WhatsApp</span>
                                    )
                                )}
                            </div>

                            {/* Botões de Ação Mobile */}
                            <div className="flex gap-2 border-t border-gray-100 pt-3">
                                {editandoId === user.id ? (
                                    <>
                                        <button onClick={salvarEdicao} className="flex-1 py-2 bg-green-600 text-white rounded-lg font-bold text-sm">Salvar</button>
                                        <button onClick={cancelarEdicao} className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg font-bold text-sm">Cancelar</button>
                                    </>
                                ) : (
                                    <>
                                        {user.role === 'aguardando' ? (
                                            <button onClick={() => mudarRole(user, 'comum')} className="flex-1 py-2 bg-green-600 text-white rounded-lg font-bold text-sm shadow-sm active:scale-95 transition-transform">
                                                Aprovar Acesso
                                            </button>
                                        ) : (
                                            <>
                                                <button onClick={() => iniciarEdicao(user)} className="p-2 bg-gray-50 text-blue-600 rounded-lg border border-gray-200 flex-1 flex justify-center items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg>
                                                </button>

                                                {/* BOTÃO PROMOVER / REBAIXAR - NOVO ÍCONE */}
                                                <button 
                                                    onClick={() => mudarRole(user, user.role === 'admin' ? 'comum' : 'admin')} 
                                                    className={`p-2 rounded-lg border flex-1 flex justify-center items-center transition-colors ${user.role === 'admin' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-yellow-50 text-yellow-600 border-yellow-100'}`}
                                                >
                                                    {user.role === 'admin' ? (
                                                        // ÍCONE DE USUÁRIO (Rebaixar)
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                        </svg>
                                                    ) : (
                                                        // ÍCONE DE ESTRELA (Promover a Admin)
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                    )}
                                                </button>
                                            </>
                                        )}
                                        <button onClick={() => remover(user.id)} className="p-2 bg-red-50 text-red-600 rounded-lg border border-red-100 flex-1 flex justify-center items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                    {usuarios.length === 0 && (
                        <div className="p-8 text-center text-gray-400 italic bg-white rounded-xl border border-gray-200">Nenhum usuário encontrado.</div>
                    )}
                </div>

                {/* --- MODO DESKTOP: TABELA (VISÍVEL APENAS EM TELAS GRANDES) --- */}
                <div className="hidden md:block bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200">
                                    <th className="px-6 py-4 font-bold">Usuário / E-mail</th>
                                    <th className="px-6 py-4 font-bold">WhatsApp</th>
                                    <th className="px-6 py-4 font-bold text-center">Permissão</th>
                                    <th className="px-6 py-4 font-bold text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {usuarios.map((user) => (
                                    <tr key={user.id} className={`hover:bg-blue-50/30 transition-colors ${editandoId === user.id ? 'bg-yellow-50' : ''}`}>

                                        {/* COLUNA NOME/EMAIL */}
                                        <td className="px-6 py-4">
                                            {editandoId === user.id ? (
                                                <div className="flex flex-col gap-1">
                                                    <input
                                                        type="text"
                                                        value={dadosEditados.nome || ''}
                                                        onChange={e => handleEditChange('nome', e.target.value)}
                                                        className="px-2 py-1 text-sm border border-blue-300 rounded focus:ring-1 focus:ring-blue-500 outline-none"
                                                        placeholder="Nome"
                                                    />
                                                    <span className="text-xs text-gray-400 font-mono pl-1">{user.id} (Fixo)</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 text-gray-500 flex items-center justify-center font-bold text-sm border border-gray-200 shadow-sm">
                                                        {(user.nome || user.id || '?')[0].toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-gray-800">{user.nome || 'Sem Nome'}</div>
                                                        <div className="text-xs text-gray-400 font-mono">{user.id}</div>
                                                    </div>
                                                </div>
                                            )}
                                        </td>

                                        {/* COLUNA WHATSAPP */}
                                        <td className="px-6 py-4">
                                            {editandoId === user.id ? (
                                                <input
                                                    type="text"
                                                    value={dadosEditados.whatsapp || ''}
                                                    onChange={e => handleEditChange('whatsapp', e.target.value)}
                                                    className="w-32 px-2 py-1 text-sm border border-blue-300 rounded focus:ring-1 focus:ring-blue-500 outline-none"
                                                    placeholder="WhatsApp"
                                                />
                                            ) : (
                                                user.whatsapp ? (
                                                    <a href={`https://wa.me/${user.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-sm font-medium hover:bg-green-100 transition-colors border border-green-100">
                                                        <span className="text-xs">🟢</span> {user.whatsapp}
                                                    </a>
                                                ) : (
                                                    <span className="text-gray-300 text-sm italic">--</span>
                                                )
                                            )}
                                        </td>

                                        {/* COLUNA ROLE (PERMISSÃO) */}
                                        <td className="px-6 py-4 text-center">
                                            {user.role === 'admin' ? (
                                                <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-700 border border-purple-200 inline-flex items-center gap-1">
                                                    🛡️ Admin
                                                </span>
                                            ) : user.role === 'aguardando' ? (
                                                <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-200 inline-flex items-center gap-1 animate-pulse">
                                                    ⏳ Pendente
                                                </span>
                                            ) : (
                                                <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-600 border border-blue-100 inline-flex items-center gap-1">
                                                    👤 Dirigente
                                                </span>
                                            )}
                                        </td>

                                        {/* COLUNA AÇÕES */}
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end items-center gap-2">

                                                {/* MODO EDIÇÃO */}
                                                {editandoId === user.id ? (
                                                    <>
                                                        <button onClick={salvarEdicao} className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors" title="Salvar">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                                        </button>
                                                        <button onClick={cancelarEdicao} className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors" title="Cancelar">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                                                        </button>
                                                    </>
                                                ) : (
                                                    /* MODO VISUALIZAÇÃO */
                                                    <>
                                                        {user.role === 'aguardando' ? (
                                                            <button onClick={() => mudarRole(user, 'comum')} className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all">
                                                                Aprovar
                                                            </button>
                                                        ) : (
                                                            <button onClick={() => iniciarEdicao(user)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Editar Dados">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg>
                                                            </button>
                                                        )}

                                                        <button
                                                            onClick={() => mudarRole(user, user.role === 'admin' ? 'comum' : 'admin')}
                                                            className={`p-2 rounded-lg transition-colors ${user.role === 'admin' ? 'text-purple-400 hover:text-red-600 hover:bg-red-50' : 'text-gray-400 hover:text-yellow-600 hover:bg-yellow-50'}`}
                                                            title={user.role === 'admin' ? "Remover Admin (Voltar a Dirigente)" : "Promover a Admin"}
                                                        >
                                                            {user.role === 'admin' ? (
                                                                // ÍCONE DE USUÁRIO (REBAIXAR)
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                                </svg>
                                                            ) : (
                                                                // ÍCONE DE ESTRELA (PROMOVER)
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                </svg>
                                                            )}
                                                        </button>

                                                        <button onClick={() => remover(user.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Remover Usuário">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {usuarios.length === 0 && (
                        <div className="p-8 text-center text-gray-400 italic">Nenhum usuário encontrado.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
```

---
## FILE: src\AjudaModal.jsx

```jsx
import React from 'react';

const AjudaModal = ({ isOpen, onClose, isAdmin }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[3000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[85vh]"
                onClick={e => e.stopPropagation()}
            >
                {/* Cabeçalho */}
                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-blue-600 text-white shrink-0">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Como usar o Mapa
                    </h3>
                    <button onClick={onClose} className="text-white/80 hover:text-white font-bold text-2xl leading-none px-2">
                        &times;
                    </button>
                </div>

                {/* Conteúdo Rolável */}
                <div className="p-6 overflow-y-auto space-y-6">

                    {/* NOVO RECURSO: Observações */}
                    <section className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                        <h4 className="font-bold text-yellow-800 mb-3 flex items-center gap-2 text-lg">
                            <span>💬</span> Novo: Observações nas Quadras
                        </h4>
                        <p className="text-sm text-gray-700 mb-3">
                            Registre informações importantes (ex: "Cachorro bravo", "Morador da casa n° 45 pediu para não visitar...") em cada quadra.
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-2">
                            <div className="bg-white p-3 rounded border border-yellow-100 shadow-sm text-center">
                                <span className="text-2xl mb-1 block">💻</span>
                                <strong className="block text-xs text-gray-500 uppercase tracking-wide">Computador</strong>
                                <p className="text-sm font-bold text-blue-600">Botão Direito</p>
                                <p className="text-xs text-gray-400">no número da quadra</p>
                            </div>
                            <div className="bg-white p-3 rounded border border-yellow-100 shadow-sm text-center">
                                <span className="text-2xl mb-1 block">📱</span>
                                <strong className="block text-xs text-gray-500 uppercase tracking-wide">Celular</strong>
                                <p className="text-sm font-bold text-blue-600">Segurar o Dedo</p>
                                <p className="text-xs text-gray-400">Toque longo (1s)</p>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 italic text-center mt-2">
                            * Uma bolinha amarela aparecerá nas quadras que possuem anotações.
                        </p>
                    </section>

                    <hr className="border-gray-100" />

                    {/* Ferramentas Úteis (NOVA SEÇÃO) */}
                    <section>
                        <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                            <span className="bg-blue-100 text-blue-600 p-1 rounded">🚀</span>
                            Ferramentas Úteis
                        </h4>
                        <ul className="space-y-3">
                            <li className="flex gap-3 items-start">
                                <div className="bg-gray-100 p-1.5 rounded text-gray-600 mt-0.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                </div>
                                <div>
                                    <strong className="text-sm text-gray-800 block">Ver Ruas (Ocultar Cores)</strong>
                                    <p className="text-xs text-gray-600">Use o botão de <strong>Olho</strong> (canto superior direito) para esconder as cores do mapa. Isso ajuda a ler melhor os nomes das ruas.</p>
                                </div>
                            </li>

                            <li className="flex gap-3 items-start">
                                <div className="bg-blue-100 p-1.5 rounded text-blue-600 mt-0.5 font-bold text-xs w-7 h-7 flex items-center justify-center">Meus</div>
                                <div>
                                    <strong className="text-sm text-gray-800 block">Botão "Meus"</strong>
                                    <p className="text-xs text-gray-600">No topo da tela, clique em <strong>"Meus"</strong> para ver uma lista rápida de todos os territórios que estão com você no momento.</p>
                                </div>
                            </li>

                            <li className="flex gap-3 items-start">
                                <div className="bg-green-100 p-1.5 rounded text-green-600 mt-0.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                                </div>
                                <div>
                                    <strong className="text-sm text-gray-800 block">Ponto de Encontro</strong>
                                    <p className="text-xs text-gray-600">Toque em <strong>qualquer lugar</strong> dentro do seu território (no mapa) para abrir a opção de compartilhar aquele local exato no WhatsApp.</p>
                                </div>
                            </li>
                        </ul>
                    </section>

                    <hr className="border-gray-100" />

                    {/* Básico: Marcar Quadras */}
                    <section>
                        <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                            <span className="bg-blue-100 text-blue-600 p-1 rounded">1</span>
                            Marcar Quadras
                        </h4>
                        <p className="text-sm text-gray-600 ml-8">
                            Basta <strong>clicar (ou tocar)</strong> na bolinha com o número da quadra para mudar a cor:
                        </p>
                        <div className="flex gap-4 ml-8 mt-2">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full bg-red-500 border border-red-700"></div>
                                <span className="text-xs font-bold text-gray-600">Não Feito</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full bg-green-500 border border-green-700"></div>
                                <span className="text-xs font-bold text-gray-600">Feito</span>
                            </div>
                        </div>
                    </section>

                    {/* Dica de Designação */}
                    <section className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                        <h4 className="font-bold text-blue-800 text-sm mb-1">💡 Dica Importante</h4>
                        <p className="text-xs text-blue-700">
                            Use o botão de <strong>GPS</strong> (canto inferior direito) para centralizar onde você está.
                        </p>
                    </section>

                </div>

                {/* Rodapé */}
                <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end shrink-0">
                    <button
                        onClick={onClose}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-sm transition-colors"
                    >
                        Entendi, vamos lá!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AjudaModal;
```

---
## FILE: src\App.css

```css
#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.react:hover {
  filter: drop-shadow(0 0 2em #61dafbaa);
}

@keyframes logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: no-preference) {
  a:nth-of-type(2) .logo {
    animation: logo-spin infinite 20s linear;
  }
}

.card {
  padding: 2em;
}

.read-the-docs {
  color: #888;
}

```

---
## FILE: src\App.jsx

```jsx
import React, { useState, useEffect, useRef } from 'react';
import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, googleProvider, db } from './firebase';
import { collection, query, where, getDocs, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import Mapa from './Mapa';
import { useUsuario } from './useUsuario';
import AdminPanel from './AdminPanel';
import Relatorios from './Relatorios';
import appInfo from './version.json';
import AutoUpdate, { checkForUpdate } from './AutoUpdate';
import AjudaModal from './AjudaModal';

// --- CAPTURA GLOBAL DO EVENTO DE INSTALAÇÃO ---
let deferredPromptGlobal = null;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPromptGlobal = e;
});

// --- TELA DE LOGIN ---
function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [verificandoSessao, setVerificandoSessao] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/app');
      } else {
        setVerificandoSessao(false);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setErro('');
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error);
      setErro("Erro ao conectar com Google. Tente novamente.");
      setLoading(false);
    }
  };

  if (verificandoSessao) {
    return (
      <div className="flex items-center justify-center h-[100dvh] bg-gray-100">
        <div className="flex flex-col items-center gap-4 animate-pulse">
          <h2 className="text-4xl font-bold text-gray-300">Territórios</h2>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-[100dvh] bg-gray-100">
      <div className="w-96 bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200 m-4 animate-fade-in">
        <div className="p-8 text-center">
          <h2 className="text-3xl font-bold text-blue-600 mb-2">Territórios</h2>
          <p className="text-gray-500 mb-8">Palmas - PR</p>
          <div className="flex flex-col gap-4">
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-3 px-4 rounded-lg transition-all shadow-sm active:scale-95"
            >
              {loading ? (
                <span className="text-sm">Conectando...</span>
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  Entrar com Google
                </>
              )}
            </button>
            {erro && <p className="text-red-500 text-xs mt-2">{erro}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- SININHO DE NOTIFICAÇÕES ---
const SininhoNotificacoes = ({ user, isAdmin }) => {
  const [notificacoes, setNotificacoes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!user) return;
    const q1 = query(collection(db, "notificacoes"), where("para", "==", user.email));
    const unsubs = [];

    const unsub1 = onSnapshot(q1, (snap) => {
      const minhas = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setNotificacoes(prev => {
        const outras = prev.filter(p => p.origem === 'admin');
        const listaFinal = [...outras, ...minhas];
        return listaFinal.sort((a, b) => (b.data?.seconds || 0) - (a.data?.seconds || 0));
      });
    });
    unsubs.push(unsub1);

    if (isAdmin) {
      const q2 = query(collection(db, "notificacoes"), where("para", "==", "ADMINS"));
      const unsub2 = onSnapshot(q2, (snap) => {
        const deAdmin = snap.docs.map(d => ({ id: d.id, ...d.data(), origem: 'admin' }));
        setNotificacoes(prev => {
          const pessoais = prev.filter(p => p.origem !== 'admin');
          const listaFinal = [...pessoais, ...deAdmin];
          return listaFinal.sort((a, b) => (b.data?.seconds || 0) - (a.data?.seconds || 0));
        });
      });
      unsubs.push(unsub2);
    }
    return () => unsubs.forEach(u => u());
  }, [user, isAdmin]);

  const limparNotificacao = async (id) => {
    try { await deleteDoc(doc(db, "notificacoes", id)); } catch (e) { console.error("Erro ao limpar notificação:", e); }
  };

  const temNovas = notificacoes.length > 0;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2 text-white hover:bg-blue-700 rounded-full transition-colors active:scale-95"
        title="Notificações"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {temNovas && <span className="absolute top-1 right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-blue-600 animate-pulse"></span>}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[3000] flex items-start justify-end p-4 pt-16 bg-black/20 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
          <div className="bg-white rounded-xl shadow-2xl w-80 overflow-hidden animate-fade-in mr-2 border border-blue-100" onClick={e => e.stopPropagation()}>
            <div className="p-3 bg-blue-50 border-b border-blue-100 flex justify-between items-center">
              <h3 className="font-bold text-blue-800 text-sm flex items-center gap-2">🔔 Notificações</h3>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600 font-bold px-2">✕</button>
            </div>
            <div className="max-h-96 overflow-y-auto bg-gray-50/50">
              {notificacoes.length === 0 ? (
                <div className="p-8 text-center text-gray-400 text-sm flex flex-col items-center">
                  <span className="text-2xl mb-2">😴</span>
                  <span>Nenhuma notificação nova.</span>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {notificacoes.map(notif => (
                    <div key={notif.id} className="p-3 hover:bg-white transition-colors flex gap-3 items-start group">
                      <div className="text-xl pt-0.5 bg-white rounded-full h-8 w-8 flex items-center justify-center shadow-sm border border-gray-100">
                        {notif.tipo === 'devolucao' ? '🏁' : '📍'}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-700 leading-snug">{notif.texto}</p>
                        <p className="text-[10px] text-gray-400 mt-1 font-medium">
                          {notif.data?.toDate ? notif.data.toDate().toLocaleString() : 'Agora'}
                        </p>
                      </div>
                      <button
                        onClick={() => limparNotificacao(notif.id)}
                        className="text-gray-300 hover:text-red-500 self-start p-1 hover:bg-red-50 rounded transition-colors"
                        title="Marcar como lida"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// --- MODAL MEUS TERRITÓRIOS ---
const MeusTerritoriosModal = ({ isOpen, onClose, user, navigate }) => {
  const [lista, setLista] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && user) {
      carregarMeusTerritorios();
    }
  }, [isOpen, user]);

  const carregarMeusTerritorios = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "territorios"), where("designadoPara", "==", user.email));
      const querySnapshot = await getDocs(q);
      const meusDocs = [];
      querySnapshot.forEach((doc) => meusDocs.push({ id: doc.id, ...doc.data() }));

      if (meusDocs.length > 0) {
        const response = await fetch('./mapa.json');
        const geoData = await response.json();

        const listaCompleta = meusDocs.map(doc => {
          const numeroId = parseInt(doc.id.replace('t_', ''));
          const feature = geoData.features.find(f => {
            const fId = f.properties.id || (geoData.features.indexOf(f) + 1);
            return fId === numeroId;
          });

          // Lógica de Zoom Automático (Bounds)
          let boundsStr = null;
          if (feature) {
            const coords = feature.geometry.coordinates[0];
            let minLat = 90, maxLat = -90, minLng = 180, maxLng = -180;
            coords.forEach(p => {
              const lng = p[0];
              const lat = p[1];
              if (lat < minLat) minLat = lat;
              if (lat > maxLat) maxLat = lat;
              if (lng < minLng) minLng = lng;
              if (lng > maxLng) maxLng = lng;
            });
            boundsStr = `${minLat},${minLng},${maxLat},${maxLng}`;
          }

          let dataFormatada = "Data desc.";
          if (doc.dataDesignacao) {
            const d = doc.dataDesignacao.toDate ? doc.dataDesignacao.toDate() : new Date(doc.dataDesignacao);
            dataFormatada = d.toLocaleDateString('pt-BR');
          }

          return { ...doc, numeroId, boundsStr, dataFormatada };
        });

        listaCompleta.sort((a, b) => a.numeroId - b.numeroId);
        setLista(listaCompleta);
      } else {
        setLista([]);
      }
    } catch (error) { console.error(error); }
    setLoading(false);
  };

  const irParaMapa = (item) => {
    if (item.boundsStr) {
      navigate(`/app?bounds=${item.boundsStr}`);
      onClose();
    } else {
      alert("Localização não encontrada.");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl p-0 w-full max-w-sm animate-fade-in overflow-hidden flex flex-col max-h-[80vh]" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-blue-600 text-white">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            Meus Territórios
          </h3>
          <button onClick={onClose} className="text-white/80 hover:text-white font-bold text-xl px-2">✕</button>
        </div>
        <div className="overflow-y-auto p-4 flex-1">
          {loading ? (
            <div className="flex flex-col items-center py-8 text-gray-400">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-2"></div>
              <p className="text-sm">Buscando seus territórios...</p>
            </div>
          ) : lista.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p className="mb-2 text-4xl">🤷‍♂️</p>
              <p>Nenhum território designado para você no momento.</p>
              <p className="text-xs mt-2 text-gray-400">Fale com o Servo de Territórios.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {lista.map((t) => (
                <div key={t.id} className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-gray-800 text-lg">{t.nome || `Território ${t.numeroId}`}</h4>
                      <p className="text-xs text-gray-500">Recebido em: <span className="font-medium text-gray-700">{t.dataFormatada}</span></p>
                    </div>
                    <div className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-full">#{t.numeroId}</div>
                  </div>
                  <button onClick={() => irParaMapa(t)} className="w-full bg-blue-600 text-white text-sm font-bold py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 active:scale-95 transition-transform">
                    Ir para o Mapa
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- MODAL DE LEGENDA ---
const LegendaModal = ({ isOpen, onClose, isAdmin }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm animate-fade-in" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-2">
          <h3 className="text-lg font-bold text-gray-800">Legenda do Mapa</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 font-bold text-xl px-2">✕</button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-3"><span className="w-8 h-8 rounded bg-orange-500 border border-orange-700 opacity-60 flex-shrink-0"></span><div><p className="text-gray-800 font-bold text-sm">Disponível</p><p className="text-gray-500 text-xs">Fale com o Servo</p></div></div>
          <div className="flex items-center gap-3"><span className="w-8 h-8 rounded bg-blue-500 border border-blue-800 opacity-60 flex-shrink-0"></span><div><p className="text-gray-800 font-bold text-sm">Seu Território</p><p className="text-gray-500 text-xs">Em andamento</p></div></div>
          {isAdmin && <div className="flex items-center gap-3"><span className="w-8 h-8 rounded bg-purple-500 border border-purple-800 opacity-60 flex-shrink-0"></span><div><p className="text-gray-800 font-bold text-sm">Seu (Admin)</p><p className="text-gray-500 text-xs">Designado para você</p></div></div>}
          <div className="flex items-center gap-3"><span className="w-8 h-8 rounded bg-green-500 border border-green-800 opacity-60 flex-shrink-0"></span><div><p className="text-gray-800 font-bold text-sm">Concluído</p><p className="text-gray-500 text-xs">Todas as quadras feitas</p></div></div>
          <div className="flex items-center gap-3"><span className="w-8 h-8 rounded bg-gray-500 border border-gray-700 opacity-30 flex-shrink-0"></span><div><p className="text-gray-800 font-bold text-sm">Ocupado</p><p className="text-gray-500 text-xs">Outro dirigente cuidando</p></div></div>
        </div>
        <button onClick={onClose} className="w-full mt-6 bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 shadow-sm">Entendi</button>
      </div>
    </div>
  );
};

// --- MENU LATERAL (ATUALIZADO - ORDEM REAJUSTADA) ---
const MenuLateral = ({ isOpen, onClose, user, isAdmin, navigate, handleLogout, abrirAjuda, abrirLegenda }) => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    if (deferredPromptGlobal) {
      setDeferredPrompt(deferredPromptGlobal);
    }
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      deferredPromptGlobal = e;
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const instalarApp = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        deferredPromptGlobal = null;
      }
    } else {
      alert('Para instalar: Abra o menu do navegador (três pontinhos) e procure "Adicionar à Tela Inicial" ou "Instalar Aplicativo".');
    }
  };

  const isStandalone = window.matchMedia('(display-mode: standalone)').matches;

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-[2000] bg-black/50 transition-opacity" onClick={onClose}></div>}
      <div className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-[2001] transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>

        {/* CABEÇALHO DO MENU */}
        <div className="bg-blue-600 p-6 text-white flex-shrink-0">
          <button onClick={onClose} className="absolute top-4 right-4 text-white/80 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="flex items-center gap-3 mb-3 mt-4">
            <div className="w-12 h-12 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold text-xl shadow ring-2 ring-blue-400">
              {(user?.displayName || user?.email || '?')[0].toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="font-bold text-sm truncate">{user?.displayName || 'Usuário'}</p>
              <p className="text-xs text-blue-200 truncate">{user?.email}</p>
            </div>
          </div>
          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-800/50 border border-blue-400/30 text-blue-100">
            {isAdmin ? 'Administrador' : 'Dirigente'}
          </span>
        </div>

        {/* CORPO DO MENU */}
        <div className="p-4 flex flex-col gap-2 flex-1 overflow-y-auto">

          {/* 1. MAPA */}
          <button onClick={() => { navigate('/app'); onClose(); }} className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 text-blue-700 font-medium border border-blue-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            Mapa
          </button>

          {/* 2 & 3. ITENS DE ADMIN */}
          {isAdmin && (
            <>
              <button onClick={() => { navigate('/relatorios'); onClose(); }} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                </svg>
                Relatórios
              </button>

              <button onClick={() => { navigate('/admin'); onClose(); }} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                Gerenciar Usuários
              </button>
            </>
          )}

          {/* 4. LEGENDA */}
          <button onClick={() => { abrirLegenda(); onClose(); }} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            Legenda do Mapa
          </button>

          {/* 5. COMO USAR */}
          <button onClick={() => { abrirAjuda(); onClose(); }} className="flex items-center gap-3 p-3 rounded-lg hover:bg-yellow-50 text-yellow-700 transition-colors font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Como usar (Ajuda)
          </button>

          {/* 6. INSTALAR */}
          {!isStandalone && (
            <button onClick={instalarApp} className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-50 text-green-700 transition-colors font-medium border border-dashed border-green-200 mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Instalar Aplicativo
            </button>
          )}

          <div className="h-px bg-gray-100 my-2"></div>

          {/* 7. SAIR */}
          <button onClick={handleLogout} className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 text-red-600 transition-colors font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
            </svg>
            Sair do Sistema
          </button>
        </div>

        {/* --- RODAPÉ COM BOTÃO DE UPDATE --- */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex-shrink-0 flex flex-col items-center gap-1">
          <div className="text-[10px] text-gray-400 text-center mb-2">
            <p className="font-semibold text-gray-500">Territórios Digitais v{appInfo.version}</p>
            <p className="opacity-70">{appInfo.buildDate}</p>
          </div>

          <button 
            onClick={async () => {
                const temUpdate = await checkForUpdate(true);
                if (!temUpdate) alert("Seu sistema já está atualizado! ✅");
            }}
            className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-full shadow-sm text-blue-600 text-xs font-bold hover:bg-blue-50 hover:border-blue-200 transition-all active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Verificar Atualização
          </button>
          
          <p className="mt-2 text-[10px] text-gray-300">Desenvolvido com carinho ❤️</p>
        </div>
      </div>
    </>
  );
};

// --- DASHBOARD (CORRIGIDO: BOTÕES VISÍVEIS + LOGO NO MOBILE) ---
function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [verificandoLogin, setVerificandoLogin] = useState(true);

  // Estados dos modais
  const [menuAberto, setMenuAberto] = useState(false);
  const [legendaAberta, setLegendaAberta] = useState(false);
  const [ajudaAberta, setAjudaAberta] = useState(false);
  const [meusTerritoriosAberto, setMeusTerritoriosAberto] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate('/');
      } else {
        setUser(currentUser);
      }
      setVerificandoLogin(false);
    });
    return () => unsubscribe();
  }, [navigate]);

  const { isAdmin, autorizado, loading: verificandoBanco, role } = useUsuario(user);

  const handleLogout = () => {
    signOut(auth);
    navigate('/');
  };

  // 1. TELA DE CARREGANDO
  if (verificandoLogin || (user && verificandoBanco)) {
    return (
      <div className="h-[100dvh] flex items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          <span className="text-blue-600 font-semibold text-sm animate-pulse">Carregando sistema...</span>
        </div>
      </div>
    );
  }

  if (!user) return null;

  // 2. TELAS DE BLOQUEIO / PENDÊNCIA
  if (!autorizado) {
    if (role === 'aguardando') {
      return (
        <div className="h-[100dvh] flex items-center justify-center bg-gray-50 p-6">
          <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 text-center border border-blue-100 animate-fade-in">
            <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
              🕒
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Cadastro em Análise</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Olá, <strong>{user.displayName}</strong>! <br />
              Seu acesso já foi solicitado e notificamos os administradores.
              <br /><br />
              <span className="text-sm bg-blue-50 text-blue-700 py-1 px-3 rounded-full">
                Fique tranquilo, em breve será liberado!
              </span>
            </p>
            <div className="flex flex-col gap-3">
              <button onClick={() => window.location.reload()} className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-sm">
                Verificar novamente
              </button>
              <button onClick={handleLogout} className="w-full py-3 border border-gray-200 text-gray-500 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                Sair por enquanto
              </button>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="h-[100dvh] flex items-center justify-center bg-gray-100 p-4">
        <div className="w-96 bg-white shadow-xl rounded-xl p-6 text-center border border-red-100">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Acesso Restrito</h2>
          <p className="mb-6 text-gray-600">O e-mail <strong>{user.email}</strong> não possui permissão de acesso.</p>
          <button onClick={handleLogout} className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 text-gray-700">Sair</button>
        </div>
      </div>
    );
  }

  // 3. TELA PRINCIPAL (DASHBOARD)
  return (
    <div className="h-[100dvh] flex flex-col overflow-hidden relative">
      <MenuLateral
        isOpen={menuAberto}
        onClose={() => setMenuAberto(false)}
        user={user}
        isAdmin={isAdmin}
        navigate={navigate}
        handleLogout={handleLogout}
        abrirAjuda={() => setAjudaAberta(true)}
        abrirLegenda={() => setLegendaAberta(true)}
      />

      <LegendaModal
        isOpen={legendaAberta}
        onClose={() => setLegendaAberta(false)}
        isAdmin={isAdmin}
      />

      <AjudaModal
        isOpen={ajudaAberta}
        onClose={() => setAjudaAberta(false)}
        isAdmin={isAdmin}
      />

      <MeusTerritoriosModal
        isOpen={meusTerritoriosAberto}
        onClose={() => setMeusTerritoriosAberto(false)}
        user={user}
        navigate={navigate}
      />

      {/* CABEÇALHO */}
      <div className="h-16 bg-blue-600 text-white shadow-md z-20 px-4 flex items-center justify-between flex-shrink-0">
        
        {/* LADO ESQUERDO: LOGO (Mobile) vs TÍTULO (Desktop) */}
        <div className="flex items-center gap-3">
          {/* Logo: Visível no mobile (sm:hidden esconde em telas maiores) */}
          <img 
            src="./icon-192.png" 
            alt="Logo" 
            className="h-9 w-9 rounded-lg shadow-sm border border-blue-400/50 sm:hidden" 
          />
          {/* Texto: Visível no desktop (hidden esconde no mobile) */}
          <span className="text-xl font-bold tracking-wide hidden sm:block">Territórios</span>
        </div>

        {/* LADO DIREITO: ÍCONES E BOTÕES */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* ATALHO 1: RELATÓRIOS (SÓ ADMIN) - Sempre visível agora */}
          {isAdmin && (
            <button
              onClick={() => navigate('/relatorios')}
              className="p-2 text-white/90 hover:text-white hover:bg-blue-500 rounded-full transition-colors relative"
              title="Relatórios"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </button>
          )}

          {/* ATALHO 2: AJUDA (QUEM NÃO É ADMIN) - Sempre visível agora */}
          {!isAdmin && (
            <button
              onClick={() => setAjudaAberta(true)}
              className="p-2 text-white/90 hover:text-white hover:bg-blue-500 rounded-full transition-colors relative"
              title="Como Usar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          )}

          <SininhoNotificacoes user={user} isAdmin={isAdmin} />

          <button
            onClick={() => setMeusTerritoriosAberto(true)}
            className="flex items-center gap-1 px-3 py-1.5 bg-blue-700/80 hover:bg-blue-800 rounded-full shadow-sm text-sm font-semibold transition-colors active:scale-95 border border-blue-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="text-xs uppercase tracking-wider">Meus</span>
          </button>

          <button
            onClick={() => setMenuAberto(true)}
            className="p-1 hover:bg-blue-700 rounded transition-colors ml-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex-1 bg-gray-100 relative z-0">
        <Mapa user={user} isAdmin={isAdmin} />
      </div>
    </div>
  );
}

// --- APP PRINCIPAL ---
function App() {
  const [user, setUser] = useState(null);

  // 1. Monitora o Auth Globalmente
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  return (
    <HashRouter>
      <AutoUpdate />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/app" element={<Dashboard />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/relatorios" element={<Relatorios />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
```

---
## FILE: src\AutoUpdate.jsx

```jsx
// src/AutoUpdate.jsx (Modificado)
import React, { useEffect, useState } from 'react';
import appInfo from './version.json';

// Criamos um evento customizado para notificar quando há atualização disponível
export const checkForUpdate = async (manual = false) => {
    try {
        const baseUrl = import.meta.env.BASE_URL;
        const response = await fetch(`${baseUrl}version.json?t=${new Date().getTime()}`, {
            cache: 'no-store'
        });

        if (!response.ok) return false;
        const data = await response.json();

        if (data.version !== appInfo.version) {
            if (manual) {
                // Se for manual, acionamos a atualização
                if ('serviceWorker' in navigator) {
                    const regs = await navigator.serviceWorker.getRegistrations();
                    for (let r of regs) await r.unregister();
                }
                // O parâmetro de busca força o Android a ignorar o cache do index.html
                window.location.href = `/?v=${data.version}`;
            }
            return true; // Há nova versão
        }
    } catch (e) {
        console.error("Erro ao verificar versão:", e);
    }
    return false;
};

const AutoUpdate = () => {
    useEffect(() => {
        const intervalo = setInterval(() => checkForUpdate(false), 60 * 1000);
        return () => clearInterval(intervalo);
    }, []);

    return null;
};

export default AutoUpdate;
```

---
## FILE: src\firebase.js

```js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Apenas getFirestore

const firebaseConfig = {
    apiKey: "AIzaSyBmR4PilWSpPeP_TNWi7LCn9iGso3xnWI8",
    authDomain: "territorios-palmas.firebaseapp.com",
    projectId: "territorios-palmas",
    storageBucket: "territorios-palmas.firebasestorage.app",
    messagingSenderId: "248096290085",
    appId: "1:248096290085:web:ea8d224c2bb99b140456cc"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Agora o DB usa a conexão direta, sem "cache offline perigoso" para iOS
export const db = getFirestore(app);
```

---
## FILE: src\index.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Ajuste para o mapa ocupar a tela toda depois */
html,
body,
#root {
  height: 100%;
  margin: 0;
  padding: 0;
}

/* Remove o fundo branco padrão dos números nas bolinhas */
.leaflet-tooltip.sem-fundo {
  background: transparent !important;
  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;
  color: white !important; /* Garante que o número seja branco */
  font-weight: bold;
  font-size: 1.1rem; /* Número um pouco maior */
}
```

---
## FILE: src\main.jsx

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'leaflet/dist/leaflet.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

```

---
## FILE: src\Mapa.jsx

```jsx
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Polygon, Popup, CircleMarker, Tooltip, useMapEvents, useMap, Marker } from 'react-leaflet';
import { doc, onSnapshot, updateDoc, setDoc, arrayUnion, arrayRemove, collection, getDocs, addDoc, query, where, deleteField } from 'firebase/firestore';
import { db } from './firebase';
import L from 'leaflet';

// --- CSS ---
const cssTooltip = `
  .label-territorio { background: transparent; border: none; box-shadow: none; font-family: 'Bahnschrift', sans-serif-condensed, sans-serif; text-align: center; line-height: 1.1; pointer-events: none; }
  .label-nome { font-weight: 700; font-size: 14px; color: #1e3a8a; text-shadow: 2px 0 #fff, -2px 0 #fff, 0 2px #fff, 0 -2px #fff, 1px 1px #fff, -1px -1px #fff; display: block; font-stretch: condensed; letter-spacing: -0.5px; margin-bottom: 2px; white-space: normal; max-width: 140px; margin-left: auto; margin-right: auto; }
  .label-status { font-size: 11px; font-weight: 700; color: #444; text-shadow: 1px 1px 0px rgba(255,255,255,0.9); background-color: rgba(255,255,255,0.7); padding: 1px 6px; border-radius: 8px; display: inline-block; }
  .label-tempo { display: block; font-size: 10px; font-weight: 800; color: #7f1d1d; margin-top: 2px; text-shadow: 1px 1px 0px rgba(255,255,255,0.8); text-transform: uppercase; }
  .sem-fundo { background: transparent; border: none; box-shadow: none; }
  
  .map-layer-btn { width: 48px; height: 48px; border-radius: 8px; border: 2px solid white; box-shadow: 0 4px 6px rgba(0,0,0,0.3); cursor: pointer; transition: transform 0.1s, border-color 0.2s; overflow: hidden; position: relative; background-size: cover; }
  .map-layer-btn:active { transform: scale(0.95); }
  .map-layer-btn.active { border-color: #2563eb; transform: scale(1.05); z-index: 10; }
  
  .thumb-rua { background: #e5e7eb; } 
  .thumb-rua::after { content: '🗺️'; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 20px; }

  .thumb-google { background: #fce7b2; } 
  .thumb-google::after { content: '📍'; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 20px; }
  
  .thumb-satelite {
    background-color: #172554;
    background-image: 
      radial-gradient(circle at 15% 25%, white 1px, transparent 1.5px),
      radial-gradient(circle at 75% 15%, rgba(255,255,255,0.8) 1px, transparent 1.5px),
      radial-gradient(circle at 60% 85%, rgba(255,255,255,0.9) 1px, transparent 1.5px),
      radial-gradient(circle at 25% 80%, rgba(255,255,255,0.6) 1px, transparent 1.5px),
      radial-gradient(circle at 85% 65%, rgba(255,255,255,0.7) 1px, transparent 1.5px);
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .thumb-satelite::after { 
    content: '🛰️'; 
    position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); 
    font-size: 24px; 
    filter: drop-shadow(0 0 4px rgba(255,255,255,0.5)); 
  }

  .leaflet-tooltip.sem-fundo {
    background-color: transparent !important;
    border: none !important;
    box-shadow: none !important;
  }

  .popup-btn-action { display: flex; align-items: center; justify-content: center; gap: 6px; width: 100%; padding: 8px; border-radius: 6px; font-weight: bold; font-size: 12px; transition: background-color 0.2s; box-shadow: 0 1px 2px rgba(0,0,0,0.1); cursor: pointer; }
  .popup-btn-action:disabled { opacity: 0.7; cursor: not-allowed; }
`;

// Função Centroide
const calcularCentroide = (coords) => {
    let lat = 0, lng = 0, n = coords.length;
    coords.forEach(p => { lat += p[1]; lng += p[0]; });
    return { lat: lat / n, lng: lng / n };
};

// --- DEEP LINK HANDLER ---
const DeepLinkHandler = () => {
    const map = useMap();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const boundsParam = params.get('bounds');
        if (boundsParam) {
            const parts = boundsParam.split(',').map(parseFloat);
            if (parts.length === 4) {
                const [minLat, minLng, maxLat, maxLng] = parts;
                const bounds = L.latLngBounds([minLat, minLng], [maxLat, maxLng]);
                setTimeout(() => {
                    map.fitBounds(bounds, { padding: [50, 50], animate: true, duration: 1.5 });
                }, 500);
                return;
            }
        }
        const lat = params.get('lat');
        const lng = params.get('lng');
        const z = params.get('z');
        if (lat && lng) {
            setTimeout(() => {
                map.flyTo([parseFloat(lat), parseFloat(lng)], parseFloat(z) || 17, { animate: true, duration: 1.5 });
            }, 500);
        }
    }, [location, map]);
    return null;
};

// --- COMPONENTES DE UI ---

const SeletorCamadas = ({ tipoMapa, setTipoMapa, showRefs, setShowRefs, showCondos, setShowCondos }) => {
    const alternarCamada = () => {
        if (tipoMapa === 'google') setTipoMapa('satelite');
        else if (tipoMapa === 'satelite') setTipoMapa('padrao');
        else setTipoMapa('google');
    };

    let classeBotao = '';
    let tituloBotao = '';

    if (tipoMapa === 'google') {
        classeBotao = 'thumb-satelite';
        tituloBotao = "Mudar para Satélite";
    } else if (tipoMapa === 'satelite') {
        classeBotao = 'thumb-rua';
        tituloBotao = "Mudar para OpenStreetMap";
    } else {
        classeBotao = 'thumb-google';
        tituloBotao = "Mudar para Google Maps";
    }

    return (
        <div className="absolute bottom-6 left-4 z-[400] flex flex-col gap-3">
            <button onClick={() => setShowRefs(!showRefs)} className={`w-12 h-12 rounded-lg bg-white shadow-lg flex items-center justify-center border-2 transition-all ${showRefs ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-400'}`} title="Mostrar/Ocultar Pontos de Referência">📍</button>
            <button onClick={() => setShowCondos(!showCondos)} className={`w-12 h-12 rounded-lg bg-white shadow-lg flex items-center justify-center border-2 transition-all ${showCondos ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-400'}`} title="Mostrar/Ocultar Condomínios">🏢</button>
            <button onClick={alternarCamada} className={`map-layer-btn ${classeBotao}`} title={tituloBotao} />
        </div>
    );
};

const ControleVisibilidade = ({ ocultarCores, setOcultarCores }) => {
    return (
        <div className="absolute top-4 right-4 z-[400] flex flex-col gap-2">
            <button onClick={() => setOcultarCores(!ocultarCores)} className={`w-12 h-12 flex items-center justify-center rounded-full shadow-xl border transition-all duration-200 active:scale-95 ${ocultarCores ? 'bg-blue-600 text-white border-blue-700' : 'bg-white text-slate-500 border-slate-300'}`} title={ocultarCores ? "Mostrar Cores" : "Ocultar Cores (Ver Mapa)"}>
                {ocultarCores ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                )}
            </button>
        </div>
    );
};

const ControlesNavegacao = ({ setPosicaoUsuario }) => {
    const map = useMap();
    const [buscando, setBuscando] = useState(false);

    const encontrarUsuario = () => {
        setBuscando(true);
        map.locate().on("locationfound", function (e) {
            setPosicaoUsuario(e.latlng);
            map.flyTo(e.latlng, 17);
            setBuscando(false);
        }).on("locationerror", function (e) {
            alert("Ative o GPS.");
            setBuscando(false);
        });
    };

    return (
        <div className="absolute bottom-6 right-4 z-[400] flex flex-col gap-3">
            <button onClick={encontrarUsuario} className="bg-white w-12 h-12 flex items-center justify-center shadow-xl border border-slate-200 hover:bg-slate-50 active:scale-95 transition-all duration-200 rounded-full mb-2 text-blue-600">
                {buscando ? <div className="animate-spin rounded-full h-5 w-5 border-2 border-slate-300 border-t-blue-600"></div> : <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" /></svg>}
            </button>
            <div className="flex flex-col shadow-xl rounded-xl overflow-hidden border border-slate-200 bg-white">
                <button onClick={() => map.zoomIn()} className="w-12 h-12 flex items-center justify-center text-slate-600 border-b border-slate-100"><svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path d="M12 4.5v15m7.5-7.5h-15" /></svg></button>
                <button onClick={() => map.zoomOut()} className="w-12 h-12 flex items-center justify-center text-slate-600"><svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path d="M19.5 12h-15" /></svg></button>
            </div>
        </div>
    );
};

const MarcadorUsuario = ({ posicao }) => {
    if (!posicao) return null;

    const compartilharLocalizacao = () => {
        const linkGoogle = `https://www.google.com/maps?q=${posicao.lat},${posicao.lng}`;
        const textoEncoded = encodeURIComponent(`*Minha localização no território:*\n\n${linkGoogle}`);
        window.open(`https://wa.me/?text=${textoEncoded}`, '_blank');
    };

    const iconeGPS = L.divIcon({ className: 'bg-transparent', html: `<div class="flex items-center justify-center relative w-16 h-16 -ml-4 -mt-4"><div class="absolute w-12 h-12 bg-blue-500/30 rounded-full animate-pulse"></div><div class="relative w-5 h-5 bg-blue-600 border-[3px] border-white rounded-full shadow-lg z-10"></div></div>`, iconSize: [20, 20], iconAnchor: [10, 10] });

    return (
        <Marker position={posicao} icon={iconeGPS}>
            <Popup>
                <div className="text-center p-1">
                    <p className="font-bold text-sm mb-2 text-gray-700">Você está aqui</p>
                    <button onClick={compartilharLocalizacao} className="popup-btn-action bg-blue-600 text-white hover:bg-blue-700 text-xs py-1 px-3 shadow-md">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" /></svg>
                        Compartilhar Local
                    </button>
                </div>
            </Popup>
        </Marker>
    );
};

// --- MODAL DE NOTAS ---
const ModalNota = ({ isOpen, onClose, onAdicionar, onEditar, onExcluir, dados, user, isAdmin }) => {
    const [texto, setTexto] = useState('');
    const [editandoId, setEditandoId] = useState(null);
    const scrollRef = useRef(null);

    const notas = useMemo(() => {
        if (!dados?.notas) return [];
        if (typeof dados.notas === 'string') {
            return [{ id: 'legacy', texto: dados.notas, autorNome: 'Sistema (Antigo)', data: null, autorEmail: 'sistema' }];
        }
        return dados.notas;
    }, [dados]);

    useEffect(() => {
        if (isOpen) {
            setTexto('');
            setEditandoId(null);
            setTimeout(() => {
                if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
            }, 100);
        }
    }, [isOpen, dados]);

    const handleSubmit = () => {
        if (!texto.trim()) return;
        if (editandoId) {
            onEditar(dados.quadraId, editandoId, texto);
        } else {
            onAdicionar(dados.quadraId, texto);
        }
        setTexto('');
        setEditandoId(null);
    };

    const iniciarEdicao = (nota) => {
        setTexto(nota.texto);
        setEditandoId(nota.id);
    };

    const cancelarEdicao = () => {
        setTexto('');
        setEditandoId(null);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-fade-in" style={{ zIndex: 9999 }}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col h-[500px]">
                <div className="bg-blue-600 p-4 flex justify-between items-center shrink-0">
                    <h3 className="text-white font-bold text-lg flex items-center gap-2">
                        💬 Notas: {dados?.quadraId}
                    </h3>
                    <button onClick={onClose} className="text-white/80 hover:text-white text-xl font-bold">×</button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-3" ref={scrollRef}>
                    {notas.length === 0 && (
                        <p className="text-center text-gray-400 text-sm italic mt-10">Nenhuma observação ainda.</p>
                    )}
                    {notas.map((nota) => {
                        const isMe = user?.email === nota.autorEmail;
                        const podeExcluir = isAdmin || isMe;
                        const podeEditar = isMe;
                        return (
                            <div key={nota.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                                <div className={`max-w-[85%] rounded-lg p-3 shadow-sm relative group ${isMe ? 'bg-blue-100 text-blue-900 rounded-tr-none' : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'}`}>
                                    <div className="flex justify-between items-center gap-4 mb-1 border-b border-black/5 pb-1">
                                        <span className="text-[10px] font-bold uppercase opacity-70">{nota.autorNome || 'Anônimo'}</span>
                                        <span className="text-[9px] opacity-50">
                                            {nota.data ? new Date(nota.data).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }) : '-'}
                                        </span>
                                    </div>
                                    <p className="text-sm whitespace-pre-wrap">{nota.texto}</p>
                                    <div className="absolute -top-2 -right-2 hidden group-hover:flex gap-1">
                                        {podeEditar && (
                                            <button onClick={() => iniciarEdicao(nota)} className="bg-white text-blue-600 border border-blue-200 p-1 rounded-full shadow hover:bg-blue-50" title="Editar">
                                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                            </button>
                                        )}
                                        {podeExcluir && (
                                            <button onClick={() => onExcluir(dados.quadraId, nota.id)} className="bg-white text-red-600 border border-red-200 p-1 rounded-full shadow hover:bg-red-50" title="Excluir">
                                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="p-3 bg-white border-t border-gray-200">
                    {editandoId && (
                        <div className="flex justify-between items-center text-xs text-blue-600 mb-2 bg-blue-50 p-1 px-2 rounded">
                            <span>✏️ Editando mensagem...</span>
                            <button onClick={cancelarEdicao} className="underline hover:text-blue-800">Cancelar</button>
                        </div>
                    )}
                    <div className="flex gap-2">
                        <textarea
                            className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none text-sm"
                            placeholder="Escreva uma observação..."
                            rows="2"
                            value={texto}
                            onChange={(e) => setTexto(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(); } }}
                        />
                        <button onClick={handleSubmit} disabled={!texto.trim()} className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors self-end">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- QUADRA MARKER ---
const QuadraMarker = ({ quadra, idTerritorio, isFeita, podeEditar, nota, onAbrirNota, totalQuadras, qtdFeitas, onConclusao }) => {
    const alternarQuadra = async () => {
        if (!podeEditar) return;
        const idSeguro = `t_${idTerritorio}`;
        const docRef = doc(db, "territorios", idSeguro);

        // --- CORREÇÃO: SALVA A DATA DA ÚLTIMA ALTERAÇÃO NO BANCO ---
        const timestampNow = new Date();

        if (isFeita) {
            await updateDoc(docRef, {
                quadras_feitas: arrayRemove(quadra.id),
                ultimaAlteracao: timestampNow // Atualiza data
            });
        } else {
            await updateDoc(docRef, {
                quadras_feitas: arrayUnion(quadra.id),
                ultimaAlteracao: timestampNow // Atualiza data
            });
            // Se completar todas
            if (qtdFeitas + 1 === totalQuadras) {
                if (onConclusao) onConclusao();
            }
        }
    };

    const handleContextMenu = (e) => {
        if (e.originalEvent) { e.originalEvent.preventDefault(); e.originalEvent.stopPropagation(); }
        if (podeEditar) { onAbrirNota(quadra.id, nota); }
    };

    const temNota = () => {
        if (!nota) return false;
        if (typeof nota === 'string') return nota.trim() !== "";
        if (Array.isArray(nota)) return nota.length > 0;
        return false;
    };

    return (
        <CircleMarker
            center={[quadra.lat, quadra.lng]}
            pathOptions={{
                color: isFeita ? '#166534' : '#b91c1c',
                fillColor: isFeita ? '#22c55e' : '#ef4444',
                fillOpacity: 1, weight: 2
            }}
            radius={16}
            eventHandlers={{ click: alternarQuadra, contextmenu: handleContextMenu }}
        >
            <Tooltip direction="center" permanent className="sem-fundo" opacity={1}>
                <div className="relative flex items-center justify-center w-8 h-8 pointer-events-none">
                    <span className="font-bold text-white text-[15px] drop-shadow-md select-none">{quadra.id}</span>
                    {temNota() && (
                        <span className="absolute -top-1 -right-2 w-3 h-3 bg-yellow-400 border-2 border-white rounded-full shadow-sm z-50" title="Tem observações"></span>
                    )}
                </div>
            </Tooltip>
        </CircleMarker>
    );
};

// --- TERRITÓRIO DETALHADO ATUALIZADO ---
const TerritorioDetalhado = ({ dados, idTerritorio, zoomLevel, user, isAdmin, listaUsuarios, ocultarCores, showRefs, showCondos }) => {
    const [dadosBanco, setDadosBanco] = useState({ status: 'aberto', quadras_feitas: [], designadoPara: null, designadoNome: null, ultimaConclusao: null });
    const [usuarioSelecionado, setUsuarioSelecionado] = useState("");
    const [msgPronta, setMsgPronta] = useState(null);
    const [posicaoClique, setPosicaoClique] = useState(null);
    const [modalConfig, setModalConfig] = useState({ open: false, dados: null });
    const [loadingAction, setLoadingAction] = useState(false);

    const pontosFiltrados = useMemo(() => {
        const todos = dados.properties.pontos || [];
        return {
            trabalho: todos.filter(p => !p.tipo || p.tipo === 'quadra' || p.tipo === 'endereco'),
            referencias: todos.filter(p => p.tipo === 'referencia'),
            condominios: todos.filter(p => p.tipo === 'condominio')
        };
    }, [dados]);

    const listaQuadras = pontosFiltrados.trabalho.map((p, index) => ({
        id: p.nome || (index + 1),
        lat: p.lat,
        lng: p.lng
    }));

    const nome = dados.properties.nome || `T-${idTerritorio}`;
    const codigoTerritorio = nome.includes('-') ? nome.split('-')[0].trim() : nome;
    const coords = dados.geometry.coordinates[0];
    const posicoes = coords.map(coord => [coord[1], coord[0]]);
    const centro = calcularCentroide(coords);

    useEffect(() => {
        const idSeguro = `t_${idTerritorio}`;
        const unsub = onSnapshot(doc(db, "territorios", idSeguro), (docSnapshot) => {
            if (docSnapshot.exists()) {
                const data = docSnapshot.data();
                setDadosBanco(data);
                setUsuarioSelecionado("");
            } else { setDoc(docSnapshot.ref, { status: 'aberto', nome: nome, quadras_feitas: [] }); }
        });
        return () => unsub();
    }, [idTerritorio, nome]);

    const notificarConclusao = async () => {
        if (!dadosBanco.designadoPara) return;
        try {
            const q = query(collection(db, "usuarios"), where("role", "==", "admin"));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                await addDoc(collection(db, "notificacoes"), {
                    para: "ADMINS",
                    texto: `🏁 O Território ${nome} foi 100% concluído por ${dadosBanco.designadoNome}.`,
                    data: new Date(),
                    lida: false,
                    tipo: 'devolucao',
                    origem: 'sistema'
                });
            }
            alert("Parabéns! Você concluiu todas as quadras. Os administradores foram notificados.");
        } catch (error) { console.error(error); }
    };

    const adicionarNota = async (quadraId, texto) => {
        const idSeguro = `t_${idTerritorio}`;
        const docRef = doc(db, "territorios", idSeguro);
        const novaNota = { id: crypto.randomUUID(), texto, autorEmail: user.email, autorNome: user.displayName || user.email.split('@')[0], data: new Date().toISOString() };
        const notasAtuais = dadosBanco.notas_quadras?.[quadraId];
        let novoArray = Array.isArray(notasAtuais) ? [...notasAtuais, novaNota] : (typeof notasAtuais === 'string' ? [{ id: 'legacy', texto: notasAtuais, autorNome: 'Sistema', data: new Date().toISOString(), autorEmail: 'sistema' }, novaNota] : [novaNota]);

        // --- CORREÇÃO: ATUALIZA ULTIMA ALTERAÇÃO AO ADICIONAR NOTA ---
        await updateDoc(docRef, {
            [`notas_quadras.${quadraId}`]: novoArray,
            ultimaAlteracao: new Date()
        });
    };

    const editarNota = async (quadraId, noteId, novoTexto) => {
        const idSeguro = `t_${idTerritorio}`;
        const docRef = doc(db, "territorios", idSeguro);
        const notasAtuais = dadosBanco.notas_quadras?.[quadraId];
        if (!Array.isArray(notasAtuais)) return;
        const novoArray = notasAtuais.map(n => {
            if (n.id === noteId) {
                if (n.autorEmail !== user.email && !isAdmin) return n;
                return { ...n, texto: novoTexto, editadoEm: new Date().toISOString() };
            }
            return n;
        });

        // --- CORREÇÃO: ATUALIZA ULTIMA ALTERAÇÃO AO EDITAR NOTA ---
        await updateDoc(docRef, {
            [`notas_quadras.${quadraId}`]: novoArray,
            ultimaAlteracao: new Date()
        });
    };

    const removerNota = async (quadraId, noteId) => {
        if (!confirm("Excluir esta mensagem?")) return;
        const idSeguro = `t_${idTerritorio}`;
        const docRef = doc(db, "territorios", idSeguro);
        const notasAtuais = dadosBanco.notas_quadras?.[quadraId];

        const updates = { ultimaAlteracao: new Date() }; // Prepara update com data

        if (!Array.isArray(notasAtuais)) {
            if (noteId === 'legacy') {
                updates[`notas_quadras.${quadraId}`] = deleteField();
                await updateDoc(docRef, updates);
            }
            return;
        }

        const novoArray = notasAtuais.filter(n => n.id !== noteId);
        updates[`notas_quadras.${quadraId}`] = novoArray;

        await updateDoc(docRef, updates);
    };

    const abrirModalNota = (quadraId, notasAtuais) => {
        setModalConfig({ open: true, dados: { quadraId, notas: notasAtuais } });
    };

    const fecharModal = () => {
        setModalConfig({ ...modalConfig, open: false });
    };

    const usuarioAtual = user?.email;
    const donoDoTerritorio = dadosBanco.designadoPara;
    const isMeu = donoDoTerritorio === usuarioAtual;
    const isOcupado = donoDoTerritorio && !isMeu;
    const isCompleto = listaQuadras.length > 0 && dadosBanco.quadras_feitas?.length === listaQuadras.length;
    const feitas = dadosBanco.quadras_feitas?.length || 0;
    const total = listaQuadras.length;

    // --- CÁLCULO DA PORCENTAGEM (PARA O TOOLTIP) ---
    const porcentagem = total > 0 ? (feitas / total) * 100 : 0;
    const pctInteira = Math.round(porcentagem);

    // --- NOME CURTO PARA O TOOLTIP ---
    const nomeResponsavelCurto = dadosBanco.designadoNome ? dadosBanco.designadoNome.split(' ')[0] : "Ocupado";

    // VISIBILIDADE
    const deveMostrarQuadras = zoomLevel >= 17 && (isAdmin || isMeu);
    const podeVerDetalhes = isAdmin || isMeu;

    let diasSemTrabalhar = 0;
    let textoTempo = "Nunca";
    if (dadosBanco.ultimaConclusao) {
        const dataUltima = dadosBanco.ultimaConclusao.toDate ? dadosBanco.ultimaConclusao.toDate() : new Date(dadosBanco.ultimaConclusao);
        diasSemTrabalhar = Math.ceil(Math.abs(new Date() - dataUltima) / (1000 * 60 * 60 * 24));
        textoTempo = diasSemTrabalhar > 60 ? `${Math.floor(diasSemTrabalhar / 30)} meses` : `${diasSemTrabalhar} dias`;
    }

    // --- CORES ATUALIZADAS (TONS DE LARANJA) ---
    let corPreenchimento = '#fed7aa'; // Padrão
    let corBorda = '#c2410c';
    let pesoBorda = 1;
    let opacidade = 0.5;
    let opacidadeBorda = 1;

    if (isCompleto) {
        corPreenchimento = '#22c55e'; corBorda = '#15803d'; opacidade = 0.6; if (isMeu) pesoBorda = 3;
    }
    else if (isMeu) {
        corPreenchimento = '#3b82f6'; corBorda = '#1e40af'; pesoBorda = 3; if (isAdmin) { corPreenchimento = '#a855f7'; corBorda = '#6b21a8'; }
    }
    else if (isOcupado) {
        corPreenchimento = '#9ca3af'; corBorda = '#4b5563'; opacidade = 0.4;
    }
    else {
        // --- ESCALA DE LARANJAS ---
        if (!dadosBanco.ultimaConclusao) {
            corPreenchimento = '#fed7aa'; // Padrão (Nunca trabalhado)
        } else {
            if (diasSemTrabalhar > 180) { corPreenchimento = '#c2410c'; } // +6 meses: Tijolo
            else if (diasSemTrabalhar > 120) { corPreenchimento = '#ea580c'; } // 4-6 meses: Laranja Escuro
            else if (diasSemTrabalhar > 60) { corPreenchimento = '#fb923c'; } // 2-4 meses: Laranja Médio
            else { corPreenchimento = '#ffedd5'; } // < 2 meses: Laranja Muito Claro
        }
    }

    if (!isAdmin && !isMeu) { opacidade = 0.2; opacidadeBorda = 0.4; }
    if (ocultarCores) { corPreenchimento = 'transparent'; opacidade = 0; pesoBorda = 5; opacidadeBorda = 0.8; }

    const gerarLinkMsg = (uNome, uWhats) => {
        const baseUrl = window.location.href.split('?')[0].split('#')[0] + '#/app';
        const linkInterno = `${baseUrl}?lat=${centro.lat}&lng=${centro.lng}&z=16`;
        const textoMsg = `Olá *${uNome}*! \nO território *${nome}* foi designado para você.\n\n *Acesse pelo App:* ${linkInterno}\n\nBom trabalho!`;
        return { texto: textoMsg, whatsapp: uWhats, nome: uNome };
    };

    const salvarDesignacao = async () => {
        const idSeguro = `t_${idTerritorio}`;

        // Bloqueia e mostra feedback
        setLoadingAction(true);

        try {
            if (!usuarioSelecionado) {
                if (!dadosBanco.designadoPara || !confirm("Confirmar devolução do território?")) {
                    setLoadingAction(false);
                    return;
                }
                const ciclo = dadosBanco.cicloAtual || { dataInicio: dadosBanco.dataDesignacao || new Date(), responsaveis: [dadosBanco.designadoNome] };
                const historico = { ...ciclo, dataTermino: new Date(), responsaveis: [...new Set([...(ciclo.responsaveis || []), dadosBanco.designadoNome])] };
                const updateData = { designadoPara: null, designadoNome: null, dataDesignacao: null, cicloAtual: null, historico: arrayUnion(historico) };
                if (isCompleto) { updateData.ultimaConclusao = new Date(); updateData.quadras_feitas = []; }

                await updateDoc(doc(db, "territorios", idSeguro), updateData);
                try { await addDoc(collection(db, "notificacoes"), { para: "ADMINS", texto: `Território ${nome} devolvido.`, data: new Date(), lida: false, tipo: 'devolucao' }); } catch (e) { }

                setMsgPronta(null);
                alert("✅ Território devolvido com sucesso! Sincronizado com o servidor.");
            } else {
                const usuarioObj = listaUsuarios.find(u => u.email === usuarioSelecionado);
                const novoNome = usuarioObj ? usuarioObj.nome : "Dirigente";
                let novoCiclo = dadosBanco.designadoPara ? { dataInicio: dadosBanco.cicloAtual?.dataInicio, responsaveis: [...new Set([...(dadosBanco.cicloAtual?.responsaveis || [dadosBanco.designadoNome]), novoNome])] } : { dataInicio: new Date(), responsaveis: [novoNome] };

                await updateDoc(doc(db, "territorios", idSeguro), { designadoPara: usuarioSelecionado, designadoNome: novoNome, dataDesignacao: new Date(), cicloAtual: novoCiclo });

                const link = `${window.location.href.split('#')[0]}#/app?lat=${centro.lat}&lng=${centro.lng}&z=16`;
                setMsgPronta({ texto: `Olá *${novoNome}*! \nO território *${nome}* foi designado para você.\n\n *Acesse:* ${link}\n\nBom trabalho!`, whatsapp: usuarioObj?.whatsapp, nome: novoNome });

                alert(`✅ Designação salva com sucesso para ${novoNome}!`);
            }
        } catch (error) {
            console.error("Erro ao salvar:", error);
            alert("❌ ERRO AO SALVAR: Verifique sua conexão com a internet e tente novamente. A alteração NÃO foi salva.");
        } finally {
            setLoadingAction(false);
        }
    };

    const compartilharDiretamente = () => {
        const usuarioObj = listaUsuarios.find(u => u.email === dadosBanco.designadoPara);
        const msg = gerarLinkMsg(dadosBanco.designadoNome, usuarioObj?.whatsapp);
        const textoEncoded = encodeURIComponent(msg.texto);
        const url = msg.whatsapp ? `https://wa.me/${msg.whatsapp.replace(/\D/g, '')}?text=${textoEncoded}` : `https://wa.me/?text=${textoEncoded}`;
        window.open(url, '_blank');
    };

    const abrirWhatsapp = () => {
        if (!msgPronta) return;
        const textoEncoded = encodeURIComponent(msgPronta.texto);
        const url = msgPronta.whatsapp ? `https://wa.me/${msgPronta.whatsapp.replace(/\D/g, '')}?text=${textoEncoded}` : `https://wa.me/?text=${textoEncoded}`;
        window.open(url, '_blank');
        setMsgPronta(null);
    };

    const compartilharPontoEncontro = () => {
        const p = posicaoClique || centro;
        // LINK CORRIGIDO
        window.open(`https://wa.me/?text=${encodeURIComponent(`*Ponto de Encontro - ${nome}*:\n\nhttps://www.google.com/maps?q=${p.lat},${p.lng}`)}`, '_blank');
    };

    if (!isAdmin && !isMeu) return null;

    return (
        <>
            <Polygon positions={posicoes} pathOptions={{ color: corBorda, weight: pesoBorda, fillColor: corPreenchimento, fillOpacity: opacidade, opacity: opacidadeBorda }} eventHandlers={{ click: (e) => setPosicaoClique(e.latlng) }}>
                <Popup>
                    <div className="min-w-[260px] p-1 font-sans">
                        <div className="border-b border-gray-200 pb-2 mb-2 text-center relative">
                            {/* ÍCONE DE PROCESSANDO NO CABEÇALHO (POPUP) */}
                            {loadingAction && (
                                <div className="absolute top-0 right-0 animate-spin text-blue-600" title="Salvando alterações...">
                                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                </div>
                            )}
                            <strong className="text-lg font-bold text-gray-800 block break-words leading-tight">{nome}</strong>
                            {dadosBanco.ultimaConclusao && <span className="text-[10px] text-gray-500 uppercase">Última vez: {textoTempo} atrás</span>}
                        </div>
                        <div className="mb-3">
                            <div className="flex justify-between text-xs text-gray-600 mb-1 font-medium"><span>{feitas} de {total} quadras</span><span>{Math.round(porcentagem)}%</span></div>
                            <div className="w-full bg-gray-200 rounded-full h-2 border border-gray-300 overflow-hidden"><div className={`h-full transition-all duration-500 ${isCompleto ? 'bg-green-500' : 'bg-blue-600'}`} style={{ width: `${porcentagem}%` }}></div></div>
                        </div>
                        {isAdmin ? (
                            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                                {msgPronta ? (
                                    <div className="animate-fade-in flex flex-col gap-2">
                                        <div className="text-xs text-center text-green-700 font-bold bg-green-100 p-2 rounded">Designado para {msgPronta.nome}</div>
                                        <button onClick={abrirWhatsapp} className="popup-btn-action bg-green-600 text-white hover:bg-green-700">
                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2z" /></svg>
                                            {msgPronta.whatsapp ? "Enviar no WhatsApp" : "Compartilhar Link"}
                                        </button>
                                        <button onClick={() => setMsgPronta(null)} className="text-xs text-gray-400 underline text-center mt-1">Voltar</button>
                                    </div>
                                ) : (
                                    <div className="animate-fade-in">
                                        <div className="mb-3 p-3 bg-white rounded-lg border border-slate-200 shadow-sm text-center flex flex-col">
                                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Responsável ATUAL</span>
                                            {dadosBanco.designadoPara ? (
                                                <span className="text-lg font-extrabold text-blue-800 uppercase leading-tight break-words">
                                                    {dadosBanco.designadoNome}
                                                </span>
                                            ) : (
                                                <span className="text-lg font-bold text-green-600">
                                                    Livre
                                                </span>
                                            )}
                                        </div>
                                        <select
                                            className="w-full p-2 mb-2 text-sm bg-white border border-gray-300 rounded outline-none disabled:bg-gray-100 disabled:text-gray-400"
                                            value={usuarioSelecionado}
                                            onChange={(e) => setUsuarioSelecionado(e.target.value)}
                                            disabled={loadingAction}
                                        >
                                            <option value="">-- Devolver / Livre --</option>
                                            {listaUsuarios.map(u => <option key={u.email} value={u.email} className={u.email === user.email ? "font-bold text-blue-600" : ""}>{u.nome}</option>)}
                                        </select>
                                        <button
                                            onClick={salvarDesignacao}
                                            disabled={(!dadosBanco.designadoPara && !usuarioSelecionado) || loadingAction}
                                            className={`popup-btn-action text-white mb-2 ${loadingAction ? 'bg-slate-400 cursor-wait' :
                                                (!dadosBanco.designadoPara && !usuarioSelecionado ? 'bg-gray-300' : !usuarioSelecionado ? 'bg-red-500' : 'bg-blue-600')
                                                }`}
                                        >
                                            {loadingAction ? (
                                                <span className="flex items-center gap-2">
                                                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Processando...
                                                </span>
                                            ) : (
                                                !dadosBanco.designadoPara && !usuarioSelecionado ? "Já está Livre" : !usuarioSelecionado ? "Devolver" : "Salvar"
                                            )}
                                        </button>
                                        {donoDoTerritorio && <button onClick={compartilharDiretamente} disabled={loadingAction} className="popup-btn-action bg-white border border-green-600 text-green-700 hover:bg-green-50 text-xs py-1 mt-2">Compartilhar Novamente</button>}
                                        {isMeu && <button onClick={compartilharPontoEncontro} className="popup-btn-action bg-green-600 text-white mt-2">Ponto de Encontro</button>}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center mt-2">
                                {isMeu ? <button onClick={compartilharPontoEncontro} className="popup-btn-action bg-green-600 text-white w-full">Ponto de Encontro</button> : <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">{isOcupado ? `Ocupado por ${dadosBanco.designadoNome}` : "Disponível"}</div>}
                            </div>
                        )}
                    </div>
                </Popup>
                {/* TOOLTIP INTELIGENTE */}
                {zoomLevel >= 14 && !ocultarCores && (
                    <Tooltip permanent direction="center" className="label-territorio">
                        <span className="label-nome">{zoomLevel < 16 ? codigoTerritorio : nome}</span>
                        {zoomLevel >= 16 && podeVerDetalhes && (
                            <>
                                {!isOcupado && !isCompleto && (<><span className="label-status">{dadosBanco.ultimaConclusao ? "Trabalhado" : "Nunca"}</span><span className="label-tempo">{textoTempo}</span></>)}
                                {isOcupado && (
                                    <span
                                        className="label-status"
                                        style={{
                                            color: '#fff',
                                            background: `linear-gradient(to right, #15803d ${pctInteira}%, #374151 ${pctInteira}%)`,
                                            fontSize: '12px',
                                            textShadow: 'none',
                                            border: '1px solid white'
                                        }}
                                        title={`${feitas} de ${total} quadras (${pctInteira}%)`}
                                    >
                                        {nomeResponsavelCurto}
                                    </span>
                                )}
                                {isCompleto && <span className="label-status" style={{ color: '#166534', background: '#dcfce7' }}>Feito!</span>}
                            </>
                        )}
                    </Tooltip>
                )}
            </Polygon>

            {/* ITENS INTERNOS COM KEYS ÚNICAS COMPOSTAS (FIXED) */}
            {deveMostrarQuadras && listaQuadras.map((q, idx) => (
                <QuadraMarker
                    key={`t-${idTerritorio}-q-${idx}`} // FIX: Usando apenas ID do território + index para garantir unicidade absoluta
                    quadra={q} idTerritorio={idTerritorio} isFeita={dadosBanco.quadras_feitas?.includes(q.id)} podeEditar={isAdmin || isMeu} nota={dadosBanco.notas_quadras?.[q.id]} onAbrirNota={abrirModalNota} totalQuadras={total} qtdFeitas={feitas} onConclusao={notificarConclusao}
                />
            ))}
            {deveMostrarQuadras && showRefs && pontosFiltrados.referencias.map((ref, idx) => (
                <Marker key={`t-${idTerritorio}-ref-${idx}`} position={[ref.lat, ref.lng]} icon={L.divIcon({ className: 'bg-transparent', html: `<div class="text-xl drop-shadow-sm cursor-help">📍</div>`, iconAnchor: [12, 12] })}>
                    <Tooltip direction="top" offset={[0, -10]} className="font-bold text-xs">{ref.nome}</Tooltip>
                    <Popup>
                        <div className="flex flex-col items-center gap-2 p-1 min-w-[150px]">
                            <h3 className="font-bold text-gray-800 text-sm">{ref.nome}</h3>
                            <button onClick={() => window.open(`https://www.google.com/maps?q=${ref.lat},${ref.lng}`, '_blank')} className="bg-blue-600 text-white px-3 py-1.5 rounded-md text-xs font-medium w-full shadow-sm">Compartilhar</button>
                        </div>
                    </Popup>
                </Marker>
            ))}
            {deveMostrarQuadras && showCondos && pontosFiltrados.condominios.map((c, idx) => (
                <Marker key={`t-${idTerritorio}-cdo-${idx}`} position={[c.lat, c.lng]} icon={L.divIcon({ className: 'bg-transparent', html: `<div class="relative group"><div class="text-xl drop-shadow-sm cursor-help">🏢</div>${(dadosBanco.notas_quadras?.[c.nome]?.length || (typeof dadosBanco.notas_quadras?.[c.nome] === 'string' && dadosBanco.notas_quadras?.[c.nome])) ? '<span class="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 border-2 border-white rounded-full shadow-sm z-50"></span>' : ''}</div>`, iconAnchor: [12, 12] })} eventHandlers={{ click: (e) => { L.DomEvent.stopPropagation(e); abrirModalNota(c.nome, dadosBanco.notas_quadras?.[c.nome]); } }}>
                    <Tooltip direction="top" offset={[0, -10]} className="font-bold text-xs text-blue-800">{c.nome}</Tooltip>
                </Marker>
            ))}
            <ModalNota isOpen={modalConfig.open} dados={modalConfig.dados} user={user} isAdmin={isAdmin} onClose={fecharModal} onAdicionar={adicionarNota} onEditar={editarNota} onExcluir={removerNota} />
        </>
    );
};

// --- MAPA PRINCIPAL ---
const Mapa = ({ user, isAdmin }) => {
    const [geoJsonData, setGeoJsonData] = useState(null);
    const [zoomLevel, setZoomLevel] = useState(14);
    const [listaUsuarios, setListaUsuarios] = useState([]);
    const [posicaoUsuario, setPosicaoUsuario] = useState(null);
    const [tipoMapa, setTipoMapa] = useState('google');
    const [ocultarCores, setOcultarCores] = useState(false);
    const [showRefs, setShowRefs] = useState(true);
    const [showCondos, setShowCondos] = useState(true);

    useEffect(() => {
        fetch('./mapa.json').then(res => res.json()).then(data => setGeoJsonData(data));
        const carregarUsuarios = async () => {
            if (!isAdmin) return;
            try {
                const q = await getDocs(collection(db, "usuarios"));
                const lista = q.docs.map(doc => ({ email: doc.id, nome: doc.data().nome || "Sem Nome", role: doc.data().role, whatsapp: doc.data().whatsapp }));
                lista.sort((a, b) => a.nome.localeCompare(b.nome));
                setListaUsuarios(lista);
            } catch (e) { console.error(e); }
        };
        carregarUsuarios();
    }, [isAdmin]);

    const MapEvents = () => {
        const map = useMapEvents({ zoomend: () => setZoomLevel(map.getZoom()) });
        return null;
    };

    return (
        <div className="h-full w-full relative">
            <style>{cssTooltip}</style>
            {!geoJsonData ? (
                <div className="flex h-full items-center justify-center bg-gray-100"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>
            ) : (
                <MapContainer center={[-26.485, -51.995]} zoom={14} maxZoom={22} zoomControl={false} className="h-full w-full z-0">
                    <MapEvents />
                    <DeepLinkHandler />
                    {tipoMapa === 'padrao' && <TileLayer attribution='© OpenStreetMap' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" maxNativeZoom={19} maxZoom={22} />}
                    {tipoMapa === 'google' && <TileLayer attribution='© Google Maps' url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" maxNativeZoom={20} maxZoom={22} />}
                    {tipoMapa === 'satelite' && <TileLayer attribution='© Google Maps' url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}" maxNativeZoom={20} maxZoom={22} />}

                    <SeletorCamadas tipoMapa={tipoMapa} setTipoMapa={setTipoMapa} showRefs={showRefs} setShowRefs={setShowRefs} showCondos={showCondos} setShowCondos={setShowCondos} />
                    <ControleVisibilidade ocultarCores={ocultarCores} setOcultarCores={setOcultarCores} />
                    <ControlesNavegacao setPosicaoUsuario={setPosicaoUsuario} />
                    <MarcadorUsuario posicao={posicaoUsuario} />

                    {geoJsonData.features.map((feature, index) => {
                        const uniqueId = feature.properties.id || index + 1;
                        // Chave composta para unicidade absoluta
                        const uniqueKey = feature.properties.id ? `terr-${feature.properties.id}` : `terr-idx-${index}`;
                        return (
                            <TerritorioDetalhado
                                key={uniqueKey}
                                dados={feature}
                                idTerritorio={uniqueId}
                                zoomLevel={zoomLevel}
                                user={user}
                                isAdmin={isAdmin}
                                listaUsuarios={listaUsuarios}
                                ocultarCores={ocultarCores}
                                showRefs={showRefs}
                                showCondos={showCondos}
                            />
                        );
                    })}
                </MapContainer>
            )}
        </div>
    );
};

export default Mapa;
```

---
## FILE: src\Relatorios.jsx

```jsx
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const Relatorios = () => {
    const [territorios, setTerritorios] = useState([]);
    const [loading, setLoading] = useState(true);

    // --- ESTADO PARA MULTI-EXPANSÃO ---
    const [linhasExpandidas, setLinhasExpandidas] = useState([]);

    // --- ESTADOS DE FILTRO E ORDENAÇÃO ---
    const [busca, setBusca] = useState('');
    const [statusFiltro, setStatusFiltro] = useState('todos');
    const [tempoFiltro, setTempoFiltro] = useState('todos');
    const [sortConfig, setSortConfig] = useState({ key: 'diasParado', direction: 'desc' });

    useEffect(() => {
        const carregarDados = async () => {
            try {
                // 1. Busca dados do Firebase
                const querySnapshot = await getDocs(collection(db, "territorios"));
                
                // 2. Busca dados do GeoJSON (mapa.json) para calcular bounds e TOTAL DE QUADRAS
                const responseMap = await fetch('./mapa.json');
                const geoData = await responseMap.json();

                const lista = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    const numeroId = parseInt(doc.id.replace('t_', '')) || 0;

                    // --- ENCONTRA A FEATURE NO MAPA ---
                    const feature = geoData.features.find(f => {
                        const fId = f.properties.id || (geoData.features.indexOf(f) + 1);
                        return fId === numeroId;
                    });

                    // --- CÁLCULO DE PORCENTAGEM ---
                    let totalQuadras = 0;
                    let porcentagem = 0;
                    let boundsStr = null;

                    if (feature) {
                        const pontos = feature.properties.pontos || [];
                        totalQuadras = pontos.filter(p => !p.tipo || p.tipo === 'quadra' || p.tipo === 'endereco').length;
                        if (totalQuadras === 0) totalQuadras = 1;

                        const feitas = data.quadras_feitas?.length || 0;
                        porcentagem = Math.round((feitas / totalQuadras) * 100);
                        if (porcentagem > 100) porcentagem = 100;

                        if (feature.geometry) {
                            const coords = feature.geometry.type === 'MultiPolygon' 
                                ? feature.geometry.coordinates.flat(2) 
                                : feature.geometry.coordinates[0]; 
                            
                            if (coords) {
                                let minLat = 90, maxLat = -90, minLng = 180, maxLng = -180;
                                coords.forEach(p => {
                                    const lng = p[0]; const lat = p[1];
                                    if (lat < minLat) minLat = lat; if (lat > maxLat) maxLat = lat;
                                    if (lng < minLng) minLng = lng; if (lng > maxLng) maxLng = lng;
                                });
                                boundsStr = `${minLat},${minLng},${maxLat},${maxLng}`;
                            }
                        }
                    }

                    // --- LÓGICA DE DATAS GERAIS ---
                    let diasParado = 0;
                    let dataUltimaStr = '-';
                    if (data.ultimaConclusao) {
                        const dataUltimaObj = data.ultimaConclusao.toDate ? data.ultimaConclusao.toDate() : new Date(data.ultimaConclusao);
                        diasParado = Math.ceil(Math.abs(new Date() - dataUltimaObj) / (1000 * 60 * 60 * 24));
                        dataUltimaStr = dataUltimaObj.toLocaleDateString('pt-BR');
                    }

                    let diasComDirigente = 0;
                    let dataDesigStr = '-';
                    let dataDesigObj = null;
                    if (data.designadoPara && data.dataDesignacao) {
                        dataDesigObj = data.dataDesignacao.toDate ? data.dataDesignacao.toDate() : new Date(data.dataDesignacao);
                        diasComDirigente = Math.ceil(Math.abs(new Date() - dataDesigObj) / (1000 * 60 * 60 * 24));
                        dataDesigStr = dataDesigObj.toLocaleDateString('pt-BR');
                    }

                    // --- LÓGICA REFINADA DA ÚLTIMA EDIÇÃO ---
                    let diasSemEdicao = 0;
                    let ultimaEdicaoTexto = "Sem dados";
                    
                    if (data.designadoPara) {
                        // Prioriza 'ultimaAlteracao'. Se não tiver, usa 'dataDesignacao'. Se não tiver, usa 'agora'.
                        let dataRef = null;
                        if (data.ultimaAlteracao) {
                            dataRef = data.ultimaAlteracao.toDate ? data.ultimaAlteracao.toDate() : new Date(data.ultimaAlteracao);
                        } else if (dataDesigObj) {
                            dataRef = dataDesigObj;
                        } else {
                            dataRef = new Date();
                        }
                        
                        const agora = new Date();
                        const diferencaMs = Math.abs(agora - dataRef); // Usa abs para evitar números negativos se dataRef for futuro (erro de relógio)
                        
                        const diferencaMinutos = Math.floor(diferencaMs / (1000 * 60));
                        const diferencaHoras = Math.floor(diferencaMs / (1000 * 60 * 60));
                        diasSemEdicao = Math.floor(diferencaMs / (1000 * 60 * 60 * 24)); 

                        if (diferencaMinutos < 2) {
                            ultimaEdicaoTexto = "agora mesmo";
                        } else if (diferencaMinutos < 60) {
                            ultimaEdicaoTexto = `há ${diferencaMinutos} min`;
                        } else if (diferencaHoras < 24) {
                            ultimaEdicaoTexto = `há ${diferencaHoras} h`;
                        } else if (diasSemEdicao === 1) {
                            ultimaEdicaoTexto = "ontem";
                        } else {
                            ultimaEdicaoTexto = `há ${diasSemEdicao} dias`;
                        }
                    }

                    // --- HISTÓRICO ---
                    let historicoProcessado = [];
                    if (data.historico && Array.isArray(data.historico)) {
                        historicoProcessado = data.historico.map(h => {
                            const inicio = h.dataInicio?.toDate ? h.dataInicio.toDate() : (h.dataRetirada?.toDate ? h.dataRetirada.toDate() : new Date());
                            const fim = h.dataTermino?.toDate ? h.dataTermino.toDate() : (h.dataDevolucao?.toDate ? h.dataDevolucao.toDate() : new Date());
                            const inicioStr = !isNaN(inicio) ? inicio.toLocaleDateString('pt-BR') : '?';
                            const fimStr = !isNaN(fim) ? fim.toLocaleDateString('pt-BR') : '?';
                            let listaNomes = Array.isArray(h.responsaveis) ? h.responsaveis.join(", ") : (h.responsavel || "Desconhecido");
                            return { nomes: listaNomes, inicio: inicioStr, termino: fimStr, timestampFim: fim };
                        });
                        historicoProcessado.sort((a, b) => b.timestampFim - a.timestampFim);
                        historicoProcessado = historicoProcessado.slice(0, 10);
                    }

                    const nomeSeguro = data.nome || `Território ${doc.id}`;

                    return {
                        id: doc.id,
                        numeroId,
                        ...data,
                        nome: nomeSeguro,
                        diasParado,
                        diasSemEdicao,
                        ultimaEdicaoTexto,
                        totalQuadras,
                        porcentagem,
                        dataUltimaStr,
                        dataDesigStr,
                        dataDesigObj,
                        historicoLista: historicoProcessado,
                        status: data.designadoPara ? 'ocupado' : 'livre',
                        boundsStr
                    };
                });

                setTerritorios(lista);
                setLoading(false);
            } catch (error) {
                console.error("Erro ao carregar dados:", error);
                setLoading(false);
            }
        };

        carregarDados();
    }, []);

    const formatarTempo = (dias) => {
        if (dias === 0) return "Hoje";
        if (dias < 30) return `${dias} dias`;
        const meses = Math.floor(dias / 30);
        const restoDias = dias % 30;
        let texto = `${meses} ${meses > 1 ? 'meses' : 'mês'}`;
        if (restoDias > 0) texto += ` e ${restoDias} ${restoDias > 1 ? 'dias' : 'dia'}`;
        return texto;
    };

    const toggleLinha = (id) => {
        setLinhasExpandidas(prev => {
            if (prev.includes(id)) return prev.filter(item => item !== id);
            else return [...prev, id];
        });
    };

    const toggleTodas = () => {
        const todosVisiveisIds = dadosProcessados.map(t => t.id);
        const todasAbertas = todosVisiveisIds.every(id => linhasExpandidas.includes(id));
        if (todasAbertas) setLinhasExpandidas([]);
        else setLinhasExpandidas(todosVisiveisIds);
    };

    const limparFiltros = () => {
        setBusca('');
        setStatusFiltro('todos');
        setTempoFiltro('todos');
        setSortConfig({ key: 'diasParado', direction: 'desc' });
        setLinhasExpandidas([]);
    };

    const aplicarFiltroRapido = (tipo) => {
        limparFiltros();
        if (tipo === 'livre') setStatusFiltro('livre');
        if (tipo === 'ocupado') setStatusFiltro('ocupado');
        if (tipo === 'criticos') setTempoFiltro('4_meses');
    };

    const dadosProcessados = useMemo(() => {
        let dados = [...territorios];
        if (statusFiltro !== 'todos') dados = dados.filter(t => t.status === statusFiltro);
        if (tempoFiltro === '2_meses') dados = dados.filter(t => t.diasParado > 60);
        if (tempoFiltro === '4_meses') dados = dados.filter(t => t.diasParado > 120);
        if (tempoFiltro === '6_meses') dados = dados.filter(t => t.diasParado > 180);

        if (busca) {
            const termo = busca.toLowerCase();
            dados = dados.filter(t => {
                const nomeLower = t.nome ? t.nome.toLowerCase() : '';
                const idString = t.numeroId ? t.numeroId.toString() : '';
                const responsavelLower = t.designadoNome ? t.designadoNome.toLowerCase() : '';
                return nomeLower.includes(termo) || idString.includes(termo) || responsavelLower.includes(termo);
            });
        }

        if (sortConfig.key) {
            dados.sort((a, b) => {
                let aValue = a[sortConfig.key];
                let bValue = b[sortConfig.key];
                if (aValue === null || aValue === undefined || aValue === '-') return 1;
                if (bValue === null || bValue === undefined || bValue === '-') return -1;
                if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return dados;
    }, [territorios, busca, statusFiltro, tempoFiltro, sortConfig]);

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
        setSortConfig({ key, direction });
    };

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return <span className="text-gray-300 ml-1 text-[10px]">↕</span>;
        return sortConfig.direction === 'asc' ? <span className="text-blue-600 ml-1 text-[10px]">▲</span> : <span className="text-blue-600 ml-1 text-[10px]">▼</span>;
    };

    const total = territorios.length;
    const ocupados = territorios.filter(t => t.status === 'ocupado').length;
    const livres = total - ocupados;
    const criticos = territorios.filter(t => t.diasParado > 120).length;

    const getCorTempo = (dias) => {
        if (dias > 180) return 'bg-orange-600 text-white';
        if (dias > 120) return 'bg-orange-500 text-white';
        if (dias > 60) return 'bg-orange-300 text-orange-900';
        if (dias > 0) return 'bg-orange-100 text-orange-800';
        return 'bg-slate-100 text-slate-500';
    };

    // --- PDF ---
    const exportarPDF = () => {
        const doc = new jsPDF();
        const baseUrl = window.location.href.split('#')[0];

        doc.setFontSize(18);
        doc.text("Relatório de Territórios", 14, 20);
        doc.setFontSize(10);
        doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}`, 14, 26);

        doc.setFontSize(8);
        doc.setTextColor(100);

        let textoTempoFiltro = "Todos";
        if (tempoFiltro === '2_meses') textoTempoFiltro = "+2 Meses";
        if (tempoFiltro === '4_meses') textoTempoFiltro = "+4 Meses";
        if (tempoFiltro === '6_meses') textoTempoFiltro = "+6 Meses";

        const textoFiltro = busca ? `Busca: "${busca}"` : "Sem busca";
        doc.text(`Filtros: Status (${statusFiltro}) | Tempo (${textoTempoFiltro}) | ${textoFiltro}`, 14, 31);

        const tableColumn = ["Cód.", "Nome", "Status / Progresso", "Histórico / Ciclos", "Ult. Conclusão", "Tempo Parado"];
        const tableRows = [];

        dadosProcessados.forEach(t => {
            let textoHistorico = "";
            let statusTexto = t.status === 'ocupado' ? `Ocupado (${t.porcentagem}%) - Ult. Ed: ${t.ultimaEdicaoTexto}` : 'Livre';

            if (t.status === 'ocupado') {
                let atuais = t.designadoNome;
                if (t.cicloAtual && Array.isArray(t.cicloAtual.responsaveis)) {
                    atuais = t.cicloAtual.responsaveis.join(", ");
                }
                textoHistorico += `[EM ANDAMENTO]\nDirigentes: ${atuais}\nDesde: ${t.dataDesigStr}\n\n`;
            } else {
                textoHistorico += "LIVRE\n";
            }

            if (t.historicoLista && t.historicoLista.length > 0) {
                textoHistorico += "-- HISTÓRICO --\n";
                t.historicoLista.forEach(h => {
                    textoHistorico += `• Início: ${h.inicio} - Dirigentes: ${h.nomes} - Término: ${h.termino}\n`;
                });
            } else {
                textoHistorico += "\n(Sem histórico)";
            }

            const hasLink = !!t.boundsStr;

            const dadosLinha = [
                t.numeroId,
                { content: t.nome, styles: { textColor: hasLink ? [0, 0, 255] : [0, 0, 0] } },
                statusTexto,
                textoHistorico,
                t.dataUltimaStr,
                t.diasParado > 0 ? formatarTempo(t.diasParado) : 'Nunca'
            ];
            tableRows.push(dadosLinha);
        });

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 35,
            theme: 'grid',
            styles: { fontSize: 8, cellPadding: 2, valign: 'top' },
            headStyles: { fillColor: [37, 99, 235], textColor: [255, 255, 255] },
            columnStyles: {
                3: { cellWidth: 80 }
            },
            didDrawCell: (data) => {
                if (data.section === 'body' && data.column.index === 1) {
                    const t = dadosProcessados[data.row.index];
                    if (t && t.boundsStr) {
                        const deepLink = `${baseUrl}#/app?bounds=${t.boundsStr}`;
                        doc.link(data.cell.x, data.cell.y, data.cell.width, data.cell.height, { url: deepLink });
                    }
                }
            }
        });

        doc.save(`Relatorio_Territorios.pdf`);
    };

    if (loading) return <div className="flex h-screen items-center justify-center text-blue-600 font-bold">Carregando dados...</div>;

    return (
        <div className="min-h-screen bg-slate-50 p-4 font-sans">
            <div className="max-w-7xl mx-auto">

                <header className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                    <div className="text-center md:text-left">
                        <h1 className="text-2xl font-extrabold text-slate-800">Relatório de Territórios</h1>
                        <p className="text-slate-500 text-sm">Gerencie, filtre e veja o histórico.</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={exportarPDF} 
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all active:scale-95"
                            title="Baixar Relatório em PDF"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </button>
                        
                        <Link 
                            to="/app" 
                            className="px-5 py-2.5 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300 shadow-sm hover:bg-gray-50 hover:text-blue-600 transition-all flex items-center justify-center gap-2"
                        >
                            ← Voltar ao Mapa
                        </Link>
                    </div>
                </header>

                {/* CARDS DE RESUMO */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div onClick={() => aplicarFiltroRapido('total')} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md cursor-pointer transition-all hover:border-slate-300">
                        <p className="text-xs font-bold text-slate-400 uppercase">Total</p>
                        <p className="text-3xl font-black text-slate-700">{total}</p>
                        <p className="text-[10px] text-slate-400 mt-1">Clique para ver todos</p>
                    </div>
                    <div onClick={() => aplicarFiltroRapido('ocupado')} className="bg-blue-50 p-4 rounded-xl border border-blue-100 shadow-sm hover:shadow-md cursor-pointer transition-all hover:bg-blue-100">
                        <p className="text-xs font-bold text-blue-400 uppercase">Designados</p>
                        <p className="text-3xl font-black text-blue-700">{ocupados}</p>
                        <p className="text-[10px] text-blue-400 mt-1">Clique para filtrar</p>
                    </div>
                    <div onClick={() => aplicarFiltroRapido('livre')} className="bg-green-50 p-4 rounded-xl border border-green-100 shadow-sm hover:shadow-md cursor-pointer transition-all hover:bg-green-100">
                        <p className="text-xs font-bold text-green-500 uppercase">Disponíveis</p>
                        <p className="text-3xl font-black text-green-700">{livres}</p>
                        <p className="text-[10px] text-green-500 mt-1">Clique para filtrar</p>
                    </div>
                    <div onClick={() => aplicarFiltroRapido('criticos')} className="bg-orange-50 p-4 rounded-xl border border-orange-100 shadow-sm hover:shadow-md cursor-pointer transition-all hover:bg-orange-100">
                        <p className="text-xs font-bold text-orange-500 uppercase">Atrasados (+4 meses)</p>
                        <p className="text-3xl font-black text-orange-700">{criticos}</p>
                        <p className="text-[10px] text-orange-500 mt-1">Clique para ver lista</p>
                    </div>
                </div>

                {/* BARRA DE FILTROS */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6">
                    <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
                        <div className="relative w-full lg:w-1/3">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </span>
                            <input type="text" placeholder="Buscar nome, código ou dirigente..." className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all" value={busca} onChange={(e) => setBusca(e.target.value)} />
                        </div>
                        <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-2 flex-1">
                            <select value={statusFiltro} onChange={(e) => setStatusFiltro(e.target.value)} className="w-full sm:w-auto px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 cursor-pointer">
                                <option value="todos">Status: Todos</option>
                                <option value="livre">Apenas Livres</option>
                                <option value="ocupado">Apenas Ocupados</option>
                            </select>

                            <select value={tempoFiltro} onChange={(e) => setTempoFiltro(e.target.value)} className="w-full sm:w-auto px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 cursor-pointer">
                                <option value="todos">Tempo: Todos</option>
                                <option value="2_meses">+2 Meses</option>
                                <option value="4_meses">+4 Meses</option>
                                <option value="6_meses">+6 Meses</option>
                            </select>

                            {(busca || statusFiltro !== 'todos' || tempoFiltro !== 'todos') && (
                                <button onClick={limparFiltros} className="w-full sm:w-auto px-3 py-2 bg-red-50 text-red-600 border border-red-100 rounded-lg text-sm hover:bg-red-100 transition-colors flex items-center justify-center gap-1 font-semibold">✕ Limpar</button>
                            )}
                        </div>
                    </div>
                </div>

                {/* --- MODO MOBILE: CARDS (VISÍVEL APENAS EM CELULAR) --- */}
                <div className="md:hidden space-y-4">
                    {dadosProcessados.map((t) => (
                        <div key={t.id} className={`bg-white rounded-xl shadow border border-slate-200 p-4 transition-all ${linhasExpandidas.includes(t.id) ? 'ring-2 ring-blue-100' : ''}`}>
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <span className="inline-block px-2 py-0.5 rounded text-xs font-mono font-bold bg-slate-100 text-slate-500 mb-1">
                                        #{t.numeroId}
                                    </span>
                                    <h3 className="font-bold text-slate-800 text-lg leading-tight">
                                        {t.boundsStr ? (
                                            <Link 
                                                to={`/app?bounds=${t.boundsStr}`} 
                                                className="text-blue-600 hover:underline"
                                            >
                                                {t.nome}
                                            </Link>
                                        ) : t.nome}
                                    </h3>
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                    {t.status === 'ocupado' ?
                                        <div className="flex flex-col items-end">
                                            {/* PÍLULA PADRONIZADA COM TEXTO OCUPADO E NUMERO AO FUNDO (DIREITA) */}
                                            <span 
                                                className="inline-flex items-center justify-between px-3 py-1 rounded-full text-[10px] font-bold text-white border border-white/20 uppercase shadow-sm min-w-[100px]"
                                                style={{ 
                                                    background: `linear-gradient(90deg, #15803d ${t.porcentagem}%, #3b82f6 ${t.porcentagem}%)`,
                                                    textShadow: '0px 1px 1px rgba(0,0,0,0.3)'
                                                }}
                                                title={`${t.porcentagem}% Concluído`}
                                            >
                                                <span>Ocupado</span>
                                                <span className="opacity-50 text-[9px] ml-1">{t.porcentagem}%</span>
                                            </span>
                                            <span className={`text-[9px] mt-0.5 ${t.diasSemEdicao > 10 ? 'text-red-500 font-bold' : 'text-slate-400'}`}>
                                                {t.diasSemEdicao > 10 && '⚠️ '}Edição: {t.ultimaEdicaoTexto}
                                            </span>
                                        </div>
                                         :
                                        <span className="inline-flex items-center justify-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-700 border border-green-200 uppercase min-w-[100px]">Livre</span>
                                    }
                                </div>
                            </div>

                            <div className="space-y-2 text-sm text-slate-600 mb-4">
                                <div className="flex justify-between border-b border-slate-50 pb-1">
                                    <span className="text-slate-400 text-xs">Responsável</span>
                                    <span className="font-medium text-right max-w-[60%] truncate">{t.designadoNome || '-'}</span>
                                </div>
                                <div className="flex justify-between border-b border-slate-50 pb-1">
                                    <span className="text-slate-400 text-xs">Designado em</span>
                                    <span className="font-medium">{t.dataDesigStr}</span>
                                </div>
                                {t.status === 'livre' && (
                                    <div className="flex justify-between border-b border-slate-50 pb-1">
                                        <span className="text-slate-400 text-xs">Última Conclusão</span>
                                        <span className="font-medium">{t.dataUltimaStr}</span>
                                    </div>
                                )}
                                {t.status === 'livre' && (
                                    <div className="flex justify-between">
                                        <span className="text-slate-400 text-xs">Tempo Parado</span>
                                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${getCorTempo(t.diasParado)}`}>
                                            {formatarTempo(t.diasParado)}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <button 
                                onClick={() => toggleLinha(t.id)}
                                className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-500 text-xs font-bold uppercase rounded flex items-center justify-center gap-2 transition-colors"
                            >
                                {linhasExpandidas.includes(t.id) ? 'Ocultar Histórico' : 'Ver Histórico'}
                                <span>{linhasExpandidas.includes(t.id) ? '▲' : '▼'}</span>
                            </button>

                            {linhasExpandidas.includes(t.id) && (
                                <div className="mt-3 pt-3 border-t border-slate-100 animate-fade-in">
                                    <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-2">Histórico Recente</h4>
                                    {t.historicoLista.length > 0 ? (
                                        <div className="space-y-2">
                                            {t.historicoLista.map((hist, idx) => (
                                                <div key={idx} className="text-xs bg-slate-50 p-2 rounded border border-slate-100">
                                                    <div className="flex justify-between mb-1">
                                                        <span className="text-slate-500">{hist.inicio}</span>
                                                        <span className="text-green-600 font-bold">→ {hist.termino}</span>
                                                    </div>
                                                    <div className="text-slate-700 font-medium">{hist.nomes}</div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-xs text-slate-400 italic">Sem histórico.</p>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                    {dadosProcessados.length === 0 && (
                        <div className="p-8 text-center text-slate-400 bg-white rounded-xl border border-slate-200">
                            Nenhum território encontrado.
                        </div>
                    )}
                </div>

                {/* --- MODO DESKTOP: TABELA (VISÍVEL APENAS EM TELAS GRANDES) --- */}
                <div className="hidden md:block bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase text-xs">
                                <tr>
                                    <th className="px-4 py-3 w-10 text-center cursor-pointer hover:bg-slate-100" onClick={toggleTodas} title="Expandir/Recolher Todos">
                                        <span className="text-lg font-bold">
                                            {linhasExpandidas.length > 0 && linhasExpandidas.length === dadosProcessados.length ? '−' : '+'}
                                        </span>
                                    </th>
                                    <th className="px-4 py-3 cursor-pointer hover:bg-slate-100 select-none" onClick={() => handleSort('numeroId')}>Cód. {getSortIcon('numeroId')}</th>
                                    <th className="px-4 py-3 cursor-pointer hover:bg-slate-100 select-none" onClick={() => handleSort('nome')}>Nome {getSortIcon('nome')}</th>
                                    <th className="px-4 py-3 cursor-pointer hover:bg-slate-100 select-none" onClick={() => handleSort('status')}>Status {getSortIcon('status')}</th>
                                    <th className="px-4 py-3 cursor-pointer hover:bg-slate-100 select-none" onClick={() => handleSort('designadoNome')}>Responsável {getSortIcon('designadoNome')}</th>
                                    <th className="px-4 py-3 cursor-pointer hover:bg-slate-100 select-none" onClick={() => handleSort('dataDesigObj')}>Designado em {getSortIcon('dataDesigObj')}</th>
                                    <th className="px-4 py-3 text-right cursor-pointer hover:bg-slate-100 select-none" onClick={() => handleSort('dataUltimaObj')}>Conclusão {getSortIcon('dataUltimaObj')}</th>
                                    <th className="px-4 py-3 text-right cursor-pointer hover:bg-slate-100 select-none" onClick={() => handleSort('diasParado')}>Tempo Parado {getSortIcon('diasParado')}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {dadosProcessados.map((t) => (
                                    <React.Fragment key={t.id}>
                                        <tr className={`hover:bg-slate-50 transition-colors cursor-pointer ${linhasExpandidas.includes(t.id) ? 'bg-blue-50' : ''}`} onClick={() => toggleLinha(t.id)}>
                                            <td className="px-4 py-3 text-center text-slate-400">
                                                {t.historicoLista.length > 0
                                                    ? (linhasExpandidas.includes(t.id) ? '▼' : '▶')
                                                    : <span className="opacity-20">●</span>}
                                            </td>
                                            <td className="px-4 py-3 text-xs font-mono text-slate-400 font-bold">{t.numeroId}</td>
                                            
                                            <td className="px-4 py-3 font-bold text-slate-700">
                                                {t.boundsStr ? (
                                                    <Link 
                                                        to={`/app?bounds=${t.boundsStr}`} 
                                                        className="text-blue-600 hover:underline hover:text-blue-800 transition-colors"
                                                        onClick={(e) => e.stopPropagation()} 
                                                    >
                                                        {t.nome}
                                                    </Link>
                                                ) : (
                                                    t.nome
                                                )}
                                            </td>
                                            
                                            <td className="px-4 py-3">
                                                {t.status === 'ocupado' ?
                                                    <div className="flex flex-col items-start">
                                                        {/* PÍLULA PADRONIZADA COM TEXTO OCUPADO E NUMERO AO FUNDO (DIREITA) */}
                                                        <span 
                                                            className="inline-flex items-center justify-between gap-1 px-3 py-1 rounded-full text-[10px] font-bold text-white border border-white/20 uppercase shadow-sm min-w-[100px]"
                                                            style={{ 
                                                                background: `linear-gradient(90deg, #15803d ${t.porcentagem}%, #3b82f6 ${t.porcentagem}%)`,
                                                                textShadow: '0px 1px 1px rgba(0,0,0,0.3)'
                                                            }}
                                                            title={`${t.porcentagem}% Concluído`}
                                                        >
                                                            <span>Ocupado</span>
                                                            <span className="opacity-50 text-[9px]">{t.porcentagem}%</span>
                                                        </span>
                                                        <span className={`text-[9px] ml-1 mt-0.5 ${t.diasSemEdicao > 10 ? 'text-red-500 font-bold' : 'text-slate-400'}`}>
                                                            {t.diasSemEdicao > 10 && '⚠️ '}Ult. ed: {t.ultimaEdicaoTexto}
                                                        </span>
                                                    </div> :
                                                    <span className="inline-flex items-center justify-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-700 border border-green-200 uppercase min-w-[100px]">Livre</span>
                                                }
                                            </td>
                                            <td className="px-4 py-3 text-slate-600">
                                                {t.designadoNome || '-'}
                                                {t.status === 'ocupado' && t.cicloAtual && t.cicloAtual.responsaveis && t.cicloAtual.responsaveis.length > 1 && (
                                                    <span className="text-[10px] text-blue-500 ml-1">(+ {t.cicloAtual.responsaveis.length - 1} outros)</span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3 text-slate-500 text-xs">{t.dataDesigStr}</td>
                                            <td className="px-4 py-3 text-right text-slate-500 text-xs">{t.dataUltimaStr}</td>

                                            <td className="px-4 py-3 text-right">
                                                <span className={`px-2 py-1 rounded text-xs font-bold ${getCorTempo(t.diasParado)}`}>
                                                    {formatarTempo(t.diasParado)}
                                                </span>
                                            </td>
                                        </tr>

                                        {linhasExpandidas.includes(t.id) && (
                                            <tr className="bg-slate-50 animate-fade-in">
                                                <td colSpan="8" className="p-0">
                                                    <div className="p-4 border-b border-slate-200 shadow-inner">
                                                        <div className="bg-white rounded-lg border border-slate-200 p-3">
                                                            <h4 className="text-xs font-bold text-slate-500 uppercase mb-2 flex items-center gap-2">
                                                                        📜 Histórico de Ciclos
                                                            </h4>
                                                            {t.historicoLista.length > 0 ? (
                                                                <table className="w-full text-xs text-left">
                                                                    <thead>
                                                                        <tr className="text-slate-400 border-b border-slate-100">
                                                                            <th className="py-2 pl-2">Início</th>
                                                                            <th className="py-2">Dirigentes (Ciclo Completo)</th>
                                                                            <th className="py-2">Término</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {t.historicoLista.map((hist, index) => (
                                                                            <tr key={index} className="border-b border-slate-50 last:border-0 hover:bg-slate-50">
                                                                                <td className="py-2 pl-2 text-slate-500">{hist.inicio}</td>
                                                                                <td className="py-2 font-medium text-slate-700">{hist.nomes}</td>
                                                                                <td className="py-2 text-green-600 font-medium">{hist.termino}</td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>
                                                            ) : (
                                                                <p className="text-xs text-slate-400 italic p-2">Nenhum histórico registrado para este território ainda.</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))}
                                {dadosProcessados.length === 0 && (
                                    <tr><td colSpan="8" className="p-8 text-center text-slate-400">Nenhum território encontrado com os filtros atuais.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Relatorios;
```

---
## FILE: src\useUsuario.js

```js
import { useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc, addDoc, collection } from 'firebase/firestore'; // Adicionado addDoc e collection
import { db } from './firebase';

export function useUsuario(user) {
    const [isAdmin, setIsAdmin] = useState(false);
    const [autorizado, setAutorizado] = useState(false);
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState(null); // NOVO: Guarda o status exato (ex: 'aguardando')

    useEffect(() => {
        if (!user?.email) {
            setAutorizado(false);
            setIsAdmin(false);
            setRole(null);
            setLoading(false);
            return;
        }

        setLoading(true);

        const emailFormatado = user.email.toLowerCase();
        const docRef = doc(db, "usuarios", emailFormatado);

        const unsub = onSnapshot(docRef, async (docSnap) => {

            if (docSnap.exists()) {
                const dados = docSnap.data();

                // Só entra se for 'admin' ou 'comum'.
                const podeEntrar = dados.role === 'admin' || dados.role === 'comum';

                setAutorizado(podeEntrar);
                setIsAdmin(dados.role === 'admin');
                setRole(dados.role); // Atualiza o role atual
                setLoading(false);
            } else {
                // Se não existe, cria a solicitação AUTOMATICAMENTE
                try {
                    // 1. Cria o usuário
                    await setDoc(docRef, {
                        role: 'aguardando',
                        nome: user.displayName || 'Sem nome',
                        emailOriginal: user.email,
                        whatsapp: '', // Inicializa vazio para evitar undefined
                        criadoEm: new Date()
                    });

                    // 2. NOVO: Envia notificação para os ADMINS
                    await addDoc(collection(db, "notificacoes"), {
                        texto: `Novo cadastro pendente: ${user.displayName || user.email}`,
                        para: 'ADMINS', // Palavra-chave que seu Sininho já reconhece
                        origem: 'sistema',
                        lida: false,
                        data: new Date()
                    });

                } catch (err) {
                    console.error("Erro ao criar solicitação:", err);
                }

                // Mantém bloqueado, mas define o role como aguardando para a UI saber
                setAutorizado(false);
                setIsAdmin(false);
                setRole('aguardando');
                setLoading(false);
            }
        });

        return () => unsub();
    }, [user]);

    // Retornamos o 'role' agora
    return { isAdmin, autorizado, loading, role };
}
```

---
## FILE: src\version.json

```json
{
  "version": "1.8.125",
  "buildDate": "27/02, 11:19"
}
```

---
## FILE: tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [], // <--- Removi o daisyui daqui
}
```

---
## FILE: vite.config.js

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Territórios Palmas',
        short_name: 'Territórios',
        description: 'Gestão de Territórios de Pregação',
        theme_color: '#2563eb',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' }
        ]
      },
      workbox: {
        // --- ADICIONE ESTAS DUAS LINHAS ---
        skipWaiting: true,
        clientsClaim: true,
        // ----------------------------------
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        cleanupOutdatedCaches: true, // Garante que caches velhos de build sejam limpos automaticamente
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.includes('version.json'),
            handler: 'NetworkOnly',
          }
        ]
      }
    })
  ]
})
```
