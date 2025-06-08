import React, { useState } from 'react';
import type { ReactNode } from 'react';
import Sidebar, { type LinkItem } from '../components/compliance-dashboard/Sidebar';
import KYCReview from '../components/compliance-dashboard/KYCReview';
import AMLMonitoring from '../components/compliance-dashboard/AMLMonitoring';
import TransactionSurveillance from '../components/compliance-dashboard/TransactionSurveillance';
import AuditLogs from '../components/compliance-dashboard/AuditLogs';
import RiskProfiles from '../components/compliance-dashboard/RiskProfiles';
import Reports from '../components/compliance-dashboard/Reports';
import RegulatorySettings from '../components/compliance-dashboard/RegulatorySettings';

const COMPONENTS: Record<string, ReactNode> = {
  '/': <KYCReview />, 
  '/aml': <AMLMonitoring />, 
  '/transactions': <TransactionSurveillance />, 
  '/audit-logs': <AuditLogs />, 
  '/risk-profiles': <RiskProfiles />, 
  '/reports': <Reports />, 
  '/regulatory': <RegulatorySettings />,
};

const links: LinkItem[] = [
  { path: '/', label: 'KYC Verification Center' },
  { path: '/aml', label: 'AML Watchlist' },
  { path: '/transactions', label: 'Transaction Monitoring' },
  { path: '/risk-profiles', label: 'User Risk Profiles' },
  { path: '/audit-logs', label: 'Audit Trail' },
  { path: '/reports', label: 'Reports & Exports' },
  { path: '/regulatory', label: 'Regulatory Notices' },
];

const ComplianceDashboard: React.FC = () => {
  const [activePath, setActivePath] = useState<string>('/');

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        links={links}
        activePath={activePath}
        onSelect={(path: string) => setActivePath(path)}
      />

      <main className="flex-1 p-8 overflow-auto">
        {COMPONENTS[activePath]}
      </main>
    </div>
  );
};

export default ComplianceDashboard;
