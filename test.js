require('dotenv').config()

var data=[]



var JiraClient = require('jira-connector');

var jira = new JiraClient({
    host: 'poc-ocbc-openshift.atlassian.net',
    basic_auth: {
        email: "ivan.habibi@mii.co.id",
        api_token: "giSMG8eqeZbXDGi8gAQVB8A5"
      }
  });

// jira.issue.getIssue({
//     issueKey: 'IA-1'
// }, function(error, issue) {
//     if (error){
//         return console.log(error);
//     }
//     console.log(issue.fields.summary);
// });


// function daftarIssuediJira(payload){



// }







//========================================SELENIUM========================================
const chrome = require('selenium-webdriver/chrome');
const {Builder, By, Key, logging, until} = require('selenium-webdriver');


// const chrome = require('selenium-webdriver/chrome');
// // const firefox = require('../firefox');
// // const {Builder, By, Key, until} = require('..');
// const {Builder, By, Key, until} = require('selenium-webdriver');

const width = 640;
const height = 480;

// let driver = new Builder()
//     .forBrowser('chrome')
//     .usingServer(process.env.URL_SELENIUM_SERVER||'http://localhost:4444/wd/hub')
//     .setChromeOptions(
//         new chrome.Options().headless().windowSize({width, height}))
//     // .setFirefoxOptions(
//     //     new firefox.Options().headless().windowSize({width, height}))
//     .build();




 
(async function example() {


  let driver = new Builder()
  .forBrowser('chrome')
  .usingServer(process.env.URL_SELENIUM_SERVER)
  .setChromeOptions(
      new chrome.Options().headless().windowSize({width, height}))        
  .setChromeService(
    new chrome.ServiceBuilder()
        // .enableVerboseLogging()
        .setStdio('inherit'))
        .build();
  try {
    await driver.get(process.env.APPLICATION_TESTING_URL);
    await driver.findElement(By.name(process.env.ELEMENT_EMAIL)).sendKeys(process.env.INPUT_EMAIL, Key.RETURN);
    await driver.findElement(By.name(process.env.ELEMENT_PASSWORD)).sendKeys(process.env.INPUT_PASSWORD, Key.RETURN);
    // await driver.wait(until.titleIs('webdriver - Google Search'), 10000);
} catch (error) {
    console.log(error)
    data.push({step:"pada step pengisian email",error:error.message})
    
  } finally {
    await driver.quit();

    if(data.length!=0){
      var bodyData = {
        fields:{
            project:{
                key:"IA"
            },
            summary:"bug aplikasi",
            description:JSON.stringify(data),
            issuetype:{
                name:"Bug"
            }
        }
    };
    jira.issue.createIssue(bodyData, function(error, response) {
        if (error){
            return console.log(error);
        }
        console.log(response);
    });
    }

  }
})();


//==========================================HEADLESS=========================================================================================================




// driver.get('http://www.google.com/ncr')
//     .then(_ =>
//         driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN))
//     .then(_ => driver.wait(until.titleIs('webdriver - Google Search'), 1000))
//     .then(_ => {driver.quit()},e => driver.quit().then(() => { throw e; }));

