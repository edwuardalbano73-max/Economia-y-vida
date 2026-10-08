let game = {
  name: "Alex",
  age: 18,
  month: 1,
  year: 1,

  money: 500,
  bank: 0,
  investments: 0,

  fame: 0,
  health: 100,
  happiness: 100,

  education: "Secundaria",
  educationLevel: 0,

  job: null,
  home: null,

  level: 1,
  experience: 0,

  followers: 0,

  netWorth: 500,

  news: [
    "🎮 Has comenzado una nueva vida.",
    "💵 Tienes $500 para empezar.",
    "🎯 Tu primer objetivo es conseguir $10,000."
  ]
};

const jobs = [
  {
    name: "🧹 Limpiador",
    salary: 500,
    education: 0,
    fame: 0,
    xp: 10
  },
  {
    name: "🍔 Trabajador de restaurante",
    salary: 750,
    education: 0,
    fame: 0,
    xp: 15
  },
  {
    name: "📦 Repartidor",
    salary: 900,
    education: 0,
    fame: 0,
    xp: 18
  },
  {
    name: "💻 Programador",
    salary: 2500,
    education: 2,
    fame: 0,
    xp: 30
  },
  {
    name: "👨‍💼 Empresario",
    salary: 5000,
    education: 3,
    fame: 10,
    xp: 45
  },
  {
    name: "⚖️ Abogado",
    salary: 7000,
    education: 4,
    fame: 5,
    xp: 50
  },
  {
    name: "👨‍⚕️ Médico",
    salary: 9000,
    education: 5,
    fame: 5,
    xp: 60
  }
];

const educations = [
  {
    name: "🏫 Bachillerato",
    level: 1,
    cost: 500,
    education: "Bachillerato"
  },
  {
    name: "🎓 Universidad",
    level: 3,
    cost: 3000,
    education: "Universidad"
  },
  {
    name: "📚 Posgrado",
    level: 5,
    cost: 8000,
    education: "Posgrado"
  }
];

const fameActions = [
  {
    name: "📱 Crear contenido",
    cost: 50,
    fame: 5,
    followers: 50
  },
  {
    name: "🎤 Actuar en un evento",
    cost: 200,
    fame: 12,
    followers: 120
  },
  {
    name: "🎵 Lanzar una canción",
    cost: 500,
    fame: 25,
    followers: 500
  },
  {
    name: "🎬 Protagonizar una película",
    cost: 2000,
    fame: 60,
    followers: 5000
  }
];

const shops = [
  {
    name: "📱 Teléfono",
    price: 800,
    happiness: 5
  },
  {
    name: "💻 Computadora",
    price: 1500,
    happiness: 8
  },
  {
    name: "🚗 Coche usado",
    price: 6000,
    happiness: 10
  },
  {
    name: "🚙 Coche deportivo",
    price: 30000,
    happiness: 20
  },
  {
    name: "🏠 Apartamento",
    price: 50000,
    happiness: 15,
    home: "Apartamento"
  },
  {
    name: "🏡 Casa",
    price: 150000,
    happiness: 25,
    home: "Casa"
  },
  {
    name: "🏰 Mansión",
    price: 1000000,
    happiness: 40,
    home: "Mansión"
  }
];

const actions = [
  {
    name: "💼 Buscar un trabajo",
    description: "Busca una nueva oportunidad laboral.",
    action: randomJob
  },
  {
    name: "🎰 Participar en una lotería",
    description: "Puedes ganar o perder dinero.",
    action: lottery
  },
  {
    name: "🚨 Intentar robar",
    description: "Una decisión ilegal y arriesgada dentro del juego.",
    action: robbery
  },
  {
    name: "🧳 Viajar",
    description: "Gasta dinero para mejorar tu felicidad.",
    action: travel
  },
  {
    name: "🛌 Descansar",
    description: "Mejora tu salud y felicidad.",
    action: rest
  }
];

