import { ethers } from "hardhat";

async function main() {
  console.log("Deploying AudityVault contract...");

  // Get the contract factory
  const AudityVault = await ethers.getContractFactory("AudityVault");

  // Deploy the contract with a verifier address (you can change this to your verifier address)
  const verifierAddress = "0x0000000000000000000000000000000000000000"; // Replace with actual verifier address
  
  const audityVault = await AudityVault.deploy(verifierAddress);

  await audityVault.waitForDeployment();

  const contractAddress = await audityVault.getAddress();

  console.log("AudityVault deployed to:", contractAddress);
  console.log("Verifier address:", verifierAddress);

  // Save deployment info
  const deploymentInfo = {
    contractAddress,
    verifierAddress,
    network: "sepolia",
    timestamp: new Date().toISOString(),
  };

  console.log("Deployment info:", JSON.stringify(deploymentInfo, null, 2));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
