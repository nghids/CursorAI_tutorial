// Get DOM elements
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const celebration = document.querySelector('.celebration');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set canvas size
function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
setCanvasSize();
window.addEventListener('resize', setCanvasSize);

// No button interactions
function moveButton() {
    const actions = [
        () => {
            // Move randomly
            if (noBtn.textContent === 'No') {
                const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
                const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
                noBtn.style.position = 'fixed';
                noBtn.style.left = `${x}px`;
                noBtn.style.top = `${y}px`;
            }
        },
        () => {
            // Turn into Yes
            noBtn.textContent = 'Yes';
            noBtn.style.backgroundColor = '#ff4081';
        },
        () => {
            // Turn into heart
            noBtn.textContent = '❤️';
            noBtn.style.backgroundColor = '#ff4081';
        }
    ];

    // Choose random action only if current text is 'No'
    if (noBtn.textContent === 'No') {
        const randomAction = actions[Math.floor(Math.random() * actions.length)];
        randomAction();
    }
}

noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('click', showCelebration);
yesBtn.addEventListener('click', showCelebration);

// Celebration animation
function showCelebration() {
    celebration.style.display = 'flex';
    startAnimation();
}

// Animation elements
const hearts = [];
const flowers = [];
const chocolates = [];

class AnimationElement {
    constructor(type) {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 50;
        this.speed = 2 + Math.random() * 2;
        this.size = 20 + Math.random() * 20;
        this.type = type;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.1;
    }

    update() {
        this.y -= this.speed;
        this.rotation += this.rotationSpeed;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        switch(this.type) {
            case 'heart':
                this.drawHeart();
                break;
            case 'flower':
                this.drawFlower();
                break;
            case 'chocolate':
                this.drawChocolate();
                break;
        }
        
        ctx.restore();
    }

    drawHeart() {
        ctx.fillStyle = '#ff4081';
        ctx.beginPath();
        ctx.moveTo(0, -this.size/4);
        ctx.bezierCurveTo(this.size/4, -this.size/2, this.size/2, -this.size/4, 0, this.size/4);
        ctx.bezierCurveTo(-this.size/2, -this.size/4, -this.size/4, -this.size/2, 0, -this.size/4);
        ctx.fill();
    }

    drawFlower() {
        ctx.fillStyle = '#ff69b4';
        for(let i = 0; i < 5; i++) {
            ctx.beginPath();
            ctx.ellipse(0, -this.size/2, this.size/4, this.size/2, (i * Math.PI * 2) / 5, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.fillStyle = '#ffff00';
        ctx.beginPath();
        ctx.arc(0, 0, this.size/4, 0, Math.PI * 2);
        ctx.fill();
    }

    drawChocolate() {
        ctx.fillStyle = '#4a2f23';
        ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size);
        ctx.strokeStyle = '#2a1810';
        ctx.lineWidth = 2;
        ctx.strokeRect(-this.size/2, -this.size/2, this.size, this.size);
    }
}

function addElements() {
    if(Math.random() < 0.1) hearts.push(new AnimationElement('heart'));
    if(Math.random() < 0.05) flowers.push(new AnimationElement('flower'));
    if(Math.random() < 0.03) chocolates.push(new AnimationElement('chocolate'));
}

function updateElements(elements) {
    for(let i = elements.length - 1; i >= 0; i--) {
        elements[i].update();
        if(elements[i].y < -50) elements.splice(i, 1);
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    addElements();
    
    updateElements(hearts);
    updateElements(flowers);
    updateElements(chocolates);
    
    [...hearts, ...flowers, ...chocolates].forEach(element => element.draw());
    
    requestAnimationFrame(animate);
}

function startAnimation() {
    hearts.length = 0;
    flowers.length = 0;
    chocolates.length = 0;
    animate();
} 