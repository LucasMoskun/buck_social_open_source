
import detectEthereumProvider from '@metamask/detect-provider'

export const EnableWeb3 = async () => {
    const provider = await detectEthereumProvider();
    if(provider) {
        console.log("provider detected! " + provider)
        establishWeb3Connection(provider);
    } else {
        alert("Please install metamask !")
    }
}

function establishWeb3Connection(provider) {
    if(provider !== window.ethereum) {
        console.error('Do you have multiple wallets installed');
    } else {
        const Web3 = require("web3");
        const ethEnabled = () => {
            if (window.ethereum) {

                window.web3 = new Web3(window.ethereum);
                console.log("Chain ID:" + window.ethereum.chainId)
                return true;
            }
            return false;
        }

        if(ethEnabled())
        {
            console.log("eth enabled")
        } else {
            alert("eth not enabled")
        }
    }
}

export const GetCurrentAddress = async () => {
    let accounts;
    try{
        accounts = await window.ethereum.request({ method: 'eth_requestAccounts'});
        return accounts[0]; 
    } catch (error) {
        console.error("Unable to Get Current Address: " + error)
        return -1;
    }

}

export function Validate_xDaiChainId() {
    const chainId = parseInt(window.ethereum.chainId)
    console.log("chainId: " + chainId)
    
    if(chainId !== 100)
    {
        alert("Please join xDai chain to complete transfer")
        return false;
    }
    return true;
    

}

const dollarOfxDai = 1000000000000000000;
const pennyOfxDai = 10000000000000000;

//Warning, up to calling function to validate xDain chain first! (use Validate_xDaiChainID())
export const Send_xDai = async (toAddress, fromAddress, toHouse) => {
    var amount = dollarOfxDai;
    if(toHouse) {
        amount = pennyOfxDai;
    }

    var accounts;
    try{
        accounts = await window.ethereum.request({ method: 'eth_requestAccounts'});
        console.log("connected to wallet")
    } catch (error) {
        console.error(error)
    }

    if(accounts[0] !== fromAddress){
        alert("Make sure you are trying to settle bet with the same account as as a player who made handshake!")
        return;
    }
    
    await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [
            {
                from: fromAddress,
                to: toAddress,
                value: window.web3.utils.toHex(amount)
            }
        ]
    }, function(error,result ) {
        console.log("Send Result: " + result)
        console.log("Send error: " + error)
    } );
}
