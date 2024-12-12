"use strict";

(function () {

    var App = function (options) {};

    App.displayNpk = true;
    App.LS = false;

	App.aNote = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

	App.slt = {};
	App.slt.device = document.getElementById('slt_device');
	App.slt.auto_note = document.getElementById('slt_auto_note');
	App.slt.auto_pc = document.getElementById('slt_auto_pc');
	App.slt.auto_cc = document.getElementById('slt_auto_cc');

	App.bt = {};
	App.bt.colnav = document.querySelectorAll("div.colnav > button");
	App.bt.addauto_note = document.querySelector("#bt_addauto_note");

	App.chk = {};
	App.knob = {};
	App.disp = {};

	App.input = {};
	App.input.time_note = document.getElementById("time_note");

	App.mainDiv = document.querySelectorAll("div#main > div");
	App.esp_bt_PC = document.querySelector("div#esp_button_pc");

	App.esp_bt_PN = document.querySelector("div#esp_button_pn");
	App.esp_bt_CC = document.querySelector("div#esp_button_cc");
	App.esp_pianorol = document.querySelector("div#esp_pianorol");
	App.esp_pianogrid = document.querySelector("div#esp_pianogrid");
	App.esp_displog = document.querySelector("div#esp_displog");


    /*******/

    App.getRandomInt = function(min, max){
    	min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min;
    }

    App.npk = function(x){
		if(App.displayNpk){
			console.log(x);
		}
	}

	App.createE = function(type=null, options=null){
		if(type!=null){
			var z = document.createElement(type);
			if(options!=null && typeof options == 'object'){

				if( typeof options.x == 'number'){
					z.style.left = options.x + "px";
				}

				if( typeof options.y == 'number' ){
					z.style.top = options.y + "px";
				}

				if( typeof options.class == 'string' ){
					z.classList.add(options.class);
				}
				if( typeof options.class == 'array' || typeof options.class == 'object' ){
					options.class.forEach(function(e,i){
						z.classList.add(e);
					});
				}

				if( typeof options.id == 'string' ){
					z.setAttribute('id', options.id);
				}

				if( typeof options.type == 'string' ){
					z.setAttribute('type', options.id);
				}

				if( typeof options.data == 'array' || typeof options.data == 'object' ){ 
					options.data.forEach(function(e,i){
						z.dataset[e[0]] = e[1];
					});
				}

				if( typeof options.attr == 'array' || typeof options.attr == 'object' ){ 
					options.attr.forEach(function(e,i){
						z.setAttribute(e[0], e[1]);
					});
				}

				if( typeof options.event == 'array' || typeof options.event == 'object' ){
					options.event.forEach(function(e,i){
						z.addEventListener(e[0], e[1]);
					});
				}

				if( typeof options.text  == 'string' ){
					z.innerText = options.text;
				}
				
				if( typeof options.html  == 'string' ){
					z.innerHTML = options.html;
				}

				if( typeof options.name  == 'string' ){
					z.setAttribute('name', options.name);
				}
			}
			return z;
		}
	}

    /*******/

    // browser export
    window.App = App;

})();

/***********************************************************************************************************************/
/***********************************************************************************************************************/
/*** READY ***/
/***********************************************************************************************************************/
function ready(){

	WebMidi
		.enable()
		.then(onEnabled)
		.catch(err => onError(err));

	function onError(err){
		//document.getElementById('error').style.display = 'block';
		//alert(err);
		console.log(err);
	}

	function onEnabled() {
		if (WebMidi.inputs.length < 1) {
			document.body.innerHTML+= "No device detected.";				////!!!!!
		} else {

			if (storageAvailable("localStorage")) {
				App.LS = true;
			}

			App.device.init();
			App.channel.init();
			App.progchange.init();
			App.padnote.init();
			App.controlchange.init();
			App.pattern.init();

			//////// *** INIT EVENT ***/

			WebMidi.addListener("connected", e => {
				App.device.on_konect();
			});
			WebMidi.addListener("disconnected", e => {
				App.device.on_dekonect();
			});

			/*
			/** MENU CLICK
			/***/
			App.bt.colnav.forEach(function(bt,i){
				bt.addEventListener('click', function(){
					App.mainDiv.forEach(function(el,i){
						el.style.display = 'none';
					});
					let lebt = document.querySelector("div#main > div#"+this.getAttribute('data-cible'));
					lebt.style.display = 'block';
					App.bt.colnav.forEach(function(bt,i){
						bt.classList.remove('onslt');
					});
					this.classList.add('onslt');
				});
			});

			//AUTOCLICK
			document.querySelector("button[data-cible='esp_midi_checker']").click();
			document.querySelector("button[data-cible='esp_pattern']").click();

		}
	}
	
}

/***********************************************************************************************************************/
/***********************************************************************************************************************/
/*** storage JS ***/
/***********************************************************************************************************************/
function storageAvailable(type) {
	try {
		var storage = window[type],
			x = "__storage_test__";
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	} catch (e) {
		return (
			e instanceof DOMException &&
			(e.code === 22 ||
			e.code === 1014 ||
			e.name === "QuotaExceededError" ||
			e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
			storage.length !== 0
		);
	}
}