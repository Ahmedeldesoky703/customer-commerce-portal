
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Shield, Eye, Mail, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const PrivacySettings = () => {
  const [settings, setSettings] = useState({
    profileVisibility: true,
    orderHistory: false,
    emailMarketing: true,
    dataCollection: false,
    thirdPartySharing: false,
    analytics: true,
    personalizedAds: false,
    locationTracking: false,
  });

  const handleSettingChange = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = () => {
    localStorage.setItem('privacySettings', JSON.stringify(settings));
    toast({
      title: "Privacy settings updated",
      description: "Your privacy preferences have been saved successfully.",
    });
  };

  React.useEffect(() => {
    const savedSettings = localStorage.getItem('privacySettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link to="/profile" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Profile
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Settings</h1>
          <p className="text-gray-600">Control how your data is used and shared</p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="mr-2 h-5 w-5" />
                Profile Visibility
              </CardTitle>
              <CardDescription>
                Control who can see your profile information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="profile-visibility">Public Profile</Label>
                  <p className="text-sm text-gray-600">Make your profile visible to other users</p>
                </div>
                <Switch
                  id="profile-visibility"
                  checked={settings.profileVisibility}
                  onCheckedChange={(checked) => handleSettingChange('profileVisibility', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="order-history">Order History Visibility</Label>
                  <p className="text-sm text-gray-600">Allow others to see your purchase history</p>
                </div>
                <Switch
                  id="order-history"
                  checked={settings.orderHistory}
                  onCheckedChange={(checked) => handleSettingChange('orderHistory', checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="mr-2 h-5 w-5" />
                Communication Preferences
              </CardTitle>
              <CardDescription>
                Manage how we communicate with you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-marketing">Marketing Emails</Label>
                  <p className="text-sm text-gray-600">Receive promotional emails and offers</p>
                </div>
                <Switch
                  id="email-marketing"
                  checked={settings.emailMarketing}
                  onCheckedChange={(checked) => handleSettingChange('emailMarketing', checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Data & Privacy
              </CardTitle>
              <CardDescription>
                Control how your data is collected and used
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="data-collection">Data Collection</Label>
                  <p className="text-sm text-gray-600">Allow collection of usage data for improvement</p>
                </div>
                <Switch
                  id="data-collection"
                  checked={settings.dataCollection}
                  onCheckedChange={(checked) => handleSettingChange('dataCollection', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="third-party">Third-party Sharing</Label>
                  <p className="text-sm text-gray-600">Share data with trusted partners</p>
                </div>
                <Switch
                  id="third-party"
                  checked={settings.thirdPartySharing}
                  onCheckedChange={(checked) => handleSettingChange('thirdPartySharing', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="analytics">Analytics</Label>
                  <p className="text-sm text-gray-600">Help us improve by sharing anonymous usage data</p>
                </div>
                <Switch
                  id="analytics"
                  checked={settings.analytics}
                  onCheckedChange={(checked) => handleSettingChange('analytics', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="personalized-ads">Personalized Ads</Label>
                  <p className="text-sm text-gray-600">Show ads based on your interests</p>
                </div>
                <Switch
                  id="personalized-ads"
                  checked={settings.personalizedAds}
                  onCheckedChange={(checked) => handleSettingChange('personalizedAds', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="location-tracking">Location Tracking</Label>
                  <p className="text-sm text-gray-600">Use your location for better recommendations</p>
                </div>
                <Switch
                  id="location-tracking"
                  checked={settings.locationTracking}
                  onCheckedChange={(checked) => handleSettingChange('locationTracking', checked)}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={handleSaveSettings} className="px-8">
              Save Privacy Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings;
