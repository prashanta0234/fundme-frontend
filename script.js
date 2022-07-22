import { ethers } from "./ethers-5.6.esm.min.js";
// import { one } from "./abc";
import { abi,contactAdress } from "./constans.js";

const connectbtn = document.getElementById("btn");
const fundbtn=document.getElementById("fund");
connectbtn.onclick = connect;
fundbtn.onclick=fund;
let isConnect=false;
async function connect() {
  console.log("i am clicked");

  if (window.ethereum !== undefined) {

    // connecting WITH metamask
    let succes = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    isConnect=true;
    if (succes) {

      // get account
      let account = await window.ethereum.request({ method: "eth_accounts" });
      console.log(account);
   
      // get balance
      let balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [`${account}`, "latest"],
      });

      // conversion from hex string to decimal
      let dec = parseInt(balance, 16);

      // conversion from Wei to to ETH
      let ethBalance = dec /10**18;


      // Show in frontend

      // show status
      document.getElementById("showStatus").innerHTML = "Conected";
      connectbtn.innerHTML = "Conected";

      // show account adress
       document.getElementById("adress").innerHTML = account;

      //  show balance
      document.getElementById("bal").innerHTML=ethBalance;

    }
  } else {
    alert("Please install metamask in your  browser");
    document.getElementById("showStatus").innerHTML = "please install Metamask";
  }
}
async function fund(){
  const ethAmount="1";
  if (isConnect) {
    console.log("hi")
    const provider=new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract=new ethers.Contract(contactAdress,abi,signer);
    try{
      const trnsactionResponse= await contract.fund({
        value: ethers.utils.parseEther(ethAmount)
      })
    }catch(error){
      console.log(error);
      alert(error.message)
    }
   
    console.log(contract)
  }else{
    alert("connect your metamask first")
  }
}
