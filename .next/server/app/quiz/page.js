(()=>{var e={};e.id=705,e.ids=[705],e.modules={2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},43:(e,t,n)=>{"use strict";n.r(t),n.d(t,{GlobalError:()=>a.a,__next_app__:()=>m,originalPathname:()=>d,pages:()=>c,routeModule:()=>f,tree:()=>u}),n(4869),n(8601),n(5866);var r=n(3191),s=n(8716),i=n(7922),a=n.n(i),l=n(5231),o={};for(let e in l)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(o[e]=()=>l[e]);n.d(t,o);let u=["",{children:["quiz",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(n.bind(n,4869)),"/home/ubuntu/fixed-app/package/app/quiz/page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(n.bind(n,8601)),"/home/ubuntu/fixed-app/package/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(n.t.bind(n,5866,23)),"next/dist/client/components/not-found-error"]}],c=["/home/ubuntu/fixed-app/package/app/quiz/page.tsx"],d="/quiz/page",m={require:n,loadChunk:()=>Promise.resolve()},f=new r.AppPageRouteModule({definition:{kind:s.x.APP_PAGE,page:"/quiz/page",pathname:"/quiz",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:u}})},3646:(e,t,n)=>{Promise.resolve().then(n.bind(n,9102))},9102:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>m});var r=n(326),s=n(7577),i=n(1664),a=n(9752),l=n(3269),o=n(434),u=n(4568),c=n(2538);let d=u.X.map(e=>{let t;let n=Object.entries(e.options).map(([e,t])=>({id:e,text:t}));return t=e.answer.includes(",")?e.answer.split(",").map(e=>e.trim()):e.answer.includes(" and ")?e.answer.split(" and ").map(e=>e.trim()):[e.answer.trim()],{id:e.id,text:e.question,options:n,correctAnswers:t,explanation:e.explanation,isMultipleAnswer:t.length>1,domain:e.domain,difficulty:e.difficulty}});function m(){let[e,t]=(0,s.useState)(()=>0),[n,u]=(0,s.useState)([]),[m,f]=(0,s.useState)(()=>0),[p,x]=(0,s.useState)(()=>!1),h=()=>{t(0),u([]),f(0),x(!1)},g=(e+1)/d.length*100,v=n.find(t=>t.questionId===d[e].id),N=v?.selectedAnswers||[];if(p)return r.jsx("div",{className:"min-h-screen bg-slate-900 text-white flex items-center justify-center p-4",children:(0,r.jsxs)(a.Zb,{className:"w-full max-w-3xl bg-slate-800 border-slate-700 text-white",children:[(0,r.jsxs)(a.Ol,{className:"text-center",children:[r.jsx(a.ll,{className:"text-3xl",children:"Quiz Completed!"}),(0,r.jsxs)(a.SZ,{className:"text-slate-300 text-lg",children:["You scored ",m," out of ",d.length]})]}),(0,r.jsxs)(a.aY,{className:"space-y-6",children:[(0,r.jsxs)("div",{className:"text-center",children:[(0,r.jsxs)("div",{className:"text-6xl font-bold mb-4",children:[Math.round(m/d.length*100),"%"]}),r.jsx(l.E,{value:m/d.length*100,className:"h-4 bg-slate-700"})]}),(0,r.jsxs)("div",{className:"bg-slate-700/50 p-6 rounded-lg border border-slate-600",children:[r.jsx("h3",{className:"text-xl font-semibold mb-3",children:"Performance Summary"}),r.jsx("p",{className:"text-slate-300",children:m===d.length?"Excellent! You've mastered all the concepts in this quiz.":m>=.7*d.length?"Great job! You have a good understanding of AWS DevOps concepts.":m>=.5*d.length?"Good effort! Review the areas where you made mistakes to improve your knowledge.":"Keep practicing! Review the AWS DevOps concepts and try again."})]})]}),(0,r.jsxs)(a.eW,{className:"flex flex-col sm:flex-row gap-3 justify-center",children:[r.jsx(i.z,{onClick:h,className:"bg-blue-600 hover:bg-blue-700 w-full sm:w-auto",children:"Restart Quiz"}),r.jsx(o.default,{href:"/",className:"w-full sm:w-auto",children:r.jsx(i.z,{variant:"outline",className:"border-slate-600 text-white hover:bg-slate-700 w-full",children:"Back to Home"})})]})]})});let w=d[e];return r.jsx("div",{className:"min-h-screen bg-slate-900 text-white flex items-center justify-center p-4",children:(0,r.jsxs)("div",{className:"w-full max-w-3xl",children:[(0,r.jsxs)("div",{className:"flex justify-between items-center mb-4",children:[(0,r.jsxs)("div",{className:"text-sm text-slate-400",children:["Question ",e+1," of ",d.length]}),(0,r.jsxs)("div",{className:"flex items-center gap-4",children:[(0,r.jsxs)("div",{className:"text-sm text-slate-400",children:["Score: ",m,"/",d.length]}),r.jsx(o.default,{href:"/",children:r.jsx(i.z,{variant:"outline",className:"border-slate-600 text-white hover:bg-slate-700 text-xs py-1 px-2 h-auto",children:"Back to Home"})})]})]}),r.jsx(l.E,{value:g,className:"h-2 bg-slate-700 mb-6"}),r.jsx(c.Z,{question:w,onSubmit:(t,r)=>{let s=[...n],i=s.findIndex(t=>t.questionId===d[e].id);i>=0?s[i]={questionId:d[e].id,selectedAnswers:r,isCorrect:t}:s.push({questionId:d[e].id,selectedAnswers:r,isCorrect:t}),u(s),t&&(i<0||!n[i].isCorrect)&&f(m+1)},onNext:()=>{e<d.length-1?t(e+1):x(!0)},onPrevious:e>0?()=>{e>0&&t(e-1)}:void 0,initialSelectedAnswers:N,isAnswered:!!v}),r.jsx("div",{className:"mt-6 flex justify-center",children:r.jsx(i.z,{onClick:h,variant:"destructive",className:"w-full sm:w-auto",children:"Reset Quiz"})})]})})}},6557:(e,t,n)=>{"use strict";n.d(t,{Z:()=>a});var r=n(7577),s={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let i=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),a=(e,t)=>{let n=(0,r.forwardRef)(({color:n="currentColor",size:a=24,strokeWidth:l=2,absoluteStrokeWidth:o,className:u="",children:c,...d},m)=>(0,r.createElement)("svg",{ref:m,...s,width:a,height:a,stroke:n,strokeWidth:o?24*Number(l)/Number(a):l,className:["lucide",`lucide-${i(e)}`,u].join(" "),...d},[...t.map(([e,t])=>(0,r.createElement)(e,t)),...Array.isArray(c)?c:[c]]));return n.displayName=`${e}`,n}},4869:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>r});let r=(0,n(8570).createProxy)(String.raw`/home/ubuntu/fixed-app/package/app/quiz/page.tsx#default`)},2561:(e,t,n)=>{"use strict";function r(e,t,{checkForDefaultPrevented:n=!0}={}){return function(r){if(e?.(r),!1===n||!r.defaultPrevented)return t?.(r)}}n.d(t,{M:()=>r})},8051:(e,t,n)=>{"use strict";n.d(t,{F:()=>i,e:()=>a});var r=n(7577);function s(e,t){if("function"==typeof e)return e(t);null!=e&&(e.current=t)}function i(...e){return t=>{let n=!1,r=e.map(e=>{let r=s(e,t);return n||"function"!=typeof r||(n=!0),r});if(n)return()=>{for(let t=0;t<r.length;t++){let n=r[t];"function"==typeof n?n():s(e[t],null)}}}}function a(...e){return r.useCallback(i(...e),e)}},3095:(e,t,n)=>{"use strict";n.d(t,{b:()=>a,k:()=>i});var r=n(7577),s=n(326);function i(e,t){let n=r.createContext(t),i=e=>{let{children:t,...i}=e,a=r.useMemo(()=>i,Object.values(i));return(0,s.jsx)(n.Provider,{value:a,children:t})};return i.displayName=e+"Provider",[i,function(s){let i=r.useContext(n);if(i)return i;if(void 0!==t)return t;throw Error(`\`${s}\` must be used within \`${e}\``)}]}function a(e,t=[]){let n=[],i=()=>{let t=n.map(e=>r.createContext(e));return function(n){let s=n?.[e]||t;return r.useMemo(()=>({[`__scope${e}`]:{...n,[e]:s}}),[n,s])}};return i.scopeName=e,[function(t,i){let a=r.createContext(i),l=n.length;n=[...n,i];let o=t=>{let{scope:n,children:i,...o}=t,u=n?.[e]?.[l]||a,c=r.useMemo(()=>o,Object.values(o));return(0,s.jsx)(u.Provider,{value:c,children:i})};return o.displayName=t+"Provider",[o,function(n,s){let o=s?.[e]?.[l]||a,u=r.useContext(o);if(u)return u;if(void 0!==i)return i;throw Error(`\`${n}\` must be used within \`${t}\``)}]},function(...e){let t=e[0];if(1===e.length)return t;let n=()=>{let n=e.map(e=>({useScope:e(),scopeName:e.scopeName}));return function(e){let s=n.reduce((t,{useScope:n,scopeName:r})=>{let s=n(e)[`__scope${r}`];return{...t,...s}},{});return r.useMemo(()=>({[`__scope${t.scopeName}`]:s}),[s])}};return n.scopeName=t.scopeName,n}(i,...t)]}},9815:(e,t,n)=>{"use strict";n.d(t,{z:()=>a});var r=n(7577),s=n(8051),i=n(5819),a=e=>{let{present:t,children:n}=e,a=function(e){var t,n;let[s,a]=r.useState(),o=r.useRef({}),u=r.useRef(e),c=r.useRef("none"),[d,m]=(t=e?"mounted":"unmounted",n={mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}},r.useReducer((e,t)=>n[e][t]??e,t));return r.useEffect(()=>{let e=l(o.current);c.current="mounted"===d?e:"none"},[d]),(0,i.b)(()=>{let t=o.current,n=u.current;if(n!==e){let r=c.current,s=l(t);e?m("MOUNT"):"none"===s||t?.display==="none"?m("UNMOUNT"):n&&r!==s?m("ANIMATION_OUT"):m("UNMOUNT"),u.current=e}},[e,m]),(0,i.b)(()=>{if(s){let e;let t=s.ownerDocument.defaultView??window,n=n=>{let r=l(o.current).includes(n.animationName);if(n.target===s&&r&&(m("ANIMATION_END"),!u.current)){let n=s.style.animationFillMode;s.style.animationFillMode="forwards",e=t.setTimeout(()=>{"forwards"===s.style.animationFillMode&&(s.style.animationFillMode=n)})}},r=e=>{e.target===s&&(c.current=l(o.current))};return s.addEventListener("animationstart",r),s.addEventListener("animationcancel",n),s.addEventListener("animationend",n),()=>{t.clearTimeout(e),s.removeEventListener("animationstart",r),s.removeEventListener("animationcancel",n),s.removeEventListener("animationend",n)}}m("ANIMATION_END")},[s,m]),{isPresent:["mounted","unmountSuspended"].includes(d),ref:r.useCallback(e=>{e&&(o.current=getComputedStyle(e)),a(e)},[])}}(t),o="function"==typeof n?n({present:a.isPresent}):r.Children.only(n),u=(0,s.e)(a.ref,function(e){let t=Object.getOwnPropertyDescriptor(e.props,"ref")?.get,n=t&&"isReactWarning"in t&&t.isReactWarning;return n?e.ref:(n=(t=Object.getOwnPropertyDescriptor(e,"ref")?.get)&&"isReactWarning"in t&&t.isReactWarning)?e.props.ref:e.props.ref||e.ref}(o));return"function"==typeof n||a.isPresent?r.cloneElement(o,{ref:u}):null};function l(e){return e?.animationName||"none"}a.displayName="Presence"},5226:(e,t,n)=>{"use strict";n.d(t,{WV:()=>l,jH:()=>o});var r=n(7577),s=n(962),i=n(4214),a=n(326),l=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","span","svg","ul"].reduce((e,t)=>{let n=(0,i.Z8)(`Primitive.${t}`),s=r.forwardRef((e,r)=>{let{asChild:s,...i}=e,l=s?n:t;return"undefined"!=typeof window&&(window[Symbol.for("radix-ui")]=!0),(0,a.jsx)(l,{...i,ref:r})});return s.displayName=`Primitive.${t}`,{...e,[t]:s}},{});function o(e,t){e&&s.flushSync(()=>e.dispatchEvent(t))}},4214:(e,t,n)=>{"use strict";n.d(t,{Z8:()=>a});var r=n(7577),s=n(8051),i=n(326);function a(e){let t=function(e){let t=r.forwardRef((e,t)=>{let{children:n,...i}=e;if(r.isValidElement(n)){let e,a;let l=(e=Object.getOwnPropertyDescriptor(n.props,"ref")?.get)&&"isReactWarning"in e&&e.isReactWarning?n.ref:(e=Object.getOwnPropertyDescriptor(n,"ref")?.get)&&"isReactWarning"in e&&e.isReactWarning?n.props.ref:n.props.ref||n.ref,o=function(e,t){let n={...t};for(let r in t){let s=e[r],i=t[r];/^on[A-Z]/.test(r)?s&&i?n[r]=(...e)=>{i(...e),s(...e)}:s&&(n[r]=s):"style"===r?n[r]={...s,...i}:"className"===r&&(n[r]=[s,i].filter(Boolean).join(" "))}return{...e,...n}}(i,n.props);return n.type!==r.Fragment&&(o.ref=t?(0,s.F)(t,l):l),r.cloneElement(n,o)}return r.Children.count(n)>1?r.Children.only(null):null});return t.displayName=`${e}.SlotClone`,t}(e),n=r.forwardRef((e,n)=>{let{children:s,...a}=e,l=r.Children.toArray(s),u=l.find(o);if(u){let e=u.props.children,s=l.map(t=>t!==u?t:r.Children.count(e)>1?r.Children.only(null):r.isValidElement(e)?e.props.children:null);return(0,i.jsx)(t,{...a,ref:n,children:r.isValidElement(e)?r.cloneElement(e,void 0,s):null})}return(0,i.jsx)(t,{...a,ref:n,children:s})});return n.displayName=`${e}.Slot`,n}var l=Symbol("radix.slottable");function o(e){return r.isValidElement(e)&&"function"==typeof e.type&&"__radixId"in e.type&&e.type.__radixId===l}},5049:(e,t,n)=>{"use strict";n.d(t,{W:()=>s});var r=n(7577);function s(e){let t=r.useRef(e);return r.useEffect(()=>{t.current=e}),r.useMemo(()=>(...e)=>t.current?.(...e),[])}},2067:(e,t,n)=>{"use strict";n.d(t,{T:()=>i});var r=n(7577),s=n(5049);function i({prop:e,defaultProp:t,onChange:n=()=>{}}){let[i,a]=function({defaultProp:e,onChange:t}){let n=r.useState(e),[i]=n,a=r.useRef(i),l=(0,s.W)(t);return r.useEffect(()=>{a.current!==i&&(l(i),a.current=i)},[i,a,l]),n}({defaultProp:t,onChange:n}),l=void 0!==e,o=l?e:i,u=(0,s.W)(n);return[o,r.useCallback(t=>{if(l){let n="function"==typeof t?t(e):t;n!==e&&u(n)}else a(t)},[l,e,a,u])]}},5819:(e,t,n)=>{"use strict";n.d(t,{b:()=>s});var r=n(7577),s=globalThis?.document?r.useLayoutEffect:()=>{}}};var t=require("../../webpack-runtime.js");t.C(e);var n=e=>t(t.s=e),r=t.X(0,[276,857,582,434,498,54],()=>n(43));module.exports=r})();