import { useEffect,useMemo,useState } from 'react'
import { useTranslation } from 'react-i18next'
import ReactMarkdown from 'react-markdown'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import 'highlight.js/styles/github-dark.css'
import { importCode,methods } from './data'
import { notification } from './notification'
hljs.registerLanguage('javascript',javascript)
type Theme='light'|'dark'
const normalize=(value:string)=>value.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff]/g,'')
export default function App(){
 const {t,i18n}=useTranslation();const [query,setQuery]=useState(()=>localStorage.getItem('bridge-search')||'');
 const [theme,setTheme]=useState<Theme>(()=>(localStorage.getItem('bridge-theme') as Theme)||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'));
 const locale=i18n.language.startsWith('zh')?'zh':'en';
 const filtered=useMemo(()=>{const q=normalize(query);return q?methods.filter(m=>normalize(`${m.name} ${m.signature} ${m.description[locale]}`).includes(q)):methods},[query,locale]);
 useEffect(()=>{document.documentElement.dataset.theme=theme;localStorage.setItem('bridge-theme',theme)},[theme]);
 useEffect(()=>localStorage.setItem('bridge-search',query),[query]);useEffect(()=>{document.documentElement.lang=locale==='zh'?'zh-CN':'en'},[locale]);
 const search=()=>{const exact=methods.find(m=>normalize(m.name).includes(normalize(query)))||filtered[0];exact?document.getElementById(`method-${exact.name}`)?.scrollIntoView({behavior:'smooth',block:'start'}):notification.warning(t('noResult'))};
 const copy=async(code:string)=>{try{await navigator.clipboard.writeText(code);notification.success(t('copied'))}catch{notification.error(t('copyFailed'))}};
 const toggleLanguage=()=>{const next=locale==='zh'?'en':'zh';i18n.changeLanguage(next);localStorage.setItem('bridge-lang',next)};
 return <div className="app"><header><a className="brand" href="#top"><span className="logo">B</span><span>Bridge<span className="accent">API</span></span></a><nav><button className="icon-button language" onClick={toggleLanguage} title={t('language')}>{locale==='zh'?'EN':'中'}</button><button className="icon-button" onClick={()=>setTheme(theme==='light'?'dark':'light')} title={t('theme')}>{theme==='light'?'☾':'☀'}</button></nav></header>
 <main id="top"><section className="hero"><div className="eyebrow">BRIDGE.JS · API REFERENCE</div><h1>Bridge <span>API</span></h1><p>{t('subtitle')}</p></section>
 <div className="search-anchor"><div className="search-bar"><span className="search-icon">⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>e.key==='Enter'&&search()} placeholder={t('search')} aria-label={t('search')}/><span className="count">{t('methods',{count:filtered.length})}</span><button onClick={search}>{t('searchButton')} <span>→</span></button></div></div>
 <section className="methods">{filtered.length===0&&<div className="empty">{t('noResult')}</div>}{filtered.map((method,index)=>{const fullExample=`${importCode}\n\n${method.usageCode}`;return <article id={`method-${method.name}`} className="method-card" key={method.name}><div className="method-number">{String(index+1).padStart(2,'0')}</div><div className="method-heading"><div><div className="badge">METHOD</div><h2>{method.name}</h2><code>{method.signature}</code></div></div><div className="description"><ReactMarkdown>{method.description[locale]}</ReactMarkdown></div><div className="code-block"><div className="code-top"><span><i/><i/><i/></span><span>JavaScript</span><button onClick={()=>copy(fullExample)}>⧉</button></div><div className="code-example"><div className="code-label"><span>01</span>{t('import')}<button onClick={()=>copy(importCode)}>⧉</button></div><pre><code dangerouslySetInnerHTML={{__html:hljs.highlight(importCode,{language:'javascript'}).value}}/></pre></div><div className="code-example"><div className="code-label"><span>02</span>{t('usage')}<button onClick={()=>copy(method.usageCode)}>⧉</button></div><pre><code dangerouslySetInnerHTML={{__html:hljs.highlight(method.usageCode,{language:'javascript'}).value}}/></pre></div></div><div className="actions"><button className="secondary" onClick={()=>copy(fullExample)}>⧉ {t('copy')}</button><button className="primary" onClick={()=>{notification.success(t('invoked',{name:method.name}));window.setTimeout(()=>notification.info(t('invokeHint')),350)}}>▶ {t('invoke')}</button></div></article>})}</section></main><footer>{t('footer')}</footer></div>
}
