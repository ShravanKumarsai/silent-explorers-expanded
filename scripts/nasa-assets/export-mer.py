import bpy,json,pathlib,sys
# blender --background --python scripts/nasa-assets/export-mer.py -- SOURCE.blend OUTPUT.glb AUDIT.json
source,output,audit=sys.argv[sys.argv.index("--")+1:]
bpy.ops.wm.open_mainfile(filepath=source)
# NASA's saved source pose is retained. Helper boxes are transform controls, not hardware.
rows=[]
for o in list(bpy.data.objects):
 if o.type=='MESH' and (o.name.startswith('Cube') or o.name in ['_root','panels_left','panels_right']):
  data=o.data;o.data=None
 elif o.type=='MESH':rows.append({'name':o.name,'vertices':len(o.data.vertices),'polygons':len(o.data.polygons),'source_hidden_render':o.hide_render,'matrix_world':[list(row) for row in o.matrix_world]})
# Only the hardware and hierarchy are exported; no NASA animations are enabled.
bpy.ops.export_scene.gltf(filepath=output,export_format='GLB',export_animations=False,export_current_frame=True,export_cameras=False,export_lights=False,export_apply=False,export_yup=True,export_draco_mesh_compression_enable=False)
pathlib.Path(audit).write_text(json.dumps({'source_frame':bpy.context.scene.frame_current,'hardware':rows},indent=2))
print('EXPORTED_HARDWARE',len(rows))
