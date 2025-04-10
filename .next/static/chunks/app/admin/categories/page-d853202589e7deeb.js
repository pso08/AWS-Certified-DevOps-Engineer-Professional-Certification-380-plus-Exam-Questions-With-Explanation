(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[331],{7627:function(e,t,s){Promise.resolve().then(s.bind(s,2394))},2394:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return q}});var a=s(7437),r=s(2265),l=s(9376),n=s(7648),i=s(2381),d=s(9820),c=s(279),o=s(3675),u=s(6246),m=s(8906),f=s(1567),x=s(5805),h=s(2720),p=s(8736),g=s(9089),v=s(8728),b=s(9397),y=s(5302),j=s(5131),N=s(3247),w=s(740),C=s(4630),k=s(8930),S=s(4291),Z=s(5060),M=s(5937),z=s(7204);let E=[{id:"1",name:"EC2 & Compute",description:"Amazon EC2 and related compute services",questionCount:75,avgScore:72,difficulty:"Medium"},{id:"2",name:"S3 & Storage",description:"Amazon S3 and other storage services",questionCount:68,avgScore:68,difficulty:"Easy"},{id:"3",name:"VPC & Networking",description:"Amazon VPC and networking concepts",questionCount:62,avgScore:65,difficulty:"Hard"},{id:"4",name:"IAM & Security",description:"Identity and Access Management and security best practices",questionCount:70,avgScore:75,difficulty:"Medium"},{id:"5",name:"Lambda & Serverless",description:"AWS Lambda and serverless architecture",questionCount:55,avgScore:70,difficulty:"Medium"},{id:"6",name:"RDS & Databases",description:"Amazon RDS and database services",questionCount:60,avgScore:67,difficulty:"Medium"},{id:"7",name:"CloudFormation & IaC",description:"CloudFormation and Infrastructure as Code",questionCount:50,avgScore:62,difficulty:"Hard"},{id:"8",name:"CloudWatch & Monitoring",description:"CloudWatch and monitoring solutions",questionCount:45,avgScore:73,difficulty:"Easy"},{id:"9",name:"Route 53 & DNS",description:"Amazon Route 53 and DNS concepts",questionCount:40,avgScore:78,difficulty:"Easy"},{id:"10",name:"ECS & Containers",description:"Amazon ECS and container services",questionCount:48,avgScore:64,difficulty:"Hard"}];function q(){let e=(0,l.useRouter)(),[t,s]=(0,r.useState)(null),[q,R]=(0,r.useState)(!0),[A,D]=(0,r.useState)(E),[V,H]=(0,r.useState)(E),[_,F]=(0,r.useState)(""),[P,I]=(0,r.useState)("all"),[L,O]=(0,r.useState)(!1),[T,Y]=(0,r.useState)(""),[W,$]=(0,r.useState)(""),[B,X]=(0,r.useState)("Medium"),[K,U]=(0,r.useState)(!1),[Q,J]=(0,r.useState)(""),[G,ee]=(0,r.useState)(""),[et,es]=(0,r.useState)(""),[ea,er]=(0,r.useState)(""),[el,en]=(0,r.useState)(!1),[ei,ed]=(0,r.useState)(""),[ec,eo]=(0,r.useState)(""),[eu,em]=(0,r.useState)(""),[ef,ex]=(0,r.useState)("");(0,r.useEffect)(()=>{(()=>{{let t=JSON.parse(localStorage.getItem("user_session")||"{}");if(!t.isLoggedIn){e.push("/auth/login");return}if(!t.isAdmin){e.push("/protected");return}s({id:t.userId||"1",name:t.name||"Admin",email:t.email||"admin@example.com",isAdmin:!0}),R(!1)}})()},[e]),(0,r.useEffect)(()=>{let e=A;if(_){let t=_.toLowerCase();e=e.filter(e=>e.name.toLowerCase().includes(t)||e.description.toLowerCase().includes(t))}"all"!==P&&(e=e.filter(e=>e.difficulty===P)),H(e)},[A,_,P]);let eh=e=>{let t=A.find(t=>t.id===e);t&&(J(t.id),ee(t.name),es(t.description),er(t.difficulty),U(!0))},ep=e=>{let t=A.find(t=>t.id===e);t&&(ed(t.id),eo(t.name),en(!0))},eg=e=>{switch(e){case"Easy":return"bg-green-900/30 text-green-400";case"Medium":return"bg-amber-900/30 text-amber-400";case"Hard":return"bg-red-900/30 text-red-400";default:return"bg-slate-700 text-slate-400"}};return q?(0,a.jsx)("div",{className:"min-h-screen bg-slate-900 text-white flex items-center justify-center",children:(0,a.jsx)("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-white"})}):(0,a.jsxs)("div",{className:"min-h-screen bg-slate-900 text-white",children:[(0,a.jsx)("div",{className:"container mx-auto px-4 py-8",children:(0,a.jsxs)("div",{className:"flex flex-col md:flex-row gap-8",children:[(0,a.jsxs)("div",{className:"w-full md:w-64 space-y-4",children:[(0,a.jsxs)("div",{className:"bg-slate-800 rounded-lg p-6 flex flex-col items-center",children:[(0,a.jsxs)(u.qE,{className:"h-24 w-24 mb-4",children:[(0,a.jsx)(u.F$,{src:"https://api.dicebear.com/7.x/initials/svg?seed=".concat(null==t?void 0:t.name),alt:null==t?void 0:t.name}),(0,a.jsx)(u.Q5,{children:null==t?void 0:t.name.charAt(0)})]}),(0,a.jsx)("h2",{className:"text-xl font-bold",children:null==t?void 0:t.name}),(0,a.jsx)("p",{className:"text-slate-400 text-sm",children:null==t?void 0:t.email}),(0,a.jsxs)("div",{className:"mt-2 bg-amber-900/30 text-amber-400 px-2 py-1 rounded text-xs flex items-center",children:[(0,a.jsx)(m.Z,{className:"h-3 w-3 mr-1"}),"Admin"]})]}),(0,a.jsxs)("div",{className:"bg-slate-800 rounded-lg p-4 space-y-2",children:[(0,a.jsxs)(n.default,{href:"/admin/dashboard",className:"block p-2 hover:bg-slate-700 rounded-lg",children:[(0,a.jsx)(f.Z,{className:"h-4 w-4 inline-block mr-2"}),"Dashboard"]}),(0,a.jsxs)(n.default,{href:"/admin/users",className:"block p-2 hover:bg-slate-700 rounded-lg",children:[(0,a.jsx)(x.Z,{className:"h-4 w-4 inline-block mr-2"}),"User Management"]}),(0,a.jsxs)(n.default,{href:"/admin/categories",className:"block p-2 bg-slate-700 rounded-lg",children:[(0,a.jsx)(h.Z,{className:"h-4 w-4 inline-block mr-2"}),"Categories"]}),(0,a.jsxs)(n.default,{href:"/admin/content",className:"block p-2 hover:bg-slate-700 rounded-lg",children:[(0,a.jsx)(p.Z,{className:"h-4 w-4 inline-block mr-2"}),"Content Management"]}),(0,a.jsxs)(n.default,{href:"/admin/coupons",className:"block p-2 hover:bg-slate-700 rounded-lg",children:[(0,a.jsx)(g.Z,{className:"h-4 w-4 inline-block mr-2"}),"Coupon Management"]}),(0,a.jsxs)(n.default,{href:"/admin/settings",className:"block p-2 hover:bg-slate-700 rounded-lg",children:[(0,a.jsx)(v.Z,{className:"h-4 w-4 inline-block mr-2"}),"Settings"]}),(0,a.jsx)(n.default,{href:"/protected",className:"block p-2 hover:bg-slate-700 rounded-lg",children:"Back to App"})]})]}),(0,a.jsxs)("div",{className:"flex-1",children:[(0,a.jsxs)("div",{className:"flex justify-between items-center mb-6",children:[(0,a.jsx)("h1",{className:"text-3xl font-bold",children:"Category Management"}),(0,a.jsx)("div",{className:"flex gap-2",children:(0,a.jsxs)(i.z,{className:"bg-blue-600 hover:bg-blue-700",onClick:()=>O(!0),children:[(0,a.jsx)(b.Z,{className:"h-4 w-4 mr-2"}),"New Category"]})})]}),eu&&(0,a.jsxs)(M.bZ,{className:"mb-4 bg-green-900/30 border-green-800 text-green-200",children:[(0,a.jsx)(y.Z,{className:"h-4 w-4 mr-2"}),(0,a.jsx)(M.X,{children:eu})]}),ef&&(0,a.jsxs)(M.bZ,{className:"mb-4 bg-red-900/30 border-red-800 text-red-200",children:[(0,a.jsx)(j.Z,{className:"h-4 w-4 mr-2"}),(0,a.jsx)(M.X,{children:ef})]}),(0,a.jsx)(d.Zb,{className:"bg-slate-800 border-slate-700 text-white mb-6",children:(0,a.jsx)(d.aY,{className:"p-4",children:(0,a.jsxs)("div",{className:"flex flex-col md:flex-row gap-4",children:[(0,a.jsxs)("div",{className:"flex-1 relative",children:[(0,a.jsx)(N.Z,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4"}),(0,a.jsx)(c.I,{placeholder:"Search categories...",className:"bg-slate-700 border-slate-600 text-white pl-10",value:_,onChange:e=>F(e.target.value)})]}),(0,a.jsxs)("div",{className:"flex gap-4",children:[(0,a.jsx)("div",{className:"w-40",children:(0,a.jsxs)("select",{className:"w-full h-10 rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-sm text-white",value:P,onChange:e=>I(e.target.value),children:[(0,a.jsx)("option",{value:"all",children:"All Difficulties"}),(0,a.jsx)("option",{value:"Easy",children:"Easy"}),(0,a.jsx)("option",{value:"Medium",children:"Medium"}),(0,a.jsx)("option",{value:"Hard",children:"Hard"})]})}),(0,a.jsxs)(i.z,{variant:"outline",className:"border-slate-600 text-white hover:bg-slate-700",onClick:()=>{F(""),I("all")},children:[(0,a.jsx)(w.Z,{className:"h-4 w-4 mr-2"}),"Reset"]})]})]})})}),(0,a.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8",children:0===V.length?(0,a.jsx)("div",{className:"col-span-3 text-center py-8 text-slate-400",children:"No categories found"}):V.map(e=>(0,a.jsxs)(d.Zb,{className:"bg-slate-800 border-slate-700 text-white",children:[(0,a.jsxs)(d.Ol,{className:"pb-2",children:[(0,a.jsxs)("div",{className:"flex justify-between items-start",children:[(0,a.jsx)(d.ll,{className:"text-xl",children:e.name}),(0,a.jsx)("div",{className:"px-2 py-1 rounded text-xs ".concat(eg(e.difficulty)),children:e.difficulty})]}),(0,a.jsx)(d.SZ,{className:"text-slate-400 line-clamp-2",children:e.description})]}),(0,a.jsx)(d.aY,{children:(0,a.jsxs)("div",{className:"space-y-4",children:[(0,a.jsxs)("div",{children:[(0,a.jsxs)("div",{className:"flex justify-between text-sm mb-1",children:[(0,a.jsx)("span",{children:"Questions"}),(0,a.jsx)("span",{children:e.questionCount})]}),(0,a.jsx)(z.E,{value:Math.min(100,e.questionCount/100*100),className:"h-2"})]}),(0,a.jsxs)("div",{children:[(0,a.jsxs)("div",{className:"flex justify-between text-sm mb-1",children:[(0,a.jsx)("span",{children:"Avg. Score"}),(0,a.jsxs)("span",{children:[e.avgScore,"%"]})]}),(0,a.jsx)(z.E,{value:e.avgScore,className:"h-2"})]})]})}),(0,a.jsx)(d.eW,{className:"pt-0",children:(0,a.jsxs)("div",{className:"flex justify-between w-full",children:[(0,a.jsxs)(i.z,{variant:"outline",size:"sm",className:"border-slate-600 text-white hover:bg-slate-700",onClick:()=>eh(e.id),children:[(0,a.jsx)(C.Z,{className:"h-4 w-4 mr-2"}),"Edit"]}),(0,a.jsxs)(i.z,{variant:"outline",size:"sm",className:"border-red-800 text-red-400 hover:bg-red-900/30",onClick:()=>ep(e.id),children:[(0,a.jsx)(k.Z,{className:"h-4 w-4 mr-2"}),"Delete"]})]})})]},e.id))}),(0,a.jsxs)(d.Zb,{className:"bg-slate-800 border-slate-700 text-white",children:[(0,a.jsxs)(d.Ol,{children:[(0,a.jsx)(d.ll,{children:"Category Performance"}),(0,a.jsx)(d.SZ,{className:"text-slate-300",children:"Average scores across all categories"})]}),(0,a.jsx)(d.aY,{children:(0,a.jsx)("div",{className:"space-y-4",children:A.sort((e,t)=>t.avgScore-e.avgScore).map(e=>(0,a.jsxs)("div",{children:[(0,a.jsxs)("div",{className:"flex justify-between mb-1",children:[(0,a.jsx)("span",{className:"text-sm font-medium text-white",children:e.name}),(0,a.jsxs)("span",{className:"text-sm font-medium text-white",children:[e.avgScore,"%"]})]}),(0,a.jsxs)("div",{className:"flex items-center",children:[(0,a.jsx)(z.E,{value:e.avgScore,className:"h-2 flex-1"}),(0,a.jsx)("span",{className:"ml-2 px-2 py-1 rounded text-xs ".concat(eg(e.difficulty)),children:e.difficulty})]})]},e.id))})})]})]})]})}),(0,a.jsx)(S.Vq,{open:L,onOpenChange:O,children:(0,a.jsxs)(S.cZ,{className:"bg-slate-800 border-slate-700 text-white",children:[(0,a.jsxs)(S.fK,{children:[(0,a.jsx)(S.$N,{children:"Create New Category"}),(0,a.jsx)(S.Be,{className:"text-slate-400",children:"Add a new question category to the platform"})]}),(0,a.jsxs)("div",{className:"space-y-4 py-4",children:[(0,a.jsxs)("div",{className:"space-y-2",children:[(0,a.jsx)(Z._,{htmlFor:"name",children:"Category Name"}),(0,a.jsx)(c.I,{id:"name",placeholder:"EC2 & Compute",className:"bg-slate-700 border-slate-600 text-white",value:T,onChange:e=>Y(e.target.value)})]}),(0,a.jsxs)("div",{className:"space-y-2",children:[(0,a.jsx)(Z._,{htmlFor:"description",children:"Description"}),(0,a.jsx)(o.g,{id:"description",placeholder:"Amazon EC2 and related compute services",className:"bg-slate-700 border-slate-600 text-white min-h-[100px]",value:W,onChange:e=>$(e.target.value)})]}),(0,a.jsxs)("div",{className:"space-y-2",children:[(0,a.jsx)(Z._,{htmlFor:"difficulty",children:"Difficulty"}),(0,a.jsxs)("select",{id:"difficulty",className:"w-full h-10 rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-sm text-white",value:B,onChange:e=>X(e.target.value),children:[(0,a.jsx)("option",{value:"Easy",children:"Easy"}),(0,a.jsx)("option",{value:"Medium",children:"Medium"}),(0,a.jsx)("option",{value:"Hard",children:"Hard"})]})]})]}),(0,a.jsxs)(S.cN,{children:[(0,a.jsx)(i.z,{variant:"outline",className:"border-slate-600 text-white hover:bg-slate-700",onClick:()=>O(!1),children:"Cancel"}),(0,a.jsx)(i.z,{className:"bg-blue-600 hover:bg-blue-700",onClick:()=>{if(!T||!W){ex("Please fill in all required fields");return}let e={id:"".concat(A.length+1),name:T,description:W,questionCount:0,avgScore:0,difficulty:B};D([...A,e]),Y(""),$(""),X("Medium"),O(!1),em("Category created successfully"),setTimeout(()=>em(""),3e3)},children:"Create Category"})]})]})}),(0,a.jsx)(S.Vq,{open:K,onOpenChange:U,children:(0,a.jsxs)(S.cZ,{className:"bg-slate-800 border-slate-700 text-white",children:[(0,a.jsxs)(S.fK,{children:[(0,a.jsx)(S.$N,{children:"Edit Category"}),(0,a.jsx)(S.Be,{className:"text-slate-400",children:"Update category information"})]}),(0,a.jsxs)("div",{className:"space-y-4 py-4",children:[(0,a.jsxs)("div",{className:"space-y-2",children:[(0,a.jsx)(Z._,{htmlFor:"edit-name",children:"Category Name"}),(0,a.jsx)(c.I,{id:"edit-name",placeholder:"EC2 & Compute",className:"bg-slate-700 border-slate-600 text-white",value:G,onChange:e=>ee(e.target.value)})]}),(0,a.jsxs)("div",{className:"space-y-2",children:[(0,a.jsx)(Z._,{htmlFor:"edit-description",children:"Description"}),(0,a.jsx)(o.g,{id:"edit-description",placeholder:"Amazon EC2 and related compute services",className:"bg-slate-700 border-slate-600 text-white min-h-[100px]",value:et,onChange:e=>es(e.target.value)})]}),(0,a.jsxs)("div",{className:"space-y-2",children:[(0,a.jsx)(Z._,{htmlFor:"edit-difficulty",children:"Difficulty"}),(0,a.jsxs)("select",{id:"edit-difficulty",className:"w-full h-10 rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-sm text-white",value:ea,onChange:e=>er(e.target.value),children:[(0,a.jsx)("option",{value:"Easy",children:"Easy"}),(0,a.jsx)("option",{value:"Medium",children:"Medium"}),(0,a.jsx)("option",{value:"Hard",children:"Hard"})]})]})]}),(0,a.jsxs)(S.cN,{children:[(0,a.jsx)(i.z,{variant:"outline",className:"border-slate-600 text-white hover:bg-slate-700",onClick:()=>U(!1),children:"Cancel"}),(0,a.jsx)(i.z,{className:"bg-blue-600 hover:bg-blue-700",onClick:()=>{if(!G||!et){ex("Please fill in all required fields");return}D(A.map(e=>e.id===Q?{...e,name:G,description:et,difficulty:ea}:e)),U(!1),em("Category updated successfully"),setTimeout(()=>em(""),3e3)},children:"Update Category"})]})]})}),(0,a.jsx)(S.Vq,{open:el,onOpenChange:en,children:(0,a.jsxs)(S.cZ,{className:"bg-slate-800 border-slate-700 text-white",children:[(0,a.jsxs)(S.fK,{children:[(0,a.jsx)(S.$N,{children:"Delete Category"}),(0,a.jsx)(S.Be,{className:"text-slate-400",children:"Are you sure you want to delete this category? This action cannot be undone."})]}),(0,a.jsx)("div",{className:"py-4",children:(0,a.jsxs)("p",{className:"text-white",children:["You are about to delete category: ",(0,a.jsx)("span",{className:"font-bold",children:ec})]})}),(0,a.jsxs)(S.cN,{children:[(0,a.jsx)(i.z,{variant:"outline",className:"border-slate-600 text-white hover:bg-slate-700",onClick:()=>en(!1),children:"Cancel"}),(0,a.jsx)(i.z,{variant:"destructive",className:"bg-red-600 hover:bg-red-700",onClick:()=>{D(A.filter(e=>e.id!==ei)),en(!1),em("Category deleted successfully"),setTimeout(()=>em(""),3e3)},children:"Delete Category"})]})]})})]})}},5302:function(e,t,s){"use strict";s.d(t,{Z:function(){return a}});let a=(0,s(9763).Z)("CheckCircle",[["path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14",key:"g774vq"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]])},740:function(e,t,s){"use strict";s.d(t,{Z:function(){return a}});let a=(0,s(9763).Z)("Filter",[["polygon",{points:"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3",key:"1yg77f"}]])},4630:function(e,t,s){"use strict";s.d(t,{Z:function(){return a}});let a=(0,s(9763).Z)("PenSquare",[["path",{d:"M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",key:"1qinfi"}],["path",{d:"M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z",key:"w2jsv5"}]])},9089:function(e,t,s){"use strict";s.d(t,{Z:function(){return a}});let a=(0,s(9763).Z)("Percent",[["line",{x1:"19",x2:"5",y1:"5",y2:"19",key:"1x9vlm"}],["circle",{cx:"6.5",cy:"6.5",r:"2.5",key:"4mh3h7"}],["circle",{cx:"17.5",cy:"17.5",r:"2.5",key:"1mdrzq"}]])},9397:function(e,t,s){"use strict";s.d(t,{Z:function(){return a}});let a=(0,s(9763).Z)("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]])},3247:function(e,t,s){"use strict";s.d(t,{Z:function(){return a}});let a=(0,s(9763).Z)("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]])},8728:function(e,t,s){"use strict";s.d(t,{Z:function(){return a}});let a=(0,s(9763).Z)("Settings",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]])},2720:function(e,t,s){"use strict";s.d(t,{Z:function(){return a}});let a=(0,s(9763).Z)("Tag",[["path",{d:"M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z",key:"14b2ls"}],["path",{d:"M7 7h.01",key:"7u93v4"}]])},8930:function(e,t,s){"use strict";s.d(t,{Z:function(){return a}});let a=(0,s(9763).Z)("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]])},5805:function(e,t,s){"use strict";s.d(t,{Z:function(){return a}});let a=(0,s(9763).Z)("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]])},5131:function(e,t,s){"use strict";s.d(t,{Z:function(){return a}});let a=(0,s(9763).Z)("XCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]])},9376:function(e,t,s){"use strict";var a=s(5475);s.o(a,"redirect")&&s.d(t,{redirect:function(){return a.redirect}}),s.o(a,"useRouter")&&s.d(t,{useRouter:function(){return a.useRouter}}),s.o(a,"useSearchParams")&&s.d(t,{useSearchParams:function(){return a.useSearchParams}})},5937:function(e,t,s){"use strict";s.d(t,{Cd:function(){return c},X:function(){return o},bZ:function(){return d}});var a=s(7437),r=s(2265),l=s(535),n=s(3448);let i=(0,l.j)("relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",{variants:{variant:{default:"bg-background text-foreground",destructive:"border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"}},defaultVariants:{variant:"default"}}),d=r.forwardRef((e,t)=>{let{className:s,variant:r,...l}=e;return(0,a.jsx)("div",{ref:t,role:"alert",className:(0,n.cn)(i({variant:r}),s),...l})});d.displayName="Alert";let c=r.forwardRef((e,t)=>{let{className:s,...r}=e;return(0,a.jsx)("h5",{ref:t,className:(0,n.cn)("mb-1 font-medium leading-none tracking-tight",s),...r})});c.displayName="AlertTitle";let o=r.forwardRef((e,t)=>{let{className:s,...r}=e;return(0,a.jsx)("div",{ref:t,className:(0,n.cn)("text-sm [&_p]:leading-relaxed",s),...r})});o.displayName="AlertDescription"},6246:function(e,t,s){"use strict";s.d(t,{F$:function(){return d},Q5:function(){return c},qE:function(){return i}});var a=s(7437),r=s(2265),l=s(4930),n=s(3448);let i=r.forwardRef((e,t)=>{let{className:s,...r}=e;return(0,a.jsx)(l.fC,{ref:t,className:(0,n.cn)("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",s),...r})});i.displayName=l.fC.displayName;let d=r.forwardRef((e,t)=>{let{className:s,...r}=e;return(0,a.jsx)(l.Ee,{ref:t,className:(0,n.cn)("aspect-square h-full w-full",s),...r})});d.displayName=l.Ee.displayName;let c=r.forwardRef((e,t)=>{let{className:s,...r}=e;return(0,a.jsx)(l.NY,{ref:t,className:(0,n.cn)("flex h-full w-full items-center justify-center rounded-full bg-muted",s),...r})});c.displayName=l.NY.displayName},2381:function(e,t,s){"use strict";s.d(t,{z:function(){return d}});var a=s(7437),r=s(2265),l=s(535),n=s(3448);let i=(0,l.j)("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",{variants:{variant:{default:"bg-primary text-primary-foreground shadow hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",outline:"border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-9 px-4 py-2",sm:"h-8 rounded-md px-3 text-xs",lg:"h-10 rounded-md px-8",icon:"h-9 w-9"}},defaultVariants:{variant:"default",size:"default"}}),d=r.forwardRef((e,t)=>{let{className:s,variant:l,size:d,asChild:c=!1,...o}=e,u=c?r.Fragment:"button";return(0,a.jsx)(u,{className:(0,n.cn)(i({variant:l,size:d,className:s})),ref:t,...o})});d.displayName="Button"},9820:function(e,t,s){"use strict";s.d(t,{Ol:function(){return i},SZ:function(){return c},Zb:function(){return n},aY:function(){return o},eW:function(){return u},ll:function(){return d}});var a=s(7437),r=s(2265),l=s(3448);let n=r.forwardRef((e,t)=>{let{className:s,...r}=e;return(0,a.jsx)("div",{ref:t,className:(0,l.cn)("rounded-lg border bg-card text-card-foreground shadow-sm",s),...r})});n.displayName="Card";let i=r.forwardRef((e,t)=>{let{className:s,...r}=e;return(0,a.jsx)("div",{ref:t,className:(0,l.cn)("flex flex-col space-y-1.5 p-6",s),...r})});i.displayName="CardHeader";let d=r.forwardRef((e,t)=>{let{className:s,...r}=e;return(0,a.jsx)("h3",{ref:t,className:(0,l.cn)("text-2xl font-semibold leading-none tracking-tight",s),...r})});d.displayName="CardTitle";let c=r.forwardRef((e,t)=>{let{className:s,...r}=e;return(0,a.jsx)("p",{ref:t,className:(0,l.cn)("text-sm text-muted-foreground",s),...r})});c.displayName="CardDescription";let o=r.forwardRef((e,t)=>{let{className:s,...r}=e;return(0,a.jsx)("div",{ref:t,className:(0,l.cn)("p-6 pt-0",s),...r})});o.displayName="CardContent";let u=r.forwardRef((e,t)=>{let{className:s,...r}=e;return(0,a.jsx)("div",{ref:t,className:(0,l.cn)("flex items-center p-6 pt-0",s),...r})});u.displayName="CardFooter"},4291:function(e,t,s){"use strict";s.d(t,{$N:function(){return x},Be:function(){return h},Vq:function(){return d},cN:function(){return f},cZ:function(){return u},fK:function(){return m}});var a=s(7437),r=s(2265),l=s(9027),n=s(2489),i=s(3448);let d=l.fC;l.xz;let c=l.h_;l.x8;let o=r.forwardRef((e,t)=>{let{className:s,...r}=e;return(0,a.jsx)(l.aV,{ref:t,className:(0,i.cn)("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",s),...r})});o.displayName=l.aV.displayName;let u=r.forwardRef((e,t)=>{let{className:s,children:r,...d}=e;return(0,a.jsxs)(c,{children:[(0,a.jsx)(o,{}),(0,a.jsxs)(l.VY,{ref:t,className:(0,i.cn)("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",s),...d,children:[r,(0,a.jsxs)(l.x8,{className:"absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",children:[(0,a.jsx)(n.Z,{className:"h-4 w-4"}),(0,a.jsx)("span",{className:"sr-only",children:"Close"})]})]})]})});u.displayName=l.VY.displayName;let m=e=>{let{className:t,...s}=e;return(0,a.jsx)("div",{className:(0,i.cn)("flex flex-col space-y-1.5 text-center sm:text-left",t),...s})};m.displayName="DialogHeader";let f=e=>{let{className:t,...s}=e;return(0,a.jsx)("div",{className:(0,i.cn)("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",t),...s})};f.displayName="DialogFooter";let x=r.forwardRef((e,t)=>{let{className:s,...r}=e;return(0,a.jsx)(l.Dx,{ref:t,className:(0,i.cn)("text-lg font-semibold leading-none tracking-tight",s),...r})});x.displayName=l.Dx.displayName;let h=r.forwardRef((e,t)=>{let{className:s,...r}=e;return(0,a.jsx)(l.dk,{ref:t,className:(0,i.cn)("text-sm text-muted-foreground",s),...r})});h.displayName=l.dk.displayName},279:function(e,t,s){"use strict";s.d(t,{I:function(){return n}});var a=s(7437),r=s(2265),l=s(3448);let n=r.forwardRef((e,t)=>{let{className:s,type:r,...n}=e;return(0,a.jsx)("input",{type:r,className:(0,l.cn)("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",s),ref:t,...n})});n.displayName="Input"},5060:function(e,t,s){"use strict";s.d(t,{_:function(){return i}});var a=s(7437),r=s(2265),l=s(6394),n=s(3448);let i=r.forwardRef((e,t)=>{let{className:s,...r}=e;return(0,a.jsx)(l.f,{ref:t,className:(0,n.cn)("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",s),...r})});i.displayName=l.f.displayName},7204:function(e,t,s){"use strict";s.d(t,{E:function(){return n}});var a=s(7437),r=s(2265),l=s(3448);let n=r.forwardRef((e,t)=>{let{className:s,value:r=0,max:n=100,...i}=e;return(0,a.jsx)("div",{ref:t,className:(0,l.cn)("relative h-2 w-full overflow-hidden rounded-full bg-secondary",s),...i,children:(0,a.jsx)("div",{className:"h-full w-full flex-1 bg-primary transition-all",style:{transform:"translateX(-".concat(100-r/n*100,"%)")}})})});n.displayName="Progress"},3675:function(e,t,s){"use strict";s.d(t,{g:function(){return n}});var a=s(7437),r=s(2265),l=s(3448);let n=r.forwardRef((e,t)=>{let{className:s,...r}=e;return(0,a.jsx)("textarea",{className:(0,l.cn)("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",s),ref:t,...r})});n.displayName="Textarea"},3448:function(e,t,s){"use strict";s.d(t,{cn:function(){return l}});var a=s(1994),r=s(3335);function l(){for(var e=arguments.length,t=Array(e),s=0;s<e;s++)t[s]=arguments[s];return(0,r.m6)((0,a.W)(t))}},9255:function(e,t,s){"use strict";s.d(t,{M:function(){return d}});var a,r=s(2265),l=s(1188),n=(a||(a=s.t(r,2)))[" useId ".trim().toString()]||(()=>void 0),i=0;function d(e){let[t,s]=r.useState(n());return(0,l.b)(()=>{e||s(e=>e??String(i++))},[e]),e||(t?`radix-${t}`:"")}},6394:function(e,t,s){"use strict";s.d(t,{f:function(){return i}});var a=s(2265),r=s(6840),l=s(7437),n=a.forwardRef((e,t)=>(0,l.jsx)(r.WV.label,{...e,ref:t,onMouseDown:t=>{var s;t.target.closest("button, input, select, textarea")||(null===(s=e.onMouseDown)||void 0===s||s.call(e,t),!t.defaultPrevented&&t.detail>1&&t.preventDefault())}}));n.displayName="Label";var i=n}},function(e){e.O(0,[851,648,773,536,971,117,744],function(){return e(e.s=7627)}),_N_E=e.O()}]);