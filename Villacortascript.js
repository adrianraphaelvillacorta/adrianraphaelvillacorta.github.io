document.addEventListener("DOMContentLoaded", () => {
  const cursor = document.querySelector(".cursor")
  const cursorFollower = document.querySelector(".cursor-follower")
  const animatedTexts = document.querySelectorAll(".animate-text")
  const navLinks = document.querySelectorAll(".nav-link")
  const sections = document.querySelectorAll("section")

  const geometricBg = document.querySelector('.geometric-bg');
  let rotation = 0;

  function animateBackground() {
    rotation += 0.2;
    const scrollPosition = window.pageYOffset;
    
    geometricBg.style.setProperty('--scroll', `${scrollPosition * 0.5}px`);
    geometricBg.style.setProperty('--rotation', `${rotation}deg`);
    
    requestAnimationFrame(animateBackground);
  }

  animateBackground();
  // Cursor animation
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px"
    cursor.style.top = e.clientY + "px"

    setTimeout(() => {
      cursorFollower.style.left = e.clientX + "px"
      cursorFollower.style.top = e.clientY + "px"
    }, 100)
  })

  document.addEventListener("mousedown", () => {
    cursor.style.transform = "scale(0.8)"
    cursorFollower.style.transform = "scale(0.8)"
  })

  document.addEventListener("mouseup", () => {
    cursor.style.transform = "scale(1)"
    cursorFollower.style.transform = "scale(1)"
  })

  // Text animation
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")
        }
      })
    },
    { threshold: 0.1 },
  )

  animatedTexts.forEach((text) => {
    observer.observe(text)
  })

  // Project card hover effect
  const projectCards = document.querySelectorAll(".project-card")
  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      cursorFollower.style.transform = "scale(1.5)"
    })
    card.addEventListener("mouseleave", () => {
      cursorFollower.style.transform = "scale(1)"
    })
  })

  // Navigation highlight
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id")
          navLinks.forEach((link) => {
            if (link.getAttribute("href") === `#${id}`) {
              link.classList.add("active")
            } else {
              link.classList.remove("active")
            }
          })
        }
      })
    },
    { threshold: 0.5 },
  )

  sections.forEach((section) => {
    navObserver.observe(section)
  })

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const targetId = link.getAttribute("href")
      const targetSection = document.querySelector(targetId)
      targetSection.scrollIntoView({ behavior: "smooth" })
    })
  })
})

