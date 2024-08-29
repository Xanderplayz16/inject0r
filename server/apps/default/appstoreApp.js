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
descnamer.textContent = `Download additional features and apps for ${Injector.clientconfig.brand}!`;
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