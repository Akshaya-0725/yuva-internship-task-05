const routes = {
  home: {
    title: "Welcome to NovaSpace",
    content: `
      <section class="page hero">
        <h1>Build. Explore. Connect.</h1>
        <p>
          Welcome to NovaSpace, a simple Single Page Application simulation.
          Navigate through the website without a full page reload.
        </p>
        <a class="btn" href="/services" data-route="services">Explore Services</a>
      </section>
    `
  },

  about: {
    title: "About",
    content: `
      <section class="page">
        <div class="section-title">
          <h1>About NovaSpace</h1>
          <p>A simple project demonstrating modern frontend concepts.</p>
        </div>
        <div class="card">
          <h3>Our Concept</h3>
          <p>
            This SPA uses HTML, CSS and JavaScript to dynamically update the
            content area. The History API changes the URL while keeping the
            same HTML document loaded.
          </p>
        </div>
      </section>
    `
  },

  services: {
    title: "Services",
    content: `
      <section class="page">
        <div class="section-title">
          <h1>Our Services</h1>
          <p>Example services displayed dynamically through JavaScript.</p>
        </div>
        <div class="grid">
          <article class="card">
            <h3>Web Design</h3>
            <p>Responsive and user-friendly webpage interfaces.</p>
          </article>
          <article class="card">
            <h3>Frontend Development</h3>
            <p>Interactive interfaces using modern frontend technologies.</p>
          </article>
          <article class="card">
            <h3>SPA Development</h3>
            <p>Fast navigation using client-side routing and DOM updates.</p>
          </article>
        </div>
      </section>
    `
  },

  contact: {
    title: "Contact",
    content: `
      <section class="page">
        <div class="section-title">
          <h1>Contact Us</h1>
          <p>Send a message using the sample form below.</p>
        </div>
        <form class="form" id="contactForm">
          <label for="name">Name</label>
          <input id="name" type="text" required placeholder="Enter your name">

          <label for="email">Email</label>
          <input id="email" type="email" required placeholder="Enter your email">

          <label for="message">Message</label>
          <textarea id="message" required placeholder="Enter your message"></textarea>

          <button class="btn" type="submit">Send Message</button>
        </form>
      </section>
    `
  }
};

const app = document.getElementById("app");

function getRoute() {
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  if (path === "/") return "home";
  return path.substring(1).split("/")[0];
}

function render(route = getRoute()) {
  if (!routes[route]) {
    app.innerHTML = `
      <section class="page error">
        <h1>404</h1>
        <p>Sorry, the requested page was not found.</p>
        <br>
        <a class="btn" href="/" data-route="home">Go Home</a>
      </section>
    `;
    updateActiveLink("");
    return;
  }

  app.innerHTML = routes[route].content;
  document.title = `${routes[route].title} | NovaSpace`;
  updateActiveLink(route);

  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      alert("Thank you! Your message has been submitted.");
      form.reset();
    });
  }
}

function updateActiveLink(route) {
  document.querySelectorAll("nav a").forEach((link) => {
    link.classList.toggle("active", link.dataset.route === route);
  });
}

function navigate(route) {
  const url = route === "home" ? "/" : `/${route}`;
  history.pushState({ route }, "", url);
  render(route);
}

document.addEventListener("click", (event) => {
  const link = event.target.closest("a[data-route]");
  if (!link) return;

  event.preventDefault();
  navigate(link.dataset.route);
});

window.addEventListener("popstate", () => {
  render();
});

render();
