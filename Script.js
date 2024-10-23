const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner(); // Corrected method name

const contractAddress = "0x1110cf61fd3d65b0a01bc2c80219c4a071e22a6916a91e210fe6ecc576bc9afd";
const contractABI = [
    {
        "inputs": [
            {
                "internalType": "address payable",
                "name": "_benificiary", // Note: correct spelling should be "beneficiary"
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
        "name": "beneficiary", // Corrected spelling
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
const amountInput = document.getElementById("contribution-amount"); // Corrected to match expected ID
const statusDive = document.getElementById('status');

if (connectButton) {
    connectButton.addEventListener("click", async () => {
        try {
            await provider.send("eth_requestAccounts", []);
            const accounts = await signer.getAddress();
            statusDive.textContent = "Connected to: " + accounts;
        } catch (error) {
            console.error(error);
        }
    });
}

if (contributionForm) { // Change this to `contributionForm`
    contributionForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent form submission
        try {
            const amount = ethers.utils.parseEther(amountInput.value);
            const tx = await contract.contribute({ value: amount }); // Fixed the object syntax
            await tx.wait(); // Fixed typo from `t2` to `tx`
            statusDive.textContent = "Contribution successful!";
        } catch (error) {
            console.error(error);
        }
    });
}