import json,struct,pathlib,hashlib,copy,sys
# python scripts/nasa-assets/restore-mer-materials.py CONVERTED.glb OFFICIAL_STATIC.glb
out=pathlib.Path(sys.argv[1]);static=pathlib.Path(sys.argv[2])
def read(p):
 b=p.read_bytes();n=struct.unpack_from('<I',b,12)[0];j=json.loads(b[20:20+n]);off=20+n;size=struct.unpack_from('<I',b,off)[0];return j,b[off+8:off+8+size]
j,b=read(out);original,ob=read(static);views=[];data=bytearray();mapping={};imageviews={x.get('bufferView') for x in j.get('images',[])}
def append(v,buf):
 while len(data)%4:data.append(0)
 start=len(data);data.extend(buf[v.get('byteOffset',0):v.get('byteOffset',0)+v['byteLength']]);nv={k:v[k] for k in ['byteLength','byteStride','target'] if k in v};nv.update(buffer=0,byteOffset=start);views.append(nv);return len(views)-1
for i,v in enumerate(j['bufferViews']):
 if i not in imageviews:mapping[i]=append(v,b)
for a in j['accessors']:
 if 'bufferView' in a:a['bufferView']=mapping[a['bufferView']]
for node in j['nodes']:
 if node.get('name','').startswith('Cube') or node.get('name') in ['_root','panels_left','panels_right']:node.pop('mesh',None)
name_to_index={m['name']:i for i,m in enumerate(original['materials'])}
for mesh in j['meshes']:
 for p in mesh['primitives']:
  if 'material' in p:p['material']=name_to_index[j['materials'][p['material']]['name']]
images=copy.deepcopy(original.get('images',[]))
for im in images:im['bufferView']=append(original['bufferViews'][im['bufferView']],ob)
j.update(materials=original['materials'],images=images,textures=original.get('textures',[]),samplers=original.get('samplers',[]),bufferViews=views,buffers=[{'byteLength':len(data)}]);j.pop('animations',None);j['asset']['extras']={'source':'NASA official Spirit and Opportunity Blender model; source saved pose, with published NASA MER materials.','exhibit':'Helper boxes retained as transform nodes. Exploded offsets are separate application displays, not mechanical animation.'}
js=json.dumps(j,separators=(',',':')).encode();js+=b' '*(-len(js)%4);data+=b'\0'*(-len(data)%4);glb=struct.pack('<III',0x46546c67,2,12+8+len(js)+8+len(data))+struct.pack('<II',len(js),0x4e4f534a)+js+struct.pack('<II',len(data),0x004e4942)+data;out.write_bytes(glb)
print(json.dumps({'bytes':len(glb),'renderableSourceNodes':sum('mesh'in n for n in j['nodes']),'sha256':hashlib.sha256(glb).hexdigest(),'parts':[n['name'] for n in j['nodes'] if'mesh'in n]}))
