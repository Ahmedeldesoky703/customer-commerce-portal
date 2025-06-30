
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Shield, Key, Smartphone, AlertTriangle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const Security = () => {
  const { user } = useAuth();
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [loginSessions] = useState([
    { id: 1, device: 'Chrome on Windows', location: 'New York, NY', lastActive: '2 hours ago', current: true },
    { id: 2, device: 'Safari on iPhone', location: 'New York, NY', lastActive: '1 day ago', current: false },
    { id: 3, device: 'Firefox on Mac', location: 'Boston, MA', lastActive: '3 days ago', current: false },
  ]);

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordForm(prev => ({ ...prev, [field]: value }));
  };

  const handlePasswordUpdate = () => {
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all password fields.",
        variant: "destructive",
      });
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords don't match.",
        variant: "destructive",
      });
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      });
      return;
    }

    // Simulate password update
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    toast({
      title: "Password updated",
      description: "Your password has been successfully changed.",
    });
  };

  const handleToggle2FA = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    toast({
      title: twoFactorEnabled ? "2FA disabled" : "2FA enabled",
      description: twoFactorEnabled 
        ? "Two-factor authentication has been disabled."
        : "Two-factor authentication has been enabled for added security.",
    });
  };

  const handleSignOutSession = (sessionId: number) => {
    toast({
      title: "Session terminated",
      description: "The selected session has been signed out.",
    });
  };

  const handleSignOutAllSessions = () => {
    toast({
      title: "All sessions terminated",
      description: "You have been signed out of all devices except this one.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link to="/profile" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Profile
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Security Settings</h1>
          <p className="text-gray-600">Manage your account security and authentication</p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Key className="mr-2 h-5 w-5" />
                Change Password
              </CardTitle>
              <CardDescription>
                Update your password to keep your account secure
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input
                  id="current-password"
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                />
              </div>
              <Button onClick={handlePasswordUpdate}>
                Update Password
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Smartphone className="mr-2 h-5 w-5" />
                Two-Factor Authentication
              </CardTitle>
              <CardDescription>
                Add an extra layer of security to your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  {twoFactorEnabled ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  )}
                  <div>
                    <p className="font-medium">
                      Two-Factor Authentication is {twoFactorEnabled ? 'enabled' : 'disabled'}
                    </p>
                    <p className="text-sm text-gray-600">
                      {twoFactorEnabled 
                        ? 'Your account is protected with 2FA'
                        : 'Secure your account with 2FA'
                      }
                    </p>
                  </div>
                </div>
                <Button 
                  variant={twoFactorEnabled ? "outline" : "default"}
                  onClick={handleToggle2FA}
                >
                  {twoFactorEnabled ? 'Disable' : 'Enable'} 2FA
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Active Sessions
              </CardTitle>
              <CardDescription>
                Manage devices that are signed into your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {loginSessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`h-3 w-3 rounded-full ${session.current ? 'bg-green-500' : 'bg-gray-300'}`} />
                    <div>
                      <p className="font-medium">
                        {session.device}
                        {session.current && <span className="text-green-600 text-sm ml-2">(Current)</span>}
                      </p>
                      <p className="text-sm text-gray-600">
                        {session.location} • Last active: {session.lastActive}
                      </p>
                    </div>
                  </div>
                  {!session.current && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleSignOutSession(session.id)}
                    >
                      Sign Out
                    </Button>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t">
                <Button variant="destructive" onClick={handleSignOutAllSessions}>
                  Sign Out All Other Sessions
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5" />
                Account Recovery
              </CardTitle>
              <CardDescription>
                Recovery email for account access
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="recovery-email">Recovery Email</Label>
                <Input
                  id="recovery-email"
                  type="email"
                  value={user?.email || ''}
                  disabled
                />
                <p className="text-sm text-gray-600">
                  This email will be used to recover your account if needed
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Security;
