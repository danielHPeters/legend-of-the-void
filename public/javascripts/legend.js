!function(t){var e={};function i(s){if(e[s])return e[s].exports;var n=e[s]={i:s,l:!1,exports:{}};return t[s].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=e,i.d=function(t,e,s){i.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:s})},i.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=22)}([function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),function(t){t[t.BACKGROUND=0]="BACKGROUND",t[t.CREEPS=1]="CREEPS",t[t.PLAYER=2]="PLAYER"}(e.ContextId||(e.ContextId={}))},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.default=class{constructor(t,e){this.width=t,this.height=e}scale(t){this.width*=t,this.height*=t}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});class s{constructor(t,e){this.x=t,this.y=e}static addVector(t,e){return new s(t.x+e.x,t.y+e.y)}static subtractVector(t,e){return new s(t.x-e.x,t.y-e.y)}static multiply(t,e){return new s(t.x*e,t.y*e)}static divide(t,e){if(0===e)throw new Error('cannot divide vector by scalar with value "0"');return new s(t.x/e,t.y/e)}set x(t){this._x=t}set y(t){this._y=t}get x(){return this._x}get y(){return this._y}set(t,e){this.x=t,this.y=e}setVector(t){this.x=t.x,this.y=t.y}add(t,e){this.x+=t,this.y+=e}addVector(t){this.x+=t.x,this.y+=t.y}subtract(t,e){this.x-=t,this.y-=e}subtractVector(t){this.x-=t.x,this.y-=t.y}multiply(t){this.x*=t,this.y*=t}divide(t){if(0===t)throw new Error('cannot divide vector by "0"');this.x/=t,this.y/=t}mag(){return Math.sqrt(this.x*this.x+this.y*this.y)}negative(){return new s(-this.x,-this.y)}normalize(){let t=this.mag();0!==t&&this.divide(t)}limit(t){Math.floor(this.mag())>t&&(this.normalize(),this.multiply(t))}distanceTo(t){return Math.sqrt(Math.pow(t.x-this.x,2)+Math.pow(t.y-this.y,2))}dot(t){return this.x*t.x+this.y*t.y}floor(){this.x=Math.floor(this.x),this.x=Math.floor(this.x)}clone(){return new s(this.x,this.y)}}e.default=s},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const s=i(2),n=i(14);e.default=class{constructor(t,e,i,o){this.position=new s.default(t,e),this.width=i,this.height=o,this.colliding=!1,this.collidesWith=[],this.type=n.EntityType.BOX,this.collidesWith.push(n.EntityType.PLAYER)}isCollideAbleWith(t){return this.collidesWith.includes(t.type.toString())}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.default=class{constructor(){this.observers=[],this.state={}}register(t){this.observers.push(t)}unRegister(t){this.observers=this.observers.filter(e=>e!==t)}notify(){this.observers.forEach(t=>t.update(this.state))}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.default=class{constructor(t){this.game=t,this.lastTime=null}start(){this.game.init(),this.game.state.running=!0,this.frameId=requestAnimationFrame(this.loop.bind(this))}stop(){this.game.state.running=!1,this.frameId&&cancelAnimationFrame(this.frameId)}restart(){this.stop(),this.start()}togglePause(){this.game.state.paused=!this.game.state.paused}loop(t){if(this.game.state.running&&!this.game.state.paused){if(null!==this.lastTime){const e=t-this.lastTime;this.game.state.update(e/1e3)}this.lastTime=t,this.game.render(),this.frameId=requestAnimationFrame(this.loop.bind(this))}}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),function(t){t.UP="UP",t.DOWN="DOWN",t.LEFT="LEFT",t.RIGHT="RIGHT",t.SHOOT="SHOOT",t.RESTART="RESTART",t.ROTATE_LEFT="R-LEFT",t.ROTATE_RIGHT="R-RIGHT"}(e.Actions||(e.Actions={}))},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const s=i(1),n=i(6);e.default=class{constructor(t){this.gameSize=new s.default(t.width,t.height),this.canvas=t,this.keyboard={w:n.Actions.UP,s:n.Actions.DOWN,ArrowUp:n.Actions.LEFT,ArrowDown:n.Actions.RIGHT,space:n.Actions.SHOOT,r:n.Actions.RESTART}}findKey(t){return Object.keys(this.keyboard).filter(e=>this.keyboard[e]===t)[0]}setKey(t,e){let i=this.findKey(e);t!==i&&(console.log("old:"+i," new: "+t+" value: "+e),this.keyboard[t]=this.keyboard[i],delete this.keyboard[i])}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.default=class{constructor(t,e,i){this.position=t,this.dimension=e,this.settings=i}init(){throw new Error("Implement in subclass.")}toJSON(){return JSON.stringify(this)}fromJSON(t){const e=JSON.parse(t);Object.keys(e).forEach(t=>{this.hasOwnProperty(t)&&(this[t]=e[t])})}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const s=i(8),n=i(2),o=i(1),a=i(0);e.default=class extends s.default{constructor(t,e,i,s,h){super(new n.default(t,e),new o.default(i,s),h),this.color="#ffffff",this.contextId=a.ContextId.BACKGROUND}init(){}render(t){t.fillStyle=this.color,t.fillRect(this.position.x,this.position.y,this.dimension.width,this.dimension.height)}clear(t){t.clearRect(this.position.x,this.position.y,this.dimension.width,this.dimension.height)}}},function(t){t.exports=[{name:"Void Galaxy",assetId:"map-void-galaxy",waves:10,tiles:[[0,0,0,0,0,0,0,0,0,0,0],[0,1,1,1,1,1,1,1,1,1,0],[0,2,2,2,2,2,2,2,2,2,0],[3,2,1,1,1,1,1,1,1,2,0],[0,1,1,2,2,2,2,2,2,2,0],[0,2,2,2,1,1,1,1,1,1,0],[0,2,1,1,1,2,2,2,2,2,0],[0,2,2,2,2,2,1,1,1,2,0],[0,1,1,1,1,1,1,2,2,2,0],[4,2,2,2,2,2,2,2,1,1,0],[0,0,0,0,0,0,0,0,0,0,0]]}]},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.default=class{constructor(t){this.quadTree=t}detectCollision(){let t=[];this.quadTree.getAllObjects(t);for(let e=0;e<t.length;e++){let i=[];this.quadTree.findObjects(i,t[e]);for(let s=0;s<i.length;s++)t[e].isCollideAbleWith(i[s])&&Math.floor(t[e].position.x)<Math.floor(i[s].position.x)+i[s].dimension.width&&Math.floor(t[e].position.x)+t[e].dimension.width>Math.floor(i[s].position.x)&&Math.floor(t[e].position.y)<Math.floor(i[s].position.y)+i[s].dimension.height&&Math.floor(t[e].position.y)+t[e].dimension.height>Math.floor(i[s].position.y)&&t[e].alive&&i[s].alive&&(console.log(t[e]),t[e].colliding=!0,i[s].colliding=!0)}}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.default=class{constructor(t,e,i){this.audioContext=t,this.masterGain=e,this.buffer=i,this.gainNode=this.audioContext.createGain(),this.gainNode.gain.value=.2,this.gainNode.connect(this.masterGain),this.playing=!1}play(t=!1){this.source=this.audioContext.createBufferSource(),this.source.buffer=this.buffer,this.source.loop=t,this.source.connect(this.gainNode),this.source.start(0)}stop(){this.source&&this.source.stop(0)}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const s=i(12);e.default=class{constructor(){this.initAudioContext()}initAudioContext(){try{window.AudioContext=window.AudioContext||webkitAudioContext,this.audioContext=new AudioContext,this.masterGain=this.audioContext.createGain(),this.effectsGain=this.audioContext.createGain(),this.ambientGain=this.audioContext.createGain(),this.masterGain.gain.value=1,this.masterGain.connect(this.audioContext.destination),this.effectsGain.connect(this.masterGain),this.ambientGain.connect(this.masterGain),this.ambientGain.gain.value=1,this.effectsGain.gain.value=1}catch(t){console.log("Web Audio API is not supported in this browser")}}decodeAudio(t,e,i){this.audioContext.decodeAudioData(t).then(t=>i(t),t=>{console.log("Error with decoding audio data"+t)})}adjustMasterVolume(t){this.masterGain.gain.value=t}adjustAmbientVolume(t){this.ambientGain.gain.value=t}adjustEffectsVolume(t){this.effectsGain.gain.value=t}createSound(t,e){return new s.default(this.audioContext,e?this.ambientGain:this.effectsGain,t)}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),function(t){t.PLAYER="ship",t.ENEMY="enemy",t.ENEMY_BULLET="bulletEnemy",t.PLAYER_BULLET="bullet",t.BACKGROUND="background",t.MAP="map",t.GAME_OVER="gameOver",t.LASER="laser",t.MAIN_THEME="shockWave",t.EXPLOSION_I="explosion1",t.EXPLOSION_II="explosion2",t.BOX="box",t.ARENA="arena"}(e.EntityType||(e.EntityType={}))},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const s=i(3);class n{constructor(t=new s.default(0,0,0,0),e=0){this.level=e,this.maxObjects=10,this.maxLevels=5,this.hitBox=t,this.objects=[],this.nodes=[]}clear(){this.objects=[],this.nodes.forEach(t=>t.clear()),this.nodes=[]}getAllObjects(t){return this.nodes.forEach(e=>e.getAllObjects(t)),this.objects.forEach(e=>t.push(e)),t}findObjects(t,e){if(void 0===e)return void console.log("UNDEFINED OBJECT");let i=this.getIndex(e);return-1!==i&&this.nodes.length&&this.nodes[i].findObjects(t,e),this.objects.forEach(e=>t.push(e)),t}insert(t){if(void 0!==t)if(t instanceof Array)t.forEach(t=>this.insert(t));else{if(this.nodes.length>0){let e=this.getIndex(t);if(-1!==e)return void this.nodes[e].insert(t)}if(this.objects.push(t),this.objects.length>this.maxObjects&&this.level<this.maxLevels){void 0===this.nodes[0]&&this.split();let t=0;for(;t<this.objects.length;){let e=this.getIndex(this.objects[t]);-1!==e?this.nodes[e].insert(this.objects.splice(t,1)[0]):t++}}}}getIndex(t){let e=-1,i=this.hitBox.position.x+this.hitBox.width/2,s=this.hitBox.position.y+this.hitBox.height/2,n=t.position.y<s&&t.position.y+t.height<s,o=t.position.y>s;return t.position.x<i&&t.position.x+t.width<i?n?e=1:o&&(e=2):t.position.x>i&&(n?e=0:o&&(e=3)),e}split(){let t=this.hitBox.width/2|0,e=this.hitBox.height/2|0;this.nodes[0]=new n(new s.default(this.hitBox.position.x+t,this.hitBox.position.y,t,e),this.level+1),this.nodes[1]=new n(new s.default(this.hitBox.position.x,this.hitBox.position.y,t,e),this.level+1),this.nodes[2]=new n(new s.default(this.hitBox.position.x,this.hitBox.position.y+e,t,e),this.level+1),this.nodes[3]=new n(new s.default(this.hitBox.position.x+t,this.hitBox.position.y+e,t,e),this.level+1)}}e.default=n},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const s=i(15),n=i(4),o=i(3);e.default=class extends n.default{constructor(t,e){super(),this.running=!1,this.paused=!1,this.entities=[],this.quadTree=new s.default(new o.default(0,0,t.gameSize.width,t.gameSize.height)),this.collideables=[],this.movables=[],this.renderables=[],this.state={kills:0,cash:0}}update(t){this.movables.forEach(e=>e.move(t))}reset(){this.entities.forEach(t=>t.init())}scorePoints(t){this.state.cash+=t,this.state.kills++,this.notify()}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});class s{static create(t,e){let i=new XMLHttpRequest;i.addEventListener("load",()=>{e(i.response)}),i.open(t.method?t.method:s.defaults.method,t.url?t.url:s.defaults.url,t.async?t.async:s.defaults.async),t.hasOwnProperty("contentType")&&i.setRequestHeader("Content-Type",t.contentType?t.contentType:s.defaults.contentType),t.hasOwnProperty("responseType")&&(i.responseType=t.responseType),t.hasOwnProperty("data")&&"object"==typeof t.data&&(t.data=JSON.stringify(t.data)),i.send(t.data?t.data:null)}}s.defaults={url:"",method:"GET",contentType:"text/html",async:!0,data:null},e.default=s},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.default=class{constructor(t,e,i){this.image=t,this.frameWidth=e,this.frameHeight=i,this.framesPerRow=Math.floor(t.width/e)}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const s=i(18),n=i(17);var o;!function(t){t.SPRITE="sprite",t.SPRITE_SHEET="sprite-sheet",t.AUDIO="audio",t.AUDIO_AMB="audio-amb"}(o=e.AssetType||(e.AssetType={}));e.default=class{constructor(t){this.cache=[],this.assetsDir="assets/",this.downloadCount=0,this.queue=[],this.audioManager=t}done(){return this.downloadCount===this.queue.length}queueDownload(t,e,i=null){this.queue.push({id:t,path:this.assetsDir+e+"/"+t,type:e,opts:i})}loadAudio(t,e){n.default.create({method:"GET",url:t.path,responseType:"arraybuffer"},i=>{this.audioManager.decodeAudio(i,t.id,i=>{this.cache.audio[t.id]=i,this.downloadCount+=1,this.done()&&e()})})}loadSprite(t,e){let i=new Image;i.addEventListener("load",()=>{this.downloadCount++,this.done()&&e()}),i.src=t.path,this.cache.sprites[t.id]=i}loadSpriteSheet(t,e){let i=new Image;i.addEventListener("load",()=>{this.cache.spriteSheets[t.id]=new s.default(i,t.opts.frameWidth||0,t.opts.frameHeight||0),this.downloadCount+=1,this.done()&&e()}),i.src=t.path}downloadAll(t){this.queue.forEach(e=>{e.type===o.AUDIO?this.loadAudio(e,t):e.type===o.SPRITE?this.loadSprite(e,t):e.type===o.SPRITE_SHEET&&this.loadSpriteSheet(e,t)})}get(t,e=o.SPRITE){if(e===o.AUDIO||e===o.AUDIO_AMB){let i=e===o.AUDIO_AMB;return this.audioManager.createSound(this.cache[t],i)}return this.cache[t]}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const s=i(4);e.default=class extends s.default{constructor(t){super(),this.inputMap=t.keyboard,this.init(),this.initializeTouchHandler(),this.touches={start:[],move:[]}}init(){window.addEventListener("keydown",t=>{let e=" "!==t.key?t.key:"space";this.state[this.inputMap[e]]=!0,this.notify()}),window.addEventListener("keyup",t=>{let e=" "!==t.key?t.key:"space";this.state[this.inputMap[e]]=!1,this.notify()})}initializeTouchHandler(){let t=document.getElementById("move"),e=t||window;e.addEventListener("touchstart",function(t){t.preventDefault(),i=t.touches,n=t.touches[0].pageX,o=t.touches[0].pageY},!1),e.addEventListener("touchmove",function(t){r.reset(),t.preventDefault(),s=t.changedTouches,a=t.touches[0].pageX,h=t.touches[0].pageY;for(let e=0;e<t.touches.length;e++)s[e].pageX<i[e].pageX&&(r.state[r.inputMap.a]=!0),s[e].pageX>i[e].pageX&&(r.state[r.inputMap.d]=!0),s[e].pageY<i[e].pageY&&(r.state[r.inputMap.w]=!0),s[e].pageY>i[e].pageY&&(r.state[r.inputMap.s]=!0),r.notify()},!1),e.addEventListener("touchend",function(t){t.preventDefault(),r.reset()},!1),e.addEventListener("contextmenu",t=>(t.preventDefault(),!1));let i=[],s=[],n=0,o=0,a=0,h=0,r=this}shoot(){this.state[this.inputMap.space]=!0}cancelShoot(){this.state[this.inputMap.space]=!1}reset(){this.state[this.inputMap.w]=!1,this.state[this.inputMap.a]=!1,this.state[this.inputMap.s]=!1,this.state[this.inputMap.d]=!1}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const s=i(20),n=i(19),o=i(16),a=i(13),h=i(11),r=i(10),d=i(9);e.default=class{constructor(t,e){this.audioManager=new a.default,this.inputManager=new s.default(e),this.assetManager=new n.default(this.audioManager),this.state=new o.default(e,this.inputManager),this.collisionManager=new h.default(this.state.quadTree),this.contexts=t,this.settings=e}init(){console.log(r);let t=0;r[0].tiles.forEach(e=>{let i=0;e.forEach(e=>{const s=new d.default(i,t,30,30,this.settings);switch(e){case 0:s.blocked=!0,s.color="#000000";break;case 1:s.buildable=!0,s.color="#ff00ff";break;case 3:s.color="#00ff00";break;case 4:s.color="#ff0000"}this.state.entities.push(s),this.state.renderables.push(s),i+=30}),t+=30}),this.assetManager.downloadAll(()=>{this.state.renderables.forEach(t=>t.asset=this.assetManager.get(t.assetId)),this.state.reset()})}render(){this.state.renderables.forEach(t=>t.render(this.contexts.get(t.contextId)))}clear(){this.state.renderables.forEach(t=>t.clear(this.contexts.get(t.contextId)))}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const s=i(21),n=i(7),o=i(0),a=i(5);document.addEventListener("DOMContentLoaded",()=>{const t=document.getElementById("contents"),e=new Map,i=document.createElement("canvas"),h=document.createElement("canvas"),r=document.createElement("canvas");t.appendChild(i),t.appendChild(h),t.appendChild(r),e.set(o.ContextId.BACKGROUND,i.getContext("2d")),e.set(o.ContextId.CREEPS,h.getContext("2d")),e.set(o.ContextId.PLAYER,r.getContext("2d")),i.width=window.innerWidth,i.height=window.innerHeight,h.width=window.innerWidth,h.height=window.innerHeight,r.width=window.innerWidth,r.height=window.innerHeight;const d=new n.default(i),u=new s.default(e,d);new a.default(u).start()})}]);
//# sourceMappingURL=legend.js.map