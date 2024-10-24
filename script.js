document.getElementById("launch-video").onended = function () {
    // Fade out the video and show the launch text
    document.getElementById("video-container").style.animation = "fadeOut 1s forwards";
    setTimeout(() => {
        document.getElementById("video-container").style.display = "none";
        document.getElementById("launch-container").classList.remove("hidden");
    }, 1000); // 1-second delay for fade-out effect
};

const lever = document.getElementById('lever');
let dragging = false;

// Add drag events for the lever
lever.addEventListener('mousedown', function () {
    dragging = true;
    lever.classList.add('pull-down'); // Add rotation when pulling down
});

document.addEventListener('mousemove', function (event) {
    if (dragging) {
        const leverHeight = 180; // lever height
        const containerHeight = 250; // container height
        let newTop = event.clientY - leverHeight / 2;

        if (newTop < 0) newTop = 0; // Don't allow dragging beyond the top
        if (newTop > containerHeight - leverHeight) newTop = containerHeight - leverHeight; // Don't allow dragging beyond the bottom

        lever.style.top = newTop + 'px';

        // If lever is dragged to the bottom, trigger the countdown
        if (newTop >= containerHeight - leverHeight) {
            dragging = false;
            lever.classList.remove('pull-down'); // Remove rotation after pull
            pullLever();
        }
    }
});

document.addEventListener('mouseup', function () {
    if (dragging) {
        dragging = false;
        lever.classList.remove('pull-down'); // Reset rotation when mouse is released
    }
});

function pullLever() {
    // Fade out the launch text and lever
    document.getElementById("launch-container").style.animation = "fadeOut 1s forwards";
    setTimeout(() => {
        document.getElementById("launch-container").style.display = "none";
        startCountdown();
    }, 1000); // 1-second delay for fade-out effect
}

function startCountdown() {
    const countdownContainer = document.getElementById("countdown-container");
    countdownContainer.classList.remove("hidden");

    let count = 3;
    const countdownElement = document.getElementById("countdown");
    countdownElement.textContent = count;

    const countdownInterval = setInterval(() => {
        count--;
        countdownElement.textContent = count;

        if (count === 0) {
            clearInterval(countdownInterval);
            // Redirect to the Signodes website
            window.location.href = "https://www.signodes.in/";
        }
    }, 1000); // Countdown every 1 second
}
