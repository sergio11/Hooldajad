!function(t){"use strict";"function"==typeof define&&define.amd?define(["jquery"],t):t(jQuery)}(function($){"use strict";function t(t){if(t instanceof Date)return t;if(String(t).match(o))return String(t).match(/^[0-9]*$/)&&(t=Number(t)),String(t).match(/\-/)&&(t=String(t).replace(/\-/g,"/")),new Date(t);throw new Error("Couldn't cast `"+t+"` to a date object.")}function e(t){var e=t.toString().replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1");return new RegExp(e)}function s(t){return function(s){var i=s.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);if(i)for(var a=0,o=i.length;o>a;++a){var h=i[a].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/),l=e(h[0]),c=h[1]||"",u=h[3]||"",f=null;h=h[2],r.hasOwnProperty(h)&&(f=r[h],f=Number(t[f])),null!==f&&("!"===c&&(f=n(u,f)),""===c&&10>f&&(f="0"+f.toString()),s=s.replace(l,f.toString()))}return s=s.replace(/%%/,"%")}}function n(t,e){var s="s",n="";return t&&(t=t.replace(/(:|;|\s)/gi,"").split(/\,/),1===t.length?s=t[0]:(n=t[0],s=t[1])),1===Math.abs(e)?n:s}var i=100,a=[],o=[];o.push(/^[0-9]*$/.source),o.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source),o.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source),o=new RegExp(o.join("|"));var r={Y:"years",m:"months",w:"weeks",d:"days",D:"totalDays",H:"hours",M:"minutes",S:"seconds"},h=function(t,e,s){this.el=t,this.$el=$(t),this.interval=null,this.offset={},this.instanceNumber=a.length,a.push(this),this.$el.data("countdown-instance",this.instanceNumber),s&&(this.$el.on("update.countdown",s),this.$el.on("stoped.countdown",s),this.$el.on("finish.countdown",s)),this.setFinalDate(e),this.start()};$.extend(h.prototype,{start:function(){null!==this.interval&&clearInterval(this.interval);var t=this;this.update(),this.interval=setInterval(function(){t.update.call(t)},i)},stop:function(){clearInterval(this.interval),this.interval=null,this.dispatchEvent("stoped")},toggle:function(){this.interval?this.stop():this.start()},pause:function(){this.stop()},resume:function(){this.start()},remove:function(){this.stop.call(this),a[this.instanceNumber]=null,delete this.$el.data().countdownInstance},setFinalDate:function(e){this.finalDate=t(e)},update:function(){return 0===this.$el.closest("html").length?void this.remove():(this.totalSecsLeft=this.finalDate.getTime()-(new Date).getTime(),this.totalSecsLeft=Math.ceil(this.totalSecsLeft/1e3),this.totalSecsLeft=this.totalSecsLeft<0?0:this.totalSecsLeft,this.offset={seconds:this.totalSecsLeft%60,minutes:Math.floor(this.totalSecsLeft/60)%60,hours:Math.floor(this.totalSecsLeft/60/60)%24,days:Math.floor(this.totalSecsLeft/60/60/24)%7,totalDays:Math.floor(this.totalSecsLeft/60/60/24),weeks:Math.floor(this.totalSecsLeft/60/60/24/7),months:Math.floor(this.totalSecsLeft/60/60/24/30),years:Math.floor(this.totalSecsLeft/60/60/24/365)},void(0===this.totalSecsLeft?(this.stop(),this.dispatchEvent("finish")):this.dispatchEvent("update")))},dispatchEvent:function(t){var e=$.Event(t+".countdown");e.finalDate=this.finalDate,e.offset=$.extend({},this.offset),e.strftime=s(this.offset),this.$el.trigger(e)}}),$.fn.countdown=function(){var t=Array.prototype.slice.call(arguments,0);return this.each(function(){var e=$(this).data("countdown-instance");if(void 0!==e){var s=a[e],n=t[0];h.prototype.hasOwnProperty(n)?s[n].apply(s,t.slice(1)):null===String(n).match(/^[$A-Z_][0-9A-Z_$]*$/i)?(s.setFinalDate.call(s,n),s.start()):$.error("Method %s does not exist on jQuery.countdown".replace(/\%s/gi,n))}else new h(this,t[0],t[1])})}});