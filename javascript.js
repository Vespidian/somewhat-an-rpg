//VARS
var loopInterval = 500;
var resultBox;


//FUNCTIONS

function setup() {//first initialization setup
    loop(); 
} window.onload = setup();

function loop() {
	setInterval(function(){//game loop


    	
        console.log("loop");
    }, loopInterval); //loop speed
}

function getKeystrokes(e) {
	if(e.keyCode == 13){
		document.getElementById('enterButton').click();
	}
}document.onkeydown = getKeystrokes;

function commandLog(cLog) {
	cmdLog.push(cLog);
	console.log(cLog);
}

function getPDamage () {
	//Player Damage
	pStats.attack = Math.floor((Math.random() * pStats.maxDmg) + pStats.minDmg);
	
}

function getMDamage () {
	//Monster Damage
	mStats.attack = Math.floor((Math.random() * mStats.maxDmg) + mStats.minDmg);
	
}

function getCommand() {
	var resultField = document.getElementById("resultField");
	var inputField = document.getElementById("commandField");

//Command Calls
	/*if(inputField.value == ""){
			inputField.value = "";
			resultField.innerHTML = "";
			commandLog("command: ");
		} 
	*/
	//HELP
	if(inputField.value == "help"){
		inputField.value = "";
		resultField.innerHTML = "Here are some commands: <br> + help <br> + createitem <br> + itemlist <br> + commandlog <br> + stats <br> + mstats <br> + heal <br> + ";
		commandLog("command: help");
	} 
	//CREATE ITEM
	if(inputField.value.search("createitem") != -1) {
		var item = inputField.value.substr(11);
		inputField.value = "";
		resultField.innerHTML = "Created Item: " + item;
		items.push(item);
		commandLog("command: createItem [" + item + "]");
	}
	//ITEM LIST
	if(inputField.value == "itemlist"){
		var unReadableItems = items.toString();
		var readableItems = unReadableItems.replace(/,/g, ", <br> ");
		inputField.value = "";
		resultField.innerHTML = "Here are the current items: <br>" + readableItems;
		commandLog("command: itemList");
	} 
	//COMMAND LOG
	if(inputField.value == "commandlog"){
		var unReadableLog = cmdLog.toString();
		var readableLog = unReadableLog.replace(/,/g, ", <br> ");
		inputField.value = "";
		resultField.innerHTML = "Here is the current command log: <br>" + readableLog;
		commandLog("command: commandLog");
		
	}
	
	//RPG COMMANDS
	//MONSTER
	if(inputField.value == "stats"){
			inputField.value = "";
			resultField.innerHTML = "Your current stats are <br> + "  + pStats.health + " health. <br> + " + pStats.defense + " defense";
			commandLog("command: playerStats");
		} 
	if(inputField.value == "mstats"){
			inputField.value = "";
			resultField.innerHTML = "The current monster's stats are <br> + "  + mStats.health + " health. <br> + " + mStats.defense + " defense";
			commandLog("command: monsterStats");
		} 
	if(inputField.value == "heal"){
		if(inventory.healthPotion >= 1){
			pStats.health += 10;
			
			inputField.value = "";
			resultField.innerHTML = "Character healed for: 10 hp";
			commandLog("command: heal");
		}
		}
	if(inputField.value == "attack" && mStats.health >= 1){
		
		getPDamage();
		getMDamage();
		
		if(pStats.attack > mStats.health){
			mStats.health = 0;
			inputField.value = "";
			resultField.innerHTML = "You successfully killed that horrible creature.. Gud job! :D";
		}else if (mStats.attack > pStats.health){
			pStats.health = 0;
			inputField.value = "";
			resultField.innerHTML = "You died...";
		}else{

			mStats.health -= pStats.attack;
			pStats.health -= mStats.attack;
		
			inputField.value = "";
			resultField.innerHTML = "You hit the monster for: <br>" + pStats.attack + " points of damage! <br>You have " + pStats.health + " points of health left.<br><br> It hit you back for: <br>" + mStats.attack + " points of damage! <br>It has " + mStats.health + " points of health left.";
		}
			commandLog("command: attack");
		} 
}