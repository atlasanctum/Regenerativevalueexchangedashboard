Truth + Coordination UI where humans can see impact, verify it, fund it, govern it, and retire credits—without needing to understand blockchain.
Frontend is the civilization cockpit.
2) The product surfaces (what exists on screen)
A) Public “Planet / SDG Dashboard”
Audience: public, media, donors, governments
Goal: radical transparency
Views
Global map (or Nairobi pilot map) with layers:
Waste diversion
Water purification
Soil regeneration
Education cohorts
“SDG Heatmap” tiles (17 tiles) → click for evidence & projects
“Regeneration Index” chart over time
Live audit feed (“Impact Submission #439 finalized”)
Core UI components
ImpactMap (map layer toggle, legend, cluster markers)
SDGScoreCardGrid
ImpactTimeline
AuditActivityFeed
EvidenceModal (hashes, photos, sensor exports, PDFs)
B) Node Operator Console (Projects)
Audience: project implementers / community operators
Goal: submit impact, manage operations
Views
Project setup: location, category, methodology, beneficiaries
Data submission: upload sensor package, photos, receipts
Submission status: pending → disputed → finalized
Earnings view: FLOW earned locally, RGN minted, payout history
Core UI components
ProjectWizard
SubmissionUploader (drag/drop + checksum)
StatusStepper (pending/validated/disputed/finalized)
WalletPanel (balances + history)
PayoutTable
C) Oracle / Auditor Console (Verification)
Audience: auditors, lab partners, oracle committee
Goal: score, approve, dispute, slash fraud
Views
Queue of submissions with confidence score
Side-by-side evidence viewer (before/after photos, sensor CSV, geo)
Scoring form:
permanence
equity multiplier (region)
scarcity coefficient
confidence
Dispute workflow + reason codes
Attestation signing (EIP-712 signature)
Core UI components
ReviewQueue
EvidenceDiffViewer
ScoringPanel
DisputeDrawer
SignAttestationButton
D) Buyers Portal (Corporations / Gov)
Audience: ESG managers, SDG reporting teams
Goal: buy RGN, retire it, get certificates
Views
Market: available RGN by category/region/vintage
Portfolio: holdings + impact breakdown
Retirement flow: burn RGN + generate certificate
Download pack: audit report bundle
Core UI components
MarketFilters
OrderWidget (RFQ or fixed price)
PortfolioImpactChart
RetireRGNFlow
CertificateViewer (PDF/NFT metadata)
E) Governance / Treasury Portal (SAN)
Audience: stewards, protocol builders
Goal: tune parameters safely
Views
Proposals: change fee bps, confidence threshold, mint caps
Treasury: inflows, outflows, grants, buybacks
Voting: delegate, vote, timelock schedule
Core UI components
ProposalComposer
ParamDiffViewer
VoteModule
TreasuryLedger
TimelockTimeline