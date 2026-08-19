import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  Bell,
  Heart,
  Sparkles,
  MessageSquare,
  ShieldCheck,
  Crown,
  CheckCheck,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export const NotificationsPage: React.FC = () => {
  const { notifications, markNotificationRead, showToast } = useApp();
  const [activeCategory, setActiveCategory] = useState<'All' | 'Interests' | 'Matches' | 'Messages' | 'Profile' | 'Membership'>('All');
  const navigate = useNavigate();

  const unreadCount = notifications.filter(n => !n.read).length;

  const categories = [
    { name: 'All', icon: Bell },
    { name: 'Interests', icon: Heart },
    { name: 'Matches', icon: Sparkles },
    { name: 'Messages', icon: MessageSquare },
    { name: 'Profile', icon: ShieldCheck },
    { name: 'Membership', icon: Crown }
  ];

  const filteredNotifs = notifications.filter(
    n => activeCategory === 'All' || n.category === activeCategory
  );

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Interests':
        return <Heart className="h-4 w-4 text-rose-500 fill-rose-500/20" />;
      case 'Matches':
        return <Sparkles className="h-4 w-4 text-amber-500" />;
      case 'Messages':
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case 'Profile':
        return <ShieldCheck className="h-4 w-4 text-emerald-500" />;
      case 'Membership':
        return <Crown className="h-4 w-4 text-amber-600" />;
      default:
        return <Bell className="h-4 w-4 text-primary" />;
    }
  };

  const handleMarkAllRead = () => {
    notifications.forEach(n => markNotificationRead(n.id));
    showToast('All notifications marked as read ✓');
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-border/80">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="gold" className="text-[10px] uppercase font-bold">Activity Hub</Badge>
            {unreadCount > 0 && (
              <Badge variant="primary" className="text-[10px] font-bold">{unreadCount} Unread</Badge>
            )}
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mt-1">Notification Center</h1>
          <p className="text-xs text-muted-foreground">Stay informed on profile views, interest updates, and match alerts.</p>
        </div>

        <Button
          size="sm"
          variant="outline"
          onClick={handleMarkAllRead}
          className="text-xs font-bold shrink-0"
        >
          <CheckCheck className="h-4 w-4 mr-1 text-[#8B1E3F]" /> Mark All as Read
        </Button>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map(cat => {
          const Icon = cat.icon;
          const count = cat.name === 'All'
            ? notifications.length
            : notifications.filter(n => n.category === cat.name).length;

          return (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name as any)}
              className={`px-4 py-2 text-xs font-bold rounded-2xl whitespace-nowrap transition-all flex items-center gap-2 border ${
                activeCategory === cat.name
                  ? 'bg-[#8B1E3F] text-white border-[#8B1E3F] shadow-md scale-105'
                  : 'bg-white text-muted-foreground border-border/70 hover:border-primary/40 hover:text-foreground'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{cat.name}</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                  activeCategory === cat.name ? 'bg-white/20 text-white' : 'bg-muted text-muted-foreground'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Notifications Card List */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filteredNotifs.length > 0 ? (
            filteredNotifs.map(n => (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Card
                  onClick={() => {
                    markNotificationRead(n.id);
                    if (n.link) navigate(n.link);
                  }}
                  className={`p-5 flex items-start gap-4 cursor-pointer transition-all duration-200 hover:shadow-lg rounded-3xl border ${
                    !n.read
                      ? 'bg-white border-[#8B1E3F]/40 shadow-xs ring-1 ring-[#8B1E3F]/10'
                      : 'bg-stone-50/50 border-border/60 opacity-90'
                  }`}
                >
                  {/* Left Avatar / Icon */}
                  <div className="relative shrink-0 mt-0.5">
                    {n.avatar ? (
                      <img src={n.avatar} alt="" className="h-11 w-11 rounded-2xl object-cover ring-2 ring-primary/20 shadow-xs" />
                    ) : (
                      <div className="h-11 w-11 rounded-2xl bg-[#8B1E3F]/10 text-[#8B1E3F] flex items-center justify-center shadow-2xs">
                        {getCategoryIcon(n.category)}
                      </div>
                    )}
                    {!n.read && (
                      <span className="absolute -top-1 -right-1 h-3.5 w-3.5 bg-[#C44569] border-2 border-white rounded-full" />
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8B1E3F] bg-[#8B1E3F]/10 px-2 py-0.5 rounded-md">
                          {n.category}
                        </span>
                        <h5 className="font-serif font-bold text-sm text-foreground truncate">{n.title}</h5>
                      </div>
                      <span className="text-[10px] font-semibold text-muted-foreground shrink-0">{n.timestamp}</span>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {n.message}
                    </p>
                  </div>

                  {/* Right Action Chevron */}
                  <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 self-center" />
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-border p-8 space-y-3">
              <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center mx-auto text-muted-foreground">
                <Bell className="h-6 w-6" />
              </div>
              <h4 className="font-serif text-lg font-bold text-foreground">No notifications in {activeCategory}</h4>
              <p className="text-xs text-muted-foreground">Check back later for match activity or interest updates.</p>
            </div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
};