function money(value) {
  return "$" + Math.floor(value).toLocaleString("en-US");
}

function notify(text) {
  const box = document.getElementById("notification");

  box.textContent = text;
  box.classList.remove("hidden");

  setTimeout(() => {
    box.classList.add("hidden");
  }, 3000);
}

function addNews(text) {
  game.news.unshift(text);

  if (game.news.length > 8) {
    game.news.pop();
  }
}

function clampStats() {
  game.health = Math.max(0, Math.min(100, game.health));
  game.happiness = Math.max(0, Math.min(100, game.happiness));
  game.fame = Math.max(0, game.fame);
  game.followers = Math.max(0, game.followers);
}

function calculateNetWorth() {
  game.netWorth =
    game.money +
    game.bank +
    game.investments;

  if (game.home) {
    const property = shops.find(x => x.home === game.home);

    if (property) {
      game.netWorth += property.price;
    }
  }
}

function updateUI() {

  clampStats();
  calculateNetWorth();

  document.getElementById("playerName").textContent = game.name;
  document.getElementById("playerAge").textContent = game.age;

  document.getElementById("playerJob").textContent =
    game.job ? game.job.name : "Sin trabajo";

  document.getElementById("playerLevel").textContent = game.level;

  document.getElementById("money").textContent = money(game.money);

  document.getElementById("statMoney").textContent = money(game.money);
  document.getElementById("statFame").textContent = game.fame;
  document.getElementById("statHealth").textContent = game.health;
  document.getElementById("statHappiness").textContent = game.happiness;

  document.getElementById("statEducation").textContent =
    game.education;

  document.getElementById("statNetWorth").textContent =
    money(game.netWorth);

  document.getElementById("cashValue").textContent =
    money(game.money);

  document.getElementById("bankValue").textContent =
    money(game.bank);

  document.getElementById("investmentValue").textContent =
    money(game.investments);

  document.getElementById("netWorthValue").textContent =
    money(game.netWorth);

  document.getElementById("ageText").textContent =
    `${game.age} años`;

  document.getElementById("dateText").textContent =
    `Mes ${game.month}, año ${game.year}`;

  document.getElementById("homeText").textContent =
    game.home || "Sin vivienda";

  document.getElementById("fameBig").textContent =
    game.fame;

  document.getElementById("fameTitle").textContent =
    getFameTitle();

  document.getElementById("newsList").innerHTML =
    game.news.map(item => `
      <div class="news-item">${item}</div>
    `).join("");

  const progress =
    Math.min(100, (game.netWorth / 10000) * 100);

  document.getElementById("goalProgress").style.width =
    `${progress}%`;

  document.getElementById("goalText").textContent =
    game.netWorth >= 10000
      ? "🎉 Objetivo conseguido"
      : `Consigue ${money(10000)}`;

  renderJobs();
  renderEducation();
  renderFame();
  renderShop();
  renderActions();
}

function getFameTitle() {

  if (game.fame >= 1000) return "🌟 Superestrella";
  if (game.fame >= 500) return "🎬 Famoso";
  if (game.fame >= 250) return "⭐ Celebridad";
  if (game.fame >= 100) return "📸 Conocido";
  if (game.fame >= 25) return "📱 Creador";
  return "Desconocido";
}

function renderJobs() {

  const container =
    document.getElementById("jobsGrid");

  container.innerHTML = jobs.map((job, index) => {

    const unlocked =
      game.educationLevel >= job.education;

    return `
      <div class="card job-card">

        <div class="card-icon">${job.name.split(" ")[0]}</div>

        <h3>${job.name.substring(job.name.indexOf(" ") + 1)}</h3>

        <div class="salary">
          ${money(job.salary)}/mes
        </div>

        <div class="requirement">
          Educación requerida: ${job.education}
        </div>

        <button
          onclick="chooseJob(${index})"
          ${!unlocked ? "disabled" : ""}
        >
          ${unlocked ? "Conseguir trabajo" : "🔒 Bloqueado"}
        </button>

      </div>
    `;

  }).join("");
}

