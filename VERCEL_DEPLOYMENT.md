# Vercel Deployment Guide for AudityVault

This guide provides step-by-step instructions for deploying AudityVault to Vercel.

## Prerequisites

- GitHub account with access to the AudityVault repository
- Vercel account (free tier available)
- Domain name (optional, for custom domain)

## Step-by-Step Deployment

### 1. Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "New Project"
4. Import the `ElenaOsinski/audity-vault` repository

### 2. Configure Project Settings

#### Build Settings
- **Framework Preset**: Vite
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

#### Environment Variables
Add the following environment variables in Vercel dashboard:

```
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=your_rpc_endpoint_here
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id_here
NEXT_PUBLIC_INFURA_API_KEY=your_infura_api_key_here
NEXT_PUBLIC_RPC_URL=your_alternative_rpc_url_here
NEXT_PUBLIC_AUDITY_VAULT_CONTRACT=your_contract_address_here
NEXT_PUBLIC_FHE_NETWORK_URL=https://api.zama.ai
NEXT_PUBLIC_FHE_APP_ID=audity-vault
```

### 3. Deploy

1. Click "Deploy" button
2. Wait for the build process to complete (usually 2-3 minutes)
3. Your app will be available at the provided Vercel URL

### 4. Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed by Vercel
4. Wait for SSL certificate to be issued

## Post-Deployment Configuration

### 1. Update Contract Addresses

After deploying your smart contracts to Sepolia testnet:

1. Go to Vercel Dashboard → Project Settings → Environment Variables
2. Update `NEXT_PUBLIC_AUDITY_VAULT_CONTRACT` with the actual deployed contract address
3. Redeploy the application

### 2. Smart Contract Deployment

To deploy the smart contracts:

```bash
# Install Hardhat dependencies
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox

# Set up environment variables
export PRIVATE_KEY=your_private_key_here
export ETHERSCAN_API_KEY=your_etherscan_api_key

# Deploy to Sepolia
npx hardhat run scripts/deploy.ts --network sepolia
```

### 3. Verify Contract on Etherscan

```bash
npx hardhat verify --network sepolia <CONTRACT_ADDRESS> <VERIFIER_ADDRESS>
```

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_CHAIN_ID` | Ethereum chain ID (11155111 for Sepolia) | Yes |
| `NEXT_PUBLIC_RPC_URL` | RPC endpoint for blockchain connection | Yes |
| `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` | WalletConnect project ID | Yes |
| `NEXT_PUBLIC_INFURA_API_KEY` | Infura API key for RPC access | Yes |
| `NEXT_PUBLIC_AUDITY_VAULT_CONTRACT` | Deployed contract address | Yes |
| `NEXT_PUBLIC_FHE_NETWORK_URL` | FHE network endpoint | Yes |
| `NEXT_PUBLIC_FHE_APP_ID` | FHE application ID | Yes |

## Troubleshooting

### Build Failures

1. **Node.js Version**: Ensure Vercel is using Node.js 18+
2. **Dependencies**: Check that all dependencies are properly installed
3. **Environment Variables**: Verify all required environment variables are set

### Runtime Errors

1. **Wallet Connection**: Ensure WalletConnect project ID is correct
2. **Contract Address**: Verify contract address is deployed and correct
3. **Network**: Ensure users are connected to Sepolia testnet

### Performance Optimization

1. **Bundle Size**: Use dynamic imports for large dependencies
2. **Images**: Optimize images and use WebP format
3. **Caching**: Configure proper caching headers

## Monitoring and Analytics

### Vercel Analytics

1. Enable Vercel Analytics in project settings
2. Monitor performance metrics
3. Track user interactions

### Error Tracking

Consider integrating error tracking services:
- Sentry
- LogRocket
- Bugsnag

## Security Considerations

1. **Environment Variables**: Never commit sensitive keys to repository
2. **HTTPS**: Vercel automatically provides SSL certificates
3. **CORS**: Configure CORS properly for API endpoints
4. **Rate Limiting**: Implement rate limiting for API calls

## Backup and Recovery

1. **Database**: If using external database, ensure regular backups
2. **Code**: Repository serves as code backup
3. **Environment**: Document all environment variables

## Scaling Considerations

1. **CDN**: Vercel provides global CDN automatically
2. **Serverless**: Functions scale automatically
3. **Bandwidth**: Monitor usage and upgrade plan if needed

## Support and Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Documentation](https://vitejs.dev/guide/)
- [RainbowKit Documentation](https://www.rainbowkit.com/docs/introduction)
- [Wagmi Documentation](https://wagmi.sh/)

## Deployment Checklist

- [ ] Repository connected to Vercel
- [ ] Environment variables configured
- [ ] Build settings configured
- [ ] Initial deployment successful
- [ ] Smart contracts deployed
- [ ] Contract addresses updated
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate issued
- [ ] Analytics enabled
- [ ] Error tracking configured
- [ ] Performance monitoring set up

---

**Note**: This deployment guide assumes you have already deployed the smart contracts to Sepolia testnet. If you haven't done so, please follow the smart contract deployment steps first.
