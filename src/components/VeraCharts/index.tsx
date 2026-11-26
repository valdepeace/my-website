import React from 'react';
import styles from './styles.module.css';

type Lang = 'en' | 'es';
const n = (v: number, lang: Lang, d = 1) => (lang === 'es' ? v.toFixed(d).replace('.', ',') : v.toFixed(d));
const sign = (v: number, lang: Lang, d = 0) => (v < 0 ? '−' : '+') + n(Math.abs(v), lang, d);

/* Java: gain of repair over baseline (pp). Thesis vs replica p1 vs replica p2, 95 % Newcombe CI. */
const GAIN = [
  {m: 'gemma4:e4b', t: 34.0, p1: [12.3, 7.2, 17.6], p2: [21.3, 13.9, 28.4]},
  {m: 'qwen2.5-coder:7b', t: 20.0, p1: [26.3, 18.5, 33.7], p2: [15.0, 7.3, 22.5]},
  {m: 'qwen3:8b', t: 9.3, p1: [74.7, 69.3, 79.3], p2: [7.7, -0.1, 15.3]},
  {m: 'llama3.1:8b', t: 4.6, p1: [45.0, 38.3, 51.2], p2: [11.7, 3.7, 19.4]},
  {m: 'ornith-1.5:9b', t: null, p1: [39.0, 31.4, 45.9], p2: [34.7, 27.1, 41.7]},
] as const;

export function GainChart({lang = 'en'}: {lang?: Lang}) {
  const L = lang === 'es'
    ? {thesis: 'tesis', p1: 'réplica, prompt p1', p2: 'réplica, prompt p2 (con el import)', axis: 'Mejora de repair sobre baseline (puntos porcentuales)', none: 'sin cifra en la tesis', ci: 'IC 95 %'}
    : {thesis: 'thesis', p1: 'replica, prompt p1', p2: 'replica, prompt p2 (import given)', axis: 'Gain of repair over baseline (percentage points)', none: 'not in the thesis', ci: '95 % CI'};
  const X0 = 150, W = 520, lo = -10, hi = 80;
  const x = (v: number) => X0 + ((v - lo) / (hi - lo)) * W;
  const RH = 66, top = 18;
  const H = top + GAIN.length * RH + 40;
  return (
    <figure className={styles.fig}>
      <div className={styles.legend}>
        <span><i className={styles.dotHollow} />{L.thesis}</span>
        <span><i className={styles.dot} style={{background: 'var(--vz-s2)'}} />{L.p1}</span>
        <span><i className={styles.dot} style={{background: 'var(--vz-s1)'}} />{L.p2}</span>
        <span className={styles.muted}>— {L.ci}</span>
      </div>
      <div className={styles.scroll}>
        <svg viewBox={`0 0 760 ${H}`} role="img" aria-label={L.axis}>
          {[0, 20, 40, 60, 80].map((t) => (
            <g key={t}>
              <line x1={x(t)} x2={x(t)} y1={8} y2={H - 34} className={t === 0 ? styles.zero : styles.grid} />
              <text x={x(t)} y={H - 18} textAnchor="middle" className={styles.tick}>{t === 0 ? '0' : '+' + t}</text>
            </g>
          ))}
          <text x={X0} y={H - 2} className={styles.tick}>{L.axis}</text>
          {GAIN.map((g, i) => {
            const y0 = top + i * RH;
            const yT = y0 + 8, y1 = y0 + 24, y2 = y0 + 40;
            return (
              <g key={g.m}>
                <text x={8} y={y1 + 4} className={styles.label}>{g.m}</text>
                {g.t != null ? (
                  <g>
                    <circle cx={x(g.t)} cy={yT} r={5} className={styles.hollow}><title>{`${g.m} · ${L.thesis}: ${sign(g.t, lang, 1)} pp`}</title></circle>
                    <text x={x(g.t) + 10} y={yT + 4} className={styles.val}>{sign(g.t, lang, 1)}</text>
                  </g>
                ) : (
                  <text x={x(0) + 8} y={yT + 4} className={styles.tick}>{L.none}</text>
                )}
                {([['p1', y1, 'var(--vz-s2)'], ['p2', y2, 'var(--vz-s1)']] as const).map(([k, yy, c]) => {
                  const [v, a, b] = g[k];
                  return (
                    <g key={k}>
                      <line x1={x(a)} x2={x(b)} y1={yy} y2={yy} stroke={c} strokeWidth={2} strokeLinecap="round" />
                      <circle cx={x(v)} cy={yy} r={5} fill={c} className={styles.ring}>
                        <title>{`${g.m} · ${k}: ${sign(v, lang, 1)} pp [${n(a, lang)}, ${n(b, lang)}]`}</title>
                      </circle>
                      <text x={x(b) + 8} y={yy + 4} className={styles.val}>{sign(v, lang)}</text>
                    </g>
                  );
                })}
              </g>
            );
          })}
        </svg>
      </div>
    </figure>
  );
}

