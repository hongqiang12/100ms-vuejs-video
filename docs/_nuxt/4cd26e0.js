(window.webpackJsonp=window.webpackJsonp||[]).push([[65],{449:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t,r=new Set,l=function(e,l){var n="function"==typeof e?e(t):e;if(n!==t){var o=t;t=l?n:Object.assign({},t,n),r.forEach((function(e){return e(t,o)}))}},n=function(){return t},o={setState:l,getState:n,subscribe:function(e,l,o){return l||o?function(e,l,o){void 0===l&&(l=n),void 0===o&&(o=Object.is);var c=l(t);function d(){var r=l(t);if(!o(c,r)){var n=c;e(c=r,n)}}return r.add(d),function(){return r.delete(d)}}(e,l,o):(r.add(e),function(){return r.delete(e)})},destroy:function(){return r.clear()}};return t=e(l,n,o),o}},450:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){if(Object.is(e,t))return!0;if("object"!=typeof e||null===e||"object"!=typeof t||null===t)return!1;var r=Object.keys(e);if(r.length!==Object.keys(t).length)return!1;for(var i=0;i<r.length;i++)if(!Object.prototype.hasOwnProperty.call(t,r[i])||!Object.is(e[r[i]],t[r[i]]))return!1;return!0}},503:function(e,t,r){"use strict";r.d(t,"a",(function(){return B})),r.d(t,"b",(function(){return V}));var s,l,n,o,c,d=r(408),v=r(405),E=(r(447),r(450),r(449),r(418),Object.defineProperty,Object.defineProperties,Object.getOwnPropertyDescriptors,Object.getOwnPropertySymbols,Object.prototype.hasOwnProperty,Object.prototype.propertyIsEnumerable,s=(e,t)=>{t.exports={version:"0.10.18",license:"MIT",main:"dist/index.cjs.js",module:"dist/index.js",typings:"dist/index.d.ts",files:["dist","src"],engines:{node:">=12"},exports:{".":{require:"./dist/index.cjs.js",import:"./dist/index.js",default:"./dist/index.js"}},scripts:{prestart:"rm -rf dist && yarn types:build",start:'concurrently "yarn dev" "yarn types"',dev:"node ../../scripts/dev","build:only":"node ../../scripts/build",build:"yarn build:only && yarn types:build",types:"tsc -w","types:build":"tsc -p tsconfig.json",format:"prettier --write src/**/*.ts",test:"jest --maxWorkers=1","test:watch":"jest --watch","test:coverage":"jest --coverage",lint:"eslint -c ../../.eslintrc .","lint:fix":"yarn lint --fix",prepare:"yarn build",size:"size-limit",analyze:"size-limit --why",docs:"rm -rf ./docs && typedoc && rm -f ./docs/README.md && mkdir ./docs/home &&mv ./docs/modules.md ./docs/home/content.md && node ../../scripts/docs-store && npx prettier --write './docs/**/*'"},name:"@100mslive/hms-video-store",author:"100ms",sideEffects:!1,dependencies:{"@100mslive/hms-video":"0.9.18",eventemitter2:"^6.4.7",immer:"^9.0.6",reselect:"4.0.0",zustand:"3.5.7"},devDependencies:{"ts-node":"^10.4.0",tslib:"^2.2.0"},description:"This is an addon to the core sdk provided by 100ms. It abstracts away the intricacies of data management and provides a flux based reactive data store where data flows in only one direction.",repository:{type:"git",url:"git+https://github.com/100mslive/hms-video-store.git"},keywords:["video","webrtc","conferencing","100ms"],bugs:{url:"https://github.com/100mslive/hms-video-store/issues"},homepage:"https://github.com/100mslive/hms-video-store#readme",gitHead:"b78d4abbfb1bb119dcdd29613484f22fbae5b149"}},(n=E||{}).Disconnected="Disconnected",n.Preview="Preview",n.Connecting="Connecting",n.Connected="Connected",n.Reconnecting="Reconnecting",n.Disconnecting="Disconnecting",n.Failed="Failed",n),O=(e=>(e.CHAT="chat",e))(O||{}),T=((c=T||{}).INFO="info",c.ERROR="error",c),f=((o=f||{}).PEER_JOINED="PEER_JOINED",o.PEER_LEFT="PEER_LEFT",o.PEER_LIST="PEER_LIST",o.NEW_MESSAGE="NEW_MESSAGE",o.ERROR="ERROR",o.RECONNECTING="RECONNECTING",o.RECONNECTED="RECONNECTED",o.TRACK_ADDED="TRACK_ADDED",o.TRACK_REMOVED="TRACK_REMOVED",o.TRACK_MUTED="TRACK_MUTED",o.TRACK_UNMUTED="TRACK_UNMUTED",o.TRACK_DEGRADED="TRACK_DEGRADED",o.TRACK_RESTORED="TRACK_RESTORED",o.TRACK_DESCRIPTION_CHANGED="TRACK_DESCRIPTION_CHANGED",o.ROLE_UPDATED="ROLE_UPDATED",o.CHANGE_TRACK_STATE_REQUEST="CHANGE_TRACK_STATE_REQUEST",o.CHANGE_MULTI_TRACK_STATE_REQUEST="CHANGE_MULTI_TRACK_STATE_REQUEST",o.ROOM_ENDED="ROOM_ENDED",o.REMOVED_FROM_ROOM="REMOVED_FROM_ROOM",o.DEVICE_CHANGE_UPDATE="DEVICE_CHANGE_UPDATE",o.PLAYLIST_TRACK_ENDED="PLAYLIST_TRACK_ENDED",o.NAME_UPDATED="NAME_UPDATED",o.METADATA_UPDATED="METADATA_UPDATED",o.POLL_CREATED="POLL_CREATED",o.POLL_STARTED="POLL_STARTED",o.POLL_STOPPED="POLL_STOPPED",o.POLL_VOTES_UPDATED="POLL_VOTES_UPDATED",o.HAND_RAISE_CHANGED="HAND_RAISE_CHANGED",o),j=(e=>(e.audio="audio",e.video="video",e))(j||{});function D(s,e){let t,i;if(e)for(let r of e.auxiliaryTracks){let e=s[r];_(e)&&(i=R(e)?e:i,t=A(e)?e:t)}return{video:t,audio:i}}function R(s){return s&&"audio"===s.type}function A(s){return s&&"video"===s.type}function _(s){return s&&"screen"===s.source}function m(s){return s&&"audioplaylist"===s.source}function y(s){return s&&"videoplaylist"===s.source}function P(s){return!!s&&!(null==s||!s.degraded)}function h(s,e){return!(!e||!s.tracks[e])&&s.tracks[e].enabled}function C(s){var e;let t=!1,r=!1,i=!1;return null!=(e=null==s?void 0:s.publishParams)&&e.allowed&&(t=s.publishParams.allowed.includes("video"),r=s.publishParams.allowed.includes("audio"),i=s.publishParams.allowed.includes("screen")),{video:t,audio:r,screen:i}}var k=s=>s.room,N=(Object(d.a)((s=>s.errors),(s=>0===s.length?null:s.at(-1))),Object(d.a)(k,(s=>s.id)),s=>s.peers),S=s=>s.messages.byID,L=s=>s.messages.allIDs,M=s=>s.tracks,I=s=>s.appData,q=Object(d.a)([k],(s=>s&&s.isConnected)),w=(Object(d.a)([q,k],((s,e)=>s?void 0!==e.peerCount?e.peerCount||1:e.peers.length:Math.max(void 0!==e.peerCount?e.peerCount:e.peers.length-1,0))),Object(d.a)([k,N,s=>s.hideLocalPeer],((s,e,t)=>t?s.peers.filter((i=>s.localPeer!==i)).map((i=>e[i])):s.peers.map((i=>e[i]))))),U=Object(d.a)(M,(s=>Object.values(s))),K=Object(d.a)(k,N,((s,e)=>e[s.localPeer])),G=Object(d.a)(k,(s=>s.localPeer)),x=(Object(d.a)(K,(s=>null==s?void 0:s.name)),Object(d.a)(K,(s=>null==s?void 0:s.roleName)),Object(d.a)(K,(s=>null==s?void 0:s.audioTrack))),b=Object(d.a)(K,(s=>null==s?void 0:s.videoTrack)),H=Object(d.a)(K,(s=>null==s?void 0:s.auxiliaryTracks)),B=(Object(d.a)([x,b,H],((s,e,t)=>{let i=t?[...t]:[];return s&&i.unshift(s),e&&i.unshift(e),i})),Object(d.a)(w,(s=>s.filter((e=>!e.isLocal)))),Object(d.a)(N,(s=>s.speakers),((s,e)=>{let t=Object.entries(e).sort(((i,e)=>{var t,r;let l=(null==(t=i[1])?void 0:t.audioLevel)||0;return((null==(r=e[1])?void 0:r.audioLevel)||0)>l?1:-1}));if(t.length>0&&t[0][1].audioLevel&&t[0][1].audioLevel>0){let i=t[0][1].peerID;if(i in s)return s[i]}return null})),s=>{let e=K(s);return h(s,null==e?void 0:e.audioTrack)}),V=s=>{let e=K(s);return h(s,null==e?void 0:e.videoTrack)},F=(Object(d.a)(K,M,((s,e)=>{let{video:t,audio:i}=D(e,s);return!(!t&&!i)})),Object(d.a)(N,M,((s,e)=>{let t;for(let i in s){let r=s[i],{video:l,audio:a}=D(e,r);if(l)return r;a&&!t&&(t=r)}return t}))),z=(Object(d.a)(F,(s=>!!s)),Object(d.a)(N,M,((s,e)=>{for(let t in s){let i=s[t],{audio:r,video:l}=D(e,i);if(!l&&r)return i}})),Object(d.a)(N,M,((s,e)=>{let t=[],i=[];for(let r in s){let l=s[r],{video:a,audio:n}=D(e,l);a?t.push(l):n&&i.push(l)}return t.concat(i)})),Object(d.a)(N,M,((s,e)=>{for(let t in e){let i=e[t];if(y(i)&&A(i)&&i.peerId)return s[i.peerId]}})),Object(d.a)(N,M,((s,e)=>{for(let t in e){let i=e[t];if(m(i)&&i.peerId)return s[i.peerId]}})),Object(d.a)(U,(s=>s.filter(P))),Object(d.a)(L,(s=>s.length)),Object(d.a)(S,(s=>Object.values(s).filter((e=>!e.read)).length)),Object(d.a)(L,S,((s,e)=>{let t=[];return s.forEach((i=>{t.push(e[i])})),t}))),J=Object(d.a)([k],(s=>s&&s.roomState)),Q=(Object(d.a)(J,(s=>"Preview"===s)),Object(d.a)(k,(s=>"Disconnected"!==s.roomState)),s=>s.roles),W=(Object(d.a)([Q],(s=>Object.keys(s))),Object(d.a)([K,Q],((s,e)=>null!=s&&s.roleName?e[s.roleName]:null))),Y=Object(d.a)([s=>{var e;return null==(e=s.preview)?void 0:e.asRole},Q],((s,e)=>s?e[s]:null)),X=(Object(d.a)([W],(s=>{var e;return!(null==(e=null==s?void 0:s.subscribeParams)||!e.subscribeToRoles)&&s.subscribeParams.subscribeToRoles.length>0})),Object(d.a)(W,(s=>null==s?void 0:s.permissions)),Object(d.a)(k,(s=>s.recording)),Object(d.a)(k,(s=>s.rtmp)),Object(d.a)(k,(s=>s.hls)),Object(d.a)(k,(s=>s.sessionId)),Object(d.a)(k,(s=>s.startedAt)),Object(d.a)(k,(s=>!!s.isLargeRoom)),Object(d.a)(w,(s=>s.filter((e=>e.isHandRaised)))),(s="audio")=>e=>e.playlist[s].list),Z=(s="audio")=>e=>e.playlist[s].selection,$=(s="audio")=>e=>e.playlist[s].progress,rt=(s="audio")=>e=>e.playlist[s].currentTime,ee=(s="audio")=>e=>e.playlist[s].playbackRate,te=(s="audio")=>e=>e.playlist[s].volume,re=(s="audio")=>Object(d.a)(X(s),(e=>Object.values(e))),ie=(s="audio")=>Object(d.a)(X(s),Z(s),((e,t)=>{if(t.id)return e[t.id]}));Z("audio"),$("audio"),rt("audio"),ee("audio"),te("audio"),re("audio"),ie("audio"),Z("video"),$("video"),rt("video"),ee("video"),te("video"),re("video"),ie("video");function u(s){return e=>t=>s(t,e)}var le="HMS-Store:",ae=class{static v(e,...t){this.log(v.e.VERBOSE,e,...t)}static d(...e){this.log(v.e.DEBUG,...e)}static i(...e){this.log(v.e.INFO,...e)}static w(...e){this.log(v.e.WARN,...e)}static e(...e){this.log(v.e.ERROR,...e)}static time(e){this.log(v.e.TIME,"[HMSPerformanceTiming]",e)}static timeEnd(e){this.log(v.e.TIMEEND,"[HMSPerformanceTiming]",e,e)}static cleanup(){performance.clearMarks(),performance.clearMeasures()}static log(e,...t){if(!(this.level.valueOf()>e.valueOf()))switch(e){case v.e.VERBOSE:console.log(le,...t);break;case v.e.DEBUG:console.debug(le,...t);break;case v.e.INFO:console.info(le,...t);break;case v.e.WARN:console.warn(le,...t);break;case v.e.ERROR:console.error(le,...t);break;case v.e.TIME:performance.mark(t[1]);break;case v.e.TIMEEND:{let i=t[0],e=t[1];try{let t=performance.measure(e,e);this.log(v.e.DEBUG,i,e,null==t?void 0:t.duration),performance.clearMarks(e),performance.clearMeasures(e)}catch(t){this.log(v.e.DEBUG,i,e,t)}break}}}};ae.level=v.e.VERBOSE;var ne=(s,e)=>e,oe=(s,e)=>e,ue=(s,e)=>e,ce=Object(d.a)([N,ne],((s,e)=>e?s[e]:null)),se=Object(d.a)([M,oe],((s,e)=>e?s[e]:null)),de=Object(d.a)([M,oe],((s,e)=>{if(!e)return null;let t=s[e];return"video"===(null==t?void 0:t.type)?t:null})),be=Object(d.a)([M,oe],((s,e)=>{if(!e)return null;let t=s[e];return"audio"===(null==t?void 0:t.type)?t:null})),ve=Object(d.a)([M,oe],((s,e)=>{if(!e)return null;let t=s[e];return"audio"===(null==t?void 0:t.type)&&"screen"===(null==t?void 0:t.source)?t:null})),Ee=Object(d.a)([M,oe],((s,e)=>{if(!e)return null;let t=s[e];return"video"===(null==t?void 0:t.type)&&"screen"===(null==t?void 0:t.source)?t:null})),Oe=Object(d.a)([s=>s.polls,(s,e)=>e],((s,e)=>e?s[e]:null));u(ce),u(Object(d.a)([I,(s,e)=>e],((s,e)=>{if(s)return e?s[e]:s})));u(Object(d.a)(ce,(s=>null==s?void 0:s.name))),u(se),u(de),u(be),u(ve),u(Ee),u(((s,e)=>{let t=ce(s,e);if(t&&t.videoTrack&&""!==t.videoTrack)return s.tracks[t.videoTrack]}));var Te=u(((s,e)=>{let t=ce(s,e);if(t&&t.audioTrack&&""!==t.audioTrack)return s.tracks[t.audioTrack]})),pe=(u(((s,e)=>{let t=ce(s,e);return(null==t?void 0:t.auxiliaryTracks.map((i=>s.tracks[i])))||[]})),(s,e)=>e?s.speakers[e]:null),fe=(u(Object(d.a)(pe,(s=>(null==s?void 0:s.audioLevel)||0))),u(Object(d.a)(((s,e)=>{let t=Te(e)(s);return pe(s,null==t?void 0:t.id)}),(s=>(null==s?void 0:s.audioLevel)||0))),u(((s,e)=>{if(e)return s.connectionQualities[e]})),u(((s,e)=>{let t=ce(s,e);if(t){let i=null==t?void 0:t.auxiliaryTracks.find((e=>R(s.tracks[e])));return i?s.tracks[i]:void 0}})),u(Object(d.a)(M,ce,((s,e)=>{let t=null==e?void 0:e.auxiliaryTracks.find((i=>{let e=s[i];return y(e)&&A(e)}));return t?s[t]:void 0}))),u(Object(d.a)(M,ce,((s,e)=>{let t=null==e?void 0:e.auxiliaryTracks.find((i=>{let e=s[i];return y(e)&&R(e)}));return t?s[t]:void 0}))),u(Object(d.a)(M,ce,((s,e)=>{let t=null==e?void 0:e.auxiliaryTracks.find((i=>{let e=s[i];return m(e)&&R(e)}));return t?s[t]:void 0}))),u(Object(d.a)(M,ce,((s,e)=>D(s,e))))),je=s=>Object(d.a)(fe(s),(e=>e.audio)),De=(u(((s,e)=>{let t=ce(s,e);return h(s,null==t?void 0:t.audioTrack)})),u(((s,e)=>{let t=ce(s,e);return h(s,null==t?void 0:t.videoTrack)})),u(((s,e)=>{if(e&&s.tracks[e])return 0===s.tracks[e].volume}))),Re=(u(((s,e)=>{let t=ce(s,e);return De(null==t?void 0:t.audioTrack)(s)})),u(((s,e)=>{let t=je(e)(s);return De(null==t?void 0:t.id)(s)})),u(((s,e)=>{let t=se(s,e);if(t)return"audio"!==t.type?void ae.w("Please pass audio track here"):t.volume}))),Ae=(u(((s,e)=>{let t=ce(s,e);return Re(null==t?void 0:t.audioTrack)(s)})),u(((s,e)=>{let t=je(e)(s);return Re(null==t?void 0:t.id)(s)})),u(((s,e)=>{let t=se(s,e);if(t)return"video"!==t.type?void ae.w("Please pass video track here"):t.layer})),Object(d.a)([z,G,ne],((s,e,t)=>{if(t)return s.filter((i=>{var r;return!(!(i.recipientPeer||null!=(r=i.recipientRoles)&&r.length)||i.sender&&![e,t].includes(i.sender))&&[e,t].includes(i.recipientPeer)}))}))),_e=Object(d.a)([z,ue],((s,e)=>{if(e)return s.filter((t=>{var i,r;return!(null==(i=t.recipientRoles)||!i.length)&&(null==(r=t.recipientRoles)?void 0:r.includes(e))}))})),me=Object(d.a)(z,(s=>s.filter((e=>{var t;return!(e.recipientPeer||null!=(t=e.recipientRoles)&&t.length)})))),ye=Object(d.a)([_e,ue],(s=>s?s.filter((e=>!e.read)).length:0)),Pe=Object(d.a)([Ae,ne],(s=>s?s.filter((e=>!e.read)).length:0));Object(d.a)(me,(s=>s.filter((e=>!e.read)).length)),u(Ae),u(_e),u(ye),u(Pe),u(Oe),Object(d.a)([N,M],((s,e)=>Object.values(s).map((i=>{var t;return{peer:i,isAudioEnabled:!!i.audioTrack&&(null==(t=e[i.audioTrack])?void 0:t.enabled)}})))),Object(d.a)([s=>s.roleChangeRequests[0]||null,N,Q],((s,e,t)=>s?{requestedBy:s.requestedBy?e[s.requestedBy]:void 0,role:t[s.roleName],token:s.token}:null)),Object(d.a)([W],(s=>C(s))),Object(d.a)([Y],(s=>C(s))),Object(d.a)([b,M],((s,e)=>{let t=null;return s&&(t=e[s]),(null==t?void 0:t.plugins)||[]})),Object(d.a)([x,M],((s,e)=>{let t=null;return s&&(t=e[s]),(null==t?void 0:t.plugins)||[]})),v.f.PEER_JOINED,v.f.PEER_LEFT,v.f.ROLE_UPDATED,v.f.NAME_UPDATED,v.f.METADATA_UPDATED,v.f.HAND_RAISE_CHANGED,v.l.TRACK_ADDED,v.l.TRACK_REMOVED,v.l.TRACK_MUTED,v.l.TRACK_UNMUTED,v.l.TRACK_DEGRADED,v.l.TRACK_RESTORED,v.l.TRACK_DESCRIPTION_CHANGED,v.g.POLL_CREATED,v.g.POLL_STARTED,v.g.POLL_STOPPED,v.g.POLL_STATS_UPDATED;var he=(s,e)=>e,ge=s=>s.peerStats,Ce=s=>s.localTrackStats,ke=Object(d.a)([ge,s=>s.localPeer.id],((s,e)=>s[e])),Ne=(Object(d.a)(ke,(s=>{var e;return null==(e=null==s?void 0:s.subscribe)?void 0:e.packetsLost})),Object(d.a)(ke,(s=>{var e;return null==(e=null==s?void 0:s.subscribe)?void 0:e.jitter})),Object(d.a)(ke,(s=>{var e;return null==(e=null==s?void 0:s.publish)?void 0:e.bitrate})),Object(d.a)(ke,(s=>{var e;return null==(e=null==s?void 0:s.subscribe)?void 0:e.bitrate})),Object(d.a)(ke,(s=>{var e;return null==(e=null==s?void 0:s.publish)?void 0:e.availableOutgoingBitrate})),Object(d.a)(ke,(s=>{var e;return null==(e=null==s?void 0:s.subscribe)?void 0:e.availableIncomingBitrate})),Object(d.a)(ke,(s=>{var e;return null==(e=null==s?void 0:s.publish)?void 0:e.bytesSent})),Object(d.a)(ke,(s=>{var e;return null==(e=null==s?void 0:s.subscribe)?void 0:e.bytesReceived})),Object(d.a)([ge,(s,e)=>e],((s,e)=>e?s[e]:void 0))),Se=Object(d.a)([s=>s.remoteTrackStats,he],((s,e)=>e?s[e]:void 0)),Le=Object(d.a)([Ce,he],((s,e)=>e?s[e]:void 0));u(Ne),u(Se),Object(d.a)([Ce,s=>s.localPeer.audioTrack],((s,e)=>{var t;return e?null==(t=s[e])?void 0:t[0]:void 0})),u(Object(d.a)(Le,(s=>null==s?void 0:s[0]))),Object(d.a)([Ce,s=>s.localPeer.videoTrack],((s,e)=>{var t;return e?null==(t=s[e])?void 0:t[0]:void 0})),u(Object(d.a)(Le,(s=>s)))}}]);