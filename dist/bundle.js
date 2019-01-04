'use strict';(function(e,t){"object"===typeof exports&&"undefined"!==typeof module?t(exports):"function"===typeof define&&define.amd?define(["exports"],t):(e=e||self,t(e.canvasas={}))})(this,function(e){function t(a,c,b){var d=b+4>>>1;a=a[b>>>2];for(b=[];1024<a;){var g=c[d+1024-1];g=55296<=g&&56320>g?1023:1024;let e=c.subarray(d,d+=g);b.push(String.fromCharCode.apply(String,e));a-=g}return b.join("")+String.fromCharCode.apply(String,c.subarray(d,d+a))}function v(a){function c(a,b){if(!a)return"<yet unknown>";
a=a.buffer;return t(new Uint32Array(a),new Uint16Array(a),b)}var b={},d=a.env=a.env||{};d.abort=d.abort||function(a,e,k,l){var g=b.memory||d.memory;throw Error("abort: "+c(g,a)+" at "+c(g,e)+":"+k+":"+l);};d.trace=d.trace||function(a,e){console.log("trace: "+c(b.memory||d.memory,a)+(e?" ":"")+Array.prototype.slice.call(arguments,2,2+e).join(", "))};a.Math=a.Math||Math;a.Date=a.Date||Date;return b}function w(a,c){function b(){m!==d.buffer&&(m=d.buffer,z=new Int8Array(m),p=new Uint8Array(m),A=new Int16Array(m),
x=new Uint16Array(m),q=new Int32Array(m),n=new Uint32Array(m),E&&(v=new BigInt64Array(m),w=new BigUint64Array(m)),r=new Float32Array(m),u=new Float64Array(m))}c=c.exports;var d=c.memory,g=c["memory.allocate"],e=c["memory.fill"],k=c["memory.free"],l=c.table,f=c._setargc||function(){},m,z,p,A,x,q,n,r,u,v,w;b();a.newString=function(a){var c=a.length,d=g(4+(c<<1)),e=4+d>>>1;b();n[d>>>2]=c;for(let b=0;b<c;++b)x[e+b]=a.charCodeAt(b);return d};a.getString=function(a){b();return t(n,x,a)};a.newArray=function(a,
c,d){var f=a.constructor;f===Function?(f=a,a=null):void 0===c&&(c=a.length);var h=f.BYTES_PER_ELEMENT;if(!h)throw Error("not a typed array");var k=h*c,l=g(12);var p=1<<32-Math.clz32(k+8-1);p=g(p);b();n[l>>>2]=p;n[l+4>>>2]=0;n[l+8>>>2]=k;n[p>>>2]=k;n[p+4>>>2]=0;a?((new f(m,p+8,c)).set(a),a.length<c&&!d&&(a=h*a.length,e(p+8+a,0,k-a))):d||e(p+8,0,k);return l};a.getArray=function(a,c){var d=a.BYTES_PER_ELEMENT;if(!d)throw Error("not a typed array");b();var e=n[c+4>>>2];return new a(m,n[c>>>2]+8+e,(n[c+
8>>>2]-e)/d)};a.freeArray=function(a){b();k(n[a>>>2]);k(a)};a.newFunction=function(a){"function"===typeof a.original&&(a=a.original);var b=l.length;l.grow(1);l.set(b,a);return b};a.getFunction=function(a){return y(l.get(a),f)};a.memory=a.memory||d;a.table=a.table||l;return B(c,Object.defineProperties(a,{I8:{get:function(){b();return z}},U8:{get:function(){b();return p}},I16:{get:function(){b();return A}},U16:{get:function(){b();return x}},I32:{get:function(){b();return q}},U32:{get:function(){b();
return n}},I64:{get:function(){b();return v}},U64:{get:function(){b();return w}},F32:{get:function(){b();return r}},F64:{get:function(){b();return u}}}))}function y(a,c){var b=(...b)=>{c(b.length);return a(...b)};b.original=a;return b}function C(a,c){return w(v(c||(c={})),new WebAssembly.Instance(a,c))}function B(a,c){function b(a,b){return Object.prototype.hasOwnProperty.call(a,b)}c=c?Object.create(c):{};var d=a._setargc||function(){};for(let g in a){if(!b(a,g))continue;let l=a[g];var e=g.split(".");
let f=c;for(;1<e.length;){var h=e.shift();b(f,h)||(f[h]={});f=f[h]}e=e[0];h=e.indexOf("#");if(0<=h){let c=e.substring(0,h),k=f[c];if("undefined"===typeof k||!k.prototype){let a=function(...b){return a.wrap(a.prototype.constructor(0,...b))};a.prototype={};a.wrap=function(b){return Object.create(a.prototype,{[q]:{value:b,writable:!1}})};k&&Object.getOwnPropertyNames(k).forEach((b)=>Object.defineProperty(a,b,Object.getOwnPropertyDescriptor(k,b)));f[c]=a}e=e.substring(h+1);f=f[c].prototype;if(/^(get|set):/.test(e)){if(!b(f,
e=e.substring(4))){let b=a[g.replace("set:","get:")],c=a[g.replace("get:","set:")];Object.defineProperty(f,e,{get:function(){return b(this[q])},set:function(a){c(this[q],a)},enumerable:!0})}}else"constructor"===e?f[e]=y(l,d):Object.defineProperty(f,e,{value:function(...a){d(a.length);return l(this[q],...a)}})}else/^(get|set):/.test(e)?b(f,e=e.substring(4))||Object.defineProperty(f,e,{get:a[g.replace("set:","get:")],set:a[g.replace("get:","set:")],enumerable:!0}):f[e]="function"===typeof l?y(l,d):
l}return c}(function(a){a[a.ltr=0]="ltr";a[a.rtl=1]="rtl";a[a.inherit=2]="inherit"})(e.Direction||(e.Direction={}));(function(a){a[a.nonzero=0]="nonzero";a[a.evenodd=1]="evenodd"})(e.FillRule||(e.FillRule={}));(function(a){a[a.source_over=0]="source_over";a[a.source_in=1]="source_in";a[a.source_out=2]="source_out";a[a.source_atop=3]="source_atop";a[a.destination_over=4]="destination_over";a[a.destination_in=5]="destination_in";a[a.destination_out=6]="destination_out";a[a.destination_atop=7]="destination_atop";
a[a.lighter=8]="lighter";a[a.copy=9]="copy";a[a.xor=10]="xor";a[a.multiply=11]="multiply";a[a.screen=12]="screen";a[a.overlay=13]="overlay";a[a.darken=14]="darken";a[a.lighten=15]="lighten";a[a.color_dodge=16]="color_dodge";a[a.color_burn=17]="color_burn";a[a.hard_light=18]="hard_light";a[a.soft_light=19]="soft_light";a[a.difference=20]="difference";a[a.exclusion=21]="exclusion";a[a.hue=22]="hue";a[a.saturation=23]="saturation";a[a.color=24]="color";a[a.luminosity=25]="luminosity"})(e.GlobalCompositeOperation||
(e.GlobalCompositeOperation={}));(function(a){a[a.low=0]="low";a[a.medium=1]="medium";a[a.high=2]="high"})(e.ImageSmoothingQuality||(e.ImageSmoothingQuality={}));(function(a){a[a.butt=0]="butt";a[a.round=1]="round";a[a.square=2]="square"})(e.LineCap||(e.LineCap={}));(function(a){a[a.bevel=0]="bevel";a[a.round=1]="round";a[a.miter=2]="miter"})(e.LineJoin||(e.LineJoin={}));(function(a){a[a.left=0]="left";a[a.right=1]="right";a[a.center=2]="center";a[a.start=3]="start";a[a.end=4]="end"})(e.TextAlign||
(e.TextAlign={}));(function(a){a[a.top=0]="top";a[a.hanging=1]="hanging";a[a.middle=2]="middle";a[a.alphabetic=3]="alphabetic";a[a.ideographic=4]="ideographic";a[a.bottom=5]="bottom"})(e.TextBaseline||(e.TextBaseline={}));(function(a){a[a["source-over"]=0]="source-over";a[a["source-in"]=1]="source-in";a[a["source-out"]=2]="source-out";a[a["source-atop"]=3]="source-atop";a[a["destination-over"]=4]="destination-over";a[a["destination-in"]=5]="destination-in";a[a["destination-out"]=6]="destination-out";
a[a["destination-atop"]=7]="destination-atop";a[a.lighter=8]="lighter";a[a.copy=9]="copy";a[a.xor=10]="xor";a[a.multiply=11]="multiply";a[a.screen=12]="screen";a[a.overlay=13]="overlay";a[a.darken=14]="darken";a[a.lighten=15]="lighten";a[a["color-dodge"]=16]="color-dodge";a[a["color-burn"]=17]="color-burn";a[a["hard-light"]=18]="hard-light";a[a["soft-light"]=19]="soft-light";a[a.difference=20]="difference";a[a.exclusion=21]="exclusion";a[a.hue=22]="hue";a[a.saturation=23]="saturation";a[a.color=24]=
"color";a[a.luminosity=25]="luminosity"})(e.GlobalCompositeOperationLookup||(e.GlobalCompositeOperationLookup={}));let D={0:"repeat",1:"repeat-x",2:"repeat-y",3:"no-repeat"},u=document.createElement("canvas").getContext("2d");class r{constructor(){this.contexts=new Map;this.strings=new Map;this.images={};this.patterns={};this.gradients={};this.wasm=null;this.use_canvas=this.use_image=this.image_loaded=0}useContext(a,c){if(0===this.use_canvas)throw Error("CanvasASInterop hasn't loaded yet.");var b=
this.wasm.getFunction(this.use_canvas);this.contexts.set(a,c);b(this.wasm.newString(a));return this}useImage(a,c){if(0===this.use_image)throw Error("CanvasASInterop hasn't loaded yet.");if(0===this.image_loaded)throw Error("CanvasASInterop hasn't loaded yet.");c.then((a)=>a.blob()).then((a)=>createImageBitmap(a)).then((b)=>{var c=this.wasm.newString(a);c=this.wasm.getFunction(this.use_image)(c);this.images[this.wasm.I32[c/Int32Array.BYTES_PER_ELEMENT]]=b;this.wasm.getFunction(this.image_loaded)(c,
b.width,b.height)});return this}init(){return{add_color_stop:this.add_color_stop.bind(this),create_linear_gradient:this.create_linear_gradient.bind(this),create_pattern:this.create_pattern.bind(this),create_radial_gradient:this.create_radial_gradient.bind(this),create_string:this.create_string.bind(this),create_image:this.create_image.bind(this),get_image_data:this.get_image_data.bind(this),inspect:this.inspect.bind(this),remove_image:this.remove_image.bind(this),remove_pattern:this.remove_pattern.bind(this),
remove_gradient:this.remove_gradient.bind(this),report_use_image:this.report_use_image.bind(this),report_image_loaded:this.report_image_loaded.bind(this),put_image_data:this.put_image_data.bind(this),put_image_data_dirty:this.put_image_data_dirty.bind(this),report_use_canvas:this.report_use_canvas.bind(this),render:this.render.bind(this),log:this.log.bind(this)}}render(a,c){var b=0,d=this.contexts.get(this.wasm.getString(a));if(!d)throw Error("Invalid context: "+a);for(a=this.wasm.getArray(Float64Array,
c);b<a.length&&6!==a[b];){switch(a[b]){case 0:d.arc(a[b+2],a[b+3],a[b+4],a[b+5],a[b+6],1===a[b+7]);break;case 1:d.arcTo(a[b+2],a[b+3],a[b+4],a[b+5],a[b+6]);break;case 2:d.beginPath();break;case 3:d.bezierCurveTo(a[b+2],a[b+3],a[b+4],a[b+5],a[b+6],a[b+7]);break;case 7:d.clearRect(a[b+2],a[b+3],a[b+4],a[b+5]);break;case 4:d.clip();break;case 5:d.closePath();break;case 8:d.direction=e.Direction[a[b+2]];break;case 10:if(!this.images[a[b+2]])break;d.drawImage(this.images[a[b+2]],a[b+3],a[b+4],a[b+5],a[b+
6],a[b+7],a[b+8],a[b+9],a[b+10]);break;case 11:d.ellipse(a[b+2],a[b+3],a[b+4],a[b+5],a[b+6],a[b+7],a[b+8],1===a[b+9]);break;case 12:d.fill(e.FillRule[a[b+2]]);break;case 13:d.fillStyle=this.gradients[a[b+2]];break;case 14:d.fillStyle=this.patterns[a[b+2]];break;case 15:d.fillRect(a[b+2],a[b+3],a[b+4],a[b+5]);break;case 16:if(!this.strings.has(a[b+2]))continue;d.fillStyle=this.strings.get(a[b+2]);break;case 17:if(!this.strings.has(a[b+2]))continue;d.fillText(this.strings.get(a[b+2]),a[b+3],a[b+4],
-1===a[b+5]?void 0:a[b+5]);break;case 18:if(!this.strings.has(a[b+2]))continue;d.filter=this.strings.get(a[b+2]);break;case 19:if(!this.strings.has(a[b+2]))continue;d.font=this.strings.get(a[b+2]);break;case 20:d.globalAlpha=a[b+2];break;case 21:d.globalCompositeOperation=e.GlobalCompositeOperationLookup[a[b+2]];break;case 22:d.imageSmoothingEnabled=1===a[b+2];break;case 23:d.imageSmoothingQuality=e.ImageSmoothingQuality[a[b+2]];break;case 24:break;case 25:d.lineCap=e.LineCap[a[b+2]];break;case 26:d.setLineDash(this.wasm.getArray(Float64Array,
a[b+2]));break;case 27:d.lineDashOffset=a[b+2];break;case 28:d.lineJoin=e.LineJoin[a[b+2]];break;case 29:d.lineTo(a[b+2],a[b+3]);break;case 30:d.lineWidth=a[b+2];break;case 31:d.miterLimit=a[b+2];break;case 32:d.moveTo(a[b+2],a[b+3]);break;case 33:d.quadraticCurveTo(a[b+2],a[b+3],a[b+4],a[b+5]);break;case 34:d.rect(a[b+2],a[b+3],a[b+4],a[b+5]);break;case 35:d.restore();break;case 36:d.rotate(a[b+2]);break;case 37:d.save();break;case 38:d.scale(a[b+2],a[b+3]);break;case 39:d.setTransform(a[b+2],a[b+
3],a[b+4],a[b+5],a[b+6],a[b+7]);break;case 40:d.shadowBlur=a[b+2];break;case 41:if(!this.strings.has(a[b+2]))continue;d.shadowColor=this.strings.get(a[b+2]);break;case 42:d.shadowOffsetX=a[b+2];break;case 43:d.shadowOffsetY=a[b+2];break;case 48:this.strings.has(a[b+2])||(d.fillStyle=this.strings.get(a[b+2]));break;case 45:d.strokeStyle=this.gradients[a[b+2]];break;case 46:d.strokeStyle=this.patterns[a[b+2]];break;case 50:d.textAlign=e.TextAlign[a[b+2]];break;case 51:d.textBaseline=e.TextBaseline[a[b+
2]];break;case 53:d.transform(a[b+2],a[b+3],a[b+4],a[b+5],a[b+6],a[b+7]);break;case 52:d.translate(a[b+2],a[b+3]);break;default:throw Error("Invalid canvas instruction type: "+a[b]);}b=a[b+1]}}add_color_stop(a,c,b){this.gradients[a].addColorStop(c,this.wasm.getString(b))}create_image(a,c){this.load_image(a,c)}create_linear_gradient(a,c,b,d,e){this.gradients[a]=u.createLinearGradient(c,b,d,e)}create_pattern(a,c,b){this.patterns[a]=u.createPattern(this.images[c],D[b])}create_radial_gradient(a,c,b,d,
e,h,k){this.gradients[a]=u.createRadialGradient(c,b,d,e,h,k)}create_string(a,c){this.strings.set(a,this.wasm.getString(c))}get_image_data(a,c,b,d,e,h){c/=Int32Array.BYTES_PER_ELEMENT;a=this.wasm.getString(a);if(!this.contexts.has(a))throw Error("Invalid context: "+a);b=this.contexts.get(a).getImageData(b,d,e,h);var {U32:d,I32:e}=this.wasm;d[c]=this.wasm.newArray(b.data);e[c+1]=b.width;e[c+2]=b.height}put_image_data(a,c,b,d){a=this.wasm.getString(a);if(!this.contexts.has(a))throw Error("Cannot find context: "+
a);a=this.contexts.get(a);c/=Int32Array.BYTES_PER_ELEMENT;var e=this.wasm.I32[c];c=new ImageData(this.wasm.I32[c+1],this.wasm.I32[c+2]);e=this.wasm.getArray(Uint8ClampedArray,e);for(var h=0;h<e.length;h++)c.data[h]=e[h];a.putImageData(c,b,d)}put_image_data_dirty(a,c,b,d,e,h,k,l){var {U32:f,I32:g}=this.wasm;a=this.wasm.getString(a);if(!this.contexts.has(a))throw Error("Cannot find context: "+a);a=this.contexts.get(a);c/=Int32Array.BYTES_PER_ELEMENT;f=f[c];g=new ImageData(g[c+1],g[c+2]);f=this.wasm.getArray(Uint8ClampedArray,
f);for(c=0;c<f.length;c++)g.data[c]=f[c];a.putImageData(g,b,d,e,h,k,l)}remove_image(a){this.images[a]=null}remove_pattern(a){this.patterns[a]=null}remove_gradient(a){this.gradients[a]=null}async load_image(a,c){c=this.wasm.getString(c);c=await (await fetch(c)).blob();c=await createImageBitmap(c);this.images[this.wasm.I32[a/Int32Array.BYTES_PER_ELEMENT]]=c;this.wasm.getFunction(this.image_loaded)(a,c.width,c.height)}report_use_image(a){this.use_image=a}report_use_canvas(a){this.use_canvas=a}report_image_loaded(a){this.image_loaded=
a}inspect(a){var c=[];a=this.wasm.getArray(Float64Array,a);for(var b=0;b<a.length;){switch(a[b]){case 0:c.push("Arc");break;case 1:c.push("ArcTo");break;case 2:c.push("BeginPath");break;case 3:c.push("BezierCurveTo");break;case 4:c.push("Clip");break;case 5:c.push("ClosePath");break;case 6:c.push("Commit");break;case 7:c.push("ClearRect");break;case 8:c.push("Direction");break;case 9:c.push("DrawFocusIfNeeded");break;case 10:c.push("DrawImage");break;case 11:c.push("Ellipse");break;case 12:c.push("Fill");
break;case 13:c.push("FillGradient");break;case 14:c.push("FillPattern");break;case 15:c.push("FillRect");break;case 16:c.push("FillStyle");break;case 17:c.push("FillText");break;case 18:c.push("Filter");break;case 19:c.push("Font");break;case 20:c.push("GlobalAlpha");break;case 21:c.push("GlobalCompositeOperation");break;case 22:c.push("ImageSmoothingEnabled");break;case 23:c.push("ImageSmoothingQuality");break;case 25:c.push("LineCap");break;case 26:c.push("LineDash");break;case 27:c.push("LineDashOffset");
break;case 28:c.push("LineJoin");break;case 29:c.push("LineTo");break;case 30:c.push("LineWidth");break;case 31:c.push("MiterLimit");break;case 32:c.push("MoveTo");break;case 33:c.push("QuadraticCurveTo");break;case 34:c.push("Rect");break;case 35:c.push("Restore");break;case 36:c.push("Rotate");break;case 37:c.push("Save");break;case 38:c.push("Scale");break;case 39:c.push("SetTransform");break;case 40:c.push("ShadowBlur");break;case 41:c.push("ShadowColor");break;case 42:c.push("ShadowOffsetX");
break;case 43:c.push("ShadowOffsetY");break;case 44:c.push("Stroke");break;case 45:c.push("StrokeGradient");break;case 46:c.push("StrokePattern");break;case 47:c.push("StrokeRect");break;case 48:c.push("StrokeStyle");break;case 49:c.push("StrokeText");break;case 50:c.push("TextAlign");break;case 51:c.push("TextBaseline");break;case 52:c.push("Translate");break;case 53:c.push("Transform")}if(24===a[b])break;b=a[b+1]}console.log(c)}log(a,c){console.log(a,c)}}let E="undefined"!==typeof BigUint64Array,
q=Symbol();var F=async function(a,c){return w(v(c||(c={})),(await WebAssembly.instantiateStreaming(a,c)).instance)};e.CanvasASInterop=r;e.instantiate=function(a,c={}){let b=new r;c.__as_interop=b.init();a=C(a,c);b.wasm=a;return b};e.instantiateBuffer=function(a,c={}){let b=new r;c.__as_interop=b.init();a=C(new WebAssembly.Module(a),c);b.wasm=a;return b};e.instantiateStreaming=async function(a,c={}){let b=new r;c.__as_interop=b.init();a=await F(a,c);b.wasm=a;return b};e.demangle=B;e.canvasPatternTypes=
D;Object.defineProperty(e,"__esModule",{value:!0})});
