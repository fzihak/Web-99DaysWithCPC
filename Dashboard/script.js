AOS.init({
    duration: 1000,
    once: true
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    // Learning progress chart
    const ctx1 = document.getElementById('learningChart').getContext('2d');
    new Chart(ctx1, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Learning Hours',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: 'rgba(59, 130, 246, 0.5)',
          borderColor: '#3b82f6',
          tension: 0.4,
          fill: true,
          pointBackgroundColor: '#3b82f6',
          pointBorderColor: '#94a3b8',
          pointHoverBackgroundColor: '#8b5cf6',
          pointHoverRadius: 7
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            grid: {
              color: 'rgba(255,255,255,0.1)'
            },
            ticks: {
              color: '#94a3b8'
            }
          },
          y: {
            grid: {
              color: 'rgba(255,255,255,0.1)'
            },
            ticks: {
              color: '#94a3b8',
              callback: function(value) {
                return `${value} hrs`;
              }
            },
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: '#94a3b8',
              font: {
                size: 12
              }
            }
          },
          title: {
            display: true,
            text: 'Monthly Learning Progress',
            color: '#94a3b8',
            font: {
              size: 16,
              weight: 'bold'
            }
          },
          tooltip: {
            backgroundColor: 'rgba(26,41,66,0.8)',
            titleColor: '#94a3b8',
            bodyColor: '#94a3b8',
            borderColor: '#94a3b8',
            borderWidth: 1
          }
        },
        animation: {
          duration: 2000,
          easing: 'easeInOutQuart'
        },
        interaction: {
          mode: 'nearest',
          intersect: false
        },
        elements: {
          point: {
            radius: 5,
            hoverRadius: 8
          }
        }
      }
    });
  