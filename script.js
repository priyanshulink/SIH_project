//side menu
const hamburger = document.querySelector(".hamburger");
const sideMenu = document.querySelector(".side-menu");
const closeSide = document.querySelector(".close-btn");

hamburger.addEventListener("click", () => {
  sideMenu.style.right = "0"; // show side menu
});

closeSide.addEventListener("click", () => {
  sideMenu.style.right = "-100%"; // hide side menu
});




// Monastery database with Wikipedia links
const monasteries = [
  { 
    name: "Rumtek Monastery", 
    location: "Gangtok, East Sikkim", 
    sect: "Kagyu", 
    founded: "16th century (rebuilt in 1960s)", 
    history: "Seat of the Karmapa Lama, also known as Dharma Chakra Centre. Largest monastery in Sikkim.", 
    wiki: "https://en.wikipedia.org/wiki/Rumtek_Monastery" 
  },
  { 
    name: "Pemayangtse Monastery", 
    location: "Pelling, West Sikkim", 
    sect: "Nyingma", 
    founded: "1705", 
    history: "One of the oldest monasteries, famous for its wooden structure Zangdok Palri.", 
    wiki: "https://en.wikipedia.org/wiki/Pemayangtse_Monastery" 
  },
  { 
    name: "Tashiding Monastery", 
    location: "Near Yuksom, West Sikkim", 
    sect: "Nyingma", 
    founded: "1641", 
    history: "Considered the holiest monastery in Sikkim, built by Ngadak Sempa Chempo.", 
    wiki: "https://en.wikipedia.org/wiki/Tashiding_Monastery" 
  },
  { 
    name: "Phodong Monastery", 
    location: "North Sikkim", 
    sect: "Kagyu", 
    founded: "1740", 
    history: "Known for its frescoes and annual festivals.", 
    wiki: "https://en.wikipedia.org/wiki/Phodong_Monastery" 
  },
  { 
    name: "Enchey Monastery", 
    location: "Gangtok, East Sikkim", 
    sect: "Nyingma", 
    founded: "1909", 
    history: "Associated with Lama Drupthob Karpo, a tantric master.", 
    wiki: "https://en.wikipedia.org/wiki/Enchey_Monastery" 
  },
  { 
    name: "Ralong Monastery", 
    location: "South Sikkim", 
    sect: "Kagyu", 
    founded: "18th century", 
    history: "Famous for the Kagyed Dance Festival and new monastery built in 1995.", 
    wiki: "https://en.wikipedia.org/wiki/Ralong_Monastery" 
  },
  { 
    name: "Lachung Monastery", 
    location: "Lachung, North Sikkim", 
    sect: "Nyingma", 
    founded: "1880", 
    history: "Built amidst beautiful mountains, known for mask dance festival.", 
    wiki: "https://en.wikipedia.org/wiki/Lachung_Monastery" 
  },
  { 
    name: "Lachen Monastery", 
    location: "Lachen, North Sikkim", 
    sect: "Nyingma", 
    founded: "1858", 
    history: "Known as Ngodrub Choling, it serves as spiritual center for Lachenpas.", 
    wiki: "https://en.wikipedia.org/wiki/Lachen_Monastery" 
  },
  { 
    name: "Dubdi Monastery (Yuksom Monastery)", 
    location: "Yuksom, West Sikkim", 
    sect: "Nyingma", 
    founded: "1701", 
    history: "First monastery established after Buddhism came to Sikkim.", 
    wiki: "https://en.wikipedia.org/wiki/Dubdi_Monastery" 
  },
  { 
    name: "Kartok Monastery", 
    location: "Yuksom, West Sikkim", 
    sect: "Nyingma", 
    founded: "17th century", 
    history: "Important monastery located near Kathok Lake.", 
    wiki: "https://en.wikipedia.org/wiki/Katok_Monastery" 
  },
  { 
    name: "Zong Dog Palri Fo-Brang Gompa", 
    location: "Kalimpong (near Sikkim, often associated with Buddhist circuit)", 
    sect: "Nyingma", 
    founded: "1976", 
    history: "Inaugurated by Dalai Lama, holds 108 volumes of Kangyur.", 
    wiki: "https://en.wikipedia.org/wiki/Zang_Dhok_Palri_Phari_Monastery" 
  },
  { 
    name: "Sanga Choeling Monastery", 
    location: "Pelling, West Sikkim", 
    sect: "Nyingma", 
    founded: "1697", 
    history: "One of the oldest monasteries in Sikkim, founded by Lama Lhatsun Chempo.", 
    wiki: "https://en.wikipedia.org/wiki/Sanga_Choling_Monastery" 
  },
  { 
    name: "Lingdum Monastery (Ranka Monastery)", 
    location: "Ranka, near Gangtok", 
    sect: "Kagyu", 
    founded: "1998", 
    history: "Known for its impressive Tibetan architecture and peaceful setting.", 
    wiki: "https://en.wikipedia.org/wiki/Lingdum_Monastery" 
  },
  { 
    name: "Bongtang Monastery", 
    location: "Near Gangtok, East Sikkim", 
    sect: "Nyingma", 
    founded: "20th century", 
    history: "A smaller monastery known for its calm environment.", 
    wiki: "https://en.wikipedia.org/wiki/Sikkim" 
  },
  { 
    name: "Phensang Monastery", 
    location: "North Sikkim", 
    sect: "Nyingma", 
    founded: "1721", 
    history: "Hosts annual festival before Losoong. Originally built by Lama Jigme Pawo.", 
    wiki: "https://en.wikipedia.org/wiki/Phensang_Monastery" 
  }
];

