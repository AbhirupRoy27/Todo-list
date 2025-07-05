// Enhanced animation script
    function initializeAnimations() {
        const container = document.getElementById('animation-container');
        
        // Create hexagons less frequently
        for (let i = 0; i < 12; i++) {
            setTimeout(() => createHexagon(), i * 2000);
        }
        
        // Create energy lines less frequently
        for (let i = 0; i < 8; i++) {
            setTimeout(() => createEnergyLine(), i * 1500); // Stagger creation
        }
        
        // Create pulse rings less frequently
        setInterval(createPulseRing, 3000); // Increased interval

        function createHexagon() {
            const hex = document.createElement('div');
            hex.className = 'hex';
            hex.style.left = Math.random() * 100 + 'vw';
            hex.style.opacity = 0;
            container.appendChild(hex);
            
            // Remove hex after animation
            setTimeout(() => hex.remove(), 25000); // Increased duration
            // Create new hex
            setTimeout(createHexagon, 25000); // Increased interval
        }

        function createEnergyLine() {
            const line = document.createElement('div');
            line.className = 'energy-line';
            line.style.left = Math.random() * 100 + 'vw';
            container.appendChild(line);
            
            // Remove line after animation
            setTimeout(() => line.remove(), 12000); // Increased duration
            // Create new line
            setTimeout(createEnergyLine, 12000); // Increased interval
        }

        function createPulseRing() {
            const ring = document.createElement('div');
            ring.className = 'pulse-ring';
            ring.style.left = Math.random() * 100 + 'vw';
            ring.style.top = Math.random() * 100 + 'vh';
            ring.style.width = '10px';
            ring.style.height = '10px';
            container.appendChild(ring);
            
            // Remove ring after animation
            setTimeout(() => ring.remove(), 8000); // Increased duration
        }
    }

    // Initialize animations when page loads
    window.addEventListener('load', initializeAnimations);