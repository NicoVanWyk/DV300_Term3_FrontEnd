## <p align="center" style="text-decoration: none !important;padding:0;margin:0;">Mareli Lourens 221119, Nico van Wyk 221179, Luca Breebaart 221345, CS Strijdom 21100249 <br> Interactive Development 300 - Term 3</p>

<p align="center">
  <img src="./ReadMe/Icon.png" height="75" style="display: block; margin: 0 auto;">
</p>

## <p align="center" style="text-decoration: none !important;padding:0;margin:0;">Cross-Platform Desktop Development</p>
## <p align="center" style="text-decoration: none !important;padding:0;margin:0;">Backend Link: https://github.com/Pantonym/Du_Fang_Backend</p>

## Table of Contents

- [Mareli Lourens 221119, Nico van Wyk 221179, Luca Breebaart 221345, CS Strijdom 21100249  Interactive Development 300 - Term 3](#mareli-lourens-221119-nico-van-wyk-221179-luca-breebaart-221345-cs-strijdom-21100249--interactive-development-300---term-3)
- [Cross-Platform Desktop Development](#cross-platform-desktop-development)
- [Backend Link: https://github.com/Pantonym/Du\_Fang\_Backend](#backend-link-httpsgithubcompantonymdu_fang_backend)
- [Table of Contents](#table-of-contents)
- [About the project:](#about-the-project)
  - [Product mockup:](#product-mockup)
  - [Project description:](#project-description)
  - [Built with:](#built-with)
    - [Axios](#axios)
    - [React.js](#reactjs)
    - [C#](#c)
    - [Electron](#electron)
    - [Aiven](#aiven)
- [Getting Started:](#getting-started)
  - [Prerequisites:](#prerequisites)
    - [Do once in the terminal:](#do-once-in-the-terminal)
    - [Do After in the terminal:](#do-after-in-the-terminal)
- [Features and Functionality:](#features-and-functionality)
  - [Code Snippets](#code-snippets)
    - [Nico Van Wyk](#nico-van-wyk)
- [Concept Process:](#concept-process)
  - [Ideation:](#ideation)
  - [Wireframes:](#wireframes)
- [Development Process](#development-process)
  - [Highlights](#highlights)
  - [Challenges](#challenges)
- [Future Implementation](#future-implementation)
- [Final Outcome](#final-outcome)
- [Conclusion](#conclusion)
- [Authors](#authors)
- [Contact](#contact)
- [Project Link](#project-link)

## About the project:

### Product mockup:
![Mockup](./ReadMe/Product_Mockup.png)

### Project description:
We developed a cross-platform desktop application that simulated an e-banking system. The project allowed account holders to manage their finances, including purchasing specific currencies, making transactions with other account holders, and withdrawing funds. A particularly intriguing aspect of this endeavor was the administrative functionalities, where an admin user could manage accounts, view transactions, and perform actions such as freezing accounts. The project placed a strong emphasis on secure authentication practices, including 2-factor authentication, and incorporated data summaries and visualizations to provide insights into user activity.

### Built with:

#### Axios
* Makes Asynchronous JavaScript and XML (AJAX) easier to implement.
* It is a JavaScript library.
* Enables asynchronous requests.
* Used to implement Create, Read, Update and Delete (CRUD) functionality.
<p>AXIOS implemented the requirements of having a fully-functional database.</p>
<img src="/ReadMe/AJAX_Logo.jpg" alt="AJAX-Logo" style="width: 400px; height: 225px;"/>
<img src="/ReadMe/AXIOS_logo.png" alt="Axios-Logo" style="width: 400px; height: 225px;"/>

#### React.js
* React focuses on using components to build user interfaces for both mobile and desktop. 
* It is open-source.
* It is a JavaScript library.
* It is owned by Meta, the owners of Facebook.
<p>React implemented the frontend of the application.</p>
<img src="/ReadMe/react_logo.jpeg" alt="React-Logo" style="width: 400px; height: auto;"/>

#### C#
* C# is an object and component-oriented programming language.
* It was used to create the backend, but can also be used to create programs such as games.
* It was created by Anders Hejlsberg in the year 2000.
<p>C# was used to build the backend logic of the application.</p>
<img src="/ReadMe/C.png" alt="C#-Logo" style="width: 400px; height: auto;"/>

#### Electron
* Electron is an open-source framework developed by OpenJS.
* It uses web-based technologies to create desktop apps.
* It has been used to create many famous apps, such as GitHub Desktop.
<p>Electron was used to build a functioning desktop application.</p>
<img src="/ReadMe/Electron.png" alt="Electron-Logo" style="width: 200px; height: auto;"/>

#### Aiven
* Aiven allows users to have the same database across multiple devices.
* It works through apps such as PGAdmin4, synching servers across devices.
<p>Aiven was used to have the same data across all group members.</p>
<img src="/ReadMe/Aiven.png" alt="Electron-Logo" style="width: 400px; height: auto;"/>

## Getting Started:

### Prerequisites:

* [NPM](https://www.npmjs.com/)
* The following installations are required to use this project:
* 
#### Do once in the terminal:
`Npm i -g electron`
This installs electron globally

#### Do After in the terminal:
```
Mkdir my-electron-app
Cd my-electron-app
Npm init -y
Npm install electron --save-dev
Npm install concurrently --save-dev
Npm install axios
Npm install react-lottie
```

## Features and Functionality:

The web application is organized into six key user-facing pages, each with specific functionalities. The landing page features an introductory video and the company logo, leading users to the authentication page. Here, users can register with their email, username, and password, secured with 2-factor authentication via email OTP. After successful login, users access their account overview, displaying their balance, recent transactions, and visual summaries of activities. If accounts are frozen, users are notified and restricted from viewing details.

On the purchasing currency page, users can buy currencies at displayed exchange rates, with their balance updated accordingly. The transactions and withdrawals page allows users to transfer funds and withdraw money, with transaction histories shown. Admins have a dedicated portal to view account details, freeze accounts, and review transaction histories, without making transactions on behalf of users.

### Code Snippets
#### Nico Van Wyk
* I was responsible mainly for Transactions. This includes deposits, withdrawals, transfers and the purchasing and selling of StarCoins.
* All functions are controlled through components that can be reused on any page. Each transaction type has its own component for use in the frontend.
* Example:
```
{showModal && (
  <>
    <div className={styles.modalOverlay} onClick={handleClose}></div>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h5 className={styles.modalTitle}>Top-up (Deposit)</h5>
          <button className={styles.closeButton} onClick={handleClose}>&times;</button>
        </div>
        <div className={styles.modalBody}>
          <div className='transactions-container dark-bg--gradient'>
            <p className={styles.titles}> Top-Up Amount (In Rands):</p>
            <input
              type="number"
              name="input2"
              value={cashAmount}
              onChange={handleChangeTopup}
              className={styles.input}
              min={200}
            />
            ...
          </div>
        </div>
        <div className={styles.modalFooter}>
          <button className={`${styles.closeButton} tertiary-btn`} onClick={handleClose} disabled={isButtonDisabled}>
            Close
          </button>
          <button className={`${styles.continueButton} btn-main `} onClick={handleTopup} disabled={isButtonDisabled}>
            Submit
          </button>
      </div>
    </div>
  </>
)}
```

* In the backend, the TransactionController was used to control the requests to change the data.
* For example, the request that purchases and sells StarCoins:
```
[HttpPost("StarCoinPurchase")]
  public async Task<ActionResult<Transaction>> StarCoinPurchase(int fromAccountId, int starCoins, decimal amount)
  {
    // Validate account, check balance, and perform purchase logic
    // --Validation
    var account = await _context.Accounts.FindAsync(fromAccountId);
      if (account == null)
      {
        return NotFound("Account does not exist.");
      }
      // Update account and StarCoin balance
      account.Balance += amount;
      account.CoinBalance += starCoins;
      // Determine transaction type based on whether coins are being bought or sold
      string transType;
      if (starCoins < 0)
      {
        transType = "StarcoinSell";
      }
      else
      {
        transType = "StarCoinPurchase";
      }
      // --Build the transaction
      var transaction = new Transaction
      {
        FromAccountId = fromAccountId,
        ToAccountId = fromAccountId, //the user essentially transfers one form of money to another for themselves, and as such they are both receiver and sender.
        Amount = amount,
        TransactionType = transType,
        Timestamp = DateTime.UtcNow
      };
      _context.Transactions.Add(transaction);
      await _context.SaveChangesAsync();
      // Check and upgrade status
      await _accountService.CheckAndUpgradeStatus(fromAccountId);
      return CreatedAtAction("GetTransaction", new { id = transaction.TransactionId }, transaction);
  }
```

* This builds a transaction to add to the database. It also changes the relevant information in the account - the balance and coin balance. 
* In addition to this, whenever a user completes a transaction the system will check to see if they can be upgraded to another level (Bronze to Platinum for a total of 4 possible levels). This is done with the `await _accountService.CheckAndUpgradeStatus(fromAccountId);` line that is present at the end of each transaction function.
* This is how it is structured in the AccountService file:
```
public async Task CheckAndUpgradeStatus(int accountId)
{
  var account = await _context.Accounts
    .Include(a => a.TransactionsFrom)
    .FirstOrDefaultAsync(a => a.AccountId == accountId);

  if (account == null)
  {
    throw new Exception("Account not found.");
  }

  // Count the number of transactions initiated by the account - with no transactions in mind
  int transactionCount = account.TransactionsFrom?.Count ?? 0;
  decimal balance = account.Balance;

  // Check and upgrade status based on the criteria
  if (balance >= 50000 || transactionCount >= 100)
  {
    account.StatusId = 4; // Platinum
  }
  else if (balance >= 20000 || transactionCount >= 50)
  {
    account.StatusId = 3; // Gold
  }
  else if (balance >= 5000 || transactionCount >= 10)
  {
    account.StatusId = 2; // Silver
  }
  else if (balance < 5000 || transactionCount < 10)
  {
    account.StatusId = 1; // Bronze
  }
  _context.Entry(account).State = EntityState.Modified;
  await _context.SaveChangesAsync();
}
```

## Concept Process:
### Ideation:
During the initial brainstorming phase of the project, we explored similar websites where companies manage their stock and drew inspiration from gambling games with crafting systems. These sources served as our primary influences, and we incorporated elements we found appealing into our wireframe designs. Once the wireframes were finalized, we proceeded with the initial codebase setup and backend configuration.

### Wireframes:
![dashboard](./ReadMe/dashboard.png)
![transaction](./ReadMe/transaction.png)
![single_coin_view](./ReadMe/single_coin_view.png)
![admin](./ReadMe/admin.png)
![admin2](./ReadMe/admin2.png)

## Development Process
### Highlights
We found the experience of working on this project to be immensely rewarding. One of the key highlights us was learning how to work as a team to complete a website that is fully functional and deployment ready.

Overall, I feel that this project was an incredibly valuable learning experience for us. Not only did it allow us to expand our skill sets and gain a deeper understanding of key concepts and techniques, but it also gave us the opportunity to work on a real-world project with practical applications as a group. We look forward to building on what we've learned and continuing to grow and develop as programmers and developers in the future.

### Challenges
Throughout this project, we faced several challenges that pushed us beyond our comfort zones. One of the most significant hurdles was deciding when to migrate the database, which often required recreating data due to a single change. Despite these difficulties, the project proved to be an invaluable learning experience. Navigating the complexities of database management expanded our developer capabilities and honed our problem-solving skills. On the positive side, we enjoyed the efficiency of generating controllers with simple commands, which saved time and allowed for immediate integration. Looking back, we feel a strong sense of accomplishment and are eager to apply these lessons to future projects.


## Future Implementation
Reflecting on our work on this project, there are several areas where we feel there is room for improvement and further development. One of the key areas where we would like to focus in the future is on stabilizing the code and improving consistency. While we were able to get the code working effectively for the purposes of this project, we feel that there is room for improvement in terms of streamlining the code, making it more efficient, and reducing redundancies. In addition, we would like to develop a more consistent coding style when it comes to working in a group, to make the code more accessible to others and easier to maintain over time.

Another area where we would like to expand and enhance the project is in making it more interactive and engaging for users. While the website is functional and provides a useful service, we believe that there is room to add more interactivity and animation to the site, in order to make it more visually appealing and engaging for users. This might involve developing new features and functionalities, such as interactive maps or dynamic data visualizations, or adding subtle animations and effects to various elements of the site.

## Final Outcome

## Conclusion
This project has been an incredible learning experience for us, and we are truly grateful for the opportunity to work on it. Throughout the course of the project, we have learned so much, from technical skills to project management and collaboration.

Working on this project has allowed us to put into practice many of the concepts and techniques we have learned in our studies, and it has also challenged us to expand our knowledge and skills. From developing the initial idea to designing and implementing the project, we have gained a deeper understanding of the software development process and the importance of effective communication and teamwork.

We am particularly proud of the progress we have made in developing our programming skills. We have also gained a greater appreciation for the importance of testing and debugging, and how these skills are critical to developing high-quality software.

Overall, this project has been an incredibly fulfilling experience, and we are eager to continue working on it and implementing new features and improvements in the future. We believe that this project has not only helped us to develop our technical skills, but has also given us valuable experience working in a team environment and managing a project from start to finish. We am excited to take these skills and experiences with me as we move forward in our career, and we am confident that they will serve us well in whatever challenges lie ahead.

## Authors
Mareli Lourens - [Find me on Github](https://github.com/MareliLourens)<br>
Nico van Wyk - [Find me on Github](https://github.com/Pantonym)<br>
Luca Breebaart - [Find me on Github](https://github.com/LucaBreebaart)<br>
CS Strijdom - [Find me on Github](https://github.com/DanteCS25)

## Contact
Mareli Lourens - [Email](mailto:221119@virtualwindow.co.za)<br>
Nico van Wyk - [Email](mailto:221179@virtualwindow.co.za)<br>
Luca Breebaart - [Email](mailto:221345@virtualwindow.co.za)<br>
CS Strijdom - [Email](mailto:21100249@virtualwindow.co.za)

## Project Link
Frontend - https://github.com/MareliLourens/Du_Fang <br>
Backend - https://github.com/Pantonym/Du_Fang_Backend

* https://www.codeguru.com/csharp/c-sharp-advantages/ (C# Logo Image)
* https://en.m.wikipedia.org/wiki/File:Electron_Software_Framework_Logo.svg (Electron Logo Image)
* https://github.com/topics/react-ui (React Logo Image)
* https://www.geekboots.com/story/ajax-and-its-usability-in-web-development (AJAX Logo Image)
* https://blog.openreplay.com/integrating-axios-with-react-hooks/ (AXIOS Logo Image)
* https://www.businesswire.com/news/home/20221207005038/en/Aiven-Introduces-an-Open-Source-Streaming-Ecosystem-for-Apache-Kafka (Aiven Logo Image)