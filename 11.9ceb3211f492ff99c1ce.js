(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{dSRq:function(t,n,i){"use strict";i.r(n),i.d(n,"BountyBoardPageModule",function(){return h});var o=i("ofXK"),e=i("3Pt+"),b=i("TEn/"),r=i("tyNb"),s=i("fXoL"),u=i("tk/3");function c(t,n){if(1&t&&(s.Mb(0,"ion-list"),s.Mb(1,"ion-item",1),s.Mb(2,"ion-label"),s.Mb(3,"h1"),s.dc(4),s.Lb(),s.Mb(5,"ion-text"),s.dc(6),s.Lb(),s.Lb(),s.Lb(),s.Lb()),2&t){const t=n.$implicit;s.zb(1),s.Yb("routerLink","/bounty-detail/",t.id,""),s.zb(3),s.ec(t.hash),s.zb(2),s.fc("Time Limit: ",t.time,"")}}const a=[{path:"",component:(()=>{class t{constructor(t){this.http=t,this.bounties=[]}ngOnInit(){this.getBounties()}getBounties(){this.http.get("https://muspring2021-bit440.github.io/bounty-hunter-api/api/v1/current_bounties.json").subscribe(t=>{this.bounties=t.current_bounties,localStorage.setItem("current_bounties",JSON.stringify(t.current_bounties))})}}return t.\u0275fac=function(n){return new(n||t)(s.Jb(u.a))},t.\u0275cmp=s.Db({type:t,selectors:[["app-bounty-board"]],decls:6,vars:1,consts:[[4,"ngFor","ngForOf"],[3,"routerLink"]],template:function(t,n){1&t&&(s.Mb(0,"ion-header"),s.Mb(1,"ion-toolbar"),s.Mb(2,"ion-title"),s.dc(3,"Bounty Board"),s.Lb(),s.Lb(),s.Lb(),s.Mb(4,"ion-content"),s.cc(5,c,7,3,"ion-list",0),s.Lb()),2&t&&(s.zb(5),s.Xb("ngForOf",n.bounties))},directives:[b.h,b.o,b.n,b.f,o.h,b.k,b.i,b.r,r.h,b.j,b.m],styles:[""]}),t})()}];let p=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=s.Hb({type:t}),t.\u0275inj=s.Gb({imports:[[r.i.forChild(a)],r.i]}),t})(),h=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=s.Hb({type:t}),t.\u0275inj=s.Gb({imports:[[o.b,e.a,b.p,p]]}),t})()}}]);