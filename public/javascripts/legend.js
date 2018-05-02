!function(t){var e={};function s(i){if(e[i])return e[i].exports;var n=e[i]={i:i,l:!1,exports:{}};return t[i].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=e,s.d=function(t,e,i){s.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:i})},s.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=26)}([function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.default=class{constructor(t,e){this.width=t,this.height=e}scale(t){this.width*=t,this.height*=t}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});class i{constructor(t,e){this.x=t,this.y=e}static addVector(t,e){return new i(t.x+e.x,t.y+e.y)}static subtractVector(t,e){return new i(t.x-e.x,t.y-e.y)}static multiply(t,e){return new i(t.x*e,t.y*e)}static divide(t,e){if(0===e)throw new Error('cannot divide vector by scalar with value "0"');return new i(t.x/e,t.y/e)}set(t,e){this.x=t,this.y=e}setVector(t){this.x=t.x,this.y=t.y}add(t,e){this.x+=t,this.y+=e}addVector(t){this.x+=t.x,this.y+=t.y}subtract(t,e){this.x-=t,this.y-=e}subtractVector(t){this.x-=t.x,this.y-=t.y}multiply(t){this.x*=t,this.y*=t}divide(t){if(0===t)throw new Error('cannot divide vector by "0"');this.x/=t,this.y/=t}mag(){return Math.sqrt(this.x*this.x+this.y*this.y)}negative(){return new i(-this.x,-this.y)}normalize(){let t=this.mag();0!==t&&this.divide(t)}limit(t){Math.floor(this.mag())>t&&(this.normalize(),this.multiply(t))}distanceTo(t){return Math.sqrt(Math.pow(t.x-this.x,2)+Math.pow(t.y-this.y,2))}dot(t){return this.x*t.x+this.y*t.y}floor(){this.x=Math.floor(this.x),this.x=Math.floor(this.x)}clone(){return new i(this.x,this.y)}}e.default=i},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),function(t){t.BASE_VOID="base-void",t.TURRET_LASER="turret-laser",t.CREEP_VOID_LEECHER="creep-void-leecher",t.NONE="none"}(e.AssetId||(e.AssetId={}))},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),function(t){t.BACKGROUND="background",t.CREEPS="creeps",t.PLAYER="player"}(e.ContextId||(e.ContextId={}))},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.default=class{constructor(t,e,s){this.position=t,this.dimension=e,this.settings=s}init(){throw new Error("Implement in subclass.")}toJSON(){return JSON.stringify(this)}fromJSON(t){Object.keys(t).forEach(e=>{this.hasOwnProperty(e)&&(this[e]=t[e])})}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=s(1),n=s(18);e.default=class{constructor(t,e,s,o){this.position=new i.default(t,e),this.width=s,this.height=o,this.colliding=!1,this.collidesWith=[],this.type=n.EntityType.BOX,this.collidesWith.push(n.EntityType.PLAYER)}isCollideAbleWith(t){return this.collidesWith.includes(t.type.toString())}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.default=class{constructor(){this.observers=[],this.state={}}register(t){this.observers.push(t)}unRegister(t){this.observers=this.observers.filter(e=>e!==t)}notify(){this.observers.forEach(t=>t.update(this.state))}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.default=class{constructor(t){this.game=t,this.lastTime=null}start(){this.game.init(),this.game.state.running=!0,this.frameId=requestAnimationFrame(this.loop.bind(this))}stop(){this.game.state.running=!1,this.frameId&&cancelAnimationFrame(this.frameId)}restart(){this.stop(),this.start()}togglePause(){this.game.state.paused=!this.game.state.paused}loop(t){if(this.game.state.running&&!this.game.state.paused){if(null!==this.lastTime){const e=t-this.lastTime;this.game.state.update(e/1e3)}this.lastTime=t,this.game.render(),this.frameId=requestAnimationFrame(this.loop.bind(this))}}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),function(t){t.UP="UP",t.DOWN="DOWN",t.LEFT="LEFT",t.RIGHT="RIGHT",t.SHOOT="SHOOT",t.RESTART="RESTART",t.ROTATE_LEFT="R-LEFT",t.ROTATE_RIGHT="R-RIGHT"}(e.Actions||(e.Actions={}))},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=s(0),n=s(8);e.default=class{constructor(t){this.gameSize=new i.default(t.width,t.height),this.canvas=t,this.keyboard={w:n.Actions.UP,s:n.Actions.DOWN,ArrowUp:n.Actions.LEFT,ArrowDown:n.Actions.RIGHT,space:n.Actions.SHOOT,r:n.Actions.RESTART}}findKey(t){return Object.keys(this.keyboard).filter(e=>this.keyboard[e]===t)[0]}setKey(t,e){let s=this.findKey(e);t!==s&&(console.log("old:"+s," new: "+t+" value: "+e),this.keyboard[t]=this.keyboard[s],delete this.keyboard[s])}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.default=class{constructor(t,e,s){this.element=document.getElementById(t),this.turretList=e,this.assetManager=s}init(){this.turretList.forEach(t=>{const e=document.createElement("div"),s=document.createTextNode(t.type.charAt(0).toUpperCase()+t.type.slice(1)),i=this.assetManager.get(t.assetId),n=document.createElement("span");n.classList.add("tooltiptext"),n.textContent=t.description,e.classList.add("tooltip"),e.classList.add("build-box"),e.appendChild(i),e.appendChild(s),e.appendChild(n),this.element.appendChild(e)})}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=s(4),n=s(1),o=s(0),a=s(3),h=s(2);e.default=class extends i.default{constructor(t,e,s,i,r,d,u,l=h.AssetId.TURRET_LASER){super(new n.default(t,e),new o.default(s,i),d),this.type=u,this.damage=r,this.contextId=a.ContextId.PLAYER,this.assetId=l}init(){}render(t){t.drawImage(this.asset,this.position.x,this.position.y,this.dimension.width,this.dimension.height)}clear(t){t.clearRect(this.position.x,this.position.y,this.dimension.width,this.dimension.height)}move(t){}shoot(){}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=s(4),n=s(1),o=s(0),a=s(3),h=s(2);e.default=class extends i.default{constructor(t,e,s,i,r){super(new n.default(t,e),new o.default(s,i),r),this.color="#ffffff",this.contextId=a.ContextId.BACKGROUND,this.assetId=h.AssetId.NONE}init(){}render(t){t.fillStyle=this.color,t.fillRect(this.position.x,this.position.y,this.dimension.width,this.dimension.height)}clear(t){t.clearRect(this.position.x,this.position.y,this.dimension.width,this.dimension.height)}}},function(t){t.exports=[{type:"laser",description:"A laser Turret",assetId:"turret-laser",contextId:"player",damage:15,rate:50,range:60,upgrades:[{damage:20,rate:47,range:65}]}]},function(t){t.exports=[{name:"Void Galaxy",assetId:"map-void-galaxy",waves:10,tiles:[[0,0,0,0,0,0,0,0,0,0,0],[0,1,1,1,1,1,1,1,1,1,0],[0,2,2,2,2,2,2,2,2,2,0],[3,2,1,1,1,1,1,1,1,2,0],[0,1,1,2,2,2,2,2,2,2,0],[0,2,2,2,1,1,1,1,1,1,0],[0,2,1,1,1,2,2,2,2,2,0],[0,2,2,2,2,2,1,1,1,2,0],[0,1,1,1,1,1,1,2,2,2,0],[4,2,2,2,2,2,2,2,1,1,0],[0,0,0,0,0,0,0,0,0,0,0]]}]},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.default=class{constructor(t){this.quadTree=t}detectCollision(){let t=[];this.quadTree.getAllObjects(t);for(let e=0;e<t.length;e++){let s=[];this.quadTree.findObjects(s,t[e]);for(let i=0;i<s.length;i++)t[e].isCollideAbleWith(s[i])&&Math.floor(t[e].position.x)<Math.floor(s[i].position.x)+s[i].dimension.width&&Math.floor(t[e].position.x)+t[e].dimension.width>Math.floor(s[i].position.x)&&Math.floor(t[e].position.y)<Math.floor(s[i].position.y)+s[i].dimension.height&&Math.floor(t[e].position.y)+t[e].dimension.height>Math.floor(s[i].position.y)&&t[e].alive&&s[i].alive&&(console.log(t[e]),t[e].colliding=!0,s[i].colliding=!0)}}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.default=class{constructor(t,e,s){this.audioContext=t,this.masterGain=e,this.buffer=s,this.gainNode=this.audioContext.createGain(),this.gainNode.gain.value=.2,this.gainNode.connect(this.masterGain),this.playing=!1}play(t=!1){this.source=this.audioContext.createBufferSource(),this.source.buffer=this.buffer,this.source.loop=t,this.source.connect(this.gainNode),this.source.start(0)}stop(){this.source&&this.source.stop(0)}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=s(16);e.default=class{constructor(){this.initAudioContext()}initAudioContext(){try{window.AudioContext=window.AudioContext||webkitAudioContext,this.audioContext=new AudioContext,this.masterGain=this.audioContext.createGain(),this.effectsGain=this.audioContext.createGain(),this.ambientGain=this.audioContext.createGain(),this.masterGain.gain.value=1,this.masterGain.connect(this.audioContext.destination),this.effectsGain.connect(this.masterGain),this.ambientGain.connect(this.masterGain),this.ambientGain.gain.value=1,this.effectsGain.gain.value=1}catch(t){console.log("Web Audio API is not supported in this browser")}}decodeAudio(t,e,s){this.audioContext.decodeAudioData(t).then(t=>s(t),t=>{console.log("Error with decoding audio data"+t)})}adjustMasterVolume(t){this.masterGain.gain.value=t}adjustAmbientVolume(t){this.ambientGain.gain.value=t}adjustEffectsVolume(t){this.effectsGain.gain.value=t}createSound(t,e){return new i.default(this.audioContext,e?this.ambientGain:this.effectsGain,t)}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),function(t){t.PLAYER="ship",t.ENEMY="enemy",t.ENEMY_BULLET="bulletEnemy",t.PLAYER_BULLET="bullet",t.BACKGROUND="background",t.MAP="map",t.GAME_OVER="gameOver",t.LASER="laser",t.MAIN_THEME="shockWave",t.EXPLOSION_I="explosion1",t.EXPLOSION_II="explosion2",t.BOX="box",t.ARENA="arena"}(e.EntityType||(e.EntityType={}))},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=s(5);class n{constructor(t=new i.default(0,0,0,0),e=0){this.level=e,this.maxObjects=10,this.maxLevels=5,this.hitBox=t,this.objects=[],this.nodes=[]}clear(){this.objects=[],this.nodes.forEach(t=>t.clear()),this.nodes=[]}getAllObjects(t){return this.nodes.forEach(e=>e.getAllObjects(t)),this.objects.forEach(e=>t.push(e)),t}findObjects(t,e){if(void 0===e)return void console.log("UNDEFINED OBJECT");let s=this.getIndex(e);return-1!==s&&this.nodes.length&&this.nodes[s].findObjects(t,e),this.objects.forEach(e=>t.push(e)),t}insert(t){if(void 0!==t)if(t instanceof Array)t.forEach(t=>this.insert(t));else{if(this.nodes.length>0){let e=this.getIndex(t);if(-1!==e)return void this.nodes[e].insert(t)}if(this.objects.push(t),this.objects.length>this.maxObjects&&this.level<this.maxLevels){void 0===this.nodes[0]&&this.split();let t=0;for(;t<this.objects.length;){let e=this.getIndex(this.objects[t]);-1!==e?this.nodes[e].insert(this.objects.splice(t,1)[0]):t++}}}}getIndex(t){let e=-1,s=this.hitBox.position.x+this.hitBox.width/2,i=this.hitBox.position.y+this.hitBox.height/2,n=t.position.y<i&&t.position.y+t.height<i,o=t.position.y>i;return t.position.x<s&&t.position.x+t.width<s?n?e=1:o&&(e=2):t.position.x>s&&(n?e=0:o&&(e=3)),e}split(){let t=this.hitBox.width/2|0,e=this.hitBox.height/2|0;this.nodes[0]=new n(new i.default(this.hitBox.position.x+t,this.hitBox.position.y,t,e),this.level+1),this.nodes[1]=new n(new i.default(this.hitBox.position.x,this.hitBox.position.y,t,e),this.level+1),this.nodes[2]=new n(new i.default(this.hitBox.position.x,this.hitBox.position.y+e,t,e),this.level+1),this.nodes[3]=new n(new i.default(this.hitBox.position.x+t,this.hitBox.position.y+e,t,e),this.level+1)}}e.default=n},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=s(19),n=s(6),o=s(5);e.default=class extends n.default{constructor(t,e){super(),this.running=!1,this.paused=!1,this.entities=[],this.quadTree=new i.default(new o.default(0,0,t.gameSize.width,t.gameSize.height)),this.collideables=[],this.movables=[],this.renderables=[],this.state={kills:0,cash:0}}update(t){this.movables.forEach(e=>e.change(t))}reset(){this.entities.forEach(t=>t.init())}scorePoints(t){this.state.cash+=t,this.state.kills++,this.notify()}}},function(t, e, s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});class i{static create(t, e){let s=new XMLHttpRequest;s.addEventListener("load",()=>{e(s.response)}),s.open(t.method?t.method:i.defaults.method,t.url?t.url:i.defaults.url,t.async?t.async:i.defaults.async),t.hasOwnProperty("contentType")&&s.setRequestHeader("Content-Type",t.contentType?t.contentType:i.defaults.contentType),t.hasOwnProperty("responseType")&&(s.responseType=t.responseType),t.hasOwnProperty("data")&&"object"==typeof t.data&&(t.data=JSON.stringify(t.data)),s.send(t.data?t.data:null)}}i.defaults={url:"",method:"GET",contentType:"text/html",async:!0,data:null},e.default=i},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.default=class{constructor(t,e,s){this.image=t,this.frameWidth=e,this.frameHeight=s,this.framesPerRow=Math.floor(t.width/e)}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=s(22),n=s(21);var o;!function(t){t.SPRITE="sprite",t.SPRITE_SHEET="sprite-sheet",t.AUDIO="audio",t.AUDIO_AMB="audio-amb"}(o=e.AssetType||(e.AssetType={}));e.default=class{constructor(t){this.cache=[],this.assetsDir="assets/",this.downloadCount=0,this.queue=[],this.audioManager=t}done(){return this.downloadCount===this.queue.length}queueDownload(t,e,s=null){this.queue.push({id:t,path:this.assetsDir+e+"/"+t+".png",type:e,opts:s})}loadAudio(t,e){n.default.create({method:"GET",url:t.path,responseType:"arraybuffer"},s=>{this.audioManager.decodeAudio(s,t.id,s=>{this.cache[t.id]=s,this.downloadCount+=1,this.done()&&e()})})}loadSprite(t,e){let s=new Image;s.addEventListener("load",()=>{this.downloadCount++,this.done()&&e()}),s.src=t.path,this.cache[t.id]=s}loadSpriteSheet(t,e){let s=new Image;s.addEventListener("load",()=>{this.cache[t.id]=new i.default(s,t.opts.frameWidth||0,t.opts.frameHeight||0),this.downloadCount+=1,this.done()&&e()}),s.src=t.path}downloadAll(t){this.queue.forEach(e=>{e.type===o.AUDIO?this.loadAudio(e,t):e.type===o.SPRITE?this.loadSprite(e,t):e.type===o.SPRITE_SHEET&&this.loadSpriteSheet(e,t)})}get(t,e=o.SPRITE){if(e===o.AUDIO||e===o.AUDIO_AMB){let s=e===o.AUDIO_AMB;return this.audioManager.createSound(this.cache[t],s)}return this.cache[t]}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=s(6);e.default=class extends i.default{constructor(t){super(),this.inputMap=t.keyboard,this.init(),this.initializeTouchHandler(),this.touches={start:[],move:[]}}init(){window.addEventListener("keydown",t=>{let e=" "!==t.key?t.key:"space";this.state[this.inputMap[e]]=!0,this.notify()}),window.addEventListener("keyup",t=>{let e=" "!==t.key?t.key:"space";this.state[this.inputMap[e]]=!1,this.notify()})}initializeTouchHandler(){let t=document.getElementById("change"),e=t||window;e.addEventListener("touchstart",function(t){t.preventDefault(),s=t.touches,n=t.touches[0].pageX,o=t.touches[0].pageY},!1),e.addEventListener("touchmove",function(t){r.reset(),t.preventDefault(),i=t.changedTouches,a=t.touches[0].pageX,h=t.touches[0].pageY;for(let e=0;e<t.touches.length;e++)i[e].pageX<s[e].pageX&&(r.state[r.inputMap.a]=!0),i[e].pageX>s[e].pageX&&(r.state[r.inputMap.d]=!0),i[e].pageY<s[e].pageY&&(r.state[r.inputMap.w]=!0),i[e].pageY>s[e].pageY&&(r.state[r.inputMap.s]=!0),r.notify()},!1),e.addEventListener("touchend",function(t){t.preventDefault(),r.reset()},!1);let s=[],i=[],n=0,o=0,a=0,h=0,r=this}shoot(){this.state[this.inputMap.space]=!0}cancelShoot(){this.state[this.inputMap.space]=!1}reset(){this.state[this.inputMap.w]=!1,this.state[this.inputMap.a]=!1,this.state[this.inputMap.s]=!1,this.state[this.inputMap.d]=!1}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=s(24),n=s(23),o=s(20),a=s(17),h=s(15),r=s(14),d=s(13),u=s(12),l=s(11),c=s(0),p=s(2),f=s(10);e.default=class{constructor(t,e){this.TILE_SIZE=60,this.audioManager=new a.default,this.inputManager=new i.default(e),this.assetManager=new n.default(this.audioManager),this.state=new o.default(e,this.inputManager),this.collisionManager=new h.default(this.state.quadTree),this.contexts=t,this.settings=e,this.buildMenu=new f.default("buildMenu",d,this.assetManager)}initMap(){console.log(r);let t=0;r[0].tiles.forEach(e=>{let s=this.TILE_SIZE,i=this.TILE_SIZE,n=0;e.forEach(e=>{const o=new u.default(n,t,s,i,this.settings);switch(e){case 0:o.blocked=!0,o.color="#000000";break;case 1:o.buildable=!0,o.color="#ff00ff";break;case 3:o.color="#00ff00";break;case 4:o.color="#ff0000"}this.state.entities.push(o),this.state.renderables.push(o),n+=s}),t+=i})}init(){this.assetManager.queueDownload(p.AssetId.TURRET_LASER,n.AssetType.SPRITE),this.initMap(),this.assetManager.downloadAll(()=>{this.state.renderables.filter(t=>t.assetId!==p.AssetId.NONE).forEach(t=>t.asset=this.assetManager.get(t.assetId)),this.state.reset(),this.buildMenu.init()})}addTurret(t,e){let s=d,i=new l.default;i.fromJSON(s.filter(e=>e.type===t)[0]),i.position=e,i.dimension=new c.default(this.TILE_SIZE,this.TILE_SIZE),i.asset=this.assetManager.get(i.assetId),this.state.entities.push(i),this.state.renderables.push(i)}render(){this.state.renderables.forEach(t=>t.render(this.contexts.get(t.contextId)))}clear(){this.state.renderables.forEach(t=>t.clear(this.contexts.get(t.contextId)))}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=s(25),n=s(9),o=s(3),a=s(7),h=s(1);document.addEventListener("DOMContentLoaded",()=>{const t=document.getElementById("contents"),e=new Map,s=document.createElement("canvas"),r=document.createElement("canvas"),d=document.createElement("canvas");t.appendChild(s),t.appendChild(r),t.appendChild(d),e.set(o.ContextId.BACKGROUND,s.getContext("2d")),e.set(o.ContextId.CREEPS,r.getContext("2d")),e.set(o.ContextId.PLAYER,d.getContext("2d")),s.width=660,s.height=660,r.width=660,r.height=660,d.width=660,d.height=660;const u=new n.default(s),l=new i.default(e,u);new a.default(l).start(),l.addTurret("laser",new h.default(2,2))})}]);
//# sourceMappingURL=legend.js.map