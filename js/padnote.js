(function () {
	App.padnote = {

		init : function(){
			App.npk('INIT PADNOTE');

			let line = App.createE('div', {
				'class' : 'line'
			});
			let span = App.createE('span', {
	  			'html' : 'Octave &darr;',
			});
			line.append(span);
			for (let j = 0; j < 12; j++) {
	  			let e = App.createE('span', {
	  				'html' : App.aNote[j],
	  			});
				line.append(e);
	  		}
	  		App.esp_bt_PN.append(line);

			var num = 0;
			var x=40;
			var y=60;
			for (let i = 0; i < 11; i++) {

				let line = App.createE('div', {
	  				'class' : 'line',
	  				'data' : [ ['line', i] ]
	  			});

				let span = App.createE('span', {
		  				'html' : i.toString(),
	  			});
				line.append(span);

		  		for (let j = 0; j < 12; j++) {
		  			let e = App.createE('button', {
		  				'class' : 'pad',
		  				'text' : App.aNote[j] + i.toString(),
		  				'data' : [ ['num',num], ['line',i+1], ['col',j+1] ],
		  				'event' : [ ['mousedown', App.padnote.pad_mouDown], ['mouseup', App.padnote.pad_mouUp] ]
		  			});
		  			if(num>127){
		  				e.classList.add('hidden');
		  			}
					line.append(e);
					num++;
		  		}
		  		App.esp_bt_PN.append(line);
		  	}
			
		},

		pad_mouDown : function(){
			App.npk('pad_mouDown');
			if( App.device.check_device() ){
				let num_note = this.getAttribute('data-num');
				App.device.midi_out.playNote(num_note, {channels: App.channel.chan_out, rawAttack: 100 });
				App.device.blinkled();	

				//LOG
				App.log.add_line('pn_on', num_note);
			}
			
		},

		pad_mouUp : function(){
			App.npk('pad_mouUp');
			if( App.device.check_device() ){
				let num_note = this.getAttribute('data-num');
				App.device.midi_out.stopNote(num_note, {channels: App.channel.chan_out, rawRelease: 100 }); 
				App.device.blinkled();

				//LOG
				App.log.add_line('pn_off', num_note);
			}
		}
	};
})();