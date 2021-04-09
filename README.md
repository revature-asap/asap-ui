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
  - Deployment: AWS S3 Bucket

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

Clone the repository to your local machine with the git clone command:

- git clone https://github.com/revature-asap/asap-ui.git

The following are AnglulerCLI commands for starting the server and running tests

* Development server (Need Angular CLI for running the command)

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

* Code scaffolding (Need Angular CLI for running the command)

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

* Build (Need Angular CLI for running the command)

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

* Running unit tests (Need Angular CLI for running the command)

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

* Running end-to-end tests (Need Angular CLI for running the command)

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
   
You can use either of the two following commands to locally host the project:

- ng serve (will only run the serve command)
- npm start (will run asap-ui@<version> start and ng serve)

These commands will allow you to hit the webpage from localhost:4200
All service files will be hitting the hosted project. In order to hit your own hosted project or a local project, the URLs will need to be changed in the service files below to the local url:

## Usage

Once you run `ng serve` or `npm start` the front end will spin up on `localhost:4200`, which you can hit with any broswer you like. Once the page loads, you will be able to navigate through the website:

- The first page is the `home` page, which has some base assets and some general comments made by a few of the users, as well as you can see news about the assets across the top of the page
- When a ticker is clicked, it will take you to the `companyDisplay` page, which if you are logged in, allows you to add the asset to your watchlist
- If you navigate to the `login` page, you can login with existing credentials or naviagte to the `register` page
- On the `register` page, you can sign up for a new account. You must use an email you have access too, in order to confirm your account
- When logged in, you can navigate to the `profile` page, which shows some basic information as well as the watchlist
- Clicking an asset in the watchlist will create a drop down menu showing basic information, which when the logo is clicked, you are directed to the `companyDisplay` page

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
