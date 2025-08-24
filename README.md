AI Memory NFT Minter - Shapecraft Hackathon
Link to GitHub Repository: https://github.com/arashmpe/Diary/tree/Diary-1

This project was developed for the Shapecraft AI x NFT Hackathon.

🎥 Screen Recording & Walkthrough
A detailed screen recording that walks through the project concept and functionality will be available here.
https://drive.google.com/file/d/1pKCKoYQKKNvg8Vbq-DsHAbO0QvB9q2LA/view?usp=sharing

👥 Team Members
Arash MPE: https://github.com/arashmpe

💡 Concept
The AI Memory NFT Minter is an innovative decentralized application (DApp) that transforms your written memories into unique, AI-generated art and mints them as NFTs on the blockchain. Our goal is to create a new way for people to preserve their most cherished moments, turning abstract feelings and memories into tangible, ownable digital assets.

How It Works (Walkthrough)
Connect Wallet: The user connects their Web3 wallet to the application, which operates on the Shape Sepolia testnet.
Write a Memory: The user is prompted to write a memory, a dream, a story, or any text that they wish to immortalize.
AI-Powered Generation:
The application sends the user's text to a backend service that leverages Groq (using Llama 3) to generate a creative title and a descriptive caption based on the memory.
Simultaneously, it uses Fal.ai (with Stable Diffusion models) to generate a unique piece of art that visually represents the memory.
Review and Approve: The generated artwork, title, and caption are displayed for the user to review.
Mint as NFT:
Once the user approves, the frontend uploads the image and its metadata (title, description) to IPFS via Pinata, ensuring the data is stored in a decentralized and permanent manner.
The application then initiates a transaction on the blockchain, prompting the user to mint their memory as an ERC-721 NFT.
Confirmation: After the transaction is confirmed, the user receives a confirmation with a link to view their newly minted NFT on an explorer like ShapeScan.
🔮 Future Features
We have a long-term vision for this project. Here are some of the features we plan to add in the future:

Art Style Selection: Allow users to choose from a variety of artistic styles (e.g., "Impressionism," "Cyberpunk," "Anime," "Photorealistic") for their generated art.
Enhanced Personalization: Improve the AI's output by allowing users to provide additional personal data, such as gender, date of birth, location, etc., for a more context-aware creation.
NFT Collections: Enable users to group their minted memories into collections, creating a personal gallery or themed sets.
On-Chain Metadata: Give users the option to store the title and description of their memory directly on-chain for maximum permanence.
AI-Extracted Metadata: Use AI to automatically extract metadata from the generated image, such as dominant colors, detected objects, or artistic elements, and include this information in the NFT's metadata.
Personal Gallery & Sharing: Create a personal, filterable gallery for each user to view their collection and share their minted memories with others.
🛠️ Tech Stack
Framework: Next.js 15 (App Router) & React 19
Blockchain Interaction: Wagmi for contract calls and wallet state.
Wallet Connection: RainbowKit for a seamless multi-wallet experience.
AI Services:
Fal.ai for Image Generation.
Groq for high-speed Text Generation.
Decentralized Storage: Pinata for IPFS uploads.
Styling: Tailwind CSS & shadcn/ui for a beautiful, responsive UI.
Language: TypeScript
🚀 Getting Started Locally
Follow these steps to set up and run the project on your local machine.

1. Clone the Repository
git clone https://github.com/morteza-hmi/shapecraft-ai-memory-minter.git
cd shapecraft-ai-memory-minter
2. Install Dependencies
This project uses yarn as the package manager.

yarn install
3. Set Up Environment Variables
Create a .env file in the root of the project by copying the example file.

cp .env-example .env
Fill the .env file with your API keys and contract address:

# WalletConnect & Alchemy Keys (for network connection)
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID="YOUR_WALLET_CONNECT_ID"
NEXT_PUBLIC_ALCHEMY_KEY="YOUR_ALCHEMY_KEY"

# AI Service Keys
FAL_API_KEY="YOUR_FAL_API_KEY"
GROQ_API_KEY="YOUR_GROQ_API_KEY"

# IPFS Pinning Service Key
PINATA_JWT="YOUR_PINATA_JWT"

# Deployed Smart Contract Address
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS="YOUR_NFT_CONTRACT_ADDRESS"
4. Run the Development Server
yarn dev
Open http://localhost:3000 in your browser to see the result.
