let express = require('express');
let cors = require('cors'); 

let app = express();
app.use(cors());

let port = 3000;


let stocks = [
  {
    id: 1,
    name: "Reliance Industries",
    price: 2500,
    growth: 3.5,
    industry: "Finance",
    exchange: "NSE",
  },
  {
    id: 2,
    name: "HDFC Bank",
    price: 1800,
    growth: 4.2,
    industry: "Finance",
    exchange: "BSE",
  },
  {
    id: 3,
    name: "ICICI Bank",
    price: 1600,
    growth: 5.1,
    industry: "Finance",
    exchange: "NSE",
  },
  {
    id: 4,
    name: "Tata Consultancy Services",
    price: 3200, 
    growth: 2.9,
    industry: "Finance",
    exchange: "BSE",
  },
  {
    id: 5,
    name: "Infosys",
    price: 2900,
    growth: 3.8,
    industry: "Finance",
    exchange: "NSE",
  },
];


app.get("/stocks/sort/pricing", (req, res) => {
  const pricing = req.query.order; 
  let sortedStocks;

  if (pricing === 'high-to-low') {
    sortedStocks = stocks.sort((a, b) => b.price - a.price); 
  } else {
    sortedStocks = stocks.sort((a, b) => a.price - b.price);
  }


  res.json({ stocks: sortedStocks });
});


app.get("/stocks/sort/growth", (req, res) => {
  const growth = req.query.order; 
  let sortedStocks;

  if (growth === 'high-to-low') {
    sortedStocks = stocks.sort((a, b) => b.growth - a.growth); 
  } else {
    sortedStocks = stocks.sort((a, b) => a.growth - b.growth); 
  }

  res.json({ stocks: sortedStocks });
});

function filterByExchange(exchange) {
  return stocks.filter(stock => stock.exchange.toLowerCase() === exchange.toLowerCase());
}


app.get("/stocks/filter/exchange", (req, res) => {
  const exchange = req.query.exchange; 

 
  if (!exchange) {
    return res.status(400).json({ error: "Exchange query parameter is required." });
  }

  const filteredStocks = filterByExchange(exchange); /

  res.json({ stocks: filteredStocks });
});

function filterByIndustry(industry) {
  return stocks.filter(stock => stock.industry.toLowerCase() === industry.toLowerCase());
}


app.get("/stocks/filter/industry", (req, res) => {
  const industry = req.query.industry; 

  if (!industry) {
    return res.status(400).json({ error: "Industry query parameter is required." });
  }

  const filteredStocks = filterByIndustry(industry); 
  res.json({ stocks: filteredStocks });
});

app.get("/stocks", (req, res) => {
  res.json({ stocks }); 
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
