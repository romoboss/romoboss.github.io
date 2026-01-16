function redirectToWebsite(url) {
    window.location.href = url;
}

document.addEventListener("DOMContentLoaded", function() {
const footerHTML = `
    <div class="container">
        <div class="footer">
            <div class="aligned">
                <a href="/privacy"><p><b>Privacy Policy</b></p></a>
                <a href="/aboutme"><p><b>Contact Me</b></p></a>
            </div>
            <p>Copyright &copy; 2026 Romoboss Games. All rights reserved.</p>
            <p>Website Version 1.3</p>
        </div>
    </div>
`;
const homeButtonHTML = `
    <button onclick="redirectToWebsite('/')" class="home-button">
        <img src="https://romoboss.com/Images/Home01.png" alt="Home">
    </button>
`;

document.body.insertAdjacentHTML('beforeend', footerHTML);
document.body.insertAdjacentHTML('afterbegin', homeButtonHTML);
})
