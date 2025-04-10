"use strict";exports.id=54,exports.ids=[54],exports.modules={7888:(e,s,t)=>{t.d(s,{Z:()=>r});let r=(0,t(6557).Z)("AlertCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]])},2933:(e,s,t)=>{t.d(s,{Z:()=>r});let r=(0,t(6557).Z)("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]])},9183:(e,s,t)=>{t.d(s,{Z:()=>r});let r=(0,t(6557).Z)("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]])},2538:(e,s,t)=>{t.d(s,{Z:()=>T});var r=t(326),a=t(7577),l=t(9752),i=t(1664),n=t(8051),d=t(3095),c=t(2561),o=t(2067),u=t(3405),m=t(2566),x=t(9815),f=t(5226),h="Checkbox",[p,v]=(0,d.b)(h),[w,y]=p(h),b=a.forwardRef((e,s)=>{let{__scopeCheckbox:t,name:l,checked:i,defaultChecked:d,required:u,disabled:m,value:x="on",onCheckedChange:h,form:p,...v}=e,[y,b]=a.useState(null),j=(0,n.e)(s,e=>b(e)),g=a.useRef(!1),A=!y||p||!!y.closest("form"),[R=!1,S]=(0,o.T)({prop:i,defaultProp:d,onChange:h}),Z=a.useRef(R);return a.useEffect(()=>{let e=y?.form;if(e){let s=()=>S(Z.current);return e.addEventListener("reset",s),()=>e.removeEventListener("reset",s)}},[y,S]),(0,r.jsxs)(w,{scope:t,state:R,disabled:m,children:[(0,r.jsx)(f.WV.button,{type:"button",role:"checkbox","aria-checked":k(R)?"mixed":R,"aria-required":u,"data-state":C(R),"data-disabled":m?"":void 0,disabled:m,value:x,...v,ref:j,onKeyDown:(0,c.M)(e.onKeyDown,e=>{"Enter"===e.key&&e.preventDefault()}),onClick:(0,c.M)(e.onClick,e=>{S(e=>!!k(e)||!e),A&&(g.current=e.isPropagationStopped(),g.current||e.stopPropagation())})}),A&&(0,r.jsx)(N,{control:y,bubbles:!g.current,name:l,value:x,checked:R,required:u,disabled:m,form:p,style:{transform:"translateX(-100%)"},defaultChecked:!k(d)&&d})]})});b.displayName=h;var j="CheckboxIndicator",g=a.forwardRef((e,s)=>{let{__scopeCheckbox:t,forceMount:a,...l}=e,i=y(j,t);return(0,r.jsx)(x.z,{present:a||k(i.state)||!0===i.state,children:(0,r.jsx)(f.WV.span,{"data-state":C(i.state),"data-disabled":i.disabled?"":void 0,...l,ref:s,style:{pointerEvents:"none",...e.style}})})});g.displayName=j;var N=e=>{let{control:s,checked:t,bubbles:l=!0,defaultChecked:i,...n}=e,d=a.useRef(null),c=(0,u.D)(t),o=(0,m.t)(s);a.useEffect(()=>{let e=d.current,s=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"checked").set;if(c!==t&&s){let r=new Event("click",{bubbles:l});e.indeterminate=k(t),s.call(e,!k(t)&&t),e.dispatchEvent(r)}},[c,t,l]);let x=a.useRef(!k(t)&&t);return(0,r.jsx)("input",{type:"checkbox","aria-hidden":!0,defaultChecked:i??x.current,...n,tabIndex:-1,ref:d,style:{...e.style,...o,position:"absolute",pointerEvents:"none",opacity:0,margin:0}})};function k(e){return"indeterminate"===e}function C(e){return k(e)?"indeterminate":e?"checked":"unchecked"}var A=t(2933),R=t(1223);let S=a.forwardRef(({className:e,...s},t)=>r.jsx(b,{ref:t,className:(0,R.cn)("peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",e),...s,children:r.jsx(g,{className:(0,R.cn)("flex items-center justify-center text-current"),children:r.jsx(A.Z,{className:"h-4 w-4"})})}));S.displayName=b.displayName;var Z=t(4794),z=t(6557);let E=(0,z.Z)("CheckCircle2",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);var D=t(7888);let M=(0,z.Z)("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);var P=t(9183),$=t(3261);function T({question:e,onSubmit:s,onNext:t,onPrevious:n,showTimer:d=!1,timeLimit:c=0,initialSelectedAnswers:o=[],isAnswered:u=!1}){let[m,x]=(0,a.useState)(o),[f,h]=(0,a.useState)(u),[p,v]=(0,a.useState)(!1),[w,y]=(0,a.useState)(c),b=e=>{f||x([e])},j=(e,s)=>{f||(e?x(e=>[...e,s]):x(e=>e.filter(e=>e!==s)))},g=()=>{if(0===m.length)return;let t=!1;if(e.isMultipleAnswer){let s=e.correctAnswers.every(e=>m.includes(e)),r=m.every(s=>e.correctAnswers.includes(s));t=s&&r}else t=e.correctAnswers.includes(m[0]);v(t),h(!0),s(t,m)};return(0,r.jsxs)(l.Zb,{className:"w-full max-w-3xl mx-auto",children:[r.jsx(l.Ol,{children:(0,r.jsxs)("div",{className:"flex justify-between items-center",children:[r.jsx(l.ll,{className:"text-xl",children:"Question"}),d&&c>0&&(0,r.jsxs)("div",{className:"text-sm font-medium",children:["Time Remaining: ",Math.floor(w/60),":",(w%60).toString().padStart(2,"0")]})]})}),(0,r.jsxs)(l.aY,{className:"space-y-6",children:[r.jsx("p",{className:"text-lg break-words whitespace-normal overflow-auto max-h-[300px]",children:e.text}),r.jsx("div",{className:"mt-4",children:e.isMultipleAnswer?(0,r.jsxs)("div",{className:"space-y-3",children:[e.options.map(s=>(0,r.jsxs)("div",{className:"flex items-start space-x-3",children:[r.jsx("div",{className:"flex items-center justify-center h-4 w-4 mt-1 shrink-0",children:r.jsx(S,{id:`option-${s.id}`,checked:m.includes(s.id),onCheckedChange:e=>j(e,s.id),disabled:f,className:"h-4 w-4 cursor-pointer"})}),r.jsx("div",{className:"grid gap-1.5 leading-none",children:(0,r.jsxs)(Z._,{htmlFor:`option-${s.id}`,className:`text-base cursor-pointer ${f&&e.correctAnswers.includes(s.id)?"font-medium text-green-600 dark:text-green-400":""}`,children:[s.id,". ",s.text]})})]},s.id)),r.jsx("p",{className:"text-sm text-muted-foreground mt-2",children:"Select all that apply. This question has multiple correct answers."})]}):r.jsx("div",{className:"space-y-3",children:e.options.map(s=>(0,r.jsxs)("div",{className:"flex items-start space-x-3",children:[r.jsx("input",{type:"radio",id:`option-${s.id}`,name:"single-answer",value:s.id,checked:m[0]===s.id,onChange:()=>b(s.id),disabled:f,className:"h-4 w-4 mt-1 cursor-pointer"}),(0,r.jsxs)(Z._,{htmlFor:`option-${s.id}`,className:`text-base cursor-pointer ${f&&e.correctAnswers.includes(s.id)?"font-medium text-green-600 dark:text-green-400":""}`,children:[s.id,". ",s.text]})]},s.id))})}),f&&(0,r.jsxs)($.bZ,{variant:p?"default":"destructive",className:"mt-4",children:[(0,r.jsxs)("div",{className:"flex items-center gap-2",children:[p?r.jsx(E,{className:"h-5 w-5 text-green-500"}):r.jsx(D.Z,{className:"h-5 w-5"}),r.jsx($.Cd,{children:p?"Correct!":"Incorrect"})]}),(0,r.jsxs)($.X,{className:"mt-2 overflow-auto max-h-[300px]",children:[(0,r.jsxs)("div",{className:"mb-2",children:[r.jsx("span",{className:"font-medium",children:"Correct Answer: "}),r.jsx("div",{className:"break-words whitespace-normal",children:e.correctAnswers.join(" and ")})]}),(0,r.jsxs)("div",{className:"mt-2",children:[r.jsx("span",{className:"font-medium",children:"Explanation: "}),r.jsx("div",{className:"break-words whitespace-normal",children:e.explanation})]})]})]})]}),(0,r.jsxs)(l.eW,{className:"flex flex-col gap-4",children:[f?(0,r.jsxs)("div",{className:"flex flex-col sm:flex-row gap-2 w-full",children:[r.jsx(i.z,{onClick:()=>{h(!1),v(!1)},variant:"secondary",className:"w-full sm:w-1/2",children:"Try Again"}),r.jsx(i.z,{onClick:()=>{t()},className:"w-full sm:w-1/2",children:"Next Question"})]}):r.jsx(i.z,{onClick:g,disabled:0===m.length,className:"w-full",children:"Submit Answer"}),(0,r.jsxs)("div",{className:"flex justify-between w-full",children:[(0,r.jsxs)(i.z,{variant:"outline",onClick:()=>n&&n(),disabled:!n,size:"sm",className:"w-1/3",children:[r.jsx(M,{className:"mr-2 h-4 w-4"}),"Previous"]}),r.jsx(i.z,{variant:"outline",onClick:()=>{f?t():g()},size:"sm",className:"w-1/3",disabled:!f&&0===m.length,children:f?(0,r.jsxs)(r.Fragment,{children:["Next",r.jsx(P.Z,{className:"ml-2 h-4 w-4"})]}):"Check Answer"})]})]})]})}},3261:(e,s,t)=>{t.d(s,{Cd:()=>c,X:()=>o,bZ:()=>d});var r=t(326),a=t(7577),l=t(9360),i=t(1223);let n=(0,l.j)("relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",{variants:{variant:{default:"bg-background text-foreground",destructive:"border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"}},defaultVariants:{variant:"default"}}),d=a.forwardRef(({className:e,variant:s,...t},a)=>r.jsx("div",{ref:a,role:"alert",className:(0,i.cn)(n({variant:s}),e),...t}));d.displayName="Alert";let c=a.forwardRef(({className:e,...s},t)=>r.jsx("h5",{ref:t,className:(0,i.cn)("mb-1 font-medium leading-none tracking-tight",e),...s}));c.displayName="AlertTitle";let o=a.forwardRef(({className:e,...s},t)=>r.jsx("div",{ref:t,className:(0,i.cn)("text-sm [&_p]:leading-relaxed",e),...s}));o.displayName="AlertDescription"},4794:(e,s,t)=>{t.d(s,{_:()=>n});var r=t(326),a=t(7577),l=t(4478),i=t(1223);let n=a.forwardRef(({className:e,...s},t)=>r.jsx(l.f,{ref:t,className:(0,i.cn)("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",e),...s}));n.displayName=l.f.displayName},3269:(e,s,t)=>{t.d(s,{E:()=>i});var r=t(326),a=t(7577),l=t(1223);let i=a.forwardRef(({className:e,value:s=0,max:t=100,...a},i)=>r.jsx("div",{ref:i,className:(0,l.cn)("relative h-2 w-full overflow-hidden rounded-full bg-secondary",e),...a,children:r.jsx("div",{className:"h-full w-full flex-1 bg-primary transition-all",style:{transform:`translateX(-${100-s/t*100}%)`}})}));i.displayName="Progress"},4478:(e,s,t)=>{t.d(s,{f:()=>n});var r=t(7577),a=t(5226),l=t(326),i=r.forwardRef((e,s)=>(0,l.jsx)(a.WV.label,{...e,ref:s,onMouseDown:s=>{s.target.closest("button, input, select, textarea")||(e.onMouseDown?.(s),!s.defaultPrevented&&s.detail>1&&s.preventDefault())}}));i.displayName="Label";var n=i},3405:(e,s,t)=>{t.d(s,{D:()=>a});var r=t(7577);function a(e){let s=r.useRef({value:e,previous:e});return r.useMemo(()=>(s.current.value!==e&&(s.current.previous=s.current.value,s.current.value=e),s.current.previous),[e])}},2566:(e,s,t)=>{t.d(s,{t:()=>l});var r=t(7577),a=t(5819);function l(e){let[s,t]=r.useState(void 0);return(0,a.b)(()=>{if(e){t({width:e.offsetWidth,height:e.offsetHeight});let s=new ResizeObserver(s=>{let r,a;if(!Array.isArray(s)||!s.length)return;let l=s[0];if("borderBoxSize"in l){let e=l.borderBoxSize,s=Array.isArray(e)?e[0]:e;r=s.inlineSize,a=s.blockSize}else r=e.offsetWidth,a=e.offsetHeight;t({width:r,height:a})});return s.observe(e,{box:"border-box"}),()=>s.unobserve(e)}t(void 0)},[e]),s}}};