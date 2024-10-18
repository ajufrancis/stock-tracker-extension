# Stock Tracker Chrome Extension

<img src="icon.png" alt="Stock Tracker Icon" width="50" />

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [API Information](#api-information)


## Overview

**Stock Tracker** is a Chrome Extension designed to help users monitor up to 10 stock symbols of their choice. With a user-friendly interface, this extension provides real-time stock prices, allows setting target prices for notifications, and offers seamless management of your stock list directly from the browser toolbar.

## Features

- **Add/Delete Stocks**: Easily add up to 10 stock symbols to your watchlist and remove them as needed.
- **Real-Time Prices**: View the current price of each tracked stock with a simple click on the extension icon.
- **Set Target Prices**: Specify target prices for each stock. The extension checks prices every minute and notifies you when targets are met.
- **User-Friendly Interface**: Intuitive popup interface with modals for setting target prices and managing your stock list.
- **Desktop Notifications**: Receive instant notifications when a stock reaches your specified target price.

## Demo

![Popup Interface](screenshot.png)

*Screenshot of the Stock Tracker popup interface showing a list of tracked stocks with their current prices.*

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/stock-tracker-extension.git
   
2. **Navigate to the Directory**
   ```bash
   cd stock-tracker-extension

3. **Obtain a Finnhub API Key**
   - Sign up for a free account at Finnhub.  
   - Retrieve your API key from the dashboard.
  
4. **Configure the API Key**
   - Open `popup.js` and `background.js`.
   - Replace 'YOUR_FINNHUB_API_KEY' with your actual Finnhub API key.

5. **Load the Extension in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`.
   - Enable "Developer mode" using the toggle in the top right corner.
   - Click on "Load unpacked" and select the stock-tracker-extension folder.
   - The Stock Tracker extension should now appear in your list of Chrome extensions.
  

## Usage

1. **Add a Stock**
   - Click on the Stock Tracker icon in the Chrome toolbar.
   - Enter the stock symbol (e.g., AAPL, GOOGL) in the input field.
   - Click the "Add" button to add the stock to your watchlist.
  
2. **View Current Prices**
   - Click on the extension icon to see a dropdown list of your tracked stocks along with their current prices.

3. **Set a Target Price**
   - Click on a stock symbol in the list to open a modal.
   - Enter your desired target price and click "Save".
   - The extension will monitor the stock price every minute and notify you when the target is reached.

4. **Delete a Stock**
   - Hover over a stock item in the list.
   - Click the "Delete" button that appears to remove the stock from your watchlist.


## Technologies Used

- **HTML5:** Structure of the popup interface.
- **CSS3:** Styling the extension for a clean and responsive design.
- **JavaScript (ES6):** Handling functionality, API interactions, and storage.
- **Chrome Extensions API:** Leveraging Chrome's storage, alarms, and notifications.
- **Finnhub API:** Fetching real-time stock price data.

## API Information

 - **Finnhub API:** Utilized for fetching real-time stock prices.
    - **Free Tier:** Suitable for up to 60 API calls per minute, accommodating the extension's needs for tracking up to 10 stocks.

