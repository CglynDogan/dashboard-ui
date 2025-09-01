import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  ShieldCheckIcon,
  KeyIcon,
  EyeIcon,
  EyeSlashIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  GlobeAltIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  EllipsisHorizontalIcon,
  LockClosedIcon,
  UserIcon,
  CogIcon
} from '@heroicons/react/24/outline';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { formatDate } from '../lib/format';

// Mock security data
const loginHistory = [
  {
    id: 1,
    device: 'MacBook Pro',
    location: 'New York, US',
    ip: '192.168.1.100',
    browser: 'Chrome 120.0',
    status: 'success',
    timestamp: '2024-01-31T14:30:00Z'
  },
  {
    id: 2,
    device: 'iPhone 15',
    location: 'New York, US',
    ip: '192.168.1.101',
    browser: 'Safari Mobile',
    status: 'success',
    timestamp: '2024-01-31T09:15:00Z'
  },
  {
    id: 3,
    device: 'Unknown Device',
    location: 'London, UK',
    ip: '185.46.212.34',
    browser: 'Firefox 121.0',
    status: 'blocked',
    timestamp: '2024-01-30T22:45:00Z'
  },
  {
    id: 4,
    device: 'Windows PC',
    location: 'San Francisco, US',
    ip: '192.168.1.102',
    browser: 'Edge 120.0',
    status: 'success',
    timestamp: '2024-01-30T16:20:00Z'
  }
];

const activeSessions = [
  {
    id: 1,
    device: 'MacBook Pro',
    location: 'New York, US',
    ip: '192.168.1.100',
    browser: 'Chrome 120.0',
    lastActive: '2024-01-31T14:30:00Z',
    current: true
  },
  {
    id: 2,
    device: 'iPhone 15',
    location: 'New York, US',
    ip: '192.168.1.101',
    browser: 'Safari Mobile',
    lastActive: '2024-01-31T13:15:00Z',
    current: false
  },
  {
    id: 3,
    device: 'iPad Pro',
    location: 'New York, US',
    ip: '192.168.1.103',
    browser: 'Safari',
    lastActive: '2024-01-31T11:45:00Z',
    current: false
  }
];

const securitySettings = [
  {
    id: 'two-factor',
    name: 'Two-Factor Authentication',
    description: 'Add an extra layer of security to your account',
    enabled: true,
    recommended: true
  },
  {
    id: 'login-alerts',
    name: 'Login Alerts',
    description: 'Get notified when someone logs into your account',
    enabled: true,
    recommended: true
  },
  {
    id: 'session-timeout',
    name: 'Session Timeout',
    description: 'Automatically log out after period of inactivity',
    enabled: false,
    recommended: true
  },
  {
    id: 'password-strength',
    name: 'Strong Password Policy',
    description: 'Require strong passwords for all users',
    enabled: true,
    recommended: true
  },
  {
    id: 'ip-whitelist',
    name: 'IP Whitelist',
    description: 'Only allow access from specific IP addresses',
    enabled: false,
    recommended: false
  },
  {
    id: 'audit-logs',
    name: 'Detailed Audit Logs',
    description: 'Keep detailed logs of all account activities',
    enabled: true,
    recommended: true
  }
];

