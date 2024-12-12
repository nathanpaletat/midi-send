(function () {
	App.controlchange = {

		E_dispvalcc : document.getElementById('dispvalcc'),

		valCC : 0,
		numCC : 0,

		init : function(){
			App.npk('INIT CONTROLCHANGE');
			var cpt=0;
			var Clss = ['padcc', 'onslt'];
			for (let i = 0; i < 8; i++) {
		  		for (let j = 0; j < 16; j++) {
		  			let txt = cpt.toString();
		  			//txt = Utilities.getCcNameByNumber(cpt);
		  			if(cpt<120){
		  				let e = App.createE('button', {
			  				'class' : Clss,
			  				'text' : txt,
			  				'data' : [ ['num', cpt] ],
			  				'event' : [ ['click', App.controlchange.bt_select_cc] ]
			  			});
						App.esp_bt_CC.append(e);
						cpt++;
						Clss='padcc';
		  			}
		  		}
		  	}
		  	App.bt.padcc = document.querySelectorAll("div#esp_button_cc > button");
		  	App.bt.oCC = document.querySelectorAll("div#esp_other_cc button");

		  	//MOVE SLIDER
		  	document.querySelector("input#value_cc").addEventListener('input', function(){
		  		App.controlchange.change(this);
		  	});

		  	//CLICK OTHER CC
			App.bt.oCC.forEach(function(bt,i){
				bt.addEventListener('click', function(){
					App.controlchange.send_channel_mode(this);
				});
			});
		},

		change : function(that){
			if( App.device.check_device() ){
				App.controlchange.E_dispvalcc.innerText = that.value;
		    	App.controlchange.valCC = Number( that.value );
		    	App.device.midi_out.sendControlChange(App.controlchange.numCC, App.controlchange.valCC, { channels: App.channel.chan_out });
		    	App.device.blinkled();

		    	//LOG
		    	App.log.add_line('cc', [App.controlchange.numCC, App.controlchange.valCC]);
			}
		},

		bt_select_cc : function(){
			App.npk("CONTROLCHANGE : bt_select_cc" );
	    	App.bt.padcc.forEach(function(bt,i){
				bt.classList.remove('onslt');
			});
	    	this.classList.add('onslt');
			App.controlchange.numCC = Number( this.getAttribute('data-num') );
		},

		send_channel_mode : function(that){
			App.npk("CONTROLCHANGE : send_channel_mode" );
	    	if( App.device.check_device() ){
	    		let a = that.value;
				switch(a){
					case 'allsoundoff' :
						App.device.midi_out.sendAllSoundOff(); 
					break;
					case 'resetallcontrollers' :
						App.device.midi_out.sendResetAllControllers(); 
					break;
					case 'localcontrolon' :
						App.device.midi_out.sendLocalControl(true); 
					break;
					case 'localcontroloff' :
						App.device.midi_out.sendLocalControl(false); 
					break;
					case 'allnotesoff' :
						App.device.midi_out.sendAllNotesOff(); 
					break;
					case 'omnimodeoff' :
						App.device.midi_out.sendOmniMode(false); 
					break;
					case 'omnimodeon' :
						App.device.midi_out.sendOmniMode(true); 
					break;
					case 'monomodeon' :
						App.device.midi_out.sendPolyphonicMode('mono'); 
					break;
					case 'polymodeon' :
						App.device.midi_out.sendPolyphonicMode('poly'); 
					break;
				}
				App.log.add_line('cc_mode', a);
				App.device.blinkled();
	    	}
		},
	};
})();