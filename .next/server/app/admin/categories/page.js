(()=>{var e={};e.id=331,e.ids=[331],e.modules={72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},86714:(e,s,a)=>{"use strict";a.r(s),a.d(s,{GlobalError:()=>r.a,__next_app__:()=>u,originalPathname:()=>m,pages:()=>o,routeModule:()=>x,tree:()=>c}),a(14285),a(18601),a(35866);var t=a(23191),l=a(88716),i=a(37922),r=a.n(i),n=a(95231),d={};for(let e in n)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(d[e]=()=>n[e]);a.d(s,d);let c=["",{children:["admin",{children:["categories",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(a.bind(a,14285)),"/home/ubuntu/workspace/app/cloudflare-production-all-questions/app/admin/categories/page.tsx"]}]},{}]},{}]},{layout:[()=>Promise.resolve().then(a.bind(a,18601)),"/home/ubuntu/workspace/app/cloudflare-production-all-questions/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(a.t.bind(a,35866,23)),"next/dist/client/components/not-found-error"]}],o=["/home/ubuntu/workspace/app/cloudflare-production-all-questions/app/admin/categories/page.tsx"],m="/admin/categories/page",u={require:a,loadChunk:()=>Promise.resolve()},x=new t.AppPageRouteModule({definition:{kind:l.x.APP_PAGE,page:"/admin/categories/page",pathname:"/admin/categories",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},45429:(e,s,a)=>{Promise.resolve().then(a.bind(a,72156))},72156:(e,s,a)=>{"use strict";a.r(s),a.d(s,{default:()=>A});var t=a(10326),l=a(17577),i=a(35047),r=a(90434),n=a(91664),d=a(29752),c=a(41190),o=a(82015),m=a(3594),u=a(58038),x=a(95396),h=a(24061),p=a(40765),g=a(36283),j=a(25276),f=a(88378),b=a(83855),v=a(54659),N=a(91470),y=a(88307),w=a(41137),C=a(70003),S=a(98091),k=a(24118),q=a(44794),E=a(33261),M=a(33269);let Z=[{id:"1",name:"EC2 & Compute",description:"Amazon EC2 and related compute services",questionCount:75,avgScore:72,difficulty:"Medium"},{id:"2",name:"S3 & Storage",description:"Amazon S3 and other storage services",questionCount:68,avgScore:68,difficulty:"Easy"},{id:"3",name:"VPC & Networking",description:"Amazon VPC and networking concepts",questionCount:62,avgScore:65,difficulty:"Hard"},{id:"4",name:"IAM & Security",description:"Identity and Access Management and security best practices",questionCount:70,avgScore:75,difficulty:"Medium"},{id:"5",name:"Lambda & Serverless",description:"AWS Lambda and serverless architecture",questionCount:55,avgScore:70,difficulty:"Medium"},{id:"6",name:"RDS & Databases",description:"Amazon RDS and database services",questionCount:60,avgScore:67,difficulty:"Medium"},{id:"7",name:"CloudFormation & IaC",description:"CloudFormation and Infrastructure as Code",questionCount:50,avgScore:62,difficulty:"Hard"},{id:"8",name:"CloudWatch & Monitoring",description:"CloudWatch and monitoring solutions",questionCount:45,avgScore:73,difficulty:"Easy"},{id:"9",name:"Route 53 & DNS",description:"Amazon Route 53 and DNS concepts",questionCount:40,avgScore:78,difficulty:"Easy"},{id:"10",name:"ECS & Containers",description:"Amazon ECS and container services",questionCount:48,avgScore:64,difficulty:"Hard"}];function A(){(0,i.useRouter)();let[e,s]=(0,l.useState)(null),[a,A]=(0,l.useState)(!0),[P,_]=(0,l.useState)(Z),[z,D]=(0,l.useState)(Z),[H,F]=(0,l.useState)(""),[R,$]=(0,l.useState)("all"),[I,O]=(0,l.useState)(!1),[T,V]=(0,l.useState)(""),[B,G]=(0,l.useState)(""),[W,X]=(0,l.useState)("Medium"),[Y,K]=(0,l.useState)(!1),[U,L]=(0,l.useState)(""),[Q,J]=(0,l.useState)(""),[ee,es]=(0,l.useState)(""),[ea,et]=(0,l.useState)(""),[el,ei]=(0,l.useState)(!1),[er,en]=(0,l.useState)(""),[ed,ec]=(0,l.useState)(""),[eo,em]=(0,l.useState)(""),[eu,ex]=(0,l.useState)(""),eh=e=>{let s=P.find(s=>s.id===e);s&&(L(s.id),J(s.name),es(s.description),et(s.difficulty),K(!0))},ep=e=>{let s=P.find(s=>s.id===e);s&&(en(s.id),ec(s.name),ei(!0))},eg=e=>{switch(e){case"Easy":return"bg-green-900/30 text-green-400";case"Medium":return"bg-amber-900/30 text-amber-400";case"Hard":return"bg-red-900/30 text-red-400";default:return"bg-slate-700 text-slate-400"}};return a?t.jsx("div",{className:"min-h-screen bg-slate-900 text-white flex items-center justify-center",children:t.jsx("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-white"})}):(0,t.jsxs)("div",{className:"min-h-screen bg-slate-900 text-white",children:[t.jsx("div",{className:"container mx-auto px-4 py-8",children:(0,t.jsxs)("div",{className:"flex flex-col md:flex-row gap-8",children:[(0,t.jsxs)("div",{className:"w-full md:w-64 space-y-4",children:[(0,t.jsxs)("div",{className:"bg-slate-800 rounded-lg p-6 flex flex-col items-center",children:[(0,t.jsxs)(m.qE,{className:"h-24 w-24 mb-4",children:[t.jsx(m.F$,{src:`https://api.dicebear.com/7.x/initials/svg?seed=${e?.name}`,alt:e?.name}),t.jsx(m.Q5,{children:e?.name.charAt(0)})]}),t.jsx("h2",{className:"text-xl font-bold",children:e?.name}),t.jsx("p",{className:"text-slate-400 text-sm",children:e?.email}),(0,t.jsxs)("div",{className:"mt-2 bg-amber-900/30 text-amber-400 px-2 py-1 rounded text-xs flex items-center",children:[t.jsx(u.Z,{className:"h-3 w-3 mr-1"}),"Admin"]})]}),(0,t.jsxs)("div",{className:"bg-slate-800 rounded-lg p-4 space-y-2",children:[(0,t.jsxs)(r.default,{href:"/admin/dashboard",className:"block p-2 hover:bg-slate-700 rounded-lg",children:[t.jsx(x.Z,{className:"h-4 w-4 inline-block mr-2"}),"Dashboard"]}),(0,t.jsxs)(r.default,{href:"/admin/users",className:"block p-2 hover:bg-slate-700 rounded-lg",children:[t.jsx(h.Z,{className:"h-4 w-4 inline-block mr-2"}),"User Management"]}),(0,t.jsxs)(r.default,{href:"/admin/categories",className:"block p-2 bg-slate-700 rounded-lg",children:[t.jsx(p.Z,{className:"h-4 w-4 inline-block mr-2"}),"Categories"]}),(0,t.jsxs)(r.default,{href:"/admin/content",className:"block p-2 hover:bg-slate-700 rounded-lg",children:[t.jsx(g.Z,{className:"h-4 w-4 inline-block mr-2"}),"Content Management"]}),(0,t.jsxs)(r.default,{href:"/admin/coupons",className:"block p-2 hover:bg-slate-700 rounded-lg",children:[t.jsx(j.Z,{className:"h-4 w-4 inline-block mr-2"}),"Coupon Management"]}),(0,t.jsxs)(r.default,{href:"/admin/settings",className:"block p-2 hover:bg-slate-700 rounded-lg",children:[t.jsx(f.Z,{className:"h-4 w-4 inline-block mr-2"}),"Settings"]}),t.jsx(r.default,{href:"/protected",className:"block p-2 hover:bg-slate-700 rounded-lg",children:"Back to App"})]})]}),(0,t.jsxs)("div",{className:"flex-1",children:[(0,t.jsxs)("div",{className:"flex justify-between items-center mb-6",children:[t.jsx("h1",{className:"text-3xl font-bold",children:"Category Management"}),t.jsx("div",{className:"flex gap-2",children:(0,t.jsxs)(n.z,{className:"bg-blue-600 hover:bg-blue-700",onClick:()=>O(!0),children:[t.jsx(b.Z,{className:"h-4 w-4 mr-2"}),"New Category"]})})]}),eo&&(0,t.jsxs)(E.bZ,{className:"mb-4 bg-green-900/30 border-green-800 text-green-200",children:[t.jsx(v.Z,{className:"h-4 w-4 mr-2"}),t.jsx(E.X,{children:eo})]}),eu&&(0,t.jsxs)(E.bZ,{className:"mb-4 bg-red-900/30 border-red-800 text-red-200",children:[t.jsx(N.Z,{className:"h-4 w-4 mr-2"}),t.jsx(E.X,{children:eu})]}),t.jsx(d.Zb,{className:"bg-slate-800 border-slate-700 text-white mb-6",children:t.jsx(d.aY,{className:"p-4",children:(0,t.jsxs)("div",{className:"flex flex-col md:flex-row gap-4",children:[(0,t.jsxs)("div",{className:"flex-1 relative",children:[t.jsx(y.Z,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4"}),t.jsx(c.I,{placeholder:"Search categories...",className:"bg-slate-700 border-slate-600 text-white pl-10",value:H,onChange:e=>F(e.target.value)})]}),(0,t.jsxs)("div",{className:"flex gap-4",children:[t.jsx("div",{className:"w-40",children:(0,t.jsxs)("select",{className:"w-full h-10 rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-sm text-white",value:R,onChange:e=>$(e.target.value),children:[t.jsx("option",{value:"all",children:"All Difficulties"}),t.jsx("option",{value:"Easy",children:"Easy"}),t.jsx("option",{value:"Medium",children:"Medium"}),t.jsx("option",{value:"Hard",children:"Hard"})]})}),(0,t.jsxs)(n.z,{variant:"outline",className:"border-slate-600 text-white hover:bg-slate-700",onClick:()=>{F(""),$("all")},children:[t.jsx(w.Z,{className:"h-4 w-4 mr-2"}),"Reset"]})]})]})})}),t.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8",children:0===z.length?t.jsx("div",{className:"col-span-3 text-center py-8 text-slate-400",children:"No categories found"}):z.map(e=>(0,t.jsxs)(d.Zb,{className:"bg-slate-800 border-slate-700 text-white",children:[(0,t.jsxs)(d.Ol,{className:"pb-2",children:[(0,t.jsxs)("div",{className:"flex justify-between items-start",children:[t.jsx(d.ll,{className:"text-xl",children:e.name}),t.jsx("div",{className:`px-2 py-1 rounded text-xs ${eg(e.difficulty)}`,children:e.difficulty})]}),t.jsx(d.SZ,{className:"text-slate-400 line-clamp-2",children:e.description})]}),t.jsx(d.aY,{children:(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsxs)("div",{children:[(0,t.jsxs)("div",{className:"flex justify-between text-sm mb-1",children:[t.jsx("span",{children:"Questions"}),t.jsx("span",{children:e.questionCount})]}),t.jsx(M.E,{value:Math.min(100,e.questionCount/100*100),className:"h-2"})]}),(0,t.jsxs)("div",{children:[(0,t.jsxs)("div",{className:"flex justify-between text-sm mb-1",children:[t.jsx("span",{children:"Avg. Score"}),(0,t.jsxs)("span",{children:[e.avgScore,"%"]})]}),t.jsx(M.E,{value:e.avgScore,className:"h-2"})]})]})}),t.jsx(d.eW,{className:"pt-0",children:(0,t.jsxs)("div",{className:"flex justify-between w-full",children:[(0,t.jsxs)(n.z,{variant:"outline",size:"sm",className:"border-slate-600 text-white hover:bg-slate-700",onClick:()=>eh(e.id),children:[t.jsx(C.Z,{className:"h-4 w-4 mr-2"}),"Edit"]}),(0,t.jsxs)(n.z,{variant:"outline",size:"sm",className:"border-red-800 text-red-400 hover:bg-red-900/30",onClick:()=>ep(e.id),children:[t.jsx(S.Z,{className:"h-4 w-4 mr-2"}),"Delete"]})]})})]},e.id))}),(0,t.jsxs)(d.Zb,{className:"bg-slate-800 border-slate-700 text-white",children:[(0,t.jsxs)(d.Ol,{children:[t.jsx(d.ll,{children:"Category Performance"}),t.jsx(d.SZ,{className:"text-slate-300",children:"Average scores across all categories"})]}),t.jsx(d.aY,{children:t.jsx("div",{className:"space-y-4",children:P.sort((e,s)=>s.avgScore-e.avgScore).map(e=>(0,t.jsxs)("div",{children:[(0,t.jsxs)("div",{className:"flex justify-between mb-1",children:[t.jsx("span",{className:"text-sm font-medium text-white",children:e.name}),(0,t.jsxs)("span",{className:"text-sm font-medium text-white",children:[e.avgScore,"%"]})]}),(0,t.jsxs)("div",{className:"flex items-center",children:[t.jsx(M.E,{value:e.avgScore,className:"h-2 flex-1"}),t.jsx("span",{className:`ml-2 px-2 py-1 rounded text-xs ${eg(e.difficulty)}`,children:e.difficulty})]})]},e.id))})})]})]})]})}),t.jsx(k.Vq,{open:I,onOpenChange:O,children:(0,t.jsxs)(k.cZ,{className:"bg-slate-800 border-slate-700 text-white",children:[(0,t.jsxs)(k.fK,{children:[t.jsx(k.$N,{children:"Create New Category"}),t.jsx(k.Be,{className:"text-slate-400",children:"Add a new question category to the platform"})]}),(0,t.jsxs)("div",{className:"space-y-4 py-4",children:[(0,t.jsxs)("div",{className:"space-y-2",children:[t.jsx(q._,{htmlFor:"name",children:"Category Name"}),t.jsx(c.I,{id:"name",placeholder:"EC2 & Compute",className:"bg-slate-700 border-slate-600 text-white",value:T,onChange:e=>V(e.target.value)})]}),(0,t.jsxs)("div",{className:"space-y-2",children:[t.jsx(q._,{htmlFor:"description",children:"Description"}),t.jsx(o.g,{id:"description",placeholder:"Amazon EC2 and related compute services",className:"bg-slate-700 border-slate-600 text-white min-h-[100px]",value:B,onChange:e=>G(e.target.value)})]}),(0,t.jsxs)("div",{className:"space-y-2",children:[t.jsx(q._,{htmlFor:"difficulty",children:"Difficulty"}),(0,t.jsxs)("select",{id:"difficulty",className:"w-full h-10 rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-sm text-white",value:W,onChange:e=>X(e.target.value),children:[t.jsx("option",{value:"Easy",children:"Easy"}),t.jsx("option",{value:"Medium",children:"Medium"}),t.jsx("option",{value:"Hard",children:"Hard"})]})]})]}),(0,t.jsxs)(k.cN,{children:[t.jsx(n.z,{variant:"outline",className:"border-slate-600 text-white hover:bg-slate-700",onClick:()=>O(!1),children:"Cancel"}),t.jsx(n.z,{className:"bg-blue-600 hover:bg-blue-700",onClick:()=>{if(!T||!B){ex("Please fill in all required fields");return}let e={id:`${P.length+1}`,name:T,description:B,questionCount:0,avgScore:0,difficulty:W};_([...P,e]),V(""),G(""),X("Medium"),O(!1),em("Category created successfully"),setTimeout(()=>em(""),3e3)},children:"Create Category"})]})]})}),t.jsx(k.Vq,{open:Y,onOpenChange:K,children:(0,t.jsxs)(k.cZ,{className:"bg-slate-800 border-slate-700 text-white",children:[(0,t.jsxs)(k.fK,{children:[t.jsx(k.$N,{children:"Edit Category"}),t.jsx(k.Be,{className:"text-slate-400",children:"Update category information"})]}),(0,t.jsxs)("div",{className:"space-y-4 py-4",children:[(0,t.jsxs)("div",{className:"space-y-2",children:[t.jsx(q._,{htmlFor:"edit-name",children:"Category Name"}),t.jsx(c.I,{id:"edit-name",placeholder:"EC2 & Compute",className:"bg-slate-700 border-slate-600 text-white",value:Q,onChange:e=>J(e.target.value)})]}),(0,t.jsxs)("div",{className:"space-y-2",children:[t.jsx(q._,{htmlFor:"edit-description",children:"Description"}),t.jsx(o.g,{id:"edit-description",placeholder:"Amazon EC2 and related compute services",className:"bg-slate-700 border-slate-600 text-white min-h-[100px]",value:ee,onChange:e=>es(e.target.value)})]}),(0,t.jsxs)("div",{className:"space-y-2",children:[t.jsx(q._,{htmlFor:"edit-difficulty",children:"Difficulty"}),(0,t.jsxs)("select",{id:"edit-difficulty",className:"w-full h-10 rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-sm text-white",value:ea,onChange:e=>et(e.target.value),children:[t.jsx("option",{value:"Easy",children:"Easy"}),t.jsx("option",{value:"Medium",children:"Medium"}),t.jsx("option",{value:"Hard",children:"Hard"})]})]})]}),(0,t.jsxs)(k.cN,{children:[t.jsx(n.z,{variant:"outline",className:"border-slate-600 text-white hover:bg-slate-700",onClick:()=>K(!1),children:"Cancel"}),t.jsx(n.z,{className:"bg-blue-600 hover:bg-blue-700",onClick:()=>{if(!Q||!ee){ex("Please fill in all required fields");return}_(P.map(e=>e.id===U?{...e,name:Q,description:ee,difficulty:ea}:e)),K(!1),em("Category updated successfully"),setTimeout(()=>em(""),3e3)},children:"Update Category"})]})]})}),t.jsx(k.Vq,{open:el,onOpenChange:ei,children:(0,t.jsxs)(k.cZ,{className:"bg-slate-800 border-slate-700 text-white",children:[(0,t.jsxs)(k.fK,{children:[t.jsx(k.$N,{children:"Delete Category"}),t.jsx(k.Be,{className:"text-slate-400",children:"Are you sure you want to delete this category? This action cannot be undone."})]}),t.jsx("div",{className:"py-4",children:(0,t.jsxs)("p",{className:"text-white",children:["You are about to delete category: ",t.jsx("span",{className:"font-bold",children:ed})]})}),(0,t.jsxs)(k.cN,{children:[t.jsx(n.z,{variant:"outline",className:"border-slate-600 text-white hover:bg-slate-700",onClick:()=>ei(!1),children:"Cancel"}),t.jsx(n.z,{variant:"destructive",className:"bg-red-600 hover:bg-red-700",onClick:()=>{_(P.filter(e=>e.id!==er)),ei(!1),em("Category deleted successfully"),setTimeout(()=>em(""),3e3)},children:"Delete Category"})]})]})})]})}},83855:(e,s,a)=>{"use strict";a.d(s,{Z:()=>t});let t=(0,a(76557).Z)("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]])},33269:(e,s,a)=>{"use strict";a.d(s,{E:()=>r});var t=a(10326),l=a(17577),i=a(51223);let r=l.forwardRef(({className:e,value:s=0,max:a=100,...l},r)=>t.jsx("div",{ref:r,className:(0,i.cn)("relative h-2 w-full overflow-hidden rounded-full bg-secondary",e),...l,children:t.jsx("div",{className:"h-full w-full flex-1 bg-primary transition-all",style:{transform:`translateX(-${100-s/a*100}%)`}})}));r.displayName="Progress"},82015:(e,s,a)=>{"use strict";a.d(s,{g:()=>r});var t=a(10326),l=a(17577),i=a(51223);let r=l.forwardRef(({className:e,...s},a)=>t.jsx("textarea",{className:(0,i.cn)("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",e),ref:a,...s}));r.displayName="Textarea"},14285:(e,s,a)=>{"use strict";a.r(s),a.d(s,{default:()=>t});let t=(0,a(68570).createProxy)(String.raw`/home/ubuntu/workspace/app/cloudflare-production-all-questions/app/admin/categories/page.tsx#default`)}};var s=require("../../../webpack-runtime.js");s.C(e);var a=e=>s(s.s=e),t=s.X(0,[276,857,582,434,896,263,179],()=>a(86714));module.exports=t})();