document.addEventListener("DOMContentLoaded", () => {
  // inicializar íconos de Lucide
  if (window.lucide) {
    lucide.createIcons();
  }});

  // menú movil 

 const menuToggle = document.getElementById("menu-toggle");
  const mobileNav = document.getElementById("mobile-nav");
  const mobileLinks = document.querySelectorAll(".mobile-link");


  const setMenuState = (isOpen) => {
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    mobileNav.hidden = !isOpen;

  }


  // validación del formulario

  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");


  if (contactForm) {
    const fields = {
      name: {
        input: document.getElementById("name"),
        error: document.getElementById("error-name"),
      },
      email: {
        input: document.getElementById("email"),
        error: document.getElementById("error-email"),
      },
      message: {
        input: document.getElementById("message"),
        error: document.getElementById("error-message"),
      },
    };


    const validateForm = () => {
      const errors = {};
      const nameVal = fields.name.input.value;
      const emailVal = fields.email.input.value;
      const messageVal = fields.message.input.value;


      if (!nameVal.trim()) {
        errors.name = "¿A nombre de quién podemos dirigirnos?";
      } else if (nameVal.length > 100) {
        errors.name = "Máximo 120 caracteres.";
      }


      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal.trim())) {
        errors.email = "¿Dónde podemos enviarte nuestra respuesta?";
      }


      if (messageVal.trim().length < 10) {
        errors.message = "Cuéntanos cómo podemos ayudarte.";
      } else if (messageVal.length > 1000) {
        errors.message = "Máximo 1000 caracteres.";
      }


      return errors;
    };


    const renderErrors = (errors) => {
      Object.keys(fields).forEach((key) => {
        const { input, error } = fields[key];
        if (errors[key]) {
          error.textContent = errors[key];
          input.classList.add("is-invalid");
        } else {
          error.textContent = "";
          input.classList.remove("is-invalid");
        }
      });
    };

    //Limpiar el formulario despúes de enviarlo para volver a enviar otro mensaje.

    Object.values(fields).forEach(({ input }) => {
      input.addEventListener("input", () => {
        formStatus.hidden = true;
      });
    });


    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const errors = validateForm();
      renderErrors(errors);


      const isValid = Object.keys(errors).length === 0;
      formStatus.hidden = !isValid;
    });
  }