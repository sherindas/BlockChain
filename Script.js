
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

// Add your own contract address which you deployed on XDC
const contractAddress = "0x1435DB735c95D4EB44e421914EAdF0742250BeC2";

const contractABI = [
    {
        "inputs": [
            {
                "internalType": "address payable",
                "name": "_benificiary",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_goal",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_deadline",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "benificiary",
        "outputs": [
            {
                "internalType": "address payable",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "contribute",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "contribution",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "goal",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "raiseamount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

const contract = new ethers.Contract(contractAddress, contractABI, signer);

const connectButton = document.getElementById('connect-button');
const contributionForm = document.getElementById('contribution-form');
const amountInput = document.getElementById('amount');
const contributeButton = document.getElementById('contribute-button');
const withdrawButton = document.getElementById("withdraw-button");
const statusDiv = document.getElementById('status');

if (connectButton) {
    connectButton.addEventListener("click", async () => {
        try {
            await provider.send("eth_requestAccounts", []);
            const accounts = await signer.getAddress();
            console.log(accounts);
            statusDiv.textContent = "Connected to: " + accounts;
        } catch (error) {
            console.error("Connection error:", error);
            statusDiv.textContent = "Connection Failed: " + error.message;
        }
    });
}

if (contributeButton) {
    contributeButton.addEventListener("click", async () => {
        try {
            const amount = ethers.utils.parseEther(amountInput.value);
            const tx = await contract.contribute({ value: amount });
            await tx.wait();
            statusDiv.textContent = "Contribution Successful!";
        } catch (error) {
            console.error("Contribution error:", error);
            statusDiv.textContent = "Contribution Failed: " + error.message;
        }
    });
}gi 

if (withdrawButton) {
    withdrawButton.addEventListener("click", async () => {
        try {
            const tx = await contract.withdraw();
            await tx.wait();
            statusDiv.textContent = "Withdrawal Successful!";
        } catch (error) {
            console.error("Withdrawal error:", error);
            statusDiv.textContent = "Withdrawal Failed: " + error.message;
        }
    });
}

if (goal)