function chooseJob(index) {

  const job = jobs[index];

  if (game.educationLevel < job.education) {
    notify("🎓 Necesitas más educación.");
    return;
  }

  game.job = job;

  addNews(
    `💼 Has conseguido trabajo como ${job.name}.`
  );

  notify(`💼 Ahora trabajas como ${job.name}.`);

  updateUI();
}

function randomJob() {

  const job =
    jobs[Math.floor(Math.random() * jobs.length)];

  if (game.educationLevel < job.education) {
    notify("❌ Todavía no puedes conseguir ese trabajo.");
    return;
  }

  chooseJob(
    jobs.indexOf(job)
  );
}

function renderEducation() {

  const container =
    document.getElementById("educationGrid");

  container.innerHTML = educations.map((edu, index) => {

    const completed =
      game.educationLevel >= edu.level;

    return `
      <div class="card">

        <div class="card-icon">🎓</div>

        <h3>${edu.name}</h3>

        <p>
          Coste: ${money(edu.cost)}
        </p>

        <button
          class="primary"
          onclick="study(${index})"
          ${completed ? "disabled" : ""}
        >
          ${completed ? "✓ Completado" : "Estudiar"}
        </button>

      </div>
    `;

  }).join("");
}

function study(index) {

  const edu = educations[index];

  if (game.educationLevel >= edu.level) {
    notify("🎓 Ya tienes este nivel.");
    return;
  }

  if (game.money < edu.cost) {
    notify("💸 No tienes suficiente dinero.");
    return;
  }

  game.money -= edu.cost;

  game.educationLevel = edu.level;
  game.education = edu.education;

  game.happiness -= 5;

  addNews(
    `🎓 Has completado ${edu.name}.`
  );

  notify("🎓 ¡Educación mejorada!");

  updateUI();
}

function renderFame() {

  const container =
    document.getElementById("fameGrid");

  container.innerHTML = fameActions.map((item, index) => {

    return `
      <div class="card">

        <div class="card-icon">
          ${item.name.split(" ")[0]}
        </div>

        <h3>
          ${item.name.substring(item.name.indexOf(" ") + 1)}
        </h3>

        <p>
          Coste: ${money(item.cost)}<br>
          Fama: +${item.fame}<br>
          Seguidores: +${item.followers}
        </p>

        <button
          class="primary"
          onclick="fameAction(${index})"
        >
          Hacer
        </button>

      </div>
    `;

  }).join("");
}

function fameAction(index) {

  const item = fameActions[index];

  if (game.money < item.cost) {
    notify("💸 No tienes suficiente dinero.");
    return;
  }

  game.money -= item.cost;

  game.fame += item.fame;
  game.followers += item.followers;

  game.happiness += 3;

  addNews(
    `⭐ Tu fama aumentó +${item.fame}.`
  );

  notify("⭐ ¡Tu fama ha aumentado!");

  updateUI();
}

function renderShop() {

  const container =
    document.getElementById("shopGrid");

  container.innerHTML = shops.map((item, index) => {

    const owned =
      item.home && game.home === item.home;

    return `
      <div class="card">

        <div class="card-icon">
          ${item.name.split(" ")[0]}
        </div>

        <h3>
          ${item.name.substring(item.name.indexOf(" ") + 1)}
        </h3>

        <p>
          Precio: ${money(item.price)}<br>
          Felicidad: +${item.happiness}
        </p>

        <button
          class="primary"
          onclick="buyItem(${index})"
          ${owned ? "disabled" : ""}
        >
          ${owned ? "✓ Comprado" : "Comprar"}
        </button>

      </div>
    `;

  }).join("");
}

