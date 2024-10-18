const API_KEY = 'cs8t6i1r01qu0vk4iiggcs8t6i1r01qu0vk4iih0'; // Replace with your Finnhub API key

// Set an alarm to check prices every minute
chrome.alarms.create('priceCheck', { periodInMinutes: 1 });

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'priceCheck') {
    checkPrices();
  }
});

function checkPrices() {
  chrome.storage.sync.get(['stocks'], (result) => {
    const stocks = result.stocks || [];
    stocks.forEach(stock => {
      if (stock.targetPrice) {
        fetch(`https://finnhub.io/api/v1/quote?symbol=${stock.symbol}&token=${API_KEY}`)
          .then(response => response.json())
          .then(data => {
            const currentPrice = data.c;
            if (currentPrice >= stock.targetPrice) {
              // Send notification
              chrome.notifications.create('', {
                type: 'basic',
                iconUrl: 'icon.png',
                title: 'Stock Target Reached',
                message: `${stock.symbol} has reached ${currentPrice}`,
                priority: 2
              });
              // Remove the target price after notification
              chrome.storage.sync.get(['stocks'], (result) => {
                let updatedStocks = result.stocks || [];
                updatedStocks = updatedStocks.map(s => {
                  if (s.symbol === stock.symbol) {
                    return { ...s, targetPrice: null };
                  }
                  return s;
                });
                chrome.storage.sync.set({ stocks: updatedStocks });
              });
            }
          })
          .catch(error => {
            console.error(`Error fetching data for ${stock.symbol}:`, error);
          });
      }
    });
  });
}

// Create notification permission on install
chrome.runtime.onInstalled.addListener(() => {
  if (chrome.notifications) {
    console.log('Notifications are enabled.');
  }
});

