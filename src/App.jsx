import { useEffect, useState } from "react";
function ChCard({ ch, igData, ytData }) {
  const followers =
    ch.id === 'instagram' && igData?.followers_count
      ? Number(igData.followers_count)
      : ch.id === 'youtube' && ytData?.subscribers
      ? Number(ytData.subscribers)
      : ch.followers;

  const d = delta(followers, ch.fPrev);
  const up = parseFloat(d) >= 0;

  return (
    <div className="ch-card" style={{ borderLeftColor: ch.color }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
        <div style={{ display:'flex', alignItems:'center', gap:9 }}>
          <div
            style={{
              width:33,
              height:33,
              borderRadius:8,
              background:`${ch.color}22`,
              display:'flex',
              alignItems:'center',
              justifyContent:'center',
              fontSize:13,
              fontWeight:700,
              color:ch.color
            }}
          >
            {chIcon(ch.id)}
          </div>
          <div>
            <div style={{ fontSize:13, fontWeight:600, color:C.text }}>{ch.name}</div>
            {ch.id === 'instagram' && igData?.username && (
              <div style={{ fontSize:10, color:C.sub }}>@{igData.username}</div>
            )}
            {ch.id === 'youtube' && ytData?.title && (
              <div style={{ fontSize:10, color:C.sub }}>{ytData.title}</div>
            )}
          </div>
        </div>

        <div
          style={{
            fontSize:10,
            color: up ? C.green : C.red,
            display:'flex',
            alignItems:'center',
            gap:2,
            background: up ? 'rgba(76,175,138,0.1)' : 'rgba(224,90,90,0.1)',
            padding:'3px 7px',
            borderRadius:20
          }}
        >
          {up ? <ArrowUpRight size={10}/> : <ArrowDownRight size={10}/>}
          {Math.abs(d)}%
        </div>
      </div>

      <div style={{ fontFamily:"'Syne',sans-serif", fontSize:28, fontWeight:800, color:C.text }}>
        {fmt(followers)}
      </div>
      <div style={{ fontSize:11, color:C.sub, marginBottom:12 }}>
        {ch.id === 'youtube' ? 'inscritos' : 'seguidores'}
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:7 }}>
        {[
          ['Alcance', fmt(ch.reach)],
          ['Engajamento', `${ch.engagement}%`]
        ].map(([k,v]) => (
          <div key={k} style={{ background:'rgba(255,255,255,0.03)', borderRadius:7, padding:'7px 9px' }}>
            <div style={{ fontSize:9, color:C.sub, textTransform:'uppercase', letterSpacing:'0.6px' }}>{k}</div>
            <div style={{ fontSize:14, fontWeight:600, color:C.text, marginTop:2 }}>{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OverviewPage({ igData, ytData }) {
  const totalF = CHANNELS.reduce((s, c) => {
    if (c.id === 'instagram' && igData?.followers_count) return s + Number(igData.followers_count);
    if (c.id === 'youtube' && ytData?.subscribers) return s + Number(ytData.subscribers);
    return s + c.followers;
  }, 0);

  const totalR = CHANNELS.reduce((s,c) => s + c.reach, 0);
  const avgE = (CHANNELS.reduce((s,c) => s + c.engagement, 0) / CHANNELS.length).toFixed(1);

  return (
    <div className="fi">
      <div className="kpi-g">
        <KpiCard label="Total Seguidores" value={fmt(totalF)}  sub="vs mês anterior" d="+4.2"  icon={Users}  accent={C.blue}  />
        <KpiCard label="Alcance Total"    value={fmt(totalR)}  sub="vs mês anterior" d="+8.7"  icon={Eye}    accent={C.terra} />
        <KpiCard label="Engajamento Médio" value={`${avgE}%`} sub="todas plataformas" d="+0.3" icon={Heart} accent={C.sand}  />
        <KpiCard label="Posts Publicados"  value="393"         sub="no mês"           d="+12.0" icon={Share2} accent={C.olive} />
      </div>

      <div className="g2" style={{ marginBottom:14 }}>
        <div className="card" style={{ padding:'18px 20px' }}>
          <div className="stitle">Crescimento de Seguidores</div>
          <ResponsiveContainer width="100%" height={190}>
            <LineChart data={GROWTH} margin={{ top:4, right:4, bottom:0, left:-22 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="m" tick={{ fontSize:11, fill:C.sub }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize:10, fill:C.sub }} axisLine={false} tickLine={false} tickFormatter={fmt} />
              <Tooltip content={<CustomTT formatter={fmt} />} />
              {[['instagram','Instagram',C.insta],['tiktok','TikTok',C.tiktok],['youtube','YouTube',C.yt],['linkedin','LinkedIn',C.li]].map(([k,n,color]) => (
                <Line key={k} type="monotone" dataKey={k} name={n} stroke={color} strokeWidth={2} dot={false} />
              ))}
            </LineChart>
          </ResponsiveContainer>
          <div style={{ display:'flex', flexWrap:'wrap', gap:14, marginTop:10 }}>
            {[['Instagram',C.insta],['TikTok',C.tiktok],['YouTube',C.yt],['LinkedIn',C.li]].map(([n,c]) => (
              <div key={n} style={{ display:'flex', alignItems:'center', gap:5, fontSize:11, color:C.sub }}>
                <div style={{ width:18, height:2, background:c, borderRadius:2 }} />{n}
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding:'18px 20px' }}>
          <div className="stitle">Taxa de Engajamento por Canal</div>
          <ResponsiveContainer width="100%" height={190}>
            <BarChart layout="vertical" data={CHANNELS.map(c=>({ name:c.name.split(' ')[0], value:c.engagement, color:c.color }))} margin={{ top:0, right:14, bottom:0, left:8 }}>
              <XAxis type="number" tick={{ fontSize:10, fill:C.sub }} axisLine={false} tickLine={false} tickFormatter={v=>`${v}%`} />
              <YAxis type="category" dataKey="name" tick={{ fontSize:11, fill:C.sub }} axisLine={false} tickLine={false} width={75} />
              <Tooltip content={<CustomTT formatter={v=>`${v}%`} />} />
              <Bar dataKey="value" name="Engajamento" radius={[0,4,4,0]}>
                {CHANNELS.map((c,i) => <Cell key={i} fill={c.color} fillOpacity={0.85} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="stitle">Todos os Canais</div>
      <div className="ch-g">
        {CHANNELS.map(ch => <ChCard key={ch.id} ch={ch} igData={igData} ytData={ytData} />)}
      </div>
    </div>
  );
}

function ChannelsPage({ igData, ytData, onSettings }) {
  return (
    <div className="fi">
      {!igData && (
        <div style={{ background:'rgba(193,122,82,0.1)', border:'1px solid rgba(193,122,82,0.28)', borderRadius:10, padding:'11px 15px', marginBottom:15, display:'flex', alignItems:'center', gap:9 }}>
          <AlertCircle size={14} color={C.terra} />
          <span style={{ fontSize:13, color:C.sub }}>Instagram exibindo dados simulados.</span>
          <button className="btn bg" onClick={onSettings} style={{ padding:'4px 12px', fontSize:12, marginLeft:'auto' }}>
            Conectar Instagram <ChevronRight size={12} />
          </button>
        </div>
      )}

      <div className="ch-g" style={{ marginBottom:18 }}>
        {CHANNELS.map(ch => <ChCard key={ch.id} ch={ch} igData={igData} ytData={ytData} />)}
      </div>

      <div className="g2">
        <div className="card" style={{ padding:'18px 20px' }}>
          <div className="stitle">Alcance Semanal — Março</div>
          <ResponsiveContainer width="100%" height={190}>
            <AreaChart data={REACH_WEEKLY} margin={{ top:4, right:4, bottom:0, left:-22 }}>
              <defs>
                {[['ig',C.insta],['tt',C.tiktok],['yt',C.yt],['li',C.li]].map(([id,c]) => (
                  <linearGradient key={id} id={`g${id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={c} stopOpacity={0.28}/>
                    <stop offset="95%" stopColor={c} stopOpacity={0}/>
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="w" tick={{ fontSize:11, fill:C.sub }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize:10, fill:C.sub }} axisLine={false} tickLine={false} tickFormatter={fmt} />
              <Tooltip content={<CustomTT formatter={fmt} />} />
              {[['instagram','Instagram',C.insta,'ig'],['tiktok','TikTok',C.tiktok,'tt'],['youtube','YouTube',C.yt,'yt'],['linkedin','LinkedIn',C.li,'li']].map(([k,n,c,id]) => (
                <Area key={k} type="monotone" dataKey={k} name={n} stroke={c} fill={`url(#g${id})`} strokeWidth={1.8} />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card" style={{ padding:'18px 20px' }}>
          <div className="stitle">Posts por Canal — Março</div>
          <ResponsiveContainer width="100%" height={190}>
            <BarChart data={CHANNELS.map(c=>({ name:c.name.split(' ')[0], posts:c.posts, color:c.color }))} margin={{ top:4, right:4, bottom:0, left:-25 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="name" tick={{ fontSize:10, fill:C.sub }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize:10, fill:C.sub }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTT />} formatter={v=>[v,'Posts']} />
              <Bar dataKey="posts" name="Posts" radius={[4,4,0,0]}>
                {CHANNELS.map((c,i) => <Cell key={i} fill={c.color} fillOpacity={0.85} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function SettingsModal({
  token, setToken, igData, igError, igLoading, onConnect,
  ytData, ytError, ytLoading, onConnectYt,
  ttToken, setTtToken, ttData, ttError, ttLoading, onConnectTt,
  liToken, setLiToken, liData, liError, liLoading, onConnectLi,
  onClose
}) {
  const [igDraft, setIgDraft] = useState(token);
  const [ttDraft, setTtDraft] = useState(ttToken);
  const [liDraft, setLiDraft] = useState(liToken);

  return (
    <div className="modal-bg" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal">
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:18 }}>
          <div style={{ fontFamily:"'Syne',sans-serif", fontSize:16, fontWeight:800, color:C.text }}>
            Configurações de Integrações
          </div>
          <button className="btn bg" style={{ padding:'3px 8px' }} onClick={onClose}>
            <X size={13}/>
          </button>
        </div>

        <NetworkRow
          label="Instagram" color={C.insta} icon={Instagram}
          connected={!!igData} loading={igLoading} error={igError}
          draft={igDraft} setDraft={setIgDraft}
          onConnect={() => { setToken(igDraft); onConnect(igDraft); }}
          placeholder="Cole seu Instagram Access Token..."
          hint="Gere o token em developers.facebook.com → seu app → Casos de uso → Gerar tokens de acesso."
        />

        <NetworkRow
          label="YouTube" color={C.yt} icon={Youtube}
          connected={!!ytData} loading={ytLoading} error={ytError}
          draft={'YouTube conectado pela API da Vercel'} setDraft={() => {}}
          onConnect={() => { onConnectYt(); }}
          placeholder="YouTube conectado pela API da Vercel"
          hint="Esta integração usa /api/youtube com variáveis de ambiente da Vercel."
        />

        <NetworkRow
          label="TikTok" color={C.tiktok} icon={Share2}
          connected={!!ttData} loading={ttLoading} error={ttError}
          draft={ttDraft} setDraft={setTtDraft}
          onConnect={() => { setTtToken(ttDraft); onConnectTt(ttDraft); }}
          placeholder="Cole seu TikTok Access Token..."
          hint="Gere em developers.tiktok.com → seu app → Manage Apps → Access Token."
        />

        <NetworkRow
          label="LinkedIn" color={C.li} icon={Linkedin}
          connected={!!liData} loading={liLoading} error={liError}
          draft={liDraft} setDraft={setLiDraft}
          onConnect={() => { setLiToken(liDraft); onConnectLi(liDraft); }}
          placeholder="Cole seu LinkedIn Access Token..."
          hint="Gere em linkedin.com/developers → seu app → Auth → OAuth 2.0 tools → Request access token."
        />

        <div style={{ display:'flex', justifyContent:'flex-end', marginTop:6 }}>
          <button className="btn bg" onClick={onClose}>Fechar</button>
        </div>

        <div style={{ borderTop:`1px solid ${C.border}`, marginTop:14, paddingTop:12 }}>
          <div style={{ fontSize:10, color:C.mute, fontWeight:600, letterSpacing:'1.2px', textTransform:'uppercase', marginBottom:8 }}>
            Entrada manual
          </div>
          {[['Newsletter',C.nl],['Invest Imob',C.comm]].map(([n,c]) => (
            <div key={n} style={{ display:'flex', alignItems:'center', gap:10, padding:'7px 0', borderBottom:`1px solid rgba(255,255,255,0.04)` }}>
              <div style={{ width:24, height:24, borderRadius:5, background:`${c}20`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, color:c, fontWeight:700 }}>
                {n[0]}
              </div>
              <span style={{ fontSize:13, color:C.sub }}>{n}</span>
              <span style={{ fontSize:10, color:C.mute, marginLeft:'auto', background:'rgba(255,255,255,0.04)', padding:'2px 8px', borderRadius:20 }}>
                Inserção manual
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const NAV = [
  { id:'overview',  icon:LayoutDashboard, label:'Visão Geral'   },
  { id:'channels',  icon:BarChart2,       label:'Redes Sociais' },
  { id:'calendar',  icon:Calendar,        label:'Calendário'    },
  { id:'metrics',   icon:TrendingUp,      label:'Métricas'      },
  { id:'links',     icon:Link2,           label:'Links Rápidos' },
];

const PAGE_LABEL = {
  overview:'Visão Geral',
  channels:'Redes Sociais',
  calendar:'Calendário de Conteúdo',
  metrics:'Métricas',
  links:'Links Rápidos'
};

export default function App() {
  const [page,      setPage]      = useState('overview');
  const [showCfg,   setShowCfg]   = useState(false);

  const [igToken,   setIgToken]   = useState('');
  const [igData,    setIgData]    = useState(null);
  const [igLoading, setIgLoading] = useState(false);
  const [igError,   setIgError]   = useState(null);

  const [ytData,    setYtData]    = useState(null);
  const [ytLoading, setYtLoading] = useState(false);
  const [ytError,   setYtError]   = useState(null);

  const [ttToken,   setTtToken]   = useState('');
  const [ttData,    setTtData]    = useState(null);
  const [ttLoading, setTtLoading] = useState(false);
  const [ttError,   setTtError]   = useState(null);

  const [liToken,   setLiToken]   = useState('');
  const [liData,    setLiData]    = useState(null);
  const [liLoading, setLiLoading] = useState(false);
  const [liError,   setLiError]   = useState(null);

  const fetchIG = async (tkn) => {
    const t = tkn !== undefined ? tkn : igToken;
    if (!t) return;

    setIgLoading(true);
    setIgError(null);

    try {
      const r = await fetch(`https://graph.instagram.com/me?fields=id,username,followers_count,media_count,biography&access_token=${t}`);
      const d = await r.json();
      if (d.error) throw new Error(d.error.message || 'Token inválido');
      setIgData(d);
    } catch (e) {
      setIgError(e.message);
    }

    setIgLoading(false);
  };

  const fetchYT = async () => {
    setYtLoading(true);
    setYtError(null);

    try {
      const r = await fetch('/api/youtube');
      const d = await r.json();

      if (!r.ok) {
        throw new Error(d.error || 'Erro ao conectar YouTube');
      }

      setYtData(d);
    } catch (e) {
      setYtError(e.message);
    }

    setYtLoading(false);
  };

  const fetchTT = async (tkn) => {
    const t = tkn !== undefined ? tkn : ttToken;
    if (!t) return;

    setTtLoading(true);
    setTtError(null);

    try {
      const r = await fetch(`https://open.tiktokapis.com/v2/user/info/?fields=display_name,follower_count,video_count`, {
        headers: { Authorization: `Bearer ${t}` }
      });
      const d = await r.json();
      if (d.error?.code && d.error.code !== 'ok') throw new Error(d.error.message || 'Token inválido');
      setTtData(d.data?.user);
    } catch (e) {
      setTtError(e.message);
    }

    setTtLoading(false);
  };

  const fetchLI = async (tkn) => {
    const t = tkn !== undefined ? tkn : liToken;
    if (!t) return;

    setLiLoading(true);
    setLiError(null);

    try {
      const r = await fetch(`https://api.linkedin.com/v2/me`, {
        headers: { Authorization: `Bearer ${t}` }
      });
      const d = await r.json();
      if (d.status === 401 || d.message) throw new Error(d.message || 'Token inválido');
      setLiData(d);
    } catch (e) {
      setLiError(e.message);
    }

    setLiLoading(false);
  };

  useEffect(() => {
    fetchYT();
  }, []);

  const today = new Date();
  const dateStr = today.toLocaleDateString('pt-BR', {
    weekday:'long',
    day:'2-digit',
    month:'long',
    year:'numeric'
  });

  return (
    <>
      <style>{GS}</style>

      <div className="dash">
        <div className="sb">
          <div className="sb-logo">
            <div className="sb-title">Marketing Hub</div>
            <div className="sb-sub">Invest Imob · 2026</div>
          </div>

          <div className="sb-nav">
            <div className="sb-sec">Menu</div>
            {NAV.map(n => (
              <div key={n.id} className={`ni${page===n.id?' on':''}`} onClick={() => setPage(n.id)}>
                <n.icon size={14} /><span>{n.label}</span>
              </div>
            ))}
          </div>

          <div className="sb-bot">
            <div className="ni" onClick={() => setShowCfg(true)}>
              <Settings size={14}/><span>Configurações</span>
            </div>
          </div>
        </div>

        <div className="main">
          <div className="topbar">
            <div>
              <div style={{ fontFamily:"'Syne',sans-serif", fontSize:15, fontWeight:700, color:C.text }}>
                {PAGE_LABEL[page]}
              </div>
              <div style={{ fontSize:11, color:C.sub, marginTop:1, textTransform:'capitalize' }}>
                {dateStr}
              </div>
            </div>

            <div style={{ display:'flex', alignItems:'center', gap:9 }}>
              {igData && (
                <div className="tag" style={{ background:'rgba(225,48,108,0.13)', color:C.insta, gap:5 }}>
                  <Instagram size={10}/> Instagram
                </div>
              )}
              {ytData && (
                <div className="tag" style={{ background:'rgba(255,68,68,0.13)', color:C.yt, gap:5 }}>
                  <Youtube size={10}/> YouTube
                </div>
              )}
              <div className="tag" style={{ background:'rgba(45,156,219,0.1)', color:C.blue }}>
                Atualizado agora
              </div>
            </div>
          </div>

          <div className="content">
            <div key={page}>
              {page==='overview' && <OverviewPage igData={igData} ytData={ytData} />}
              {page==='channels' && <ChannelsPage igData={igData} ytData={ytData} onSettings={() => setShowCfg(true)} />}
              {page==='calendar' && <CalendarPage />}
              {page==='metrics'  && <MetricsPage />}
              {page==='links'    && <LinksPage />}
            </div>
          </div>

          {showCfg && (
            <SettingsModal
              token={igToken} setToken={setIgToken}
              igData={igData} igError={igError} igLoading={igLoading}
              onConnect={fetchIG}

              ytData={ytData} ytError={ytError} ytLoading={ytLoading}
              onConnectYt={fetchYT}

              ttToken={ttToken} setTtToken={setTtToken}
              ttData={ttData} ttError={ttError} ttLoading={ttLoading}
              onConnectTt={fetchTT}

              liToken={liToken} setLiToken={setLiToken}
              liData={liData} liError={liError} liLoading={liLoading}
              onConnectLi={fetchLI}

              onClose={() => setShowCfg(false)}
            />
          )}
        </div>
      </div>
    </>
  );
}