// DOM elements
const chatToggle = document.getElementById("chat-toggle");
const chatbox = document.getElementById("chatbox");
const closeBtn = document.getElementById("close-btn");
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatMessages = document.getElementById("chat-messages");

// Toggle open/close
chatToggle.addEventListener("click", () => {
  chatbox.style.display = "flex";
  chatToggle.style.display = "none";
});

closeBtn.addEventListener("click", () => {
  chatbox.style.display = "none";
  chatToggle.style.display = "block";
  speechSynthesis.cancel(); // Stop voice
});

// Send message on button or Enter
sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

// Main sendMessage function
function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  appendMessage("user", text);

  const query = text.toLowerCase();
  let reply = "❌ Sorry, I don’t have details on that monastery.";
  let wiki = null;

  // Handle greetings
  const greetings = ["hi", "hello", "hey", "good morning", "good evening", "good night"];
  if (greetings.some(g => query.includes(g))) {
    reply = "🙏 Namaste! How may I help you today? You can ask me about Sikkim monasteries.";
  } 
  // Handle count of monasteries
  else if (query.includes("all monastery")||query.includes("how many monasteries")||query.includes("how many monasteries") || query.includes("number of monasteries")||query.includes("how many monastery")||query.includes("number of monastery")) {
    reply = `📊 There are ${monasteries.length} famous monasteries in Sikkim:\n\n` + 
      monasteries.map(m => `- ${m.name}`).join("\n");
  }
  // Handle list request
  else if (query.includes("list") || query.includes("all monasteries")) {
    reply = "📜 Here are the monasteries I know about:\n" + 
      monasteries.map(m => `- ${m.name} (${m.location})`).join("\n");
  }
  // Search by name or location
  else {
    const found = monasteries.find(m => 
      m.name.toLowerCase().includes(query) || 
      m.location.toLowerCase().includes(query)
    );

    if (found) {
      reply = `${found.name}\n📍 Location: ${found.location}\n🕉 Sect: ${found.sect}\n📅 Founded: ${found.founded}\n📖 History: ${found.history}`;
      wiki = found.wiki;
    }
  }

  setTimeout(() => {
    appendMessage("bot", reply, wiki);
    if (wiki) speak(reply); // Speak only monastery details
  }, 500);

  userInput.value = "";
}

