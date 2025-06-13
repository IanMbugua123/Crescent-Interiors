    // Navbar scroll effect
    window.addEventListener('scroll', function() {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
    
   // Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');

    // Skip if href is just "#" or not a valid target
    if (!targetId || targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: 'smooth'
      });
    }
  });
});

    
    // Back to top button
    window.addEventListener('scroll', function() {
      const backToTopButton = document.querySelector('.back-to-top');
      if (window.scrollY > 300) {
        backToTopButton.classList.add('active');
      } else {
        backToTopButton.classList.remove('active');
      }
    });
    
    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Animation on scroll
    function animateOnScroll() {
      const elements = document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card');
      
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }
      });
    }
    
    // Set initial state for animated elements
    document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card').forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'all 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);

    // Scroll to top when back-to-top button is clicked
document.querySelector('.back-to-top').addEventListener('click', function(e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

//whatapp
document.addEventListener("DOMContentLoaded", function () {
  const whatsappButton = document.getElementById("whatsapp-button");
  const heroSection = document.querySelector("#home");

  if (!heroSection || !whatsappButton) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      whatsappButton.style.display = entry.isIntersecting ? "none" : "block";
    });
  }, {
    root: null,
    threshold: 0.1
  });

  observer.observe(heroSection);
});

// spark effect 

const canvas = document.getElementById("sparkCanvas");
const ctx = canvas.getContext("2d");

// Configurable settings
const sparkColor = "#997A93";
const sparkSize = 10;
const sparkRadius = 15;
const sparkCount = 8;
const duration = 400;
const easing = "ease-out";
const extraScale = 1.0;

// Resize canvas to full window
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Easing function
function easeFunc(t) {
  switch (easing) {
    case "linear":
      return t;
    case "ease-in":
      return t * t;
    case "ease-in-out":
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    default:
      return t * (2 - t); // ease-out
  }
}

const sparks = [];

function draw(timestamp) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = sparks.length - 1; i >= 0; i--) {
    const spark = sparks[i];
    const elapsed = timestamp - spark.startTime;

    if (elapsed >= duration) {
      sparks.splice(i, 1);
      continue;
    }

    const progress = elapsed / duration;
    const eased = easeFunc(progress);

    const distance = eased * sparkRadius * extraScale;
    const lineLength = sparkSize * (1 - eased);

    const x1 = spark.x + distance * Math.cos(spark.angle);
    const y1 = spark.y + distance * Math.sin(spark.angle);
    const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
    const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

    ctx.strokeStyle = sparkColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  requestAnimationFrame(draw);
}

// Start animation
requestAnimationFrame(draw);

// Handle click
document.addEventListener("click", (e) => {
  const x = e.clientX;
  const y = e.clientY;
  const now = performance.now();

  for (let i = 0; i < sparkCount; i++) {
    const angle = (2 * Math.PI * i) / sparkCount;
    sparks.push({
      x,
      y,
      angle,
      startTime: now,
    });
  }
});


