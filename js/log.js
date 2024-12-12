(function () {
	App.log = {
		
		Mem : [],

		init : function(){
			App.npk('INIT LOG');
		},

	    add_line : function(tip, val){
	    	App.npk('LOG : add_line');
	    	id = App.log.Mem.length;
	    	if( typeof App.log.Mem[id-1] === 'object' && App.log.Mem[id-1].tip == tip && tip=='cc' && App.log.Mem[id-1].val[0]==val[0] ){
	    		App.log.Mem[id-1].val = val;
	    	} else {
	    		let d = {
					tip : tip,
					val : val,
					chan : App.channel.chan_out,
					dev : App.device.midi_out.name
				};
		    	App.log.Mem[id]=d;
	    	}
	    	App.log.refresh();
	    },

	    getbyid : function(id){
	    	App.npk('LOG : getbyid');
	    },

	    refresh : function(){
	    	let t='';

	    	t += "<table id='t_log'>";

	    		t += "<tr>";
	    			t += "<th>ID</th>";
	    			t += "<th>Type</th>";
	    			t += "<th>Value</th>";
	    			t += "<th>Channel</th>";
	    			t += "<th>Device</th>";
	    		t += "</tr>";

	    		for(let i=App.log.Mem.length-1; i>=0; i--){

	    			let tip=val=chan='';
	    			switch(App.log.Mem[i].tip){
	    				case 'pc': 
	    					tip='Program change';
	    					val=App.log.Mem[i].val;
	    				break;
	    				case 'pn_on': 
	    					tip='Note ON';	
	    					val=App.log.Mem[i].val;	
	    				break;
	    				case 'pn_off': 
	    					tip='Note OFF';	
	    					val=App.log.Mem[i].val;	
	    				break;
	    				case 'pn_on_off': 
	    					tip='Note ON - OFF';	
	    					val=App.log.Mem[i].val;	
	    				break;
	    				case 'cc': 
	    					tip='Control change';
	    					val="Num CC : "+App.log.Mem[i].val[0]+"  Value : "+App.log.Mem[i].val[1];
	    				break;
	    				case 'cc_mode': 
	    					tip='Control change';
	    					val=App.log.Mem[i].val;
	    				break;
	    			}

	    			if( App.log.Mem[i].chan=='all' ){
	    				chan = "All";
	    			} else {
	    				App.log.Mem[i].chan.forEach(function(e,i){
	    					chan += " / "+e;
	    				});
	    				chan=chan.substring(2);
	    			}

	    			t += "<tr>";
		    			t += "<td>"+i+"</td>";
		    			t += "<td>"+tip+"</td>";
		    			t += "<td>"+val+"</td>";
		    			t += "<td>"+chan+"</td>";
		    			t += "<td>"+App.log.Mem[i].dev+"</td>";
		    		t += "</tr>";
	    		}
	    	t += "</table>";
	    	App.esp_displog.innerHTML = t;
	    }

	};
})();