/* prevent execution of jQuery if included more then once */
if(typeof window.jQuery == "undefined") {
/*
 * jQuery 1.0.2 - New Wave Javascript
 *
 * Copyright (c) 2006 John Resig (jquery.com)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * $Date: 2008/08/18 03:33:31 $
 * $Rev: 413 $
 */

// Global undefined variable
window.undefined = window.undefined;
jQuery = function(a,c) {

	// Shortcut for document ready (because $(document).each() is silly)
	if ( a && typeof a == "function" && jQuery.fn.ready )
		return jQuery(document).ready(a);

	// Make sure that a selection was provided
	a = a || jQuery.context || document;

	// Watch for when a jQuery object is passed as the selector
	if ( a.jquery )
		return jQuery( jQuery.merge( a, [] ) );

	// Watch for when a jQuery object is passed at the context
	if ( c && c.jquery )
		return jQuery( c ).find(a);

	// If the context is global, return a new object
	if ( window == this )
		return new jQuery(a,c);

	// Handle HTML strings
	var m = /^[^<]*(<.+>)[^>]*$/.exec(a);
	if ( m ) a = jQuery.clean( [ m[1] ] );

	// Watch for when an array is passed in
	this.get( a.constructor == Array || a.length && !a.nodeType && a[0] != undefined && a[0].nodeType ?
		// Assume that it is an array of DOM Elements
		jQuery.merge( a, [] ) :

		// Find the matching elements and save them for later
		jQuery.find( a, c ) );

  // See if an extra function was provided
	var fn = arguments[ arguments.length - 1 ];

	// If so, execute it in context
	if ( fn && typeof fn == "function" )
		this.each(fn);
};

// Map over the $ in case of overwrite
if ( typeof $ != "undefined" )
	jQuery._$ = $;

// Map the jQuery namespace to the '$' one
var $ = jQuery;

jQuery.fn = jQuery.prototype = {
	jquery: "1.0.2",

	size: function() {
		return this.length;
	},

	get: function( num ) {
		// Watch for when an array (of elements) is passed in
		if ( num && num.constructor == Array ) {

			// Use a tricky hack to make the jQuery object
			// look and feel like an array
			this.length = 0;
			[].push.apply( this, num );

			return this;
		} else
			return num == undefined ?

				// Return a 'clean' array
				jQuery.merge( this, [] ) :

				// Return just the object
				this[num];
	},
	each: function( fn, args ) {
		return jQuery.each( this, fn, args );
	},
	index: function( obj ) {
		var pos = -1;
		this.each(function(i){
			if ( this == obj ) pos = i;
		});
		return pos;
	},

	attr: function( key, value, type ) {
		// Check to see if we're setting style values
		return key.constructor != String || value != undefined ?
			this.each(function(){
				// See if we're setting a hash of styles
				if ( value == undefined )
					// Set all the styles
					for ( var prop in key )
						jQuery.attr(
							type ? this.style : this,
							prop, key[prop]
						);

				// See if we're setting a single key/value style
				else
					jQuery.attr(
						type ? this.style : this,
						key, value
					);
			}) :

			// Look for the case where we're accessing a style value
			jQuery[ type || "attr" ]( this[0], key );
	},

	css: function( key, value ) {
		return this.attr( key, value, "curCSS" );
	},
	text: function(e) {
		e = e || this;
		var t = "";
		for ( var j = 0; j < e.length; j++ ) {
			var r = e[j].childNodes;
			for ( var i = 0; i < r.length; i++ )
				if ( r[i].nodeType != 8 )
					t += r[i].nodeType != 1 ?
						r[i].nodeValue : jQuery.fn.text([ r[i] ]);
		}
		return t;
	},

	wrap: function() {
		// The elements to wrap the target around
		var a = jQuery.clean(arguments);

		// Wrap each of the matched elements individually
		return this.each(function(){
			// Clone the structure that we're using to wrap
			var b = a[0].cloneNode(true);

			// Insert it before the element to be wrapped
			this.parentNode.insertBefore( b, this );

			// Find the deepest point in the wrap structure
			while ( b.firstChild )
				b = b.firstChild;

			// Move the matched element to within the wrap structure
			b.appendChild( this );
		});
	},

	append: function() {
		return this.domManip(arguments, true, 1, function(a){
			this.appendChild( a );
		});
	},

	prepend: function() {
		return this.domManip(arguments, true, -1, function(a){
			this.insertBefore( a, this.firstChild );
		});
	},

	before: function() {
		return this.domManip(arguments, false, 1, function(a){
			this.parentNode.insertBefore( a, this );
		});
	},

	after: function() {
		return this.domManip(arguments, false, -1, function(a){
			this.parentNode.insertBefore( a, this.nextSibling );
		});
	},
	end: function() {
		return this.get( this.stack.pop() );
	},
	find: function(t) {
		return this.pushStack( jQuery.map( this, function(a){
			return jQuery.find(t,a);
		}), arguments );
	},
	clone: function(deep) {
		return this.pushStack( jQuery.map( this, function(a){
			return a.cloneNode( deep != undefined ? deep : true );
		}), arguments );
	},

	filter: function(t) {
		return this.pushStack(
			t.constructor == Array &&
			jQuery.map(this,function(a){
				for ( var i = 0; i < t.length; i++ )
					if ( jQuery.filter(t[i],[a]).r.length )
						return a;
			}) ||

			t.constructor == Boolean &&
			( t ? this.get() : [] ) ||

			typeof t == "function" &&
			jQuery.grep( this, t ) ||

			jQuery.filter(t,this).r, arguments );
	},

	not: function(t) {
		return this.pushStack( t.constructor == String ?
			jQuery.filter(t,this,false).r :
			jQuery.grep(this,function(a){ return a != t; }), arguments );
	},

	add: function(t) {
		return this.pushStack( jQuery.merge( this, t.constructor == String ?
			jQuery.find(t) : t.constructor == Array ? t : [t] ), arguments );
	},
	is: function(expr) {
		return expr ? jQuery.filter(expr,this).r.length > 0 : false;
	},
	domManip: function(args, table, dir, fn){
		var clone = this.size() > 1;
		var a = jQuery.clean(args);

		return this.each(function(){
			var obj = this;

			if ( table && this.nodeName.toUpperCase() == "TABLE" && a[0].nodeName.toUpperCase() != "THEAD" ) {
				var tbody = this.getElementsByTagName("tbody");

				if ( !tbody.length ) {
					obj = document.createElement("tbody");
					this.appendChild( obj );
				} else
					obj = tbody[0];
			}

			for ( var i = ( dir < 0 ? a.length - 1 : 0 );
				i != ( dir < 0 ? dir : a.length ); i += dir ) {
					fn.apply( obj, [ clone ? a[i].cloneNode(true) : a[i] ] );
			}
		});
	},
	pushStack: function(a,args) {
		var fn = args && args[args.length-1];
		var fn2 = args && args[args.length-2];
		
		if ( fn && fn.constructor != Function ) fn = null;
		if ( fn2 && fn2.constructor != Function ) fn2 = null;

		if ( !fn ) {
			if ( !this.stack ) this.stack = [];
			this.stack.push( this.get() );
			this.get( a );
		} else {
			var old = this.get();
			this.get( a );

			if ( fn2 && a.length || !fn2 )
				this.each( fn2 || fn ).get( old );
			else
				this.get( old ).each( fn );
		}

		return this;
	}
};

jQuery.extend = jQuery.fn.extend = function(obj,prop) {
	if ( !prop ) { prop = obj; obj = this; }
	for ( var i in prop ) obj[i] = prop[i];
	return obj;
};

jQuery.extend({
	init: function(){
		jQuery.initDone = true;

		jQuery.each( jQuery.macros.axis, function(i,n){
			jQuery.fn[ i ] = function(a) {
				var ret = jQuery.map(this,n);
				if ( a && a.constructor == String )
					ret = jQuery.filter(a,ret).r;
				return this.pushStack( ret, arguments );
			};
		});

		jQuery.each( jQuery.macros.to, function(i,n){
			jQuery.fn[ i ] = function(){
				var a = arguments;
				return this.each(function(){
					for ( var j = 0; j < a.length; j++ )
						jQuery(a[j])[n]( this );
				});
			};
		});

		jQuery.each( jQuery.macros.each, function(i,n){
			jQuery.fn[ i ] = function() {
				return this.each( n, arguments );
			};
		});

		jQuery.each( jQuery.macros.filter, function(i,n){
			jQuery.fn[ n ] = function(num,fn) {
				return this.filter( ":" + n + "(" + num + ")", fn );
			};
		});

		jQuery.each( jQuery.macros.attr, function(i,n){
			n = n || i;
			jQuery.fn[ i ] = function(h) {
				return h == undefined ?
					this.length ? this[0][n] : null :
					this.attr( n, h );
			};
		});

		jQuery.each( jQuery.macros.css, function(i,n){
			jQuery.fn[ n ] = function(h) {
				return h == undefined ?
					( this.length ? jQuery.css( this[0], n ) : null ) :
					this.css( n, h );
			};
		});

	},
	each: function( obj, fn, args ) {
		if ( obj.length == undefined )
			for ( var i in obj )
				fn.apply( obj[i], args || [i, obj[i]] );
		else
			for ( var i = 0; i < obj.length; i++ )
				fn.apply( obj[i], args || [i, obj[i]] );
		return obj;
	},

	className: {
		add: function(o,c){
			if (jQuery.className.has(o,c)) return;
			o.className += ( o.className ? " " : "" ) + c;
		},
		remove: function(o,c){
			if( !c ) {
				o.className = "";
			} else {
				var classes = o.className.split(" ");
				for(var i=0; i<classes.length; i++)="" {="" if(classes[i]="=" c)="" classes.splice(i,="" 1);="" break;="" }="" o.classname="classes.join('" ');="" },="" has:="" function(e,a)="" if="" (="" e.classname="" !="undefined" )="" e="e.className;" return="" new="" regexp("(^|\\s)"="" +="" a="" "(\\s|$)").test(e);="" swap:="" function(e,o,f)="" for="" var="" i="" in="" o="" e.style["old"+i]="e.style[i];" e.style[i]="o[i];" f.apply(="" e,="" []="" );="" css:="" function(e,p)="" p="=" "height"="" ||="" "width"="" old="{}," oheight,="" owidth,="" d="["Top","Bottom","Right","Left"];" old["padding"="" d[i]]="0;" old["border"="" d[i]="" "width"]="0;" jquery.swap(="" old,="" function()="" (jquery.css(e,"display")="" oheight="e.offsetHeight;" owidth="e.offsetWidth;" else="" visibility:="" "hidden",="" position:="" "absolute",="" display:="" "block",="" right:="" "0",="" left:="" "0"="" }).appendto(e.parentnode)[0];="" parpos="jQuery.css(e.parentNode,"position");" ""="" "static"="" e.parentnode.style.position="relative" ;="" e.parentnode.removechild(e);="" });="" ?="" :="" owidth;="" jquery.curcss(="" curcss:="" function(elem,="" prop,="" force)="" ret;="" (prop="=" 'opacity'="" &&="" jquery.browser.msie)="" jquery.attr(elem.style,="" 'opacity');="" (!force="" elem.style[prop])="" ret="elem.style[prop];" (elem.currentstyle)="" newprop="prop.replace(/\-(\w)/g,function(m,c){return" c.touppercase();});="" elem.currentstyle[newprop];="" (document.defaultview="" document.defaultview.getcomputedstyle)="" prop="prop.replace(/([A-Z])/g,"-$1").toLowerCase();" cur="document.defaultView.getComputedStyle(elem," null);="" 'display'="" jquery.swap(elem,="" 'block'="" clean:="" function(a)="" r="[];" <="" a.length;="" i++="" a[i].constructor="=" string="" trim="" whitespace,="" otherwise="" indexof="" won't="" work="" as="" expected="" a[i]="jQuery.trim(a[i]);" table="" !a[i].indexof("<thead")="" !a[i].indexof("<tbody")="" "<="">";
				} else if ( !a[i].indexOf("<tr") )="" {="" table="tr" ;="" a[i]="<table>" +="" "<="">";
				} else if ( !a[i].indexOf("<td") ||="" !a[i].indexof("<th")="" )="" {="" table="td" ;="" a[i]="<table><tbody><tr>" +="" "<="" tr="">";
				}

				var div = document.createElement("div");
				div.innerHTML = a[i];

				if ( table ) {
					div = div.firstChild;
					if ( table != "thead" ) div = div.firstChild;
					if ( table == "td" ) div = div.firstChild;
				}

				for ( var j = 0; j < div.childNodes.length; j++ )
					r.push( div.childNodes[j] );
				} else if ( a[i].jquery || a[i].length && !a[i].nodeType )
					for ( var k = 0; k < a[i].length; k++ )
						r.push( a[i][k] );
				else if ( a[i] !== null )
					r.push(	a[i].nodeType ? a[i] : document.createTextNode(a[i].toString()) );
		}
		return r;
	},

	expr: {
		"": "m[2]== '*'||a.nodeName.toUpperCase()==m[2].toUpperCase()",
		"#": "a.getAttribute('id')&&a.getAttribute('id')==m[2]",
		":": {
			// Position Checks
			lt: "i<m[3]-0", gt:="" "i="">m[3]-0",
			nth: "m[3]-0==i",
			eq: "m[3]-0==i",
			first: "i==0",
			last: "i==r.length-1",
			even: "i%2==0",
			odd: "i%2",

			// Child Checks
			"nth-child": "jQuery.sibling(a,m[3]).cur",
			"first-child": "jQuery.sibling(a,0).cur",
			"last-child": "jQuery.sibling(a,0).last",
			"only-child": "jQuery.sibling(a).length==1",

			// Parent Checks
			parent: "a.childNodes.length",
			empty: "!a.childNodes.length",

			// Text Check
			contains: "(a.innerText||a.innerHTML).indexOf(m[3])>=0",

			// Visibility
			visible: "a.type!='hidden'&&jQuery.css(a,'display')!='none'&&jQuery.css(a,'visibility')!='hidden'",
			hidden: "a.type=='hidden'||jQuery.css(a,'display')=='none'||jQuery.css(a,'visibility')=='hidden'",

			// Form attributes
			enabled: "!a.disabled",
			disabled: "a.disabled",
			checked: "a.checked",
			selected: "a.selected || jQuery.attr(a, 'selected')",

			// Form elements
			text: "a.type=='text'",
			radio: "a.type=='radio'",
			checkbox: "a.type=='checkbox'",
			file: "a.type=='file'",
			password: "a.type=='password'",
			submit: "a.type=='submit'",
			image: "a.type=='image'",
			reset: "a.type=='reset'",
			button: "a.type=='button'",
			input: "a.nodeName.toLowerCase().match(/input|select|textarea|button/)"
		},
		".": "jQuery.className.has(a,m[2])",
		"@": {
			"=": "z==m[4]",
			"!=": "z!=m[4]",
			"^=": "z && !z.indexOf(m[4])",
			"$=": "z && z.substr(z.length - m[4].length,m[4].length)==m[4]",
			"*=": "z && z.indexOf(m[4])>=0",
			"": "z"
		},
		"[": "jQuery.find(m[2],a).length"
	},

	token: [
		"\\.\\.|/\\.\\.", "a.parentNode",
		">|/", "jQuery.sibling(a.firstChild)",
		"\\+", "jQuery.sibling(a).next",
		"~", function(a){
			var r = [];
			var s = jQuery.sibling(a);
			if ( s.n > 0 )
				for ( var i = s.n; i < s.length; i++ )
					r.push( s[i] );
			return r;
		}
	],
	find: function( t, context ) {
		// Make sure that the context is a DOM Element
		if ( context && context.nodeType == undefined )
			context = null;

		// Set the correct context (if none is provided)
		context = context || jQuery.context || document;

		if ( t.constructor != String ) return [t];

		if ( !t.indexOf("//") ) {
			context = context.documentElement;
			t = t.substr(2,t.length);
		} else if ( !t.indexOf("/") ) {
			context = context.documentElement;
			t = t.substr(1,t.length);
			// FIX Assume the root element is right :(
			if ( t.indexOf("/") >= 1 )
				t = t.substr(t.indexOf("/"),t.length);
		}

		var ret = [context];
		var done = [];
		var last = null;

		while ( t.length > 0 && last != t ) {
			var r = [];
			last = t;

			t = jQuery.trim(t).replace( /^\/\//i, "" );

			var foundToken = false;

			for ( var i = 0; i < jQuery.token.length; i += 2 ) {
				if ( foundToken ) continue;

				var re = new RegExp("^(" + jQuery.token[i] + ")");
				var m = re.exec(t);

				if ( m ) {
					r = ret = jQuery.map( ret, jQuery.token[i+1] );
					t = jQuery.trim( t.replace( re, "" ) );
					foundToken = true;
				}
			}

			if ( !foundToken ) {
				if ( !t.indexOf(",") || !t.indexOf("|") ) {
					if ( ret[0] == context ) ret.shift();
					done = jQuery.merge( done, ret );
					r = ret = [context];
					t = " " + t.substr(1,t.length);
				} else {
					var re2 = /^([#.]?)([a-z0-9\\*_-]*)/i;
					var m = re2.exec(t);

					if ( m[1] == "#" ) {
						// Ummm, should make this work in all XML docs
						var oid = document.getElementById(m[2]);
						r = ret = oid ? [oid] : [];
						t = t.replace( re2, "" );
					} else {
						if ( !m[2] || m[1] == "." ) m[2] = "*";

						for ( var i = 0; i < ret.length; i++ )
							r = jQuery.merge( r,
								m[2] == "*" ?
									jQuery.getAll(ret[i]) :
									ret[i].getElementsByTagName(m[2])
							);
					}
				}

			}

			if ( t ) {
				var val = jQuery.filter(t,r);
				ret = r = val.r;
				t = jQuery.trim(val.t);
			}
		}

		if ( ret && ret[0] == context ) ret.shift();
		done = jQuery.merge( done, ret );

		return done;
	},

	getAll: function(o,r) {
		r = r || [];
		var s = o.childNodes;
		for ( var i = 0; i < s.length; i++ )
			if ( s[i].nodeType == 1 ) {
				r.push( s[i] );
				jQuery.getAll( s[i], r );
			}
		return r;
	},

	attr: function(elem, name, value){
		var fix = {
			"for": "htmlFor",
			"class": "className",
			"float": "cssFloat",
			innerHTML: "innerHTML",
			className: "className",
			value: "value",
			disabled: "disabled",
			checked: "checked"
		};
		
		// IE actually uses filters for opacity ... elem is actually elem.style
		if (name == "opacity" && jQuery.browser.msie && value != undefined) {
			// IE has trouble with opacity if it does not have layout
			// Would prefer to check element.hasLayout first but don't have access to the element here
			elem['zoom'] = 1; 
			if (value == 1) // Remove filter to avoid more IE weirdness
				return elem["filter"] = elem["filter"].replace(/alpha\([^\)]*\)/gi,"");
			else
				return elem["filter"] = elem["filter"].replace(/alpha\([^\)]*\)/gi,"") + "alpha(opacity=" + value * 100 + ")";
		} else if (name == "opacity" && jQuery.browser.msie) {
			return elem["filter"] ? parseFloat( elem["filter"].match(/alpha\(opacity=(.*)\)/)[1] )/100 : 1;
		}
		
		// Mozilla doesn't play well with opacity 1
		if (name == "opacity" && jQuery.browser.mozilla && value == 1) value = 0.9999;

		if ( fix[name] ) {
			if ( value != undefined ) elem[fix[name]] = value;
			return elem[fix[name]];
		} else if( value == undefined && jQuery.browser.msie && elem.nodeName && elem.nodeName.toUpperCase() == 'FORM' && (name == 'action' || name == 'method') ) {
			return elem.getAttributeNode(name).nodeValue;
		} else if ( elem.getAttribute != undefined ) {
			if ( value != undefined ) elem.setAttribute( name, value );
			return elem.getAttribute( name, 2 );
		} else {
			name = name.replace(/-([a-z])/ig,function(z,b){return b.toUpperCase();});
			if ( value != undefined ) elem[name] = value;
			return elem[name];
		}
	},

	// The regular expressions that power the parsing engine
	parse: [
		// Match: [@value='test'], [@foo]
		"\\[ *(@)S *([!*$^=]*) *('?\"?)(.*?)\\4 *\\]",

		// Match: [div], [div p]
		"(\\[)\s*(.*?)\s*\\]",

		// Match: :contains('foo')
		"(:)S\\(\"?'?([^\\)]*?)\"?'?\\)",

		// Match: :even, :last-chlid
		"([:.#]*)S"
	],

	filter: function(t,r,not) {
		// Figure out if we're doing regular, or inverse, filtering
		var g = not !== false ? jQuery.grep :
			function(a,f) {return jQuery.grep(a,f,true);};

		while ( t && /^[a-z[({<*:.#] 0="" 1="" 2="=" i.test(t)="" )="" {="" var="" p="jQuery.parse;" for="" (="" i="0;" <="" p.length;="" i++="" look="" for,="" and="" replace,="" string-like="" sequences="" finally="" build="" a="" regexp="" out="" of="" it="" re="new" regexp(="" "^"="" +="" p[i].replace("s",="" "([a-z*_-][a-z0-9_-]*)"),="" "i"="" );="" m="re.exec(" t="" if="" re-organize="" the="" first="" match="" !i="" m[3],="" m[2],="" m[5]];="" remove="" what="" we="" just="" matched="" re,="" ""="" break;="" }="" :not()="" is="" special="" case="" that="" can="" be="" optimized="" by="" keeping="" expression="" list="" m[1]="=" ":"="" &&="" m[2]="=" "not"="" r="jQuery.filter(m[3],r,false).r;" otherwise,="" find="" to="" execute="" else="" f="jQuery.expr[m[1]];" f.constructor="" !="String" custom="" macro="" enclose="" eval("f="function(a,i){"" "@"="" ?="" "z="jQuery.attr(a,m[3]);"" :="" "return="" "="" "}");="" against="" current="" filter="" r,="" return="" an="" array="" filtered="" elements="" (r)="" modified="" string="" (t)="" r:="" t:="" };="" },="" trim:="" function(t){="" t.replace(="" ^\s+|\s+$="" g,="" "");="" parents:="" function(="" elem="" ){="" cur="elem.parentNode;" while="" matched.push(="" matched;="" sibling:="" function(elem,="" pos,="" not)="" elems="[];" if(elem)="" siblings="elem.parentNode.childNodes;" siblings.length;="" not="==" true="" siblings[i]="=" continue;="" siblings[i].nodetype="=" elems.push(="" elems.n="elems.length" -="" 1;="" jquery.extend(="" elems,="" last:="" elems.length="" 1,="" cur:="" pos="=" "even"="" %="" ||="" "odd"="" elems[pos]="=" elem,="" prev:="" elems[elems.n="" 1],="" next:="" 1]="" });="" merge:="" function(first,="" second)="" result="[];" move="" b="" over="" new="" (this="" helps="" avoid="" staticnodelist="" instances)="" k="0;" first.length;="" k++="" result[k]="first[k];" now="" check="" duplicates="" between="" only="" add="" unique="" items="" second.length;="" nocollision="true;" collision-checking="" process="" j="0;" j++="" second[i]="=" first[j]="" item="" unique,="" result.push(="" result;="" grep:="" function(elems,="" fn,="" inv)="" passed="" in="" function,="" make="" function="" (a="" handy="" shortcut)="" fn.constructor="=" fn="new" function("a","i","return="" fn);="" go="" through="" array,="" saving="" pass="" validator="" elems.length;="" !inv="" fn(elems[i],i)="" inv="" !fn(elems[i],i)="" elems[i]="" map:="" fn)="" function("a","return="" translating="" each="" their="" value="" (or="" values).="" val="fn(elems[i],i);" null="" val.constructor="" result,="" *="" number="" helper="" functions="" used="" managing="" events.="" many="" ideas="" behind="" this="" code="" orignated="" from="" dean="" edwards'="" addevent="" library.="" event:="" bind="" event="" element="" original="" edwards="" add:="" function(element,="" type,="" handler)="" whatever="" reason,="" ie="" has="" trouble="" passing="" window="" object="" around,="" causing="" cloned="" jquery.browser.msie="" element.setinterval="" sure="" being="" executed="" id="" !handler.guid="" handler.guid="this.guid++;" init="" element's="" structure="" (!element.events)="" element.events="{};" get="" bound="" handlers="element.events[type];" hasn't="" been="" initialized="" yet="" (!handlers)="" handler="" queue="" =="" {};="" remember="" existing="" handler,="" it's="" already="" there="" (element["on"="" type])="" handlers[0]="element["on"" type];="" handlers[handler.guid]="handler;" global="" element["on"="" type]="this.handle;" (for="" triggering)="" (!this.global[type])="" this.global[type]="[];" this.global[type].push(="" guid:="" global:="" {},="" detach="" or="" set="" events="" remove:="" (element.events)="" (type="" element.events[type])="" delete="" element.events[type][handler.guid];="" element.events[type]="" element.events[type][i];="" this.remove(="" element,="" trigger:="" function(type,data,element)="" touch="" up="" incoming="" data="" [];="" handle="" trigger="" !element="" g="this.global[type];" g.length;="" this.trigger(="" data,="" g[i]="" triggering="" single="" along="" fake="" data.unshift(="" this.fix({="" type:="" target:="" })="" type].apply(="" handle:="" function(event)="" typeof="" jquery="=" "undefined"="" return;="" jquery.event.fix(="" window.event="" no="" correct="" was="" found,="" fail="" !event="" returnvalue="true;" c="this.events[event.type];" args="[].slice.call(" arguments,="" args.unshift(="" c[j].apply(="" this,="" false="" event.preventdefault();="" event.stoppropagation();="" returnvalue;="" fix:="" event.preventdefault="function()" this.returnvalue="false;" event.stoppropagation="function()" this.cancelbubble="true;" event;="" function()="" figure="" browser="" jquery.browser="{" safari:="" webkit="" .test(b),="" opera:="" opera="" msie:="" msie="" .test(b)="" mozilla:="" mozilla="" (compatible|webkit)="" see="" w3c="" box="" model="" jquery.boxmodel="!jQuery.browser.msie" document.compatmode="=" "css1compat";="" jquery.macros="{" to:="" appendto:="" "append",="" prependto:="" "prepend",="" insertbefore:="" "before",="" insertafter:="" "after"="" css:="" "width,height,top,left,position,float,overflow,color,background".split(","),="" filter:="" [="" "eq",="" "lt",="" "gt",="" "contains"="" ],="" attr:="" val:="" "value",="" html:="" "innerhtml",="" id:="" null,="" title:="" name:="" href:="" src:="" rel:="" axis:="" parent:="" "a.parentnode",="" ancestors:="" jquery.parents,="" "jquery.sibling(a).next",="" "jquery.sibling(a).prev",="" siblings:="" "jquery.sibling(a,="" true)",="" children:="" "jquery.sibling(a.firstchild)"="" each:="" removeattr:="" key="" this.removeattribute(="" show:="" function(){="" this.style.display="this.oldblock" this.oldblock="" "";="" jquery.css(this,"display")="=" "none"="" ;="" hide:="" jquery.css(this,"display");="" toggle:="" jquery(this)[="" jquery(this).is(":hidden")="" "show"="" "hide"="" ].apply(="" jquery(this),="" arguments="" addclass:="" function(c){="" jquery.classname.add(this,c);="" removeclass:="" jquery.classname.remove(this,c);="" toggleclass:="" jquery.classname[="" jquery.classname.has(this,c)="" "remove"="" "add"="" ](this,c);="" function(a){="" !a="" jquery.filter(="" a,="" [this]="" ).r="" this.parentnode.removechild(="" empty:="" this.firstchild="" this.removechild(="" bind:="" function("e",="" !fn.indexof(".")="" "jquery(this)"="" jquery.event.add(="" unbind:="" jquery.event.remove(="" jquery.event.trigger(="" jquery.init();="" jquery.fn.extend({="" we're="" overriding="" old="" toggle="" so="" later="" _toggle:="" jquery.fn.toggle,="" function(a,b)="" two="" are="" in,="" toggling="" on="" click="" a.constructor="=" b.constructor="=" this.click(function(e){="" which="" this.last="this.last" a;="" clicks="" stop="" e.preventdefault();="" this.last.apply(="" [e]="" false;="" this._toggle.apply(="" hover:="" function(f,g)="" private="" haandling="" mouse="" 'hovering'="" handlehover(e)="" mouse(over|out)="" still="" within="" same="" parent="" e.fromelement="" e.toelement)="" e.relatedtarget;="" traverse="" tree="" try="" catch(e)="" actually="" moused="" sub-element,="" ignore="" right="" (e.type="=" "mouseover"="" g).apply(this,="" [e]);="" listeners="" this.mouseover(handlehover).mouseout(handlehover);="" ready:="" function(f)="" dom="" ready="" jquery.isready="" immediately="" f.apply(="" document="" wait="" jquery.readylist.push(="" this;="" jquery.extend({="" all="" makes="" work="" nicely.="" isready:="" false,="" readylist:="" [],="" when="" loaded="" !jquery.isready="" bound,="" jquery.readylist="" them="" jquery.readylist.length;="" jquery.readylist[i].apply(="" reset="" lisenter="" memory="" leak="" jquery.browser.mozilla="" jquery.browser.opera="" document.removeeventlistener(="" "domcontentloaded",="" jquery.ready,="" e="("blur,focus,load,resize,scroll,unload,click,dblclick,"" "mousedown,mouseup,mousemove,mouseover,mouseout,change,reset,select,"="" "submit,keydown,keypress,keyup,error").split(",");="" names,="" but="" enclosed="" properly="" e.length;="" o="e[i];" binding="" jquery.fn[o]="function(f){" this.bind(o,="" f)="" this.trigger(o);="" unbinding="" jquery.fn["un"+o]="function(f){" this.unbind(o,="" f);="" finally,="" fire="" once="" jquery.fn["one"+o]="function(f){" attach="" listener="" this.each(function(){="" count="0;" o,="" function(e){="" executed,="" count++="" f.apply(this,="" use="" callback="" document.addeventlistener(="" used,="" excellent="" hack="" matthias="" miller="" http:="" www.outofhanwell.com="" blog="" index.php?title="the_window_onload_problem_revisited" works="" you="" document.write()="" document.write("<scr"="" "ipt="" defer="true" "src="//:"><\ script="">");
	
		// Use the defer script hack
		var script = document.getElementById("__ie_init");
		script.onreadystatechange = function() {
			if ( this.readyState != "complete" ) return;
			this.parentNode.removeChild( this );
			jQuery.ready();
		};
	
		// Clear from memory
		script = null;
	
	// If Safari  is used
	} else if ( jQuery.browser.safari ) {
		// Continually check to see if the document.readyState is valid
		jQuery.safariTimer = setInterval(function(){
			// loaded and complete are both valid states
			if ( document.readyState == "loaded" || 
				document.readyState == "complete" ) {
	
				// If either one are found, remove the timer
				clearInterval( jQuery.safariTimer );
				jQuery.safariTimer = null;
	
				// and execute any waiting functions
				jQuery.ready();
			}
		}, 10);
	} 

	// A fallback to window.onload, that will always work
	jQuery.event.add( window, "load", jQuery.ready );
	
};

// Clean up after IE to avoid memory leaks
if (jQuery.browser.msie) jQuery(window).unload(function() {
	var event = jQuery.event, global = event.global;
	for (var type in global) {
 		var els = global[type], i = els.length;
		if (i>0) do if (type != 'unload') event.remove(els[i-1], type); while (--i);
	}
});
jQuery.fn.extend({

	// overwrite the old show method
	_show: jQuery.fn.show,

	show: function(speed,callback){
		return speed ? this.animate({
			height: "show", width: "show", opacity: "show"
		}, speed, callback) : this._show();
	},
	
	// Overwrite the old hide method
	_hide: jQuery.fn.hide,

	hide: function(speed,callback){
		return speed ? this.animate({
			height: "hide", width: "hide", opacity: "hide"
		}, speed, callback) : this._hide();
	},

	slideDown: function(speed,callback){
		return this.animate({height: "show"}, speed, callback);
	},

	slideUp: function(speed,callback){
		return this.animate({height: "hide"}, speed, callback);
	},

	slideToggle: function(speed,callback){
		return this.each(function(){
			var state = jQuery(this).is(":hidden") ? "show" : "hide";
			jQuery(this).animate({height: state}, speed, callback);
		});
	},

	fadeIn: function(speed,callback){
		return this.animate({opacity: "show"}, speed, callback);
	},

	fadeOut: function(speed,callback){
		return this.animate({opacity: "hide"}, speed, callback);
	},

	fadeTo: function(speed,to,callback){
		return this.animate({opacity: to}, speed, callback);
	},
	animate: function(prop,speed,callback) {
		return this.queue(function(){
		
			this.curAnim = prop;
			
			for ( var p in prop ) {
				var e = new jQuery.fx( this, jQuery.speed(speed,callback), p );
				if ( prop[p].constructor == Number )
					e.custom( e.cur(), prop[p] );
				else
					e[ prop[p] ]( prop );
			}
			
		});
	},
	queue: function(type,fn){
		if ( !fn ) {
			fn = type;
			type = "fx";
		}
	
		return this.each(function(){
			if ( !this.queue )
				this.queue = {};
	
			if ( !this.queue[type] )
				this.queue[type] = [];
	
			this.queue[type].push( fn );
		
			if ( this.queue[type].length == 1 )
				fn.apply(this);
		});
	}

});

jQuery.extend({

	setAuto: function(e,p) {
		if ( e.notAuto ) return;

		if ( p == "height" && e.scrollHeight != parseInt(jQuery.curCSS(e,p)) ) return;
		if ( p == "width" && e.scrollWidth != parseInt(jQuery.curCSS(e,p)) ) return;

		// Remember the original height
		var a = e.style[p];

		// Figure out the size of the height right now
		var o = jQuery.curCSS(e,p,1);

		if ( p == "height" && e.scrollHeight != o ||
			p == "width" && e.scrollWidth != o ) return;

		// Set the height to auto
		e.style[p] = e.currentStyle ? "" : "auto";

		// See what the size of "auto" is
		var n = jQuery.curCSS(e,p,1);

		// Revert back to the original size
		if ( o != n && n != "auto" ) {
			e.style[p] = a;
			e.notAuto = true;
		}
	},
	
	speed: function(s,o) {
		o = o || {};
		
		if ( o.constructor == Function )
			o = { complete: o };
		
		var ss = { slow: 600, fast: 200 };
		o.duration = (s && s.constructor == Number ? s : ss[s]) || 400;
	
		// Queueing
		o.oldComplete = o.complete;
		o.complete = function(){
			jQuery.dequeue(this, "fx");
			if ( o.oldComplete && o.oldComplete.constructor == Function )
				o.oldComplete.apply( this );
		};
	
		return o;
	},
	
	queue: {},
	
	dequeue: function(elem,type){
		type = type || "fx";
	
		if ( elem.queue && elem.queue[type] ) {
			// Remove self
			elem.queue[type].shift();
	
			// Get next function
			var f = elem.queue[type][0];
		
			if ( f ) f.apply( elem );
		}
	},

	/*
	 * I originally wrote fx() as a clone of moo.fx and in the process
	 * of making it small in size the code became illegible to sane
	 * people. You've been warned.
	 */
	
	fx: function( elem, options, prop ){
	
		var z = this;
	
		// The users options
		z.o = {
			duration: options.duration || 400,
			complete: options.complete,
			step: options.step
		};
	
		// The element
		z.el = elem;
	
		// The styles
		var y = z.el.style;
	
		// Simple function for setting a style value
		z.a = function(){
			if ( options.step )
				options.step.apply( elem, [ z.now ] );
 
			if ( prop == "opacity" )
				jQuery.attr(y, "opacity", z.now); // Let attr handle opacity
			else if ( parseInt(z.now) ) // My hate for IE will never die
				y[prop] = parseInt(z.now) + "px";
				
			y.display = "block";
		};
	
		// Figure out the maximum number to run to
		z.max = function(){
			return parseFloat( jQuery.css(z.el,prop) );
		};
	
		// Get the current size
		z.cur = function(){
			var r = parseFloat( jQuery.curCSS(z.el, prop) );
			return r && r > -10000 ? r : z.max();
		};
	
		// Start an animation from one number to another
		z.custom = function(from,to){
			z.startTime = (new Date()).getTime();
			z.now = from;
			z.a();
	
			z.timer = setInterval(function(){
				z.step(from, to);
			}, 13);
		};
	
		// Simple 'show' function
		z.show = function( p ){
			if ( !z.el.orig ) z.el.orig = {};

			// Remember where we started, so that we can go back to it later
			z.el.orig[prop] = this.cur();
			
			// Begin the animation
			if (prop == "opacity")
				z.custom(z.el.orig[prop], 1);
			else
				z.custom(0, z.el.orig[prop]);

			// Stupid IE, look what you made me do
			if ( prop != "opacity" )
				y[prop] = "1px";
		};
	
		// Simple 'hide' function
		z.hide = function(){
			if ( !z.el.orig ) z.el.orig = {};

			// Remember where we started, so that we can go back to it later
			z.el.orig[prop] = this.cur();

			z.o.hide = true;

			// Begin the animation
			z.custom(z.el.orig[prop], 0);
		};
	
		// Remember  the overflow of the element
		if ( !z.el.oldOverlay )
			z.el.oldOverflow = jQuery.css( z.el, "overflow" );
	
		// Make sure that nothing sneaks out
		y.overflow = "hidden";
	
		// Each step of an animation
		z.step = function(firstNum, lastNum){
			var t = (new Date()).getTime();
	
			if (t > z.o.duration + z.startTime) {
				// Stop the timer
				clearInterval(z.timer);
				z.timer = null;

				z.now = lastNum;
				z.a();

				z.el.curAnim[ prop ] = true;
				
				var done = true;
				for ( var i in z.el.curAnim )
					if ( z.el.curAnim[i] !== true )
						done = false;
						
				if ( done ) {
					// Reset the overflow
					y.overflow = z.el.oldOverflow;
				
					// Hide the element if the "hide" operation was done
					if ( z.o.hide ) 
						y.display = 'none';
					
					// Reset the property, if the item has been hidden
					if ( z.o.hide ) {
						for ( var p in z.el.curAnim ) {
							if (p == "opacity" && jQuery.browser.msie)
								jQuery.attr(y, p, z.el.orig[p]);
							else
								y[ p ] = z.el.orig[p] + "px";
	
							// set its height and/or width to auto
							if ( p == 'height' || p == 'width' )
								jQuery.setAuto( z.el, p );
						}
					}
				}

				// If a callback was provided, execute it
				if( done && z.o.complete && z.o.complete.constructor == Function )
					// Execute the complete function
					z.o.complete.apply( z.el );
			} else {
				// Figure out where in the animation we are and set the number
				var p = (t - this.startTime) / z.o.duration;
				z.now = ((-Math.cos(p*Math.PI)/2) + 0.5) * (lastNum-firstNum) + firstNum;
	
				// Perform the next step of the animation
				z.a();
			}
		};
	
	}

});
jQuery.fn.extend({
	loadIfModified: function( url, params, callback ) {
		this.load( url, params, callback, 1 );
	},
	load: function( url, params, callback, ifModified ) {
		if ( url.constructor == Function )
			return this.bind("load", url);
	
		callback = callback || function(){};
	
		// Default to a GET request
		var type = "GET";
	
		// If the second parameter was provided
		if ( params ) {
			// If it's a function
			if ( params.constructor == Function ) {
				// We assume that it's the callback
				callback = params;
				params = null;
				
			// Otherwise, build a param string
			} else {
				params = jQuery.param( params );
				type = "POST";
			}
		}
		
		var self = this;
		
		// Request the remote document
		jQuery.ajax( type, url, params,function(res, status){
			
			if ( status == "success" || !ifModified && status == "notmodified" ) {
				// Inject the HTML into all the matched elements
				self.html(res.responseText).each( callback, [res.responseText, status] );
				
				// Execute all the scripts inside of the newly-injected HTML
				jQuery("script", self).each(function(){
					if ( this.src )
						jQuery.getScript( this.src );
					else
						eval.call( window, this.text || this.textContent || this.innerHTML || "" );
				});
			} else
				callback.apply( self, [res.responseText, status] );
	
		}, ifModified);
		
		return this;
	},
	serialize: function() {
		return jQuery.param( this );
	}
	
});

// If IE is used, create a wrapper for the XMLHttpRequest object
if ( jQuery.browser.msie && typeof XMLHttpRequest == "undefined" )
	XMLHttpRequest = function(){
		return new ActiveXObject(
			navigator.userAgent.indexOf("MSIE 5") >= 0 ?
			"Microsoft.XMLHTTP" : "Msxml2.XMLHTTP"
		);
	};

// Attach a bunch of functions for handling common AJAX events

 

new function(){
	var e = "ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess".split(",");
	
	for ( var i = 0; i < e.length; i++ ) new function(){
		var o = e[i];
		jQuery.fn[o] = function(f){
			return this.bind(o, f);
		};
	};
};

jQuery.extend({
	get: function( url, data, callback, type, ifModified ) {
		if ( data.constructor == Function ) {
			type = callback;
			callback = data;
			data = null;
		}
		
		// append ? + data or & + data, in case there are already params
		if ( data ) url += ((url.indexOf("?") > -1) ? "&" : "?") + jQuery.param(data);
		
		// Build and start the HTTP Request
		jQuery.ajax( "GET", url, null, function(r, status) {
			if ( callback ) callback( jQuery.httpData(r,type), status );
		}, ifModified);
	},
	getIfModified: function( url, data, callback, type ) {
		jQuery.get(url, data, callback, type, 1);
	},
	getScript: function( url, callback ) {
		jQuery.get(url, callback, "script");
	},
	getJSON: function( url, data, callback ) {
		if(callback)
			jQuery.get(url, data, callback, "json");
		else {
			jQuery.get(url, data, "json");
		}
	},
	post: function( url, data, callback, type ) {
		// Build and start the HTTP Request
		jQuery.ajax( "POST", url, jQuery.param(data), function(r, status) {
			if ( callback ) callback( jQuery.httpData(r,type), status );
		});
	},
	
	// timeout (ms)
	timeout: 0,
	ajaxTimeout: function(timeout) {
		jQuery.timeout = timeout;
	},

	// Last-Modified header cache for next request
	lastModified: {},
	ajax: function( type, url, data, ret, ifModified ) {
		// If only a single argument was passed in,
		// assume that it is a object of key/value pairs
		if ( !url ) {
			ret = type.complete;
			var success = type.success;
			var error = type.error;
			var dataType = type.dataType;
			var global = typeof type.global == "boolean" ? type.global : true;
			var timeout = typeof type.timeout == "number" ? type.timeout : jQuery.timeout;
			var ifModified = type.ifModified || false;
			data = type.data;
			url = type.url;
			type = type.type;
		}
		
		// Watch for a new set of requests
		if ( global && ! jQuery.active++ )
			jQuery.event.trigger( "ajaxStart" );

		var requestDone = false;
	
		// Create the request object
		var xml = new XMLHttpRequest();
	
		// Open the socket
		xml.open(type || "GET", url, true);
		
		// Set the correct header, if data is being sent
		if ( data )
			xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		
		// Set the If-Modified-Since header, if ifModified mode.
		if ( ifModified )
			xml.setRequestHeader("If-Modified-Since",
				jQuery.lastModified[url] || "Thu, 01 Jan 1970 00:00:00 GMT" );
		
		// Set header so the called script knows that it's an XMLHttpRequest
		xml.setRequestHeader("X-Requested-With", "XMLHttpRequest");
	
		// Make sure the browser sends the right content length
		if ( xml.overrideMimeType )
			xml.setRequestHeader("Connection", "close");
		
		// Wait for a response to come back
		var onreadystatechange = function(istimeout){
			// The transfer is complete and the data is available, or the request timed out
			if ( xml && (xml.readyState == 4 || istimeout == "timeout") ) {
				requestDone = true;

				var status = jQuery.httpSuccess( xml ) && istimeout != "timeout" ?
					ifModified && jQuery.httpNotModified( xml, url ) ? "notmodified" : "success" : "error";
				
				// Make sure that the request was successful or notmodified
				if ( status != "error" ) {
					// Cache Last-Modified header, if ifModified mode.
					var modRes;
					try {
						modRes = xml.getResponseHeader("Last-Modified");
					} catch(e) {} // swallow exception thrown by FF if header is not available
					
					if ( ifModified && modRes )
						jQuery.lastModified[url] = modRes;
					
					// If a local callback was specified, fire it
					if ( success )
						success( jQuery.httpData( xml, dataType ), status );
					
					// Fire the global callback
					if( global )
						jQuery.event.trigger( "ajaxSuccess" );
				
				// Otherwise, the request was not successful
				} else {
					// If a local callback was specified, fire it
					if ( error ) error( xml, status );
					
					// Fire the global callback
					if( global )
						jQuery.event.trigger( "ajaxError" );
				}
				
				// The request was completed
				if( global )
					jQuery.event.trigger( "ajaxComplete" );
				
				// Handle the global AJAX counter
				if ( global && ! --jQuery.active )
					jQuery.event.trigger( "ajaxStop" );
	
				// Process result
				if ( ret ) ret(xml, status);
				
				// Stop memory leaks
				xml.onreadystatechange = function(){};
				xml = null;
				
			}
		};
		xml.onreadystatechange = onreadystatechange;
		
		// Timeout checker
		if(timeout > 0)
			setTimeout(function(){
				// Check to see if the request is still happening
				if (xml) {
					// Cancel the request
					xml.abort();

					if ( !requestDone ) onreadystatechange( "timeout" );

					// Clear from memory
					xml = null;
				}
			}, timeout);
		
		// Send the data
		xml.send(data);
	},
	
	// Counter for holding the number of active queries
	active: 0,
	
	// Determines if an XMLHttpRequest was successful or not
	httpSuccess: function(r) {
		try {
			return !r.status && location.protocol == "file:" ||
				( r.status >= 200 && r.status < 300 ) || r.status == 304 ||
				jQuery.browser.safari && r.status == undefined;
		} catch(e){}

		return false;
	},

	// Determines if an XMLHttpRequest returns NotModified
	httpNotModified: function(xml, url) {
		try {
			var xmlRes = xml.getResponseHeader("Last-Modified");

			// Firefox always returns 200. check Last-Modified date
			return xml.status == 304 || xmlRes == jQuery.lastModified[url] ||
				jQuery.browser.safari && xml.status == undefined;
		} catch(e){}

		return false;
	},
	
	/* Get the data out of an XMLHttpRequest.
	 * Return parsed XML if content-type header is "xml" and type is "xml" or omitted,
	 * otherwise return plain text.
	 * (String) data - The type of data that you're expecting back,
	 * (e.g. "xml", "html", "script")
	 */
	httpData: function(r,type) {
		var ct = r.getResponseHeader("content-type");
		var data = !type && ct && ct.indexOf("xml") >= 0;
		data = type == "xml" || data ? r.responseXML : r.responseText;

		// If the type is "script", eval it
		if ( type == "script" ) eval.call( window, data );

		// Get the JavaScript object, if JSON is used.
		if ( type == "json" ) eval( "data = " + data );

		return data;
	},
	
	// Serialize an array of form elements or a set of
	// key/values into a query string
	param: function(a) {
		var s = [];
		
		// If an array was passed in, assume that it is an array
		// of form elements
		if ( a.constructor == Array || a.jquery ) {
			// Serialize the form elements
			for ( var i = 0; i < a.length; i++ )
				s.push( a[i].name + "=" + encodeURIComponent( a[i].value ) );
			
		// Otherwise, assume that it's an object of key/value pairs
		} else {
			// Serialize the key/values
			for ( var j in a )
				s.push( j + "=" + encodeURIComponent( a[j] ) );
		}
		
		// Return the resulting serialization
		return s.join("&");
	}

});
} // close: if(typeof window.jQuery == "undefined") {</\></*:.#]></m[3]-0",></td")></tr")></classes.length;></]*(<.+>