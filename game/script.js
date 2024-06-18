let scene, camera, renderer, player, coins = [], score = 0, startTime, timerInterval;
let moveForward = false, moveBackward = false, moveLeft = false, moveRight = false;
let keyBindings = {
    forward: 'ArrowUp',
    backward: 'ArrowDown',
    left: 'ArrowLeft',
    right: 'ArrowRight'
};

// Multiplayer setup (socket.io) - Example setup
const socket = io(); // Replace with your own socket.io setup

// Initialize the game
init();
animate();

// Initialize the game scene, camera, controls, etc.
function init() {
    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87CEEB); // Sky blue background

    // Camera setup (third-person view)
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 10);
    camera.lookAt(0, 2, 0);

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Lighting setup
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 10, 7.5);
    scene.add(light);

    // Floor setup (Example: Los Santos cityscape)
    const loader = new THREE.TextureLoader();
    const floorTexture = loader.load('assets/los_santos.jpg'); // Replace with your city texture
    const floorGeometry = new THREE.PlaneGeometry(100, 100);
    const floorMaterial = new THREE.MeshPhongMaterial({ map: floorTexture });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);

    // Player setup (GTA-style character)
    const playerGeometry = new THREE.BoxGeometry(1, 2, 0.5); // Adjust dimensions for GTA-style character
    const playerMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    player = new THREE.Mesh(playerGeometry, playerMaterial);
    player.position.set(0, 1, 0); // Position the player slightly above the ground
    scene.add(player);

    // Coins setup
    const coinGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.1, 32);
    const coinMaterial = new THREE.MeshPhongMaterial({ color: 0xffff00 });
    for (let i = 0; i < 10; i++) {
        const coin = new THREE.Mesh(coinGeometry, coinMaterial);
        coin.position.set(Math.random() * 20 - 10, 0.1, Math.random() * 20 - 10);
        coin.rotation.x = Math.PI / 2;
        coins.push(coin);
        scene.add(coin);
    }

    // Event listeners for player controls
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    // Event listener for menu toggle
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            toggleMenu();
        }
    });

    // Start the game timer
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
}

// Animate function to update game state
function animate() {
    requestAnimationFrame(animate);

    // Player movement based on keyboard input
    const speed = 0.1;
    if (moveForward) player.position.z -= speed;
    if (moveBackward) player.position.z += speed;
    if (moveLeft) player.position.x -= speed;
    if (moveRight) player.position.x += speed;

    // Update camera position and orientation
    updateCamera();

    // Handle coin collection
    coins.forEach((coin, index) => {
        if (player.position.distanceTo(coin.position) < 0.6) {
            scene.remove(coin);
            coins.splice(index, 1);
            score++;
            document.getElementById('score').innerText = `Score: ${score}`;
        }
    });

    // Render the scene
    renderer.render(scene, camera);
}

// Handle keyboard events for player movement
function onKeyDown(event) {
    switch (event.key) {
        case keyBindings.forward:
            moveForward = true;
            break;
        case keyBindings.backward:
            moveBackward = true;
            break;
        case keyBindings.left:
            moveLeft = true;
            break;
        case keyBindings.right:
            moveRight = true;
            break;
    }
}

function onKeyUp(event) {
    switch (event.key) {
        case keyBindings.forward:
            moveForward = false;
            break;
        case keyBindings.backward:
            moveBackward = false;
            break;
        case keyBindings.left:
            moveLeft = false;
            break;
        case keyBindings.right:
            moveRight = false;
            break;
    }
}

// Update timer function to display elapsed time
function updateTimer() {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    document.getElementById('timer').innerText = `Time: ${elapsedTime}s`;
}

// Function to toggle the menu display (example)
function toggleMenu() {
    const menu = document.getElementById('menu');
    const display = menu.style.display;
    if (display === 'none' || display === '') {
        menu.style.display = 'flex';
        clearInterval(timerInterval); // Pause the timer
    } else {
        menu.style.display = 'none';
        startTime += Date.now() - (startTime + timerInterval); // Adjust start time
        timerInterval = setInterval(updateTimer, 1000); // Resume the timer
    }
}

// Function to save game settings (example: brightness, keybindings)
function saveSettings() {
    const brightness = document.getElementById('brightness').value;
    renderer.setClearColor(0xffffff, brightness);

    keyBindings.forward = document.getElementById('keybinds-forward').value;
    keyBindings.backward = document.getElementById('keybinds-backward').value;
    keyBindings.left = document.getElementById('keybinds-left').value;
    keyBindings.right = document.getElementById('keybinds-right').value;

    toggleMenu(); // Close menu after saving settings
}

// Function to handle game exit
function exitGame() {
    document.removeEventListener('keydown', onKeyDown);
    document.removeEventListener('keyup', onKeyUp);

    clearInterval(timerInterval);

    coins.forEach(coin => {
        scene.remove(coin);
    });
    coins = [];

    scene.remove(player);
    player = null;

    scene = null;

    renderer.dispose();
    renderer.domElement = null;
    renderer = null;

    window.location.href = 'index.html'; // Redirect or handle game exit logic
}

// Optional: Event listener for window resize to adjust renderer size
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
});

// Optional: Function to update camera position based on player movement
function updateCamera() {
    const cameraOffset = new THREE.Vector3(0, 2, 5); // Adjust camera offset as needed
    const playerPosition = player.position.clone().add(cameraOffset);
    camera.position.lerp(playerPosition, 0.1); // Smoothly interpolate camera position
    camera.lookAt(player.position);
}
