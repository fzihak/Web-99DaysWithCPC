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
 // Learning recommendations
 const recommendationList = document.getElementById('recommendation-list');
 const recommendations = [{
   course: 'Advanced React Patterns', difficulty: 'Intermediate'
 },
   {
     course: 'Machine Learning Fundamentals', difficulty: 'Advanced'
   },
   {
     course: 'GraphQL API Design', difficulty: 'Intermediate'
   },
   {
     course: 'Blockchain Development', difficulty: 'Advanced'
   },
   {
     course: 'Cybersecurity Basics', difficulty: 'Beginner'
   }];

 recommendations.forEach(recommendation => {
   const listItem = document.createElement('li');
   listItem.className = 'task-item';
   listItem.innerHTML = `
   <span>${recommendation.course}</span>
   <span class="task-status">${recommendation.difficulty}</span>
   `;
   recommendationList.appendChild(listItem);
 });

 // Notification system (optional)
 //            function showNotification(message, icon = 'fa-info-circle') {
 //                const notification = document.createElement('div');
 //                notification.className = 'notification';
 //               notification.innerHTML = `
 //                    <i class="fas ${icon}"></i>
 //                    <span>${message}</span>
 //                `;
 //                document.getElementById('notificationCenter').appendChild(notification);

 //                notification.offsetHeight;

 //                notification.classList.add('show');
 //
 //                setTimeout(() => {
 //                    notification.classList.remove('show');
 //                    setTimeout(() => {
 //                        notification.remove();
 //                    }, 300);
 //                }, 3000);
 //            }

 // Single notification
 //            setTimeout(() => showNotification('New course recommendation available!', 'fa-graduation-cap'), 2000);

 // Sidebar
 document.querySelectorAll('.sidebar-nav-item').forEach(item => {
   item.addEventListener('click', function() {
     document.querySelector('.sidebar-nav-item.active').classList.remove('active');
     this.classList.add('active');
   });
 });

 // Progress bar
 function updateProgressBar() {
   const progressBar = document.querySelector('.progress-bar-fill');
   let width = 0;
   const interval = setInterval(() => {
     if (width >= 75) {
       clearInterval(interval);
     } else {
       width++;
       progressBar.style.width = width + '%';
     }
   },
     20);
 }

 updateProgressBar();

 // Mobile menu toggle
 const menuToggle = document.getElementById('menuToggle');
 const sidebar = document.getElementById('sidebar');
 const sidebarClose = document.getElementById('sidebarClose');

 menuToggle.addEventListener('click',
   () => {
     sidebar.classList.add('active');
     menuToggle.style.display = 'none';
   });

 sidebarClose.addEventListener('click',
   () => {
     sidebar.classList.remove('active');
     menuToggle.style.display = 'flex';
   });

 document.addEventListener('click',
   (e) => {
     if (window.innerWidth <= 768 && !sidebar.contains(e.target) && e.target !== menuToggle) {
       sidebar.classList.remove('active');
       menuToggle.style.display = 'flex';
     }
   });

 // Resize handler
 function handleResize() {
   if (window.innerWidth > 768) {
     sidebar.classList.remove('active');
     menuToggle.style.display = 'none';
   } else {
     menuToggle.style.display = 'flex';
   }
 }

 window.addEventListener('resize', handleResize);
 handleResize();

 // Coding activity calendar
 const calendarContainer = document.getElementById('coding-calendar');
 const days = 35; // 5 weeks

 for (let i = 0; i < days; i++) {
   const day = document.createElement('div');
   day.className = 'calendar-day';
   const activity = Math.random();
   if (activity > 0.7) {
     day.classList.add('activity-activity-high');
   } else if (activity > 0.4) {
     day.classList.add('activity-medium');
   } else if (activity > 0.1) {
     day.classList.add('activity-low');
   }
   calendarContainer.appendChild(day);
 }

 // Leaderboard
 const leaderboardList = document.getElementById('leaderboard-list');
 const leaderboardData = [{
   rank: 1,
   name: 'Ethan',
   score: 2500,
   avatar: 'assets/images/message_avatar5.jpg'
 },
   {
     rank: 2,
     name: 'Charlie',
     score: 2350,
     avatar: 'assets/images/message_avatar3.jpg'
   },
   {
     rank: 3,
     name: 'Alice',
     score: 2200,
     avatar: 'assets/images/message_avatar1.jpg'
   },
   {
     rank: 4,
     name: 'Fiona',
     score: 2100,
     avatar: 'assets/images/message_avatar6.jpg'
   },
   {
     rank: 5,
     name: 'Diana',
     score: 2000,
     avatar: 'assets/images/message_avatar4.jpg'
   }];

 leaderboardData.forEach(user => {
   const listItem = document.createElement('li');
   listItem.className = 'leaderboard-item';
   listItem.innerHTML = `
   <span class="leaderboard-rank">${user.rank}</span>
   <img src="${user.avatar}" alt="${user.name}" class="leaderboard-avatar">
   <span class="leaderboard-name">${user.name}</span>
   <span class="leaderboard-score">${user.score}</span>
   `;
   leaderboardList.appendChild(listItem);
 });
});  