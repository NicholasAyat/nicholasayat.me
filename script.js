/*

Document Name: script.js
Last Updated: August 2, 2023

# -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- #
# -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- NICHOLAS AYAT -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- #
# -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- #

*/

$(document).ready(function () {
  $(window).scroll(function () {
    
    // Sticky Navigation Bar When Scrolling

    if (this.scrollY > 20) {
      $(".navbar").addClass("sticky");
    } else {
      $(".navbar").removeClass("sticky");
    }

    // Show/Hide Scroll Button

    if (this.scrollY > 500) {
      $(".scroll-up-btn").addClass("show");
    } else {
      $(".scroll-up-btn").removeClass("show");
    }
  });

  // Slide-Up Scroll

  $(".scroll-up-btn").click(function () {
    $("html").animate({ scrollTop: 0 });
    
    // Removes smooth scroll when scroll is clicked
    $("html").css("scrollBehavior", "auto");
  });

  $(".navbar .menu li a").click(function () {
    // Applies smooth scroll when menu items are clicked
    $("html").css("scrollBehavior", "smooth");
  });

  // Toggle Navigation Bar
  $(".menu-btn").click(function () {
    $(".navbar .menu").toggleClass("active");
    $(".menu-btn i").toggleClass("active");
  });

  // Typing Text Seen on Home Page
  var typed = new Typed(".typing", {
    strings: ["Computer Science Student", "Software Engineer", "Leader"],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true,
  });

  var typed = new Typed(".typing-2", {
    strings: [
      "Computer Science Student Student",
      "Software Engineer",
      "Leader",
    ],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true,
  });
});

// Mail Section

document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.querySelector(".contact form");

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());

    // Validation for form fields
    if (!data.name || !data.email || !data.subject || !data.message) {
      showMessage("Please fill in all fields.", "error");
      return;
    }

    try {
      await sendMessage(data);
      showMessage("Message sent successfully!", "success");
      contactForm.reset();
    } catch (error) {
      showMessage("An error occurred. Please try again later.", "error");
    }
  });

  async function sendMessage(data) {
    // Server-side script
    const url = "smtp.elasticemail.com";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send message.");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  function showMessage(message, type) {
    console.log(message);
  }
});
