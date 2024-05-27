## polkadex-integration-api

This project implements the Polkadex API endpoints necessary for integration into CoinMarketCap and CoinGecko.

[Polkadex API Documentation for CoinGecko](docs/CoinGecko.md)

[Polkadex API Documentation for CoinMarketCap](docs/CoinMarketCap.md)

## Installation

`npm install`

## To start the application

`npm run dev`

Required Environment Variables:

* MYSQL_DB_HOST
* MYSQL_DB_USER
* MYSQL_DB_PASSWORD
* MYSQL_DB

## Deployment

Use github actions to push to AWS EC2