/* Share of repair rescues whose first failure was a symbol-resolution error (Java). */
const SYM = [
  {m: 'qwen3:8b', p1: 97, p2: 9},
  {m: 'llama3.1:8b', p1: 84, p2: 7},
  {m: 'gemma4:e4b', p1: 71, p2: 15},
  {m: 'qwen2.5-coder:7b', p1: 64, p2: 3},
  {m: 'ornith-1.5:9b', p1: 36, p2: 13},
];

export function SymbolChart({lang = 'en'}: {lang?: Lang}) {
  const L = lang === 'es'
    ? {p1: 'prompt p1 (sin el paquete)', p2: 'prompt p2 (con el import)', axis: 'Rescates del bucle cuyo primer fallo fue «cannot find symbol»'}
    : {p1: 'prompt p1 (no package)', p2: 'prompt p2 (import given)', axis: 'Loop rescues whose first failure was “cannot find symbol”'};
  const X0 = 150, W = 540, x = (v: number) => X0 + (v / 100) * W;
  const RH = 44, top = 10, BH = 12;
  const H = top + SYM.length * RH + 36;
  return (
    <figure className={styles.fig}>
      <div className={styles.legend}>
        <span><i className={styles.sw} style={{background: 'var(--vz-s2)'}} />{L.p1}</span>
        <span><i className={styles.sw} style={{background: 'var(--vz-s1)'}} />{L.p2}</span>
      </div>
      <div className={styles.scroll}>
        <svg viewBox={`0 0 760 ${H}`} role="img" aria-label={L.axis}>
          {[0, 25, 50, 75, 100].map((t) => (
            <g key={t}>
              <line x1={x(t)} x2={x(t)} y1={4} y2={H - 32} className={t === 0 ? styles.zero : styles.grid} />
              <text x={x(t)} y={H - 16} textAnchor="middle" className={styles.tick}>{t} %</text>
            </g>
          ))}
          <text x={X0} y={H - 1} className={styles.tick}>{L.axis}</text>
          {SYM.map((s, i) => {
            const y0 = top + i * RH;
            return (
              <g key={s.m}>
                <text x={8} y={y0 + BH + 5} className={styles.label}>{s.m}</text>
                {([['p1', y0, 'var(--vz-s2)'], ['p2', y0 + BH + 2, 'var(--vz-s1)']] as const).map(([k, yy, c]) => {
                  const v = s[k];
                  return (
                    <g key={k}>
                      <rect x={x(0)} y={yy} width={Math.max(x(v) - x(0), 2)} height={BH} rx={2} fill={c}>
                        <title>{`${s.m} · ${k}: ${v} %`}</title>
                      </rect>
                      <text x={x(v) + 6} y={yy + BH - 2} className={styles.val}>{v} %</text>
                    </g>
                  );
                })}
              </g>
            );
          })}
        </svg>
      </div>
    </figure>
  );
}

