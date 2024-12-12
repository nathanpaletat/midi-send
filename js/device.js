(function () {
	App.device = {

		midi_out : {},
		pre_slt : '',

		init : function(){

			App.disp.led = document.getElementById("led");

			if(App.LS){
				App.device.pre_slt = localStorage.getItem("iddevice");
				console.log(localStorage);
			}

			//////// *** INIT EVENT ***/

			//SELECT DEVICE
			App.slt.device.addEventListener('change', function(){
				App.npk('DEVICE : change');
				App.device.midi_out = WebMidi.getOutputById(this.value);
				if(App.LS){
					localStorage.setItem("iddevice", this.value);

					localStorage.setItem("testest", "" );
				}
			});

			App.device.refresh();

		},

		refresh : function(){
	    	App.npk('DEVICE : refresh');
			var opt="<option value='' > - Select - </option>";
			WebMidi.outputs.forEach(function(obj) { 
				let s='';
				if( App.device.pre_slt == obj.id ){
					s = "selected='selected'";
				}
				opt+="<option "+s+" value='"+obj.id+"' name='"+obj.name+"' data-manu='"+obj.manufacturer+"'>"+obj.name+" / "+obj.manufacturer+"</option>";
			});
			App.slt.device.innerHTML = opt;
			App.checker.refresh();

			const changeEvent = new Event("change");
			App.slt.device.dispatchEvent(changeEvent);
	    },

	    on_konect : function(){
	    	App.npk('DEVICE : on_konect');
			App.device.refresh();
	    },

	    on_dekonect : function(){
	    	App.npk('DEVICE : on_dekonect');
			App.device.refresh();
	    },

	    check_device : function(){
			if (
			    typeof App.device.midi_out === 'object' &&
			    !Array.isArray(App.device.midi_out) &&
			    App.device.midi_out !== null
			) {
			    return true;
			} else { 
				alert("Please select device !");
				return false; 
			}
	    },

	    blinkled : function(){
			App.disp.led.style.display = 'block';
			setTimeout(() => {
				App.disp.led.style.display = 'none';
			}, 110);
	    }

	};
})();