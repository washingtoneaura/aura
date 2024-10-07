document.addEventListener('DOMContentLoaded', function() {
    // Assuming you have a div with id 'navbar-container' in your HTML where the navbar will be injected
    var navbarContainer = document.getElementById('navbar-container');

    if (navbarContainer) {
        // Load the navigation HTML as a string
        var navbarHTML = `
        <div class="container-fluid position-relative p-0">
            <nav class="navbar navbar-expand-lg navbar-dark px-5 py-3 py-lg-0">
                <a href="index.html" class="navbar-brand p-0">
                    <h1 class="m-0">
                        <!--<i class="fa fa-user-tie me-2"></i>AuraW.-->
                        <img src="img/logo1.png" alt="" style="width: 60px; height: 60px; margin-right: 8px;">AuraW.
                    </h1>
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span class="fa fa-bars"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarCollapse">
                    <div class="navbar-nav ms-auto py-0">
                        <a href="index.html" class="nav-item nav-link">Home</a>
                        <a href="about.html" class="nav-item nav-link">About</a>
                        <a href="services.html" class="nav-item nav-link">Services</a>
                        <a href="projects.html" class="nav-item nav-link">Projects</a>
                        <div class="nav-item dropdown">
                            <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Blog</a>
                            <div class="dropdown-menu m-0">
                                <a href="blog.html" class="dropdown-item">Blog Grid</a>
                                <a href="detail.html" class="dropdown-item">Blog Detail</a>
                            </div>
                        </div>
                        <div class="nav-item dropdown dp2">
                            <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</a>
                            <div class="dropdown-menu m-0">
                                <a href="price.html" class="dropdown-item">Pricing Plan</a>
                                <a href="feature.html" class="dropdown-item">My features</a>
                                <a href="team.html" class="dropdown-item">Team Members</a>
                                <a href="testimonial.html" class="dropdown-item">Testimonial</a>
                                <a href="quote.html" class="dropdown-item">Free Quote</a>
                            </div>
                        </div>
                        <a href="contact.html" class="nav-item nav-link">Contact</a>
                    </div>
                    <button type="button" class="btn text-primary ms-3" data-bs-toggle="modal" data-bs-target="#searchModal"><i class="fa fa-search"></i></button>
                    <a href="https://docs.google.com/document/d/1ZoWwtnR24EFEeCwgSPUhHtVQRc66L-YsKykPo0vSm7o/edit?usp=sharing" class="btn btn-primary py-2 px-4 ms-3" target="_blank">My CV</a>
                </div>
            </nav>            
        </div>
        `;

        // Inject the HTML
        navbarContainer.innerHTML = navbarHTML;

        // Get all navigation links
        var navLinks = document.querySelectorAll('.nav-item.nav-link, .dropdown-item');

        // Function to add/remove the active class
        const setActiveLink = (link) => {
            navLinks.forEach(link => {
                link.classList.remove('active'); // Remove active class from all links
            });
            link.classList.add('active'); // Add active class to the current link
            console.log(`Set ${link.href} as active`); // Log the action
        };

        // Determine the current page and set the active link
        //BELOW works locally
        //var currentPage = window.location.pathname.split('/').pop().replace('.html', '');// Adjusted to remove .html extension - local testing

        var currentPage = '';
        var isDomainHosted = window.location.protocol.includes('http');
        //var isDomainHosted = window.location.hostname !== ''; // Check if hostname exists - ALSO WORKS
        if (isDomainHosted) {
            // For domain-hosted pages, extract the last segment after the domain
            var pathSegments = window.location.pathname.split('/');
            currentPage = pathSegments[pathSegments.length - 1].replace('.html', ''); // Correctly assign the last segment
        } else {
            // For local pages, simply use the filename
            currentPage = window.location.pathname.split('/').pop().replace('.html', '');
        }

        var currentLink = document.querySelector(`.nav-item.nav-link[href="${currentPage}.html"], .nav-link.dropdown-toggle[href="${currentPage}.html"]`);
        if (currentLink) {
            console.log(`Current page is ${currentPage}, setting ${currentLink.href} as active`); // Log the current page and the action
            setActiveLink(currentLink);
        } else {
            console.log(`No matching link found for ${currentPage}`); // Log if no matching link is found
        }  

        // Initially set the dropdown toggle as active if the current page matches
        var blogDropdownToggle = document.querySelector('.nav-item.dropdown .nav-link.dropdown-toggle');
        if (blogDropdownToggle && (currentPage === 'blog' || currentPage === 'detail')) {
            setActiveLink(blogDropdownToggle);
        }

        var pagesDropdownToggle = document.querySelector('.nav-item.dropdown.dp2 .nav-link.dropdown-toggle');
        if (pagesDropdownToggle && (currentPage === 'price' || currentPage === 'feature' || currentPage === 'team' || currentPage === 'testimonial' || currentPage === 'quote')) {
            setActiveLink(pagesDropdownToggle);
        }

        var dropdownItems = document.querySelectorAll('.dropdown-item');
        dropdownItems.forEach(function(item) {
            item.addEventListener('click', function(event) {
                event.stopPropagation();
                var dropdownToggle = item.closest('.nav-item.dropdown').querySelector('.nav-link.dropdown-toggle');
                if (dropdownToggle) {
                    setActiveLink(dropdownToggle);
                }
            });
        });

    }
});