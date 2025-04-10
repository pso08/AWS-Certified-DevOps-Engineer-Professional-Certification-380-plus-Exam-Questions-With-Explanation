"use strict";(()=>{var e={};e.id=748,e.ids=[748],e.modules={20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},84770:e=>{e.exports=require("crypto")},89900:(e,r,t)=>{t.r(r),t.d(r,{originalPathname:()=>h,patchFetch:()=>y,requestAsyncStorage:()=>c,routeModule:()=>p,serverHooks:()=>f,staticGenerationAsyncStorage:()=>m});var s={};t.r(s),t.d(s,{GET:()=>d});var i=t(49303),a=t(88716),o=t(60670),n=t(87070),l=t(76523);let u=[{id:"1",name:"Admin User",email:"admin@example.com",password:"$2a$10$GQH.xZUBHMDqGYCLBZYJL.9Wf.4ZK6lZT5.fP6YH0Ld7x2OTsqULe",isAdmin:!0,hasPaid:!0,emailVerified:!0}];async function d(e){try{let r=e.nextUrl.searchParams.get("token");if(!r)return n.NextResponse.json({error:"Verification token is required"},{status:400});let t=(0,l.qL)(r);if(!t)return n.NextResponse.json({error:"Invalid or expired verification token"},{status:400});let s=u.findIndex(e=>e.email===t);if(-1===s)return n.NextResponse.json({error:"User not found"},{status:404});return u[s].emailVerified=!0,n.NextResponse.json({message:"Email verified successfully"},{status:200})}catch(e){return console.error("Email verification error:",e),n.NextResponse.json({error:"An error occurred during email verification"},{status:500})}}let p=new i.AppRouteRouteModule({definition:{kind:a.x.APP_ROUTE,page:"/api/auth/verify-email/route",pathname:"/api/auth/verify-email",filename:"route",bundlePath:"app/api/auth/verify-email/route"},resolvedPagePath:"/home/ubuntu/workspace/app/cloudflare-production-all-questions/app/api/auth/verify-email/route.ts",nextConfigOutput:"",userland:s}),{requestAsyncStorage:c,staticGenerationAsyncStorage:m,serverHooks:f}=p,h="/api/auth/verify-email/route";function y(){return(0,o.patchFetch)({serverHooks:f,staticGenerationAsyncStorage:m})}},76523:(e,r,t)=>{t.d(r,{Id:()=>u,Jw:()=>d,LS:()=>m,cl:()=>o,qL:()=>n,uE:()=>l,zk:()=>c});var s=t(4673);let i=new Map,a=new Map,o=e=>{let r=(0,s.Z)(),t=new Date;return t.setHours(t.getHours()+24),i.set(r,{email:e,expires:t}),r},n=e=>{let r=i.get(e);if(!r)return null;if(r.expires<new Date)return i.delete(e),null;let{email:t}=r;return i.delete(e),t},l=e=>{let r=(0,s.Z)(),t=new Date;return t.setHours(t.getHours()+1),a.set(r,{email:e,expires:t}),r},u=e=>{let r=a.get(e);return r?r.expires<new Date?(a.delete(e),null):r.email:null},d=e=>{a.delete(e)},p=async(e,r,t)=>(console.log(`Sending email to ${e}`),console.log(`Subject: ${r}`),console.log(`Body: ${t}`),!0),c=async(e,r)=>{let t=`${process.env.NEXT_PUBLIC_APP_URL||"http://localhost:3000"}/auth/verify-email?token=${r}`,s=`
    Please verify your email address by clicking the link below:
    
    ${t}
    
    This link will expire in 24 hours.
    
    If you did not create an account, you can safely ignore this email.
  `;return await p(e,"Verify your email address",s)},m=async(e,r)=>{let t=`${process.env.NEXT_PUBLIC_APP_URL||"http://localhost:3000"}/auth/reset-password?token=${r}`,s=`
    You requested to reset your password. Please click the link below to set a new password:
    
    ${t}
    
    This link will expire in 1 hour.
    
    If you did not request a password reset, you can safely ignore this email.
  `;return await p(e,"Reset your password",s)}}};var r=require("../../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[276,547],()=>t(89900));module.exports=s})();