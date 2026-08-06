import { createRoot,Root } from 'react-dom/client'
export type NotificationType='success'|'error'|'warning'|'info'
type Item={id:number;type:NotificationType;message:string}
let items:Item[]=[];let root:Root|undefined;let id=0
function render(){const host=document.getElementById('notification-root');if(!host)return;root||=createRoot(host);root.render(<div className="notifications" aria-live="polite">{items.map(item=><div key={item.id} className={`notification ${item.type}`} role="status"><span className="status-dot"/>{item.message}</div>)}</div>)}
function show(type:NotificationType,message:string,duration=2600){const item={id:++id,type,message};items=[...items,item];render();window.setTimeout(()=>{items=items.filter(x=>x.id!==item.id);render()},duration)}
export const notification={success:(m:string)=>show('success',m),error:(m:string)=>show('error',m),warning:(m:string)=>show('warning',m),info:(m:string)=>show('info',m)}
