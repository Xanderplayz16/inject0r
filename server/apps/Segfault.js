createNewItem(`Segfault`, `Segfault`, `
let autoWin = openWindow(550, 300, 'Segfault', true, Injector.user.icons.BGEdit)
frame = newElement('iframe', autoWin, 'segframe')
frame.src = 'https://shell.segfault.net'
frame.style.width = '100%'
frame.style.height = '100%'
frame.style.top = 0
frame.style.left = 0
frame.style.position = "absolute"
    `, Injector.user.icons.BGEdit);
