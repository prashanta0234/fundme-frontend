import { ethers } from "./ethers-5.6.esm.min.js";
// import { one } from "./abc";

const connectbtn = document.getElementById("btn");
connectbtn.onclick = connect;

async function connect() {
  console.log("i am clicked");
  if (window.ethereum !== undefined) {
    let succes = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    if (succes) {
      let account = await window.ethereum.request({ method: "eth_accounts" });
      console.log(account);
      let balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [`${account}`, "latest"],
      });

      // conversion from hex string to decimal
      let dec = parseInt(balance, 16);

      // conversion from Wei to to ETH
      let ethBalance = dec /10**18;
      console.log(dec)
      console.log(ethBalance);
      document.getElementById("showStatus").innerHTML = "Conected";
      connectbtn.innerHTML = "Conected";

      document.getElementById("adress").innerHTML = account;
      document.getElementById("bal").innerHTML=ethBalance;
      console.log(ethers);
    }
  } else {
    alert("Please install metamask in your  browser");
    document.getElementById("showStatus").innerHTML = "please install Metamask";
  }
}
