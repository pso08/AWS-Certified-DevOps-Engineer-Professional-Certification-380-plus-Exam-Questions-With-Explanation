(()=>{var e={};e.id=762,e.ids=[762],e.modules={72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},6938:(e,t,s)=>{"use strict";s.r(t),s.d(t,{GlobalError:()=>i.a,__next_app__:()=>m,originalPathname:()=>u,pages:()=>c,routeModule:()=>h,tree:()=>o}),s(50312),s(18601),s(35866);var r=s(23191),a=s(88716),l=s(37922),i=s.n(l),n=s(95231),d={};for(let e in n)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(d[e]=()=>n[e]);s.d(t,d);let o=["",{children:["test",{children:["dashboard",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,50312)),"/home/ubuntu/workspace/app/cloudflare-production-all-questions/app/test/dashboard/page.tsx"]}]},{}]},{}]},{layout:[()=>Promise.resolve().then(s.bind(s,18601)),"/home/ubuntu/workspace/app/cloudflare-production-all-questions/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(s.t.bind(s,35866,23)),"next/dist/client/components/not-found-error"]}],c=["/home/ubuntu/workspace/app/cloudflare-production-all-questions/app/test/dashboard/page.tsx"],u="/test/dashboard/page",m={require:s,loadChunk:()=>Promise.resolve()},h=new r.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/test/dashboard/page",pathname:"/test/dashboard",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:o}})},43719:(e,t,s)=>{Promise.resolve().then(s.bind(s,31062))},33584:(e,t,s)=>{Promise.resolve().then(s.bind(s,52723))},669:(e,t,s)=>{Promise.resolve().then(s.t.bind(s,12994,23)),Promise.resolve().then(s.t.bind(s,96114,23)),Promise.resolve().then(s.t.bind(s,9727,23)),Promise.resolve().then(s.t.bind(s,79671,23)),Promise.resolve().then(s.t.bind(s,41868,23)),Promise.resolve().then(s.t.bind(s,84759,23))},52723:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>m});var r=s(10326),a=s(17577),l=s(90434),i=s(91664),n=s(29752),d=s(33269),o=s(997),c=s(48998),u=s(24230);function m(){let[e,t]=(0,a.useState)([]);return r.jsx("div",{className:"min-h-screen bg-slate-900 text-white flex items-center justify-center p-4",children:(0,r.jsxs)("div",{className:"w-full max-w-4xl mx-auto",children:[(0,r.jsxs)("div",{className:"flex justify-between items-center mb-8",children:[r.jsx("h1",{className:"text-3xl font-bold",children:"Test Dashboard"}),r.jsx(l.default,{href:"/",children:r.jsx(i.z,{variant:"outline",className:"border-slate-600 text-white hover:bg-slate-700",children:"Back to Home"})})]}),(0,r.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6 mb-8",children:[(0,r.jsxs)(n.Zb,{className:"bg-slate-800 border-slate-700 text-white",children:[r.jsx(n.Ol,{className:"pb-2",children:r.jsx(n.ll,{className:"text-lg",children:"Tests Taken"})}),r.jsx(n.aY,{children:r.jsx("div",{className:"text-4xl font-bold",children:e.length})})]}),(0,r.jsxs)(n.Zb,{className:"bg-slate-800 border-slate-700 text-white",children:[r.jsx(n.Ol,{className:"pb-2",children:r.jsx(n.ll,{className:"text-lg",children:"Average Score"})}),r.jsx(n.aY,{children:(0,r.jsxs)("div",{className:"text-4xl font-bold",children:[e.length>0?Math.round(e.reduce((e,t)=>e+t.score,0)/e.length):0,"%"]})})]}),(0,r.jsxs)(n.Zb,{className:"bg-slate-800 border-slate-700 text-white",children:[r.jsx(n.Ol,{className:"pb-2",children:r.jsx(n.ll,{className:"text-lg",children:"Last Test"})}),r.jsx(n.aY,{children:r.jsx("div",{className:"text-4xl font-bold",children:e.length>0?e[0].score+"%":"N/A"})})]})]}),(0,r.jsxs)(n.Zb,{className:"bg-slate-800 border-slate-700 text-white mb-8",children:[(0,r.jsxs)(n.Ol,{children:[r.jsx(n.ll,{children:"Test History"}),r.jsx(n.SZ,{className:"text-slate-300",children:"Your recent test attempts and performance"})]}),r.jsx(n.aY,{children:e.length>0?r.jsx("div",{className:"space-y-6",children:e.map(e=>(0,r.jsxs)("div",{className:"p-4 bg-slate-700/30 rounded-lg border border-slate-600",children:[(0,r.jsxs)("div",{className:"flex justify-between items-center mb-2",children:[r.jsx("div",{className:"font-medium",children:e.date}),(0,r.jsxs)("div",{className:`font-bold ${e.score>=72?"text-green-500":"text-red-500"}`,children:[e.score,"%"]})]}),r.jsx(d.E,{value:e.score,className:"h-2 mb-4"}),(0,r.jsxs)("div",{className:"grid grid-cols-2 gap-4 text-sm text-slate-300",children:[(0,r.jsxs)("div",{className:"flex items-center",children:[r.jsx(o.Z,{className:"h-4 w-4 mr-2 text-blue-500"}),e.correctAnswers," of ",e.totalQuestions," correct"]}),(0,r.jsxs)("div",{className:"flex items-center",children:[r.jsx(c.Z,{className:"h-4 w-4 mr-2 text-blue-500"}),Math.floor(e.timeTaken/60)," minutes"]})]})]},e.id))}):(0,r.jsxs)("div",{className:"text-center py-8 text-slate-400",children:[r.jsx("p",{children:"You haven't taken any tests yet."}),r.jsx("p",{className:"mt-2",children:"Complete a test to see your performance history."})]})}),r.jsx(n.eW,{children:r.jsx(l.default,{href:"/test",className:"w-full",children:(0,r.jsxs)(i.z,{className:"w-full bg-blue-600 hover:bg-blue-700",children:["Take a New Test",r.jsx(u.Z,{className:"ml-2 h-4 w-4"})]})})})]}),r.jsx("div",{className:"flex justify-center",children:r.jsx(l.default,{href:"/",children:r.jsx(i.z,{variant:"outline",className:"border-slate-600 text-white hover:bg-slate-700",children:"Back to Home"})})})]})})}},76557:(e,t,s)=>{"use strict";s.d(t,{Z:()=>i});var r=s(17577),a={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let l=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),i=(e,t)=>{let s=(0,r.forwardRef)(({color:s="currentColor",size:i=24,strokeWidth:n=2,absoluteStrokeWidth:d,className:o="",children:c,...u},m)=>(0,r.createElement)("svg",{ref:m,...a,width:i,height:i,stroke:s,strokeWidth:d?24*Number(n)/Number(i):n,className:["lucide",`lucide-${l(e)}`,o].join(" "),...u},[...t.map(([e,t])=>(0,r.createElement)(e,t)),...Array.isArray(c)?c:[c]]));return s.displayName=`${e}`,s}},24230:(e,t,s)=>{"use strict";s.d(t,{Z:()=>r});let r=(0,s(76557).Z)("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]])},997:(e,t,s)=>{"use strict";s.d(t,{Z:()=>r});let r=(0,s(76557).Z)("Award",[["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}],["path",{d:"M15.477 12.89 17 22l-5-3-5 3 1.523-9.11",key:"em7aur"}]])},48998:(e,t,s)=>{"use strict";s.d(t,{Z:()=>r});let r=(0,s(76557).Z)("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]])},31062:(e,t,s)=>{"use strict";s.d(t,{ThemeProvider:()=>l});var r=s(10326),a=s(3574);function l({children:e,...t}){return r.jsx(a.f,{...t,children:e})}},91664:(e,t,s)=>{"use strict";s.d(t,{z:()=>d});var r=s(10326),a=s(17577),l=s(79360),i=s(51223);let n=(0,l.j)("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",{variants:{variant:{default:"bg-primary text-primary-foreground shadow hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",outline:"border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-9 px-4 py-2",sm:"h-8 rounded-md px-3 text-xs",lg:"h-10 rounded-md px-8",icon:"h-9 w-9"}},defaultVariants:{variant:"default",size:"default"}}),d=a.forwardRef(({className:e,variant:t,size:s,asChild:l=!1,...d},o)=>{let c=l?a.Fragment:"button";return r.jsx(c,{className:(0,i.cn)(n({variant:t,size:s,className:e})),ref:o,...d})});d.displayName="Button"},29752:(e,t,s)=>{"use strict";s.d(t,{Ol:()=>n,SZ:()=>o,Zb:()=>i,aY:()=>c,eW:()=>u,ll:()=>d});var r=s(10326),a=s(17577),l=s(51223);let i=a.forwardRef(({className:e,...t},s)=>r.jsx("div",{ref:s,className:(0,l.cn)("rounded-lg border bg-card text-card-foreground shadow-sm",e),...t}));i.displayName="Card";let n=a.forwardRef(({className:e,...t},s)=>r.jsx("div",{ref:s,className:(0,l.cn)("flex flex-col space-y-1.5 p-6",e),...t}));n.displayName="CardHeader";let d=a.forwardRef(({className:e,...t},s)=>r.jsx("h3",{ref:s,className:(0,l.cn)("text-2xl font-semibold leading-none tracking-tight",e),...t}));d.displayName="CardTitle";let o=a.forwardRef(({className:e,...t},s)=>r.jsx("p",{ref:s,className:(0,l.cn)("text-sm text-muted-foreground",e),...t}));o.displayName="CardDescription";let c=a.forwardRef(({className:e,...t},s)=>r.jsx("div",{ref:s,className:(0,l.cn)("p-6 pt-0",e),...t}));c.displayName="CardContent";let u=a.forwardRef(({className:e,...t},s)=>r.jsx("div",{ref:s,className:(0,l.cn)("flex items-center p-6 pt-0",e),...t}));u.displayName="CardFooter"},33269:(e,t,s)=>{"use strict";s.d(t,{E:()=>i});var r=s(10326),a=s(17577),l=s(51223);let i=a.forwardRef(({className:e,value:t=0,max:s=100,...a},i)=>r.jsx("div",{ref:i,className:(0,l.cn)("relative h-2 w-full overflow-hidden rounded-full bg-secondary",e),...a,children:r.jsx("div",{className:"h-full w-full flex-1 bg-primary transition-all",style:{transform:`translateX(-${100-t/s*100}%)`}})}));i.displayName="Progress"},51223:(e,t,s)=>{"use strict";s.d(t,{cn:()=>l});var r=s(41135),a=s(31009);function l(...e){return(0,a.m6)((0,r.W)(e))}},18601:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>i,metadata:()=>l});var r=s(19510);s(67272);let a=(0,s(68570).createProxy)(String.raw`/home/ubuntu/workspace/app/cloudflare-production-all-questions/src/components/theme-provider.tsx#ThemeProvider`),l={title:"AWS DevOps Quiz App",description:"Prepare for your AWS Certified DevOps Engineer Professional exam with 350+ practice questions",keywords:"AWS, DevOps, certification, exam, practice, quiz"};function i({children:e}){return(0,r.jsxs)("html",{lang:"en",suppressHydrationWarning:!0,children:[(0,r.jsxs)("head",{children:[r.jsx("link",{rel:"icon",href:"/favicon.ico"}),r.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"})]}),r.jsx("body",{className:"min-h-screen bg-slate-900 text-white",children:r.jsx(a,{attribute:"class",defaultTheme:"dark",enableSystem:!0,disableTransitionOnChange:!0,children:r.jsx("main",{children:e})})})]})}},50312:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>r});let r=(0,s(68570).createProxy)(String.raw`/home/ubuntu/workspace/app/cloudflare-production-all-questions/app/test/dashboard/page.tsx#default`)},67272:()=>{}};var t=require("../../../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),r=t.X(0,[276,857,582,434],()=>s(6938));module.exports=r})();