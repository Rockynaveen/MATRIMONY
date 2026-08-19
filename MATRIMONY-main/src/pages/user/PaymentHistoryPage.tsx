import React from 'react';
import { MOCK_TRANSACTIONS } from '../../data/mockTransactions';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Download, CheckCircle2 } from 'lucide-react';

export const PaymentHistoryPage: React.FC = () => {
  const { showToast } = useApp();

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-foreground">Payment & Billing History</h1>
        <p className="text-xs text-muted-foreground mt-0.5">View transaction logs, payment methods, and download tax invoices.</p>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/70 text-foreground font-serif text-sm">
              <tr>
                <th className="p-4">Transaction ID</th>
                <th className="p-4">Date</th>
                <th className="p-4">Membership Plan</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Payment Method</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {MOCK_TRANSACTIONS.map(txn => (
                <tr key={txn.id} className="hover:bg-muted/20">
                  <td className="p-4 font-mono font-bold text-[#8B1E3F]">{txn.transactionId}</td>
                  <td className="p-4 text-muted-foreground">{txn.date}</td>
                  <td className="p-4 font-semibold text-foreground">{txn.plan}</td>
                  <td className="p-4 font-serif font-bold text-[#8B1E3F]">₹{txn.amount.toLocaleString()}</td>
                  <td className="p-4 text-muted-foreground">{txn.method}</td>
                  <td className="p-4">
                    <Badge variant="verified" className="bg-emerald-50 text-emerald-800">
                      <CheckCircle2 className="h-3 w-3 mr-1" /> {txn.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => showToast(`Invoice downloaded for transaction ${txn.id}`)}
                      className="text-xs h-7"
                    >
                      <Download className="h-3 w-3 mr-1" /> PDF Invoice
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
