(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[762],{661:function(e,t,r){Promise.resolve().then(r.bind(r,8910))},8910:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return m}});var s=r(7437),a=r(2265),n=r(7648),l=r(2381),c=r(9820),i=r(7204),o=r(3327),d=r(1723),u=r(6858);function m(){let[e,t]=(0,a.useState)([]);return(0,a.useEffect)(()=>{{let e=localStorage.getItem("test_results");if(e)try{let r=JSON.parse(e);t([{id:1,date:new Date().toLocaleDateString(),score:Math.round(r.correctAnswers/r.totalQuestions*100),correctAnswers:r.correctAnswers,totalQuestions:r.totalQuestions,timeTaken:r.timeTaken}])}catch(e){console.error("Failed to parse test results:",e)}}},[]),(0,s.jsx)("div",{className:"min-h-screen bg-slate-900 text-white flex items-center justify-center p-4",children:(0,s.jsxs)("div",{className:"w-full max-w-4xl mx-auto",children:[(0,s.jsxs)("div",{className:"flex justify-between items-center mb-8",children:[(0,s.jsx)("h1",{className:"text-3xl font-bold",children:"Test Dashboard"}),(0,s.jsx)(n.default,{href:"/",children:(0,s.jsx)(l.z,{variant:"outline",className:"border-slate-600 text-white hover:bg-slate-700",children:"Back to Home"})})]}),(0,s.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6 mb-8",children:[(0,s.jsxs)(c.Zb,{className:"bg-slate-800 border-slate-700 text-white",children:[(0,s.jsx)(c.Ol,{className:"pb-2",children:(0,s.jsx)(c.ll,{className:"text-lg",children:"Tests Taken"})}),(0,s.jsx)(c.aY,{children:(0,s.jsx)("div",{className:"text-4xl font-bold",children:e.length})})]}),(0,s.jsxs)(c.Zb,{className:"bg-slate-800 border-slate-700 text-white",children:[(0,s.jsx)(c.Ol,{className:"pb-2",children:(0,s.jsx)(c.ll,{className:"text-lg",children:"Average Score"})}),(0,s.jsx)(c.aY,{children:(0,s.jsxs)("div",{className:"text-4xl font-bold",children:[e.length>0?Math.round(e.reduce((e,t)=>e+t.score,0)/e.length):0,"%"]})})]}),(0,s.jsxs)(c.Zb,{className:"bg-slate-800 border-slate-700 text-white",children:[(0,s.jsx)(c.Ol,{className:"pb-2",children:(0,s.jsx)(c.ll,{className:"text-lg",children:"Last Test"})}),(0,s.jsx)(c.aY,{children:(0,s.jsx)("div",{className:"text-4xl font-bold",children:e.length>0?e[0].score+"%":"N/A"})})]})]}),(0,s.jsxs)(c.Zb,{className:"bg-slate-800 border-slate-700 text-white mb-8",children:[(0,s.jsxs)(c.Ol,{children:[(0,s.jsx)(c.ll,{children:"Test History"}),(0,s.jsx)(c.SZ,{className:"text-slate-300",children:"Your recent test attempts and performance"})]}),(0,s.jsx)(c.aY,{children:e.length>0?(0,s.jsx)("div",{className:"space-y-6",children:e.map(e=>(0,s.jsxs)("div",{className:"p-4 bg-slate-700/30 rounded-lg border border-slate-600",children:[(0,s.jsxs)("div",{className:"flex justify-between items-center mb-2",children:[(0,s.jsx)("div",{className:"font-medium",children:e.date}),(0,s.jsxs)("div",{className:"font-bold ".concat(e.score>=72?"text-green-500":"text-red-500"),children:[e.score,"%"]})]}),(0,s.jsx)(i.E,{value:e.score,className:"h-2 mb-4"}),(0,s.jsxs)("div",{className:"grid grid-cols-2 gap-4 text-sm text-slate-300",children:[(0,s.jsxs)("div",{className:"flex items-center",children:[(0,s.jsx)(o.Z,{className:"h-4 w-4 mr-2 text-blue-500"}),e.correctAnswers," of ",e.totalQuestions," correct"]}),(0,s.jsxs)("div",{className:"flex items-center",children:[(0,s.jsx)(d.Z,{className:"h-4 w-4 mr-2 text-blue-500"}),Math.floor(e.timeTaken/60)," minutes"]})]})]},e.id))}):(0,s.jsxs)("div",{className:"text-center py-8 text-slate-400",children:[(0,s.jsx)("p",{children:"You haven't taken any tests yet."}),(0,s.jsx)("p",{className:"mt-2",children:"Complete a test to see your performance history."})]})}),(0,s.jsx)(c.eW,{children:(0,s.jsx)(n.default,{href:"/test",className:"w-full",children:(0,s.jsxs)(l.z,{className:"w-full bg-blue-600 hover:bg-blue-700",children:["Take a New Test",(0,s.jsx)(u.Z,{className:"ml-2 h-4 w-4"})]})})})]}),(0,s.jsx)("div",{className:"flex justify-center",children:(0,s.jsx)(n.default,{href:"/",children:(0,s.jsx)(l.z,{variant:"outline",className:"border-slate-600 text-white hover:bg-slate-700",children:"Back to Home"})})})]})})}},9763:function(e,t,r){"use strict";r.d(t,{Z:function(){return l}});var s=r(2265),a={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let n=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),l=(e,t)=>{let r=(0,s.forwardRef)((r,l)=>{let{color:c="currentColor",size:i=24,strokeWidth:o=2,absoluteStrokeWidth:d,className:u="",children:m,...f}=r;return(0,s.createElement)("svg",{ref:l,...a,width:i,height:i,stroke:c,strokeWidth:d?24*Number(o)/Number(i):o,className:["lucide","lucide-".concat(n(e)),u].join(" "),...f},[...t.map(e=>{let[t,r]=e;return(0,s.createElement)(t,r)}),...Array.isArray(m)?m:[m]])});return r.displayName="".concat(e),r}},6858:function(e,t,r){"use strict";r.d(t,{Z:function(){return s}});let s=(0,r(9763).Z)("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]])},3327:function(e,t,r){"use strict";r.d(t,{Z:function(){return s}});let s=(0,r(9763).Z)("Award",[["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}],["path",{d:"M15.477 12.89 17 22l-5-3-5 3 1.523-9.11",key:"em7aur"}]])},1723:function(e,t,r){"use strict";r.d(t,{Z:function(){return s}});let s=(0,r(9763).Z)("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]])},2381:function(e,t,r){"use strict";r.d(t,{z:function(){return i}});var s=r(7437),a=r(2265),n=r(535),l=r(3448);let c=(0,n.j)("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",{variants:{variant:{default:"bg-primary text-primary-foreground shadow hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",outline:"border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-9 px-4 py-2",sm:"h-8 rounded-md px-3 text-xs",lg:"h-10 rounded-md px-8",icon:"h-9 w-9"}},defaultVariants:{variant:"default",size:"default"}}),i=a.forwardRef((e,t)=>{let{className:r,variant:n,size:i,asChild:o=!1,...d}=e,u=o?a.Fragment:"button";return(0,s.jsx)(u,{className:(0,l.cn)(c({variant:n,size:i,className:r})),ref:t,...d})});i.displayName="Button"},9820:function(e,t,r){"use strict";r.d(t,{Ol:function(){return c},SZ:function(){return o},Zb:function(){return l},aY:function(){return d},eW:function(){return u},ll:function(){return i}});var s=r(7437),a=r(2265),n=r(3448);let l=a.forwardRef((e,t)=>{let{className:r,...a}=e;return(0,s.jsx)("div",{ref:t,className:(0,n.cn)("rounded-lg border bg-card text-card-foreground shadow-sm",r),...a})});l.displayName="Card";let c=a.forwardRef((e,t)=>{let{className:r,...a}=e;return(0,s.jsx)("div",{ref:t,className:(0,n.cn)("flex flex-col space-y-1.5 p-6",r),...a})});c.displayName="CardHeader";let i=a.forwardRef((e,t)=>{let{className:r,...a}=e;return(0,s.jsx)("h3",{ref:t,className:(0,n.cn)("text-2xl font-semibold leading-none tracking-tight",r),...a})});i.displayName="CardTitle";let o=a.forwardRef((e,t)=>{let{className:r,...a}=e;return(0,s.jsx)("p",{ref:t,className:(0,n.cn)("text-sm text-muted-foreground",r),...a})});o.displayName="CardDescription";let d=a.forwardRef((e,t)=>{let{className:r,...a}=e;return(0,s.jsx)("div",{ref:t,className:(0,n.cn)("p-6 pt-0",r),...a})});d.displayName="CardContent";let u=a.forwardRef((e,t)=>{let{className:r,...a}=e;return(0,s.jsx)("div",{ref:t,className:(0,n.cn)("flex items-center p-6 pt-0",r),...a})});u.displayName="CardFooter"},7204:function(e,t,r){"use strict";r.d(t,{E:function(){return l}});var s=r(7437),a=r(2265),n=r(3448);let l=a.forwardRef((e,t)=>{let{className:r,value:a=0,max:l=100,...c}=e;return(0,s.jsx)("div",{ref:t,className:(0,n.cn)("relative h-2 w-full overflow-hidden rounded-full bg-secondary",r),...c,children:(0,s.jsx)("div",{className:"h-full w-full flex-1 bg-primary transition-all",style:{transform:"translateX(-".concat(100-a/l*100,"%)")}})})});l.displayName="Progress"},3448:function(e,t,r){"use strict";r.d(t,{cn:function(){return n}});var s=r(1994),a=r(3335);function n(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return(0,a.m6)((0,s.W)(t))}}},function(e){e.O(0,[851,648,971,117,744],function(){return e(e.s=661)}),_N_E=e.O()}]);