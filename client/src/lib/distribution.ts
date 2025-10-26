import type { PartnerHours, DistributionData } from "@shared/schema";
import { partnerHoursSchema } from "@shared/schema";
import { calculateHourlyRate, calculatePayout } from "@/lib/utils";
import { roundAndCalculateBills } from "@/lib/billCalc";

export interface DistributionInput {
  partnerHours: PartnerHours;
  totalAmount: number;
}

export function calculateDistribution({
  partnerHours,
  totalAmount,
}: DistributionInput): DistributionData {
  partnerHoursSchema.parse(partnerHours);

  const totalHours = Number(
    partnerHours.reduce((sum, partner) => sum + partner.hours, 0).toFixed(2),
  );

  const hourlyRate = calculateHourlyRate(totalAmount, totalHours);

  const partnerPayouts = partnerHours.map((partner) => {
    const payout = calculatePayout(partner.hours, hourlyRate);
    const { rounded, billBreakdown } = roundAndCalculateBills(payout);

    return {
      name: partner.name,
      hours: partner.hours,
      payout,
      rounded,
      billBreakdown,
    };
  });

  return {
    totalAmount,
    totalHours,
    hourlyRate,
    partnerPayouts,
  };
}
