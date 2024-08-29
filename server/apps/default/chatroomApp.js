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
            console.log(`phrase '${item}' blocked because it includes '${chatBlacklist[i]}'`); // paragram wtf why do a client side blacklist
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
        let time = new Date(date).toString();
        time = (time.slice(0, (time.length - 33)));
        //if (parseInt(joe.slice(15, 18)) > 12) {
        //    let joe1 = joe.slice(0, 15);
        //    let joe2 = joe.slice(15, 18);
        //    let joe3 = joe.slice(18);
        //    joe2 = (parseInt(joe2) - 12).toString();
        //    joe = (joe1 + " " + joe2 + joe3 + " PM");
        //} else {
        //    joe += " AM"
        //};
        // TODO: do 12 hour time stuff
        timeIndicator.textContent = time;
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
                    realMsgInput.placeholder = "Important channel - cannot send messages"
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
