export const audityVaultABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_verifier",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "auditor",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      }
    ],
    "name": "AuditorRegistered",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "reportId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "auditor",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "organization",
        "type": "address"
      }
    ],
    "name": "AuditReportSubmitted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "reportId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "isVerified",
        "type": "bool"
      }
    ],
    "name": "AuditReportVerified",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "findingId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "reportId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "reporter",
        "type": "address"
      }
    ],
    "name": "FindingAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "organization",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      }
    ],
    "name": "OrganizationRegistered",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint32",
        "name": "reputation",
        "type": "uint32"
      }
    ],
    "name": "ReputationUpdated",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_reportId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_description",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_recommendation",
        "type": "string"
      },
      {
        "internalType": "bytes",
        "name": "_severity",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "_impact",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "inputProof",
        "type": "bytes"
      }
    ],
    "name": "addAuditFinding",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "auditFindings",
    "outputs": [
      {
        "internalType": "bytes",
        "name": "findingId",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "severity",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "impact",
        "type": "bytes"
      },
      {
        "internalType": "bool",
        "name": "isResolved",
        "type": "bool"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "recommendation",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "reporter",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
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
    "name": "auditors",
    "outputs": [
      {
        "internalType": "bytes",
        "name": "auditorId",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "reputation",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "completedAudits",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "successRate",
        "type": "bytes"
      },
      {
        "internalType": "bool",
        "name": "isActive",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "isVerified",
        "type": "bool"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "credentials",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "auditorAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "registrationTime",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "auditReports",
    "outputs": [
      {
        "internalType": "bytes",
        "name": "reportId",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "riskScore",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "complianceScore",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "findingsCount",
        "type": "bytes"
      },
      {
        "internalType": "bool",
        "name": "isVerified",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "isPublic",
        "type": "bool"
      },
      {
        "internalType": "string",
        "name": "reportHash",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "auditType",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "auditor",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "organization",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "submissionTime",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "verificationTime",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "auditorCounter",
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
    "inputs": [
      {
        "internalType": "address",
        "name": "_auditor",
        "type": "address"
      }
    ],
    "name": "getAuditorInfo",
    "outputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "credentials",
        "type": "string"
      },
      {
        "internalType": "uint8",
        "name": "reputation",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "completedAudits",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "successRate",
        "type": "uint8"
      },
      {
        "internalType": "bool",
        "name": "isActive",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "isVerified",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "registrationTime",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_auditor",
        "type": "address"
      }
    ],
    "name": "getAuditorReports",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_reportId",
        "type": "uint256"
      }
    ],
    "name": "getAuditReportInfo",
    "outputs": [
      {
        "internalType": "string",
        "name": "reportHash",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "auditType",
        "type": "string"
      },
      {
        "internalType": "uint8",
        "name": "riskScore",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "complianceScore",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "findingsCount",
        "type": "uint8"
      },
      {
        "internalType": "bool",
        "name": "isVerified",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "isPublic",
        "type": "bool"
      },
      {
        "internalType": "address",
        "name": "auditor",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "organization",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "submissionTime",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "verificationTime",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_organization",
        "type": "address"
      }
    ],
    "name": "getOrganizationInfo",
    "outputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "industry",
        "type": "string"
      },
      {
        "internalType": "uint8",
        "name": "complianceRating",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "auditCount",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "riskLevel",
        "type": "uint8"
      },
      {
        "internalType": "bool",
        "name": "isActive",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "registrationTime",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_organization",
        "type": "address"
      }
    ],
    "name": "getOrganizationReports",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_reportId",
        "type": "uint256"
      }
    ],
    "name": "getReportFindings",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_reportId",
        "type": "uint256"
      }
    ],
    "name": "makeReportPublic",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "orgCounter",
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
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "organizations",
    "outputs": [
      {
        "internalType": "bytes",
        "name": "orgId",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "complianceRating",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "auditCount",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "riskLevel",
        "type": "bytes"
      },
      {
        "internalType": "bool",
        "name": "isActive",
        "type": "bool"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "industry",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "orgAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "registrationTime",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_credentials",
        "type": "string"
      },
      {
        "internalType": "bytes",
        "name": "_initialReputation",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "inputProof",
        "type": "bytes"
      }
    ],
    "name": "registerAuditor",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_industry",
        "type": "string"
      },
      {
        "internalType": "bytes",
        "name": "_initialRiskLevel",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "inputProof",
        "type": "bytes"
      }
    ],
    "name": "registerOrganization",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "reportCounter",
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
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_findingId",
        "type": "uint256"
      }
    ],
    "name": "resolveFinding",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_organization",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_reportHash",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_auditType",
        "type": "string"
      },
      {
        "internalType": "bytes",
        "name": "_riskScore",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "_complianceScore",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "_findingsCount",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "inputProof",
        "type": "bytes"
      }
    ],
    "name": "submitAuditReport",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_auditor",
        "type": "address"
      },
      {
        "internalType": "bytes",
        "name": "_newReputation",
        "type": "bytes"
      }
    ],
    "name": "updateAuditorReputation",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_organization",
        "type": "address"
      },
      {
        "internalType": "bytes",
        "name": "_newRating",
        "type": "bytes"
      }
    ],
    "name": "updateOrganizationCompliance",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_reportId",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "_isVerified",
        "type": "bool"
      }
    ],
    "name": "verifyAuditReport",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "verifier",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;
