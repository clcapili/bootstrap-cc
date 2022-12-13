// init tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
});

// async/await
async function getData(content) {
    try {
        const response = await fetch(content);
        // log status
        console.log(response);
        const data = await response.json();

        // grab ul list group and data
        let listGroup = document.querySelector('.unresolved-tickets ul.list-group');
        let ticketsData = data.unresolvedTickets;

        // loop through the tickets data
        for (let i = 0; i < ticketsData.length; i++) {
            let listGroupItem = ticketsData[i];

            let listItem = document.createElement('li');
            listItem.className = 'list-group-item fs-5 fw-semibold';

            listItem.innerHTML = `
                <p>${listGroupItem.status}</p>
                <span class="gray-400">${listGroupItem.stat}</span>
            `;

            // // add ticket data to the list group
            listGroup.appendChild(listItem);
        }
    } catch(error) {
        console.warn( "Error Message: " + error );
    }
}
getData( '/assets/data/content.json' );

// ajax here
$.ajax({
    url: '/assets/data/content.json',
    success: function( results ) {
        // dump data
        console.log( results );

        // top cards
        $.each( results.cards, function() {
            var topCards = $('.top-cards');
            var columnCard = $(`
                <div class="col-lg-3 col-sm-6">
                    <a href="/">
                        <div class="card mb-2">
                            <div class="card-body">
                                <h2 class="card-title">${this.title}</h2>
                                <span class="fs-1 fw-bold">${this.stat}</span>
                            </div>
                        </div>
                    </a>
                </div>
            `);
            topCards.append(columnCard);
        });

        // add chart title
        var chartHeading = $('.chart-left h2');
        chartHeading.html(results.chartTitle);

        // add chart right cards
        var chartCard = "";
        $.each( results.chartCards, function() {
            chartCard += `
                <div class="col-xl-12 col-md-4 col-sm-6 stat">
                    <span class="lead">${this.title}</span>
                    <span class="h1 mb-0">${this.stat}</span>
                </div>
            `;
            $('.chart-right').html(chartCard);
        });
    }
});