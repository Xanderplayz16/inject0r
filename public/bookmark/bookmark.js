var Injector = {
	serverURL: "http://127.0.0.1:8080",
	serverURL_test: "https://02d36946-d9ad-4e8b-99d5-8b1dd3cde512.id.repl.co"
};
function loadExternalTXT(location_, name)
{
    var req = new XMLHttpRequest();
	
    req.open('GET', location_, false); 
    req.send(null);

	if (req.status === 200) {
		return req.responseText
	} else {
		alert(name + ' failed to load!')
	}
}
function loadTXT(location_, name)
{
    return loadExternalTXT(Injector.serverURL + location_, name)
}
function loadJSON(location_, name)
{
	return JSON.parse(loadTXT(location_, name))
}

function loadJS(location_)
{
	document.body.innerHTML += `<script src="${location_}"></script>`
}
// TODO: get zenfs doing stuff
loadJS("https://cdn.jsdelivr.net/npm/@zenfs/core@0/dist/browser.min.js")
loadJS("https://cdn.jsdelivr.net/npm/@zenfs/dom@0/dist/index.min.js")
Injector.clientconfig = loadJSON('/config/client.json', 'Client config')
Injector.appconfig = Injector.clientconfig.app_config
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
}
Injector.templates = {
	changelog: loadTXT('/templates/changelog.html', 'Changelog'),
	error: loadTXT('/templates/error.html', 'Error template')
}
function snowfetch(){
	fetch(`${Injector.serverURL}/js/snow.js`).then((response) => {
		response.text().then(function(text){
			eval(text);
		}).catch((error)=>{
			alert("Snow module couldn't load.")
		});
	})
}

function updateBG() {
	var taskBar = document.querySelector('injtaskbar');
	var bgim = document.getElementById('backgroundImage');
  	files('background.txt', function(resp) {
    	// bg is the same
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

	inputText.addEventListener("keydown", (e) => {
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
	
}
`
	
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
      	alert(Injector.clientconfig.brand + " seems to have hit a critical system error, please report the following in a github issue:"+err);
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
	style.textContent = loadTXT("/css/inj.css")
};
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
		let validCmds = ["help", "run"];
		let cmdExecs = ["runHelp();", "evalCmdLine();"];
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
		console.log("Press Right Ctrl to toggle Console.", Injector.clientconfig.brand);
		// create main desktop elements
		let backgroundImage = newElement("beedabeedabo", background, "backgroundImage");

		//make adds for like profit or something
		// not a chance
		//let advertisment = newElement("ad", background, "advertise");

		// manage the taskbar
		let taskbar = newElement("injTaskbar", background, "taskbar");
		let numWins = 0;
		//tbar index manages auto-adjustment of taskbar icons upon window close
		let tbarIndex = 0;
		let trueLeft = null;

		// closed style left makes sure the taskbar button being moved is farther right than the object removed
		let indexLeft = 0; // 0 instead of null to make the browser console quiet down
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
			startmenu = newElement("startmenu", taskbar, 'startmenu')
			startmenu.style.backgroundColor = "#FFFFFF";
			startmenu.style.position = "absoulute";
			//window.console.log(window.screen.height - taskbar.offsetHeight - startmenu.offsetHeight + "px");
			startmenu.style.width = "10rem";
			startmenu.style.top = "0px"
			startmenu.style.height = "10rem";
			//startmenu.style.top = window.screen.height - taskbar.offsetHeight - startmenu.offsetHeight + "px";
			
			startmenu.style.zIndex = 66550022;
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
			console.log("All windows closed, switching parent...", Injector.clientconfig.brand)
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
			console.log("Opened window with title " + windowTitle, Injector.clientconfig.brand);

			newWindow.style.opacity = "0";
			makeElementDraggable(newWindow)
			newWindow.style.width = width - 5 + "px";
			newWindow.style.paddingLeft = "5px";
			newWindow.style.fontFamily = "Helvetica"
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
					console.log("Removed window with title " + windowTitle, Injector.clientconfig.brand);
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
				console.log("Removed window with title " + windowTitle, Injector.clientconfig.brand);
			});
			minBtn.addEventListener("click", function() {
				newWindow.style.display = "none"; 
				//taskItem.style.backgroundColor = "#3c3c3d";
				//alert(taskItem.children());
			});
			fullBtn.addEventListener("click", function() {
				
				
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

			
			let timer = setInterval(function() {
				if (windowContent.id === "removed") {clearInterval(timer)} // Prevents this from running anymore after the window closee\s, which is a GOOD THING.
				
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
			if ((resizable == "on") || (resizable == true)) {
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
					console.log("Window #" + i.toString() + " does not exist, or an error occured trying to change the color. Ignore this error!", Injector.clientconfig.brand)
				}
			}
		};
		// better error function
		function error(errorContent) {
			let error = openWindow(400, 200, "Error", resizable = "off");
			error.innerHTML = `
  <h1>An error has occured!</h1>
  <p>Please report this in a github issue: </p>
  <p>` + errorContent.toString() + `</p>`;
			console.log("Made visible error with content '" + errorContent + "'", Injector.clientconfig.brand);
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
		function changelog_app() {
			let chlog = openWindow(500, 300, "Changelog", resizable = "on", Injector.user.icons.Logo);
			chlog.innerHTML = `<h1>Changelog - ${Injector.clientconfig.brand} v${Injector.info.version}</h1>\n${Injector.templates.changelog}`; 
			chlog.style.overflow = 'auto';
		}
		

		// chat things, don't mess with this
		let pseudoInput = null;
		

		// prox browser

		function proxbrowser(){
			let proxybrowser = openWindow(1000, 500, "ProxBrowser", resizable = "on", Injector.user.icons.ProxB)
			let browserwindow = newElement("iframe", proxybrowser, "proxyBrowser");
			browserwindow.src = Injector.appconfig.proxbrowser.url;
			browserwindow.style.position = "absolute";
			browserwindow.style.width = "100%";
			browserwindow.style.height = "100%";
			browserwindow.style.bottom = "0px";
			browserwindow.style.borderWidth = "0px";
			browserwindow.style.margin = "0px";
		}
		

		
		
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
					window.console.log(themeContents[i])
					themeContents[i].style.visibility = "hidden";
				}
				customWindow.style.overflowX = "hidden";
				optionsPanel.style.visibility = "visible";
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
		createNewItem(Injector.clientconfig.brand, "chlogApp", "changelog_app()", Injector.user.icons.Logo);
		createNewItem("Exploit Hub", "exploithubApp", loadTXT('/apps/exploithub.js'), Injector.user.icons.ExpHub); //https://www.flaticon.com/free-icon/console_1374723
		createNewItem("Chatbox", "chatApp2", loadTXT('/apps/chatroom.js'), Injector.user.icons.Chat); //https://www.flaticon.com/free-icon/chat_724715
	    createNewItem("ProxBrowser", "exploithubApp", "proxbrowser()", Injector.user.icons.ProxB);//https://www.flaticon.com/free-icon/web-search-engine_3003511
		createNewItem("App Store", "exploithubApp", loadTXT('/apps/appStore.js'), Injector.user.icons.AppStore);
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
					window_gradient: "#282928",
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

		

		

		
    //openWindow(500, 300, "Ignore", resizable = "off", Injector.serverURL + "/adalert", "javascript: void(0);" ,true);
		
		
	//	updateCustomApps();
		setTimeout(() => { 
			advertise() 
		}, 1000);
		//snowfetch();
		setTimeout(updateBG(),1500);
		var setBG = setInterval((function(){
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
		console.log(Injector.clientconfig.brand + " loaded successfully!")
	}, 500);
}