// Append message
function appendMessage(sender, text, wiki = null) {
  const div = document.createElement("div");
  div.className = `message ${sender}`;
  div.innerText = text;

  if (wiki && sender === "bot") {
    const link = document.createElement("a");
    link.href = wiki;
    link.target = "_blank";
    link.className = "wiki-link";
    link.innerText = "🔗 Read more on Wikipedia";
    div.appendChild(document.createElement("br"));
    div.appendChild(link);
  }

  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Text-to-Speech
function speak(text) {
  speechSynthesis.cancel(); 
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-IN"; 
  speechSynthesis.speak(utterance);
}


// map section
let map;
const monasteriesmap = [
  { 
    name: "Rumtek Monastery", lat: 27.305827, lng: 88.53637,
    img: "RumtekMonastery.jpeg",
    details: "The largest monastery in Sikkim, seat of the Karmapa Lama."
  },
  { 
    name: "Pemayangtse Monastery", lat: 27.305, lng: 88.252,
    img: "PemayangtseMonastery.jpeg",
    details: "One of the oldest monasteries, founded in 1705, near Pelling."
  },
  { 
    name: "Tashiding Monastery", lat: 27.3089, lng: 88.2979,
    img: "TashidingMonastery.jpeg",
    details: "Considered the holiest monastery in Sikkim, built in 1641."
  },
  { 
    name: "Enchey Monastery", lat: 27.3359, lng:  88.6192,
    img: "EncheyMonastery.jpeg",
    details: "Located near Gangtok, famous for its religious festivals."
  },
  { 
    name: "Phodong Monastery", lat:  27.416786, lng: 88.582944,
    img: "PhodongMonastery.jpg",
    details: "Built in the 18th century, known for annual mask dance festivals."
  },
  { 
    name: "Ralong Monastery", lat: 27.325734, lng: 27.325734,
    img: "RalongMonastery.jpeg",
    details: "A Kagyu sect monastery, known for its grand architecture."
  },
  { 
    name: "Labrang Monastery", lat: 27.418881, lng: 88.581438,
    img: "LabrangMonastery.jpg",
    details: "Small but historic monastery near Phodong."
  },
  { 
    name: "Dubdi Monastery", lat: 27.366206, lng: 88.230086,
    img: "DubdiMonastery.jpeg",
    details: "Built in 1701, the oldest monastery in Sikkim, near Yuksom."
  },
  { 
    name: "Kartok Monastery", lat: 27.33, lng: 88.62,
    img: "KartokMonastery.jpg",
    details: "Situated at Yuksom, dedicated to Kartok Lama."
  },
  //
  { 
    name: "Rinchenpong Monastery", lat:  27.2345, lng: 88.2721,
    img: "rinchenpongmonastery.jpg",
    details: "Known for its beautiful sunset views over Kanchenjunga."
  },
  { 
    name: "Zong Dog Palri Fo-Brang Monastery", lat: 16.7000, lng:74.2333,
    img: "ZangDhokPalriPhodang.jpg",
    details: "Also known as 'Palace Monastery', located near Pemayangtse."
  },
  { 
    name: "Sanga Choeling Monastery", lat: 27.29, lng: 88.23,
    img: "SangaChoelingMonastery.jpg",
    details: "Founded in 1697, accessible by a steep trek from Pelling."
  },
  {
   name: "Bongtang Monastery","lat": 27.3690385,"lng": 88.6132007,
   img: "BongtangMonastery.jpg",
   details: "Also known as Gonjang Monastery, it was established in 1981. It follows the Nyingma school of Tibetan Buddhism and is located near Tashi Viewpoint in Gangtok."
  },
  { 
    name: "Lingdum (Ranka) Monastery", lat: 27.3347, lng: 88.6416,
    img: "Lingdum(Ranka)Monastery.jpg",
    details: "A relatively new but very large monastery near Gangtok."
  },
  { 
    name: "Gonjang Monastery", lat: 27.36908, lng: 88.613314,
    img: "GonjangMonastery.jpeg",
    details: "Located near Tashi View Point, built in 1981."
  }
];function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 27.5, lng: 88.5 },
    zoom: 8
  });

  monasteriesmap.forEach((monastery) => {
    const marker = new google.maps.Marker({
      position: { lat: monastery.lat, lng: monastery.lng },
      map: map,
      title: monastery.name
    });

    marker.addListener("click", () => {
      showMonasteryDetails(monastery);
      map.setCenter({ lat: monastery.lat, lng: monastery.lng });
      map.setZoom(11);
    });
  });

  setupSidebar();

  // Default: Show Rumtek Monastery
  const defaultMonastery = monasteriesmap.find(m => m.name === "Rumtek Monastery");
  if (defaultMonastery) {
    showMonasteryDetails(defaultMonastery);
    map.setCenter({ lat: defaultMonastery.lat, lng: defaultMonastery.lng });
    map.setZoom(11);
  }
}

// ===== Setup Sidebar List =====
function setupSidebar() {
  const list = document.getElementById("monastery-list");
  if (!list) return;

  monasteriesmap.forEach((m) => {
    const li = document.createElement("li");
    li.textContent = m.name;
    li.style.cursor = "pointer";
    li.style.padding = "5px 0";

    li.addEventListener("click", () => {
      map.setCenter({ lat: m.lat, lng: m.lng });
      map.setZoom(11);
      showMonasteryDetails(m);
    });

    list.appendChild(li);
  });
}

// ===== Show Monastery Details =====
function showMonasteryDetails(monastery) {
  const container = document.getElementById("monastery-details");
  if (!container) return;

  // Update Image
  const img = container.querySelector("img");
  if (img) img.src = monastery.img || "images/default.jpg";

  // Update Name/Title
  const title = container.querySelector("h4");
  if (title) title.innerText = monastery.name;

  // Update Description
  const desc = container.querySelector(".monastery-desc");
  if (desc) desc.innerText = monastery.details;
}
