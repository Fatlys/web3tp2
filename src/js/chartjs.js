import Chart from "chart.js/auto";

console.log("ChartJS chargé !");

const ctx = document.getElementById("chartTest");

if(ctx) {
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['A', 'B', 'C', 'D'],
            datasets: [{
                label: 'Test Chart',
                data: [5, 10, 3, 7]
            }]
        }
    });
}
