(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{406:function(e,t,r){"use strict";r.d(t,"a",(function(){return o})),r.d(t,"c",(function(){return c})),r.d(t,"b",(function(){return l}));var n=new(r(407).b);n.triggerOnSubscribe();var o=n.getActions(),c=n.getStore(),l=n.getNotifications()},453:function(e,t,r){e.exports=function(){"use strict";var e=1e3,t=6e4,r=36e5,n="millisecond",i="second",s="minute",u="hour",a="day",o="week",c="month",l="quarter",d="year",h="date",f="Invalid Date",v=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,m=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,w={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(e){var t=["th","st","nd","rd"],r=e%100;return"["+e+(t[(r-20)%10]||t[r]||t[0])+"]"}},x=function(e,t,r){var n=String(e);return!n||n.length>=t?e:""+Array(t+1-n.length).join(r)+e},S={s:x,z:function(e){var t=-e.utcOffset(),r=Math.abs(t),n=Math.floor(r/60),i=r%60;return(t<=0?"+":"-")+x(n,2,"0")+":"+x(i,2,"0")},m:function e(t,r){if(t.date()<r.date())return-e(r,t);var n=12*(r.year()-t.year())+(r.month()-t.month()),i=t.clone().add(n,c),s=r-i<0,u=t.clone().add(n+(s?-1:1),c);return+(-(n+(r-i)/(s?i-u:u-i))||0)},a:function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},p:function(e){return{M:c,y:d,w:o,d:a,D:h,h:u,m:s,s:i,ms:n,Q:l}[e]||String(e||"").toLowerCase().replace(/s$/,"")},u:function(e){return void 0===e}},g="en",C={};C[g]=w;var p="$isDayjsObject",$=function(e){return e instanceof k||!(!e||!e[p])},_=function e(t,r,n){var i;if(!t)return g;if("string"==typeof t){var s=t.toLowerCase();C[s]&&(i=s),r&&(C[s]=r,i=s);var u=t.split("-");if(!i&&u.length>1)return e(u[0])}else{var a=t.name;C[a]=t,i=a}return!n&&i&&(g=i),i||!n&&g},y=function(e,t){if($(e))return e.clone();var r="object"==typeof t?t:{};return r.date=e,r.args=arguments,new k(r)},b=S;b.l=_,b.i=$,b.w=function(e,t){return y(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var k=function(){function w(e){this.$L=_(e.locale,null,!0),this.parse(e),this.$x=this.$x||e.x||{},this[p]=!0}var x=w.prototype;return x.parse=function(e){this.$d=function(e){var t=e.date,r=e.utc;if(null===t)return new Date(NaN);if(b.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var n=t.match(v);if(n){var i=n[2]-1||0,s=(n[7]||"0").substring(0,3);return r?new Date(Date.UTC(n[1],i,n[3]||1,n[4]||0,n[5]||0,n[6]||0,s)):new Date(n[1],i,n[3]||1,n[4]||0,n[5]||0,n[6]||0,s)}}return new Date(t)}(e),this.init()},x.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},x.$utils=function(){return b},x.isValid=function(){return!(this.$d.toString()===f)},x.isSame=function(e,t){var r=y(e);return this.startOf(t)<=r&&r<=this.endOf(t)},x.isAfter=function(e,t){return y(e)<this.startOf(t)},x.isBefore=function(e,t){return this.endOf(t)<y(e)},x.$g=function(e,t,r){return b.u(e)?this[t]:this.set(r,e)},x.unix=function(){return Math.floor(this.valueOf()/1e3)},x.valueOf=function(){return this.$d.getTime()},x.startOf=function(e,t){var r=this,n=!!b.u(t)||t,l=b.p(e),f=function(e,t){var i=b.w(r.$u?Date.UTC(r.$y,t,e):new Date(r.$y,t,e),r);return n?i:i.endOf(a)},v=function(e,t){return b.w(r.toDate()[e].apply(r.toDate("s"),(n?[0,0,0,0]:[23,59,59,999]).slice(t)),r)},m=this.$W,w=this.$M,x=this.$D,S="set"+(this.$u?"UTC":"");switch(l){case d:return n?f(1,0):f(31,11);case c:return n?f(1,w):f(0,w+1);case o:var g=this.$locale().weekStart||0,C=(m<g?m+7:m)-g;return f(n?x-C:x+(6-C),w);case a:case h:return v(S+"Hours",0);case u:return v(S+"Minutes",1);case s:return v(S+"Seconds",2);case i:return v(S+"Milliseconds",3);default:return this.clone()}},x.endOf=function(e){return this.startOf(e,!1)},x.$set=function(e,t){var r,o=b.p(e),l="set"+(this.$u?"UTC":""),f=(r={},r[a]=l+"Date",r[h]=l+"Date",r[c]=l+"Month",r[d]=l+"FullYear",r[u]=l+"Hours",r[s]=l+"Minutes",r[i]=l+"Seconds",r[n]=l+"Milliseconds",r)[o],v=o===a?this.$D+(t-this.$W):t;if(o===c||o===d){var m=this.clone().set(h,1);m.$d[f](v),m.init(),this.$d=m.set(h,Math.min(this.$D,m.daysInMonth())).$d}else f&&this.$d[f](v);return this.init(),this},x.set=function(e,t){return this.clone().$set(e,t)},x.get=function(e){return this[b.p(e)]()},x.add=function(n,l){var h,f=this;n=Number(n);var v=b.p(l),m=function(e){var t=y(f);return b.w(t.date(t.date()+Math.round(e*n)),f)};if(v===c)return this.set(c,this.$M+n);if(v===d)return this.set(d,this.$y+n);if(v===a)return m(1);if(v===o)return m(7);var w=(h={},h[s]=t,h[u]=r,h[i]=e,h)[v]||1,x=this.$d.getTime()+n*w;return b.w(x,this)},x.subtract=function(e,t){return this.add(-1*e,t)},x.format=function(e){var t=this,r=this.$locale();if(!this.isValid())return r.invalidDate||f;var n=e||"YYYY-MM-DDTHH:mm:ssZ",i=b.z(this),s=this.$H,u=this.$m,a=this.$M,o=r.weekdays,c=r.months,l=r.meridiem,d=function(e,r,i,s){return e&&(e[r]||e(t,n))||i[r].slice(0,s)},h=function(e){return b.s(s%12||12,e,"0")},v=l||function(e,t,r){var n=e<12?"AM":"PM";return r?n.toLowerCase():n};return n.replace(m,(function(e,n){return n||function(e){switch(e){case"YY":return String(t.$y).slice(-2);case"YYYY":return b.s(t.$y,4,"0");case"M":return a+1;case"MM":return b.s(a+1,2,"0");case"MMM":return d(r.monthsShort,a,c,3);case"MMMM":return d(c,a);case"D":return t.$D;case"DD":return b.s(t.$D,2,"0");case"d":return String(t.$W);case"dd":return d(r.weekdaysMin,t.$W,o,2);case"ddd":return d(r.weekdaysShort,t.$W,o,3);case"dddd":return o[t.$W];case"H":return String(s);case"HH":return b.s(s,2,"0");case"h":return h(1);case"hh":return h(2);case"a":return v(s,u,!0);case"A":return v(s,u,!1);case"m":return String(u);case"mm":return b.s(u,2,"0");case"s":return String(t.$s);case"ss":return b.s(t.$s,2,"0");case"SSS":return b.s(t.$ms,3,"0");case"Z":return i}return null}(e)||i.replace(":","")}))},x.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},x.diff=function(n,h,f){var v,m=this,w=b.p(h),x=y(n),S=(x.utcOffset()-this.utcOffset())*t,g=this-x,C=function(){return b.m(m,x)};switch(w){case d:v=C()/12;break;case c:v=C();break;case l:v=C()/3;break;case o:v=(g-S)/6048e5;break;case a:v=(g-S)/864e5;break;case u:v=g/r;break;case s:v=g/t;break;case i:v=g/e;break;default:v=g}return f?v:b.a(v)},x.daysInMonth=function(){return this.endOf(c).$D},x.$locale=function(){return C[this.$L]},x.locale=function(e,t){if(!e)return this.$L;var r=this.clone(),n=_(e,t,!0);return n&&(r.$L=n),r},x.clone=function(){return b.w(this.$d,this)},x.toDate=function(){return new Date(this.valueOf())},x.toJSON=function(){return this.isValid()?this.toISOString():null},x.toISOString=function(){return this.$d.toISOString()},x.toString=function(){return this.$d.toUTCString()},w}(),M=k.prototype;return y.prototype=M,[["$ms",n],["$s",i],["$m",s],["$H",u],["$W",a],["$M",c],["$y",d],["$D",h]].forEach((function(e){M[e[1]]=function(t){return this.$g(t,e[0],e[1])}})),y.extend=function(e,t){return e.$i||(e(t,k,y),e.$i=!0),y},y.locale=_,y.isDayjs=$,y.unix=function(e){return y(1e3*e)},y.en=C[g],y.Ls=C,y.p={},y}()},462:function(e,t){},463:function(e,t){},681:function(e,t,r){"use strict";r.r(t);r(51);var n=r(10),o=(r(20),r(40),r(71),r(456)),c=r(453),l=r.n(c),d=r(407),h=r(406),f={name:"Join",data:function(){return{allPeers:[],videoRefs:{},remotePeerProps:{},isAudioEnabled:h.c.getState(d.j),isVideoEnabled:h.c.getState(d.m),MediaState:{isAudioEnabled:"isAudioEnabled",isVideoEnabled:"isVideoEnabled"},sendValue:"",messageList:[],isScreenShareEnabled:h.c.getState(d.l),isRecording:!1,isLive:!1,virtualBackground:null,isVirtualBackgroundEnabled:!1,isSomeoneScreenSharing:!1,isChat:!1,isList:!1}},computed:{},mounted:function(){this.virtualBackground=new o.a("blur"),this.virtualBackground.init(),h.c.subscribe(this.renderPeers,d.z),h.c.subscribe(this.onAudioChange,d.j),h.c.subscribe(this.onVideoChange,d.m),h.c.subscribe(this.onScreenShareChange,d.l),h.c.subscribe(this.onIsScreenShare,d.q),h.c.subscribe(this.renderMessages,d.h),h.c.subscribe(this.updateHLSState,d.g),h.c.subscribe(this.recordingState,d.C)},beforeUnmount:function(){this.allPeers.length&&this.leaveMeeting()},methods:{renderMessages:function(e){var t=this;this.isChat&&(this.messageList=e,this.allPeers.length&&this.$nextTick((function(){var e=t.$refs.messagescroll;e.scrollTo({top:e.scrollHeight,behavior:"smooth"})})))},onSendBroadcastMessage:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.sendValue){t.next=2;break}return t.abrupt("return");case 2:return t.next=4,h.a.sendBroadcastMessage(e.sendValue);case 4:e.sendValue="";case 5:case"end":return t.stop()}}),t)})))()},updateHLSState:function(e){this.isLive=e.running},recordingState:function(e){this.isRecording=e.browser.running},toggleLive:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!e.isLive){t.next=6;break}return t.next=3,h.a.stopHLSStreaming();case 3:e.isLive=!1,t.next=17;break;case 6:return(r={variants:[{meetingURL:"https://hongqiang12-videoconf-1038.app.100ms.live/meeting",metadata:"landscape"}]}).recording={singleFilePerLayer:!0,hlsVod:!1},t.prev=8,t.next=11,h.a.startHLSStreaming(r);case 11:e.isLive=!0,t.next=17;break;case 14:t.prev=14,t.t0=t.catch(8),console.error("failed to start hls",t.t0);case 17:case"end":return t.stop()}}),t,null,[[8,14]])})))()},toggleRTMPOrRecording:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!e.isRecording){t.next=6;break}return t.next=3,h.a.stopRTMPAndRecording();case 3:e.isRecording=!1,t.next=10;break;case 6:return r={meetingURL:"https://hongqiang12-videoconf-1038.app.100ms.live/meeting",rtmpURLs:[],record:!0},t.next=9,h.a.startRTMPOrRecording(r);case 9:e.isRecording=!0;case 10:h.c.getState(d.C);case 11:case"end":return t.stop()}}),t)})))()},toggleScreenShare:function(){return Object(n.a)(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=h.c.getState(d.l),e.next=3,h.a.setScreenShareEnabled(!t);case 3:case"end":return e.stop()}}),e)})))()},toggleAudio:function(){return Object(n.a)(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=h.c.getState(d.j),e.next=3,h.a.setLocalAudioEnabled(!t);case 3:case"end":return e.stop()}}),e)})))()},toggleVideo:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=h.c.getState(d.m),t.next=3,h.a.setLocalVideoEnabled(!r);case 3:e.renderPeers(h.c.getState(d.z));case 4:case"end":return t.stop()}}),t)})))()},renderPeers:function(e){var t=this;this.allPeers=e,e.forEach((function(e){console.log(e),t.videoRefs[e.id]&&(h.a.attachVideo(e.videoTrack,t.videoRefs[e.id]),e.isLocal||(t.remotePeerProps[e.id]||(t.remotePeerProps[e.id]={}),t.remotePeerProps[e.id][t.MediaState.isAudioEnabled]=h.c.getState(Object(d.o)(e.id)),t.remotePeerProps[e.id][t.MediaState.isVideoEnabled]=h.c.getState(Object(d.p)(e.id)),h.c.subscribe((function(r){return t.onPeerAudioChange(r,e.id)}),Object(d.o)(e.id)),h.c.subscribe((function(r){return t.onPeerVideoChange(r,e.id)}),Object(d.p)(e.id))))}))},onPeerAudioChange:function(e,t){this.videoRefs[t]&&(this.remotePeerProps[t][this.MediaState.isAudioEnabled]=e)},onPeerVideoChange:function(e,t){this.videoRefs[t]&&(this.remotePeerProps[t][this.MediaState.isVideoEnabled]=e)},onAudioChange:function(e){this.isAudioEnabled=e},onVideoChange:function(e){this.isVideoEnabled=e},onScreenShareChange:function(e){this.isScreenShareEnabled=e},onIsScreenShare:function(e){var t=this;this.isSomeoneScreenSharing=e,e&&this.$nextTick((function(){var e=h.c.getState(d.y),r=h.c.getState(Object(d.F)(e.id)),element=t.$refs.screenSharing;e&&h.a.attachVideo(r.id,element)}))},leaveMeeting:function(){h.a.leave()},dateTimeFormat:function(e){try{return l()(e).format("h:m")}catch(e){return""}},toggleVB:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(r=h.c.getState(Object(d.n)(e.virtualBackground.getName())),t.prev=1,r){t.next=8;break}return 15,t.next=6,h.a.addPluginToVideoTrack(e.virtualBackground,15);case 6:t.next=10;break;case 8:return t.next=10,h.a.removePluginFromVideoTrack(e.virtualBackground);case 10:e.isVirtualBackgroundEnabled=!r,t.next=16;break;case 13:t.prev=13,t.t0=t.catch(1),console.log("failed to set virtual background -",t.t0);case 16:case"end":return t.stop()}}),t,null,[[1,13]])})))()}}},v=r(50),component=Object(v.a)(f,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"relative h-[100vh] py-5 px-5"},[e.isSomeoneScreenSharing?t("div",{staticClass:"w-[600px] h-[400px]"},[t("video",{ref:"screenSharing",staticClass:"h-full w-full object-cover",attrs:{autoplay:"",playsinline:""}})]):e._e(),e._v(" "),t("div",{staticClass:"flex gap-2"},[t("div",{staticClass:"flex-1 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-3 my-6"},e._l(e.allPeers,(function(r){var n,o,c;return t("div",{key:r.id,staticClass:"relative h-[20rem]"},[t("video",{ref:function(t){t&&(e.videoRefs[r.id]=t)},refInFor:!0,staticClass:"h-full w-full object-cover",attrs:{autoplay:"",playsinline:""},domProps:{muted:r.isLocal}}),e._v(" "),t("p",{staticClass:"flex justify-center items-center py-1 px-2 text-sm font-medium bg-black bg-opacity-80 text-white pointer-events-none absolute bottom-0 left-0"},[t("span",{directives:[{name:"show",rawName:"v-show",value:r.isLocal&&e.isAudioEnabled||!r.isLocal&&(null===(n=e.remotePeerProps)||void 0===n||null===(n=n[r.id])||void 0===n?void 0:n[e.MediaState.isAudioEnabled]),expression:"\n              (peer.isLocal && isAudioEnabled) ||\n              (!peer.isLocal &&\n                remotePeerProps?.[peer.id]?.[MediaState.isAudioEnabled])\n            "}],staticClass:"inline-block w-6"},[t("svg",{attrs:{viewBox:"0 0 32 32",xmlns:"http://www.w3.org/2000/svg"}},[t("path",{attrs:{stroke:"#FFF",fill:"#FFF",d:"m23 14v3a7 7 0 0 1 -14 0v-3h-2v3a9 9 0 0 0 8 8.94v2.06h-4v2h10v-2h-4v-2.06a9 9 0 0 0 8-8.94v-3z"}}),e._v(" "),t("path",{attrs:{stroke:"#FFF",fill:"#FFF",d:"m16 22a5 5 0 0 0 5-5v-10a5 5 0 0 0 -10 0v10a5 5 0 0 0 5 5z"}}),e._v(" "),t("path",{attrs:{d:"m0 0h32v32h-32z",fill:"none"}})])]),e._v(" "),t("span",{directives:[{name:"show",rawName:"v-show",value:r.isLocal&&!e.isAudioEnabled||!r.isLocal&&!(null!==(o=e.remotePeerProps)&&void 0!==o&&null!==(o=o[r.id])&&void 0!==o&&o[e.MediaState.isAudioEnabled]),expression:"\n              (peer.isLocal && !isAudioEnabled) ||\n              (!peer.isLocal &&\n                !remotePeerProps?.[peer.id]?.[MediaState.isAudioEnabled])\n            "}],staticClass:"inline-block w-6"},[t("svg",{attrs:{viewBox:"0 0 32 32",xmlns:"http://www.w3.org/2000/svg"}},[t("path",{attrs:{fill:"#FFF",d:"m23 17a7 7 0 0 1 -11.73 5.14l1.42-1.41a5 5 0 0 0 8.31-3.73v-4.58l9-9-1.41-1.42-26.59 26.59 1.41 1.41 6.44-6.44a8.91 8.91 0 0 0 5.15 2.38v2.06h-4v2h10v-2h-4v-2.06a9 9 0 0 0 8-8.94v-3h-2z"}}),e._v(" "),t("path",{attrs:{fill:"#FFF",d:"m9 17.32c0-.11 0-.21 0-.32v-3h-2v3a9 9 0 0 0 .25 2.09z"}}),e._v(" "),t("path",{attrs:{fill:"#FFF",d:"m20.76 5.58a5 5 0 0 0 -9.76 1.42v8.34z"}}),e._v(" "),t("path",{attrs:{d:"m0 0h32v32h-32z",fill:"none"}})])]),e._v(" "),t("span",{staticClass:"inline-block"},[e._v("\n            "+e._s(r.isLocal?"You (".concat(r.name,")"):r.name))])]),e._v(" "),t("p",{directives:[{name:"show",rawName:"v-show",value:r.isLocal&&!e.isVideoEnabled||!r.isLocal&&!(null!==(c=e.remotePeerProps)&&void 0!==c&&null!==(c=c[r.id])&&void 0!==c&&c[e.MediaState.isVideoEnabled]),expression:"\n            (peer.isLocal && !isVideoEnabled) ||\n            (!peer.isLocal &&\n              !remotePeerProps?.[peer.id]?.[MediaState.isVideoEnabled])\n          "}],staticClass:"text-white text-center absolute top-1/2 right-0 left-0"},[e._v("\n          Camera Off\n        ")])])})),0),e._v(" "),e.isChat||e.isList?t("div",{staticClass:"w-[25rem] p-5 relative h-[50rem] flex flex-col bg-[#11131A] rounded"},[t("div",{staticClass:"flex mb-5 items-center gap-3"},[t("div",{staticClass:"flex-1 p-1 flex text-[#8F9099] bg-[#191B23] rounded"},[t("div",{staticClass:"w-1/2 h-9 flex items-center justify-center cursor-pointer rounded",class:e.isChat?"bg-[#2E3038] text-white font-bold":"",on:{click:function(t){e.isChat=!0,e.isList=!1}}},[e._v("\n            Chat\n          ")]),e._v(" "),t("div",{staticClass:"w-1/2 h-9 flex items-center justify-center cursor-pointer rounded",class:e.isList?"bg-[#2E3038] text-white font-bold":"",on:{click:function(t){e.isList=!0,e.isChat=!1}}},[e._v("\n            Participants\n          ")])]),e._v(" "),t("div",{staticClass:"w-6 h-6 flex items-center justify-center hover:bg-white/60 rounded cursor-pointer",on:{click:function(t){e.isChat=!1,e.isList=!1}}},[t("i",{staticClass:"el-icon-close text-white"})])]),e._v(" "),e.isChat?t("div",{staticClass:"flex-1 flex flex-col"},[t("div",{ref:"messagescroll",staticClass:"flex-1 overflow-y-auto hide-scrollbar p-2"},e._l(e.messageList,(function(r){return t("div",{key:r.id,staticClass:"mb-2"},[t("div",{staticClass:"flex items-center justify-between text-[rgba(230,236,244,.9)]"},[t("div",{staticClass:"text-sm"},[e._v(e._s(r.senderName))]),e._v(" "),t("div",{staticClass:"text-xs"},[e._v(e._s(e.dateTimeFormat(r.time)))])]),e._v(" "),t("div",{staticClass:"text-white text-base"},[e._v(e._s(r.message))])])})),0),e._v(" "),t("div",{staticClass:"h-10 flex p-2 bg-[#191B23] rounded"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.sendValue,expression:"sendValue"}],staticClass:"h-full flex-1 outline-none bg-transparent text-white placeholder-[#565656] group-hover/item:placeholder-[#f1f1f1]",attrs:{type:"text",placeholder:"send a message..."},domProps:{value:e.sendValue},on:{input:function(t){t.target.composing||(e.sendValue=t.target.value)}}}),e._v(" "),t("div",{staticClass:"w-10 flex items-center justify-center cursor-pointer rounded bg-[#ccc]",on:{click:e.onSendBroadcastMessage}},[e._v("\n            send\n          ")])])]):e._e(),e._v(" "),e.isList?t("div",{staticClass:"flex-1 overflow-y-auto hide-scrollbar"},e._l(e.allPeers,(function(r){return t("div",{key:r.id,staticClass:"border border-[#1D1F27] rounded p-4 mb-2 flex justify-between"},[t("div",{staticClass:"text-white"},[e._v("\n            "+e._s(r.isLocal?"".concat(r.name," (You)"):r.name)+"\n          ")])])})),0):e._e()]):e._e()]),e._v(" "),e.allPeers.length?t("div",{staticClass:"absolute left-0 bottom-0 w-full h-20 my-2 px-5 flex items-center justify-between"},[t("div",{staticClass:"flex gap-3"},[t("div",{staticClass:"rounded-md border border-[#272a31] text-white flex overflow-hidden",class:e.isAudioEnabled?"":"bg-[#293042]"},[t("div",{staticClass:"w-10 h-10 border-r border-[#272a31] flex items-center justify-center cursor-pointer hover:bg-[#8F9099]",on:{click:e.toggleAudio}},[t("i",{class:e.isAudioEnabled?"el-icon-microphone":"el-icon-turn-off-microphone"})]),e._v(" "),e._m(0)]),e._v(" "),t("div",{staticClass:"rounded-md border border-[#272a31] text-white flex overflow-hidden",class:e.isVideoEnabled?"":"bg-[#293042]"},[t("div",{staticClass:"w-10 h-10 border-r border-[#272a31] flex items-center justify-center cursor-pointer hover:bg-[#8F9099]",on:{click:e.toggleVideo}},[t("i",{class:e.isVideoEnabled?"el-icon-video-camera-solid":"el-icon-video-camera"})]),e._v(" "),e._m(1)]),e._v(" "),t("div",{staticClass:"rounded-md border border-[#272a31] text-white flex overflow-hidden",class:e.isVirtualBackgroundEnabled?"bg-[#293042]":""},[t("div",{staticClass:"w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-[#8F9099]",on:{click:e.toggleVB}},[t("i",{staticClass:"el-icon-picture"})])])]),e._v(" "),t("div",{staticClass:"flex gap-3"},[t("div",{staticClass:"rounded-md border border-[#272a31] text-white w-10 h-10 cursor-pointer flex items-center justify-center overflow-hidden hover:bg-[#8F9099]",class:e.isScreenShareEnabled?"bg-[#293042]":"",on:{click:e.toggleScreenShare}},[t("i",{staticClass:"el-icon-s-platform"})]),e._v(" "),t("div",{staticClass:"rounded-md text-white w-10 h-10 cursor-pointer flex items-center justify-center overflow-hidden bg-[rgb(199,78,91)] hover:bg-[rgb(255,178,182)]",on:{click:e.leaveMeeting}},[t("i",{staticClass:"el-icon-switch-button"})])]),e._v(" "),t("div",{staticClass:"flex gap-3"},[t("div",{staticClass:"rounded-md border border-[#272a31] text-white gap-2 px-3 h-10 cursor-pointer flex items-center justify-center overflow-hidden hover:bg-[#8F9099]",class:e.isChat?"bg-[#293042]":"",on:{click:function(t){e.isChat=!e.isChat,e.isList=!1}}},[t("i",{staticClass:"el-icon-chat-square"})]),e._v(" "),t("div",{staticClass:"rounded-md border border-[#272a31] text-white gap-2 px-3 h-10 cursor-pointer flex items-center justify-center overflow-hidden hover:bg-[#8F9099]",class:e.isList?"bg-[#293042]":"",on:{click:function(t){e.isList=!e.isList,e.isChat=!1}}},[t("i",{staticClass:"el-icon-s-custom"}),e._v("\n        "+e._s(e.allPeers.length)+"\n      ")])])]):t("div",[t("p",{staticClass:"text-white text-center font-bold text-2xl"},[e._v("\n      Hold On!, Loading Video Tiles...\n    ")])])])}),[function(){var e=this._self._c;return e("div",{staticClass:"w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-[#8F9099]"},[e("i",{staticClass:"el-icon-more rotate-90"})])},function(){var e=this._self._c;return e("div",{staticClass:"w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-[#8F9099]"},[e("i",{staticClass:"el-icon-more rotate-90"})])}],!1,null,null,null);t.default=component.exports}}]);