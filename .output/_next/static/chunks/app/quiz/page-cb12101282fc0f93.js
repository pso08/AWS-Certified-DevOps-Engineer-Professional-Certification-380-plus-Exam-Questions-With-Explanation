(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[705],{2579:function(e,t,s){Promise.resolve().then(s.bind(s,3094))},3094:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return m}});var l=s(7437),a=s(2265),r=s(2381),n=s(9820),i=s(7204),o=s(7648),c=s(3791),u=s(5486);let d=c.X.map(e=>{let t;let s=Object.entries(e.options).map(e=>{let[t,s]=e;return{id:t,text:s}});return t=e.answer.includes(",")?e.answer.split(",").map(e=>e.trim()):e.answer.includes(" and ")?e.answer.split(" and ").map(e=>e.trim()):[e.answer.trim()],{id:e.id,text:e.question,options:s,correctAnswers:t,explanation:e.explanation,isMultipleAnswer:t.length>1,domain:e.domain,difficulty:e.difficulty}});function m(){let[e,t]=(0,a.useState)(()=>{{let e=localStorage.getItem("quiz_current_question");return e?parseInt(e,10):0}}),[s,c]=(0,a.useState)([]),[m,x]=(0,a.useState)(()=>{{let e=localStorage.getItem("quiz_score");return e?parseInt(e,10):0}}),[h,f]=(0,a.useState)(()=>"true"===localStorage.getItem("quiz_completed"));(0,a.useEffect)(()=>{{let e=localStorage.getItem("quiz_answered_questions");if(e)try{c(JSON.parse(e))}catch(e){console.error("Failed to parse saved answers:",e)}}},[]),(0,a.useEffect)(()=>{s.length>0&&localStorage.setItem("quiz_answered_questions",JSON.stringify(s))},[s]);let g=()=>{t(0),c([]),x(0),f(!1),localStorage.removeItem("quiz_current_question"),localStorage.removeItem("quiz_score"),localStorage.removeItem("quiz_completed"),localStorage.removeItem("quiz_answered_questions")},p=(e+1)/d.length*100,w=s.find(t=>t.questionId===d[e].id),v=(null==w?void 0:w.selectedAnswers)||[];if(h)return(0,l.jsx)("div",{className:"min-h-screen bg-slate-900 text-white flex items-center justify-center p-4",children:(0,l.jsxs)(n.Zb,{className:"w-full max-w-3xl bg-slate-800 border-slate-700 text-white",children:[(0,l.jsxs)(n.Ol,{className:"text-center",children:[(0,l.jsx)(n.ll,{className:"text-3xl",children:"Quiz Completed!"}),(0,l.jsxs)(n.SZ,{className:"text-slate-300 text-lg",children:["You scored ",m," out of ",d.length]})]}),(0,l.jsxs)(n.aY,{className:"space-y-6",children:[(0,l.jsxs)("div",{className:"text-center",children:[(0,l.jsxs)("div",{className:"text-6xl font-bold mb-4",children:[Math.round(m/d.length*100),"%"]}),(0,l.jsx)(i.E,{value:m/d.length*100,className:"h-4 bg-slate-700"})]}),(0,l.jsxs)("div",{className:"bg-slate-700/50 p-6 rounded-lg border border-slate-600",children:[(0,l.jsx)("h3",{className:"text-xl font-semibold mb-3",children:"Performance Summary"}),(0,l.jsx)("p",{className:"text-slate-300",children:m===d.length?"Excellent! You've mastered all the concepts in this quiz.":m>=.7*d.length?"Great job! You have a good understanding of AWS DevOps concepts.":m>=.5*d.length?"Good effort! Review the areas where you made mistakes to improve your knowledge.":"Keep practicing! Review the AWS DevOps concepts and try again."})]})]}),(0,l.jsxs)(n.eW,{className:"flex flex-col sm:flex-row gap-3 justify-center",children:[(0,l.jsx)(r.z,{onClick:g,className:"bg-blue-600 hover:bg-blue-700 w-full sm:w-auto",children:"Restart Quiz"}),(0,l.jsx)(o.default,{href:"/",className:"w-full sm:w-auto",children:(0,l.jsx)(r.z,{variant:"outline",className:"border-slate-600 text-white hover:bg-slate-700 w-full",children:"Back to Home"})})]})]})});let j=d[e];return(0,l.jsx)("div",{className:"min-h-screen bg-slate-900 text-white flex items-center justify-center p-4",children:(0,l.jsxs)("div",{className:"w-full max-w-3xl",children:[(0,l.jsxs)("div",{className:"flex justify-between items-center mb-4",children:[(0,l.jsxs)("div",{className:"text-sm text-slate-400",children:["Question ",e+1," of ",d.length]}),(0,l.jsxs)("div",{className:"flex items-center gap-4",children:[(0,l.jsxs)("div",{className:"text-sm text-slate-400",children:["Score: ",m,"/",d.length]}),(0,l.jsx)(o.default,{href:"/",children:(0,l.jsx)(r.z,{variant:"outline",className:"border-slate-600 text-white hover:bg-slate-700 text-xs py-1 px-2 h-auto",children:"Back to Home"})})]})]}),(0,l.jsx)(i.E,{value:p,className:"h-2 bg-slate-700 mb-6"}),(0,l.jsx)(u.Z,{question:j,onSubmit:(t,l)=>{let a=[...s],r=a.findIndex(t=>t.questionId===d[e].id);if(r>=0?a[r]={questionId:d[e].id,selectedAnswers:l,isCorrect:t}:a.push({questionId:d[e].id,selectedAnswers:l,isCorrect:t}),c(a),t&&(r<0||!s[r].isCorrect)){let e=m+1;x(e),localStorage.setItem("quiz_score",e.toString())}},onNext:()=>{if(e<d.length-1){let s=e+1;t(s),localStorage.setItem("quiz_current_question",s.toString())}else f(!0),localStorage.setItem("quiz_completed","true")},onPrevious:e>0?()=>{if(e>0){let s=e-1;t(s),localStorage.setItem("quiz_current_question",s.toString())}}:void 0,initialSelectedAnswers:v,isAnswered:!!w}),(0,l.jsx)("div",{className:"mt-6 flex justify-center",children:(0,l.jsx)(r.z,{onClick:g,variant:"destructive",className:"w-full sm:w-auto",children:"Reset Quiz"})})]})})}}},function(e){e.O(0,[851,648,773,411,232,971,117,744],function(){return e(e.s=2579)}),_N_E=e.O()}]);