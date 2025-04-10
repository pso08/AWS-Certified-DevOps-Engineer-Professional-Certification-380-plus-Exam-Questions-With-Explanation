(()=>{var e={};e.id=643,e.ids=[643],e.modules={2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},3651:(e,s,t)=>{"use strict";t.r(s),t.d(s,{GlobalError:()=>i.a,__next_app__:()=>x,originalPathname:()=>m,pages:()=>d,routeModule:()=>p,tree:()=>c}),t(7403),t(8601),t(5866);var a=t(3191),l=t(8716),r=t(7922),i=t.n(r),n=t(5231),o={};for(let e in n)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(o[e]=()=>n[e]);t.d(s,o);let c=["",{children:["flashcards",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(t.bind(t,7403)),"/home/ubuntu/fixed-app/package/app/flashcards/page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(t.bind(t,8601)),"/home/ubuntu/fixed-app/package/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(t.t.bind(t,5866,23)),"next/dist/client/components/not-found-error"]}],d=["/home/ubuntu/fixed-app/package/app/flashcards/page.tsx"],m="/flashcards/page",x={require:t,loadChunk:()=>Promise.resolve()},p=new a.AppPageRouteModule({definition:{kind:l.x.APP_PAGE,page:"/flashcards/page",pathname:"/flashcards",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},6459:(e,s,t)=>{Promise.resolve().then(t.bind(t,3182))},3182:(e,s,t)=>{"use strict";t.r(s),t.d(s,{default:()=>c});var a=t(326),l=t(7577),r=t(9752),i=t(1664),n=t(434);let o=t(4568).X.map((e,s)=>{let t;let a=Object.keys(e.options),l=Object.values(e.options),r=(t=e.answer.includes(",")?e.answer.split(",").map(e=>e.trim()):e.answer.toLowerCase().includes(" and ")?e.answer.toLowerCase().split(" and ").map(e=>e.trim()):[e.answer.trim()]).length>1;return{id:parseInt(e.id),question:e.question,options:l,optionKeys:a,correctAnswers:t,isMultipleAnswer:r,explanation:e.explanation}});function c(){let[e,s]=(0,l.useState)(()=>0),[t,c]=(0,l.useState)(!1),[d,m]=(0,l.useState)(!1),x=()=>{c(!t)},p=o[e];return a.jsx("div",{className:"min-h-screen bg-slate-900 text-white flex items-center justify-center p-4",children:(0,a.jsxs)("div",{className:"w-full max-w-3xl mx-auto px-4 sm:px-6",children:[(0,a.jsxs)("div",{className:"flex flex-col sm:flex-row justify-between items-center mb-6 gap-2",children:[(0,a.jsxs)("div",{className:"flex items-center gap-4",children:[a.jsx("h1",{className:"text-xl sm:text-2xl font-bold",children:"AWS DevOps Flashcards"}),a.jsx(n.default,{href:"/",children:a.jsx(i.z,{variant:"outline",className:"border-slate-600 text-white hover:bg-slate-700",children:"Back to Home"})})]}),(0,a.jsxs)("div",{className:"text-sm text-slate-400",children:["Card ",e+1," of ",o.length]})]}),a.jsx("div",{className:"perspective-1000 mb-8",children:(0,a.jsxs)("div",{className:`relative w-full transition-transform duration-500 transform-style-3d ${t?"rotate-y-180":""}`,style:{minHeight:"min(400px, calc(100vh - 200px))"},children:[(0,a.jsxs)(r.Zb,{className:`absolute w-full h-full backface-hidden p-3 sm:p-6 bg-slate-800 border-slate-700 text-white ${t?"invisible":""}`,children:[a.jsx(r.Ol,{children:(0,a.jsxs)(r.ll,{className:"text-xl",children:["Question ",p.isMultipleAnswer?"(Multiple Answers)":""]})}),(0,a.jsxs)(r.aY,{className:"flex-grow overflow-y-auto",style:{maxHeight:"min(300px, calc(100vh - 300px))"},children:[a.jsx("p",{className:"text-base sm:text-lg mb-6 break-words whitespace-normal",children:p.question}),d&&(0,a.jsxs)("div",{className:"mt-4",children:[a.jsx("h3",{className:"font-semibold mb-2",children:"Options:"}),a.jsx("ul",{className:"space-y-2",children:p.optionKeys.map((e,s)=>(0,a.jsxs)("li",{className:"pl-4 border-l-2 border-slate-600 break-words",children:[(0,a.jsxs)("span",{className:"font-medium",children:[e,":"]})," ",p.options[s]]},e))})]})]}),(0,a.jsxs)(r.eW,{className:"flex flex-col sm:flex-row justify-center gap-3",children:[a.jsx(i.z,{onClick:()=>{m(!d)},variant:"outline",className:"w-full sm:w-auto border-slate-600 text-white hover:bg-slate-700 mb-2 sm:mb-0 sm:mr-4",children:d?"Hide Options":"Show Options"}),a.jsx(i.z,{onClick:x,className:"w-full sm:w-auto bg-blue-600 hover:bg-blue-700",children:"Show Answer"})]})]}),(0,a.jsxs)(r.Zb,{className:`absolute w-full h-full backface-hidden p-3 sm:p-6 bg-slate-800 border-slate-700 text-white rotate-y-180 ${t?"":"invisible"}`,children:[a.jsx(r.Ol,{children:a.jsx(r.ll,{className:"text-xl",children:"Answer"})}),(0,a.jsxs)(r.aY,{className:"flex-grow overflow-y-auto",style:{maxHeight:"min(300px, calc(100vh - 300px))"},children:[(0,a.jsxs)("div",{className:"mb-4",children:[a.jsx("h3",{className:"font-semibold mb-2",children:p.isMultipleAnswer?"Correct Answers:":"Correct Answer:"}),p.correctAnswers.map((e,s)=>(0,a.jsxs)("p",{className:"pl-4 border-l-2 border-green-500 py-1 break-words mb-2",children:[(0,a.jsxs)("span",{className:"font-medium",children:[e,":"]})," ",p.options[p.optionKeys.indexOf(e)]]},s))]}),(0,a.jsxs)("div",{className:"mt-6",children:[a.jsx("h3",{className:"font-semibold mb-2",children:"Explanation:"}),a.jsx("p",{className:"text-slate-300 break-words whitespace-normal text-sm sm:text-base",children:p.explanation})]})]}),a.jsx(r.eW,{className:"flex flex-col sm:flex-row justify-center gap-3",children:a.jsx(i.z,{onClick:x,className:"w-full sm:w-auto bg-blue-600 hover:bg-blue-700",children:"Back to Question"})})]})]})}),(0,a.jsxs)("div",{className:"flex flex-col sm:flex-row justify-between items-center mt-6 gap-3",children:[a.jsx(i.z,{variant:"outline",onClick:()=>{s(e>0?e-1:o.length-1)},className:"w-full sm:w-auto border-slate-600 text-white hover:bg-slate-700",children:"Previous Card"}),a.jsx(i.z,{variant:"destructive",onClick:()=>{s(0),c(!1),m(!1)},className:"w-full sm:w-auto",children:"Reset All Cards"}),a.jsx(i.z,{variant:"outline",onClick:()=>{s(e<o.length-1?e+1:0)},className:"w-full sm:w-auto border-slate-600 text-white hover:bg-blue-700",children:"Next Card"})]})]})})}},7403:(e,s,t)=>{"use strict";t.r(s),t.d(s,{default:()=>a});let a=(0,t(8570).createProxy)(String.raw`/home/ubuntu/fixed-app/package/app/flashcards/page.tsx#default`)}};var s=require("../../webpack-runtime.js");s.C(e);var t=e=>s(s.s=e),a=s.X(0,[276,857,582,434,498],()=>t(3651));module.exports=a})();