/* Python and Node: REAL rate, baseline vs repair (prompt p1). */
const LANGS = [
  {l: 'Python', rows: [
    {m: 'gemma4:e4b', b: [84, 300], r: [159, 300], g: 25, lo: 17, hi: 32},
    {m: 'llama3.1:8b', b: [97, 300], r: [160, 300], g: 21, lo: 13, hi: 29},
    {m: 'qwen2.5-coder:7b', b: [164, 300], r: [204, 300], g: 13, lo: 6, hi: 21},
    {m: 'qwen3:8b', b: [149, 300], r: [170, 300], g: 7, lo: -1, hi: 15},
  ]},
  {l: 'Node', rows: [
    {m: 'gemma4:e4b', b: [89, 300], r: [173, 300], g: 28, lo: 20, hi: 35},
    {m: 'llama3.1:8b', b: [105, 300], r: [141, 300], g: 12, lo: 4, hi: 20},
    {m: 'qwen2.5-coder:7b', b: [53, 300], r: [87, 300], g: 11, lo: 5, hi: 18},
    {m: 'qwen3:8b', b: [149, 300], r: [195, 300], g: 15, lo: 7, hi: 23},
  ]},
];

export function LanguageChart({lang = 'en'}: {lang?: Lang}) {
  const L = lang === 'es'
    ? {b: 'baseline', r: 'repair', axis: 'Tasa de éxito REAL (300 ejecuciones por punto)', gain: 'mejora [IC 95 %]'}
    : {b: 'baseline', r: 'repair', axis: 'REAL success rate (300 runs per point)', gain: 'gain [95 % CI]'};
  const X0 = 150, W = 470, x = (v: number) => X0 + (v / 100) * W;
  let y = 0;
  const groups = LANGS.map((g, gi) => {
    y += gi ? 34 : 18;
    const head = y;
    y += 10;
    const rows = g.rows.map((r) => { y += 34; return {...r, y}; });
    return {l: g.l, head, rows};
  });
  const H = y + 64;
  return (
    <figure className={styles.fig}>
      <div className={styles.legend}>
        <span><i className={styles.dotHollow} style={{borderColor: 'var(--vz-s1)'}} />{L.b}</span>
        <span><i className={styles.dot} style={{background: 'var(--vz-s1)'}} />{L.r}</span>
        <span className={styles.muted}>{L.gain}</span>
      </div>
      <div className={styles.scroll}>
        <svg viewBox={`0 0 760 ${H}`} role="img" aria-label={L.axis}>
          {[0, 25, 50, 75, 100].map((t) => (
            <g key={t}>
              <line x1={x(t)} x2={x(t)} y1={4} y2={H - 46} className={styles.grid} />
              <text x={x(t)} y={H - 30} textAnchor="middle" className={styles.tick}>{t} %</text>
            </g>
          ))}
          <text x={X0} y={H - 12} className={styles.tick}>{L.axis}</text>
          {groups.map((g) => (
            <g key={g.l}>
              <text x={8} y={g.head} className={styles.group}>{g.l.toUpperCase()}</text>
              {g.rows.map((r) => {
                const b = (r.b[0] / r.b[1]) * 100, rp = (r.r[0] / r.r[1]) * 100;
                return (
                  <g key={g.l + r.m}>
                    <text x={8} y={r.y + 4} className={styles.label}>{r.m}</text>
                    <line x1={x(b)} x2={x(rp)} y1={r.y} y2={r.y} stroke="var(--vz-s1)" strokeWidth={2} />
                    <circle cx={x(b)} cy={r.y} r={5} className={styles.hollowAccent}><title>{`${g.l} · ${r.m} · baseline ${r.b[0]}/${r.b[1]} (${n(b, lang)} %)`}</title></circle>
                    <circle cx={x(rp)} cy={r.y} r={5} fill="var(--vz-s1)" className={styles.ring}><title>{`${g.l} · ${r.m} · repair ${r.r[0]}/${r.r[1]} (${n(rp, lang)} %)`}</title></circle>
                    <text x={x(b) - 10} y={r.y + 4} textAnchor="end" className={styles.tick}>{n(b, lang, 0)} %</text>
                    <text x={x(rp) + 10} y={r.y + 4} className={styles.val}>{n(rp, lang, 0)} %</text>
                    <text x={652} y={r.y + 4} className={styles.val}>{sign(r.g, lang)} [{r.lo < 0 ? '−' + -r.lo : r.lo}, {r.hi}]</text>
                  </g>
                );
              })}
            </g>
          ))}
        </svg>
      </div>
    </figure>
  );
}
