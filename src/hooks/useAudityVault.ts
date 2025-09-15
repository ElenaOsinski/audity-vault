import { useReadContract, useWriteContract, useAccount } from 'wagmi';
import { audityVaultABI } from '../lib/contracts/audityVaultABI';

const CONTRACT_ADDRESS = import.meta.env.VITE_AUDITY_VAULT_CONTRACT || 'your_contract_address_here';

export function useAudityVault() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();

  // Read functions
  const { data: reportCounter } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: audityVaultABI,
    functionName: 'reportCounter',
  });

  const { data: auditorCounter } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: audityVaultABI,
    functionName: 'auditorCounter',
  });

  // Write functions
  const submitAuditReport = async (args: any[]) => {
    return writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: audityVaultABI,
      functionName: 'submitAuditReport',
      args,
    });
  };

  const registerAuditor = async (args: any[]) => {
    return writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: audityVaultABI,
      functionName: 'registerAuditor',
      args,
    });
  };

  const registerOrganization = async (args: any[]) => {
    return writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: audityVaultABI,
      functionName: 'registerOrganization',
      args,
    });
  };

  const addAuditFinding = async (args: any[]) => {
    return writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: audityVaultABI,
      functionName: 'addAuditFinding',
      args,
    });
  };

  const verifyAuditReport = async (args: any[]) => {
    return writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: audityVaultABI,
      functionName: 'verifyAuditReport',
      args,
    });
  };

  const makeReportPublic = async (args: any[]) => {
    return writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: audityVaultABI,
      functionName: 'makeReportPublic',
      args,
    });
  };

  return {
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
  const { data: reportInfo } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: audityVaultABI,
    functionName: 'getAuditReportInfo',
    args: [BigInt(reportId)],
  });

  const { data: findings } = useReadContract({
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
  const { data: auditorInfo } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: audityVaultABI,
    functionName: 'getAuditorInfo',
    args: [auditorAddress as `0x${string}`],
  });

  const { data: auditorReports } = useReadContract({
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
  const { data: orgInfo } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: audityVaultABI,
    functionName: 'getOrganizationInfo',
    args: [orgAddress as `0x${string}`],
  });

  const { data: orgReports } = useReadContract({
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