function buyItem(index) {

  const item = shops[index];

  if (game.money < item.price) {
    notify("💸 No tienes suficiente dinero.");
    return;
  }

  game.money -= item.price;

  game.happiness += item.happiness;

  if (item.home) {
    game.home = item.home;
  }

  addNews(
    `🛒 Has comprado ${item.name}.`
  );

  notify(`🛒 Compra realizada.`);

  updateUI();
}

function deposit() {

  const input =
    document.getElementById("bankAmount");

  const amount =
    Number(input.value);

  if (amount <= 0 || amount > game.money) {
    notify("❌ Cantidad inválida.");
    return;
  }

  game.money -= amount;
  game.bank += amount;

  input.value = "";

  addNews(
    `🏦 Depositaste ${money(amount)} en el banco.`
  );

  notify("🏦 Dinero depositado.");

  updateUI();
}

function withdraw() {

  const input =
    document.getElementById("bankAmount");

  const amount =
    Number(input.value);

  if (amount <= 0 || amount > game.bank) {
    notify("❌ Cantidad inválida.");
    return;
  }

  game.bank -= amount;
  game.money += amount;

  input.value = "";

  notify("🏦 Dinero retirado.");

  updateUI();
}

function invest() {

  const input =
    document.getElementById("investmentAmount");

  const amount =
    Number(input.value);

  if (amount <= 0 || amount > game.money) {
    notify("❌ Cantidad inválida.");
    return;
  }

  game.money -= amount;
  game.investments += amount;

  input.value = "";

  addNews(
    `📈 Invertiste ${money(amount)}.`
  );

  notify("📈 Inversión realizada.");

  updateUI();
}

function sellInvestments() {

  if (game.investments <= 0) {
    notify("📈 No tienes inversiones.");
    return;
  }

  const change =
    Math.floor(
      game.investments *
      ((Math.random() * 0.30) - 0.10)
    );

  game.investments += change;

  if (game.investments < 0) {
    game.investments = 0;
  }

  game.money += game.investments;
  game.investments = 0;

  if (change >= 0) {
    notify(`📈 Ganaste ${money(change)}.`);
  } else {
    notify(`📉 El mercado cayó.`);
  }

  updateUI();
}

function renderActions() {

  const container =
    document.getElementById("actionsGrid");

  container.innerHTML = actions.map((item, index) => {

    return `
      <div class="card">

        <div class="card-icon">
          ${item.name.split(" ")[0]}
        </div>

        <h3>
          ${item.name.substring(item.name.indexOf(" ") + 1)}
        </h3>

        <p>${item.description}</p>

        <button
          class="primary"
          onclick="performAction(${index})"
        >
          Hacer
        </button>

      </div>
    `;

  }).join("");
}

function performAction(index) {

  actions[index].action();
}

function lottery() {

  const cost = 100;

  if (game.money < cost) {
    notify("💸 Necesitas $100.");
    return;
  }

  game.money -= cost;

  const chance = Math.random();

  if (chance < 0.08) {

    const prize = 5000;

    game.money += prize;

    addNews(
      `🎉 Ganaste ${money(prize)} en la lotería.`
    );

    notify("🎉 ¡GANASTE LA LOTERÍA!");

  } else {

    addNews(
      "🎟️ Compraste un boleto pero no ganaste."
    );

    notify("😔 No ganaste esta vez.");
  }

  updateUI();
}

function robbery() {

  if (game.money < 100) {
    notify("💸 Necesitas al menos $100.");
    return;
  }

  const success =
    Math.random() < 0.45;

  if (success) {

    const reward =
      Math.floor(Math.random() * 900) + 300;

    game.money += reward;

    game.fame = Math.max(0, game.fame - 2);

    addNews(
      `🚨 La acción salió bien y ganaste ${money(reward)}.`
    );

    notify("🚨 Ganaste dinero.");

  } else {

    const loss =
      Math.min(
        game.money,
        Math.floor(Math.random() * 500) + 100
      );

    game.money -= loss;

    game.happiness -= 8;

    game.fame = Math.max(0, game.fame - 5);

    addNews(
      `🚨 Te descubrieron y perdiste ${money(loss)}.`
    );

    notify("🚨 La acción salió mal.");
  }

  updateUI();
}

