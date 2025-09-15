import { useContract, useContractRead, useContractWrite, useAccount } from 'wagmi';
import { audityVaultABI } from '../lib/contracts/audityVaultABI';

const CONTRACT_ADDRESS = import.meta.env.VITE_AUDITY_VAULT_CONTRACT || 'your_contract_address_here';

export function useAudityVault() {
  const { address } = useAccount();
  
  const contract = useContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: audityVaultABI,
  });

  // Read functions
  const { data: reportCounter } = useContractRead({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: audityVaultABI,
    functionName: 'reportCounter',
  });

  const { data: auditorCounter } = useContractRead({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: audityVaultABI,
    functionName: 'auditorCounter',
  });

  // Write functions
  const { writeAsync: submitAuditReport } = useContractWrite({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: audityVaultABI,
    functionName: 'submitAuditReport',
  });

  const { writeAsync: registerAuditor } = useContractWrite({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: audityVaultABI,
    functionName: 'registerAuditor',
  });

  const { writeAsync: registerOrganization } = useContractWrite({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: audityVaultABI,
    functionName: 'registerOrganization',
  });

  const { writeAsync: addAuditFinding } = useContractWrite({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: audityVaultABI,
    functionName: 'addAuditFinding',
  });

  const { writeAsync: verifyAuditReport } = useContractWrite({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: audityVaultABI,
    functionName: 'verifyAuditReport',
  });

  const { writeAsync: makeReportPublic } = useContractWrite({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: audityVaultABI,
    functionName: 'makeReportPublic',
  });

  return {
    contract,
    address,
    reportCounter,
    auditorCounter,
    submitAuditReport,
    registerAuditor,
    registerOrganization,
    addAuditFinding,
    verifyAuditReport,
    makeReportPublic,
  };
}

export function useAuditReport(reportId: number) {
  const { data: reportInfo } = useContractRead({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: audityVaultABI,
    functionName: 'getAuditReportInfo',
    args: [BigInt(reportId)],
  });

  const { data: findings } = useContractRead({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: audityVaultABI,
    functionName: 'getReportFindings',
    args: [BigInt(reportId)],
  });

  return {
    reportInfo,
    findings,
  };
}

export function useAuditor(auditorAddress: string) {
  const { data: auditorInfo } = useContractRead({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: audityVaultABI,
    functionName: 'getAuditorInfo',
    args: [auditorAddress as `0x${string}`],
  });

  const { data: auditorReports } = useContractRead({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: audityVaultABI,
    functionName: 'getAuditorReports',
    args: [auditorAddress as `0x${string}`],
  });

  return {
    auditorInfo,
    auditorReports,
  };
}

export function useOrganization(orgAddress: string) {
  const { data: orgInfo } = useContractRead({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: audityVaultABI,
    functionName: 'getOrganizationInfo',
    args: [orgAddress as `0x${string}`],
  });

  const { data: orgReports } = useContractRead({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: audityVaultABI,
    functionName: 'getOrganizationReports',
    args: [orgAddress as `0x${string}`],
  });

  return {
    orgInfo,
    orgReports,
  };
}
