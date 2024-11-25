document.addEventListener('DOMContentLoaded', () => {
    particlesJS("particles-js", {
      particles: {
        number: {
          value: 80, 
          density: {
            enable: true, 
            value_area: 800
          }
        },
        color: {
          value: "#00ffff"
        },
        shape: {
          type: "circle"
        },
        opacity: {
          value: 0.5, 
          random: false
        },
        size: {
          value: 3, 
          random: true
        },
        line_linked: {
          enable: true, 
          distance: 150, 
          color: "#00ffff", 
          opacity: 0.4, 
          width: 1
        },
        move: {
          enable: true, 
          speed: 2, 
          direction: "none", 
          random: false, 
          straight: false, 
          out_mode: "out", 
          bounce: false
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true, 
            mode: "repulse"
          }, 
          onclick: {
            enable: true, 
            mode: "repulse"
          }, 
          resize: true
        },
        modes: {
          repulse: {
            distance: 100, 
            duration: 0.4
          },
          push: {
            particles_nb: 0 
          }
        }
      },
      retina_detect: true
    });
    const goToTop = document.querySelector('.go-to-top');

    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 100) {
        goToTop.classList.add('active');
      } else {
        goToTop.classList.remove('active');
      }
    });
  
    goToTop.addEventListener('click',
      () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        playSound('scrollTopSound');
      });
  
    goToTop.addEventListener('mousemove',
      (e) => {
        const rect = goToTop.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
  
        goToTop.style.setProperty('--mouse-x', `${x}px`);
        goToTop.style.setProperty('--mouse-y', `${y}px`);
      });
  
    const scrollProgress = document.querySelector('.scroll-progress');
  
    function updateScrollProgress() {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercentage = (scrollTop / scrollHeight) * 100;
      scrollProgress.style.width = scrollPercentage + '%';
    }
  
    window.addEventListener('scroll',
      updateScrollProgress);
    let isScrolling;
    window.addEventListener('scroll',
      () => {
        clearTimeout(isScrolling);
        document.body.classList.add('is-scrolling');
  
        isScrolling = setTimeout(() => {
          document.body.classList.remove('is-scrolling');
        }, 300);
      });

    
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  let isMenuOpen = false;

  hamburger.addEventListener('click',
    () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
      isMenuOpen = !isMenuOpen;
      playSound(isMenuOpen ? 'menuOpenSound': 'menuCloseSound');
    });

  document.querySelectorAll('.nav-links li').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  }));

  const navItems = document.querySelectorAll('.nav-links li a');
  navItems.forEach(item => {
    item.addEventListener('mouseover', () => {
      item.style.setProperty('--random-x', `${Math.random() * 100}%`);
      item.style.setProperty('--random-y', `${Math.random() * 100}%`);
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  const downloadBtn = document.querySelector('.btn-download');
  downloadBtn.addEventListener('mousemove',
    (e) => {
      const rect = downloadBtn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      downloadBtn.style.setProperty('--mouse-x', `${x}px`);
      downloadBtn.style.setProperty('--mouse-y', `${y}px`);
    });

  const aboutImage = document.querySelector('.about-image');
  window.addEventListener('mousemove',
    (e) => {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      aboutImage.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px)`;
    });

  const serviceItems = document.querySelectorAll('.service-item');
  serviceItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    });
    item.addEventListener('mouseleave', () => {
      item.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
    });
  });

  const skillItems = document.querySelectorAll('.skill-item');
  skillItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    });
    item.addEventListener('mouseleave', () => {
      item.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
    });
  });

  const projectItems = document.querySelectorAll('.project-item');
  const animateProjects = () => {
    projectItems.forEach((item, index) => {
      setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }, index * 200);
    });
  };
