(function () {
	App.checker = {

		refresh : function(){
	    	App.npk('CHECKER refresh');
			let ulin = document.getElementById("ulin");
			let ulout = document.getElementById("ulout");

			ulin.innerHTML='';
			ulout.innerHTML='';

			WebMidi.inputs.forEach(function(value, index){
	    		let li = App.createE('li', {});

	    		let d_key = App.createE('div', {
					'class' : 'key',
					'html' : "N°" + index
				});
				let d_n = App.createE('div', {
					'class' : 'n',
					'html' : value['name']
				});
				let d_m = App.createE('div', {
					'class' : 'm',
					'html' : value['manufacturer']
				});
				
				let c= "warn";
				if(value['state']=='connected'){ c= "good"; }
				let d_s = App.createE('div', {
					'class' : 's',
					'html' : "State : <span class='"+c+"'>"+value['state']+"</span>"
				});

				c= "warn";
				if(value['connection']=='open'){ c= "good"; }
				let d_c = App.createE('div', {
					'class' : 'c',
					'html' : "Connection : <span class='"+c+"'>"+value['connection']+"</span>"
				});

				let d_v = App.createE('div', {
					'class' : 'v',
					'html' : "Version : "+value['version']
				});
				let d_i = App.createE('div', {
					'class' : 'i',
					'html' : "ID : "+value['id']
				});

				li.append(d_key, d_n, d_m, d_s, d_c, d_v, d_i);
				ulin.append(li);
	    	});

			WebMidi.outputs.forEach(function(value, index){
	    		let li = App.createE('li', {});

	    		let d_key = App.createE('div', {
					'class' : 'key',
					'html' : "N°" + index
				});
				let d_n = App.createE('div', {
					'class' : 'n',
					'html' : value['name']
				});
				let d_m = App.createE('div', {
					'class' : 'm',
					'html' : value['manufacturer']
				});
				
				let c= "warn";
				if(value['state']=='connected'){ c= "good"; }
				let d_s = App.createE('div', {
					'class' : 's',
					'html' : "State : <span class='"+c+"'>"+value['state']+"</span>"
				});

				c= "warn";
				if(value['connection']=='open'){ c= "good"; }
				let d_c = App.createE('div', {
					'class' : 'c',
					'html' : "Connection : <span class='"+c+"'>"+value['connection']+"</span>"
				});

				let d_v = App.createE('div', {
					'class' : 'v',
					'html' : "Version : "+value['version']
				});
				let d_i = App.createE('div', {
					'class' : 'i',
					'html' : "ID : "+value['id']
				});

				li.append(d_key, d_n, d_m, d_s, d_c, d_v, d_i);
				ulout.append(li);
	    	});
	    }

	};
})();