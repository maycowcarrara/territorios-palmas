import zipfile
import os
from xml.etree import ElementTree as ET
import json

# --- CONFIGURAÇÃO ---
ARQUIVO_KMZ = "territorios.kmz" # Nome exato do seu arquivo
ARQUIVO_SAIDA = "mapa.json"

# 1. Extrair o KML de dentro do KMZ
print("Lendo arquivo KMZ...")
with zipfile.ZipFile(ARQUIVO_KMZ, 'r') as z:
    kml_filename = [f for f in z.namelist() if f.endswith('.kml')][0]
    kml_content = z.read(kml_filename)

# 2. Ler o XML (KML)
root = ET.fromstring(kml_content)
namespace = {'kml': 'http://www.opengis.net/kml/2.2'}

poligonos = []
pontos = []

def parse_coords(text):
    return [tuple(map(float, c.split(',')[:2])) for c in text.strip().split()]

# 3. Separar Polígonos e Pontos
for placemark in root.findall('.//kml:Placemark', namespace):
    nome = placemark.find('kml:name', namespace)
    nome = nome.text if nome is not None else "Sem Nome"

    # Se for Polígono
    poly = placemark.find('.//kml:Polygon', namespace)
    if poly:
        coords_text = poly.find('.//kml:coordinates', namespace).text
        coords = parse_coords(coords_text)
        poligonos.append({'nome': nome, 'coords': coords, 'pontos_dentro': []})
        continue

    # Se for Ponto
    point = placemark.find('.//kml:Point', namespace)
    if point:
        coords_text = point.find('.//kml:coordinates', namespace).text
        coord = parse_coords(coords_text)[0] # Pega (lon, lat)
        pontos.append({'nome': nome, 'coord': coord})

print(f"Encontrados: {len(poligonos)} territórios e {len(pontos)} endereços.")

# 4. A Mágica: Verificar qual ponto está dentro de qual polígono
# (Algoritmo Ray Casting simples)
def ponto_no_poligono(x, y, poly_coords):
    n = len(poly_coords)
    inside = False
    p1x, p1y = poly_coords[0]
    for i in range(n + 1):
        p2x, p2y = poly_coords[i % n]
        if y > min(p1y, p2y):
            if y <= max(p1y, p2y):
                if x <= max(p1x, p2x):
                    if p1y != p2y:
                        xinters = (y - p1y) * (p2x - p1x) / (p2y - p1y) + p1x
                    if p1x == p2x or x <= xinters:
                        inside = not inside
        p1x, p1y = p2x, p2y
    return inside

print("Processando localização dos pontos...")
for p in pontos:
    for poly in poligonos:
        if ponto_no_poligono(p['coord'][0], p['coord'][1], poly['coords']):
            # Adiciona o ponto na lista deste território
            poly['pontos_dentro'].append({
                'nome': p['nome'],
                'lat': p['coord'][1],
                'lng': p['coord'][0]
            })
            break

# 5. Salvar como GeoJSON para o React
features = []
for i, poly in enumerate(poligonos):
    # Leaflet usa [lat, lon], mas GeoJSON usa [lon, lat]. Mantemos o padrão GeoJSON.
    features.append({
        "type": "Feature",
        "properties": {
            "id": i + 1,
            "nome": poly['nome'],
            "qtd_pontos": len(poly['pontos_dentro']),
            "pontos": poly['pontos_dentro'] # <--- AQUI ESTÁ O OURO
        },
        "geometry": {
            "type": "Polygon",
            "coordinates": [[list(c) for c in poly['coords']]]
        }
    })

geojson = {"type": "FeatureCollection", "features": features}

with open(ARQUIVO_SAIDA, 'w', encoding='utf-8') as f:
    json.dump(geojson, f, indent=2)

print(f"Sucesso! Arquivo '{ARQUIVO_SAIDA}' gerado.")