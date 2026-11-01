// Shared page behavior: mobile menu, current year, and the GreenLine sample form.
(function () {
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    function setOpen(open) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.querySelector("span").textContent = open ? "Close" : "Menu";
      nav.classList.toggle("is-open", open);
    }
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  document.querySelectorAll("[data-current-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  // Sample form: checks the fields and shows a confirmation. Nothing is sent or stored.
  var form = document.querySelector("#demo-form");
  if (!form) return;
  var status = form.querySelector(".form-status");
  var rules = [
    { id: "visitor-name", message: "Enter your name.", ok: function (v) { return v.trim() !== ""; } },
    { id: "visitor-email", message: "Enter a valid email address.", ok: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); } },
    { id: "visitor-message", message: "Add a short message.", ok: function (v) { return v.trim() !== ""; } }
  ];
  rules.forEach(function (r) {
    var input = document.getElementById(r.id);
    input.addEventListener("input", function () {
      input.removeAttribute("aria-invalid");
      document.getElementById(r.id + "-error").textContent = "";
    });
  });
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    status.textContent = "";
    var firstBad = null;
    rules.forEach(function (r) {
      var input = document.getElementById(r.id);
      var bad = !r.ok(input.value);
      input.setAttribute("aria-invalid", String(bad));
      document.getElementById(r.id + "-error").textContent = bad ? r.message : "";
      if (bad && !firstBad) firstBad = input;
    });
    if (firstBad) { firstBad.focus(); return; }
    status.textContent = "Sample complete. This portfolio demo did not send or store your information.";
    form.reset();
  });
})();
