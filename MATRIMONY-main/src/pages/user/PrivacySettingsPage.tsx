import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Lock, Eye, PhoneCall, Mail } from 'lucide-react';

export const PrivacySettingsPage: React.FC = () => {
  const { showToast } = useApp();
  const [hidePhone, setHidePhone] = useState(true);
  const [hideEmail, setHideEmail] = useState(true);
  const [hidePhotos, setHidePhotos] = useState(false);
  const [privateProfile, setPrivateProfile] = useState(false);

  const handleSave = () => {
    showToast('Privacy settings saved securely!');
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-foreground">Privacy & Security Settings</h1>
        <p className="text-xs text-muted-foreground mt-0.5">Control who can view your photos, phone number, and personal details.</p>
      </div>

      <Card className="p-8 space-y-6">
        
        {/* Toggle 1: Phone */}
        <div className="flex items-center justify-between pb-4 border-b border-border/50">
          <div className="space-y-1">
            <h4 className="font-serif font-bold text-base flex items-center gap-2">
              <PhoneCall className="h-4 w-4 text-[#8B1E3F]" /> Hide Mobile Phone Number
            </h4>
            <p className="text-xs text-muted-foreground">Only members with accepted interest expressions can request your phone number.</p>
          </div>
          <input
            type="checkbox"
            checked={hidePhone}
            onChange={e => setHidePhone(e.target.checked)}
            className="h-5 w-5 accent-[#8B1E3F] cursor-pointer"
          />
        </div>

        {/* Toggle 2: Email */}
        <div className="flex items-center justify-between pb-4 border-b border-border/50">
          <div className="space-y-1">
            <h4 className="font-serif font-bold text-base flex items-center gap-2">
              <Mail className="h-4 w-4 text-[#8B1E3F]" /> Hide Email Address
            </h4>
            <p className="text-xs text-muted-foreground">Keep email address hidden from public search view.</p>
          </div>
          <input
            type="checkbox"
            checked={hideEmail}
            onChange={e => setHideEmail(e.target.checked)}
            className="h-5 w-5 accent-[#8B1E3F] cursor-pointer"
          />
        </div>

        {/* Toggle 3: Photo Visibility */}
        <div className="flex items-center justify-between pb-4 border-b border-border/50">
          <div className="space-y-1">
            <h4 className="font-serif font-bold text-base flex items-center gap-2">
              <Eye className="h-4 w-4 text-[#8B1E3F]" /> Require Photo View Approval
            </h4>
            <p className="text-xs text-muted-foreground">Photos are blurred until you manually approve a member's photo request.</p>
          </div>
          <input
            type="checkbox"
            checked={hidePhotos}
            onChange={e => setHidePhotos(e.target.checked)}
            className="h-5 w-5 accent-[#8B1E3F] cursor-pointer"
          />
        </div>

        {/* Toggle 4: Private Profile */}
        <div className="flex items-center justify-between pb-4 border-b border-border/50">
          <div className="space-y-1">
            <h4 className="font-serif font-bold text-base flex items-center gap-2">
              <Lock className="h-4 w-4 text-[#8B1E3F]" /> Completely Private Profile
            </h4>
            <p className="text-xs text-muted-foreground">Hide profile from Google search indexing and non-verified visitors.</p>
          </div>
          <input
            type="checkbox"
            checked={privateProfile}
            onChange={e => setPrivateProfile(e.target.checked)}
            className="h-5 w-5 accent-[#8B1E3F] cursor-pointer"
          />
        </div>

        <div className="pt-4 flex justify-end">
          <Button variant="primary" size="md" onClick={handleSave} className="font-semibold">
            Save Privacy Controls
          </Button>
        </div>

      </Card>
    </div>
  );
};
