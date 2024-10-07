(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    //new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });


    // Facts counter
    /*
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });*/
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

    // Carousel Scroll Functionality (Optional)
    const projectCarousel = document.querySelector('.project-carousel');
    
    if (projectCarousel) {
        let isDown = false;
        let startX;
        let scrollLeft;

        projectCarousel.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - projectCarousel.offsetLeft;
            scrollLeft = projectCarousel.scrollLeft;
        });

        projectCarousel.addEventListener('mouseleave', () => {
            isDown = false;
        });

        projectCarousel.addEventListener('mouseup', () => {
            isDown = false;
        });

        projectCarousel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - projectCarousel.offsetLeft;
            const walk = (x - startX) * 2; // Scroll-fast multiplier
            projectCarousel.scrollLeft = scrollLeft - walk;
        });
    }

    // Lightbox Replacement: Simple Image Modal
    const overlay = document.createElement('div');
    overlay.id = 'image-overlay';
    overlay.style.display = 'none';
    document.body.appendChild(overlay);

    document.querySelectorAll('.project-item a.fa-eye').forEach((el) => {
        el.addEventListener('click', function (e) {
            e.preventDefault();
            const imgSrc = this.getAttribute('href');
            overlay.innerHTML = `<img src="${imgSrc}" style="max-width: 90%; max-height: 90%; margin: auto; display: block;">`;
            overlay.style.display = 'flex';
            overlay.style.justifyContent = 'center';
            overlay.style.alignItems = 'center';
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        });
    });

    overlay.addEventListener('click', () => {
        overlay.style.display = 'none';
    });

    // JavaScript for controlling the scroll behavior
    const projectNextBtn = document.getElementById('project-next-btn');
    const projectPrevBtn = document.getElementById('project-prev-btn');

    if (projectCarousel && projectNextBtn && projectPrevBtn) {
         // Update: dynamically calculate the remaining scrollable area
         projectNextBtn.addEventListener('click', () => {
             // Get the total scrollable width
            const maxScrollLeft = projectCarousel.scrollWidth - projectCarousel.clientWidth;
            // Calculate the remaining scrollable distance
            const remainingScroll = maxScrollLeft - projectCarousel.scrollLeft;
            // Set scrollAmount to either 300 or the remaining scroll
            const scrollAmount = Math.min(300, remainingScroll);
            
            // Scroll the carousel
            projectCarousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });

            // Optional: Disable next button if we reach the end
            if (remainingScroll <= 0) {
                projectNextBtn.disabled = true; // Disable next button if at end
            } else {
                projectNextBtn.disabled = false; // Re-enable if not at end
            }
        });

        projectPrevBtn.addEventListener('click', () => {
            // Calculate how much to scroll back
            const scrollAmount = Math.min(300, projectCarousel.scrollLeft);
            
            // Scroll the carousel back
            projectCarousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });

            // Optional: Disable previous button if at start
            if (projectCarousel.scrollLeft <= 0) {
                projectPrevBtn.disabled = true; // Disable prev button if at start
            } else {
                projectPrevBtn.disabled = false; // Re-enable if not at start
            }
        });
    }    

    // Testimonials carousel
    /*$(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: true,
        loop: true,
        center: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });*/


    // Vendor carousel
    /*$('.vendor-carousel').owlCarousel({
        loop: true,
        margin: 45,
        dots: false,
        loop: true,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
            0:{
                items:2
            },
            576:{
                items:4
            },
            768:{
                items:6
            },
            992:{
                items:8
            }
        }
    });*/

    // Project and Testimonial carousel
    /*$(".project-carousel, .testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        loop: true,
        center: true,
        dots: false,
        nav: true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ],
        responsive: {
			0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });*/

    // Portfolio isotope and filter
   /* var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });*/
    
})(jQuery);

