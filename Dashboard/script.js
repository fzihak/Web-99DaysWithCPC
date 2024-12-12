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

  // Code progression line chart
  const ctx4 = document.getElementById('codeProgressionChart').getContext('2d');
  const codeProgressionChart = new Chart(ctx4, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Lines of Code',
        data: [500, 1200, 2500, 4000, 6000, 8500],
        borderColor: '#40d675',
        backgroundColor: 'rgba(64, 214, 117, 0.2)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#40d675',
        pointBorderColor: '#40d675',
        pointHoverBackgroundColor: '#3b82f6',
        pointHoverBorderColor: '#3b82f6'
      },
        {
          label: 'Complexity Score',
          data: [30, 45, 60, 75, 85, 95],
          borderColor: '#8b5cf6',
          backgroundColor: 'rgba(139, 92, 246, 0.2)',
          tension: 0.4,
          fill: true,
          pointBackgroundColor: '#8b5cf6',
          pointBorderColor: '#8b5cf6',
          pointHoverBackgroundColor: '#3b82f6',
          pointHoverBorderColor: '#3b82f6'
        }]
    },
    options: {
      responsive: true,
      animation: {
        duration: 2000,
        easing: 'easeInOutQuart'
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: '#94a3b8'
          },
          grid: {
            color: 'rgba(255,255,255,0.1)'
          }
        },
        x: {
          ticks: {
            color: '#94a3b8'
          },
          grid: {
            display: false
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: '#94a3b8'
          }
        },
        tooltip: {
          backgroundColor: 'rgba(26,41,66,0.8)',
          titleColor: '#94a3b8',
          bodyColor: '#94a3b8'
        }
      }
    }
  });

  // Skill metrics radar chart
  const ctx2 = document.getElementById('skillChart').getContext('2d');
  new Chart(ctx2, {
    type: 'radar',
    data: {
      labels: ['JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'Git'],
      datasets: [{
        label: 'Current Skill Level',
        data: [4, 3, 5, 4, 2, 4],
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: '#3b82f6',
        borderWidth: 2
      },
        {
          label: 'Target Skill Level',
          data: [5, 4, 5, 5, 4, 5],
          backgroundColor: 'rgba(139, 92, 246, 0.5)',
          borderColor: '#8b5cf6',
          borderWidth: 2
        }]
    },
    options: {
      responsive: true,
      elements: {
        line: {
          borderWidth: 3
        }
      },
      scales: {
        r: {
          angleLines: {
            display: false
          },
          suggestedMin: 0,
          suggestedMax: 5,
          grid: {
            color: 'rgba(255,255,255,0.1)'
          },
          pointLabels: {
            color: '#94a3b8',
            font: {
              size: 12,
              weight: 'bold'
            }
          },
          ticks: {
            color: '#94a3b8',
            backdropColor: 'transparent'
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: '#94a3b8',
            font: {
              size: 12
            }
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
        duration: 1500,
        easing: 'easeInOutQuart'
      }
    }
  });

  // Active projects
  const projectList = document.getElementById('project-list');
  const projects = [{
    name: 'E-commerce Website', status: 'In Progress'
  },
    {
      name: 'Mobile App', status: 'Completed'
    },
    {
      name: 'API Integration', status: 'Not Started'
    },
    {
      name: 'Machine Learning Model', status: 'In Progress'
    },
    {
      name: 'Database Optimization', status: 'In Progress'
    }];

  projects.forEach(project => {
    const listItem = document.createElement('li');
    listItem.className = 'task-item';
    listItem.innerHTML = `
    <span>${project.name}</span>
    <span class="task-status status-${project.status.toLowerCase().replace(' ', '-')}">${project.status}</span>
    `;
    projectList.appendChild(listItem);
  });

  // Upcoming deadlines
  const deadlineList = document.getElementById('deadline-list');
  const deadlines = [{
    task: 'Project Proposal', date: '2024-07-15'
  },
    {
      task: 'Code Review', date: '2024-07-20'
    },
    {
      task: 'Final Submission', date: '2024-07-31'
    },
    {
      task: 'Team Presentation', date: '2024-08-05'
    },
    {
      task: 'Client Meeting', date: '2024-08-10'
    }];

  deadlines.forEach(deadline => {
    const listItem = document.createElement('li');
    listItem.className = 'task-item';
    listItem.innerHTML = `
    <span>${deadline.task}</span>
    <span>${deadline.date}</span>
    `;
    deadlineList.appendChild(listItem);
  });
  