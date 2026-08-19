import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { MOCK_MEMBERSHIP_PLANS } from '../../data/mockMemberships';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { ShieldCheck, CreditCard, QrCode, Building, Wallet, Lock } from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { state } = useLocation();
  const { setMembershipTier, showToast } = useApp();
  const navigate = useNavigate();

  const selectedPlanId = state?.planId || 'GOLD';
  const plan = MOCK_MEMBERSHIP_PLANS.find(p => p.id === selectedPlanId) || MOCK_MEMBERSHIP_PLANS[2];

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'wallet'>('upi');
  const [upiId, setUpiId] = useState('rahul@upi');

  const gstAmount = Math.round(plan.price * 0.18);
  const totalAmount = plan.price + gstAmount;

  const handlePayNow = (e: React.FormEvent) => {
    e.preventDefault();
    setMembershipTier(plan.id);
    showToast(`Payment of ₹${totalAmount.toLocaleString()} successful! ${plan.name} activated.`);
    navigate('/payment-history');
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <div>
        <h1 className="font-serif text-3xl font-bold text-foreground">Secure Subscription Checkout</h1>
        <p className="text-xs text-muted-foreground mt-0.5">Complete your payment to activate premium contact unlocks & direct messaging.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Payment Options */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="p-6 space-y-6">
            <h3 className="font-serif text-xl font-bold text-[#8B1E3F]">Select Payment Gateway</h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 ${
                  paymentMethod === 'upi' ? 'border-[#8B1E3F] bg-[#8B1E3F]/10 font-bold text-[#8B1E3F]' : 'border-border text-muted-foreground'
                }`}
              >
                <QrCode className="h-5 w-5" />
                <span className="text-xs">UPI / GPay</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 ${
                  paymentMethod === 'card' ? 'border-[#8B1E3F] bg-[#8B1E3F]/10 font-bold text-[#8B1E3F]' : 'border-border text-muted-foreground'
                }`}
              >
                <CreditCard className="h-5 w-5" />
                <span className="text-xs">Cards</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('netbanking')}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 ${
                  paymentMethod === 'netbanking' ? 'border-[#8B1E3F] bg-[#8B1E3F]/10 font-bold text-[#8B1E3F]' : 'border-border text-muted-foreground'
                }`}
              >
                <Building className="h-5 w-5" />
                <span className="text-xs">NetBanking</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('wallet')}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 ${
                  paymentMethod === 'wallet' ? 'border-[#8B1E3F] bg-[#8B1E3F]/10 font-bold text-[#8B1E3F]' : 'border-border text-muted-foreground'
                }`}
              >
                <Wallet className="h-5 w-5" />
                <span className="text-xs">Wallets</span>
              </button>
            </div>

            <form onSubmit={handlePayNow} className="space-y-4 pt-2">
              {paymentMethod === 'upi' && (
                <div>
                  <label className="text-xs font-semibold text-muted-foreground block mb-1">Enter VPA / UPI ID</label>
                  <input
                    type="text"
                    required
                    value={upiId}
                    onChange={e => setUpiId(e.target.value)}
                    placeholder="e.g. mobile@upi / rahul@okhdfcbank"
                    className="w-full bg-muted/30 border border-border rounded-xl p-3 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                  <span className="text-[10px] text-muted-foreground mt-1 block">Supports Google Pay, PhonePe, Paytm & BHIM UPI</span>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground block mb-1">Card Number</label>
                    <input
                      type="text"
                      placeholder="4532 •••• •••• 8892"
                      className="w-full bg-muted/30 border border-border rounded-xl p-3 text-xs font-medium"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" placeholder="MM/YY" className="bg-muted/30 border border-border rounded-xl p-3 text-xs" />
                    <input type="password" placeholder="CVV" className="bg-muted/30 border border-border rounded-xl p-3 text-xs" />
                  </div>
                </div>
              )}

              <Button type="submit" variant="primary" size="lg" className="w-full font-bold shadow-xl mt-4">
                <Lock className="h-4 w-4 mr-2" /> Pay ₹{totalAmount.toLocaleString()} Securely
              </Button>
            </form>
          </Card>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5">
          <Card className="p-6 space-y-4 bg-muted/20 border-border">
            <h3 className="font-serif text-lg font-bold text-foreground">Order Summary</h3>

            <div className="p-4 bg-white rounded-2xl border border-border space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-sm text-foreground">{plan.name}</span>
                <Badge variant="gold">{plan.period}</Badge>
              </div>
              <p className="text-xs text-muted-foreground">{plan.contactUnlocks}</p>
            </div>

            <div className="space-y-2 text-xs divide-y divide-border/40">
              <div className="flex justify-between pt-2">
                <span className="text-muted-foreground">Base Plan Price:</span>
                <span className="font-semibold">₹{plan.price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-muted-foreground">GST Tax (18%):</span>
                <span className="font-semibold">₹{gstAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pt-2 font-serif text-lg font-bold text-[#8B1E3F]">
                <span>Total Amount Payable:</span>
                <span>₹{totalAmount.toLocaleString()}</span>
              </div>
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl text-[11px] text-emerald-800 flex items-start gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>256-bit SSL Encrypted Payment. Instant membership activation.</span>
            </div>
          </Card>
        </div>

      </div>

    </div>
  );
};
