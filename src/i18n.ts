import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
const saved = localStorage.getItem('bridge-lang') || 'zh'
i18n.use(initReactI18next).init({lng:saved,fallbackLng:'en',interpolation:{escapeValue:false},resources:{
  zh:{translation:{subtitle:'一站式查看、复制与体验 Bridge.js 方法',search:'搜索方法名或描述…',searchButton:'搜索',noResult:'没有找到匹配的方法',import:'引入',usage:'调用',copy:'复制',copied:'代码已复制',invoke:'调用',invoked:'{{name}} 模拟调用成功',invokeHint:'当前为浏览器演示环境，已完成模拟调用',copyFailed:'复制失败，请手动选择代码',methods:'{{count}} 个方法',theme:'切换主题',language:'切换语言',footer:'Bridge API · 为移动端 WebView 通信而设计'}},
  en:{translation:{subtitle:'Browse, copy and try every Bridge.js method',search:'Search methods or descriptions…',searchButton:'Search',noResult:'No matching methods found',import:'Import',usage:'Usage',copy:'Copy',copied:'Code copied',invoke:'Invoke',invoked:'{{name}} invoked successfully',invokeHint:'This is a browser demo; the native call was simulated',copyFailed:'Copy failed. Please select the code manually.',methods:'{{count}} methods',theme:'Toggle theme',language:'Switch language',footer:'Bridge API · Built for mobile WebView communication'}}
}})
export default i18n
