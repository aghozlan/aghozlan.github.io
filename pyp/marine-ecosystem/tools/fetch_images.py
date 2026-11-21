"""Download the Wikipedia lead image for each title in img/titles.json.
Saves img/1920/<slug>.jpg (Full HD) and img/960/<slug>.jpg (cards) plus img/manifest.json
with attribution (Commons file name + Wikipedia page). Run by .github/workflows/marine-images.yml."""
import json, os, re, time, io, urllib.request, urllib.parse
from PIL import Image
ROOT = os.path.join(os.path.dirname(__file__), '..', 'img')
UA = {'User-Agent': 'IntoTheBlue-ClassroomDeck/1.0 (https://aghozlan.github.io/pyp/marine-ecosystem/; educational use)'}
def get(url, tries=5):
    for k in range(tries):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60) as r: return r.read()
        except Exception as e:
            print('retry', k, url[:90], e); time.sleep(3 * (k + 1))
    raise RuntimeError(url)
slug = lambda t: re.sub(r'[^a-z0-9]+', '-', t.lower()).strip('-')
titles = json.load(open(os.path.join(ROOT, 'titles.json')))
man_path = os.path.join(ROOT, 'manifest.json')
manifest = json.load(open(man_path)) if os.path.exists(man_path) else {}
os.makedirs(os.path.join(ROOT, '1920'), exist_ok=True); os.makedirs(os.path.join(ROOT, '960'), exist_ok=True)
todo = [t for t in titles if t not in manifest or not os.path.exists(os.path.join(ROOT, '1920', manifest[t]['slug'] + '.jpg'))]
for i in range(0, len(todo), 40):
    chunk = todo[i:i + 40]
    q = urllib.parse.urlencode({'action': 'query', 'format': 'json', 'formatversion': 2, 'redirects': 1, 'prop': 'pageimages',
                                'piprop': 'thumbnail|name|original', 'pithumbsize': 1920, 'titles': '|'.join(chunk)})
    j = json.loads(get('https://en.wikipedia.org/w/api.php?' + q))['query']
    alias = {n['from']: n['to'] for n in j.get('normalized', []) + j.get('redirects', [])}
    pages = {p['title']: p for p in j.get('pages', [])}
    for t in chunk:
        k = t
        for _ in range(3): k = alias.get(k, k)
        p = pages.get(k)
        if not p or not (p.get('thumbnail') or p.get('original')):
            print('NO IMAGE', t); continue
        src = (p.get('thumbnail') or p['original'])['source']
        try:
            im = Image.open(io.BytesIO(get(src)))
            if im.mode in ('RGBA', 'LA', 'P'):
                im = im.convert('RGBA'); bg = Image.new('RGB', im.size, (8, 42, 72)); bg.paste(im, mask=im.split()[-1]); im = bg
            im = im.convert('RGB'); sl = slug(t)
            big = im.copy(); big.thumbnail((1920, 1920)); big.save(os.path.join(ROOT, '1920', sl + '.jpg'), quality=84, optimize=True, progressive=True)
            sm = im.copy(); sm.thumbnail((960, 960)); sm.save(os.path.join(ROOT, '960', sl + '.jpg'), quality=80, optimize=True, progressive=True)
            manifest[t] = {'slug': sl, 'file': p.get('pageimage', ''), 'page': p['title'], 'w': big.width, 'h': big.height}
            print('ok', t, big.size)
        except Exception as e:
            print('FAILED', t, e)
        time.sleep(1)
json.dump(manifest, open(man_path, 'w'), indent=1, ensure_ascii=False, sort_keys=True)
print('done', len(manifest), 'images')
