const fetchCryptoData = async () => {
    const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true';
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
  
      updateTicker(data);
      updateCoinList(data);
      updateCards(data);
    } catch (error) {
      console.error('Error fetching cryptocurrency data:', error);
    }
  };
  
  const updateTicker = (data) => {
    const ticker = document.getElementById('ticker');
    if (!ticker) return; // Check if ticker exists
    ticker.innerHTML = data
      .map(coin => `<span>${coin.name}: $${coin.current_price.toFixed(2)}</span>`)
      .join(' ');
  };
  
  const updateCoinList = (data) => {
    const coinList = document.getElementById('coin-list');
    if (!coinList) return; // Check if coinList exists
    coinList.innerHTML = data
      .map(
        coin => `
        <li>
          <span>${coin.name}</span>
          <span>$${coin.current_price.toFixed(2)}</span>
        </li>
      `
      )
      .join('');
  };
  
  // Base URL for CoinGecko
  const coinGeckoBaseURL = 'https://api.coingecko.com/api/v3';
  
  // Initialize chart
  async function initChart() {
    try {
      const response = await fetch(`${coinGeckoBaseURL}/coins/bitcoin/market_chart?vs_currency=usd&days=7`);
      if (!response.ok) throw new Error('Failed to fetch Bitcoin market chart data');
      const data = await response.json();
  
      const ctx = document.getElementById('price-chart');
      if (!ctx) return; // Check if canvas element exists
  
      new Chart(ctx.getContext('2d'), {
        type: 'line',
        data: {
          labels: data.prices.map(price => new Date(price[0]).toLocaleDateString()),
          datasets: [
            {
              label: 'Bitcoin Price (USD)',
              data: data.prices.map(price => price[1]),
              borderColor: '#0f0',
              backgroundColor: 'rgba(0, 255, 0, 0.1)',
            },
          ],
        },
        options: { responsive: true },
      });
    } catch (error) {
      console.error('Error initializing chart:', error);
    }
  }
  
  const updateCards = (data) => {
    const container = document.getElementById('crypto-container');
    if (!container) return; // Check if container exists
    container.innerHTML = data
      .map(
        coin => `
        <div class="card">
          <img src="${coin.image}" alt="${coin.name}" loading="lazy">
          <div class="card-body">
            <h3>${coin.name} (${coin.symbol.toUpperCase()})</h3>
            <p class="price">$${coin.current_price.toFixed(2)}</p>
            <p class="change ${coin.price_change_percentage_24h < 0 ? 'negative' : 'positive'}">
              ${coin.price_change_percentage_24h.toFixed(2)}% (24h)
            </p>
          </div>
        </div>
      `
      )
      .join('');
  };
  
  // Fetch initial data and set interval for updates
  fetchCryptoData();
  setInterval(fetchCryptoData, 60000);
  
  // Initialize app
  function init() {
    fetchCryptoData();
    initChart();
  }
  
  window.onload = init;
  