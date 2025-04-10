(()=>{var e={};e.id=327,e.ids=[327],e.modules={2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},1643:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>l.a,__next_app__:()=>m,originalPathname:()=>u,pages:()=>c,routeModule:()=>p,tree:()=>d}),r(3871),r(8601),r(5866);var s=r(3191),a=r(8716),n=r(7922),l=r.n(n),i=r(5231),o={};for(let e in i)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(o[e]=()=>i[e]);r.d(t,o);let d=["",{children:["contact",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,3871)),"/home/ubuntu/fixed-app/package/app/contact/page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,8601)),"/home/ubuntu/fixed-app/package/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,5866,23)),"next/dist/client/components/not-found-error"]}],c=["/home/ubuntu/fixed-app/package/app/contact/page.tsx"],u="/contact/page",m={require:r,loadChunk:()=>Promise.resolve()},p=new s.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/contact/page",pathname:"/contact",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},2799:(e,t,r)=>{Promise.resolve().then(r.bind(r,1013))},2967:(e,t,r)=>{Promise.resolve().then(r.bind(r,1062))},5809:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,2994,23)),Promise.resolve().then(r.t.bind(r,6114,23)),Promise.resolve().then(r.t.bind(r,9727,23)),Promise.resolve().then(r.t.bind(r,9671,23)),Promise.resolve().then(r.t.bind(r,1868,23)),Promise.resolve().then(r.t.bind(r,4759,23))},1013:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>v});var s=r(326),a=r(7577),n=r(434),l=r(1664),i=r(9752),o=r(1190),d=r(4794),c=r(2015),u=r(9635),m=r(5932),p=r(6557);let x=(0,p.Z)("Phone",[["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",key:"foiqr5"}]]),h=(0,p.Z)("Send",[["path",{d:"m22 2-7 20-4-9-9-4Z",key:"1q3vgg"}],["path",{d:"M22 2 11 13",key:"nzbqef"}]]);var f=r(4659);function v(){let[e,t]=(0,a.useState)(""),[r,p]=(0,a.useState)(""),[v,g]=(0,a.useState)(""),[b,y]=(0,a.useState)(""),[j,w]=(0,a.useState)(!1),[N,k]=(0,a.useState)(!1);return s.jsx("div",{className:"min-h-screen bg-slate-900 text-white flex items-center justify-center p-4",children:(0,s.jsxs)("div",{className:"w-full max-w-3xl mx-auto",children:[(0,s.jsxs)("div",{className:"flex justify-between items-center mb-8",children:[s.jsx("h1",{className:"text-3xl font-bold",children:"Contact Me"}),s.jsx(n.default,{href:"/",children:s.jsx(l.z,{variant:"outline",className:"border-slate-600 text-white hover:bg-slate-700",children:"Back to Home"})})]}),(0,s.jsxs)(i.Zb,{className:"bg-slate-800 border-slate-700 text-white",children:[(0,s.jsxs)(i.Ol,{children:[s.jsx(i.ll,{children:"Get in Touch"}),s.jsx(i.SZ,{className:"text-slate-300",children:"Fill out the form below to send me a message. I'll get back to you as soon as possible."})]}),N?s.jsx(i.aY,{className:"py-10",children:(0,s.jsxs)("div",{className:"flex flex-col items-center justify-center text-center space-y-4",children:[s.jsx("div",{className:"bg-green-500/20 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-2",children:s.jsx(f.Z,{className:"h-8 w-8 text-green-500"})}),s.jsx("h3",{className:"text-xl font-semibold",children:"Message Sent!"}),s.jsx("p",{className:"text-slate-300 max-w-md",children:"Thank you for reaching out. I've received your message and will get back to you as soon as possible."}),s.jsx(l.z,{onClick:()=>k(!1),className:"mt-4 bg-blue-600 hover:bg-blue-700",children:"Send Another Message"})]})}):s.jsx(i.aY,{children:(0,s.jsxs)("form",{onSubmit:e=>{e.preventDefault(),w(!0),setTimeout(()=>{w(!1),k(!0),t(""),p(""),g(""),y("")},1500)},className:"space-y-6",children:[(0,s.jsxs)("div",{className:"space-y-2",children:[(0,s.jsxs)(d._,{htmlFor:"name",className:"text-white",children:["Name ",s.jsx("span",{className:"text-red-500",children:"*"})]}),(0,s.jsxs)("div",{className:"relative",children:[s.jsx("div",{className:"absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none",children:s.jsx(u.Z,{className:"h-4 w-4 text-slate-400"})}),s.jsx(o.I,{id:"name",placeholder:"Your full name",required:!0,value:e,onChange:e=>t(e.target.value),className:"bg-slate-700 border-slate-600 text-white pl-10"})]})]}),(0,s.jsxs)("div",{className:"space-y-2",children:[(0,s.jsxs)(d._,{htmlFor:"email",className:"text-white",children:["Email ",s.jsx("span",{className:"text-red-500",children:"*"})]}),(0,s.jsxs)("div",{className:"relative",children:[s.jsx("div",{className:"absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none",children:s.jsx(m.Z,{className:"h-4 w-4 text-slate-400"})}),s.jsx(o.I,{id:"email",type:"email",placeholder:"your@email.com",required:!0,value:r,onChange:e=>p(e.target.value),className:"bg-slate-700 border-slate-600 text-white pl-10"})]})]}),(0,s.jsxs)("div",{className:"space-y-2",children:[(0,s.jsxs)(d._,{htmlFor:"phone",className:"text-white",children:["Phone Number ",s.jsx("span",{className:"text-slate-400 text-sm",children:"(Optional)"})]}),(0,s.jsxs)("div",{className:"relative",children:[s.jsx("div",{className:"absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none",children:s.jsx(x,{className:"h-4 w-4 text-slate-400"})}),s.jsx(o.I,{id:"phone",type:"tel",placeholder:"+1 (123) 456-7890",value:v,onChange:e=>g(e.target.value),className:"bg-slate-700 border-slate-600 text-white pl-10"})]})]}),(0,s.jsxs)("div",{className:"space-y-2",children:[(0,s.jsxs)(d._,{htmlFor:"note",className:"text-white",children:["Note ",s.jsx("span",{className:"text-red-500",children:"*"})]}),s.jsx(c.g,{id:"note",placeholder:"Your message or inquiry...",required:!0,value:b,onChange:e=>y(e.target.value),className:"bg-slate-700 border-slate-600 text-white min-h-[150px]"})]}),s.jsx(l.z,{type:"submit",className:"w-full bg-blue-600 hover:bg-blue-700",disabled:j,children:j?(0,s.jsxs)(s.Fragment,{children:[s.jsx("div",{className:"animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"}),"Sending..."]}):(0,s.jsxs)(s.Fragment,{children:[s.jsx(h,{className:"mr-2 h-4 w-4"}),"Send Message"]})})]})}),(0,s.jsxs)(i.eW,{className:"flex flex-col space-y-4 border-t border-slate-700 pt-6",children:[s.jsx("div",{className:"text-center text-sm text-slate-400",children:s.jsx("p",{children:"You can also reach me directly via:"})}),(0,s.jsxs)("div",{className:"flex flex-col sm:flex-row gap-3 justify-center w-full",children:[(0,s.jsxs)(l.z,{variant:"outline",className:"border-slate-600 text-white hover:bg-slate-700 w-full sm:w-auto",children:[s.jsx(m.Z,{className:"mr-2 h-4 w-4"}),"Email"]}),(0,s.jsxs)(l.z,{variant:"outline",className:"border-slate-600 text-white hover:bg-slate-700 w-full sm:w-auto",children:[s.jsx(x,{className:"mr-2 h-4 w-4"}),"Phone"]})]})]})]})]})})}},6557:(e,t,r)=>{"use strict";r.d(t,{Z:()=>l});var s=r(7577),a={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let n=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),l=(e,t)=>{let r=(0,s.forwardRef)(({color:r="currentColor",size:l=24,strokeWidth:i=2,absoluteStrokeWidth:o,className:d="",children:c,...u},m)=>(0,s.createElement)("svg",{ref:m,...a,width:l,height:l,stroke:r,strokeWidth:o?24*Number(i)/Number(l):i,className:["lucide",`lucide-${n(e)}`,d].join(" "),...u},[...t.map(([e,t])=>(0,s.createElement)(e,t)),...Array.isArray(c)?c:[c]]));return r.displayName=`${e}`,r}},4659:(e,t,r)=>{"use strict";r.d(t,{Z:()=>s});let s=(0,r(6557).Z)("CheckCircle",[["path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14",key:"g774vq"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]])},5932:(e,t,r)=>{"use strict";r.d(t,{Z:()=>s});let s=(0,r(6557).Z)("Mail",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]])},9635:(e,t,r)=>{"use strict";r.d(t,{Z:()=>s});let s=(0,r(6557).Z)("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]])},1062:(e,t,r)=>{"use strict";r.d(t,{ThemeProvider:()=>n});var s=r(326),a=r(3574);function n({children:e,...t}){return s.jsx(a.f,{...t,children:e})}},1664:(e,t,r)=>{"use strict";r.d(t,{z:()=>o});var s=r(326),a=r(7577),n=r(9360),l=r(1223);let i=(0,n.j)("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",{variants:{variant:{default:"bg-primary text-primary-foreground shadow hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",outline:"border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-9 px-4 py-2",sm:"h-8 rounded-md px-3 text-xs",lg:"h-10 rounded-md px-8",icon:"h-9 w-9"}},defaultVariants:{variant:"default",size:"default"}}),o=a.forwardRef(({className:e,variant:t,size:r,asChild:n=!1,...o},d)=>{let c=n?a.Fragment:"button";return s.jsx(c,{className:(0,l.cn)(i({variant:t,size:r,className:e})),ref:d,...o})});o.displayName="Button"},9752:(e,t,r)=>{"use strict";r.d(t,{Ol:()=>i,SZ:()=>d,Zb:()=>l,aY:()=>c,eW:()=>u,ll:()=>o});var s=r(326),a=r(7577),n=r(1223);let l=a.forwardRef(({className:e,...t},r)=>s.jsx("div",{ref:r,className:(0,n.cn)("rounded-lg border bg-card text-card-foreground shadow-sm",e),...t}));l.displayName="Card";let i=a.forwardRef(({className:e,...t},r)=>s.jsx("div",{ref:r,className:(0,n.cn)("flex flex-col space-y-1.5 p-6",e),...t}));i.displayName="CardHeader";let o=a.forwardRef(({className:e,...t},r)=>s.jsx("h3",{ref:r,className:(0,n.cn)("text-2xl font-semibold leading-none tracking-tight",e),...t}));o.displayName="CardTitle";let d=a.forwardRef(({className:e,...t},r)=>s.jsx("p",{ref:r,className:(0,n.cn)("text-sm text-muted-foreground",e),...t}));d.displayName="CardDescription";let c=a.forwardRef(({className:e,...t},r)=>s.jsx("div",{ref:r,className:(0,n.cn)("p-6 pt-0",e),...t}));c.displayName="CardContent";let u=a.forwardRef(({className:e,...t},r)=>s.jsx("div",{ref:r,className:(0,n.cn)("flex items-center p-6 pt-0",e),...t}));u.displayName="CardFooter"},1190:(e,t,r)=>{"use strict";r.d(t,{I:()=>l});var s=r(326),a=r(7577),n=r(1223);let l=a.forwardRef(({className:e,type:t,...r},a)=>s.jsx("input",{type:t,className:(0,n.cn)("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",e),ref:a,...r}));l.displayName="Input"},4794:(e,t,r)=>{"use strict";r.d(t,{_:()=>i});var s=r(326),a=r(7577),n=r(4478),l=r(1223);let i=a.forwardRef(({className:e,...t},r)=>s.jsx(n.f,{ref:r,className:(0,l.cn)("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",e),...t}));i.displayName=n.f.displayName},2015:(e,t,r)=>{"use strict";r.d(t,{g:()=>l});var s=r(326),a=r(7577),n=r(1223);let l=a.forwardRef(({className:e,...t},r)=>s.jsx("textarea",{className:(0,n.cn)("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",e),ref:r,...t}));l.displayName="Textarea"},1223:(e,t,r)=>{"use strict";r.d(t,{cn:()=>n});var s=r(1135),a=r(1009);function n(...e){return(0,a.m6)((0,s.W)(e))}},3871:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>s});let s=(0,r(8570).createProxy)(String.raw`/home/ubuntu/fixed-app/package/app/contact/page.tsx#default`)},8601:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>l,metadata:()=>n});var s=r(9510);r(7272);let a=(0,r(8570).createProxy)(String.raw`/home/ubuntu/fixed-app/package/src/components/theme-provider.tsx#ThemeProvider`),n={title:"AWS DevOps Quiz App",description:"Prepare for your AWS Certified DevOps Engineer Professional exam with 350+ practice questions",keywords:"AWS, DevOps, certification, exam, practice, quiz"};function l({children:e}){return(0,s.jsxs)("html",{lang:"en",suppressHydrationWarning:!0,children:[(0,s.jsxs)("head",{children:[s.jsx("link",{rel:"icon",href:"/favicon.ico"}),s.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"})]}),s.jsx("body",{className:"min-h-screen bg-slate-900 text-white",children:s.jsx(a,{attribute:"class",defaultTheme:"dark",enableSystem:!0,disableTransitionOnChange:!0,children:s.jsx("main",{children:e})})})]})}},7272:()=>{},8051:(e,t,r)=>{"use strict";r.d(t,{F:()=>n,e:()=>l});var s=r(7577);function a(e,t){if("function"==typeof e)return e(t);null!=e&&(e.current=t)}function n(...e){return t=>{let r=!1,s=e.map(e=>{let s=a(e,t);return r||"function"!=typeof s||(r=!0),s});if(r)return()=>{for(let t=0;t<s.length;t++){let r=s[t];"function"==typeof r?r():a(e[t],null)}}}}function l(...e){return s.useCallback(n(...e),e)}},4478:(e,t,r)=>{"use strict";r.d(t,{f:()=>i});var s=r(7577),a=r(5226),n=r(326),l=s.forwardRef((e,t)=>(0,n.jsx)(a.WV.label,{...e,ref:t,onMouseDown:t=>{t.target.closest("button, input, select, textarea")||(e.onMouseDown?.(t),!t.defaultPrevented&&t.detail>1&&t.preventDefault())}}));l.displayName="Label";var i=l},5226:(e,t,r)=>{"use strict";r.d(t,{WV:()=>i,jH:()=>o});var s=r(7577),a=r(962),n=r(4214),l=r(326),i=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","span","svg","ul"].reduce((e,t)=>{let r=(0,n.Z8)(`Primitive.${t}`),a=s.forwardRef((e,s)=>{let{asChild:a,...n}=e,i=a?r:t;return"undefined"!=typeof window&&(window[Symbol.for("radix-ui")]=!0),(0,l.jsx)(i,{...n,ref:s})});return a.displayName=`Primitive.${t}`,{...e,[t]:a}},{});function o(e,t){e&&a.flushSync(()=>e.dispatchEvent(t))}},4214:(e,t,r)=>{"use strict";r.d(t,{Z8:()=>l});var s=r(7577),a=r(8051),n=r(326);function l(e){let t=function(e){let t=s.forwardRef((e,t)=>{let{children:r,...n}=e;if(s.isValidElement(r)){let e,l;let i=(e=Object.getOwnPropertyDescriptor(r.props,"ref")?.get)&&"isReactWarning"in e&&e.isReactWarning?r.ref:(e=Object.getOwnPropertyDescriptor(r,"ref")?.get)&&"isReactWarning"in e&&e.isReactWarning?r.props.ref:r.props.ref||r.ref,o=function(e,t){let r={...t};for(let s in t){let a=e[s],n=t[s];/^on[A-Z]/.test(s)?a&&n?r[s]=(...e)=>{n(...e),a(...e)}:a&&(r[s]=a):"style"===s?r[s]={...a,...n}:"className"===s&&(r[s]=[a,n].filter(Boolean).join(" "))}return{...e,...r}}(n,r.props);return r.type!==s.Fragment&&(o.ref=t?(0,a.F)(t,i):i),s.cloneElement(r,o)}return s.Children.count(r)>1?s.Children.only(null):null});return t.displayName=`${e}.SlotClone`,t}(e),r=s.forwardRef((e,r)=>{let{children:a,...l}=e,i=s.Children.toArray(a),d=i.find(o);if(d){let e=d.props.children,a=i.map(t=>t!==d?t:s.Children.count(e)>1?s.Children.only(null):s.isValidElement(e)?e.props.children:null);return(0,n.jsx)(t,{...l,ref:r,children:s.isValidElement(e)?s.cloneElement(e,void 0,a):null})}return(0,n.jsx)(t,{...l,ref:r,children:a})});return r.displayName=`${e}.Slot`,r}var i=Symbol("radix.slottable");function o(e){return s.isValidElement(e)&&"function"==typeof e.type&&"__radixId"in e.type&&e.type.__radixId===i}}};var t=require("../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[276,857,582,434],()=>r(1643));module.exports=s})();