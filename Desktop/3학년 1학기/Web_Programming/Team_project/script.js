window.onload = function() {
    fetchReservations();

    // Fetch all reservations with optional filters
    function fetchReservations() {
        const url = new URL('/reservations', window.location.href);
        const params = { price: 25000, location: 'Nowon-gu', rating: 4 }; // Example filters
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const list = document.getElementById('reservation-list');
                list.innerHTML = data.map(reservation =>
                    `<div onmouseover="showDetails(this)" onmouseout="hideDetails(this)">
                        <p>${reservation.name} - ${reservation.location}</p>
                        <div class="details" style="display: none;">
                            <p>Price: ${reservation.price}</p>
                            <p>Rating: ${reservation.rating}</p>
                            <p>Hours: ${reservation.openingHours}</p>
                        </div>
                    </div>`
                ).join('');
            });
    }

    window.showDetails = function(element) {
        element.querySelector('.details').style.display = 'block';
    };

    window.hideDetails = function(element) {
        element.querySelector('.details').style.display = 'none';
    };
};