import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CommissionCalculator() {
  const [salePrice, setSalePrice] = useState(0);
  const [marketingDeduction, setMarketingDeduction] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [baseFee, setBaseFee] = useState(1000);
  const [percentage1, setPercentage1] = useState(4.5);
  const [threshold, setThreshold] = useState(500000);
  const [percentage2, setPercentage2] = useState(2.5);
  const [commission, setCommission] = useState(0);
  const [formula, setFormula] = useState("");

  const calculateCommission = () => {
    let commissionAmount = baseFee;
    let formulaText = `Base Fee: $${baseFee}`;

    let firstCommission = 0;
    let secondCommission = 0;

    if (salePrice > threshold) {
      firstCommission = (percentage1 / 100) * threshold;
      secondCommission = (percentage2 / 100) * (salePrice - threshold);
      formulaText += ` + (${percentage1}% of $${threshold} = $${firstCommission.toFixed(2)})`;
      formulaText += ` + (${percentage2}% of balance $${(salePrice - threshold).toFixed(2)} = $${secondCommission.toFixed(2)})`;
    } else {
      firstCommission = (percentage1 / 100) * salePrice;
      formulaText += ` + (${percentage1}% of $${salePrice} = $${firstCommission.toFixed(2)})`;
    }

    commissionAmount += firstCommission + secondCommission;
    formulaText += ` = $${commissionAmount.toFixed(2)}`;

    let gst = commissionAmount * 0.15;
    commissionAmount *= 1.15;
    formulaText += ` + GST (15% of $${commissionAmount.toFixed(2)} = $${gst.toFixed(2)})`;

    let discountAmount = (discountPercentage / 100) * commissionAmount;
    commissionAmount -= discountAmount;
    formulaText += ` - Discount (${discountPercentage}% of $${commissionAmount.toFixed(2)} = $${discountAmount.toFixed(2)})`;

    commissionAmount -= marketingDeduction;
    formulaText += ` - Marketing Deduction ($${marketingDeduction})`;

    setCommission(commissionAmount);
    setFormula(formulaText);
  };

  return (
    <Card className="p-6 max-w-md mx-auto mt-10 shadow-lg rounded-2xl">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">Commission Calculator</h2>
        <div className="mb-4">
          <label className="block mb-2">Sale Price ($)</label>
          <Input
            type="number"
            value={salePrice}
            onChange={(e) => setSalePrice(parseFloat(e.target.value) || 0)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Marketing Deduction ($)</label>
          <Input
            type="number"
            value={marketingDeduction}
            onChange={(e) => setMarketingDeduction(parseFloat(e.target.value) || 0)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Discount Percentage (%)</label>
          <Input
            type="number"
            value={discountPercentage}
            onChange={(e) => setDiscountPercentage(parseFloat(e.target.value) || 0)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Base Fee ($)</label>
          <Input
            type="number"
            value={baseFee}
            onChange={(e) => setBaseFee(parseFloat(e.target.value) || 0)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">First Commission Rate (%)</label>
          <Input
            type="number"
            value={percentage1}
            onChange={(e) => setPercentage1(parseFloat(e.target.value) || 0)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Threshold Amount ($)</label>
          <Input
            type="number"
            value={threshold}
            onChange={(e) => setThreshold(parseFloat(e.target.value) || 0)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Second Commission Rate (%)</label>
          <Input
            type="number"
            value={percentage2}
            onChange={(e) => setPercentage2(parseFloat(e.target.value) || 0)}
          />
        </div>
        <Button onClick={calculateCommission} className="w-full mt-4">Calculate</Button>
        {commission > 0 && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <h3 className="text-lg font-semibold">Calculation Process:</h3>
            <p className="text-sm">{formula}</p>
            <h3 className="text-lg font-semibold mt-2">Total Commission (incl. GST, Discount & Marketing Deduction):</h3>
            <p className="text-xl font-bold">${commission.toFixed(2)}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
