```
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
```
```
//openWindow(300, 300, "ANNOUNCEMENT", resizable = "off", Injector.user.icons.Logo);
//ad.innerHTML = `<h1>This Project is no longer as actively maintained.</h1>`;
```