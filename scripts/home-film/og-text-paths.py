"""Outline text as SVG path data (with GPOS pair kerning). Usage:
python3 og-text-paths.py FONT.ttf SIZE TRACKING_PX X Y "text"  -> prints one path d string."""
import sys
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

font_path, size, track, x, y, text = sys.argv[1], float(sys.argv[2]), float(sys.argv[3]), float(sys.argv[4]), float(sys.argv[5]), sys.argv[6]
f = TTFont(font_path); gs = f.getGlyphSet(); cmap = f.getBestCmap(); upm = f['head'].unitsPerEm
s = size / upm

def kern_table():
    pairs = {}
    gpos = f['GPOS'].table
    feats = [fr.Feature for fr in gpos.FeatureList.FeatureRecord if fr.FeatureTag == 'kern']
    idx = {i for ft in feats for i in ft.LookupListIndex}
    for i in idx:
        for st in gpos.LookupList.Lookup[i].SubTable:
            if st.LookupType == 9: st = st.ExtSubTable
            if st.LookupType != 2: continue
            cov = st.Coverage.glyphs
            if st.Format == 1:
                for g, ps in zip(cov, st.PairSet):
                    for pv in ps.PairValueRecord:
                        v = pv.Value1.XAdvance if pv.Value1 and hasattr(pv.Value1, 'XAdvance') else 0
                        pairs.setdefault((g, pv.SecondGlyph), v or 0)
            else:
                c1 = st.ClassDef1.classDefs; c2 = st.ClassDef2.classDefs
                for g in cov:
                    cl1 = c1.get(g, 0)
                    rec = st.Class1Record[cl1]
                    for g2 in f.getGlyphOrder():
                        cl2 = c2.get(g2, 0)
                        v = getattr(rec.Class2Record[cl2].Value1, 'XAdvance', 0) if rec.Class2Record[cl2].Value1 else 0
                        if v: pairs.setdefault((g, g2), v)
    return pairs
K = kern_table()
pen = SVGPathPen(gs, ntos=lambda v: ('%.2f' % v).rstrip('0').rstrip('.'))
cx = x; prev = None
for ch in text:
    g = cmap[ord(ch)]
    if prev: cx += K.get((prev, g), 0) * s
    tp = TransformPen(pen, (s, 0, 0, -s, cx, y))
    gs[g].draw(tp)
    cx += gs[g].width * s + track
    prev = g
print(pen.getCommands())
