(function () {
	App.progchange = {

		init : function(){
			App.npk('INIT progchange');

			var cpt=0;
			for (let i = 0; i < 8; i++) {
		  		for (let j = 0; j < 16; j++) {
		  			let e = App.createE('button', {
		  				'class' : 'padpc',
		  				'text' : cpt.toString(),
		  				'data' : [ ['num',cpt] ],
		  				'event' : [ ['click', App.progchange.bt_send_pc] ]
		  			});
					App.esp_bt_PC.append(e);
					cpt++;
		  		}
		  	}

		},

	    bt_send_pc : function(){
			App.npk('progchange bt_send_pc ');
			if( App.device.check_device() ){ App.progchange.send_pc(this); }
		},

		send_pc : function(that){
			App.npk('progchange send_pc ');
			let num_pc = that.getAttribute('data-num');
			App.device.midi_out.sendProgramChange(num_pc, { channels: App.channel.chan_out }); 
			App.device.blinkled();

			let c=' - All -'
			if( Array.isArray(App.channel.chan_out) ){
				c='';
				App.channel.chan_out.forEach(function(e,i){
		    		c += " / "+e;
		    	});
				c=c.substring(2);
			}

			//LOG
			App.log.add_line('pc', num_pc);
		}
	};
})();