function travel() {

  const cost = 500;

  if (game.money < cost) {
    notify("✈️ Necesitas $500.");
    return;
  }

  game.money -= cost;
  game.happiness += 20;

  addNews(
    "✈️ Hiciste un viaje y descansaste."
  );

  notify("✈️ ¡Buen viaje!");

  updateUI();
}

function rest() {

  game.health += 8;
  game.happiness += 10;

  addNews(
    "🛌 Te tomaste un tiempo para descansar."
  );

  notify("🛌 Te sientes mejor.");

  updateUI();
}

function advanceMonth() {

  game.month++;

  if (game.month > 12) {

    game.month = 1;
    game.year++;
    game.age++;

    addNews(
      `🎂 Cumpliste ${game.age} años.`
    );
  }

  if (game.job) {

    game.money += game.job.salary;

    game.experience += game.job.xp;

    addNews(
      `💼 Recibiste ${money(game.job.salary)} por tu trabajo.`
    );
  }

  if (game.home) {

    game.money -= 100;

    addNews(
      "🏠 Pagaste $100 de gastos de vivienda."
    );
  }

  game.health -= 1;
  game.happiness -= 1;

  if (game.experience >= game.level * 100) {

    game.level++;

    game.experience = 0;

    addNews(
      `⭐ Subiste al nivel ${game.level}.`
    );
  }

  randomEvent();

  updateUI();

  notify("📅 Ha pasado un mes.");
}

function randomEvent() {

  const chance = Math.random();

  if (chance > 0.25) {
    return;
  }

  const events = [

    () => {

      game.money += 250;

      addNews(
        "🎁 Encontraste una pequeña recompensa de $250."
      );
    },

    () => {

      game.money = Math.max(
        0,
        game.money - 150
      );

      addNews(
        "💸 Tuviste un gasto inesperado de $150."
      );
    },

    () => {

      game.fame += 5;

      addNews(
        "📸 Alguien compartió tu contenido. +5 fama."
      );
    },

    () => {

      game.health -= 5;

      addNews(
        "🤒 Te sentiste mal durante unos días."
      );
    },

    () => {

      game.happiness += 10;

      addNews(
        "😊 Tuviste una semana increíble."
      );
    }
  ];

  events[
    Math.floor(Math.random() * events.length)
  ]();
}

function showSection(name, button) {

  document.querySelectorAll(".section")
    .forEach(section => {
      section.classList.remove("active");
    });

  document.getElementById(name)
    .classList.add("active");

  document.querySelectorAll(".tab")
    .forEach(tab => {
      tab.classList.remove("active");
    });

  if (button) {
    button.classList.add("active");
  }
}

function showSectionByName(name) {

  const buttons =
    document.querySelectorAll(".tab");

  let found = false;

  buttons.forEach(button => {

    if (
      button.textContent
        .toLowerCase()
        .includes(name === "compras" ? "compras" : "")
    ) {

      showSection(name, button);
      found = true;
    }
  });

  if (!found) {
    showSection(name);
  }
}

function saveGame() {

  localStorage.setItem(
    "lifesim_save",
    JSON.stringify(game)
  );

  notify("💾 Partida guardada.");
}

function loadGame() {

  const saved =
    localStorage.getItem("lifesim_save");

  if (!saved) {
    updateUI();
    return;
  }

  try {

    game = JSON.parse(saved);

    notify("💾 Partida cargada.");

  } catch {

    console.log("No se pudo cargar la partida.");
  }

  updateUI();
}

function resetGame() {

  const confirmation =
    confirm(
      "¿Seguro que quieres borrar tu partida?"
    );

  if (!confirmation) {
    return;
  }

  localStorage.removeItem("lifesim_save");

  location.reload();
}

loadGame();
