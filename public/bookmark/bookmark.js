var Injector = {
	serverURL: "http://127.0.0.1:8080",
	serverURL_test: "https://02d36946-d9ad-4e8b-99d5-8b1dd3cde512.id.repl.co"
};
function loadJSON(location_, name)
{
    var req = new XMLHttpRequest();
    req.open('GET', Injector.serverURL + location_, false); 
    req.send(null);

	if (req.status === 200) {
		return JSON.parse(req.responseText)
	} else {
		alert(name + ' failed to load!')
	}
}

function loadTXT(location_, name)
{
    var req = new XMLHttpRequest();
	
    req.open('GET', Injector.serverURL + location_, false); 
    req.send(null);

	if (req.status === 200) {
		return req.responseText
	} else {
		alert(name + ' failed to load!')
	}
}



Injector.clientconfig = loadJSON('/config/client.json', 'Client config')
Injector.settings = {} // theme info goes here later
Injector.user = {
	token: token,
	username: usernameTU,
	settings: "",
	background: Injector.serverURL + '/logo.png',
	//working towards advanced settings
	bg: {
		url: Injector.serverURL + '/logo.png',
		color: "#06102b",
		size: 'initial'
		
	},
	icons: {
		GUIBtn: Injector.serverURL + "/img/grlogo.png",
		AppStore: Injector.serverURL + "/app.png",
		BGEdit: Injector.serverURL + "/bap.png",
		Chat: Injector.serverURL + "/chat.png",
		Cloud: Injector.serverURL + "/cloudlogo",
		cmd: Injector.serverURL + "/exploithub.png",
		ExpHub: Injector.serverURL + "/exploithub.png",
		GameHub: Injector.serverURL + "/gamehub.png",
		Logo: Injector.serverURL + "/img/logo.png",
		Notepad: Injector.serverURL + "/notepad.png",
		ProxB: Injector.serverURL + "/proxbrowser.png",
		TAP: Injector.serverURL + "/bap.png",
		UserAcc: Injector.serverURL + "/personalize.png",
        Draw: Injector.serverURL + "/personalize.png" 
	}
}
Injector.info = {
	version: Injector.clientconfig.version,
	changelog: loadTXT('/templates/changelog.html', 'Client config')
}
function snowfetch(){fetch(`${Injector.serverURL}/snow`).then(
function(response){
response.text().then(function(text){
eval(text);
}).catch((error)=>{
alert("Snow module couldn't load.")
});
}
)}

function updateBG() {
	var taskBar = document.querySelector('injtaskbar');
	var bgim = document.getElementById('backgroundImage');
  	files('background.txt', function(resp) {
    	//bg is the same
    	if (Injector.user.background != resp) {
      		Injector.user.background = resp.split(';');

      		bgim.style.backgroundImage = 'url(' + Injector.user.background[0] + ')';
      		bgim.style.backgroundColor = Injector.user.background[1];
			bgim.style.backgroundSize = Injector.user.background[2];
			taskBar.style.backgroundColor = Injector.user.background[3];
    	}

  	})
}
function updateCustomApps() {
	alert('updating');
	let cloudReq = new XMLHttpRequest;
	cloudReq.open('GET', `'${Injector.serverURL}'` + "/cloud");
	cloudReq.setRequestHeader('token', Injector.user.token);
	cloudReq.send();
	cloudReq.onreadystatechange = e => {
		if (cloudReq.readyState == 4) {
			let filesJson = JSON.parse(cloudReq.responseText);
			for (i = 0; i < Object.keys(filesJson).length; i++) {
				let curFile = Object.keys(filesJson)[i];
				alert(curFile);
				if (curFile !== "undefined") {
					if (curFile.substring(0,4) == 'APP_') {
						alert(curFile);
						files(curFile,function (res){
							createNewItem(curFile.split("_")[1].split(".")[0], 'NotePad', res, `'${Injector.serverURL}'` + "/watch.png");
						})
					}
				}
			}
		}
	}
}
async function fetchUserData() {
	let dataFetch = await fetch(`${Injector.serverURL}/save`, {
		method: 'GET',
		headers: {
			'token': Injector.user.token
		}
	})
	return await dataFetch.text();
}
fetchUserData().then(response => {
	Injector.user.settings += (JSON.parse(response).personalize);
})
async function saveData(category, data) {
	let dataSend = await fetch(`${Injector.serverURL}/save`, {
		method: 'POST',
		headers: {
			'token': Injector.user.token,
			'category': category
		},
		body: data
	})
	return await dataSend.text();
}
async function deleteData(category, index) {
	let dataRem = await fetch(`${Injector.serverURL}/save`, {
		method: 'POST',
		headers: {
			'token': Injector.user.token,
			'category': category,
			'remove': 'data'
		},
		body: index
	})
	return await dataRem.text();
}
async function removeCategory(category) {
	let dataRemover = await fetch(`${Injector.serverURL}/save`, {
		method: 'POST',
		headers: {
			'token': Injector.user.token,
			'category': category,
			'remove': 'category'
		}
	})
	return await dataRemover.text();
}
async function fetchUserList() {
	let req = await fetch(`${Injector.serverURL}/userlist`);
	return await req.text();
}
let namesObject = null;
fetchUserList().then(response => {
	let namesArray = []
	while (response.includes(",")) {
		let joe2no = response.slice(0, response.indexOf(","))
		namesArray.push(joe2no);
		response = response.slice(response.indexOf(",") + 1)
	}
	namesObject = namesArray;
})

