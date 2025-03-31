(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[928],{6946:function(e,s,t){Promise.resolve().then(t.bind(t,3156))},3156:function(e,s,t){"use strict";t.r(s),t.d(s,{default:function(){return R}});var a,l,n,i,r,c,d=t(7437),o=t(2265),m=t(2381),x=t(7648),h=t(3791);(a=i||(i={})).EASY="easy",a.MEDIUM="medium",a.HARD="hard",(l=r||(r={})).SDLC_AUTOMATION="SDLC Automation",l.CONFIG_MANAGEMENT="Configuration Management and Infrastructure as Code",l.MONITORING_LOGGING="Monitoring and Logging",l.POLICIES_STANDARDS="Policies and Standards Automation",l.INCIDENT_RESPONSE="Incident and Event Response",l.HIGH_AVAILABILITY="High Availability, Fault Tolerance, and Disaster Recovery",(n=c||(c={})).FLASHCARD="flashcard",n.QUIZ="quiz",n.TEST="test";var u=t(9820),j=t(7204),f=t(1920),p=t(9763);let b=(0,p.Z)("AlertTriangle",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z",key:"c3ski4"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]),v=(0,p.Z)("Play",[["polygon",{points:"5 3 19 12 5 21 5 3",key:"191637"}]]),g=(0,p.Z)("Pause",[["rect",{width:"4",height:"16",x:"6",y:"4",key:"iffhe4"}],["rect",{width:"4",height:"16",x:"14",y:"4",key:"sjin7j"}]]),N=(0,p.Z)("RotateCw",[["path",{d:"M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8",key:"1p45f6"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}]]),w=(0,p.Z)("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]]);var y=t(5937);let S={[r.SDLC_AUTOMATION]:.22,[r.CONFIG_MANAGEMENT]:.19,[r.MONITORING_LOGGING]:.15,[r.POLICIES_STANDARDS]:.1,[r.INCIDENT_RESPONSE]:.18,[r.HIGH_AVAILABILITY]:.16};function A(e){let{questions:s,onComplete:t,timeLimit:a=180}=e,l=(0,o.useRef)(null),[n,i]=(0,o.useState)([]),[c,x]=(0,o.useState)(0),[h,p]=(0,o.useState)(new Map),[A,C]=(0,o.useState)(60*a),[k,I]=(0,o.useState)(!1),[T,M]=(0,o.useState)(!1),[O,D]=(0,o.useState)(!1),[R,E]=(0,o.useState)(0),[P,_]=(0,o.useState)(!1),[L,Z]=(0,o.useState)(!1);(0,o.useEffect)(()=>{!L&&s.length>0&&(F(),Z(!0))},[s,L]);let F=()=>{let e=new Map;for(let t of Object.values(r))e.set(t,s.filter(e=>e.domain===t));let t=[];for(let[s,a]of Object.entries(S)){let l=e.get(s)||[],n=Math.round(75*a),i=[...l].sort(()=>.5-Math.random()).slice(0,n);t.push(...i)}if(t.length<75){let e=75-t.length,a=[...s],l=new Set(t.map(e=>e.id)),n=[...a.filter(e=>!l.has(e.id))].sort(()=>.5-Math.random()).slice(0,e);t.push(...n)}i(t.slice(0,75).sort(()=>.5-Math.random()))},q=()=>{x(0),p(new Map),C(60*a),I(!1),M(!1),D(!1),E(0),_(!1),F()};(0,o.useEffect)(()=>{if(!P||k||O)return;let e=setInterval(()=>{C(s=>s<=0?(clearInterval(e),G(),0):(600===s&&M(!0),s-1))},1e3);return()=>clearInterval(e)},[P,k,O]);let Q=()=>{c<n.length-1?x(e=>e+1):G()},G=()=>{I(!0);let e=l.current?Math.floor((Date.now()-l.current)/1e3):60*a-A,s=Array.from(h.values()).filter(e=>e.isCorrect).length,i=Array.from(h.values()).filter(e=>!e.isCorrect).length,c=n.length-s-i,d=n.map((e,s)=>{let t=h.get(s);return{questionId:e.id,isCorrect:(null==t?void 0:t.isCorrect)||!1,selectedAnswers:(null==t?void 0:t.selectedAnswers)||[],timeTaken:0,domain:e.domain||r.SDLC_AUTOMATION}}),o=Object.values(r).map(e=>{let s=d.filter(s=>{var t;return(null===(t=n.find(e=>e.id===s.questionId))||void 0===t?void 0:t.domain)===e}),t=s.filter(e=>e.isCorrect).length;return{domain:e,totalQuestions:s.length,correctAnswers:t}});t({totalQuestions:n.length,correctAnswers:s,incorrectAnswers:i,skippedQuestions:c,timeTaken:e,questionResults:d,domainResults:o})},B=h.size/n.length*100;if(!P)return(0,d.jsx)("div",{className:"w-full max-w-4xl mx-auto",children:(0,d.jsxs)(u.Zb,{className:"bg-slate-800 border-slate-700 text-white",children:[(0,d.jsxs)(u.Ol,{children:[(0,d.jsx)(u.ll,{children:"AWS DevOps Professional Practice Test"}),(0,d.jsx)(u.SZ,{className:"text-slate-300",children:"This practice test simulates the actual AWS Certified DevOps Engineer - Professional exam."})]}),(0,d.jsx)(u.aY,{children:(0,d.jsxs)("div",{className:"space-y-4",children:[(0,d.jsxs)("div",{children:[(0,d.jsx)("h3",{className:"text-lg font-semibold",children:"Exam Format"}),(0,d.jsxs)("ul",{className:"list-disc pl-5 mt-2 space-y-1 text-slate-300",children:[(0,d.jsxs)("li",{children:[(0,d.jsx)("strong",{children:"Number of Questions:"})," 75 questions"]}),(0,d.jsxs)("li",{children:[(0,d.jsx)("strong",{children:"Duration:"})," 180 minutes (3 hours)"]}),(0,d.jsxs)("li",{children:[(0,d.jsx)("strong",{children:"Question Types:"})," Multiple choice and multiple answer"]})]})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)("h3",{className:"text-lg font-semibold",children:"Exam Content"}),(0,d.jsx)("p",{className:"text-sm text-slate-400 mb-2",children:"The exam focuses on advanced technical skills and knowledge in the following domains:"}),(0,d.jsxs)("ul",{className:"list-disc pl-5 space-y-1 text-slate-300",children:[(0,d.jsx)("li",{children:"SDLC Automation (22%)"}),(0,d.jsx)("li",{children:"Configuration Management and Infrastructure as Code (19%)"}),(0,d.jsx)("li",{children:"Monitoring and Logging (15%)"}),(0,d.jsx)("li",{children:"Policies and Standards Automation (10%)"}),(0,d.jsx)("li",{children:"Incident and Event Response (18%)"}),(0,d.jsx)("li",{children:"High Availability, Fault Tolerance, and Disaster Recovery (16%)"})]})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)("h3",{className:"text-lg font-semibold",children:"Test Features"}),(0,d.jsxs)("ul",{className:"list-disc pl-5 mt-2 space-y-1 text-slate-300",children:[(0,d.jsxs)("li",{children:[(0,d.jsx)("strong",{children:"Pause/Resume:"})," You can pause the test up to 10 times"]}),(0,d.jsxs)("li",{children:[(0,d.jsx)("strong",{children:"Navigation:"})," You can move back and forth between questions"]}),(0,d.jsxs)("li",{children:[(0,d.jsx)("strong",{children:"Time Tracking:"})," A timer shows your remaining time"]}),(0,d.jsxs)("li",{children:[(0,d.jsx)("strong",{children:"Domain Analysis:"})," Detailed results by domain area"]})]})]}),(0,d.jsxs)(y.bZ,{className:"bg-blue-900/30 border-blue-800 mt-4",children:[(0,d.jsxs)(y.Cd,{className:"flex items-center text-blue-400",children:[(0,d.jsx)(b,{className:"h-4 w-4 mr-2"}),"Important Information"]}),(0,d.jsx)(y.X,{className:"text-slate-300",children:"This test is designed to simulate the real exam experience. Once you start, the timer will begin counting down. You can pause the test if needed, but you are limited to 10 pauses to maintain exam-like conditions."})]})]})}),(0,d.jsx)(u.eW,{className:"flex justify-end",children:(0,d.jsx)(m.Button,{onClick:()=>{_(!0),l.current=Date.now()},className:"bg-blue-600 hover:bg-blue-700",children:"Start Test"})})]})});if(!k&&n.length>0){let e=n[c];return h.get(c),(0,d.jsxs)("div",{className:"w-full max-w-4xl mx-auto",children:[(0,d.jsxs)("div",{className:"mb-4 flex flex-col sm:flex-row justify-between items-center gap-2",children:[(0,d.jsxs)("div",{className:"flex items-center gap-2",children:[(0,d.jsx)(m.Button,{variant:"outline",size:"sm",onClick:()=>{O?D(!1):R<10&&(D(!0),E(e=>e+1))},disabled:R>=10&&!O,className:"border-slate-600 text-white hover:bg-slate-700",children:O?(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(v,{className:"h-4 w-4 mr-2"}),"Resume"]}):(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(g,{className:"h-4 w-4 mr-2"}),"Pause (",10-R," left)"]})}),(0,d.jsxs)(m.Button,{variant:"outline",size:"sm",onClick:q,className:"border-slate-600 text-white hover:bg-slate-700",children:[(0,d.jsx)(N,{className:"h-4 w-4 mr-2"}),"Reset"]})]}),(0,d.jsxs)("div",{className:"flex items-center gap-2",children:[(0,d.jsx)(w,{className:"h-4 w-4 text-slate-400"}),(0,d.jsx)("span",{className:"font-mono ".concat(A<600?"text-red-500":"text-white"),children:"".concat(Math.floor(A/3600).toString().padStart(2,"0"),":").concat(Math.floor(A%3600/60).toString().padStart(2,"0"),":").concat((A%60).toString().padStart(2,"0"))})]})]}),T&&(0,d.jsxs)(y.bZ,{variant:"destructive",className:"mb-4",children:[(0,d.jsx)(AlertCircle,{className:"h-4 w-4"}),(0,d.jsx)(y.Cd,{children:"Time Warning"}),(0,d.jsx)(y.X,{children:"You have less than 10 minutes remaining."})]}),O?(0,d.jsx)(u.Zb,{className:"bg-slate-800 border-slate-700 text-white",children:(0,d.jsxs)(u.aY,{className:"pt-6 flex flex-col items-center justify-center min-h-[400px]",children:[(0,d.jsx)(g,{className:"h-16 w-16 text-slate-400 mb-4"}),(0,d.jsx)("h2",{className:"text-2xl font-bold mb-2",children:"Test Paused"}),(0,d.jsx)("p",{className:"text-slate-300 mb-6 text-center",children:"The timer has been paused. Click Resume to continue the test."}),(0,d.jsxs)(m.Button,{onClick:()=>D(!1),className:"bg-blue-600 hover:bg-blue-700",children:[(0,d.jsx)(v,{className:"h-4 w-4 mr-2"}),"Resume Test"]})]})}):(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)("div",{className:"mb-4",children:[(0,d.jsxs)("div",{className:"flex justify-between items-center mb-1",children:[(0,d.jsxs)("div",{className:"text-sm text-slate-400",children:["Question ",c+1," of ",n.length]}),(0,d.jsxs)("div",{className:"text-sm text-slate-400",children:[h.size," of ",n.length," answered"]})]}),(0,d.jsx)(j.E,{value:B,className:"h-2 bg-slate-700"})]}),(0,d.jsx)(f.Z,{question:e,onSubmit:(e,s)=>{p(t=>{let a=new Map(t);return a.set(c,{isCorrect:e,selectedAnswers:s}),a})},onNext:Q,showTimer:!1}),(0,d.jsxs)("div",{className:"mt-4 flex justify-between",children:[(0,d.jsx)(m.Button,{variant:"outline",onClick:()=>{c>0&&x(e=>e-1)},disabled:0===c,className:"border-slate-600 text-white hover:bg-slate-700",children:"Previous"}),(0,d.jsx)(m.Button,{variant:"outline",onClick:Q,className:"border-slate-600 text-white hover:bg-slate-700",children:c<n.length-1?"Next":"Finish Test"})]})]})]})}return(0,d.jsx)("div",{className:"w-full max-w-4xl mx-auto",children:(0,d.jsx)(u.Zb,{className:"bg-slate-800 border-slate-700 text-white",children:(0,d.jsx)(u.aY,{className:"pt-6",children:(0,d.jsxs)("div",{className:"text-center",children:[(0,d.jsx)("h2",{className:"text-2xl font-bold mb-4",children:"Loading Test..."}),(0,d.jsx)(m.Button,{onClick:q,className:"bg-blue-600 hover:bg-blue-700",children:"Reset Test"})]})})})})}var C=t(8487);let k=(0,p.Z)("Award",[["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}],["path",{d:"M15.477 12.89 17 22l-5-3-5 3 1.523-9.11",key:"em7aur"}]]),I=(0,p.Z)("XCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]]),T=(0,p.Z)("BarChart",[["line",{x1:"12",x2:"12",y1:"20",y2:"10",key:"1vz5eb"}],["line",{x1:"18",x2:"18",y1:"20",y2:"4",key:"cun8e5"}],["line",{x1:"6",x2:"6",y1:"20",y2:"16",key:"hq0ia6"}]]),M=(0,p.Z)("CheckCircle",[["path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14",key:"g774vq"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]);function O(e){var s;let{results:t,onRetake:a,onClose:l}=e,[n,i]=(0,o.useState)("overview"),c=Math.round(t.correctAnswers/t.totalQuestions*100),x=c>=72,h=e=>{let s=t.domainResults.find(s=>s.domain===e);return s&&0!==s.totalQuestions?Math.round(s.correctAnswers/s.totalQuestions*100):0};return(0,d.jsx)("div",{className:"w-full max-w-4xl mx-auto",children:(0,d.jsxs)(u.Zb,{className:"bg-slate-800 border-slate-700 text-white",children:[(0,d.jsx)(u.Ol,{children:(0,d.jsxs)("div",{className:"flex justify-between items-center",children:[(0,d.jsxs)("div",{children:[(0,d.jsx)(u.ll,{children:"Test Results"}),(0,d.jsx)(u.SZ,{className:"text-slate-300",children:"AWS DevOps Professional Practice Test"})]}),(0,d.jsx)("div",{className:"flex items-center gap-2",children:x?(0,d.jsxs)("div",{className:"flex items-center text-green-500",children:[(0,d.jsx)(k,{className:"h-6 w-6 mr-2"}),(0,d.jsx)("span",{className:"font-bold text-xl",children:"PASS"})]}):(0,d.jsxs)("div",{className:"flex items-center text-red-500",children:[(0,d.jsx)(I,{className:"h-6 w-6 mr-2"}),(0,d.jsx)("span",{className:"font-bold text-xl",children:"FAIL"})]})})]})}),(0,d.jsx)(u.aY,{children:(0,d.jsxs)(C.mQ,{value:n,onValueChange:i,children:[(0,d.jsxs)(C.dr,{className:"grid grid-cols-3 mb-6 bg-slate-700",children:[(0,d.jsxs)(C.SP,{value:"overview",className:"flex items-center gap-2 data-[state=active]:bg-slate-600",children:[(0,d.jsx)(k,{className:"h-4 w-4"}),(0,d.jsx)("span",{children:"Overview"})]}),(0,d.jsxs)(C.SP,{value:"domains",className:"flex items-center gap-2 data-[state=active]:bg-slate-600",children:[(0,d.jsx)(T,{className:"h-4 w-4"}),(0,d.jsx)("span",{children:"Domain Analysis"})]}),(0,d.jsxs)(C.SP,{value:"details",className:"flex items-center gap-2 data-[state=active]:bg-slate-600",children:[(0,d.jsx)(M,{className:"h-4 w-4"}),(0,d.jsx)("span",{children:"Question Details"})]})]}),(0,d.jsx)(C.nU,{value:"overview",children:(0,d.jsxs)("div",{className:"space-y-6",children:[(0,d.jsxs)("div",{className:"text-center",children:[(0,d.jsxs)("div",{className:"text-5xl font-bold mb-2",children:[c,"%"]}),(0,d.jsx)("div",{className:"text-slate-400",children:"Overall Score"})]}),(0,d.jsx)(j.E,{value:c,className:"h-4 bg-slate-700"}),(0,d.jsxs)("div",{className:"grid grid-cols-2 gap-4 mt-6",children:[(0,d.jsxs)("div",{className:"bg-slate-700/50 rounded-lg p-4 text-center",children:[(0,d.jsxs)("div",{className:"flex justify-center items-center mb-2",children:[(0,d.jsx)(M,{className:"h-5 w-5 text-green-500 mr-2"}),(0,d.jsx)("span",{className:"text-xl font-semibold",children:t.correctAnswers})]}),(0,d.jsx)("div",{className:"text-sm text-slate-400",children:"Correct Answers"})]}),(0,d.jsxs)("div",{className:"bg-slate-700/50 rounded-lg p-4 text-center",children:[(0,d.jsxs)("div",{className:"flex justify-center items-center mb-2",children:[(0,d.jsx)(I,{className:"h-5 w-5 text-red-500 mr-2"}),(0,d.jsx)("span",{className:"text-xl font-semibold",children:t.incorrectAnswers})]}),(0,d.jsx)("div",{className:"text-sm text-slate-400",children:"Incorrect Answers"})]}),(0,d.jsxs)("div",{className:"bg-slate-700/50 rounded-lg p-4 text-center",children:[(0,d.jsxs)("div",{className:"flex justify-center items-center mb-2",children:[(0,d.jsx)(w,{className:"h-5 w-5 text-blue-500 mr-2"}),(0,d.jsx)("span",{className:"text-xl font-semibold",children:(s=t.timeTaken,"".concat(Math.floor(s/3600).toString().padStart(2,"0"),":").concat(Math.floor(s%3600/60).toString().padStart(2,"0"),":").concat((s%60).toString().padStart(2,"0")))})]}),(0,d.jsx)("div",{className:"text-sm text-slate-400",children:"Time Taken"})]}),(0,d.jsxs)("div",{className:"bg-slate-700/50 rounded-lg p-4 text-center",children:[(0,d.jsx)("div",{className:"text-xl font-semibold mb-2",children:t.skippedQuestions}),(0,d.jsx)("div",{className:"text-sm text-slate-400",children:"Skipped Questions"})]})]}),(0,d.jsxs)("div",{className:"mt-6 bg-slate-700/30 p-4 rounded-lg border border-slate-600",children:[(0,d.jsx)("h3",{className:"text-lg font-semibold mb-2",children:"Passing Score Information"}),(0,d.jsxs)("p",{className:"text-sm text-slate-300",children:["The AWS Certified DevOps Engineer - Professional exam typically requires a score of approximately 72-75% to pass. Your score of ",c,"% is",x?" above ":" below ","the typical passing threshold."]})]})]})}),(0,d.jsx)(C.nU,{value:"domains",children:(0,d.jsxs)("div",{className:"space-y-6",children:[(0,d.jsx)("h3",{className:"text-lg font-semibold mb-4",children:"Domain Performance"}),(0,d.jsx)("div",{className:"space-y-4",children:Object.values(r).map(e=>{let s=t.domainResults.find(s=>s.domain===e),a=h(e),l=a<70;return(0,d.jsxs)("div",{className:"space-y-2",children:[(0,d.jsxs)("div",{className:"flex justify-between items-center",children:[(0,d.jsx)("div",{className:"text-sm font-medium",children:e}),(0,d.jsxs)("div",{className:"text-sm font-medium",children:[a,"%"]})]}),(0,d.jsx)(j.E,{value:a,className:l?"h-2 bg-red-900/30":"h-2 bg-slate-700"}),(0,d.jsxs)("div",{className:"flex justify-between text-xs text-slate-400",children:[(0,d.jsxs)("div",{children:[(null==s?void 0:s.correctAnswers)||0," of ",(null==s?void 0:s.totalQuestions)||0," correct"]}),l&&(0,d.jsx)("div",{className:"text-red-400 font-medium",children:"Needs improvement"})]})]},e)})}),(0,d.jsxs)("div",{className:"mt-6 p-4 bg-slate-700/30 rounded-lg border border-slate-600",children:[(0,d.jsx)("h4",{className:"font-semibold mb-2",children:"Recommended Focus Areas"}),(0,d.jsxs)("ul",{className:"list-disc pl-5 space-y-1",children:[Object.values(r).filter(e=>70>h(e)).map(e=>(0,d.jsxs)("li",{className:"text-sm text-slate-300",children:[e," - ",h(e),"%"]},e)),0===Object.values(r).filter(e=>70>h(e)).length&&(0,d.jsx)("li",{className:"text-sm text-green-400",children:"Great job! You performed well across all domains."})]})]})]})}),(0,d.jsx)(C.nU,{value:"details",children:(0,d.jsxs)("div",{className:"space-y-4",children:[(0,d.jsx)("h3",{className:"text-lg font-semibold mb-2",children:"Question Details"}),(0,d.jsx)("div",{className:"overflow-auto max-h-96 border border-slate-600 rounded-lg",children:(0,d.jsxs)("table",{className:"min-w-full divide-y divide-slate-600",children:[(0,d.jsx)("thead",{className:"bg-slate-700",children:(0,d.jsxs)("tr",{children:[(0,d.jsx)("th",{className:"px-4 py-2 text-left text-xs font-medium text-slate-400 uppercase tracking-wider",children:"#"}),(0,d.jsx)("th",{className:"px-4 py-2 text-left text-xs font-medium text-slate-400 uppercase tracking-wider",children:"Domain"}),(0,d.jsx)("th",{className:"px-4 py-2 text-left text-xs font-medium text-slate-400 uppercase tracking-wider",children:"Result"})]})}),(0,d.jsx)("tbody",{className:"divide-y divide-slate-600",children:t.questionResults.map((e,s)=>(0,d.jsxs)("tr",{children:[(0,d.jsx)("td",{className:"px-4 py-2 whitespace-nowrap text-sm",children:s+1}),(0,d.jsx)("td",{className:"px-4 py-2 whitespace-nowrap text-sm",children:e.domain}),(0,d.jsx)("td",{className:"px-4 py-2 whitespace-nowrap",children:e.isCorrect?(0,d.jsxs)("span",{className:"inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-900/30 text-green-400",children:[(0,d.jsx)(M,{className:"h-3 w-3 mr-1"}),"Correct"]}):e.selectedAnswers.length>0?(0,d.jsxs)("span",{className:"inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-900/30 text-red-400",children:[(0,d.jsx)(I,{className:"h-3 w-3 mr-1"}),"Incorrect"]}):(0,d.jsx)("span",{className:"inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-700 text-slate-300",children:"Skipped"})})]},e.questionId))})]})})]})})]})}),(0,d.jsxs)(u.eW,{className:"flex justify-between",children:[(0,d.jsx)(m.Button,{variant:"outline",onClick:l,className:"border-slate-600 text-white hover:bg-slate-700",children:"Return to Dashboard"}),(0,d.jsx)(m.Button,{onClick:a,className:"bg-blue-600 hover:bg-blue-700",children:"Retake Test"})]})]})})}let D=h.X.map(e=>{let s=Object.entries(e.options).map(e=>{let[s,t]=e;return{id:s,text:t}}),t=e.answer.split(",").map(e=>e.trim());return{id:e.id,text:e.question,options:s,correctAnswers:t,explanation:e.explanation,isMultipleAnswer:t.length>1,domain:Object.values(r)[Math.floor(Math.random()*Object.values(r).length)],difficulty:Object.values(i)[Math.floor(Math.random()*Object.values(i).length)]}});function R(){let[e,s]=(0,o.useState)(null),[t,a]=(0,o.useState)(!1);return(0,o.useEffect)(()=>{{let e="true"===localStorage.getItem("test_completed"),t=localStorage.getItem("test_results");e&&t&&(s(JSON.parse(t)),a(!0))}},[]),(0,d.jsx)("div",{className:"min-h-screen bg-slate-900 text-white flex items-center justify-center p-4",children:t&&e?(0,d.jsx)(O,{results:e,onRetake:()=>{s(null),a(!1),localStorage.removeItem("test_results"),localStorage.removeItem("test_completed")},onClose:()=>{}}):(0,d.jsxs)("div",{className:"w-full",children:[(0,d.jsxs)("div",{className:"mb-6 flex justify-between items-center",children:[(0,d.jsx)("h1",{className:"text-2xl font-bold",children:"AWS DevOps Professional Test Mode"}),(0,d.jsx)(x.default,{href:"/",children:(0,d.jsx)(m.Button,{variant:"outline",className:"border-slate-600 text-white hover:bg-slate-700",children:"Back to Home"})})]}),(0,d.jsx)(A,{questions:D,onComplete:e=>{s(e),a(!0),localStorage.setItem("test_results",JSON.stringify(e)),localStorage.setItem("test_completed","true")},timeLimit:180})]})})}},8487:function(e,s,t){"use strict";t.d(s,{mQ:function(){return T},nU:function(){return D},dr:function(){return M},SP:function(){return O}});var a=t(7437),l=t(2265),n=t(6741),i=t(3966),r=t(8838),c=t(1599),d=t(6840),o=t(9114),m=t(886),x=t(9255),h="Tabs",[u,j]=(0,i.b)(h,[r.Pc]),f=(0,r.Pc)(),[p,b]=u(h),v=l.forwardRef((e,s)=>{let{__scopeTabs:t,value:l,onValueChange:n,defaultValue:i,orientation:r="horizontal",dir:c,activationMode:h="automatic",...u}=e,j=(0,o.gm)(c),[f,b]=(0,m.T)({prop:l,onChange:n,defaultProp:i});return(0,a.jsx)(p,{scope:t,baseId:(0,x.M)(),value:f,onValueChange:b,orientation:r,dir:j,activationMode:h,children:(0,a.jsx)(d.WV.div,{dir:j,"data-orientation":r,...u,ref:s})})});v.displayName=h;var g="TabsList",N=l.forwardRef((e,s)=>{let{__scopeTabs:t,loop:l=!0,...n}=e,i=b(g,t),c=f(t);return(0,a.jsx)(r.fC,{asChild:!0,...c,orientation:i.orientation,dir:i.dir,loop:l,children:(0,a.jsx)(d.WV.div,{role:"tablist","aria-orientation":i.orientation,...n,ref:s})})});N.displayName=g;var w="TabsTrigger",y=l.forwardRef((e,s)=>{let{__scopeTabs:t,value:l,disabled:i=!1,...c}=e,o=b(w,t),m=f(t),x=C(o.baseId,l),h=k(o.baseId,l),u=l===o.value;return(0,a.jsx)(r.ck,{asChild:!0,...m,focusable:!i,active:u,children:(0,a.jsx)(d.WV.button,{type:"button",role:"tab","aria-selected":u,"aria-controls":h,"data-state":u?"active":"inactive","data-disabled":i?"":void 0,disabled:i,id:x,...c,ref:s,onMouseDown:(0,n.M)(e.onMouseDown,e=>{i||0!==e.button||!1!==e.ctrlKey?e.preventDefault():o.onValueChange(l)}),onKeyDown:(0,n.M)(e.onKeyDown,e=>{[" ","Enter"].includes(e.key)&&o.onValueChange(l)}),onFocus:(0,n.M)(e.onFocus,()=>{let e="manual"!==o.activationMode;u||i||!e||o.onValueChange(l)})})})});y.displayName=w;var S="TabsContent",A=l.forwardRef((e,s)=>{let{__scopeTabs:t,value:n,forceMount:i,children:r,...o}=e,m=b(S,t),x=C(m.baseId,n),h=k(m.baseId,n),u=n===m.value,j=l.useRef(u);return l.useEffect(()=>{let e=requestAnimationFrame(()=>j.current=!1);return()=>cancelAnimationFrame(e)},[]),(0,a.jsx)(c.z,{present:i||u,children:t=>{let{present:l}=t;return(0,a.jsx)(d.WV.div,{"data-state":u?"active":"inactive","data-orientation":m.orientation,role:"tabpanel","aria-labelledby":x,hidden:!l,id:h,tabIndex:0,...o,ref:s,style:{...e.style,animationDuration:j.current?"0s":void 0},children:l&&r})}})});function C(e,s){return"".concat(e,"-trigger-").concat(s)}function k(e,s){return"".concat(e,"-content-").concat(s)}A.displayName=S;var I=t(3448);let T=v,M=l.forwardRef((e,s)=>{let{className:t,...l}=e;return(0,a.jsx)(N,{ref:s,className:(0,I.cn)("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",t),...l})});M.displayName=N.displayName;let O=l.forwardRef((e,s)=>{let{className:t,...l}=e;return(0,a.jsx)(y,{ref:s,className:(0,I.cn)("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",t),...l})});O.displayName=y.displayName;let D=l.forwardRef((e,s)=>{let{className:t,...l}=e;return(0,a.jsx)(A,{ref:s,className:(0,I.cn)("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",t),...l})});D.displayName=A.displayName}},function(e){e.O(0,[851,972,614,729,411,670,971,117,744],function(){return e(e.s=6946)}),_N_E=e.O()}]);