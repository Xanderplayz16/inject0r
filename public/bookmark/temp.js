let logobtn = newElement("taskbarBtn", taskbar, "logoBtn");
logobtn.style.left = "2px";
logobtn.style.backgroundImage = "url(" + Inject0r.serverURL + "/logo.png)";
logobtn.style.backgroundSize = "100% 100%";
logobtn.style.backgroundPosition = "3% 2%";
logobtn.style.backgroundRepeat = "no-repeat";
logobtn.style.backgroundColor = "#002169";
logobtn.addEventListener("click", function() {
	alert('testing');
})