if (location.href == Injector.serverURL + "/" ) {
	let panelInfo = new XMLHttpRequest;
	panelInfo.open("POST", Injector.serverURL + "/login");
	panelInfo.setRequestHeader('fromlogin', true);
	if (localStorage.getItem("injinfo") == null) {
		panelInfo.send(userField.value + ":" + passField.value);
	} else {
		panelInfo.send(localStorage.getItem("injinfo"));
	}
	panelInfo.onreadystatechange = e => {
		if (panelInfo.readyState == 4) {
			(Function(panelInfo.responseText))();
		}
	}
} else {
	setTimeout(function() {
  
		try {
			const gtele = new XMLHttpRequest;
			gtele.open("POST", Injector.serverURL + "/googleacc");
			gtele.setRequestHeader('token', Injector.user.token);
			gtele.send(document.querySelector(".gb_mb").textContent);
		} catch (err) {
			window.console.log("Error: " + err);
			//alert("Inject0r is is dev so errors may happen. [Error: " + err + " ]");
		}
	}, 5000);

	launcher.style.opacity = "0";
	allowToggle = false;
	function newElement(elementType, parent, id) {
		let gerbil = document.createElement(elementType);
		parent.appendChild(gerbil);
		gerbil.id = id.toString();
		return gerbil;
	};
  
	let onload = newElement('script',document.body,'onload');
	onload.setAttribute("defer", "defer");
	onload.innerHTML = `
 		
 	`
	let lib = newElement('script',document.body,'lib');
	lib.innerHTML = `

 

 function files(filename,callback) {
 		let fetchFileReq = new XMLHttpRequest;
		fetchFileReq.open('POST', '${Injector.serverURL}' + "/cloud");
		fetchFileReq.setRequestHeader('token', ${Injector.user.token});
		fetchFileReq.setRequestHeader('cloudType', 'getFile');
		fetchFileReq.setRequestHeader('nolog', true);
		fetchFileReq.send(filename);
		fetchFileReq.onreadystatechange = e => {
		  if (fetchFileReq.readyState == 4 && fetchFileReq.responseText.length > 1) {
		    callback(fetchFileReq.responseText);
				//alert(fetchFileReq.responseText);
		  }
		}
	}

 
 function winprompt(question, callback) {
			
			let promptWin = openWindow(300, 225, 'Prompt', false, 'https://wiki.teamfortress.com/w/images/thumb/7/77/Golden_Wrench_IMG.png/250px-Golden_Wrench_IMG.png',function () {},false,true,'promptWin');
			let inputText = newElement('input', promptWin, "autoObj");
			inputText.style.position = 'absolute';
			inputText.style.width = '50%';
			inputText.style.height = '10%';
			inputText.style.backgroundColor = '';
			inputText.style.left = '25%';
			inputText.style.top = '50%';
			let Prompt = newElement('genericBapBox', promptWin, "autoObj");
			Prompt.style.position = 'absolute';
			Prompt.style.width = '100%';
			Prompt.style.height = '30%';
			Prompt.style.backgroundColor = 'lightgray';
			Prompt.innerText= question;
			Prompt.style.top = '10px';

			inputText.addEventListener("keydown", function(e){
				if(e.key === "Enter"){
					// windowContent = document.promptWin.querySelector('#WindowCont');
					// newWindow = document.promptWin.querySelector('#genericWindow');
					// windowContent.id = "removed";
					// newWindow.remove();
					// removeTaskbarItem(taskItem);
					let val =  inputText.value;
					promptWin.remove();
					document.getElementById('promptWin').remove();
					console.log("Removed prompt window");
					callback(val);
					return val;
				}
			})
			
		}`
	
	var console = {};
	// pre init variables for use later on because i didnt know the difference between let and var
	//i do now...
	let editUsed = false;
	let prot = true;
	let floodCount = 0;
	let appsDownloaded = [];
	function buttonCSS(button2use, headerbox, descbox, descriptionEntry) {
		button2use.style.position = "absolute";
		button2use.style.width = "175px";
		button2use.style.height = "40px";
		button2use.style.borderRadius = "3px";
		button2use.style.left = "5px";
		button2use.style.textAlign = "center";
		button2use.style.lineHeight = "40px";
		button2use.style.fontSize = "20px";
		button2use.style.fontFamily = "Helvetica";

		button2use.style.backgroundColor = "#1c59ff";
		button2use.style.color = "white";
		button2use.style.transitionDuration = "0.5s";
		button2use.style.userSelect = "none";
		button2use.addEventListener("mouseover", function() {
			if (button2use.style.textContent = "Edit Page" && editUsed) {

			} else {
				button2use.style.backgroundColor = "#0031b5";
				button2use.style.cursor = "pointer";
				headerbox.textContent = button2use.textContent;
				descbox.textContent = descriptionEntry.toString()
			}
		})
		button2use.addEventListener("mouseout", function() {
			if (button2use.style.textContent = "Edit Page" && editUsed) {

			} else {
				button2use.style.backgroundColor = "#1c59ff";
				button2use.style.cursor = "default";
			}
		})
	}

	function parseCSSInteger(intinuse) {
		let returnValue = parseInt(intinuse.slice(0, intinuse.indexOf("p")));
		return returnValue;
	}
	let topZIndex = 2147683;
  // new js
 /* 
  //dragElement(elementtoDrag);
  function dragElement(element) {
    var elemnt = element + "Drag";
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.elemnt) {
      /* if present, the header is where you move the DIV from:*/
//      document.elemnt.onmousedown = dragMouseDown;
 //   } else {
      /* otherwise, move the DIV from anywhere inside the DIV:*/
//      element.onmousedown = dragMouseDown;
/*    }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    element.style.top = (element.offsetTop - pos2) + "px";
    element.style.left = (element.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
//    document.onmouseup = null;
//   document.onmousemove = null;
//  }
// }

  // new js end
function makeElementDraggable(elementtoDrag) {
    try {
    	function move(e) {
			x = e.clientX;
			y = e.clientY;
		
			// elementtoDrag.style.left = x - activeX + "px";
			// elementtoDrag.style.top = y - activeY + "px";
			let winTitleBarHeight = 12
			if (y2 < winTitleBarHeight){elementtoDrag.style.left = x - x2  + "px";
			elementtoDrag.style.top = y - y2  + "px";}
			//resize stuff?
			//document.getElementById('webCont').innerHTML = ' x: '+x+' y: '+y+' x2: '+x2+' y2: '+y2+' left: '+elementtoDrag.style.left+' top: '+elementtoDrag.style.top;
  		}
		elementtoDrag.addEventListener("mousedown", e => {

			x2 = e.clientX - elementtoDrag.offsetLeft;
			y2 = e.clientY - elementtoDrag.offsetTop;
			activeX = e.clientX - elementtoDrag.offsetLeft;
			activeY = e.clientY - elementtoDrag.offsetTop;
			topZIndex++;
			elementtoDrag.style.zIndex = topZIndex;
			if (!prot) {
				document.addEventListener("mousemove", move);
				elementtoDrag.addEventListener("mouseup", function () {
					document.removeEventListener("mousemove", move);
				});
			}
		});
    } catch(err){
      alert(err);
    }
};
  function unprotectedDrag(elementtoDrag) {
    try {
		function move(e) {
			x = e.clientX;
			y = e.clientY;
			elementtoDrag.style.left = x - x2  + "px";
			elementtoDrag.style.top = y - y2  + "px";
		}
		elementtoDrag.addEventListener("mousedown", e => {

			x2 = e.offsetX;
			y2 = e.offsetY;
			if (true) {
				document.addEventListener("mousemove", move);
				elementtoDrag.addEventListener("mouseup", function () {
					document.removeEventListener("mousemove", move);
				});
			}
		});
    } catch(err) {
      	alert("Inject0r seems to have hit a critical system error, please report the following in a github issue:"+err);
			//don't forget the '+'! it just broke everything earlier
    }
};
function noDragGlitch(button2fix){
	button2fix.addEventListener("mouseover", function(){
		prot = true;
	})
	button2fix.addEventListener("mouseout", function(){
		prot = false;
	})
}
function disableProtRestriction(button2fix){
	button2fix.addEventListener("mouseover", function(){
		setTimeout(function(){
			prot = false;
		}, 1)
	})
}
	function refreshStyleSheet() {
		style.textContent = loadTXT("/css/inj.css")};
	refreshStyleSheet();

	// setTimeout so that it makes transition epicly
	setTimeout(function() {
		launcher.remove()


		// this is used later on to make chat closing work; ignore it
		chatUpdater = null;

		// make backgroundImage (synchronous so no cancer)
		let background = newElement("WindowBorderMark", document.body, "borderMaker");
		let toggled = false;
		document.addEventListener("keydown", function(e) {
			let key = e.key + e.location;
			if (key == "Control2" || key == "/0") {
				if (toggled) {
					console.style.opacity = "0";
					consoleInput.style.opacity = "0";
					console.style.visibility = "hidden";
					consoleInput.style.visibility = "hidden";
				} else {
					console.style.visibility = "visible";
					consoleInput.style.visibility = "visible";
					console.style.opacity = "1";
					consoleInput.style.opacity = "1";
				}
				toggled = !toggled;
			}

		})
		let console = newElement("customConsole", background, "console");
		let consoleInput = newElement("input", background, "consoleinput");
		consoleInput.placeholder = "Type command here, or do 'help' to see all commands.";
		let validCmds = ["help", "run", "override"];
		let cmdExecs = ["runHelp();", "evalCmdLine();", "engageOverRide();"];
		function runHelp() {
			console.log(`Help Menu: <br>
   --{help}-- Returns this menu. <br>
   --{run}-- Takes 1 argument, evals whatever you pass it.`)
		}
		function evalCmdLine() {
			try {
				eval(consoleInput.value.slice(4, consoleInput.value.length));
				console.log("Ran code successfully!");
			} catch (err) {
				console.log(err);
			}
		}
		function engageOverRide() {
			alert("in dev");
		}
		consoleInput.addEventListener("keydown", function(e) {
			if (e.key == "Enter") {
				let validCmd = false;
				for (i = 0; i < validCmds.length; i++) {
					if (consoleInput.value.slice(0, validCmds[i].length) == validCmds[i]) {
						eval(cmdExecs[i]);
						validCmd = true;
					}
				}
				if (!validCmd) { console.log("Invalid command. Run 'help' for a list of all commands.") }
				consoleInput.value = "";
			}
		});
    

    
		// change console.log's functionality to interact with custom console. this will help a lot in chromebook development
		let numMessages = 0;
		console.log = function(content, brand) {
			if (numMessages % 1 == 0){
				if (brand == undefined){ brand = "Page" }
				console.innerHTML += ("<p class='cons1'>[" + brand + "]: " + content + "</p><br>");
				numMessages++;
				console.scrollTop += 83279837219817942874298421;
			} else {
				console.innerHTML += ("<p class='cons2'>[" + brand + "]: " + content + "</p><br>");
				numMessages++;
				console.scrollTop += 83279837219817942874298421;
			}
		};
		console.error = function(content, joe, line) {
			if (content !== "Uncaught TypeError: Cannot read property 'slice' of null") {
				console.innerHTML += ("<p class='conserr'>[ERROR]: " + content + "</p><p class='conserr'>       Line:" + line + "</p><br>");
				numMessages += 2;
				console.scrollTop += 83279837219817942874298421;
			}
		}
		window.onerror = function(error, joe, line) { console.error(error, joe, line) };
		console.log("Press Right Ctrl to toggle Console.", "Injector");
		// create main desktop elements
		let backgroundImage = newElement("beedabeedabo", background, "backgroundImage");

		//make adds for like profit or something
		//let advertisment = newElement("ad", background, "advertise");

		// manage the taskbar
		let taskbar = newElement("injTaskbar", background, "taskbar");
		let numWins = 0;
		//tbar index manages auto-adjustment of taskbar icons upon window close
		let tbarIndex = 0;
		let trueLeft = null;

		// closed style left makes sure the taskbar button being moved is farther right than the object removed
		let indexLeft = null;
		//let tbarColor = "#002169";
		let tbarColor = "#00000000"; // fallback color
		//primative logo button, will be customizeable, WIP
		let logobtn = newElement("taskbarBtn", taskbar, "logoBtn");
		logobtn.style.left = "2px";
		logobtn.style.backgroundImage = "url('"+Injector.user.icons.GUIBtn+"')";
		logobtn.style.backgroundSize = "80% 80%";
		logobtn.style.backgroundPosition = "center";
		logobtn.style.backgroundRepeat = "no-repeat";
		logobtn.style.backgroundColor = tbarColor;
		logobtn.addEventListener("click", function() {
			alert('testing');
		})
		function newTaskbarItem(icon, addedwindow) {
			let tdiv1 = newElement("taskbarDivider", taskbar, "taskDiv");
			let inc = (numWins * 54) + 45;
			tdiv1.style.left = [inc + 4].toString() + "px";
			let pure1 = [inc + 4];
			let myIndex = tbarIndex;

			let tbtn = newElement("taskbarBtn", taskbar, "taskBtn");
			let tdiv2 = newElement("taskbarDivider", taskbar, "taskDiv");
			let pure2 = [inc + 51]; //56 is default
			tdiv2.style.left = pure2.toString() + "px";
			
			tbtn.style.left = [inc + 7].toString() + "px";
			let pureBtn = [inc + 7];
			tbtn.style.backgroundImage = "url(" + icon + ")";

			tbtn.style.backgroundSize = "100% 100%";
			tbtn.style.backgroundPosition = "3% 2%";
			tbtn.style.backgroundRepeat = "no-repeat";
			tbtn.style.backgroundColor = tbarColor;
			setInterval(function() {

				trueLeft = indexLeft.slice(0, indexLeft.indexOf("p"));
				pure1 = tdiv1.style.left.slice(0, tdiv1.style.left.indexOf("p"));
				if (myIndex < tbarIndex && parseInt(trueLeft) < parseInt(pure1)) {
					myIndex++;
					pure2 -= 54;
					tdiv2.style.left = pure2.toString() + "px";
					pure1 -= 54;
					tdiv1.style.left = pure1.toString() + "px";
					pureBtn -= 54;
					tbtn.style.left = pureBtn.toString() + "px";

				}
			}, 150);
			tbtn.addEventListener("click", function() {
				if (addedwindow.style.display == "none") {
					addedwindow.style.display = "initial";
					topZIndex++;
					addedwindow.style.zIndex = topZIndex;
					tbtn.style.backgroundColor = tbarColor;

				} else {
					addedwindow.style.display = "none";
					tbtn.style.backgroundColor = "#3c3c3d";
				}
			})
			return [tdiv1, tbtn, tdiv2];
		}
		function removeTaskbarItem(returnedArray) {
			indexLeft = returnedArray[0].style.left
			for (i = 0; i < returnedArray.length; i++) {
				returnedArray[i].remove();
			};
			numWins--;
			tbarIndex++;

		};

		/* set pre-icon creation variables for later use.
		* numApps tells the bookmark how many apps there are (used for auto positioning)
		* floatLeft is used to set the offset left of each app, which is also for auto positioning
		* the apps array is an array of all app icons and is used for a patch to a specific bug i was having
		* I still suck at node...

 
	//IMPORTANTTTTvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
	* note to new devs: createNewItem(name, appstoreid, "appcodehere", iconurl or base64thing)
	thx paragram -x
 *example: 
* createNewItem(`NotePad`, `NotePad`, `let ide = openWindow(450, 300, 'NotePad', true, Injector.serverURL + "/notepad.png"); ide.innerHTML = 'notepad doesnt save your work'; ide.contentEditable = true;`, Injector.serverURL + "/notepad.png");
		*/
		let numApps = 0;
		let floatLeft = 30;
		let appsArray = [];
		let hoverColor = "0, 255, 255";
		let hoverOutlineColor = "cyan";
		let nameColor = "white";
		let nameBg = "transparent";
		// new object on desktop function
		function createNewItem(name, id, execcode, iconImg) {
			let autoclear = null;
			let color = "transparent";
			let onStatus = false;
			let icon = newElement("app", background, id);
			let nameInd = newElement("appName", icon, "appText");
			appsArray.push(icon);
			nameInd.textContent = name;
			nameInd.style.textAlign = "center";
			nameInd.style.width = "75px"; 
			setInterval(function() {
				nameInd.style.backgroundColor = nameBg;
				nameInd.style.color = nameColor;
			}, 500);
			// spacing fix for icons
			numApps++;


			if (numApps >= [backgroundImage.clientHeight - 50] / 120 && backgroundImage.clientHeight !== 617) {

				numApps = 1;
				floatLeft += 130;
				// the following else if statement is because of a bug i dont understand and i am too lazy to fix naturally lol
			} else if (numApps >= [backgroundImage.clientHeight - 50] / 141.75 + 1) {
				numApps = 1;
				floatLeft += 130;
			}
			let gamer = numApps * 50
			for (i = 0; i < numApps; i++) {
				gamer += 50;
			};
			icon.style.top = [gamer - 50].toString() + "px";
			icon.style.backgroundColor = color;
			icon.style.backgroundImage = "url(" + iconImg + ")";
			icon.style.backgroundSize = "90%";
			icon.style.backgroundPosition = "4px 4px";
			icon.style.backgroundRepeat = "no-repeat";
			icon.style.borderWidth = "0px";
			icon.style.borderRadius = "4px";
			icon.style.marginLeft = floatLeft.toString() + "px";

			icon.addEventListener("click", function() {
				for (i = 0; i < appsArray.length; i++) {
					if (appsArray[i].style.borderWidth !== "0px" && appsArray[i] !== icon) {
						appsArray[i].style.borderWidth = "0px";
						appsArray[i].style.backgroundColor = color;
						appsArray[i].style.marginLeft = [parseCSSInteger(appsArray[i].style.marginLeft) + 2].toString() + "px";
						appsArray[i].style.marginTop = [parseCSSInteger(appsArray[i].style.marginTop) - 4].toString() + "px";
						appsArray[i].style.top = [parseCSSInteger(appsArray[i].style.top) + 15].toString() + 'px';
					}

				}
				if (icon.style.borderWidth === "0px") {
					icon.style.borderColor = hoverOutlineColor;
					icon.style.borderWidth = "2px";
					icon.style.borderStyle = "solid";
					icon.style.backgroundColor = "rgba(" + hoverColor + ", 0.25)";
					// what the f*** is the point of outlines if they do the exact same sh*t as borders?? They both suck donkey c*ck
					icon.style.marginLeft = [parseCSSInteger(icon.style.marginLeft) - 2].toString() + "px";
					icon.style.marginTop = [parseCSSInteger(icon.style.marginTop) + 4].toString() + "px";
					icon.style.top = [parseCSSInteger(icon.style.top) - 15].toString() + 'px';
					if (autoclear === null) {

						autoclear = setTimeout(function() {
							if (icon.style.borderWidth !== "0px") {
								icon.style.borderWidth = "0px";
								icon.style.backgroundColor = color;
								icon.style.marginLeft = [parseCSSInteger(icon.style.marginLeft) + 2].toString() + "px";
								icon.style.marginTop = [parseCSSInteger(icon.style.marginTop) - 4].toString() + "px";
								icon.style.top = [parseCSSInteger(icon.style.top) + 15].toString() + 'px';
							}
							autoclear = null;
						}, 3000)
					} else {
						clearTimeout(autoclear);
						autoclear = setTimeout(function() {
							if (icon.style.borderWidth !== "0px") {
								icon.style.borderWidth = "0px";
								icon.style.backgroundColor = color;
								icon.style.marginLeft = [parseCSSInteger(icon.style.marginLeft) + 2].toString() + "px";
								icon.style.marginTop = [parseCSSInteger(icon.style.marginTop) - 4].toString() + "px";
								icon.style.top = [parseCSSInteger(icon.style.top) + 15].toString() + 'px';
							}
						}, 3000)
					};
				} else {
					onStatus = false;
					eval(execcode)
					icon.style.borderWidth = "0px";
					icon.style.backgroundColor = color;
					icon.style.marginLeft = [parseCSSInteger(icon.style.marginLeft) + 2].toString() + "px";
					icon.style.marginTop = [parseCSSInteger(icon.style.marginTop) - 4].toString() + "px";
					icon.style.top = [parseCSSInteger(icon.style.top) + 15].toString() + 'px';
				}

			})



		}
		// create a new window function. this is vital code to the bookmark, modifying should be done with care to make sure i dont fuck the entire bookmark
		var windowsOpen = [];
		var windowParent = background;
		let windowBorderClr = "transparent";
		function changeWindowParents(newParent) {
			for (nmi = 0; nmi < windowParent.children.length; nmi++) {
				if (windowParent.children[nmi].id == "GenericWindow") {
					windowParent.children[nmi].remove();
				}
			}
			console.log("All windows closed, switching parent...", "Injector")
			windowParent = newParent;
		}
		function openWindow(width, height, windowTitle, resizable, tbarIcon, onClose, autoclose, notaskbar,winId) {
			if (notaskbar !== true) {
				notaskbar == false;
			}
			if (winId === undefined) {
					winId = "genericWindow";
				}
			
			// make the window
			let newWindow = newElement("windowHeading", windowParent, winId);
			windowsOpen.push(newWindow);
			console.log("Opened window with title " + windowTitle, "Injector");
    
			newWindow.style.opacity = "0";
			makeElementDraggable(newWindow)
			newWindow.style.width = width - 5 + "px";
			newWindow.style.paddingLeft = "5px";
			newWindow.textContent = windowTitle;
			topZIndex++;
			newWindow.style.zIndex = topZIndex;
			newWindow.style.boxShadow = 'px 5px 5px lightgray'


			
			try {
				newWindow.style.backgroundImage = colorInUse;
			} catch (err) {
				alert(err);
			};
			
			let taskItem = newTaskbarItem(tbarIcon, newWindow)
			numWins++;
			if (notaskbar) {
				removeTaskbarItem(taskItem);
			}
			
			//create close button
			let closeBtn = newElement("CircBtn", newWindow, "CloseBtn");
			closeBtn.innerHTML = "X";
			closeBtn.style.paddingRight = "5px";
			closeBtn.style.borderTopRightRadius = '5px';

			//create fullscreen button
			 let fullBtn = newElement("CircBtn", newWindow, "fullBtn");
			 fullBtn.innerHTML = "□";
			 fullBtn.style.right = "48px";
			 fullBtn.style.paddingRight = '2px';

			//noDragGlitch(closeBtn);

      //automatically close window to fix console spam bug
			let minBtn = newElement('CircBtn',newWindow,'minBtn');
			minBtn.innerHTML = '_';
			minBtn.style.marginRight = '93px';
			minBtn.style.paddingRight = '2px';
			
			
			if (autoclose) {
				setTimeout(() => {
					if (onClose !== undefined) {
						eval(onClose);
					}
					windowContent.id = "removed";
					newWindow.remove();
					prot = false;
					removeTaskbarItem(taskItem);
					console.log("Removed window with title " + windowTitle, "Injector");
				}, 100);
			}

			closeBtn.addEventListener("click", function() {
				if (onClose !== undefined) {
					eval(onClose);
				}
				windowContent.id = "removed";
				newWindow.remove();
				prot = false;
				removeTaskbarItem(taskItem);
				console.log("Removed window with title " + windowTitle, "Injector");
			});
minBtn.addEventListener("click", function() {
	newWindow.style.display = "none"; 
	//taskItem.style.backgroundColor = "#3c3c3d";
	//alert(taskItem.children());
});
fullBtn.addEventListener("click", function() {
//	newWindow.style.width = '800px';
	alert('wip');
	
	newWindow.style.height = "100%";
	newWindow.style.bottom = '0px';
	newWindow.style.right = '0px';
});
			
			
//fullscreen

			let isfull = false;
// 			fullBtn.addEventListener("click", function() {
// 				function toggleFullScreen() {
// 					alert('work in progress');
// 					newWindow.classList.toggle('fullScreen');
					
//   /*if (!document.fullscreenElement) {
		
//     document.documentElement.requestFullscreen();
//   } else if (document.exitFullscreen) {
//     document.exitFullscreen();
//   }*/
// }
//     toggleFullScreen();
  
// 			// 	if (isfull) {
// 			// 		isfull = false;
// 			// 		newWindow.style.width = '100%';
//    // //     	newWindow.style.height = '100%';
// 			// 	} else {
// 			// 		newWindow.style.width = width - 5 + "px";
// 			// 		isfull = true;
// 			// 	}
// 			});


			setInterval(function() {
				newWindow.style.width = (parseInt(windowContent.style.width.slice(0, windowContent.style.width.length - 2)) - 5).toString() + "px";
			}, 20)

			//create window content box
			let windowContent = newElement("NewWindowContent", newWindow, "WindowCont");
			windowContent.style.width = (parseInt(newWindow.style.width.slice(0, newWindow.style.width.length - 2)) + 7) + "px";
			windowContent.style.height = height + "px";

			//rounded corners
			 newWindow.style.borderTopRightRadius = '5px';
			 newWindow.style.borderTopLeftRadius = '5px';
			 windowContent.style.borderBottomRightRadius = '5px';
			 windowContent.style.borderBottomLeftRadius = '5px';


			// make so window cannot be dragged while hovering over content. this prevents annoying glitches
			//noDragGlitch(windowContent);

			// debugger shows resizable values upon app clicks and launches: alert(resizable);
			//resizability
			if (resizable == "on") {
				windowContent.style.resize = "both";
        windowContent.style.overflow = "hidden";
				console.log(windowContent.style.resize);
				setTimeout(function() {
					windowContent.style.transitionDuration = "0s";
					newWindow.style.transitionDuration = "0s";
				}, 125)
			}
			newWindow.style.top = "125px";

			// make fadein effect
			setTimeout(function() {
				newWindow.style.opacity = "1";


				//make so drag isn't affected by the fade in transition
				setTimeout(function() {
					newWindow.style.transitionDuration = "0s";
				}, 199)
			}, 1);
			let gameburger = false;
			return windowContent;
		}

		var colorInUse = null;
		function changeWindowColors(newColor) {
			colorInUse = newColor;
			for (i = 0; i < windowsOpen.length; i++) {
				try {
					windowsOpen[i].style.backgroundImage = newColor
				} catch (err) {
					console.log("Window #" + i.toString() + " does not exist, or an error occured trying to change the color. Ignore this error!", "Inject0r")
				}
			}
		};

		// better error function
		function error(errorContent) {
			let error = openWindow(400, 200, "Error", resizable = "off");
			error.innerHTML = `
  <h1> An error has occured!</h1>
  <p>report this in a github issue: </p>
  <p>` + errorContent.toString() + "</p>";
			console.log("Made visible error with content '" + errorContent + "'", "Injector");
		}
    		
		// function declarations for apps

		/*function checkwindowsopen() {
			 console.log("Windows: " + windowsOpen);
		}
		setInterval(checkwindowsopen, 5000);*/
	
		function savenotepad(){
			localStorage.setItem("notepadstorage", ide.innerHTML);
			alert("Saved notepad!");
		}
		function winprompt(question, callback) {
			let cont = prompt(question);
			if (cont == undefined || cont == null || cont == ''){
			let promptWin = openWindow(300, 225, 'Prompt', false, 'https://wiki.teamfortress.com/w/images/thumb/7/77/Golden_Wrench_IMG.png/250px-Golden_Wrench_IMG.png',function () {},false,true,'promptWin'); // lol tf2 wiki
			let inputText = newElement('input', promptWin, "autoObj");
			inputText.style.position = 'absolute';
			inputText.style.width = '50%';
			inputText.style.height = '10%';
			inputText.style.backgroundColor = '';
			inputText.style.left = '25%';
			inputText.style.top = '50%';
			let Prompt = newElement('genericBapBox', promptWin, "autoObj");
			Prompt.style.position = 'absolute';
			Prompt.style.width = '100%';
			Prompt.style.height = '30%';
			Prompt.style.backgroundColor = 'lightgray';
			Prompt.innerText= question;
			Prompt.style.top = '10px';

			inputText.addEventListener("keydown", function(e){
				if(e.key === "Enter"){
					// windowContent = document.promptWin.querySelector('#WindowCont');
					// newWindow = document.promptWin.querySelector('#genericWindow');
					// windowContent.id = "removed";
					// newWindow.remove();
					// removeTaskbarItem(taskItem);
					let val =  inputText.value;
					promptWin.remove();
					document.getElementById('promptWin').remove();
					console.log("Removed prompt window");
					callback(val);
					return val;
				}
			})}
			else {
				callback(cont);
				return cont;
			}
			
		}
		
		function advertise() {
			
			if (Injector.clientconfig.advertisement.enabled) {
				let ad = openWindow(500, 300, Injector.clientconfig.advertisement.title, resizable = "off", Injector.user.icons.Logo);
				ad.innerHTML = Injector.clientconfig.advertisement.body; // paragram why did you hardcode the ad
			}
		}
		//changelog
		function app1() {
			let chlog = openWindow(500, 300, "Changelog", resizable = "on", Injector.user.icons.Logo);
			chlog.innerHTML = `<h1>Changelog - Injector v` + Injector.info.version + `</h1>\n`+ Injector.info.changelog;
			chlog.style.overflow = 'auto';
		}
		
		// exploit hub
		function app2() {
			let exhub = openWindow(450, 350, "Exploit Hub", resizable = "on", Injector.user.icons.ExpHub)
			exhub.style.backgroundColor = "#454545";
			let numBtn = 0;
			exhub.innerHTML = `
  <gamingheader id="topdog"></gamingheader>
  <seperator id="seperator"></seperator>
	<div id="buttonlist" class="expButtonList">
	  <bruh class="expButton" id="stoopybtn">History Flooder</bruh>
	  <bruh class="expButton" id="editbtn">Edit Page</bruh>
	  <bruh class="expButton" id="tabname">Change Tabname</bruh>
	  <bruh class="expButton" id="gdrivecloak">Drive Cloak</bruh>
	 	<bruh class="expButton" id="gclasscloak">Classroom Cloak</bruh>
		<bruh class="expButton" id="antiexten" 0>Anti-Extension</bruh>
		<bruh class="expButton" id="testings" 0>size test</bruh> 
		
  </div>
	<style id="expstyle"> </style>
  <text1 id="headerTxt"></text1>
  <text2 id="descTxt"></text2>`
			//main
			let floodBtn = document.getElementById("stoopybtn");
			let header = document.getElementById("topdog");
			let expstyle = document.getElementById("expstyle");
			//exploits
			//buttonlist is the container for buttons
			let buttonlist = document.querySelector("#buttonlist");
			let editBtn = document.getElementById("editbtn");
			let seperator = document.getElementById("seperator");
			let headerText = document.getElementById("headerTxt");
			let descText = document.getElementById("descTxt");
			let tabBtn = document.getElementById("tabname");
			let noExtension = document.getElementById("antiexten");
			let driveCloak = document.querySelector("#gdrivecloak");
			let sizetest = document.querySelector("#testings");
			let gclassCloak = document.querySelector("#gclasscloak");
			// lets me create more buttons later on without cancer cause im lazy
			buttonCSS(floodBtn, headerText, descText, "Floods your history with the page you are currently visiting. Keep in mind they can still scroll down far enough, so reliance on this is discouraged.");
			buttonCSS(editBtn, headerText, descText, "Allows you to edit the page you're currently visiting. You cannot edit the contents of Injector. After editing the page, disabling this will lock in your changes to the page. Keep in mind this is only for you, and refreshing will revert these changes.");
			buttonCSS(tabBtn, headerText, descText, "Changes the current name of the tab you're on. Can be used to trick teachers (make game sites look like Google Classroom, ect). If you dont set anything than it defaults to Google Drive, your welcome ;)");
			buttonCSS(driveCloak, headerText, descText, "Cloaks the tab as Google Drive. Similar use of the Change Tab Name exploit, but more convincing as it changes the icon.");
			buttonCSS(noExtension, headerText, descText, "Go to the Chrome Web Store, and activate this bookmark. It will disable the extension you enter in, its like manually turning it off in settings.");
			buttonCSS(sizetest, headerText, descText, "this is a size test that does nothing \n Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean dictum fermentum elit, eu fermentum neque posuere ac. Praesent pretium odio sed odio laoreet imperdiet. Nunc interdum bibendum lobortis. Vivamus quam diam, tincidunt id dignissim vel, imperdiet sed elit. Etiam facilisis purus non turpis commodo pellentesque. Mauris posuere egestas varius. Donec nisi nunc, luctus eget semper ac, ultricies sit amet arcu.");
			buttonCSS(gclassCloak, headerText, descText, "Cloaks the tab as Google Classroom. Similar use of the Change Tab Name exploit, but more convincing as it changes the icon.");

			//trying to make buttons scroll...
			//buttonlist.style.overflow = "scroll";
			//buttonlist.height = '330px';

      // COLORS
      var green = "#25cc00";
      var blue = "#1c59ff";
      
			//style
			expstyle.innerHTML = `
	 			.expButton {
		 			width = 42%;
					padding = 2px;
		 			position = absolute;
				}
				#buttonlist {
					position: absolute;
					bottom: 0px;
					left: 0px;
					width: 50%;
					height: calc(100% - 50px);
					border-color: gray;
					border-style: none solid none none;
					overflow: hidden auto;
				}

			
			`
			//position: absolute; bottom: 0px; left: 0px; width: 150px; height: calc(100% - 50px); border-color: gray; border-style: none solid none none; overflow: hidden auto; --darkreader-inline-border-top:#545b5e; --darkreader-inline-border-right:#545b5e; --darkreader-inline-border-bottom:#545b5e; --darkreader-inline-border-left:#545b5e;
			
			floodBtn.style.top = "10px";
			editBtn.style.top = "60px";
			tabBtn.style.top = "110px";
			driveCloak.style.top = "160px";
			gclassCloak.style.top = "210px";
			noExtension.style.top = "260px";
			sizetest.style.top = "310px";

			//floodBtn.style.grid-column = 1;
			//editBtn.style.grid-column = 2;
			//tabBtn.style.grid-column = 3;
			//driveCloak.style.grid-column = 4;
			//noExtension.style.grid-column = 5;
			//sizetest.style.grid-column = 6;
			
			// make the header bar
			header.style.position = "absolute";
			header.style.width = "100%";
			header.style.height = "50px";
			header.style.backgroundColor = "#2a4dad";
			header.style.color = "white";
			header.textContent = "Exploit Hub v1.1";
			header.style.top = "0px";
			header.style.marginTop = "0px";
			header.style.userSelect = "none";
			header.style.fontSize = "35px";
			header.style.textAlign = "center";
			header.style.lineHeight = "50px";

			//make text-description seperator
			//
			seperator.style.position = "absolute";
			seperator.style.width = "2px";
			//test
			seperator.style.height = "calc(100% - 50px)"
//			seperator.style.height = "100%"
			seperator.style.top = "50px";
			seperator.style.bottom = '0px';
			seperator.style.backgroundColor = "white";
			seperator.style.left = "46.25%";

			// text boxes
			headerText.style.position = "absolute";
			headerText.style.right = "0px";
			headerText.style.top = "50px";
			headerText.style.width = "45%"
			headerText.style.height = "50px";
			headerText.style.color = "white";
			headerText.style.fontFamily = "Helvetica";
			headerText.style.fontSize = "25px";
			headerText.style.textAlign = "center";
			headerText.style.lineHeight = "50px";
			headerText.textContent = "Welcome!"
			descText.style.position = "absolute";
			descText.style.right = "2px";
			descText.style.top = "100px";
			descText.style.width = "45%"
			descText.style.height = "calc(100% - 50px)";
			descText.style.color = "white";
			descText.style.fontFamily = "Helvetica";
			descText.style.fontSize = "15px";
			descText.style.lineHeight = "19px";
			descText.textContent = "Hover over a button to see what it does!"
			let driveCloakEnabled = false;
			let ico = null;
			let link = null;
			driveCloak.addEventListener("click", function() {
				if (!driveCloakEnabled) {
					driveCloakEnabled = true;
					link = document.querySelector("link[rel~='icon']");
					if (!link) {
						link = document.createElement('link');
						link.rel = 'icon';
						document.getElementsByTagName('head')[0].appendChild(link);
						ico = ""
					}
					link.href = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Google_Drive_icon_%282020%29.svg/1147px-Google_Drive_icon_%282020%29.svg.png';
					document.title = "My Drive - Google Drive"
					driveCloak.classList.add('enabled');
				} else {
					driveCloakEnabled = false;
					driveCloak.classList.remove('enabled');
					link.href = ico;
				}
			})
			
			gclassCloak.addEventListener("click", function() {
				// function gcloak() {
					var link = document.querySelector("link[rel*='icon']") || document.createElement('link');link.type = 'image/x-icon';link.rel = 'shortcut icon';link.href = 'https://ssl.gstatic.com/classroom/favicon.png';document.title = 'Classes';console.log(document.title);document.getElementsByTagName('head')[0].appendChild(link) 
				// };gcloak();setInterval(gcloak, 1000);
			})
			let floodEnabled = false;
			let editEnabled = false;
			let count = 0;
			floodBtn.addEventListener("click", function() {
				if (!floodEnabled) {
					floodEnabled = true;
					var t = "/";
					o = "f_";
					var permCount = 0;


					var flooder = setInterval(function() {
						floodBtn.style.backgroundColor = green;
						if (floodEnabled) {
							if (permCount > 45) {
								history.pushState(0, 0, "/")
								t = "/";
								o = "f_";
								permCount = 0;
							}
							history.pushState(0, 0, t += o.toString() + count.toString());

							count++;
							permCount++;
						} else {
							clearInterval(flooder);
							floodBtn.style.backgroundColor = blue;
						}
					}, 35);

				} else {
					floodEnabled = false;
					history.pushState(0, 0, "/")
					floodBtn.style.backgroundColor = "#1c59ff";
				};
			})
			editBtn.addEventListener("click", function() {
				if (!editEnabled) {
					//green?
					editBtn.style.backgroundColor = "#25cc00"

					document.body.contentEditable = true;
					background.contentEditable = false;
					backgroundImage.contentEditable = false;
					editEnabled = true;
					editUsed = true;
				} else {
					document.body.contentEditable = false;
					editBtn.style.backgroundColor = "#0031b5";
					editEnabled = false;
					editUsed = false;
				}

			})
			//only works in the bookmarklet :( 
			//fun fact, it works on any page on the chrome.google.com domain, so webstorex works, but so does webstoree or webstoreyay
// 			 noExtension.addEventListener("click", function(){
// 	if (window.location.href.indexOf("https://chrome.google.com/webstore") > -1){
// 						if (confirm("you must be on the chrome extension store page, click ok to redirect to page, or cancel to cancel")) {
// 						alert("Relaunch inject0r once page has loaded and click the Anti-Extension button again :)")
// 							window.location.replace("https://chrome.google.com/webstore-injredirect")
// 						} else {
// 							alert("Canceled :(")
// 						}
// 				 } else {
// 				 prompt('Extension IDs here: (seperated by commas for m nultiple)').split(',').forEach(i => {
//     chrome.management.setEnabled(i, !1)
// })}
// 			 });

     noExtension.addEventListener("click", function() {
        var win = window.location.href;
        var check = win.startsWith("https://chrome.google.com/webstore");
        alert(win);
        if (check) {
            prompt('Extension IDs here: (seperated by commas for multiple)').split(',').forEach(i => {
            	chrome.management.setEnabled(i, !1)
            })
        }
        else if (!(check)) {
            alert("Wrong Page redirecting, once redirected relaunch Inject0r and re-click Anti Extension.")
            window.location.replace("https://chrome.google.com/webstoreinject");
        }
      });

			tabBtn.addEventListener("click", function() {
				/*var user_input = prompt("Type new tab name");
				if (document.title = 'null') {
					link = document.querySelector("link[rel~='icon']");
					if (!link) {
						link = document.createElement('link');
						link.rel = 'icon';
						document.getElementsByTagName('head')[0].appendChild(link);
						ico = ""
					}
					link.href = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Google_Drive_icon_%282020%29.svg/1147px-Google_Drive_icon_%282020%29.svg.png';
					document.title = user_input;
				}*/

				var link = document.querySelector("link[rel*='icon']") || document.createElement('link');link.type = 'image/x-icon';link.rel = 'shortcut icon';link.href = prompt('URL for icon?','https://ssl.gstatic.com/classroom/favicon.png');document.title = prompt('Title?','Classes');console.log(document.title);document.getElementsByTagName('head')[0].appendChild(link)
				
			});
		};

		// chat things, don't mess with this
		let pseudoInput = null;
		//chatroom

		function chatapp() {
			//setting settings and variables
			let latestMsgs = [];
			let chatSettings = {
				spamLength: 5
			}
			let chatBlacklist = ['nigga','nigge','gay ass','dick','penis','blacklistTest','blacklist Test'];
			function inBlacklist(item) {
				item = item.toLowerCase();
				for (i=0;i<chatBlacklist.length;i++) {
					if (item.includes(chatBlacklist[i].toLowerCase())) {
						console.log(`phrase '${item}' blocked because it includes '${chatBlacklist[i]}'`);
						return true;
					}
				}
				return false;
			}
			async function sendDM(user, content) {
				let req = await fetch(`${Injector.serverURL}/chat2`, {
					method: 'POST',
					headers: {
						'token': Injector.user.token,
						'user2': user,
						'dm': "jdimas"
					},
					body: content
				})
				return await req.text();
			}
			async function makeDMFetch(user) {
				let req = await fetch(`${Injector.serverURL}/chat2`, {
					method: 'GET',
					headers: {
						'token': Injector.user.token,
						'user2': user,
						'dm': "jdimas"
					},
				})
				return await req.text();
			}
			let recentMsgOwner = null;
			let autoWin = openWindow(750, 350, 'Chatbox', resizable = "off", Injector.user.icons.Chat);
			autoWin.style.backgroundColor = 'white';
			let timeExistings = [];
			let currentChannel = "#general"
			let currentDM = null;
			let type = "channel" // tells it if its a dm or channel
			// bap defines all elements in single zone :(
			let headerOutline = newElement('genericBapBox', autoWin, "autoObj");
			headerOutline.style.position = 'absolute';
			headerOutline.style.width = '100%';
			headerOutline.style.height = '50px';
			headerOutline.style.backgroundColor = '#23272A';
			headerOutline.style.left = '0px';
			headerOutline.style.top = '0px';
			let namebox = newElement('genericBapBox', headerOutline, "autoObj");
			namebox.style.position = 'absolute';
			namebox.style.width = '150px';
			namebox.style.height = '48px';
			namebox.style.backgroundColor = '#2c2ff3';
			namebox.style.left = '0px';
			namebox.style.top = '0px';
			namebox.textContent = "Chatbox";
			namebox.style.userSelect = "none";
			namebox.style.lineHeight = "48px";
			namebox.style.color = "white";
			namebox.style.fontWeight = "bold";
			namebox.style.fontSize = "30px";
			namebox.style.textAlign = "center";
			namebox.style.textShadow = "1px 1px #000000";
			let channelBox = newElement('genericBapBox', autoWin, "autoObj");
			channelBox.style.position = 'absolute';
			channelBox.style.width = '151px';
			channelBox.style.height = 'calc(100% - 215px)';
			channelBox.style.backgroundColor = 'navy';
			channelBox.style.left = '0px';
			channelBox.style.top = '50px';
			channelBox.style.overflowY = "scroll";
			let dmSect = newElement('genericBapBox', autoWin, "autoObj");
			dmSect.position = "absolute";
			dmSect.style.width = "151px";
			dmSect.style.height = "145px";
			dmSect.style.top = '205px';
			dmSect.style.left = '0px';
			dmSect.style.overflowY = 'scroll';
			dmSect.style.backgroundColor = 'DimGray';
			let userSearchBar = newElement('input', autoWin, "usearch");
			userSearchBar.style.position = "absolute";
			userSearchBar.style.width = "146px";
			userSearchBar.style.height = "18px";
			userSearchBar.style.bottom = "141px";
			userSearchBar.style.left = "0px";
			userSearchBar.style.backgroundColor = "black";
			userSearchBar.style.fontFamily = "Helvetica";
			userSearchBar.style.color = "white";
			userSearchBar.placeholder = "Search users to DM...";
			userSearchBar.style.borderStyle = "none none solid none";
			userSearchBar.style.borderColor = "white";
			userSearchBar.style.zIndex = "999999999999999999999999";

			userSearchBar.addEventListener("keydown", function() {
				console.log("HI!!!");
				setTimeout(function() {
					while (dmSect.firstChild) {
						dmSect.firstChild.remove();
						numDMsFloat = 0;
					}

					for (i = 0; i <= namesObject.length; i++) {

						if (namesObject[i].toLowerCase().includes(userSearchBar.value.toLowerCase())) {
							newDM(namesObject[i]);
						}
					}

				}, 1);
			})


			let subHeader = newElement('genericBapBox', headerOutline, "autoObj");
			subHeader.style.position = 'absolute';
			subHeader.style.width = 'calc(100% - 150px)';
			subHeader.style.height = '48px';
			subHeader.style.backgroundColor = '#2c2f33';
			subHeader.style.left = '150px';
			subHeader.style.top = '0px';
			subHeader.style.textAlign = "right";
			subHeader.style.fontSize = "25px";
			subHeader.style.fontWeight = "bold";
			subHeader.style.lineHeight = "48px";
			subHeader.style.color = "white";
			subHeader.textContent = "Users On Chatbox:"
			subHeader.style.userSelect = "none";
			let userList = newElement('genericBapBox', autoWin, "autoObj");
			userList.style.position = 'absolute';
			userList.style.width = '150px';
			userList.style.height = 'calc(100% - 50px)';
			userList.style.backgroundColor = '#23272a';
			userList.style.left = 'calc(100% - 150px)';
			userList.style.top = '50px';
			let chatBox = newElement('genericBapBox', autoWin, "autoObj");
			chatBox.style.position = 'absolute';
			chatBox.style.width = 'calc(100% - 300px)';
			chatBox.style.height = 'calc(100% - 50px)';
			chatBox.style.backgroundColor = '#1f1f1f';
			chatBox.style.left = '150px';
			chatBox.style.top = '50px';
			let channelName = newElement('genericBapBox', subHeader, "autoObj");
			channelName.style.position = 'absolute';
			channelName.style.width = '300px';
			channelName.style.height = '35px';
			channelName.style.backgroundColor = 'DimGray';
			channelName.style.left = '5px';
			channelName.style.top = '5px';
			channelName.style.lineHeight = "35px";
			channelName.style.fontSize = "30px";
			channelName.style.color = "#23272A";
			channelName.style.fontWeight = "bold";
			channelName.textContent = currentChannel;
			channelName.style.paddingLeft = "5px";
			channelName.style.userSelect = "none";
			channelName.style.textAlign = "left";
			let messageInput = newElement('genericBapBox', chatBox, "autoObj");
			messageInput.style.position = 'absolute';
			messageInput.style.width = '95%';
			messageInput.style.height = '40px';
			messageInput.style.backgroundColor = '#242424';
			messageInput.style.left = '2.5%';
			messageInput.style.top = 'calc(100% - 50px)';
			messageInput.style.borderWidth = '1px';
			messageInput.style.borderColor = 'white';
			messageInput.style.borderStyle = 'solid';
			messageInput.style.borderRadius = '3px';
			let messageOutput = newElement('genericBapBox', chatBox, "autoObj");
			messageOutput.style.position = 'absolute';
			messageOutput.style.width = '100%';
			messageOutput.style.height = 'calc(100% - 60px)';
			messageOutput.style.backgroundColor = '#242424';
			messageOutput.style.left = '0px';
			messageOutput.style.top = '0px';
			messageOutput.style.overflowY = "auto";
			messageOutput.style.overflowX = "hidden";

			let realMsgInput = newElement('input', messageInput, "autoObj");
			realMsgInput.style.position = 'absolute';
			realMsgInput.style.width = 'calc(100% - 11px)';
			realMsgInput.style.height = 'calc(100% - 10px)';
			realMsgInput.style.backgroundColor = 'transparent';
			realMsgInput.style.color = "white";
			realMsgInput.style.borderWidth = "0px";
			realMsgInput.style.left = '2.5px';
			realMsgInput.style.top = '2.5px';
			let numMessagesFloat = -1;
			let numChannelsFloat = 0;
			let numDMsFloat = 0;
			function newChannel(name, active) {
				let channel = newElement('channel', channelBox, "newChannel");
				channel.textContent = name;
				if (active) {
					channel.classList.add("selectedChannel");
				}
				channel.addEventListener("click", function() {
					type = "channel";
					currentDM = null;
					if (currentChannel !== name) {
						currentChannel = name;
						document.querySelector(".selectedChannel").classList.remove("selectedChannel");
						channel.classList.add("selectedChannel");
						channelName.textContent = currentChannel;
						while (messageOutput.firstChild) {
							messageOutput.firstChild.remove();
						}
						numMessagesFloat = -1;
						timeExistings = [];
						makeChatFetch();
					}
				})
				channel.style.top = numChannelsFloat.toString() + "px";
				numChannelsFloat += 47;
			}
			function fullDMFetch(name2, reset) {
				makeDMFetch(name2).then(response => {
					if (reset !== false) {
						while (messageOutput.firstChild)
							messageOutput.firstChild.remove();
					}
					let responseParsed = JSON.parse(response);
					for (i = 0; i < responseParsed.contentOfChat.length; i++) {
						let messageArray = responseParsed.contentOfChat[i];
						let maMsg = newMessage(messageArray[0], messageArray[1], messageArray[2]);
					}
				})
			}
			function newDM(name) {
				let dmBox = newElement('channel', dmSect, "newChannel");
				dmBox.textContent = name;

				dmBox.addEventListener("click", function() {
					realMsgInput.placeholder = "";
					type = "DM";
					if (currentDM !== name) {
						currentDM = name;

						document.querySelector(".selectedChannel").classList.remove("selectedChannel");
						dmBox.classList.add("selectedChannel");

						channelName.textContent = currentDM;
						while (messageOutput.firstChild) {
							messageOutput.firstChild.remove();
						}
						currentChannel = name;
						numMessagesFloat = -1;
						timeExistings = [];
						fullDMFetch(name);
					}
				})
				dmBox.style.top = numDMsFloat.toString() + "px";
				numDMsFloat += 47;
			}
			newChannel("announcements", false)
			newChannel("#general", true);
			newChannel("#requests", false);
			newChannel("#questions", false);
			newChannel("#fart-channel", false);

			function sendMessage(username,content,channel) {} // ...

			function newMessage(name, date, content, textColor) {
				if (!(timeExistings.includes(date))) {
					let message = newElement('chatMessage', messageOutput, "userMessage");
					messageOutput.scrollTop += 1932812742971294242914264128;
					message.style.top = numMessagesFloat.toString() + "px";
					message.textContent = name;
					message.style.textShadow = "1px 1px #000000";
					let timeIndicator = newElement('timeInd', message, "messageTimestamp");
					let joe = new Date(date).toString();
					joe = (joe.slice(0, (joe.length - 33)));
					if (parseInt(joe.slice(15, 18)) > 12) {
						let joe1 = joe.slice(0, 15);
						let joe2 = joe.slice(15, 18);
						let joe3 = joe.slice(18);
						joe2 = (parseInt(joe2) - 12).toString();
						joe = (joe1 + " " + joe2 + joe3 + " PM");
					} else {
						joe += " AM"
					};
					timeIndicator.textContent = joe;
					let messageContentField = newElement('messageContent', message, "messageCont");
					timeIndicator.style.overflowY = "hidden";
					messageContentField.textContent = content;
					message.style.height = messageContentField.offsetHeight + 28 + "px";
					numMessagesFloat += messageContentField.offsetHeight + 28;
					if (textColor !== undefined && textColor !== null) {
						messageContentField.style.color = textColor;
					}
					messageOutput.scrollTop += 919722398174248274129842;
					timeExistings.push(date);
					return [messageContentField, message];
				}
			}
			let onlinePaddingTop = 0;
			function newOnlineUser(name) {
				let userIndicator = newElement('userInd', userList, 'userStatusIndicator');
				userIndicator.textContent = name;
				userIndicator.style.top = onlinePaddingTop + "px";
				onlinePaddingTop += 47;
				userIndicator.style.overflowY = "hidden";
				return userIndicator;
			}
			function removeOnlineUser(returnedVal) {
				returnedVal.remove();
				onlinePaddingTop = 0;
				for (i = 0; i < userList.children.length; i++) {
					userList.children[i].style.top = onlinePaddingTop + "px";
					onlinePaddingTop += 47;
				}
			}
			let loadingLine = newOnlineUser("Loading...");

			let onClientArray = [loadingLine];
			function makeChatFetch() {
				let chatFetch = new XMLHttpRequest;
				chatFetch.open('GET', Injector.serverURL + '/chat2');
				chatFetch.setRequestHeader('token', Injector.user.token);
				chatFetch.send();
				chatFetch.onreadystatechange = e => {
					if (chatFetch.readyState == 4) {
						try {
							let chatFileParsed = JSON.parse(chatFetch.responseText);
							if (chatFileParsed[currentChannel].important !== undefined) {
								realMsgInput.placeholder = "Important channel - cannot send [Permission Error 🤣]"
							} else {
								realMsgInput.placeholder = ""
							}
							for (i = 0; i < chatFileParsed[currentChannel].contentOfChat.length; i++) {
								let messageArray = chatFileParsed[currentChannel].contentOfChat[i];
								let maMsg = newMessage(messageArray[0], messageArray[1], messageArray[2]);
							}
						} catch (err) {
							console.error("Chat fetch failed; chat likely reset? Error: " + err);
						}
					}

				}
			}
			makeChatFetch();
			function statusUpdate() {
				let statusupdater = new XMLHttpRequest;
				statusupdater.open('POST', Injector.serverURL + '/chat2');
				statusupdater.setRequestHeader('token', Injector.user.token);
				statusupdater.send("fromStatusUpdate");
				statusupdater.onreadystatechange = e => {
					if (statusupdater.readyState == 4) {
						let users = JSON.parse(statusupdater.responseText);
						for (i = 0; i < onClientArray.length; i++) {
							onClientArray[i].remove();
						}
						onlinePaddingTop = 0;
						for (i = 0; i < users.length; i++) {
							let goomba = newOnlineUser(users[i][0]);
							onClientArray.push(goomba)
						}

					};
				}
			}
			statusUpdate();
			var statusUpdaterTimeout = setInterval(function() {
				if (autoWin.id !== "removed") {
					statusUpdate()
				};
			}, 30000);
			var chatLoopFetch = setInterval(function() {
				if (type == "channel") {
					makeChatFetch();
				} else {
					fullDMFetch(currentDM, false);
				}
			}, 750);
			realMsgInput.addEventListener("keydown", function(e) {
				if (e.key == "Enter") {
				
					if (type == "channel") {
						makeChatFetch();
						if (realMsgInput.value.length < 500 && realMsgInput.value.length > 0 && !latestMsgs.includes(realMsgInput.value) && !inBlacklist(realMsgInput.value)) {
							let chatsend = new XMLHttpRequest;
							chatsend.open('POST', Injector.serverURL + '/chat2');
							chatsend.setRequestHeader('channel', currentChannel);
							chatsend.setRequestHeader('token', Injector.user.token);
							chatsend.send(realMsgInput.value);
							if (latestMsgs.length >= chatSettings.spamLength){latestMsgs.shift();}
							latestMsgs.push(realMsgInput.value);
							sendMessage(Injector.user.username,realMsgInput.value,currentChannel);
							realMsgInput.value = "";
						} else {
							realMsgInput.style.color = "red";
							setTimeout(function() {
								realMsgInput.style.color = "white";
							}, 1000);
						}
					} else {
						if (realMsgInput.value.length < 500 && realMsgInput.value.length > 0) {
							sendDM(currentDM, realMsgInput.value);
							realMsgInput.value = "";
							fullDMFetch(currentDM, false);


						} else {
							realMsgInput.style.color = "red";
							setTimeout(function() {
								realMsgInput.style.color = "white";
							}, 1000);
						}
					}
				}
			})
			style.textContent += loadTXT('/css/chatapp.css')

		}


		// prox browser

		function app4(){
			let proxybrowser = openWindow(1000, 500, "ProxBrowser", resizable = "on", Injector.user.icons.ProxB)
			let browserwindow = newElement("iframe", proxybrowser, "proxyBrowser");
			browserwindow.src = "https://prox-switcher.inject0r.repl.co";
			browserwindow.style.position = "absolute";
			browserwindow.style.width = "100%";
			browserwindow.style.height = "100%";
			browserwindow.style.bottom = "0px";
			browserwindow.style.borderWidth = "0px";
			browserwindow.style.margin = "0px";
		}
		/*
		function app4(){
			let proxybrowser = openWindow(450, 350, "ProxBrowser", true, Injector.serverURL + "/proxbrowser.png)
			alert("Currently being fixed as it doesnt work on some browsers yet.")
			var proxyTypes = ["Womginx", "Alloy"];
			var proxyUrls = ["https://womginx.alexandermayer1.repl.co/main/", "https://krono-alloy-proxy.herokuapp.com/session/?url="];
			let urlbar = newElement("input", proxybrowser, "urlbar");
			let proxyPicker = newElement("select", proxybrowser, "proxypicker");
			let fullScreenBtn = newElement("FSButton", proxybrowser, "fsbtn");
			let browserwindow = newElement("iframe", proxybrowser, "proxyBrowser")
			browserwindow.onload = function(){
				console.log("browser loaded! SRC: " + browserwindow.src)
				if(browserwindow.src.includes("https://krono-alloy-proxy.herokuapp.com/session/?url=eW91dHViZS5jb20=")){
					if(browserwindow.src[63] == "/"){
						browserwindow.src = "https://krono-alloy-proxy.herokuapp.com/session/?url=eW91dHViZS5jb20=/" + btoa(browserwindow.src.slice(64, browserwindow.src.length));
					} else{
						console.log(browserwindow.src[63]);
					}
				}
			}
			proxyPicker.style.position = "absolute";
			proxyPicker.style.right = "40px";
			proxyPicker.style.width = "80px";
			proxyPicker.style.height = "29px";
			proxyPicker.style.backgroundColor = "#040042";
			proxyPicker.style.color = "white";
			fullScreenBtn.style.position = "absolute";
			fullScreenBtn.style.right = "0px";
			fullScreenBtn.style.width = "40px";
			fullScreenBtn.style.height = "27px";
			fullScreenBtn.style.backgroundColor = "#040042";
			fullScreenBtn.style.color = "white";
			fullScreenBtn.textContent = "FS";
			fullScreenBtn.style.userSelect = "none";
			fullScreenBtn.style.textAlign = "center";
			fullScreenBtn.style.lineHeight = "27px";
			fullScreenBtn.style.borderStyle = "none none solid none";
			fullScreenBtn.style.borderWidth = "2px";
			fullScreenBtn.style.borderColor = "white";
			fullScreenBtn.style.transitionDuration = "0.5s";
			//.̞͕͔͈̬͓̟̙̙͈̲̖̬̳̯̳̩̖̥̘͚͓̞͇̠͖͍̟̗̤̣͈̜̖̝̯̮̗̭͇̯͚͓͓̱̙̥̟̩̱̲͔̰͈͕̗̜̯̩͍̰̘̫̥̯̣̭̟̟̰̰͚͙̮̫̲̯̜̮͈̘͎̣̳̭̣͖̱̳͖̝̤̩̯͉̙͖͙̫̄̿̐̎̔̍̔̌̏͑̔̇́̾͐̓̆̓̍̑̉͐̌̂̾͊̽̄̇̈́͐̓͂̾̋̀̂̀̃̅̏̂͑̉͋̂͒̀̐̍̆̊͛̋͌̆́͊̀͑̎̀͗̉̓̄͆̄̂͗̐͐̀̔̋́̾́͐͑́̎͛͛̃̀͂́͑̐̌̒̃̓̂̔͂̐̽͛̏̚̚̚ͅͅͅ.̫̭̙̗̫̥̟̦͕̬̖̠̝̯͍̣̜̩̫͙̙̰̰̞̠̳̙̘̗͉͉͖͔̥̜͇̪͙͚̭̝̲͔̥͓̦̘̤͔̝̯͉͇͙͈͓̥̥̩̩̠̞̰̘̟̥̩͔̙͈̦̪̥͇͍̘͚̞̠̰͈̭͈͎̦̫͚͉͓͕̦͔͍̘͕̭͕̯̬͚̟̬̖͙̪̮͚͚͔̯̣͔̱̠̤͚̖̯̞͔͍̱͈͇̬͈̗̭̖̖̟̒̌̓̋̐̂̈́̅̔́͒͆̄̅̆̓͐̅̄̓̏̋͊͊̋͆̅̓̍̈̾̅̿͒͋͗̅͋̃̓̍̓͒̋̄́͛͗͛͛̉̓̆͐̏̈̓̔̇̃̑̔̂͋͋̀̈͋̌͛͊̉͊́̊̏͒͗̆̑͆̀͛̊̅̎̓́̇͌́̎̀̌́͆̔̒̆́́͋̀̆͑͐̓͌̓̃̑̍́͐͐̚̚̚̚̚ͅͅͅ.̰̥̙̝̯̪̥̩̘̙͈̭̥̳̲̤͎̝͇͔̣̫̥̰̯̭̫͎͔̯͍͖͎̥̣̘̝̲͓͔̖̳͇̗̲̙͕̞͎͍͎̮̳̘̰͕̥̯̫̤͉̰̙͎͉̦̫̞̟̯̳͚̤͔̘̙͕͓̖̭͎͍͖͎͍̜̮̦̜̩̬͙̝̜̲̗̮̽̾͛͂̏͒̾̆̃͐̀͗̽̈́̀͒̈͐͐̌̓̔̊̎́̂̔̔̀̽͂̉̾͒̒̀̔̀͂̉͋̔͒͋̿̽̊͋̊̂̒̆̿͂̾̎͛͊̐̍͋͌͌͐̓̋̎́͋̊̍̔͗͑̐́̓͋̿̃̋̉̈̉̑͐̌̈́̎͋̍̃̆̔̈͆͋̑́̎̑́͑̊̉̎́̏̉̊̑̎̿͒̑̋̚̚̚̚̚̚ͅͅͅ.̪̱̣̦͖͓̱̝̗̟̬͖͔̟̭͇̙͎̗̙̝̝̞̰͓̣̤̭̱̫͈̭͍͈̟͕̬͉͇̝̲̲̤̥̰̰̯̬̝͕͇̩̥̩̟̫͙̣̜͚̞͚̝͚̖̖̱̝̬̦͔̭͈͈̬̜̪͕̰̟͎̣͔̯̜̖͕̯̬̠͓͚͍͕̤̤͇͙̮͈̠̗̤̜̟̙͚̟̗̪̗͓̞̦̳̞̯̭̩͖͉̲̐̀͛̉̎̇̒̅̀͆͒̄͛̐̉̑̄̿̓̔̅̿̈́̀͆͛͊̉̐̈̀̂̐́͛͌̈́̾̈́͋̾̉̉̂͋̂̆̃̄́̆͆͒̎̑̆͐̾̒̄̈͗̽͋̇̉̀́̀̈̎͋͊̍́̄̆̃̈́̀̀̅͋̉̔͆̀̀̈́͌̉̓͂̓̀́̉̓̌̈́̏̏͒̓̀̉̏͛̃͂̑̇̇͆̑͌͐̉͋̎̄͊̍̐̊̓͛̃̿͋̀̉̑͆̐̒̃̉͌̚̚ͅͅͅͅͅͅͅ.̤̭͎̞̯̝̣͕̭̣͔̪̬͙͍̪̞̠̩̬͍̤͈̤̙̙̦̖̳̬͚̬͍͖̣͇̣͖̤̘͚͈͓̲̘͔͖͓̲̫̦͈̗̟̥̭̗̱̜͕͓̥͙̖̮͙̪͙̳̝̰̟͓̗̜͓̰͕͓͍̫̯͎̩͈̟̲͎̖̗̲͖̖͓̗̗̣̖̩̙̱̥̙͎̩̩͌͆͑͂̄̿̈̏̔̀͒̉́́͑̐͊͐̍́̅̓̍̽̀̽̉͒́̓̈́̇̀̈̋̔̀͑̈͋̂͆͊̀̒̽͊̐̔͂̀̓̋̂̈́̈̔̍̔͗̄̔͌̍̑̀̌̽̃͒̋̉́̇͑̅̎̋́̔̎͆̽̀̔̂̓̔̊̃͗̑̃̉͐̉̚̚ͅͅͅͅͅ.̜̠̮̖͎̳̩̥͚͕̣̥͈̠̳̟̙̙̣͕̫̭̩̞̝̜̱͍̙̜͉̳̪͉̭̞͓̖̜͙̦̤͙̫̙̘͙̜͎̩̯̙̭̩͉̥̘̖̰͎͉̣̩̫͇̭̫̰̭̗͉̳̳̬͖̪̫͕̜͙̱̳̯͖͍̭͕͇̪̩̥͚͔̦̣̱̜̜̭͖͈͈͈̠̰̲̲̤̟̗͍̘͈͈̣̳̟̙͑̏̎͊͊͆̑͋͌̇͒̐̈̆̄̅͊̌͑̔̅̓̊͊̄̓̄̓̓͊͊̒̾̾̾́̎̓̅̀̈͋͗̃͋̒̊͛̇̔̐̓̌̍̄̀͒̓̽̉̒̏̃́̃̓̑͛̎́̆͑̊̇͋͊̂̔̃̐̎͂̇̽͗́͌̓͆̿͐̒̐̐̽͋͊̎̃̏͐̎̒̑̑̀͂͑̂̓͒̃͋͒͌̀̄̍͊́̀̆̈̀̅̎͂͒̍̊̂̈́̚̚̚ͅ.̫͈̞͈͉̰̜̘̩͇̦̘̰̝̘̥͔̭̱͔͕̘͎͍̭͉͍͖͙̝̝̩̗̲͉̜̮͙̮̝͖̳͎͓͍̱͙͈̯̫͓̜̠͓͙̭̫̟͓̦͕͓͎̭̦͍͓̣͚͍̝̰̘͉͓̙̳͖̰̞̳̯͈̯̜̬̪̩͎̦̯̪̪̥̱̖͓͔̞͈̩̗̩̫͚͇̟̱͔͈̗̞̉̈́͑̄̔̏́̐́̌̄͐͂̉̈̌͂̔͂̔̓̈́̽̓͛̈̃̾̅̿͒̀͌͋̅̎͋̆͑̽̔͌̾̌̍̓̉͒́̅̐͂̀͛̀̀̓̆͑̋̀̈̏̄͐̀͂̑͆̔̌͑͊̑̀̋͆̃͋͊̽̓́͗̆̿̋̿̊̾͌͑̔̃́͆͆̅̓̚̚̚̚̚ͅͅͅ.͍̮̣̰͙̦̤̗̗̠̯͔͈̳͔̬̗͖̭͕͈̫̖͕̠̜̰̗̯̤͈̬̯̭͎͎̘͍̫̞͖̜̲̟̖͓̗͓̥͚̰͕̣̭̱̖̟̘̱̣͎̮͙̖̬̤̟̙̬̝͈̖̭͔͓̝̪͕̖̩̝͙̠̣̞̗̮͕̤͇͉̙̪͎͔̘̗͚̯͖̦̩͖̲̜̲͈̯̠̬̖̪̟̟̘̱̗̦̥͖͉͙͍͚̝͓̽͛̊̀̑͛̐̊̓͒̇͋̏̀͑́͌̿͛̅̀̂̏̑̇͗́̋͐͗͋͊̑̅́͛̔͌̈́̀̾̔̿̌̆̄͑̒̃̾̓͛̋̉̈͗̋̂͗̄̍̈̅̈́̒͆͗̊̂̉̈̇̐̂̍̃͗͊͑̍͊̈̃͌̆̈́́͋̉͗̈̀͂̒̽͗͛̓͌̀̉͋̽̈́̋͑̊̀̀̆̒̃͗̾̑́͌̇̽̄͑̽́͑̉͑̀̌͑̓̽̆̒̚̚̚̚̚ͅͅ.̣̯̥̮͙͇͎̲̰̥͚̤̰̙̞̘̪͍͖͚̮͕͕͖̰͔̬͎̜̜̗̱̥̭̱̲̰̥̫͓͎̩̝̬̜̤̘̥͕̯̬͉̱͔̰̭̝͕̗͙̰̲̱̬̦̙̠̯̦̟̭͖͚͎̯̬̱͎̩̳̰̯̘̩̟̬̪̩͕̮͍͖͚̩̯̙͌̽́͐́̏͛̆̃́̄͐̍͆̐͌̽̄̍̑̂̀̋̅͋̀͊̉̾̈́́͛̈́͋̍̇̒̂͋͛̓̀͊̋̄̑͋̀̂̃͒̃͑̔̎͒̄͊̑̉͑͒͗̏̂̏̿͋̌̒̌́͌͒̆͂̀́͋̏̔̽̊̔̍͌̈́́̋͒̃̾̅̔̀̍̊̍͑̏̾͒̐͛̊̚̚̚̚̚̚ͅͅͅͅͅͅͅ.̗͔̮̜̝̦͍͎̳̗͖̝̪̥̤͔̱̥̯͔͉̞̮͚̣̯̙̗͍̖̥̖͓͔͇̳͖̪̤̬͎͙̖̝̟̬̰͈̯̰̗̝̠̖̠̙͚̰̜̦͕̞̣̙̪̭͈͉͈͕̤͇̝̱̜̜͕͕̙͚̖͕̞̰̣̝͈̩͎͓̜̪̱͚̜̭̘͇̜͕͔̠̱̠̩̝̯̗̟̲̗̞̖̯̙̅̏́͐̑̂̊̋̆̅͒̍̂̈́̓̅̾̋̌͑̈͌̆͊̔̽̓̏̈́͋͒̒̉̈́̾͑̐̊̋͒͐̅͑͋̓̃̀̋̃̎̽̄̓̏͑̉͛̑̓̂̉̋̈́͌̅͊̃̑̉̓́͂̌̏̋̀͋͑̓̎̒͐́͛̌͐̉͗̉̽͊͑̈͌͋̑͐̔̓̌͋̏̉̄͛̒͊̂̀͂͋͂͊̀̄͐͌̌̃͆̓̉͊̀̔̒̉̄͆̃͛͐̚̚̚ͅͅͅͅͅͅ.͇̪͍̮̳̥̖̟͚̤͙̦̰͔͇̮̥̰͎͚̘͙͙̦̖͉͕̜̤̳̮̰͎̝͈͎͈̰̟͚̗̲̱͖̤̖̜̦̝̰͇̥̪͖͕̫̣͔̙͓̫̳͕̙̟̱͎̠̤͙̜͕̥̗̪͔͉̯̞͙̳̖̰̮̘̫͙̰̗̪͎͍̳̟̯̮̳̙͓͇̘̩͍̝̣͎͇̤͕͎̖̲͓̳͓̩͇̟͖͇͈͇̓̓̄̂̏̍̀͌̾̏̓̓͐̒͑͗͐̋̋̑̽́̑̓͌̌̀̒̃̏̎̿̀̑̒̂͊͋̅́͊̑̔͋͊̊͒̆́̔̿̆̇͆̀̈̀͊̒̂̓̀̑̑̎͐͂͑̃̒̇̃̋̎̃̈́̄̾͋̓̃̈́̓̿̆͂͆̉̾̋̇̓͛̄́̅̚̚̚̚̚ͅ.̤̭̣̲̠̜̘̪̬̥͙̬̳̘̣͕̙͉͚̤̦̝̗͈̮̭̣͍̳̤͉̳͙͚̞̗̯̯̘͈̯̱̥̤͇̖͎̮̟̲̤͚̰̞̭̥̜̜̞̭͔͍̪̰̙͖͈̜͈͓̰̗̥̝̖̲̯͖̮͙̳̭̗̞̭͕͍͙̤͉̬̮̱̥̱͈͕̱̘̥͎̜͚̟͍̩̘̠̤̯̫̭͎͍̤̱̗͖͔͚̙̥̪̑̎͑̽̽͒̅̍͒͐̽͒͌̔́̓̽͑̒͋̋̅͌͊͌͛͂́̉̑̽͊̈͂͆̾͊́̾͗͛̆̑͌̀͗͋̈́̌̅̃̑͂̒͆̀̋̍̂͊̎͐̄̉͑͑̐͆̔͋̔̉͋́̈́̈̉̈̋̃̉̆̂̐͊͋͊̀͋̊̏̒̅͛̅͛́͊̓̐͑̃̇̓̏̈́̂̾̓͌̌̀̇̏̂̀͑̏̆̅͆̀́̾̃̊͐̑͛̇́̑̂̇͐̋̑̓̾̏͌̽̄̃̚̚̚̚̚ͅͅͅ
			browserwindow.style.position = "absolute";
			browserwindow.style.width = "100%";
			browserwindow.style.height = "calc(100% - 27px)";
			browserwindow.style.bottom = "0px";
			browserwindow.style.borderWidth = "0px";
			browserwindow.style.margin = "0px";
			
		fullScreenBtn.addEventListener("mouseover", function(){
			fullScreenBtn.style.backgroundColor = "#0d009c";
			fullScreenBtn.style.cursor = "pointer";
		})
		fullScreenBtn.addEventListener("mouseout", function(){
			fullScreenBtn.style.backgroundColor = "#040042";
			fullScreenBtn.style.cursor = "default";
		})
		
			for(i=0; i<proxyTypes.length; i++){
				let option = new Option(proxyTypes[i], proxyUrls[i]);
				proxyPicker.appendChild(option);
			}
			proxybrowser.style.backgroundColor = "#292929";
			urlbar.style.position = "absolute";
			urlbar.style.top = "0px";
			urlbar.placeholder = "https://example.com/ [Full URLS must be provided]";
			urlbar.style.height = "25px";
			urlbar.style.width = "calc(100% - 120px)";
			urlbar.style.backgroundColor = "#040042";
			urlbar.style.borderColor = "white";
			urlbar.style.borderWidth = "2px";
			urlbar.style.color = "white";
			urlbar.style.borderStyle = "none none solid none";
		
			urlbar.addEventListener("keydown", function(e){
				if(e.key === "Enter"){
					urlbar.placeholder = urlbar.value;
					if(proxyPicker.value === "https://krono-alloy-proxy.herokuapp.com/session/?url="){
						urlbar.value = btoa(urlbar.value);
					}
					browserwindow.src = proxyPicker.value + urlbar.value;
					urlbar.value = "";
				  
				}
			})
			fullScreenBtn.addEventListener("click", function(){
				error("Fullscreen is not currently implemented, and is planned for a future update. This window can be resized, though!");
			})
		
		}
		*/
		// app store
		function appstoreapp() {
			let store = openWindow(500, 320, "App Store", resizable = "off", Injector.user.icons.AppStore);
			let topHeaderBar = newElement("appstorebar", store, "appbar");
			let appList = newElement("applist", store, "applister");
			store.style.overflowX = "hidden";
			let appDesc = newElement("appdesc", store, "appdescriber");
			let namer = newElement("appnamer", appDesc, "appnamer");
			let devnamer = newElement("devnamer", appDesc, "devnamer");
			let descnamer = newElement("appdescriptor", appDesc, "descer")
			let downloadAppBtn = newElement("appdownbtn", appDesc, "downloadBtn");
			// make the top header
			topHeaderBar.style.position = "absolute";
			topHeaderBar.style.top = "0px";
			topHeaderBar.style.width = "100%";
			topHeaderBar.style.backgroundColor = "orange";
			topHeaderBar.style.color = "white";
			topHeaderBar.style.paddingLeft = "10px";
			topHeaderBar.style.height = "50px";
			topHeaderBar.style.fontFamily = "Helvetica";
			topHeaderBar.style.lineHeight = "50px";
			topHeaderBar.style.fontSize = "40px";
			topHeaderBar.style.textAlign = "left";
			topHeaderBar.textContent = "App Store";

			// make the list of the apps that shows on the left
			appList.style.position = "absolute";
			appList.style.bottom = "0px";
			appList.style.left = "0px";
			appList.style.width = "155px";
			appList.style.height = "calc(100% - 50px)";
			appList.style.borderColor = "gray";
			appList.style.borderStyle = "none solid none none";
			appList.style.overflowY = "auto";
			appList.style.overflowX = "hidden";

			// make the app descriptions on the right 
			appDesc.style.position = "absolute";
			appDesc.style.bottom = "0px";
			appDesc.style.right = "0px";
			appDesc.style.width = "calc(100% - 152px)";
			appDesc.style.height = "calc(100% - 50px)";
			appDesc.style.overflowY = "auto";
			appDesc.style.overflowX = "hidden";

			// app name on right descriptor
			namer.style.position = "absolute";
			namer.textContent = "App Store";
			namer.style.width = "250px";
			namer.style.height = "50px";
			namer.style.fontSize = "40px";
			namer.style.lineHeight = "50px";
			namer.style.textAlign = "center";
			namer.style.left = "calc(50% - 125px)";
			namer.style.whiteSpace = "nowrap";
			namer.style.overflow = "hidden";
			namer.style.textOverflow = "ellipsis";

			// app download button

			devnamer.style.position = "absolute";
			devnamer.textContent = "paragram";
			devnamer.style.width = "200px";
			devnamer.style.height = "30px";
			devnamer.style.fontSize = "20px";
			devnamer.style.lineHeight = "30px";
			devnamer.style.textAlign = "center";
			devnamer.style.left = "calc(50% - 100px)";
			devnamer.style.top = "40px";

			descnamer.style.position = "absolute";
			descnamer.textContent = "test";
			descnamer.style.width = "80%";
			descnamer.style.height = "calc(100% - 120px)";
			descnamer.style.fontSize = "15px";
			descnamer.style.textAlign = "center";
			descnamer.style.left = "calc(50% - 40%)";
			descnamer.style.top = "70px";
			descnamer.textContent = "Download additional features and apps for Injector!";
			descnamer.style.lineHeight = "15px";

			downloadAppBtn.style.position = "absolute";
			downloadAppBtn.style.bottom = "10px";
			downloadAppBtn.style.height = "30px";
			downloadAppBtn.style.width = "250px";
			downloadAppBtn.style.backgroundColor = "green";
			downloadAppBtn.style.color = "white";
			downloadAppBtn.textContent = "Download";
			downloadAppBtn.style.left = "calc(50% - 125px)";
			downloadAppBtn.style.fontSize = "25px";
			downloadAppBtn.style.fontFamily = "Helvetica";
			downloadAppBtn.style.lineHeight = "30px";
			downloadAppBtn.style.textAlign = "center";
			downloadAppBtn.style.borderRadius = "5px";
			downloadAppBtn.style.opacity = "0";
			let numOfApps = 0;
			function newStoreApp(name, dev, desc) {
				let appbtn = newElement("storeApp", appList, "storeapp1");
				appbtn.textContent = name;
				appbtn.style.position = "absolute";
				appbtn.style.width = "150px";
				appbtn.style.height = "50px";
				appbtn.style.top = [numOfApps * 50].toString() + "px";
				numOfApps++;
				appbtn.style.borderRadius = "0px";
				appbtn.style.color = "black";
				appbtn.style.overflow = "hidden";
				appbtn.style.whiteSpace = "nowrap"
				appbtn.style.fontSize = "30px";
				appbtn.style.paddingRight = "12px";
				appbtn.style.textAlign = "right";
				appbtn.style.lineHeight = "30px";
				appbtn.style.fontFamily = "Helvetica";
				appbtn.style.userSelect = "none";
				let devIndc = newElement("devname", appbtn, "storedevc");
				devIndc.style.fontSize = "12px";
				devIndc.style.color = "black";
				devIndc.textContent = dev;
				devIndc.style.position = "absolute";
				devIndc.style.bottom = "0px";
				devIndc.style.right = "0px";
				devIndc.style.marginBottom = "1px";
				devIndc.style.paddingBottom = "1px";
				devIndc.style.paddingRight = "12px";
				devIndc.style.top = "25px";
				devIndc.style.userSelect = "none";
				appbtn.addEventListener("click", function() {
					namer.textContent = name;
					devnamer.textContent = dev;
					descnamer.textContent = desc;
					for (i = 0; i < appsDownloaded.length; i++) {
						if (('"' + namer.textContent + '"') == appsDownloaded[i]) {
							downloadAppBtn.style.backgroundColor = "red";
							downloadAppBtn.textContent = "Uninstall";
							break;
						} else {
							downloadAppBtn.style.backgroundColor = "green";
							downloadAppBtn.textContent = "Download";
						}
					}
					downloadAppBtn.style.transitionDuration = "0s";
					downloadAppBtn.style.opacity = "1";
					for (i = 0; i < appList.children.length; i++) {
						appList.children[i].style.backgroundColor = "white";
					}
					appbtn.style.backgroundColor = "#bfbfbf"


				})
			}


			async function requestAppList() {
				let fetchReq = await fetch(`${Injector.serverURL}/appstore/apps`);
				return await fetchReq.text();
			}
			requestAppList().then(response => {
				joe = JSON.parse(response);
				for (i = 0; i < joe.length; i++) {
					newStoreApp(joe[i][0], joe[i][1], joe[i][2]);
				}
			})

			downloadAppBtn.addEventListener("click", function() {
				if (downloadAppBtn.textContent === "Uninstall") {
					downloadAppBtn.textContent = "Uninstalling...";
					try {
						document.getElementById(namer.textContent).remove();
					} catch (err) {
						console.log(namer.textContent + " is not a valid app ID, you'll have to refresh. Tell the developer to set the app ID to the name of his app.");
					}
				} else {
					downloadAppBtn.textContent = "Downloading...";
					appsDownloaded.push('"' + namer.textContent + '"');

				}
				let downloadReq = new XMLHttpRequest;
				downloadReq.open("POST", Injector.serverURL + "/appstore");
				downloadReq.setRequestHeader('token', Injector.user.token);
				if (downloadAppBtn.textContent === "Uninstalling...") {
					downloadReq.setRequestHeader('action', 'uninstall');

				}
				downloadReq.send(namer.textContent);
				downloadReq.onreadystatechange = e => {
					if (downloadReq.readyState == 4 && downloadAppBtn.textContent === "Downloading...") {
						try {
							eval(downloadReq.responseText);
							downloadAppBtn.textContent = "Downloaded!";
							appsDownloaded.push(namer.textContent);
							setTimeout(function() {
								downloadAppBtn.style.backgroundColor = "red";
								downloadAppBtn.textContent = "Uninstall";
							}, 1000)
						} catch (err) {
							error(err);
							downloadAppBtn.textContent = "Error downloading";
						}
					} else if (downloadReq.readyState == 4) {

						downloadAppBtn.textContent = "Download";
						downloadAppBtn.style.backgroundColor = "green";
						document.title = "";

					}
				}
			})
		};

		
		
		Injector.settings.theme = null;
		let currentselected = null;
		
		function useraccApp() {
			let customWindow = openWindow(400, 200, "User Account", resizable = "off", Injector.user.icons.UserAcc);
			customWindow.style.backgroundColor = "#1c1c1c";
			let optionsLeft = newElement("randomassbox", customWindow, "randomassbox");
			optionsLeft.style.left = "0px";
			optionsLeft.style.top = "0px";
			optionsLeft.style.position = "absolute";
			optionsLeft.style.backgroundColor = "gray";
			optionsLeft.style.height = "100%";
			optionsLeft.style.width = "100px";

			let optionsPanel = newElement("option_box", customWindow, "andika");
			optionsPanel.style.position = "absolute";
			optionsPanel.style.left = "100px";
			optionsPanel.style.width = "calc(100% - 100px)";
			optionsPanel.style.height = "100%";
			optionsPanel.style.top = "0px";
			optionsPanel.style.visibility = "hidden";

			function newOption(name, saved_value, requiresRestart, type, top, funct) {
				let checkbox = newElement("input", optionsPanel, saved_value);
				checkbox.type = type;
				checkbox.style.position = "absolute";
				checkbox.style.margin = "20px";
				checkbox.style.width = "20px";
				checkbox.style.height = "20px";
				checkbox.style.top = top;
				let checkboxLabel = newElement("p", optionsPanel, "antifa");
				checkboxLabel.style.position = "absolute";
				checkboxLabel.style.top = checkbox.style.top;
				checkboxLabel.style.left = "45px";
				checkboxLabel.textContent = name;
				checkboxLabel.style.top = checkbox.offsetTop - 17 + 'px';
				checkboxLabel.style.fontSize = "15px";
				if (requiresRestart) {
					checkboxLabel.style.color = "yellow";
				} else {
					checkboxLabel.style.color = "white";
				}
				let warning = newElement("p", optionsPanel, "antifa2");
				warning.style.position = "absolute";
				warning.style.bottom = "-10px";
				warning.style.left = "10px";
				warning.style.color = "orange";
				warning.textContent = "Yellow options require a refresh!";
				warning.style.fontFamily = "Helvetica";
				warning.style.fontWeight = "bold";

				let existing = false;
				fetchUserData().then(response => {
					let parsedResponse = JSON.parse(response);
					if (parsedResponse['personalize'] !== undefined) {
						if (parsedResponse['personalize'].indexOf(saved_value) !== -1) {
							existing = true;
						}
					}
					if (existing) { checkbox.checked = true };
				})
				if (type == 'input') {
					
					checkbox.addEventListener("keydown", function(event) {
						if (event.key === "Enter") {
							alert('does not save yet');
							document.getElementById('header').src = checkbox.value;
						}
					});
				}
				checkbox.addEventListener("click", function() {

					if (type == 'button') {
						funct();
					}
					
					
					for (i = 0; i < optionsPanel.children.length; i++) {
						if (optionsPanel.children[i].type == "checkbox") {
							optionsPanel.children[i].disabled = true;
						}
					}
					setTimeout(function() {
						fetchUserData().then(userData => {
							let parsed = JSON.parse(userData);
							if (checkbox.checked) {
								saveData('personalize', saved_value);
								Injector.user.settings += saved_value;
								funct();
							} else {
								let indexOfRemoval = parsed["personalize"].indexOf(saved_value);
								deleteData('personalize', indexOfRemoval);
								Injector.user.settings = Injector.user.settings.replace(saved_value, '')
							}
							for (i = 0; i < optionsPanel.children.length; i++) {
								if (optionsPanel.children[i].type == "checkbox") {
									optionsPanel.children[i].disabled = false;
								}
							}
						});
					}, 1);
				})

			}
			newOption("Disable Right Alt Transition", "RightAltTransitionDisabled", false, "checkbox", "2px", function() {
});
			newOption('enable snow (restart to disable)', 'snow', true, 'checkbox', '24px', function () {snowfetch()})
			newOption('web.inject0r.repl.repl.co ralt url','bgurl',false, 'input','46px',function() {
				
			})
			let inf = localStorage.getItem("injinfo").split(":"); //alert("username: "+inf[0]+"\npassword: "+inf[1]);
			newOption("log out ("+inf[0]+")", "logoff", true, "button", "68px", function () {
				//remove item injinfo from local storage
				let injinfo = localStorage.getItem("injinfo");
				if (injinfo!== null) {
					localStorage.removeItem("injinfo");
					alert("Logged out, refresh page to re-login")
					location.reload();
				}
				//set this checkbox to unchecked
				let checkbox = document.querySelector("input[type='checkbox'][name='logoff']");
				checkbox.checked = false;
			});



			let themesOption = newElement("customizebtn", optionsLeft, "customizewindowbtn");
			themesOption.textContent = "Themes";
			themesOption.style.color = "lime";
			themesOption.addEventListener("click", function() {
				for (i = 0; i < themeContents.length; i++) {
					themeContents[i].style.visibility = "visible";
					optionsPanel.style.visibility = "hidden";
				}
				themesOption.style.color = "lime";
				settingsOption.style.color = "white";
				customWindow.style.overflowX = "scroll";
			})
			let settingsOption = newElement("customizebtn", optionsLeft, "customizewindowbtn");
			settingsOption.textContent = "Settings";
			settingsOption.style.top = "36px";
			settingsOption.addEventListener("click", function() {
				for (i = 0; i < themeContents.length; i++) {
					themeContents[i].style.visibility = "hidden";
					optionsPanel.style.visibility = "visible";
				}
				customWindow.style.overflowX = "hidden";
				settingsOption.style.color = "lime";
				themesOption.style.color = "white";
			})

			let marginToUseLeft = 115
			function newTheme(themeName, icon, themeCode) {
				let themeindicator = newElement("img", customWindow, "themeBox");
				let themeCaption = newElement("themecaption", themeindicator, "themecaptionMidnight");
				themeindicator.style.left = marginToUseLeft.toString() + "px";
				if (Injector.settings.theme == themeName) {
					currentSelected = themeindicator;
				}
				marginToUseLeft += 175
				themeindicator.src = icon;
				themeCaption.style.position = "absolute";
				themeCaption.textContent = themeName
				themeCaption.style.left = themeindicator.style.left;
				themeCaption.style.width = themeindicator.style.width;
				themeCaption.style.height = "25px";
				themeCaption.style.textAlign = "center";
				themeCaption.style.bottom = "0px";
				themeindicator.style.bottom = "15px";
				themeindicator.addEventListener("click", function() {
					if (themeindicator.style.borderColor !== "lime") {
						themeindicator.style.borderColor = "lime";
						currentSelected.style.borderColor = "gray";
						currentSelected = themeindicator;
						if (themeCode !== undefined) {
							try {
								themeCode();
							} catch (err) {
								error(err);
							}
						}

					}
				})
				return themeindicator;
			}

			let midnightThemeSelector = newTheme("midnight", "https://www.schemecolor.com/wallpaper?i=2238&desktop", midnightTheme)
			let crimsonThemeSelector = newTheme("crimson", "https://www.schemecolor.com/wallpaper?i=34515&desktop", crimsonTheme);
			let greenboyThemeSelector = newTheme("green", "https://www.schemecolor.com/wallpaper?i=56477&desktop", greenTheme);
			let lightThemeSelector = newTheme("light", "https://www.schemecolor.com/wallpaper?i=44498&desktop", lightTheme)
			let firstlightThemeSelector = newTheme("semiyan", "https://www.schemecolor.com/wallpaper?i=81564&desktop", semiyanTheme)
			//let christmasThemeSelector = newTheme("christmas", "", "christmasTheme()")

			currentSelected.style.borderColor = "lime";

			// 
			let themeContents = [midnightThemeSelector, crimsonThemeSelector, greenboyThemeSelector, lightThemeSelector, firstlightThemeSelector];

		}

		


		// create icons
		createNewItem("Inject0r", "chlogApp", "app1()", Injector.user.icons.Logo);
		createNewItem("Exploit Hub", "exploithubApp", "app2()", Injector.user.icons.ExpHub); //https://www.flaticon.com/free-icon/console_1374723
		createNewItem("Chatbox", "chatApp2", "chatapp()", Injector.user.icons.Chat); //https://www.flaticon.com/free-icon/chat_724715
	    createNewItem("ProxBrowser", "exploithubApp", "app4()", Injector.user.icons.ProxB);//https://www.flaticon.com/free-icon/web-search-engine_3003511
		createNewItem("App Store", "exploithubApp", "appstoreapp()", Injector.user.icons.AppStore);
		createNewItem("User Account", "personalizeApp", "useraccApp()", Injector.user.icons.UserAcc); //https://www.flaticon.com/free-icon/settings_1208196



		background.style.left = "0px";
		backgroundImage.style.right = "0px";
		var preVis = null;
		if (Injector.user.settings.indexOf("snow") !== -1) {snowfetch();}



		
		document.addEventListener("keydown", function(e) {
			var key = e.key + e.location;
			//console.log(key);
			if (key == "Alt2" || key == "\\0") {
				if (Injector.user.settings.indexOf("RightAltTransitionDisabled") !== -1) {
					if (background.style.display !== "none") {
						background.style.display = "none";
						backgroundImage.style.display = "none"
						background.style.left = "0px";
						backgroundImage.style.right = "0px";
					} else {
						background.style.display = "initial";
						backgroundImage.style.display = "initial"; background.style.left = "0px";
						backgroundImage.style.right = "0px";
					}
				} else {
					if (windowParent !== background) {
						if (background.style.opacity !== "0") {
							preVis = backgroundImage.style.visibility;
							background.style.opacity = "0";
							backgroundImage.style.opacity = "0";
							backgroundImage.style.visibility = "hidden";
							background.style.visibility = "hidden";
						} else {
							background.style.opacity = "1";
							backgroundImage.style.opacity = "1";
							backgroundImage.style.visibility = preVis;
							background.style.visibility = "visible";
						}
					} else {
						if (background.style.left === "0px") {
							background.style.left = "-100%";
							backgroundImage.style.right = "100%";
							backgroundImage.style.visibility = "hidden";
							background.style.visibility = "hidden";
						} else {
							background.style.left = "0px";
							backgroundImage.style.right = "0px";
							backgroundImage.style.visibility = "visible";
							background.style.visibility = "visible";
						};
					};
				}
			}
		});
		function themeSaveRequest(theme) {
			console.log("Sending theme save request with theme " + theme);
			let themesaver = new XMLHttpRequest;
			themesaver.open('POST', Injector.serverURL + '/themesave');
			themesaver.setRequestHeader('token', Injector.user.token);
			themesaver.send(theme);
			themesaver.onreadystatechange = e => {
				if (themesaver.readyState == 4) {
				}
			}
		}
		function refreshTaskbarColors() {
			console.log("Refreshing taskbar colors")
			for (i = 0; i < taskbar.children.length; i++) {
				if (taskbar.children[i].id === "taskBtn") {
					taskbar.children[i].style.backgroundColor = tbarColor;
				}
			}
		}

		document.body.addEventListener("keydown", function(event) {
			if (event.key === "Escape") {
				window.location.replace("https://classroom.google.com/");
			}
		});

		let ThemeInfo = {
			colors: {
				taskbar_button_color: "#002169",
				taskbar_color: "black",
				background: "#00011c",
				window_gradient: "linear-gradient(90deg, rgba(0, 10, 21, 0.55), rgba(0, 70, 140, 0.55))",
				hover_background_color: "0,255,255",
				hover_border_color: "cyan"
			},
			logo: "url('" + Injector.user.icons.Logo + "')",
			name: "midnight"
		}
		function updateTheme() {
			tbarColor = ThemeInfo.colors.taskbar_button_color;
			refreshTaskbarColors();
			themeSaveRequest(ThemeInfo.name);
			Injector.settings.theme = ThemeInfo.name;
			backgroundImage.style.backgroundColor = ThemeInfo.colors.background;
			changeWindowColors(ThemeInfo.colors.window_gradient);
			taskbar.style.backgroundColor = ThemeInfo.colors.taskbar_color;
			hoverColor = ThemeInfo.colors.hover_background_color;
			hoverOutlineColor = ThemeInfo.colors.hover_border_color;
			backgroundImage.style.backgroundImage = ThemeInfo.logo;
			nameColor = ThemeInfo.colors.app_name_color;
			nameBg = ThemeInfo.colors.app_name_background;

		}
		function crimsonTheme() {
			ThemeInfo = {
				colors: {
					taskbar_button_color: "#fc0008",
					taskbar_color: "#D3A42E",
					background: "#5e000e",
					window_gradient: "linear-gradient(90deg, rgba(189, 0, 28, 0.55), rgba(165, 124, 0, 0.55))",
					hover_background_color: "211, 164, 46",
					hover_border_color: "#D3A42E",
					app_name_color: "white",
					app_name_background: "transparent"
				},
				logo: "url('" + Injector.serverURL + "/img/crlogo.png')",
				name: "crimson"
			}
			updateTheme();
		}
		function greenTheme() {
			ThemeInfo = {
				colors: {
					taskbar_button_color: "green",
					taskbar_color: "#2BC20E",
					background: "#010B12",
					window_gradient: "linear-gradient(90deg, rgba(0, 0, 0, 0.55), rgba(58, 255, 19, 0.55))",
					hover_background_color: "58, 255, 19",
					hover_border_color: "#9CFF00",
					app_name_color: "white",
					app_name_background: "transparent"
				},
				logo: "url('" + Injector.serverURL + "/img/grlogo.png')",
				name: "green"
			}
			updateTheme();
		}

		function midnightTheme() {
			ThemeInfo = {
				colors: {
					//taskbar_button_color: "#002169",
					taskbar_button_color: "black",
					taskbar_color: "black",
					background: "#00011c",
					window_gradient: "linear-gradient(90deg, rgba(0, 10, 21, 0.55), rgba(0, 70, 140, 0.55))",
					hover_background_color: "0,255,255",
					hover_border_color: "cyan",
					app_name_color: "white",
					app_name_background: "transparent"
				},
				logo: "url('" + Injector.serverURL + "/img/logo.png')",
				name: "midnight"
			}
			updateTheme();
		}
		function lightTheme() {
			ThemeInfo = {
				colors: {
					taskbar_button_color: "#C4DBE9",
					taskbar_color: "#3bb0ff",
					background: "#EAF0FB",
					window_gradient: "linear-gradient(90deg, rgba(51, 154, 171, 0.55), rgba(255, 255, 255, 0.55))",
					hover_background_color: "105, 182, 207",
					hover_border_color: "#7DC5DF",
					app_name_color: "black",
					app_name_background: "transparent"
				},
				logo: "url('" + Injector.serverURL + "/img/glacier.png')",
				name: "light"
			}
			updateTheme();
		}
		function semiyanTheme() {
			ThemeInfo = {
				colors: {
					taskbar_button_color: "#0B032D",
					taskbar_color: "#0B032D",
					background: "#0F1F2F",
					window_gradient: "linear-gradient(90deg, rgba(51, 154, 171, 0.55), rgba(255, 255, 255, 0.55))",
					hover_background_color: "105, 182, 207",
					hover_border_color: "#7DC5DF",
					app_name_color: "white",
					app_name_background: "transparent"
				},
				logo: "url('" + Injector.serverURL + "/img/glacier.png')",
				name: "semiyan"
			}
			updateTheme();
		}
		/*
		function christmasTheme() {
			ThemeInfo = {
				colors: {
					taskbar_button_color: "#ffb3bf",
					taskbar_color: "",
					background: "#1f3325",
					window_gradient: "linear-gradient(#d24b52, #a9522c, #7e5317, #574f16, #38451e, #344b25, #30512d, #295737, #307445, #379252, #3eb25f, #46d26c);",
					hover_background_color: "#cc2944",
					hover_border_color: "",
					app_name_color: "#efb7a9",
					app_name_background: "transparent"
				},
				logo: "url('" + Injector.serverURL + "/glacier.png')",
				name: "christmas"
			}
			updateTheme();
		}
		*/
		let preTitle = document.title;
		var uFCons = false;
		let themeFetch = new XMLHttpRequest;
		themeFetch.open('GET', Injector.serverURL + "/themesave");
		themeFetch.setRequestHeader('token', Injector.user.token);
		themeFetch.send();
		console.log("Fetching user data file...");
		themeFetch.onreadystatechange = e => {
			if (themeFetch.readyState == 4) {
				let ThemeJSON = JSON.parse(themeFetch.response);
				try {
					eval(ThemeJSON.theme + "Theme();")
				} catch{
					console.log("No theme detected. Saving theme as Midnight")
					midnightTheme();
				}
				console.log("Downloading apps...");
				for (i = 0; i < ThemeJSON.apps.length; i++) {
					let downloadReq = new XMLHttpRequest;
					downloadReq.open("POST", Injector.serverURL + "/appstore");
					downloadReq.setRequestHeader('token', Injector.user.token);
					downloadReq.send(ThemeJSON.apps[i]);
					appsDownloaded.push(JSON.stringify(ThemeJSON.apps[i]));

					downloadReq.onreadystatechange = e => {

						if (downloadReq.readyState == 4) {
							try {
								eval(downloadReq.responseText);
								if (!uFCons) {
									console.log("User fetch complete!");
									uFCons = !uFCons;
								}
							} catch (err) {
								error(err);
							}
						}
					}
				}
			}
		}

		

		

		
    openWindow(500, 300, "Ignore", resizable = "off", Injector.serverURL + "/adalert", "javascript: void(0);" ,true);
		
		
	//	updateCustomApps();
		setTimeout(() => { 
			advertise() 
			//openWindow(300, 300, "ANNOUNCEMENT", resizable = "off", Injector.user.icons.Logo);
			//ad.innerHTML = `<h1>This Project is no longer as actively maintained.</h1>`;
			// sounds about right
		}, 1000);
		//snowfetch();
		setTimeout(updateBG(),1500);
		var setBG = setInterval(		 (function(){
			updateBG();
		}),5000);
		function ondocload() {
			if(document.querySelector("beedabeedabo")){
			    alert("loaded!");
			//		updateCustomApps();
			} else {
			  setTimeout(() => {
				  console.log("Loading");
			 		ondocload();
				}, "1000")
			}
		}
		console.log("Injector loaded successfully!")
	}, 500);
}
