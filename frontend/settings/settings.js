// Function to highlight the active link in the navbar
function highlightLink(event) {
    // Prevent default anchor behavior
    event.preventDefault();

    // Remove 'active' class from all links
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        link.classList.remove('active');
    });

    // Add 'active' class to the clicked link
    event.target.classList.add('active');

    // Scroll to the corresponding section smoothly
    const targetId = event.target.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Add event listeners after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        link.addEventListener('click', highlightLink);
    });
});
