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