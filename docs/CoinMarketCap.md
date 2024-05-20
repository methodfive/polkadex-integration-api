<a name="top"></a>
# Polkadex Integration API v1.0.0



<p>This document outlines the Polkadex API endpoint details available for DEX integration.</p>


# Table of contents

- [CoinMarketCap](#CoinMarketCap)
  - [Get Assets](#Get-Assets)
  - [Get OrderBook](#Get-OrderBook)
  - [Get Summary](#Get-Summary)
  - [Get Tickers](#Get-Tickers)
  - [Get Trades](#Get-Trades)

___


# <a name='CoinMarketCap'></a> CoinMarketCap

## <a name='Get-Assets'></a> Get Assets
[Back to top](#top)

```
GET /cmc/v1/assets
```
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| name | `String` | <p>Full name of cryptocurrency.</p> |
| unified_cryptoasset_id | `Number` | <p>Unique ID of cryptocurrency assigned by Unified Cryptoasset ID.</p> |
| can_withdraw | `Boolean` | <p>Identifies whether withdrawals are enabled or disabled.</p> |
| can_deposit | `Boolean` | <p>Identifies whether deposits are enabled or disabled.</p> |
| maker_fee | `Number` | <p>Fees applied when liquidity is added to the order book.</p> |
| taker_fee | `Number` | <p>Fees applied when liquidity is removed from the order book.</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
{
   "PDEX":{
      "unified_cryptoasset_id":"9017",
      "can_deposit":true,
      "can_withdraw":true,
      "name":"Polkadex",
      "maker_fee":"0.01",
      "taker_fee":"0.01"
   },
   "DOT":{
      "unified_cryptoasset_id":"6636",
      "can_deposit":true,
      "can_withdraw":true,
      "name":"Polkadot",
      "maker_fee":"0.01",
      "taker_fee":"0.01"
   },
   ...
}
```

### Error response example

#### Error response example - `ValidationError:`

```json
HTTP/1.1 500
{
   "type":"ValidationError",
   "message":""
}
```

#### Error response example - `Error:`

```json
HTTP/1.1 500
{
   "type":"Error",
   "message":""
}
```

## <a name='Get-OrderBook'></a> Get OrderBook
[Back to top](#top)

```
GET /cmc/v1/orderbook/:market_pair
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| market_pair | `String` | <p>A market pair such as &quot;PDEX_USDT&quot;</p> |

### Parameters - `Query string`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| depth | `Number` | **optional** <p>Orders depth quantity: [0,5,10,20,50,100,500]</p> <p>Not defined or 0 = full order book</p> <p>Depth = 100 means 50 for each bid/ask side</p> |
| level | `Number` | **optional** <p>Level 1 – Only the best bid and ask.</p> <p>Level 2 – Arranged by best bids and asks.</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| timestamp | `Number` | <p>Unix timestamp in milliseconds for when the last updated time occurred.</p> |
| bids |  | <p>An array containing 2 elements. The offer price and quantity for each bid order.</p> |
| asks |  | <p>An array containing 2 elements. The offer price and quantity for each bid order.</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
{
   "timestamp":1715993913,
   "bids":[
      [
         "0.6274000000",
         "8.7000000000"
      ],
      [
         "0.6265000000",
         "8.7000000000"
      ],
      ...
   ],
   "asks":[
      [
         "0.6299000000",
         "8.7000000000"
      ],
      [
         "0.6308000000",
         "8.7000000000"
      ],
      ...
   ]
}
```

### Error response example

#### Error response example - `ValidationError:`

```json
HTTP/1.1 500
{
   "type":"ValidationError",
   "message":""
}
```

#### Error response example - `Error:`

```json
HTTP/1.1 500
{
   "type":"Error",
   "message":""
}
```

## <a name='Get-Summary'></a> Get Summary
[Back to top](#top)

```
GET /cmc/v1/summary
```
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| trading_pairs | `String` | <p>Identifier of a ticker with delimiter to separate base/quote, eg. PDEX_USDT</p> |
| base_currency | `String` | <p>Symbol/currency code of base currency, eg. PDEX</p> |
| quote_currency | `String` | <p>Symbol/currency code of quote currency, eg. USDT</p> |
| last_price | `Number` | <p>Last transacted price of base currency based on given quote currency</p> |
| lowest_ask | `Number` | <p>Lowest Ask price of base currency based on given quote currency</p> |
| highest_bid | `Number` | <p>Highest bid price of base currency based on given quote currency</p> |
| base_volume | `Number` | <p>24-hr volume of market pair denoted in BASE currency</p> |
| quote_volume | `Number` | <p>24-hr volume of market pair denoted in QUOTE currency</p> |
| price_change_percent_24h | `Number` | <p>24-hr % price change of market pair</p> |
| highest_price_24h | `Number` | <p>Highest price of base currency based on given quote currency in the last 24-hrs</p> |
| lowest_price_24h | `Number` | <p>Lowest price of base currency based on given quote currency in the last 24-hrs</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
[
   {
      "trading_pairs":"DOT_USDT",
      "base_currency":"DOT",
      "quote_currency":"USDT",
      "last_price":"7.193",
      "lowest_ask":"7.194",
      "highest_bid":"7.175",
      "base_volume":"4267.2",
      "quote_volume":"30750.7994",
      "price_change_percent_24h":"-0.24962",
      "highest_price_24h":"7.28",
      "lowest_price_24h":"7.152"
   },
   {
      "trading_pairs":"PDEX_USDT",
      "base_currency":"PDEX",
      "quote_currency":"USDT",
      "last_price":"0.6318",
      "lowest_ask":"0.6332",
      "highest_bid":"0.6307",
      "base_volume":"46876.866672788",
      "quote_volume":"29708.058327",
      "price_change_percent_24h":"-1.01833",
      "highest_price_24h":"0.6499",
      "lowest_price_24h":"0.6193"
   },
   ...
]
```

### Error response example

#### Error response example - `ValidationError:`

```json
HTTP/1.1 500
{
   "type":"ValidationError",
   "message":""
}
```

#### Error response example - `Error:`

```json
HTTP/1.1 500
{
   "type":"Error",
   "message":""
}
```

## <a name='Get-Tickers'></a> Get Tickers
[Back to top](#top)

```
GET /cmc/v1/ticker
```
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| base_id | `Number` | <p>The base pair Unified Cryptoasset ID.</p> |
| quote_id | `Number` | <p>The quote pair Unified Cryptoasset ID.</p> |
| last_price | `Number` | <p>Last transacted price of base currency based on given quote currency</p> |
| base_volume | `Number` | <p>24-hour trading volume denoted in BASE currency</p> |
| quote_volume | `Number` | <p>24 hour trading volume denoted in QUOTE currency</p> |
| isFrozen | `Number` | <p>Indicates if the market is currently enabled (0) or disabled (1).</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
{
   "PDEX_USDT":{
      "base_id":"9017",
      "quote_id":"825",
      "base_currency":"PDEX",
      "target_currency":"USDT",
      "last_price":"0.6285",
      "base_volume":"45106.260217025",
      "quote_volume":"28714.57237",
      "isFrozen":"0"
   },
   "GLMR_USDT":{
      "base_id":"6836",
      "quote_id":"825",
      "base_currency":"GLMR",
      "target_currency":"USDT",
      "last_price":"0.27448",
      "base_volume":"85818.7",
      "quote_volume":"23429.174977",
      "isFrozen":"0"
   },
   ...
}
```

### Error response example

#### Error response example - `ValidationError:`

```json
HTTP/1.1 500
{
   "type":"ValidationError",
   "message":""
}
```

#### Error response example - `Error:`

```json
HTTP/1.1 500
{
   "type":"Error",
   "message":""
}
```

## <a name='Get-Trades'></a> Get Trades
[Back to top](#top)

```
GET /cmc/v1/trades/:market_pair
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| market_pair | `String` | <p>A market pair such as &quot;PDEX_USDT&quot;</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| trade_id | `Number` | <p>Unique trade identifier</p> |
| price | `Number` | <p>Last transacted price of base currency based on given quote currency</p> |
| base_volume | `Number` | <p>Transaction amount in BASE currency.</p> |
| quote_volume | `Number` | <p>Transaction amount in QUOTE currency.</p> |
| timestamp | `Number` | <p>Unix timestamp in milliseconds for when the transaction occurred.</p> |
| type | `String` | <p>Used to determine whether or not the transaction originated as a buy or sell.</p> <p>buy – Identifies an ask was removed from the order book.</p> <p>sell – Identifies a bid was removed from the order book.</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
[
   {
      "trade_id":39358287,
      "price":"0.6293",
      "base_volume":"24.5",
      "quote_volume":"15.41785",
      "timestamp":1715996884,
      "type":"sell"
   },
   {
      "trade_id":39358093,
      "price":"0.6293",
      "base_volume":"9.9",
      "quote_volume":"6.23007",
      "timestamp":1715996812,
      "type":"buy"
   },
   ...
]
```

### Error response example

#### Error response example - `ValidationError:`

```json
HTTP/1.1 500
{
   "type":"ValidationError",
   "message":""
}
```

#### Error response example - `Error:`

```json
HTTP/1.1 500
{
   "type":"Error",
   "message":""
}
```

