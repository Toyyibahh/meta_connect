import React, {useState} from 'react'
import {ethers} from 'ethers';

const Walletcard = () => {

    const [errorMessage, setErrorMessage] = useState (null);
    const [defaultAccount, setDefaultAccount] = useState (null);
    const [userBalance, setUserBalance] = useState (null);
    const [connButtonText, setConnButtonText] = useState ('Connect Wallet');

    const connectWalletHandler = () =>{
        if (window.ethereum) {
            window.ethereum.request({method: 'eth_requestAccounts'})
            .then(result => {
                accountChangeHandler (result[0]);})
        } else {
            setErrorMessage('Install Metamask');
        }
}
const accountChangeHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    getUserBalance(newAccount);
};

const getUserBalance = (address) => {
    window.ethereum.request
    ({method: 'eth_getBalance', params: [address,'latest']})
    .then(balance => {
        setUserBalance(ethers.formatEther(balance));
    })
};
    return(
        <div classname='Walletcard'>
            <h4>{"Toyeebat Omolara Connection to Metamask using window.ethereum methods"}</h4>
            <button onClick={connectWalletHandler}>{connButtonText}</button>
            <div classname='accountDisplay'>
                <h3>Address: {defaultAccount}</h3>
            </div>
            <div className='balanceDisplay'>
                <h3>Balance: {userBalance}</h3>
            </div>
            {errorMessage}
        </div>
    )
}
export default Walletcard;