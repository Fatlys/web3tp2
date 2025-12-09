document.addEventListener("DOMContentLoaded", () => {
  const chartCanvas = document.getElementById("activityChart");
  if (!chartCanvas || !window.Chart) return;

  const ctx = chartCanvas.getContext("2d");

  let dataPoints = [10, 18, 9, 22, 30, 18, 25, 15, 28, 20];
  let labels = [];
  const now = new Date();
  
  for (let i = 9; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 15000);
    labels.push(time.toLocaleTimeString("fr-CA", { 
      hour12: false, 
      hour: "2-digit", 
      minute: "2-digit" 
    }));
  }

  const gradient = ctx.createLinearGradient(0, 0, 0, 120);
  gradient.addColorStop(0, "rgba(0, 255, 106, 0.3)");
  gradient.addColorStop(1, "rgba(0, 255, 106, 0.02)");

  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        label: "Activité KI",
        data: dataPoints,
        fill: true,
        tension: 0.4,
        borderColor: "#00ff6a",
        borderWidth: 2,
        backgroundColor: gradient,
        pointRadius: 0,
        pointHoverRadius: 4,
        pointHoverBackgroundColor: "#00ff6a",
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 500, easing: "easeOutQuad" },
      interaction: { intersect: false, mode: "index" },
      plugins: {
        legend: { display: false },
        tooltip: {
          enabled: true,
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          titleColor: "#6eea8c",
          bodyColor: "#00ff6a",
          borderColor: "#00ff6a",
          borderWidth: 1,
          padding: 10,
          displayColors: false,
          callbacks: {
            label: function(context) {
              return "KI: " + context.parsed.y + "%";
            }
          }
        }
      },
      scales: {
        x: {
          display: true,
          ticks: { 
            color: "#6eea8c", 
            font: { size: 7, family: "Share Tech Mono" },
            maxRotation: 0
          },
          grid: { display: false },
          border: { color: "rgba(0, 255, 106, 0.2)" }
        },
        y: {
          min: 0,
          max: 40,
          ticks: { 
            color: "#6eea8c", 
            font: { size: 7, family: "Share Tech Mono" },
            stepSize: 10
          },
          grid: { 
            color: "rgba(0, 255, 106, 0.1)",
            lineWidth: 1
          },
          border: { color: "rgba(0, 255, 106, 0.2)" }
        }
      }
    }
  });

  function updateChart() {
    const now = new Date();
    const newTime = now.toLocaleTimeString("fr-CA", { 
      hour12: false, 
      hour: "2-digit", 
      minute: "2-digit" 
    });
    
    const lastValue = dataPoints[dataPoints.length - 1];
    let newValue = lastValue + (Math.random() - 0.5) * 10;
    newValue = Math.max(5, Math.min(35, newValue));

    labels.shift();
    labels.push(newTime);
    
    dataPoints.shift();
    dataPoints.push(Math.round(newValue));

    chart.data.labels = labels;
    chart.data.datasets[0].data = dataPoints;
    chart.update("none");
  }

  setInterval(updateChart, 3000);
  window.hudActivityChart = chart;
});