# AI Memory NFT Minter – Shapecraft Hackathon

[![GitHub Repo](https://img.shields.io/badge/GitHub-Repo-blue)](https://github.com/arashmpe/Diary/tree/Diary-1)
[![Demo Video](https://img.shields.io/badge/Watch-Demo-red)](https://drive.google.com/file/d/1pKCKoYQKKNvg8Vbq-DsHAbO0QvB9q2LA/view?usp=sharing)

## 👥 Team Members
- **Arash MPE**: [GitHub](https://github.com/arashmpe)

---

## 💡 Concept

**AI Memory NFT Minter** is a decentralized application (DApp) that transforms personal memories into AI-generated art and mints them as NFTs. It allows users to preserve meaningful moments as unique, ownable digital assets, merging emotion, creativity, and blockchain technology.

---

## 🚀 How It Works

1. **Connect Wallet**  
   - Connect your Web3 wallet. The app runs on **Shape Sepolia testnet**.

2. **Write a Memory**  
   - Enter a memory, dream, story, or any text you want to immortalize.

3. **AI-Powered Generation**  
   - **Groq (Llama 3)** generates a creative title and description.  
   - **Fal.ai (Stable Diffusion)** creates a unique artwork representing your memory.

4. **Review & Approve**  
   - Review the AI-generated title, description, and artwork.

5. **Mint as NFT**  
   - Upload image and metadata to **IPFS via Pinata**.  
   - Mint your memory as an **ERC-721 NFT**.

6. **Confirmation**  
   - Receive confirmation and a link to view your NFT on explorers like **ShapeScan**.

---

## 🔮 Future Features

- Art style selection (e.g., Impressionism, Cyberpunk, Anime, Photorealistic)  
- Enhanced personalization using user data  
- NFT collections and galleries  
- On-chain metadata storage  
- AI-extracted metadata for NFTs  
- Personal gallery with sharing options  

---

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router), React 19  
- **Blockchain:** Wagmi for contract calls & wallet state  
- **Wallet Connection:** RainbowKit  
- **AI Services:** Fal.ai (Image Generation), Groq (Text Generation)  
- **Storage:** Pinata (IPFS uploads)  
- **Styling:** Tailwind CSS, shadcn/ui  
- **Language:** TypeScript  

---

## ⚡ Getting Started Locally

### 1. Clone the Repository
```bash
git clone https://github.com/arashmpe/Diary.git
cd shapecraft-ai-memory-minter

### 2. Install Dependencies
yarn install

### 3. Set Up Environment Variables
cp .env-example .env

Fill the .env file with your API keys and contract address:

NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID="YOUR_WALLET_CONNECT_ID"
NEXT_PUBLIC_ALCHEMY_KEY="YOUR_ALCHEMY_KEY"
FAL_API_KEY="YOUR_FAL_API_KEY"
GROQ_API_KEY="YOUR_GROQ_API_KEY"
PINATA_JWT="YOUR_PINATA_JWT"
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS="YOUR_NFT_CONTRACT_ADDRESS"

### 4. Run Development Server
yarn dev

🎥 Demo & Walkthrough
https://drive.google.com/file/d/1pKCKoYQKKNvg8Vbq-DsHAbO0QvB9q2LA/view



