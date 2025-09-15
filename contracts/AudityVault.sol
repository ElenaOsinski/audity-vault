// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract AudityVault is SepoliaConfig {
    using FHE for *;
    
    struct AuditReport {
        euint32 reportId;
        euint32 riskScore;
        euint32 complianceScore;
        euint32 findingsCount;
        bool isVerified;
        bool isPublic;
        string reportHash;
        string auditType;
        address auditor;
        address organization;
        uint256 submissionTime;
        uint256 verificationTime;
    }
    
    struct AuditFinding {
        euint32 findingId;
        euint32 severity;
        euint32 impact;
        bool isResolved;
        string description;
        string recommendation;
        address reporter;
        uint256 timestamp;
    }
    
    struct AuditorProfile {
        euint32 auditorId;
        euint32 reputation;
        euint32 completedAudits;
        euint32 successRate;
        bool isActive;
        bool isVerified;
        string name;
        string credentials;
        address auditorAddress;
        uint256 registrationTime;
    }
    
    struct OrganizationProfile {
        euint32 orgId;
        euint32 complianceRating;
        euint32 auditCount;
        euint32 riskLevel;
        bool isActive;
        string name;
        string industry;
        address orgAddress;
        uint256 registrationTime;
    }
    
    mapping(uint256 => AuditReport) public auditReports;
    mapping(uint256 => AuditFinding) public auditFindings;
    mapping(address => AuditorProfile) public auditors;
    mapping(address => OrganizationProfile) public organizations;
    mapping(uint256 => uint256[]) public reportFindings; // reportId => findingIds[]
    mapping(address => uint256[]) public auditorReports; // auditor => reportIds[]
    mapping(address => uint256[]) public orgReports; // organization => reportIds[]
    
    uint256 public reportCounter;
    uint256 public findingCounter;
    uint256 public auditorCounter;
    uint256 public orgCounter;
    
    address public owner;
    address public verifier;
    
    event AuditReportSubmitted(uint256 indexed reportId, address indexed auditor, address indexed organization);
    event AuditReportVerified(uint256 indexed reportId, bool isVerified);
    event FindingAdded(uint256 indexed findingId, uint256 indexed reportId, address indexed reporter);
    event AuditorRegistered(address indexed auditor, string name);
    event OrganizationRegistered(address indexed organization, string name);
    event ReputationUpdated(address indexed user, uint32 reputation);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
    }
    
    function submitAuditReport(
        address _organization,
        string memory _reportHash,
        string memory _auditType,
        externalEuint32 _riskScore,
        externalEuint32 _complianceScore,
        externalEuint32 _findingsCount,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(auditors[msg.sender].isActive, "Auditor not registered or inactive");
        require(organizations[_organization].isActive, "Organization not registered or inactive");
        
        uint256 reportId = reportCounter++;
        
        // Convert external encrypted values to internal encrypted values
        euint32 internalRiskScore = FHE.fromExternal(_riskScore, inputProof);
        euint32 internalComplianceScore = FHE.fromExternal(_complianceScore, inputProof);
        euint32 internalFindingsCount = FHE.fromExternal(_findingsCount, inputProof);
        
        auditReports[reportId] = AuditReport({
            reportId: FHE.asEuint32(0), // Will be set properly later
            riskScore: internalRiskScore,
            complianceScore: internalComplianceScore,
            findingsCount: internalFindingsCount,
            isVerified: false,
            isPublic: false,
            reportHash: _reportHash,
            auditType: _auditType,
            auditor: msg.sender,
            organization: _organization,
            submissionTime: block.timestamp,
            verificationTime: 0
        });
        
        // Update auditor and organization stats
        auditors[msg.sender].completedAudits = FHE.add(auditors[msg.sender].completedAudits, FHE.asEuint32(1));
        organizations[_organization].auditCount = FHE.add(organizations[_organization].auditCount, FHE.asEuint32(1));
        
        // Track reports
        auditorReports[msg.sender].push(reportId);
        orgReports[_organization].push(reportId);
        
        emit AuditReportSubmitted(reportId, msg.sender, _organization);
        return reportId;
    }
    
    function addAuditFinding(
        uint256 _reportId,
        string memory _description,
        string memory _recommendation,
        externalEuint32 _severity,
        externalEuint32 _impact,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(auditReports[_reportId].auditor == msg.sender, "Only report auditor can add findings");
        require(auditReports[_reportId].auditor != address(0), "Report does not exist");
        
        uint256 findingId = findingCounter++;
        
        // Convert external encrypted values to internal encrypted values
        euint32 internalSeverity = FHE.fromExternal(_severity, inputProof);
        euint32 internalImpact = FHE.fromExternal(_impact, inputProof);
        
        auditFindings[findingId] = AuditFinding({
            findingId: FHE.asEuint32(0), // Will be set properly later
            severity: internalSeverity,
            impact: internalImpact,
            isResolved: false,
            description: _description,
            recommendation: _recommendation,
            reporter: msg.sender,
            timestamp: block.timestamp
        });
        
        // Link finding to report
        reportFindings[_reportId].push(findingId);
        
        emit FindingAdded(findingId, _reportId, msg.sender);
        return findingId;
    }
    
    function verifyAuditReport(uint256 _reportId, bool _isVerified) public {
        require(msg.sender == verifier, "Only verifier can verify reports");
        require(auditReports[_reportId].auditor != address(0), "Report does not exist");
        
        auditReports[_reportId].isVerified = _isVerified;
        auditReports[_reportId].verificationTime = block.timestamp;
        
        // Update auditor reputation based on verification
        if (_isVerified) {
            auditors[auditReports[_reportId].auditor].reputation = FHE.add(
                auditors[auditReports[_reportId].auditor].reputation, 
                FHE.asEuint32(10)
            );
        } else {
            auditors[auditReports[_reportId].auditor].reputation = FHE.sub(
                auditors[auditReports[_reportId].auditor].reputation, 
                FHE.asEuint32(5)
            );
        }
        
        emit AuditReportVerified(_reportId, _isVerified);
    }
    
    function registerAuditor(
        string memory _name,
        string memory _credentials,
        externalEuint32 _initialReputation,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(!auditors[msg.sender].isActive, "Auditor already registered");
        
        uint256 auditorId = auditorCounter++;
        euint32 internalReputation = FHE.fromExternal(_initialReputation, inputProof);
        
        auditors[msg.sender] = AuditorProfile({
            auditorId: FHE.asEuint32(0), // Will be set properly later
            reputation: internalReputation,
            completedAudits: FHE.asEuint32(0),
            successRate: FHE.asEuint32(0),
            isActive: true,
            isVerified: false,
            name: _name,
            credentials: _credentials,
            auditorAddress: msg.sender,
            registrationTime: block.timestamp
        });
        
        emit AuditorRegistered(msg.sender, _name);
        return auditorId;
    }
    
    function registerOrganization(
        string memory _name,
        string memory _industry,
        externalEuint32 _initialRiskLevel,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(!organizations[msg.sender].isActive, "Organization already registered");
        
        uint256 orgId = orgCounter++;
        euint32 internalRiskLevel = FHE.fromExternal(_initialRiskLevel, inputProof);
        
        organizations[msg.sender] = OrganizationProfile({
            orgId: FHE.asEuint32(0), // Will be set properly later
            complianceRating: FHE.asEuint32(0),
            auditCount: FHE.asEuint32(0),
            riskLevel: internalRiskLevel,
            isActive: true,
            name: _name,
            industry: _industry,
            orgAddress: msg.sender,
            registrationTime: block.timestamp
        });
        
        emit OrganizationRegistered(msg.sender, _name);
        return orgId;
    }
    
    function updateAuditorReputation(address _auditor, euint32 _newReputation) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(auditors[_auditor].isActive, "Auditor not found");
        
        auditors[_auditor].reputation = _newReputation;
        emit ReputationUpdated(_auditor, 0); // FHE.decrypt(_newReputation) - will be decrypted off-chain
    }
    
    function updateOrganizationCompliance(address _organization, euint32 _newRating) public {
        require(msg.sender == verifier, "Only verifier can update compliance rating");
        require(organizations[_organization].isActive, "Organization not found");
        
        organizations[_organization].complianceRating = _newRating;
        emit ReputationUpdated(_organization, 0); // FHE.decrypt(_newRating) - will be decrypted off-chain
    }
    
    function resolveFinding(uint256 _findingId) public {
        require(auditFindings[_findingId].reporter != address(0), "Finding does not exist");
        require(
            auditFindings[_findingId].reporter == msg.sender || 
            organizations[auditReports[reportFindings[_findingId][0]].organization].orgAddress == msg.sender,
            "Only reporter or organization can resolve finding"
        );
        
        auditFindings[_findingId].isResolved = true;
    }
    
    function makeReportPublic(uint256 _reportId) public {
        require(auditReports[_reportId].auditor == msg.sender, "Only auditor can make report public");
        require(auditReports[_reportId].isVerified, "Report must be verified first");
        
        auditReports[_reportId].isPublic = true;
    }
    
    // View functions (return decrypted values will be handled off-chain)
    function getAuditReportInfo(uint256 _reportId) public view returns (
        string memory reportHash,
        string memory auditType,
        uint8 riskScore,
        uint8 complianceScore,
        uint8 findingsCount,
        bool isVerified,
        bool isPublic,
        address auditor,
        address organization,
        uint256 submissionTime,
        uint256 verificationTime
    ) {
        AuditReport storage report = auditReports[_reportId];
        return (
            report.reportHash,
            report.auditType,
            0, // FHE.decrypt(report.riskScore) - will be decrypted off-chain
            0, // FHE.decrypt(report.complianceScore) - will be decrypted off-chain
            0, // FHE.decrypt(report.findingsCount) - will be decrypted off-chain
            report.isVerified,
            report.isPublic,
            report.auditor,
            report.organization,
            report.submissionTime,
            report.verificationTime
        );
    }
    
    function getAuditorInfo(address _auditor) public view returns (
        string memory name,
        string memory credentials,
        uint8 reputation,
        uint8 completedAudits,
        uint8 successRate,
        bool isActive,
        bool isVerified,
        uint256 registrationTime
    ) {
        AuditorProfile storage auditor = auditors[_auditor];
        return (
            auditor.name,
            auditor.credentials,
            0, // FHE.decrypt(auditor.reputation) - will be decrypted off-chain
            0, // FHE.decrypt(auditor.completedAudits) - will be decrypted off-chain
            0, // FHE.decrypt(auditor.successRate) - will be decrypted off-chain
            auditor.isActive,
            auditor.isVerified,
            auditor.registrationTime
        );
    }
    
    function getOrganizationInfo(address _organization) public view returns (
        string memory name,
        string memory industry,
        uint8 complianceRating,
        uint8 auditCount,
        uint8 riskLevel,
        bool isActive,
        uint256 registrationTime
    ) {
        OrganizationProfile storage org = organizations[_organization];
        return (
            org.name,
            org.industry,
            0, // FHE.decrypt(org.complianceRating) - will be decrypted off-chain
            0, // FHE.decrypt(org.auditCount) - will be decrypted off-chain
            0, // FHE.decrypt(org.riskLevel) - will be decrypted off-chain
            org.isActive,
            org.registrationTime
        );
    }
    
    function getReportFindings(uint256 _reportId) public view returns (uint256[] memory) {
        return reportFindings[_reportId];
    }
    
    function getAuditorReports(address _auditor) public view returns (uint256[] memory) {
        return auditorReports[_auditor];
    }
    
    function getOrganizationReports(address _organization) public view returns (uint256[] memory) {
        return orgReports[_organization];
    }
}
