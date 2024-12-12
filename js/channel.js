(function () {
	App.channel = {

		mode : 'solo',
		chan_out : [1],
		last : 1,

		init : function(){
			App.npk('INIT CHANNELS');
			App.channel.create();

			App.bt.mode = document.querySelectorAll("div#devMode > button");
			App.bt.chan = document.querySelectorAll("div#espChan button");
			
			
			//CLICK ON MODE
			App.bt.mode.forEach(function(bt,i){
				bt.addEventListener('click', function(){
					App.bt.mode.forEach(function(bt,i){
						bt.setAttribute('data-activ', 'off');
					});
					this.setAttribute('data-activ', 'on');
					App.channel.select_mod(this);
				});
			});

			//CLICK ON CHANNEL
			App.bt.chan.forEach(function(bt,i){
				bt.addEventListener('click', function(){
					App.channel.select_chan(this);
				});
			});

		},

		create : function(that){
	    	App.npk('CHANNELS : create');
			var t = "";
			t += "<div id='devMode'>Mode <button class='onOff' data-activ='on' id='solo'>Solo</button> <button class='onOff' id='multi' data-activ='off'>Multi</button> <button class='onOff' id='all' data-activ='off'>All</button></div>";
			t += "<div id='espChan'><div>";
			var datactiv='on';
			for(var i=1; i<17; i++){
				t += "<div class='btChan'><button class='onOff' type='button' data-activ='"+datactiv+"' data-chan='"+i+"'>"+i+"</button></div>";
				datactiv='off';
			}			
			t += "</div></div>";
			document.getElementById("esp_modchan").innerHTML = t;
		},

		update : function(){
			App.npk('CHANNELS : update');
			if(App.channel.mode=='all'){
				App.channel.chan_out = 'all'; 
			} else {
				App.channel.chan_out = [];

				App.bt.chan_On = document.querySelectorAll("div#espChan button[data-activ='on']");
				App.bt.chan_On.forEach(function(bt,i){
					App.npk(bt);
					App.channel.chan_out[ App.channel.chan_out.length ] = bt.getAttribute('data-chan');
				});

			}
			console.log(App.channel);
		},

		select_mod : function(that){
			App.npk('CHANNELS : select_mod');
			App.channel.mode = that.getAttribute('id');					
			switch(App.channel.mode){
				case 'solo':
					App.bt.chan.forEach(function(bt,i){
						bt.setAttribute('data-activ', 'off');
					});
					document.querySelector("div#espChan button[data-chan='"+App.channel.last+"']").setAttribute('data-activ', 'on');
				break;
				case 'all':
					App.bt.chan.forEach(function(bt,i){
						bt.setAttribute('data-activ', 'on');
					});
				break;
			}
			App.channel.update();
		},

		select_chan : function(that){
			App.npk('CHANNELS : select_chan');
			App.channel.last = that.getAttribute('data-chan');
			switch(App.channel.mode){
				case 'solo':
					App.bt.chan.forEach(function(bt,i){
						bt.setAttribute('data-activ', 'off');
					});
					that.setAttribute('data-activ', 'on');
				break;
				case 'multi':
					if( that.getAttribute('data-activ')=='on'){
						App.bt.chan_On = document.querySelectorAll("div#espChan button[data-activ='on']");
						if( App.bt.chan_On.length>1 ){
							that.setAttribute('data-activ', 'off');
						}
					} else {
						that.setAttribute('data-activ', 'on');
					}
				break;
				case 'all':
					App.bt.chan.forEach(function(bt,i){
						bt.setAttribute('data-activ', 'on');
					});
				break;
			}
			App.channel.update();
		}
	    
	};
})();