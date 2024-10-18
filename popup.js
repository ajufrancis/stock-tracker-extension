const API_KEY = 'cs8t6i1r01qu0vk4iiggcs8t6i1r01qu0vk4iih0'; // Replace with your Finnhub API key

document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById('add-button');
  const stockSymbolInput = document.getElementById('stock-symbol');
  const stockList = document.getElementById('stock-list');
  const modal = document.getElementById('modal');
  const closeModal = document.querySelector('.close');
  const saveTargetButton = document.getElementById('save-target');
  const targetPriceInput = document.getElementById('target-price');
  const modalSymbol = document.getElementById('modal-symbol');

  let currentEditSymbol = null;

  addButton.addEventListener('click', addStock);
  closeModal.addEventListener('click', () => { modal.style.display = 'none'; });
  window.addEventListener('click', (event) => {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  });
  saveTargetButton.addEventListener('click', saveTargetPrice);

  loadStocks();

  function addStock() {
    const symbol = stockSymbolInput.value.trim().toUpperCase();
    if (!symbol) {
      alert('Please enter a stock symbol.');
      return;
    }

    chrome.storage.sync.get(['stocks'], (result) => {
      let stocks = result.stocks || [];
      if (stocks.find(s => s.symbol === symbol)) {
        alert('Stock already added.');
        return;
      }
      if (stocks.length >= 10) {
        alert('You can only track up to 10 stocks.');
        return;
      }
      stocks.push({ symbol, targetPrice: null });
      chrome.storage.sync.set({ stocks }, () => {
        stockSymbolInput.value = '';
        renderStocks(stocks);
        fetchAndUpdatePrices(stocks);
      });
    });
  }

  function loadStocks() {
    chrome.storage.sync.get(['stocks'], (result) => {
      let stocks = result.stocks || [];
      renderStocks(stocks);
      fetchAndUpdatePrices(stocks);
    });
  }

  function renderStocks(stocks) {
    stockList.innerHTML = '';
    stocks.forEach(stock => {
      const li = document.createElement('li');
      li.className = 'stock-item';
      li.innerHTML = `
        <div>
          <strong>${stock.symbol}</strong>: <span id="${stock.symbol}-price">Loading...</span>
          ${stock.targetPrice ? `<div class="target-price">Target: ${stock.targetPrice}</div>` : ''}
        </div>
        <button class="delete-button" data-symbol="${stock.symbol}">Delete</button>
      `;
      stockList.appendChild(li);

      // Add event listener for delete button
      li.querySelector('.delete-button').addEventListener('click', deleteStock);

      // Add event listener to set target price on click
      li.querySelector('strong').addEventListener('click', () => {
        currentEditSymbol = stock.symbol;
        modalSymbol.textContent = stock.symbol;
        if (stock.targetPrice) {
          targetPriceInput.value = stock.targetPrice;
        } else {
          targetPriceInput.value = '';
        }
        modal.style.display = 'block';
      });
    });
  }

  function deleteStock(e) {
    const symbol = e.target.getAttribute('data-symbol');
    chrome.storage.sync.get(['stocks'], (result) => {
      let stocks = result.stocks || [];
      stocks = stocks.filter(s => s.symbol !== symbol);
      chrome.storage.sync.set({ stocks }, () => {
        renderStocks(stocks);
      });
    });
  }

  function saveTargetPrice() {
    const price = parseFloat(targetPriceInput.value);
    if (isNaN(price)) {
      alert('Please enter a valid price.');
      return;
    }
    chrome.storage.sync.get(['stocks'], (result) => {
      let stocks = result.stocks || [];
      stocks = stocks.map(s => {
        if (s.symbol === currentEditSymbol) {
          return { ...s, targetPrice: price };
        }
        return s;
      });
      chrome.storage.sync.set({ stocks }, () => {
        modal.style.display = 'none';
        renderStocks(stocks);
      });
    });
  }

  function fetchAndUpdatePrices(stocks) {
    stocks.forEach(stock => {
      fetch(`https://finnhub.io/api/v1/quote?symbol=${stock.symbol}&token=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
          const currentPrice = data.c;
          document.getElementById(`${stock.symbol}-price`).textContent = currentPrice;
        })
        .catch(error => {
          console.error(`Error fetching data for ${stock.symbol}:`, error);
          document.getElementById(`${stock.symbol}-price`).textContent = 'Error';
        });
    });
  }
});

