async function connect(){
     console.log("i am clicked");
     if(typeof window.ethereum !== undefined){
          let succes=await window.ethereum.request({method:"eth_requestAccounts"});
          if(succes){
               let account=await window.ethereum.request({method:"eth_accounts"});
               console.log(account)
               let balance= await window.ethereum.request({method:"eth_getBalance","params":[`${account}`, "latest"]});
               
               // conversion from hex string to decimal
               let dec = parseInt(balance, 16)

               // conversion from Wei to to ETH
               let ethBalance = dec*(10**18)
               console.log(ethBalance)
          }
     }
     else{
          alert("Please install metamask in your  browser");
     }
}