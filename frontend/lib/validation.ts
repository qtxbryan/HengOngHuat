// src/lib/validation.ts
import { z } from "zod";

export const onboardingSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  email: z.string().email("Invalid email address"),
  contact: z.string().min(1, "Contact number is required"),
  occupation: z.string().min(1, "Occupation is required"),
  gender: z.string().min(1, "Gender is required"),
  netWorth: z.string().min(1, "Net worth is required"),
  majorExpenses: z
    .array(z.string())
    .min(1, "At least one major expense is required"),
  annualEarning: z.string().min(1, "Annual earning is required"),
  maritalStatus: z.string().min(1, "Marital status is required"),
  dependents: z.string().min(1, "Number of dependents is required"),
  investmentGoal: z.string().min(1, "Investment goal is required"),
  investmentKnowledge: z.string().min(1, "Investment knowledge is required"),
  riskPerception: z.string().min(1, "Risk perception is required"),
  decisionStyle: z.string().min(1, "Decision style is required"),
  initialInvestment: z.string().min(1, "Initial investment is required"),
  fluctuationTolerance: z.string().min(1, "Fluctuation tolerance is required"),
  monthlyContribution: z.string().min(1, "Monthly contribution is required"),
  incomeDuration: z.string().min(1, "Income duration is required"),
});

export type OnboardingFormData = z.infer<typeof onboardingSchema>;
