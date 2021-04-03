# Asset Sentiment Analysis Platform (ASAP)

## Project Description

The Asset Sentiment Analysis Platform, or ASAP, is an application designed to allow users the ability to track and follow various financial assets (stocks, cryptocurrencies, etc.). Assets can be added to a user's watchlist, which will allow for them to receive news and price updates on their dashboard. Additionally, users are able to perform online sentiment analysis on a chosen asset that will query social media APIS (such as Reddit and Twitter) for mentions of an asset or its symbol. The content of online posts about the asset can be given a bullish, bearish, or neutral rating based upon the analyzed sentiment, which is performed by AWS Comprehend. This will allow for users to be able to stay on top of retail investor sentiment for their favorite assets to aid them in anticipating market moves.

Link to back-end repository ASAP: https://github.com/revature-asap/ASAP

## Technologies Used

Client Tier:
  - Language: TypeScript version 4
  - Framework: Angular version 11
  - Styling: Material UI + CSS

DevOps Tools:
  - Pipeline: AWS CodePipeline
  - Build Server: AWS CodeBuild
  - Deployment: AWS Elastic Beanstalk

## Features

* Register for a new account.
* Confirm my account by email.
* Login in using existing account credentials.
* View the latest news stories on popular assets.
* View the latest news stories on assets I am following.
* View basic information regarding an asset.
* See various price charts (line and candlestick) at different time scales (e.g. 5m, 15m, 30m, 1h, 4h, 6h, 1d).
* See news sentiment regarding an asset.
* See social media sentiment regarding an asset.
* See technical indicators regarding an asset.
* Perform technical/trend analysis using interactive drawing tools on charts.
* Create and share content with other users regarding an asset.
* Comment on shared content provided by other users.

## Getting Started


* Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

* Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

* Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

* Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

* Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
   
(include git clone command)
(include all environment setup steps)

> Be sure to include BOTH Windows and Unix command  
> Be sure to mention if the commands only work on a specific platform (eg. AWS, GCP)

- All the `code` required to get started
- Images of what it should look like

## Usage

> Here, you instruct other people on how to use your project after they’ve installed it. This would also be a good place to include screenshots of your project in action.

## Contributors

- Gregory Gertson (Gerts19)
- Alex Googe (darkspearrai)
- Christopher Nichols (return5)
- Cole Space (vanikin3)
- Calvin Zheng (ZGCalvin)
- Tuan Mai (blackiceiceo)
- Gabrielle Luna (GabMoon)
- Eric Newman (enewmanMN)
- Daniel Skwarcha (Daniel-Skwarcha)
- Jonathan Norman (jaynorman1920)
- Kalyb Levesque (kml160030)
- Briant Withrow (Brian-Revature)
- Brandon Johnson (BrandonJohnson777)
- Nathan Gamble (NateGamble)
