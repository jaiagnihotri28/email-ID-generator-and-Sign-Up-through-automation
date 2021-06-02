//testmail maker 
let idformed = [];
const puppeteer = require("puppeteer");

async function login(){
    let browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized"]
      });
    let pages = await browser.pages();
     
    let tab = pages[0];
    await tab.goto("https://mail.tm/en/")     // open for temporary mail

   
     for(let i= 0;i<3;i++){

    await tab.waitForSelector("#address",{visible:true})
    await tab.waitForTimeout(6000);
    await tab.click("#address")                    // copy mail id
    await tab.waitForTimeout(3000);




   
      await signuponinsta(browser,tab);      // fn to sign up on insta
      

  

  
  
  

    await tab.click("#logout")

    }

    console.log(idformed)



    

   
}

login();

async function signuponinsta(browser,tab){
  let newTab = await browser.newPage();
  await newTab.goto("https://www.instagram.com/accounts/emailsignup/");
  await newTab.waitForTimeout(4000);
  await newTab.click('input[aria-label="Mobile Number or Email"]')       // enter details
  await newTab.keyboard.down("Control")
  await newTab.keyboard.press("V")
  await newTab.keyboard.up("Control")
  //await newTab.click('input[aria-label="Full Name"]')
  await newTab.type('input[aria-label="Full Name"]',"Ayanokoji kiyotaka")
  //await newTab.click('input[aria-label="Username"]')
  
  await newTab.type('input[aria-label="Username"]',makeid(8)) //generate a unique userid
  //await newTab.click('input[aria-label="Password"]')
  await newTab.type('input[aria-label="Password"]',"1234567890po")

  await newTab.click('button[type="submit"]')
  await newTab.waitForSelector('select[title="Year:"]')      
  await newTab.click('select[title="Year:"]')
  await newTab.waitForTimeout(2000);
 

  for(let i= 0;i<25;i++){                          // choose your birthyear
    await newTab.keyboard.press("ArrowDown")

  }

  await newTab.keyboard.press("Enter")

  await newTab.click('.sqdOP.L3NKy._4pI4F.y3zKF')

  await tab.bringToFront();
  let otp = await getotp(tab);      // function te get otp from email automatically
  //let finalotp = parseInt(otp);
  

  let finalotp = otp.split("");       // modifying the opt recieved 
  
  let integerotp = await getinteger(finalotp);

  
  
  
    await newTab.bringToFront();

    await newTab.waitForSelector('input[aria-label="Confirmation Code"]',{visible:true})
    await newTab.type('input[aria-label="Confirmation Code"]',integerotp,{delay:10})
    await newTab.click('.sqdOP.L3NKy._4pI4F.y3zKF')
    await newTab.waitForTimeout(5000);
    await newTab.close();



  







}

 function makeid(length) {                  //program to generate a unique userid
  var result           = [];
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result.push(characters.charAt(Math.floor(Math.random() * 
charactersLength)));
 }
 let theid = result.join('')
 idformed.push(theid)
 return theid;
}

async function getinteger(array){                     // to make the otp in a form that can be submitted
  let str = ""
for(let i=0;i<array.length;i++){
    if(array[i]!=' ' && array[i]!='\n'){
        str+=array[i];
    }
}


let finalstr = "";
for(let i=0;i<str.length;i++){
    if(str.charAt(i)=='i'){
        break;
    }
    finalstr+=str.charAt(i);
}

// let finalotp = parseInt(finalstr);

return finalstr;

}

async function getotp(tab){ 

  
  await tab.reload();            //to recieve latest mail
  await tab.waitForTimeout(10000);
  await tab.waitForSelector('.min-w-0.flex-1.flex.items-center .hidden .text-gray-900',{visible:true})
  
  let element = await tab.$('.min-w-0.flex-1.flex.items-center .hidden .text-gray-900')
  let value = await tab.evaluate(function(elem){
    return elem.textContent;
  },element) 
//.flex-1.min-w-0 h2
  
  return value;

}

async function addonpad(browser){    // this function can be used to make a note of all id generated
  let newTab = await browser.newPage();
  await newTab.goto("https://www.rapidtables.com/tools/notepad.html");
  await newTab.waitForTimeout(4000);
  await newTab.keyboard.down("Control")
  await newTab.keyboard.press("V")
  await newTab.keyboard.up("Control")
  await newTab.keyboard.press("Enter")

  newTab.close();



}
