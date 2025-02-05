const statusElement = document.getElementById('status');
const fetchButton = document.getElementById('fetchButton');
const contentElement = document.getElementById('content');

// Check online/offline status
function updateOnlineStatus() {
    statusElement.textContent = navigator.onLine ? 'Online' : 'Offline';
    statusElement.style.color = navigator.onLine ? 'green' : 'red';
}

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);
updateOnlineStatus();

// Fetch data button functionality
fetchButton.addEventListener('click', () => {
    if (navigator.onLine) {
        fetch('https://api.github.com/users/github')
            .then(response => response.json())
            .then(data => {
                contentElement.textContent = `GitHub has ${data.public_repos} public repositories!`;
            })
            .catch(error => {
                contentElement.textContent = 'Error fetching data';
            });
    } else {
        contentElement.textContent = 'You are offline. This is cached content.';
    }
});

// Register service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(registration => console.log('Service Worker registered'))
            .catch(err => alert('Service Worker registration failed:\n' + err));
    });
}
