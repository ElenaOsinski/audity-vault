# AudityVault - Encrypted Compliance Audits

A secure financial compliance platform enabling encrypted audit submissions and verification with zero-knowledge privacy protection using Fully Homomorphic Encryption (FHE).

## Features

- **Encrypted Audit Submissions**: Submit financial compliance audits with FHE encryption
- **Privacy-Preserving Verification**: Verify audit data without exposing sensitive information
- **Decentralized Architecture**: Built on blockchain for transparency and immutability
- **Multi-Wallet Support**: Connect with various Web3 wallets including Rainbow, MetaMask, and more
- **Real-time Dashboard**: Monitor audit status and compliance metrics
- **Auditor Management**: Manage and verify auditor credentials securely

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: shadcn/ui, Tailwind CSS
- **Blockchain**: Ethereum (Sepolia Testnet)
- **Encryption**: FHE (Fully Homomorphic Encryption) via Zama
- **Wallet Integration**: RainbowKit, Wagmi, Viem
- **Smart Contracts**: Solidity with FHE support

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git
- Web3 wallet (MetaMask, Rainbow, etc.)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ElenaOsinski/audity-vault.git
cd audity-vault
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Configure the following environment variables:
```env
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_RPC_URL=https://1rpc.io/sepolia
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:8080](http://localhost:8080) in your browser.

## Smart Contract Deployment

The project includes FHE-enabled smart contracts for secure audit management:

- **AudityVault.sol**: Main contract for audit submissions and verification
- **AuditorRegistry.sol**: Manages auditor credentials and reputation
- **ComplianceEngine.sol**: Handles compliance verification logic

### Deploy Contracts

1. Install Hardhat dependencies:
```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
```

2. Deploy to Sepolia testnet:
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

## Usage

### For Auditors

1. Connect your Web3 wallet
2. Submit audit reports with encrypted data
3. Monitor verification status
4. Manage your auditor profile

### For Compliance Officers

1. Review submitted audits
2. Verify auditor credentials
3. Access compliance dashboards
4. Generate compliance reports

### For Organizations

1. Submit compliance documents
2. Track audit progress
3. Access verification results
4. Maintain compliance records

## Security Features

- **FHE Encryption**: All sensitive audit data is encrypted using Fully Homomorphic Encryption
- **Zero-Knowledge Proofs**: Verify data integrity without exposing raw data
- **Decentralized Storage**: Audit data stored on blockchain for immutability
- **Multi-signature Verification**: Multiple auditors required for critical audits
- **Privacy-Preserving Analytics**: Generate insights without compromising data privacy

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions:
- Create an issue on GitHub
- Join our Discord community
- Follow us on Twitter @audityvault

## Roadmap

- [ ] Multi-chain support (Polygon, Arbitrum)
- [ ] Advanced FHE operations
- [ ] Mobile app development
- [ ] Integration with major compliance frameworks
- [ ] AI-powered audit analysis
- [ ] Enterprise dashboard features

---

Built with ❤️ by the AudityVault team