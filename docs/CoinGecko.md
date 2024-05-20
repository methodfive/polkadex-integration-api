<a name="top"></a>
# Polkadex Integration API v1.0.0



<p>This document outlines the Polkadex API endpoint details available for DEX integration.</p>


# Table of contents

- [CoinGecko](#CoinGecko)
  - [Get Historical Trades](#Get-Historical-Trades)
  - [Get OrderBook](#Get-OrderBook)
  - [Get Supply](#Get-Supply)
  - [Get Tickers](#Get-Tickers)

___


# <a name='CoinGecko'></a> CoinGecko

## <a name='Get-Historical-Trades'></a> Get Historical Trades
[Back to top](#top)

```
GET /cg/v1/historical
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| ticker_id | `String` | <p>A market pair such as &quot;PDEX_USDT&quot;</p> |
| type | `String` | **optional** <p>To indicate nature of trade - buy/sell</p> |
| limit | `Number` | **optional** <p>Number of historical trades to retrieve from time of query. [0, 200, 500...]. 0 returns full history.</p> |
| start_time | `Number` | **optional** <p>Start time from which to query historical trades from</p> |
| end_time | `Number` | **optional** <p>End time for historical trades query</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| trade_id | `Number` | <p>Unique trade identifier</p> |
| price | `Number` | <p>Last transacted price of base currency based on given quote currency</p> |
| base_volume | `Number` | <p>Transaction amount in BASE currency.</p> |
| target_volume | `Number` | <p>Transaction amount in QUOTE currency.</p> |
| trade_timestamp | `Number` | <p>Unix timestamp in milliseconds for when the transaction occurred.</p> |
| type | `String` | <p>Used to determine the type of the transaction that was completed.</p> <p>buy – Identifies an ask that was removed from the order book.</p> <p>sell – Identifies a bid that was removed from the order book.</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
[
   {
      "trade_id":39433729,
      "price":"0.6322",
      "base_volume":"10.8",
      "target_volume":"6.82776",
      "trade_timestamp":1716035421,
      "type":"buy"
   },
   {
      "trade_id":39433624,
      "price":"0.6319",
      "base_volume":"23.5",
      "target_volume":"14.84965",
      "trade_timestamp":1716035377,
      "type":"sell"
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

## <a name='Get-OrderBook'></a> Get OrderBook
[Back to top](#top)

```
GET /cg/v1/orderbook
```

### Parameters - `Query string`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| ticker_id | `String` | <p>A ticker such as &quot;PDEX_USDT&quot;</p> |
| depth | `Number` | **optional** <p>Orders depth quantity: [0,5,10,20,50,100,500]</p> <p>Not defined or 0 = full order book</p> <p>Depth = 100 means 50 for each bid/ask side</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| ticker_id | `String` | <p>A ticker such as &quot;PDEX_USDT&quot;</p> |
| timestamp | `Number` | <p>Unix timestamp in milliseconds for when the last updated time occurred.</p> |
| bids |  | <p>An array containing 2 elements. The offer price and quantity for each bid order.</p> |
| asks |  | <p>An array containing 2 elements. The offer price and quantity for each bid order.</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
{
   "ticker_id":"PDEX_USDT",
   "timestamp":1716034533,
   "bids":[
      [
         "0.6322000000",
         "8.6000000000"
      ],
      [
         "0.6297000000",
         "8.7000000000"
      ],
      ...
   ],
   "asks":[
      [
         "0.6342000000",
         "8.6000000000"
      ],
      [
         "0.6347000000",
         "8.6000000000"
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

## <a name='Get-Supply'></a> Get Supply
[Back to top](#top)

```
GET /cg/v1/supply
```
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| result | `Number` | <p>Current circulating supply of PDEX (Polkadex Token)</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
{
   "result":7839710
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

## <a name='Get-Tickers'></a> Get Tickers
[Back to top](#top)

```
GET /cg/v1/tickers
```
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| ticker_id | `String` | <p>Identifier of a ticker with delimiter to separate base/target, eg. PDEX_USDT</p> |
| base_currency | `String` | <p>Symbol of the base asset, eg: PDEX</p> |
| target_currency | `String` | <p>Symbol of the quote asset, eg: USDT</p> |
| last_price | `Number` | <p>Last transacted price of base currency based on given quote currency</p> |
| base_volume | `Number` | <p>24-hour trading volume denoted in BASE currency</p> |
| target_volume | `Number` | <p>24 hour trading volume denoted in QUOTE currency</p> |
| bid | `Number` | <p>Highest bid price of base currency based on given quote currency</p> |
| ask | `Number` | <p>Lowest Ask price of base currency based on given quote currency</p> |
| high | `Number` | <p>Highest price of base currency based on given quote currency in the last 24-hrs</p> |
| low | `Number` | <p>Lowest price of base currency based on given quote currency in the last 24-hrs</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
[
   {
      "ticker_id":"DOT_USDT",
      "base_currency":"DOT",
      "target_currency":"USDT",
      "last_price":"7.186",
      "base_volume":"4268.1",
      "target_volume":"30755.7704",
      "bid":"7.161",
      "ask":"7.187",
      "high":"7.28",
      "low":"7.152"
   },
   {
      "ticker_id":"PDEX_USDT",
      "base_currency":"PDEX",
      "target_currency":"USDT",
      "last_price":"0.6325",
      "base_volume":"46874.466672788",
      "target_volume":"29703.654537",
      "bid":"0.631",
      "ask":"0.6333",
      "high":"0.6499",
      "low":"0.6193"
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

