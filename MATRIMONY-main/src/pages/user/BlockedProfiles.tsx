import React from 'react';
import { useBlockedProfiles } from '../../hooks/useMatching';
import { BlockedProfileCard } from '../../components/matching/BlockedProfileCard';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Ban, RefreshCw, AlertCircle } from 'lucide-react';

export const BlockedProfilesPage: React.FC = () => {
  const { data: blockedProfiles, isLoading, isError, refetch, isFetching } = useBlockedProfiles();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Badge variant="gold" className="mb-1">Security</Badge>
          <h1 className="font-serif text-3xl font-bold text-stone-900">Blocked Profiles</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Manage blocked profiles. Blocked users cannot view your profile or send you messages.</p>
        </div>

        <Button
          size="sm"
          variant="outline"
          onClick={() => refetch()}
          disabled={isLoading || isFetching}
          className="border-stone-200 hover:bg-stone-50 font-bold text-xs flex items-center gap-1.5 h-10 px-4 rounded-xl"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isFetching ? 'animate-spin' : ''}`} />
          Refresh Blocked List
        </Button>
      </div>

      {/* Grid of Blocked Cards */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(2)].map((_, idx) => (
            <div key={idx} className="p-4 bg-white border border-stone-200/80 rounded-3xl animate-pulse flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 w-2/3">
                <div className="h-12 w-12 bg-stone-200 rounded-full shrink-0" />
                <div className="space-y-2 w-full">
                  <div className="h-4 bg-stone-200 rounded w-1/3" />
                  <div className="h-3 bg-stone-200 rounded w-1/2" />
                </div>
              </div>
              <div className="h-8 bg-stone-200 rounded w-20 shrink-0" />
            </div>
          ))}
        </div>
      ) : isError ? (
        <Card className="p-12 text-center border-stone-200/80 rounded-3xl space-y-4 max-w-xl mx-auto bg-white shadow-2xs">
          <div className="h-12 w-12 bg-rose-50 border border-rose-100 rounded-full flex items-center justify-center mx-auto text-rose-600">
            <AlertCircle className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif font-bold text-lg text-stone-900">Failed to Load Blocked List</h3>
            <p className="text-xs text-stone-500">Could not retrieve blocked profiles. Please check your network or try again.</p>
          </div>
          <Button
            size="sm"
            variant="primary"
            onClick={() => refetch()}
            className="bg-[#8B1E3F] hover:bg-[#721733] text-white px-6 font-bold"
          >
            Retry Fetching
          </Button>
        </Card>
      ) : !blockedProfiles || blockedProfiles.length === 0 ? (
        <Card className="p-16 text-center border-stone-200/80 rounded-3xl space-y-3 max-w-xl mx-auto bg-white shadow-2xs">
          <div className="h-12 w-12 bg-amber-50 border border-amber-100 rounded-full flex items-center justify-center mx-auto text-amber-600">
            <Ban className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg text-stone-900">No Blocked Profiles</h3>
            <p className="text-xs text-stone-500 mt-1">You haven't blocked any matrimonial profiles yet. Your blocked list is empty.</p>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {blockedProfiles.map(profile => (
            <BlockedProfileCard key={profile.user_id} profile={profile} />
          ))}
        </div>
      )}

    </div>
  );
};
