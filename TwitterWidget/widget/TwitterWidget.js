var twtrJs = null;
mxui.widget.declare('TwitterWidget.widget.TwitterWidget', {
	addons       : [mendix.addon._Contextable],
    inputargs: {
		username			: '',
		widgetid			: ''
	},
	
	
	postCreate : function(){
		
		this.initContext();
		this.actLoaded();
	},
	render : function (d,s,id){
		
		if (twtrJs != null){
			twtrJs.parentNode.removeChild(twtrJs);
			twtrJs = null;
		}
		var div = d.getElementById(id);
		if(div){
			div.parentNode.removeChild(div);
		}
		
		
		var js, fjs=d.getElementsByTagName(s)[0], p=/^http:/.test(d.location) ? 'http':'https';
		if(!d.getElementById(id)){
			js=d.createElement(s);
			js.id=id;
			js.src=p+"://platform.twitter.com/widgets.js";
			fjs.parentNode.insertBefore(js,fjs);
			twtrJs = js;
		}
	},
	applyContext : function(context, callback){
		var twittername = context.getTrackObject().get(this.username);
		
		
		if(twittername != null && twittername != ''){
			
			var a = dojo.create('a');
			a.setAttribute('class', 'twitter-timeline');
			a.setAttribute('href', 'https://twitter.com/' + twittername);
			a.setAttribute('data-dnt', 'true');
			a.setAttribute('data-widget-id', this.widgetid);
			a.setAttribute('data-screen-name', twittername);
			a.innerHTML = 'Tweets van @' + twittername;
			
			this.domNode.appendChild(a);
			this.render(document,"script","twitter-wjs");
		}
		
		callback && callback();
	}
});