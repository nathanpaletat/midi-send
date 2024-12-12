(function () {
	App.pattern = {

		opt_gen : {
			'bpm' : 120,
			'step' : 32
		},
		Mem : {},

		init : function(){
			App.npk('INIT PATTERN');

			App.bt.generate = document.getElementById('btgo_gnrtr');
			App.bt.play = document.getElementById('bt_play');
			App.bt.stop = document.getElementById('bt_stop');
			App.chk.automa = document.querySelectorAll("table#t_gnrtr input[type='checkbox']");

			App.chk.automa.forEach(function(chk,i){
				chk.addEventListener('change', function(){
					let id = this.getAttribute('id');
					let label = document.querySelector("label[for='"+id+"']");
					if(this.checked){
						label.style.color = 'orange';
					} else {
						label.style.color = '#EEE';
					}
				});
			});
			
			App.bt.generate.addEventListener("click", function(){
				if( App.pattern.checkparam() ){
					App.pattern.generate();
				}
			});

			App.bt.play.addEventListener("click", function(){
				App.pattern.play();
			});
		},

		checkparam : function(){
			let r=true;
			let min,max,val;
			let a = ['bpm', 'nbrstep', 'nbrstepactif'];
			a.forEach(function(e,i){
				min = Number( document.getElementById('gnrtr_'+e).getAttribute('min') );
				max = Number( document.getElementById('gnrtr_'+e).getAttribute('max') );
				val = Number( document.getElementById('gnrtr_'+e).value );
				if(val<min){val=min; }
				if(val>max){ val=max; }
				document.getElementById('gnrtr_'+e).value = val;
			});
			let line = ['oct', 'vel', 'dur'];
	    	let col = ['def', 'from', 'to'];
	    	line.forEach(function(eL,iL){
				col.forEach(function(eC,iC){
					min = Number( document.getElementById('gnrtr_'+eC+'_'+eL).getAttribute('min') );
					max = Number( document.getElementById('gnrtr_'+eC+'_'+eL).getAttribute('max') );
					val = Number( document.getElementById('gnrtr_'+eC+'_'+eL).value );
					if(val<min){val=min; }
					if(val>max){ val=max; }
					document.getElementById('gnrtr_'+eC+'_'+eL).value = val;
				});
			});
			return r;
		},

		generate : function(){
			App.pattern.Mem = []

	    	let line = ['oct', 'vel', 'dur'];
	    	let col = ['def', 'chk', 'from', 'to'];
	    	let aVal = {};
	    	line.forEach(function(eL,iL){
	    		if (typeof aVal[eL] == "undefined") {
	    			aVal[eL]={};
	    		}	
				col.forEach(function(eC,iC){
					if(eC=='chk'){
						aVal[eL][eC] = Number( document.getElementById('gnrtr_'+eC+'_'+eL).checked );
					} else {
						aVal[eL][eC] = Number( document.getElementById('gnrtr_'+eC+'_'+eL).value );
					}
				});
			});

			App.npk(aVal);

			App.pattern.opt_gen = aVal;
			App.pattern.opt_gen.bpm = Number(document.getElementById('gnrtr_bpm').value);
			App.pattern.opt_gen.step = Number(document.getElementById('gnrtr_nbrstep').value);
			App.pattern.opt_gen.nbr_step_actif = Number(document.getElementById('gnrtr_nbrstepactif').value);

			let nbr_octave_from, nbr_octave_to;
			if( App.pattern.opt_gen.oct.chk==1 ){
				nbr_octave_from = App.pattern.opt_gen.oct.from;
				nbr_octave_to = App.pattern.opt_gen.oct.to;
			} else {
				nbr_octave_from = App.pattern.opt_gen.oct.def;
				nbr_octave_to = App.pattern.opt_gen.oct.def;
			}

			let nbr_vel_from, nbr_vel_to;
			if( App.pattern.opt_gen.vel.chk==1 ){
				nbr_vel_from = App.pattern.opt_gen.vel.from;
				nbr_vel_to = App.pattern.opt_gen.vel.to;
			} else {
				nbr_vel_from = App.pattern.opt_gen.vel.def;
				nbr_vel_to = App.pattern.opt_gen.vel.def;
			}

			let nbr_dur_from, nbr_dur_to;
			if( App.pattern.opt_gen.dur.chk==1 ){
				nbr_dur_from = App.pattern.opt_gen.dur.from;
				nbr_dur_to = App.pattern.opt_gen.dur.to;
			} else {
				nbr_dur_from = App.pattern.opt_gen.dur.def;
				nbr_dur_to = App.pattern.opt_gen.dur.def;
			}

			App.npk(App.pattern.opt_gen);

			var obj={};
			for(var step=1; step<=App.pattern.opt_gen.step; step++){
				obj={
					note : App.pattern.getRandomNote(),
					octave : App.getRandomInt( nbr_octave_from, nbr_octave_to+1 ),
					velocity : App.getRandomInt( nbr_vel_from, nbr_vel_to ),
					duration : App.getRandomInt( nbr_dur_from, nbr_dur_to ),
				}
				obj.no = obj.note + obj.octave;
				App.pattern.Mem[step] = obj;
			}

			let cpt = App.pattern.opt_gen.step;
			while( cpt > App.pattern.opt_gen.nbr_step_actif ){
				let j = Math.floor(Math.random() * (App.pattern.Mem.length - 1) + 1);
				App.pattern.Mem[j] = null;

				let c=0;
				App.pattern.Mem.forEach(function(e,i){
					if(e!=null){ c++; }
				});
				cpt=c;
			}

			var t='';
			var cl, title, no, style;
			t += "<table>";
			t += "<tr>";
				t += "<th>&nbsp;</th>";
				for(var step=1; step<=App.pattern.opt_gen.step; step++){
					t += "<th class='stp"+step+"'>"+step+"</th>";
				}
			t += "</tr>";

			for(var oct=nbr_octave_from; oct<=nbr_octave_to; oct++){
				for (var note in App.aNote) {
					t += "<tr>";
						no = App.aNote[note]+oct;
						t += "<td>"+no+"</td>";

						for(var step=1; step<=App.pattern.opt_gen.step; step++){

							cl=style=title='';
							
							if( App.pattern.Mem[step]!=null && App.pattern.Mem[step].no == no ){
								cl = "onNote";
								title = "N: "+App.pattern.Mem[step].no+" | V:"+App.pattern.Mem[step].velocity+" | D:"+App.pattern.Mem[step].duration;
								style = "border-left:1px solid #000; background-color:rgb("+(App.pattern.Mem[step].velocity*2)+", 0, 0)";
							}

							t += "<td style='"+style+"' class='"+cl+"' title='"+title+"' >&nbsp;</td>";
						}

					t += "</tr>";
				}
			}
			
			t += "</table>";

			App.esp_pianogrid.innerHTML = t;
			App.esp_pianorol.style.display = 'block';
			App.npk(App.pattern.Mem);
		},

	    getRandomNote : function(min, max){
	    	var num = App.getRandomInt(0, App.aNote.length-1);
			return App.aNote[num];
	    },

	    play : function(){
	    	App.npk("PATTERN play");
	    	if( App.device.check_device() ){
	    		App.bt.play.disabled = true;
		    	App.bt.generate.disabled = true;
		    	var inter = (15/App.pattern.opt_gen.bpm)*1000;
		    	var t=0;
		    	App.pattern.Mem.forEach(function(e,i){
		    		t=i*inter;
		    		setTimeout(() => {
						App.device.blinkled();
						let th = document.querySelector("th.stp"+i);
						th.style.background = "#FFF";
					}, t);

		    		if(e!==null){
		    			App.device.midi_out.playNote(e.no, {channels: App.channel.chan_out, rawAttack: e.velocity, duration: e.duration, time:"+"+t }); 
		    			App.log.add_line('pn_on_off', e.no);
		    		}

		    	});
		    	setTimeout(() => {
					App.device.blinkled();
					let th = document.querySelectorAll("div#esp_pianogrid th");
					th.forEach(function(el){
						el.style.background = "transparent";
					});
					App.bt.play.disabled = false;
					App.bt.generate.disabled = false;
				}, (inter*App.pattern.Mem.length));
	    	}
	    }
	};
})();