export default function Security() {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState<'overview' | 'sessions' | 'settings'>('overview');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const getDeviceIcon = (device: string) => {
    if (device.toLowerCase().includes('iphone') || device.toLowerCase().includes('android')) {
      return <DevicePhoneMobileIcon className="w-5 h-5" />;
    }
    if (device.toLowerCase().includes('ipad') || device.toLowerCase().includes('tablet')) {
      return <DevicePhoneMobileIcon className="w-5 h-5" />;
    }
    return <ComputerDesktopIcon className="w-5 h-5" />;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge variant="success">Success</Badge>;
      case 'blocked':
        return <Badge variant="error">Blocked</Badge>;
      case 'failed':
        return <Badge variant="warning">Failed</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  const securityScore = 85;
  const securityLevel = securityScore >= 80 ? 'Excellent' : securityScore >= 60 ? 'Good' : 'Needs Improvement';
  const securityColor = securityScore >= 80 ? 'text-nexus-success' : securityScore >= 60 ? 'text-nexus-warning' : 'text-nexus-error';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gradient-to-br rounded-xl shadow-lg" style={{background: 'linear-gradient(135deg, #5347CE 0%, #887CFD 100%)'}}>
                <ShieldCheckIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Security</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Manage your account security and privacy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Security Score */}
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative w-16 h-16">
                <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray={`${securityScore}, 100`}
                    className="text-nexus-success"
                  />
                  <path
                    d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-gray-200 dark:text-gray-700"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">{securityScore}</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Security Score</h3>
                <p className={`text-sm font-medium ${securityColor}`}>{securityLevel}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Your account security is well configured
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircleIcon className="w-5 h-5 text-nexus-success" />
                <span className="text-sm text-gray-900 dark:text-white">Two-Factor Enabled</span>
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircleIcon className="w-5 h-5 text-nexus-success" />
                <span className="text-sm text-gray-900 dark:text-white">Strong Password</span>
              </div>
              <div className="flex items-center space-x-2">
                <ExclamationTriangleIcon className="w-5 h-5 text-nexus-warning" />
                <span className="text-sm text-gray-900 dark:text-white">Session Timeout Disabled</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          <button
            onClick={() => setSelectedTab('overview')}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedTab === 'overview'
                ? 'bg-white dark:bg-gray-700 text-nexus-primary shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setSelectedTab('sessions')}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedTab === 'sessions'
                ? 'bg-white dark:bg-gray-700 text-nexus-primary shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Sessions & Devices
          </button>
          <button
            onClick={() => setSelectedTab('settings')}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedTab === 'settings'
                ? 'bg-white dark:bg-gray-700 text-nexus-primary shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Security Settings
          </button>
        </div>

        {selectedTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Password Change */}
            <Card className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <KeyIcon className="w-6 h-6 text-nexus-primary" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Change Password</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white pr-10"
                      placeholder="Enter current password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      {showCurrentPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white pr-10"
                      placeholder="Enter new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      {showNewPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Confirm new password"
                  />
                </div>
                
                <button className="btn-nexus-primary w-full">
                  Update Password
                </button>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <ClockIcon className="w-6 h-6 text-nexus-teal" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Login Activity</h3>
                </div>
                <button className="text-sm text-nexus-info hover:underline">
                  View All
                </button>
              </div>
              
              <div className="space-y-4">
                {loginHistory.slice(0, 4).map((login) => (
                  <div key={login.id} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="text-gray-400">
                        {getDeviceIcon(login.device)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{login.device}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {login.location} • {formatDate(login.timestamp)}
                        </div>
                      </div>
                    </div>
                    {getStatusBadge(login.status)}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {selectedTab === 'sessions' && (
          <div className="space-y-6">
            {/* Active Sessions */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Active Sessions</h3>
                <button className="btn-nexus-secondary">
                  End All Other Sessions
                </button>
              </div>
              
              <div className="space-y-4">
                {activeSessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="text-gray-400">
                        {getDeviceIcon(session.device)}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900 dark:text-white">{session.device}</span>
                          {session.current && <Badge variant="primary">Current</Badge>}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {session.browser} • {session.location}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          IP: {session.ip} • Last active: {formatDate(session.lastActive)}
                        </div>
                      </div>
                    </div>
                    {!session.current && (
                      <button className="text-nexus-error hover:underline text-sm">
                        End Session
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Login History */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Login History</h3>
                <button className="text-sm text-nexus-info hover:underline">
                  Export Log
                </button>
              </div>
              
              <div className="space-y-3">
                {loginHistory.map((login) => (
                  <div key={login.id} className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                    <div className="flex items-center space-x-4">
                      <div className="text-gray-400">
                        {getDeviceIcon(login.device)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{login.device}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {login.browser} • {login.location} • {login.ip}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(login.timestamp)}
                        </div>
                      </div>
                    </div>
                    {getStatusBadge(login.status)}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {selectedTab === 'settings' && (
          <div className="space-y-6">
            {securitySettings.map((setting) => (
              <Card key={setting.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{setting.name}</h4>
                      {setting.recommended && (
                        <Badge variant="success">Recommended</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{setting.description}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked={setting.enabled}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-nexus-primary"></div>
                    </label>
                    <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                      <CogIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}