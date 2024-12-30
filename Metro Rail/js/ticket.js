$(document).ready(function() {
    // Station data with distances (in km) from Uttara North
    const stationData = {
        'uttara': { name: 'Uttara North', distance: 0 },
        'uttara-center': { name: 'Uttara Center', distance: 1.2 },
        'uttara-south': { name: 'Uttara South', distance: 2.4 },
        'pallabi': { name: 'Pallabi', distance: 4.1 },
        'mirpur11': { name: 'Mirpur 11', distance: 5.6 },
        'mirpur10': { name: 'Mirpur 10', distance: 7.2 },
        'kazipara': { name: 'Kazipara', distance: 8.4 },
        'shewrapara': { name: 'Shewrapara', distance: 9.6 },
        'agargaon': { name: 'Agargaon', distance: 11.3 }
    };
     // Populate station dropdowns
     function populateStations() {
        const stations = Object.entries(stationData);
        const $fromStation = $('#fromStation');
        const $toStation = $('#toStation');

        stations.forEach(([value, data]) => {
            const option = `<option value="${value}">${data.name}</option>`;
            $fromStation.append(option);
            $toStation.append(option);
        });
    }

    populateStations();

    // Calculate fare based on distance and ticket type
    function calculateFare() {
        const fromStation = $('#fromStation').val();
        const toStation = $('#toStation').val();
        const ticketType = $('input[name="ticketType"]:checked').val();

        if (!fromStation || !toStation) return;

        const distance = Math.abs(
            stationData[toStation].distance - stationData[fromStation].distance
        );
        // Base fare calculation (20 taka base + 5 taka per km)
        let baseFare = 20 + (distance * 5);
        let serviceCharge = baseFare * 0.05; // 5% service charge

        // Adjust fare based on ticket type
        switch(ticketType) {
            case 'round':
                baseFare *= 1.9; // 5% discount on return journey
                break;
            case 'day':
                baseFare *= 2.5; // Day pass costs 2.5 times single journey
                break;
        }

        // Update fare display
        $('#baseFare').text(`৳${baseFare.toFixed(2)}`);
        $('#serviceCharge').text(`৳${serviceCharge.toFixed(2)}`);
        $('#totalFare').text(`৳${(baseFare + serviceCharge).toFixed(2)}`);
    }

    // Event listeners
    $('#fromStation, #toStation').change(calculateFare);
    $('input[name="ticketType"]').change(calculateFare);

    // Station swap functionality
    $('#swapStations').click(function() {
        const fromVal = $('#fromStation').val();
        const toVal = $('#toStation').val();
        
        $('#fromStation').val(toVal);
        $('#toStation').val(fromVal);
        calculateFare();
    });
    // Purchase ticket
    $('#purchaseTicket').click(function() {
        const fromStation = $('#fromStation').val();
        const toStation = $('#toStation').val();

        if (!fromStation || !toStation) {
            showNotification('Please select both stations');
            return;
        }

        if (fromStation === toStation) {
            showNotification('Please select different stations');
            return;
        }

        // Check if user is logged in (implement this based on your authentication system)
        const isLoggedIn = false; // This should be replaced with actual auth check

        if (!isLoggedIn) {
            showLoginPrompt();
            return;
        }

        // Proceed with purchase (implement actual payment integration)
        showNotification('Proceeding to payment...');
    });

    // Show login prompt
    function showLoginPrompt() {
        const loginPrompt = $(`
            <div class="login-prompt">
                <div class="login-content">
                    <h3>Login Required</h3>
                    <p>Please log in to purchase tickets</p>
                    <div class="login-buttons">
                        <button class="login-btn">Login</button>
                        <button class="register-btn">Register</button>
                    </div>
                </div>
            </div>
        `).appendTo('body');
        loginPrompt.find('.login-btn').click(function() {
            window.location.href = 'login.html';
        });
        loginPrompt.find('.register-btn').click(function() {
            window.location.href = 'register.html';});

        loginPrompt.click(function(e) {
            if (e.target === this) {
                loginPrompt.remove();
            }
        });

        // Add these styles
        const styles = `
            .login-prompt {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
            }

            .login-content {
                background: white;
                padding: 2rem;
                border-radius: 10px;
                text-align: center;
            }

            .login-buttons {
                display: flex;
                gap: 1rem;
                margin-top: 1.5rem;
            }

            .login-btn, .register-btn {
                padding: 0.5rem 1.5rem;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                transition: background 0.3s;
            }

            .login-btn {
                background: var(--primary-color);
                color: white;
            }

            .register-btn {
                background: #eee;
                color: var(--text-color);
            }

            .login-btn:hover {
                background: var(--secondary-color);
            }

            .register-btn:hover {
                background: #ddd;
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }

    // Show notification
    function showNotification(message) {
        const notification = $(`
            <div class="notification">
                ${message}
            </div>
        `).appendTo('body');

        setTimeout(() => {
            notification.fadeOut(() => notification.remove());
        }, 3000);
    }
});