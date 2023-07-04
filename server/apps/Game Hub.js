createNewItem("Game Hub", "Game Hub", `

try{
// remove this it fixes syntax highlighting
let autoWin = openWindow(550, 300, 'Game Hub', resizeable = "on", Injector.user.icons.GameHub);
autoWin.style.backgroundColor = 'white';
autoWin.style.overflowY = "hidden";
let gameSelBar = newElement('genericBapBox', autoWin, "autoObj");
gameSelBar.style.width = '100px';
gameSelBar.style.height = '100%';
gameSelBar.style.backgroundColor = 'CadetBlue';
gameSelBar.style.left = '0px';
gameSelBar.style.top = '0px';
gameSelBar.style.transitionDuration = "0.2s";
let gameFrame = newElement('iframe', autoWin, "autoObj");
gameFrame.style.width = '100%';
gameFrame.style.height = '100%';
gameFrame.style.backgroundColor = 'Honeydew';
gameFrame.style.borderWidth = "0px";
gameFrame.style.margin = "0px";
gameFrame.style.right = '-75px';
gameFrame.style.top = '0px';
let playGameBtn = newElement('genericBapBox', gameSelBar, "autoObj");
playGameBtn.style.width = '96px';
playGameBtn.style.height = '40px';
playGameBtn.style.backgroundColor = 'Gainsboro';
playGameBtn.style.left = '2px';
playGameBtn.style.top = 'calc(100% - 42px)';
playGameBtn.style.lineHeight = "40px";
playGameBtn.style.textAlign = "center";
playGameBtn.style.fontSize = "35px";
playGameBtn.style.fontWeight = "bold";
playGameBtn.style.color = "black";
playGameBtn.textContent = "Load";
playGameBtn.style.borderRadius = "5px";
playGameBtn.style.cursor = "pointer";
playGameBtn.style.userSelect = "none";
let gameChooseSel = newElement('genericBapBox', gameSelBar, "autoObj");
gameChooseSel.style.width = '90px';
gameChooseSel.style.height = '20px';
gameChooseSel.style.backgroundColor = 'transparent';
gameChooseSel.style.left = '5px';
gameChooseSel.style.top = '5px';
gameChooseSel.textContent = "Game:"
gameChooseSel.color = "white";
let gameChooseDD = newElement('select', gameSelBar, "autoObj");
gameChooseDD.style.position = "absolute";
gameChooseDD.style.width = '90px';
gameChooseDD.style.height = '20px';
gameChooseDD.style.backgroundColor = 'gray';
gameChooseDD.style.left = '5px';
gameChooseDD.style.top = '30px';
let gameNames = ["Games List", "Eaglercraft 1.8 with Shaders","EaglerCraft", "NintendoEmulator","GBA Games","soundboard","3kh0 games unofficial"];
//format: [Game1: [how to open game, game url], game2: ...]
let gameVals = [["iframe","https://gfile-games.glitch.me/list.html"], ["newWin","https://eaglercraft.inject0r.repl.co"],["newWin","https://rawcdn.githack.com/AR-DEV-1/Eaglercraft-/7b2d20963b19a1d17f0d8583f5ecd25e2cc4abf8/EaglercraftX_1.8_Ultimate_International.html"],["iframe","https://ds.44670.org/"],["iframe","https://browncha023.github.io/GBA/"],["iframe","https://codehs.com/uploads/bac5575fd7f7bf6a8e990fdd73321aa0"],["iframe","https://biggercheese.netlify.app/"]];
for(i=0; i<gameNames.length; i++){
  let newOp = new Option(gameNames[i], gameVals[i]);
  gameChooseDD.appendChild(newOp);
}

function setGame (url, action) {
	switch (action) {
 		case "iframe":
	 	gameFrame.src = url;
	 	break;
	 	case "newWin":
	 	window.open(url, "_blank", "popup");
	 	break;
	}
}

playGameBtn.addEventListener("click", function(){
	let val = gameChooseDD.value.split(",");
	setGame(val[1],val[0]);
//	gameFrame.src = val[1];
	console.log(gameChooseDD.value,gameFrame.src);
  gameSelBar.style.opacity = "0";
  gameSelBar.style.visibility = "hidden";
})
}catch(err){
  error(err)
};`, Injector.user.icons.GameHub);
