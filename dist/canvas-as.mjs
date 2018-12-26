import{instantiateStreaming as t}from"assemblyscript/lib/loader";var e,i,r,a,s,o,n,c,h;!function(t){t[t.ltr=0]="ltr",t[t.rtl=1]="rtl",t[t.inherit=2]="inherit"}(e||(e={})),function(t){t[t.nonzero=0]="nonzero",t[t.evenodd=1]="evenodd"}(i||(i={})),function(t){t[t.source_over=0]="source_over",t[t.source_in=1]="source_in",t[t.source_out=2]="source_out",t[t.source_atop=3]="source_atop",t[t.destination_over=4]="destination_over",t[t.destination_in=5]="destination_in",t[t.destination_out=6]="destination_out",t[t.destination_atop=7]="destination_atop",t[t.lighter=8]="lighter",t[t.copy=9]="copy",t[t.xor=10]="xor",t[t.multiply=11]="multiply",t[t.screen=12]="screen",t[t.overlay=13]="overlay",t[t.darken=14]="darken",t[t.lighten=15]="lighten",t[t.color_dodge=16]="color_dodge",t[t.color_burn=17]="color_burn",t[t.hard_light=18]="hard_light",t[t.soft_light=19]="soft_light",t[t.difference=20]="difference",t[t.exclusion=21]="exclusion",t[t.hue=22]="hue",t[t.saturation=23]="saturation",t[t.color=24]="color",t[t.luminosity=25]="luminosity"}(r||(r={})),function(t){t[t.low=0]="low",t[t.medium=1]="medium",t[t.high=2]="high"}(a||(a={})),function(t){t[t.butt=0]="butt",t[t.round=1]="round",t[t.square=2]="square"}(s||(s={})),function(t){t[t.bevel=0]="bevel",t[t.round=1]="round",t[t.miter=2]="miter"}(o||(o={})),function(t){t[t.left=0]="left",t[t.right=1]="right",t[t.center=2]="center",t[t.start=3]="start",t[t.end=4]="end"}(n||(n={})),function(t){t[t.top=0]="top",t[t.hanging=1]="hanging",t[t.middle=2]="middle",t[t.alphabetic=3]="alphabetic",t[t.ideographic=4]="ideographic",t[t.bottom=5]="bottom"}(c||(c={})),function(t){t[t["source-over"]=0]="source-over",t[t["source-in"]=1]="source-in",t[t["source-out"]=2]="source-out",t[t["source-atop"]=3]="source-atop",t[t["destination-over"]=4]="destination-over",t[t["destination-in"]=5]="destination-in",t[t["destination-out"]=6]="destination-out",t[t["destination-atop"]=7]="destination-atop",t[t.lighter=8]="lighter",t[t.copy=9]="copy",t[t.xor=10]="xor",t[t.multiply=11]="multiply",t[t.screen=12]="screen",t[t.overlay=13]="overlay",t[t.darken=14]="darken",t[t.lighten=15]="lighten",t[t["color-dodge"]=16]="color-dodge",t[t["color-burn"]=17]="color-burn",t[t["hard-light"]=18]="hard-light",t[t["soft-light"]=19]="soft-light",t[t.difference=20]="difference",t[t.exclusion=21]="exclusion",t[t.hue=22]="hue",t[t.saturation=23]="saturation",t[t.color=24]="color",t[t.luminosity=25]="luminosity"}(h||(h={}));var l={0:"repeat",1:"repeat-x",2:"repeat-y",3:"no-repeat"},d=function(t,e,i){this.strings={},this.images={},this.patterns={},this.gradients={},this.wasm=null,this.ctx=t,this.loaded=this.init(e,i)};d.prototype.init=function(e,i){void 0===i&&(i={});try{var r=this;return i.__as_interop={add_color_stop:r.add_color_stop.bind(r),create_image:r.create_image.bind(r),create_linear_gradient:r.create_linear_gradient.bind(r),create_pattern:r.create_pattern.bind(r),create_radial_gradient:r.create_radial_gradient.bind(r),create_string:r.create_string.bind(r),remove_image:r.remove_image.bind(r),remove_string:r.remove_string.bind(r),remove_pattern:r.remove_pattern.bind(r)},Promise.resolve(t(e,i)).then(function(t){r.wasm=t,r.wasm.init()})}catch(t){return Promise.reject(t)}},d.prototype.update=function(){this.wasm.update()},d.prototype.draw=function(){var t=this.wasm.getArray(Float64Array,this.wasm.draw());this.render(t)},d.prototype.render=function(t){for(var r=0,l=0;r<t.length&&6!==t[r];){switch(l=t[r+1],t[r]){case 0:this.ctx.arc(t[r+2],t[r+3],t[r+4],t[r+5],t[r+6],1===t[r+7]);break;case 1:this.ctx.arcTo(t[r+2],t[r+3],t[r+4],t[r+5],t[r+6]);break;case 2:this.ctx.beginPath();break;case 3:this.ctx.bezierCurveTo(t[r+2],t[r+3],t[r+4],t[r+5],t[r+6],t[r+7]);break;case 7:this.ctx.clearRect(t[r+2],t[r+3],t[r+4],t[r+5]);break;case 4:this.ctx.clip();break;case 5:this.ctx.closePath();break;case 8:this.ctx.direction=e[t[r+2]];break;case 10:if(!this.images[t[r+2]])break;this.ctx.drawImage(this.images[t[r+2]],t[r+3],t[r+4],t[r+5],t[r+6],t[r+7],t[r+8],t[r+9],t[r+10]);break;case 11:this.ctx.ellipse(t[r+2],t[r+3],t[r+4],t[r+5],t[r+6],t[r+7],t[r+8],1===t[r+9]);break;case 12:this.ctx.fill(i[t[r+2]]);break;case 13:this.ctx.fillStyle=this.gradients[t[r+2]];break;case 14:this.ctx.fillStyle=this.patterns[t[r+2]];break;case 15:this.ctx.fillRect(t[r+2],t[r+3],t[r+4],t[r+5]);case 16:this.ctx.fillStyle=this.strings[t[r+2]];break;case 17:this.ctx.fillText(this.strings[t[r+2]],t[r+3],t[r+4],-1===t[r+5]?void 0:t[r+5]);break;case 18:this.ctx.filter=this.strings[t[r+2]];break;case 19:this.ctx.font=this.strings[t[r+2]];break;case 20:this.ctx.globalAlpha=t[r+2];break;case 21:this.ctx.globalCompositeOperation=h[t[r+2]];break;case 22:this.ctx.imageSmoothingEnabled=1===t[r+2];break;case 23:this.ctx.imageSmoothingQuality=a[t[r+2]];break;case 24:this.ctx.lineCap=s[t[r+2]];break;case 25:this.ctx.setLineDash(this.wasm.getArray(Float64Array,t[r+2]));break;case 26:this.ctx.lineDashOffset=t[r+2];break;case 27:this.ctx.lineJoin=o[t[r+2]];break;case 28:this.ctx.lineTo(t[r+2],t[r+3]);break;case 29:this.ctx.lineWidth=t[r+2];break;case 30:this.ctx.miterLimit=t[r+2];break;case 31:this.ctx.moveTo(t[r+2],t[r+3]);break;case 32:this.ctx.quadraticCurveTo(t[r+2],t[r+3],t[r+4],t[r+5]);break;case 33:this.ctx.rect(t[r+2],t[r+3],t[r+4],t[r+5]);break;case 34:this.ctx.restore();break;case 35:this.ctx.rotate(t[r+2]);break;case 36:this.ctx.save();break;case 37:this.ctx.scale(t[r+2],t[r+3]);break;case 38:this.ctx.setTransform(t[r+2],t[r+3],t[r+4],t[r+5],t[r+6],t[r+7]);break;case 39:this.ctx.shadowBlur=t[r+2];break;case 40:this.ctx.shadowColor=this.strings[t[r+2]];break;case 41:this.ctx.shadowOffsetX=t[r+2];break;case 42:this.ctx.shadowOffsetY=t[r+2];break;case 47:this.ctx.fillStyle=this.strings[t[r+2]];break;case 44:this.ctx.strokeStyle=this.gradients[t[r+2]];break;case 45:this.ctx.strokeStyle=this.patterns[t[r+2]];break;case 49:this.ctx.textAlign=n[t[r+2]];break;case 50:this.ctx.textBaseline=c[t[r+2]];break;case 52:this.ctx.transform(t[r+2],t[r+3],t[r+4],t[r+5],t[r+6],t[r+7]);break;case 51:this.ctx.translate(t[r+2],t[r+3]);break;default:throw new Error("Invalid canvas instruction type: "+t[r])}r+=l}},d.prototype.add_color_stop=function(t,e,i){this.gradients[t].addColorStop(e,this.wasm.getString(i))},d.prototype.create_image=function(t,e){this.load_image(t,e)},d.prototype.create_linear_gradient=function(t,e,i,r,a){this.gradients[t]=this.ctx.createLinearGradient(e,i,r,a)},d.prototype.create_pattern=function(t,e,i){this.patterns[t]=this.ctx.createPattern(this.images[e],l[i])},d.prototype.create_radial_gradient=function(t,e,i,r,a,s,o){this.gradients[t]=this.ctx.createRadialGradient(e,i,r,a,s,o)},d.prototype.create_string=function(t,e){this.strings[t]=this.wasm.getString(e)},d.prototype.remove_image=function(t){this.images[t]=null},d.prototype.remove_string=function(t){this.strings[t]=null},d.prototype.remove_pattern=function(t){this.patterns[t]=null},d.prototype.load_image=function(t,e){try{var i=this,r=i.wasm.getString(e);return Promise.resolve(fetch(r)).then(function(e){return Promise.resolve(e.blob()).then(function(e){return Promise.resolve(createImageBitmap(e)).then(function(e){var r=t/Int32Array.BYTES_PER_ELEMENT;i.images[i.wasm.I32[r]]=e,i.wasm.I32[r+1]=1,i.wasm.I32[r+2]=e.width,i.wasm.I32[r+3]=e.height})})})}catch(t){return Promise.reject(t)}};export{d as CanvasASInterop,h as GlobalCompositeOperationLookup,l as canvasPatternTypes};
//# sourceMappingURL=canvas-as.mjs.map
