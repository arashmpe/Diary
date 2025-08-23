# AI Memory NFT Minter

An innovative DApp that transforms your written memories into unique, AI-generated art and mints them as NFTs on the blockchain.

<!-- Add a screenshot of the application here -->
<!-- <img src="./path/to/screenshot.png" alt="AI Memory Minter Screenshot" width="100%"/> -->

## ✨ Core Features

- **AI-Powered Art:** Leverages multiple AI services to bring memories to life.
  - **Image Generation:** Uses **Fal.ai** with Stable Diffusion models to create stunning visuals from text.
  - **Text Generation:** Uses **Groq** with Llama 3 models to generate creative titles and captions for your art.
- **Decentralized Storage:** All NFT images and metadata are uploaded to **IPFS** via Pinata, ensuring they are persistent and decentralized.
- **On-Chain Minting:** Mint your generated memories as ERC-721 NFTs on the **Shape Sepolia** testnet.
- **Modern Web3 Stack:** Built with the latest technologies for a smooth and robust user experience.

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router) & [React 19](https://react.dev/)
- **Blockchain Interaction:** [Wagmi](https://wagmi.sh/) for contract calls and wallet state.
- **Wallet Connection:** [RainbowKit](https://www.rainbowkit.com/) for a seamless multi-wallet experience.
- **AI Services:**
  - [Fal.ai](https://fal.ai/) for Image Generation.
  - [Groq](https://groq.com/) for high-speed Text Generation.
- **Decentralized Storage:** [Pinata](https://pinata.cloud/) for IPFS uploads.
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/) for a beautiful, responsive UI.
- **Language:** [TypeScript](https://www.typescriptlang.org/)

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd <your-repo-name>
2. Install Dependencies
This project uses yarn as the package manager.

yarn install
3. Set Up Environment Variables
You need to create a .env file in the root of the project. You can copy the .env-example file if it exists, or create a new one.

cp .env-example .env
Fill the .env file with the following keys:

# WalletConnect & Alchemy Keys (for network connection)
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID="b24c..."
NEXT_PUBLIC_ALCHEMY_KEY="0Yz..."

# AI Service Keys
FAL_API_KEY="key-id:key-secret"   # Get from fal.ai
GROQ_API_KEY="gsk_..."            # Get from groq.com

# IPFS Pinning Service Key
PINATA_JWT="eyJ..."               # Get from pinata.cloud

# Deployed Smart Contract Address
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS="0xd6E..." # The address of your deployed NFT Collection contract
4. Run the Development Server
yarn dev
Open http://localhost:3000 in your browser to see the result.

📄 How It Works
Connect Wallet: The user connects their wallet to the Shape Sepolia testnet.
Write Memory: The user writes a memory or a descriptive text.
Generate Art: The app sends the text to a backend API that calls Fal.ai and Groq to generate an image, title, and caption.
Display & Review: The generated art and text are displayed for the user to review.
Mint NFT:
Upon clicking "Mint", the frontend calls another API to upload the image and metadata to IPFS via Pinata.
The frontend receives the IPFS URI for the metadata.
It then uses Wagmi to prompt the user to sign a transaction to call the mintTo function on the smart contract.
Success: Once the transaction is confirmed on the blockchain, a success message with a link to the transaction on ShapeScan is displayed.
```
