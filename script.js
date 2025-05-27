/*

Document Name: script.js
Last Updated: May 27, 2025

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
    strings: ["Computer Science Student", "Software Engineer", "Team Player"],
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

// Contact Form Handling
$(document).ready(function() {
    $('form[action*="formspree.io"]').on('submit', function(e) {
        e.preventDefault();
        
        const form = $(this);
        const messageDiv = $('#form-message');
        
        // Disable submit button and show loading state
        const submitBtn = form.find('button[type="submit"]');
        const originalBtnText = submitBtn.text();
        submitBtn.prop('disabled', true).text('Sending...');
        
        // Clear previous messages
        messageDiv.removeClass('success error').empty();
        
        // Send form data
        $.ajax({
            type: 'POST',
            url: form.attr('action'),
            data: form.serialize(),
            dataType: 'json',
            success: function(response) {
                messageDiv.addClass('success').text('Message sent successfully! I will get back to you soon.');
                form[0].reset();
            },
            error: function(xhr) {
                let errorMessage = 'An error occurred. Please try again later.';
                if (xhr.responseJSON && xhr.responseJSON.error) {
                    errorMessage = xhr.responseJSON.error;
                }
                messageDiv.addClass('error').text(errorMessage);
            },
            complete: function() {
                // Re-enable submit button
                submitBtn.prop('disabled', false).text(originalBtnText);
            }
        });
    });
});

// Section Fade-In on Scroll
$(document).ready(function() {
    const $sections = $('section');
    $sections.addClass('fade-in-section');
    function revealSections() {
        $sections.each(function() {
            const $section = $(this);
            const rect = this.getBoundingClientRect();
            if (rect.top < window.innerHeight - 80) {
                $section.addClass('visible');
            }
        });
    }
    revealSections();
    $(window).on('scroll resize', revealSections);
});

// Intro Overlay Animation on Page Load
window.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('intro-overlay');
    if (overlay) {
        setTimeout(() => {
            overlay.classList.add('hide');
            setTimeout(() => overlay.remove(), 900);
        }, 1500);
    }
});
