main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
App.jsx
import { useState } from "react";
import {
  LayoutDashboard, Instagram, Youtube, Linkedin,
  Link2, Calendar, BarChart2, Settings, TrendingUp,
  Users, Eye, Heart, Share2, Mail, MessageSquare,
  Plus, ExternalLink, X, ArrowUpRight, ArrowDownRight,
  RefreshCw, ChevronRight, AlertCircle, CheckCircle, Check
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from "recharts";

const C = {
  bg:     '#07101C', panel:  '#0C1928', card:   '#0F2238',
  border: 'rgba(45,156,219,0.13)', borderH:'rgba(45,156,219,0.3)',
  blue:   '#2D9CDB', blueD:  '#1A6B8A', blueL:  '#5BB8F5',
  terra:  '#C17A52', sand:   '#D4A96A', olive:  '#8B9E6E',
  text:   '#E0EEF8', sub:    '#7A9BBF', mute:   '#2A4A6A',
  green:  '#4CAF8A', warn:   '#F0A04A', red:    '#E05A5A',
  insta:  '#E1306C', tiktok: '#69C9D0', yt:     '#FF4444',
  li:     '#0A9EE8', nl:     '#D4A96A', comm:   '#8B9E6E',
};

const CHANNELS = [
  { id:'instagram', name:'Instagram',    color:C.insta,  followers:12840, fPrev:12450, reach:45200,  engagement:4.8,  posts:127, impressions:89400  },
  { id:'tiktok',    name:'TikTok',       color:C.tiktok, followers:8320,  fPrev:7280,  reach:92000,  engagement:7.2,  posts:84,  impressions:145000 },
  { id:'youtube',   name:'YouTube',      color:C.yt,     followers:3210,  fPrev:3150,  reach:18400,  engagement:3.1,  posts:32,  impressions:24800  },
  { id:'linkedin',  name:'LinkedIn',     color:C.li,     followers:5640,  fPrev:5510,  reach:21300,  engagement:2.9,  posts:96,  impressions:38200  },
  { id:'newsletter',name:'Newsletter',   color:C.nl,     followers:1840,  fPrev:1825,  reach:1840,   engagement:34.2, posts:6,   impressions:1840   },
  { id:'community', name:'Invest Imob',  color:C.comm,   followers:2340,  fPrev:2220,  reach:2340,   engagement:18.4, posts:48,  impressions:2340   },
];

const GROWTH = [
  { m:'Out', instagram:11200, tiktok:6100, youtube:2900, linkedin:4800 },
  { m:'Nov', instagram:11600, tiktok:6800, youtube:3000, linkedin:5000 },
  { m:'Dez', instagram:12100, tiktok:7200, youtube:3100, linkedin:5200 },
  { m:'Jan', instagram:12400, tiktok:7600, youtube:3150, linkedin:5380 },
  { m:'Fev', instagram:12650, tiktok:7950, youtube:3180, linkedin:5520 },
  { m:'Mar', instagram:12840, tiktok:8320, youtube:3210, linkedin:5640 },
];

const REACH_WEEKLY = [
  { w:'Sem 1', instagram:10200, tiktok:22000, youtube:4200, linkedin:5100 },
  { w:'Sem 2', instagram:11800, tiktok:24500, youtube:4800, linkedin:5400 },
  { w:'Sem 3', instagram:10400, tiktok:21000, youtube:4100, linkedin:4900 },
  { w:'Sem 4', instagram:12800, tiktok:24500, youtube:5300, linkedin:5900 },
];

const ENG_HIST = [
  { m:'Out', instagram:4.2, tiktok:6.8, linkedin:2.7 },
  { m:'Nov', instagram:4.5, tiktok:7.0, linkedin:2.8 },
  { m:'Dez', instagram:4.6, tiktok:7.1, linkedin:2.9 },
  { m:'Jan', instagram:4.7, tiktok:7.0, linkedin:2.8 },
  { m:'Fev', instagram:4.7, tiktok:7.2, linkedin:2.9 },
  { m:'Mar', instagram:4.8, tiktok:7.2, linkedin:2.9 },
];

const NEWSLETTER_DATA = [
  { ed:'#12', date:'Mar 10', assinantes:1840, abertura:'38.4%', clique:'12.1%' },
  { ed:'#11', date:'Fev 24', assinantes:1825, abertura:'41.2%', clique:'14.3%' },
  { ed:'#10', date:'Fev 10', assinantes:1810, abertura:'36.8%', clique:'11.7%' },
];

const COMMUNITY_STATS = [
  { label:'Membros ativos',  value:'1.240', delta:'+5.1%' },
  { label:'Posts no mês',    value:'48',    delta:'+8.0%' },
  { label:'Comentários',     value:'312',   delta:'+14.2%'},
  { label:'Taxa de resp.',   value:'78.4%', delta:'+3.1%' },
];

const CAL_EVENTS = [
  { day:1,  ch:'instagram',  title:'Post: Abertura Q2',         status:'published' },
  { day:2,  ch:'tiktok',     title:'Tendência imobiliária',      status:'published' },
  { day:3,  ch:'linkedin',   title:'Artigo: Mercado 2026',       status:'published' },
  { day:7,  ch:'youtube',    title:'Análise FIIs Abril',         status:'scheduled' },
  { day:8,  ch:'instagram',  title:'Carrossel: 5 dicas',         status:'scheduled' },
  { day:10, ch:'newsletter', title:'Newsletter #14',             status:'scheduled' },
  { day:11, ch:'tiktok',     title:'Trend: Renda passiva',       status:'scheduled' },
  { day:14, ch:'instagram',  title:'Reels: Bastidores',          status:'draft'     },
  { day:15, ch:'linkedin',   title:'Case de sucesso',            status:'draft'     },
  { day:17, ch:'community',  title:'Live: Tire suas dúvidas',    status:'draft'     },
  { day:21, ch:'youtube',    title:'Vídeo: Análise mensal',      status:'draft'     },
  { day:24, ch:'newsletter', title:'Newsletter #15',             status:'draft'     },
  { day:28, ch:'instagram',  title:'Campanha Maio — Teaser',     status:'draft'     },
];

const DEFAULT_LINKS = [
  { id:1, title:'Controle de Edição',    url:'https://docs.google.com/spreadsheets', emoji:'📋', color:C.blue  },
  { id:2, title:'Linha Editorial',       url:'https://docs.google.com/spreadsheets', emoji:'📰', color:C.terra },
  { id:3, title:'Conteúdos no Drive',    url:'https://drive.google.com',             emoji:'📁', color:C.sand  },
  { id:4, title:'Relatório Mensal',      url:'https://docs.google.com/spreadsheets', emoji:'📊', color:C.olive },
];

const fmt  = n => n >= 1000 ? `${(n/1000).toFixed(1)}k` : String(n);
const delta = (a, b) => (((a - b) / b) * 100).toFixed(1);
const chIcon  = id => ({ instagram:'◈', tiktok:'♪', youtube:'▶', linkedin:'in', newsletter:'✉', community:'⌂' }[id] || '○');
const chColor = id => CHANNELS.find(c => c.id === id)?.color || C.blue;

const STATUS = {
  published: { bg:'rgba(76,175,138,0.15)',  text:C.green, label:'Publicado' },
  scheduled: { bg:'rgba(45,156,219,0.15)',  text:C.blue,  label:'Agendado'  },
  draft:     { bg:'rgba(122,155,191,0.08)', text:C.sub,   label:'Rascunho'  },
};

const GS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{background:#07101C}
::-webkit-scrollbar{width:4px;height:4px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:#2A4A6A;border-radius:4px}
.dash{display:flex;height:100vh;font-family:'DM Sans',sans-serif;color:#E0EEF8;background:#07101C;overflow:hidden}
.sb{width:210px;min-width:210px;background:#0C1928;border-right:1px solid rgba(45,156,219,0.12);display:flex;flex-direction:column;overflow:hidden}
.sb-logo{padding:20px 18px 14px;border-bottom:1px solid rgba(45,156,219,0.1)}
.sb-title{font-family:'Syne',sans-serif;font-size:14px;font-weight:800;color:#E0EEF8;letter-spacing:0.3px}
.sb-sub{font-size:10px;color:#7A9BBF;letter-spacing:1.5px;text-transform:uppercase;margin-top:2px}
.sb-nav{flex:1;padding:10px 8px;overflow-y:auto}
.sb-sec{font-size:9px;font-weight:600;color:#2A4A6A;letter-spacing:2px;text-transform:uppercase;padding:10px 10px 5px}
.ni{display:flex;align-items:center;gap:9px;padding:8px 10px;border-radius:7px;cursor:pointer;font-size:13px;font-weight:500;color:#7A9BBF;transition:all 0.15s;margin-bottom:1px;border:1px solid transparent;user-select:none}
.ni:hover{background:rgba(45,156,219,0.07);color:#E0EEF8}
.ni.on{background:rgba(45,156,219,0.13);color:#2D9CDB;border-color:rgba(45,156,219,0.2)}
.sb-bot{padding:10px 8px 14px;border-top:1px solid rgba(45,156,219,0.1)}
.main{flex:1;display:flex;flex-direction:column;overflow:hidden}
.topbar{padding:12px 24px;border-bottom:1px solid rgba(45,156,219,0.1);display:flex;align-items:center;justify-content:space-between;background:#07101C;flex-shrink:0}
.content{flex:1;overflow-y:auto;padding:20px 24px}
.card{background:#0F2238;border:1px solid rgba(45,156,219,0.12);border-radius:12px;transition:border-color 0.2s}
.card:hover{border-color:rgba(45,156,219,0.22)}
.kpi-g{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:13px;margin-bottom:18px}
.kpi{background:#0F2238;border:1px solid rgba(45,156,219,0.12);border-radius:12px;padding:16px 18px;position:relative;overflow:hidden;transition:border-color 0.2s}
.kpi:hover{border-color:rgba(45,156,219,0.25)}
.ch-g{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:13px}
.g2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:13px}
.ch-card{background:#0F2238;border-left:3px solid transparent;border-top:1px solid rgba(45,156,219,0.12);border-right:1px solid rgba(45,156,219,0.12);border-bottom:1px solid rgba(45,156,219,0.12);border-radius:12px;padding:18px 20px;cursor:pointer;transition:all 0.2s}
.ch-card:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,0.3)}
.cal-g{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:3px}
.ch{font-size:9px;font-weight:600;color:#2A4A6A;text-transform:uppercase;letter-spacing:1px;padding:5px 0;text-align:center}
.cd{min-height:76px;background:rgba(255,255,255,0.015);border:1px solid rgba(255,255,255,0.04);border-radius:8px;padding:5px 6px;transition:background 0.15s}
.cd.today{border-color:rgba(45,156,219,0.4);background:rgba(45,156,219,0.05)}
.cd:hover{background:rgba(45,156,219,0.04)}
.ce{font-size:9px;font-weight:500;padding:2px 5px;border-radius:4px;margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.modal-bg{position:fixed;inset:0;background:rgba(0,0,0,0.75);backdrop-filter:blur(3px);z-index:50;display:flex;align-items:center;justify-content:center}
.modal{background:#0C1928;border:1px solid rgba(45,156,219,0.22);border-radius:16px;padding:26px;width:480px;max-width:90vw;max-height:90vh;overflow-y:auto}
.inp{width:100%;background:#07101C;border:1px solid rgba(45,156,219,0.2);border-radius:8px;padding:9px 13px;color:#E0EEF8;font-size:13px;font-family:'DM Sans',sans-serif;outline:none;transition:border-color 0.2s}
.inp:focus{border-color:#2D9CDB}
.btn{display:inline-flex;align-items:center;gap:6px;padding:8px 15px;border-radius:8px;border:none;cursor:pointer;font-size:13px;font-weight:600;font-family:'DM Sans',sans-serif;transition:all 0.15s}
.bp{background:#2D9CDB;color:#fff}.bp:hover{background:#1A6B8A}
.bg{background:rgba(255,255,255,0.06);color:#7A9BBF;border:1px solid rgba(255,255,255,0.08)}.bg:hover{background:rgba(255,255,255,0.1);color:#E0EEF8}
.bt{background:#C17A52;color:#fff}.bt:hover{background:#A0633C}
.tag{display:inline-flex;align-items:center;padding:3px 9px;border-radius:20px;font-size:11px;font-weight:600}
.lc{display:flex;align-items:center;gap:13px;background:#0F2238;border:1px solid rgba(45,156,219,0.12);border-radius:12px;padding:15px 17px;cursor:pointer;transition:all 0.2s;text-decoration:none}
.lc:hover{border-color:rgba(45,156,219,0.3);transform:translateY(-1px)}
.stitle{font-family:'Syne',sans-serif;font-size:13px;font-weight:700;color:#E0EEF8;margin-bottom:12px;display:flex;align-items:center;gap:8px}
@keyframes fu{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.fi{animation:fu 0.25s ease forwards}
@keyframes sp{to{transform:rotate(360deg)}}.spin{animation:sp 0.9s linear infinite}
`;

const CustomTT = ({ active, payload, label, formatter }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background:'#0C1928', border:'1px solid rgba(45,156,219,0.25)', borderRadius:8, padding:'10px 14px', fontSize:12 }}>
      <div style={{ color:C.sub, marginBottom:5 }}>{label}</div>
      {payload.map(p => (
        <div key={p.dataKey} style={{ color:p.color || C.text, marginBottom:2 }}>
          {p.name}: <strong>{formatter ? formatter(p.value) : p.value}</strong>
        </div>
      ))}
    </div>
  );
};

function KpiCard({ label, value, sub, d, icon: Icon, accent }) {
  const up = parseFloat(d) >= 0;
  return (
    <div className="kpi">
      <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:accent, borderRadius:'12px 12px 0 0' }} />
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10 }}>
        <div style={{ fontSize:10, fontWeight:500, color:C.sub, textTransform:'uppercase', letterSpacing:'0.8px' }}>{label}</div>
        <div style={{ background:`${accent}20`, padding:6, borderRadius:7 }}>
          <Icon size={13} color={accent} />
        </div>
      </div>
      <div style={{ fontFamily:"'Syne',sans-serif", fontSize:26, fontWeight:800, color:C.text, lineHeight:1 }}>{value}</div>
      <div style={{ display:'flex', alignItems:'center', gap:5, marginTop:8 }}>
        <span style={{ fontSize:11, color: up ? C.green : C.red, display:'flex', alignItems:'center', gap:2 }}>
          {up ? <ArrowUpRight size={11}/> : <ArrowDownRight size={11}/>}{Math.abs(d)}%
        </span>
        <span style={{ fontSize:11, color:C.sub }}>{sub}</span>
      </div>
    </div>
  );
}

function ChCard({ ch, igData }) {
  const followers = ch.id === 'instagram' && igData?.followers_count ? igData.followers_count : ch.followers;
  const d = delta(followers, ch.fPrev);
  const up = parseFloat(d) >= 0;
  return (
    <div className="ch-card" style={{ borderLeftColor: ch.color }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
        <div style={{ display:'flex', alignItems:'center', gap:9 }}>
          <div style={{ width:33, height:33, borderRadius:8, background:`${ch.color}22`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:700, color:ch.color }}>{chIcon(ch.id)}</div>
          <div>
            <div style={{ fontSize:13, fontWeight:600, color:C.text }}>{ch.name}</div>
            {ch.id==='instagram' && igData?.username && <div style={{ fontSize:10, color:C.sub }}>@{igData.username}</div>}
          </div>
        </div>
        <div style={{ fontSize:10, color: up ? C.green : C.red, display:'flex', alignItems:'center', gap:2, background: up ? 'rgba(76,175,138,0.1)' : 'rgba(224,90,90,0.1)', padding:'3px 7px', borderRadius:20 }}>
          {up ? <ArrowUpRight size={10}/> : <ArrowDownRight size={10}/>}{Math.abs(d)}%
        </div>
      </div>
      <div style={{ fontFamily:"'Syne',sans-serif", fontSize:28, fontWeight:800, color:C.text }}>{fmt(followers)}</div>
      <div style={{ fontSize:11, color:C.sub, marginBottom:12 }}>seguidores</div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:7 }}>
        {[['Alcance', fmt(ch.reach)],['Engajamento', `${ch.engagement}%`]].map(([k,v]) => (
          <div key={k} style={{ background:'rgba(255,255,255,0.03)', borderRadius:7, padding:'7px 9px' }}>
            <div style={{ fontSize:9, color:C.sub, textTransform:'uppercase', letterSpacing:'0.6px' }}>{k}</div>
            <div style={{ fontSize:14, fontWeight:600, color:C.text, marginTop:2 }}>{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OverviewPage({ igData }) {
  const totalF = CHANNELS.reduce((s,c) => s + (c.id==='instagram' && igData?.followers_count ? igData.followers_count : c.followers), 0);
  const totalR = CHANNELS.reduce((s,c) => s + c.reach, 0);
  const avgE = (CHANNELS.reduce((s,c) => s + c.engagement, 0) / CHANNELS.length).toFixed(1);
  return (
    <div className="fi">
      <div className="kpi-g">
        <KpiCard label="Total Seguidores" value={fmt(totalF)}  sub="vs mês anterior" d="+4.2"  icon={Users}    accent={C.blue}  />
        <KpiCard label="Alcance Total"    value={fmt(totalR)}  sub="vs mês anterior" d="+8.7"  icon={Eye}      accent={C.terra} />
        <KpiCard label="Engajamento Médio" value={`${avgE}%`} sub="todas plataformas" d="+0.3" icon={Heart}    accent={C.sand}  />
        <KpiCard label="Posts Publicados"  value="393"         sub="no mês"           d="+12.0" icon={Share2}   accent={C.olive} />
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
        {CHANNELS.map(ch => <ChCard key={ch.id} ch={ch} igData={igData} />)}
      </div>
    </div>
  );
}

function ChannelsPage({ igData, onSettings }) {
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
        {CHANNELS.map(ch => <ChCard key={ch.id} ch={ch} igData={igData} />)}
      </div>
      <div className="g2">
        <div className="card" style={{ padding:'18px 20px' }}>
          <div className="stitle">Alcance Semanal — Março</div>
          <ResponsiveContainer width="100%" height={190}>
            <AreaChart data={REACH_WEEKLY} margin={{ top:4, right:4, bottom:0, left:-22 }}>
              <defs>
                {[['ig',C.insta],['tt',C.tiktok],['yt',C.yt],['li',C.li]].map(([id,c]) => (
                  <linearGradient key={id} id={`g${id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={c} stopOpacity={0.28}/><stop offset="95%" stopColor={c} stopOpacity={0}/>
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

function CalendarPage() {
  const DAYS = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
  const firstDay = new Date(2026, 3, 1).getDay();
  const daysInMonth = 30;
  const evMap = {};
  CAL_EVENTS.forEach(e => { if (!evMap[e.day]) evMap[e.day] = []; evMap[e.day].push(e); });
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="fi">
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
        <div style={{ fontFamily:"'Syne',sans-serif", fontSize:18, fontWeight:800, color:C.text }}>Abril 2026</div>
        <div style={{ display:'flex', gap:7 }}>
          {Object.entries(STATUS).map(([k,v]) => (
            <div key={k} className="tag" style={{ background:v.bg, color:v.text, gap:5 }}>
              <span style={{ width:6, height:6, borderRadius:'50%', background:v.text, display:'inline-block' }}/>
              {v.label}
            </div>
          ))}
        </div>
      </div>
      <div className="card" style={{ padding:14, marginBottom:16 }}>
        <div className="cal-g">
          {DAYS.map(d => <div key={d} className="ch">{d}</div>)}
          {cells.map((day, i) => (
            <div key={i} className={`cd${day===2?' today':''}`}>
              {day && <>
                <div style={{ fontSize:11, fontWeight:day===2?700:400, color:day===2?C.blue:C.sub }}>{day}</div>
                {(evMap[day]||[]).map((e,j) => (
                  <div key={j} className="ce" style={{ background:STATUS[e.status].bg, color:STATUS[e.status].text }}>
                    <span style={{ color:chColor(e.ch) }}>● </span>{e.title}
                  </div>
                ))}
              </>}
            </div>
          ))}
        </div>
      </div>
      <div className="stitle">Próximos conteúdos</div>
      <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
        {CAL_EVENTS.filter(e=>e.day>=2&&e.status!=='published').slice(0,6).map((e,i) => (
          <div key={i} className="card" style={{ padding:'11px 15px', display:'flex', alignItems:'center', gap:12 }}>
            <div style={{ width:34, height:34, borderRadius:8, background:`${chColor(e.ch)}20`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:15, flexShrink:0 }}>{chIcon(e.ch)}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:13, fontWeight:500, color:C.text }}>{e.title}</div>
              <div style={{ fontSize:11, color:C.sub, marginTop:1 }}>Abril {e.day}, 2026</div>
            </div>
            <div className="tag" style={{ background:STATUS[e.status].bg, color:STATUS[e.status].text }}>{STATUS[e.status].label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MetricsPage() {
  return (
    <div className="fi">
      <div className="g2" style={{ marginBottom:14 }}>
        <div className="card" style={{ padding:'18px 20px' }}>
          <div className="stitle">Impressões Mensais por Canal</div>
          <ResponsiveContainer width="100%" height={185}>
            <BarChart data={CHANNELS.map(c=>({ name:c.name.split(' ')[0], imp:c.impressions, color:c.color }))} margin={{ top:4, right:4, bottom:0, left:-14 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="name" tick={{ fontSize:10, fill:C.sub }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize:10, fill:C.sub }} axisLine={false} tickLine={false} tickFormatter={fmt} />
              <Tooltip content={<CustomTT formatter={fmt} />} />
              <Bar dataKey="imp" name="Impressões" radius={[4,4,0,0]}>
                {CHANNELS.map((c,i) => <Cell key={i} fill={c.color} fillOpacity={0.82} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card" style={{ padding:'18px 20px' }}>
          <div className="stitle">Engajamento ao Longo do Tempo</div>
          <ResponsiveContainer width="100%" height={185}>
            <LineChart data={ENG_HIST} margin={{ top:4, right:4, bottom:0, left:-22 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="m" tick={{ fontSize:11, fill:C.sub }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize:10, fill:C.sub }} axisLine={false} tickLine={false} tickFormatter={v=>`${v}%`} />
              <Tooltip content={<CustomTT formatter={v=>`${v}%`} />} />
              {[['instagram','Instagram',C.insta],['tiktok','TikTok',C.tiktok],['linkedin','LinkedIn',C.li]].map(([k,n,c]) => (
                <Line key={k} type="monotone" dataKey={k} name={n} stroke={c} strokeWidth={2} dot={false} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="g2">
        <div className="card" style={{ padding:'18px 20px' }}>
          <div className="stitle">Newsletter — Histórico de Edições</div>
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:12 }}>
            <thead>
              <tr style={{ borderBottom:`1px solid rgba(45,156,219,0.1)` }}>
                {['Edição','Data','Assinantes','Abertura','Clique'].map(h => (
                  <th key={h} style={{ textAlign:'left', padding:'6px 8px', color:C.sub, fontWeight:500 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {NEWSLETTER_DATA.map((n,i) => (
                <tr key={i} style={{ borderBottom:`1px solid rgba(255,255,255,0.03)` }}>
                  <td style={{ padding:'8px', color:C.sand, fontWeight:700 }}>{n.ed}</td>
                  <td style={{ padding:'8px', color:C.sub }}>{n.date}</td>
                  <td style={{ padding:'8px', color:C.text }}>{n.assinantes.toLocaleString('pt-BR')}</td>
                  <td style={{ padding:'8px', color:C.green }}>{n.abertura}</td>
                  <td style={{ padding:'8px', color:C.blue }}>{n.clique}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop:16, display:'flex', gap:8 }}>
            {[['Taxa média abertura','38.8%',C.green],['Taxa média clique','12.7%',C.blue]].map(([k,v,c]) => (
              <div key={k} style={{ flex:1, background:'rgba(255,255,255,0.03)', borderRadius:8, padding:'10px 12px' }}>
                <div style={{ fontSize:10, color:C.sub }}>{k}</div>
                <div style={{ fontSize:18, fontWeight:700, color:c, marginTop:3 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="card" style={{ padding:'18px 20px' }}>
          <div className="stitle">Comunidade Invest Imob</div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:9 }}>
            {COMMUNITY_STATS.map((s,i) => (
              <div key={i} style={{ background:'rgba(139,158,110,0.08)', border:'1px solid rgba(139,158,110,0.14)', borderRadius:9, padding:'12px 13px' }}>
                <div style={{ fontSize:9, color:C.sub, textTransform:'uppercase', letterSpacing:'0.8px' }}>{s.label}</div>
                <div style={{ fontFamily:"'Syne',sans-serif", fontSize:22, fontWeight:800, color:C.text, marginTop:4 }}>{s.value}</div>
                <div style={{ fontSize:11, color:C.olive, marginTop:2 }}>{s.delta} vs anterior</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function LinksPage() {
  const [links, setLinks] = useState(DEFAULT_LINKS);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ title:'', url:'', emoji:'🔗' });

  const add = () => {
    if (!form.title || !form.url) return;
    setLinks(p => [...p, { id:Date.now(), ...form, color:C.blue }]);
    setForm({ title:'', url:'', emoji:'🔗' }); setAdding(false);
  };

  return (
    <div className="fi">
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
        <div>
          <div style={{ fontFamily:"'Syne',sans-serif", fontSize:15, fontWeight:700, color:C.text }}>Acesso Rápido</div>
          <div style={{ fontSize:12, color:C.sub, marginTop:2 }}>Planilhas, drives e documentos do time</div>
        </div>
        <button className="btn bt" onClick={() => setAdding(true)}><Plus size={14} /> Adicionar link</button>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(2,minmax(0,1fr))', gap:13 }}>
        {links.map(lk => (
          <div key={lk.id} className="lc">
            <div style={{ width:44, height:44, borderRadius:10, background:`${lk.color}20`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, flexShrink:0 }}>{lk.emoji}</div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:14, fontWeight:600, color:C.text, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{lk.title}</div>
              <div style={{ fontSize:11, color:C.sub, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', marginTop:2 }}>{lk.url}</div>
            </div>
            <div style={{ display:'flex', gap:5, flexShrink:0 }}>
              <a href={lk.url} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}>
                <button className="btn bg" style={{ padding:'5px 9px' }}><ExternalLink size={12} /></button>
              </a>
              <button className="btn bg" style={{ padding:'5px 9px' }} onClick={() => setLinks(p => p.filter(l => l.id !== lk.id))}><X size={12} /></button>
            </div>
          </div>
        ))}
      </div>
      {adding && (
        <div className="modal-bg" onClick={e => { if(e.target===e.currentTarget) setAdding(false); }}>
          <div className="modal">
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:18 }}>
              <div style={{ fontFamily:"'Syne',sans-serif", fontSize:16, fontWeight:800, color:C.text }}>Novo Link</div>
              <button className="btn bg" style={{ padding:'3px 8px' }} onClick={() => setAdding(false)}><X size={13}/></button>
            </div>
            {[['Emoji','emoji','text','🔗'],['Título','title','text','Ex: Planilha de Leads'],['URL','url','url','https://']].map(([l,k,t,ph]) => (
              <div key={k} style={{ marginBottom:12 }}>
                <div style={{ fontSize:11, color:C.sub, marginBottom:5 }}>{l}</div>
                <input className="inp" type={t} placeholder={ph} value={form[k]} onChange={e => setForm(p=>({...p,[k]:e.target.value}))} />
              </div>
            ))}
            <div style={{ display:'flex', gap:9, justifyContent:'flex-end', marginTop:6 }}>
              <button className="btn bg" onClick={() => setAdding(false)}>Cancelar</button>
              <button className="btn bp" onClick={add}><Check size={13}/> Adicionar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SettingsModal({ token, setToken, igData, igError, igLoading, onConnect, onClose }) {
  const [draft, setDraft] = useState(token);
  return (
    <div className="modal-bg" onClick={e => { if(e.target===e.currentTarget) onClose(); }}>
      <div className="modal">
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:18 }}>
          <div style={{ fontFamily:"'Syne',sans-serif", fontSize:16, fontWeight:800, color:C.text }}>Configurações de API</div>
          <button className="btn bg" style={{ padding:'3px 8px' }} onClick={onClose}><X size={13}/></button>
        </div>
        <div style={{ background:'rgba(45,156,219,0.06)', border:'1px solid rgba(45,156,219,0.18)', borderRadius:9, padding:'11px 13px', marginBottom:18, fontSize:12, color:C.sub, lineHeight:1.6 }}>
          Para conectar o Instagram, acesse <strong style={{ color:C.blue }}>developers.facebook.com</strong>, crie um app com permissões de Instagram Business e gere um <strong style={{ color:C.text }}>Access Token de longa duração</strong>.
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:9, marginBottom:7 }}>
          <div style={{ width:28, height:28, borderRadius:6, background:'rgba(225,48,108,0.15)', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <Instagram size={13} color={C.insta} />
          </div>
          <div style={{ fontSize:13, fontWeight:600, color:C.text }}>Instagram Access Token</div>
          {igData && <div className="tag" style={{ background:'rgba(76,175,138,0.15)', color:C.green, marginLeft:'auto', gap:4 }}><CheckCircle size={10}/> Conectado</div>}
        </div>
        <textarea className="inp" rows={3} placeholder="Cole seu Instagram Access Token aqui..." value={draft} onChange={e=>setDraft(e.target.value)} style={{ resize:'none', marginBottom:10, fontFamily:'monospace', fontSize:11 }} />
        {igData && (
          <div style={{ background:'rgba(76,175,138,0.07)', border:'1px solid rgba(76,175,138,0.2)', borderRadius:8, padding:'10px 13px', marginBottom:12, fontSize:12 }}>
            <div style={{ color:C.green, fontWeight:600 }}>✓ Conectado como @{igData.username}</div>
            <div style={{ color:C.sub, marginTop:3 }}>{igData.followers_count?.toLocaleString('pt-BR')} seguidores · {igData.media_count} posts</div>
          </div>
        )}
        {igError && (
          <div style={{ background:'rgba(224,90,90,0.1)', border:'1px solid rgba(224,90,90,0.22)', borderRadius:8, padding:'10px 13px', marginBottom:12, fontSize:12, color:C.red }}>
            <AlertCircle size={12} style={{ display:'inline', marginRight:5 }}/>{igError}
          </div>
        )}
        <div style={{ display:'flex', gap:9, justifyContent:'flex-end' }}>
          <button className="btn bg" onClick={onClose}>Fechar</button>
          <button className="btn bp" onClick={() => { setToken(draft); onConnect(draft); }} disabled={igLoading} style={{ opacity: igLoading ? 0.7 : 1 }}>
            {igLoading ? <><RefreshCw size={13} className="spin"/> Conectando...</> : <><Instagram size={13}/> Conectar Instagram</>}
          </button>
        </div>
        <div style={{ borderTop:`1px solid ${C.border}`, marginTop:18, paddingTop:14 }}>
          <div style={{ fontSize:10, color:C.mute, fontWeight:600, letterSpacing:'1.2px', textTransform:'uppercase', marginBottom:10 }}>Próximas integrações</div>
          {[['TikTok',C.tiktok],['YouTube',C.yt],['LinkedIn',C.li]].map(([n,c]) => (
            <div key={n} style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 0', borderBottom:`1px solid rgba(255,255,255,0.04)` }}>
              <div style={{ width:24, height:24, borderRadius:5, background:`${c}20`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, color:c, fontWeight:700 }}>{n[0]}</div>
              <span style={{ fontSize:13, color:C.sub }}>{n}</span>
              <span style={{ fontSize:10, color:C.mute, marginLeft:'auto', background:'rgba(255,255,255,0.04)', padding:'2px 8px', borderRadius:20 }}>Em breve</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const NAV = [
  { id:'overview',  icon:LayoutDashboard, label:'Visão Geral'   },
  { id:'channels',  icon:BarChart2,        label:'Redes Sociais' },
  { id:'calendar',  icon:Calendar,         label:'Calendário'    },
  { id:'metrics',   icon:TrendingUp,       label:'Métricas'      },
  { id:'links',     icon:Link2,            label:'Links Rápidos' },
];

const PAGE_LABEL = { overview:'Visão Geral', channels:'Redes Sociais', calendar:'Calendário de Conteúdo', metrics:'Métricas', links:'Links Rápidos' };

export default function App() {
  const [page,        setPage]        = useState('overview');
  const [showCfg,     setShowCfg]     = useState(false);
  const [igToken,     setIgToken]     = useState('');
  const [igData,      setIgData]      = useState(null);
  const [igLoading,   setIgLoading]   = useState(false);
  const [igError,     setIgError]     = useState(null);

  const fetchIG = async (tkn) => {
    const t = tkn !== undefined ? tkn : igToken;
    if (!t) return;
    setIgLoading(true); setIgError(null);
    try {
      const r = await fetch(`https://graph.instagram.com/me?fields=id,username,followers_count,media_count,biography&access_token=${t}`);
      const d = await r.json();
      if (d.error) throw new Error(d.error.message || 'Token inválido');
      setIgData(d);
    } catch(e) { setIgError(e.message); }
    setIgLoading(false);
  };

  const today = new Date();
  const dateStr = today.toLocaleDateString('pt-BR', { weekday:'long', day:'2-digit', month:'long', year:'numeric' });

  return (
    <>
      <style>{GS}</style>
      <div className="dash">
        {/* SIDEBAR */}
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

        {/* MAIN */}
        <div className="main">
          <div className="topbar">
            <div>
              <div style={{ fontFamily:"'Syne',sans-serif", fontSize:15, fontWeight:700, color:C.text }}>{PAGE_LABEL[page]}</div>
              <div style={{ fontSize:11, color:C.sub, marginTop:1, textTransform:'capitalize' }}>{dateStr}</div>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:9 }}>
              {igData && <div className="tag" style={{ background:'rgba(225,48,108,0.13)', color:C.insta, gap:5 }}><Instagram size={10}/> Conectado</div>}
              <div className="tag" style={{ background:'rgba(45,156,219,0.1)', color:C.blue }}>Março 2026</div>
              <button className="btn bg" onClick={() => setShowCfg(true)} style={{ padding:'6px 10px' }}><Settings size={13}/></button>
            </div>
          </div>
          <div className="content" key={page}>
            {page==='overview' && <OverviewPage igData={igData} />}
            {page==='channels' && <ChannelsPage igData={igData} onSettings={() => setShowCfg(true)} />}
            {page==='calendar' && <CalendarPage />}
            {page==='metrics'  && <MetricsPage />}
            {page==='links'    && <LinksPage />}
          </div>
        </div>

        {showCfg && (
          <SettingsModal
            token={igToken} setToken={setIgToken}
            igData={igData} igError={igError} igLoading={igLoading}
            onConnect={fetchIG} onClose={() => setShowCfg(false)}
          />
        )}
      </div>
    </>
  );
}
