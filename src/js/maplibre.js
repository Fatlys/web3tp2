// Maplibre - Gestion des données et interactions avancées
document.addEventListener('DOMContentLoaded', function() {
    
    // Système de coordonnées et tracking
    const coordinateSystem = {
        x: 0,
        y: 0,
        z: 0,
        tracking: false
    };

    // Simulateur de position
    function updateCoordinates() {
        if (coordinateSystem.tracking) {
            coordinateSystem.x += (Math.random() - 0.5) * 10;
            coordinateSystem.y += (Math.random() - 0.5) * 10;
            coordinateSystem.z += (Math.random() - 0.5) * 5;

            // Mise à jour de l'affichage si un élément existe
            const coordDisplay = document.querySelector('.coordinates-display');
            if (coordDisplay) {
                coordDisplay.innerHTML = `
                    X: ${coordinateSystem.x.toFixed(2)}<br>
                    Y: ${coordinateSystem.y.toFixed(2)}<br>
                    Z: ${coordinateSystem.z.toFixed(2)}
                `;
            }
        }
    }

    // Gestionnaire de données de puissance
    const powerManager = {
        currentPower: 3000000,
        maxPower: 1200000000,
        
        calculatePercentage() {
            return (this.currentPower / this.maxPower * 100).toFixed(2);
        },
        
        increasePower(amount) {
            this.currentPower = Math.min(this.currentPower + amount, this.maxPower);
            this.updateDisplay();
        },
        
        updateDisplay() {
            console.log(`Puissance actuelle: ${this.currentPower.toLocaleString()} (${this.calculatePercentage()}%)`);
        }
    };

    // Système d'événements personnalisés
    const hudEvents = {
        listeners: {},
        
        on(event, callback) {
            if (!this.listeners[event]) {
                this.listeners[event] = [];
            }
            this.listeners[event].push(callback);
        },
        
        emit(event, data) {
            if (this.listeners[event]) {
                this.listeners[event].forEach(callback => callback(data));
            }
        }
    };

    // Écoute des événements de verrouillage
    hudEvents.on('targetLocked', (data) => {
        console.log('🎯 Target locked:', data);
        coordinateSystem.tracking = true;
    });

    hudEvents.on('targetUnlocked', (data) => {
        console.log('🎯 Target unlocked:', data);
        coordinateSystem.tracking = false;
    });

    // Intégration avec le bouton de verrouillage
    const lockBtn = document.getElementById('lockBtn');
    if (lockBtn) {
        lockBtn.addEventListener('click', function() {
            const isLocked = lockBtn.querySelector('.lock-text').textContent === 'Déverrouiller Cible';
            
            if (isLocked) {
                hudEvents.emit('targetLocked', { 
                    timestamp: Date.now(),
                    target: 'Enemy',
                    distance: Math.random() * 1000
                });
            } else {
                hudEvents.emit('targetUnlocked', { 
                    timestamp: Date.now() 
                });
            }
        });
    }

    // Gestionnaire de données du tableau
    const tableManager = {
        data: [
            { form: 'Base', power: 3000000 },
            { form: 'Super Saiyan', power: 150000000 },
            { form: 'Super Saiyan 2', power: 300000000 },
            { form: 'Super Saiyan 3', power: 1200000000 }
        ],
        
        getFormByName(name) {
            return this.data.find(form => form.form === name);
        },
        
        getTotalPower() {
            return this.data.reduce((sum, form) => sum + form.power, 0);
        },
        
        getAveragePower() {
            return this.getTotalPower() / this.data.length;
        }
    };

    // Animation des valeurs du tableau
    function animateTableValues() {
        const table = document.getElementById('powerTable');
        if (table) {
            const cells = table.querySelectorAll('tbody td:nth-child(2)');
            
            cells.forEach(cell => {
                const originalValue = cell.textContent;
                const numValue = parseInt(originalValue.replace(/,/g, ''));
                
                cell.addEventListener('mouseenter', function() {
                    let counter = 0;
                    const interval = setInterval(() => {
                        counter += numValue / 20;
                        if (counter >= numValue) {
                            counter = numValue;
                            clearInterval(interval);
                        }
                        cell.textContent = Math.floor(counter).toLocaleString();
                    }, 50);
                });
                
                cell.addEventListener('mouseleave', function() {
                    cell.textContent = originalValue;
                });
            });
        }
    }

    // Système de notification
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            background: rgba(0, 255, 0, 0.9);
            color: #000;
            border-radius: 5px;
            font-weight: bold;
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Initialisation
    animateTableValues();
    setInterval(updateCoordinates, 100);
    
    // Message de bienvenue
    setTimeout(() => {
        showNotification('🎯 HUD System Ready', 'success');
    }, 1000);

    console.log('📊 Power Manager:', tableManager.getTotalPower().toLocaleString());
    console.log('📍 Coordinate System: Active');
});