const navLinks = document.querySelectorAll('header nav a');
const logoLink = document.querySelector('.logo');
const sections = document.querySelectorAll('section');
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('header nav');

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
});

const activePage = () => {
    const header = document.querySelector('header');
    const barsBox = document.querySelector('.bars-box');

    header.classList.remove('active');
    setTimeout(() => {
        header.classList.add('active');
    }, 1100);

    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    barsBox.classList.remove('active');
    setTimeout(() => {
        barsBox.classList.add('active');
    }, 1100);

    sections.forEach(section => {
        section.classList.remove('active');
    });

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
}

navLinks.forEach((link, idx) => {
    link.addEventListener('click', () => {
        if (!link.classList.contains('active')) {
            activePage();

            link.classList.add('active');

            // New functionality to persist active section
            localStorage.setItem('activeSectionIndex', idx); // Highlighted

            setTimeout(() => {
                sections[idx].classList.add('active');
            }, 1100);
        }
    });
});

logoLink.addEventListener('click', () => {
    if (!navLinks[0].classList.contains('active')) {
        activePage();

        navLinks[0].classList.add('active');

        // New functionality to persist home page
        localStorage.setItem('activeSectionIndex', 0); // Highlighted

        setTimeout(() => {
            sections[0].classList.add('active');
        }, 1100);
    }
});

const dashboardBtns = document.querySelectorAll('.dashboard-btn');

dashboardBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
        const dashboardDetails = document.querySelectorAll('.dashboard-detail');

        dashboardBtns.forEach(btn => {
            btn.classList.remove('active');
        });
        btn.classList.add('active');

        dashboardDetails.forEach(detail => {
            detail.classList.remove('active');
        });
        dashboardDetails[idx].classList.add('active');
    });
});

const arrowRight = document.querySelector('.portfolio-box .navigation .arrow-right');
const arrowLeft = document.querySelector('.portfolio-box .navigation .arrow-left');

let index =0;

const activePortfolio = () => {
    const imgSlide = document.querySelector('.portfolio-carousel .img-slide');
    const portfolioDetails = document.querySelectorAll('.portfolio-detail');

    imgSlide.style.transform = `translateX(calc(${index * -100}% - ${index * 2}rem))`;

    portfolioDetails.forEach(detail => {
        detail.classList.remove('active');
    });
    portfolioDetails[index].classList.add('active');
}

arrowRight.addEventListener('click', () => {
    if (index < 6) {
        index++;
        arrowLeft.classList.remove('disabled');  
    }
    else {
        index = 7;
        arrowRight.classList.add('disabled');
    }

    activePortfolio();
});

arrowLeft.addEventListener('click', () => {
    if (index > 1) {
        index--;
        arrowRight.classList.remove('disabled'); 
    }
    else {
        index = 0;
        arrowLeft.classList.add('disabled');
    }

    activePortfolio();
});


// New FUNCTIONALITY TO RESTORE ACTIVE SECTION ON PAGE REFRESH
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('header nav a'); // Select all nav links
    const logoLink = document.querySelector('.logo'); // Select the Home link (logo)
    const homeLink = document.querySelector('a.active'); // Select the Home nav link

    // Check if the user has visited a section and it's saved
    const savedIndex = localStorage.getItem('activeSectionIndex');
    const isPageRefreshed = performance.navigation.type === performance.navigation.TYPE_RELOAD;

    if (isPageRefreshed && savedIndex !== null) {
        // Restore the previously active section if the page was refreshed
        navLinks[savedIndex].click();
    } else {
        // Default to the home section when the site is launched
        homeLink.click();
    }

    // Save the current section index when a nav link is clicked
    navLinks.forEach((link, index) => {
        link.addEventListener('click', () => {
            localStorage.setItem('activeSectionIndex', index);
        });
    });
});



// PROCEED BUTTON NAVIGATES TO DASHBOARD
document.querySelector('.btn').addEventListener('click', function (event) {
  event.preventDefault(); // Prevent default behavior of the anchor tag

  // Find the "Dashboard" nav link and trigger a click
  const dashboardNavLink = Array.from(document.querySelectorAll('nav a')).find(link => link.textContent.trim() === 'Dashboard');
  if (dashboardNavLink) {
    dashboardNavLink.click();
  } else {
    console.error('Dashboard navigation link not found!');
  }
});


