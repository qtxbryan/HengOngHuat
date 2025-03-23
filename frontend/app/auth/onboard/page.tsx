"use client";

import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Check,
  ChevronRight,
  FileUp,
  Info,
  Mail,
  Phone,
  User,
  X,
  DollarSign,
  TrendingUp,
  BarChart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card, CardContent } from "@/components/ui/card";

const financialGoals = [
  { label: "Retirement", value: "retirement" },
  { label: "Buying a home", value: "home" },
  { label: "Children's education", value: "education" },
  { label: "Building wealth", value: "wealth" },
  { label: "Starting a business", value: "business" },
  { label: "Emergency fund", value: "emergency" },
  { label: "Travel", value: "travel" },
  { label: "Paying off debt", value: "debt" },
];

const maritalStatus = [
  { label: "Single", value: "single" },
  { label: "Married", value: "married" },
  { label: "Divorced", value: "divorced" },
  { label: "Widowed", value: "widowed" },
  { label: "Separated", value: "separated" },
  { label: "Domestic Partnership", value: "domestic" },
];

const homeOwnershipStatus = [
  { label: "Do not own a home", value: "none" },
  { label: "Paying mortgage", value: "mortgage" },
  { label: "Mortgage paid off", value: "paid" },
];

const lifeStages = [
  { label: "Starting out", value: "starting" },
  { label: "Career building", value: "career" },
  { label: "Peak earning years", value: "peak" },
  { label: "Pre-retirement", value: "pre-retirement" },
  { label: "Retirement", value: "retirement" },
];

const investmentKnowledge = [
  { label: "Little", value: "little" },
  { label: "A bit", value: "bit" },
  { label: "Good", value: "good" },
  { label: "Extensive", value: "extensive" },
];

const investmentLossReactions = [
  { label: "Sell all investments", value: "sell-all" },
  { label: "Sell some", value: "sell-some" },
  { label: "Hold steady", value: "hold" },
  { label: "Buy more", value: "buy-more" },
  { label: "Buy a lot more", value: "buy-lot-more" },
];

const volatilityLevels = [
  { label: "Low", value: "low" },
  { label: "Balanced", value: "balanced" },
  { label: "High", value: "high" },
];

const riskCapacities = [
  { label: "Very low", value: "very-low" },
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
  { label: "Very high", value: "very-high" },
];

const investmentTimeframes = [
  { label: "1 to 4 years", value: "1-4" },
  { label: "5 to 9 years", value: "5-9" },
  { label: "10 to 14 years", value: "10-14" },
  { label: "More than 14 years", value: "14+" },
];

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Personal Information
    fullName: "",
    dateOfBirth: "",
    email: "",
    phone: "",
    maritalStatus: "",
    dependents: "0",

    // Step 2: Financial Information
    annualIncome: "",
    annualExpenses: "",
    homeOwnership: "",
    financialGoals: [] as string[],

    // Step 3: Investing Background
    lifeStage: "",
    investmentKnowledge: "",
    investmentLossReaction: "",

    // Step 4: Risk
    volatilityComfort: "",
    riskCapacity: "",
    investmentTimeframe: "",
  });

  const [goalsOpen, setGoalsOpen] = useState(false);

  const totalSteps = 4;

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleGoalToggle = (value: string) => {
    setFormData({
      ...formData,
      financialGoals: formData.financialGoals.includes(value)
        ? formData.financialGoals.filter((goal) => goal !== value)
        : [...formData.financialGoals, value],
    });
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const steps = [
    { number: 1, title: "Personal Information", icon: User },
    { number: 2, title: "Financial Information", icon: DollarSign },
    { number: 3, title: "Investing Background", icon: TrendingUp },
    { number: 4, title: "Risk Assessment", icon: BarChart },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#1a1a2e]">
      {/* Sidebar */}
      <motion.div
        className="bg-gradient-to-b from-indigo-900 to-indigo-950 text-white p-6 md:w-[320px]"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="mb-12"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex items-center space-x-2 mb-12">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
              <Check className="h-4 w-4 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              InvestFlow
            </h1>
          </div>
        </motion.div>

        <motion.h1
          className="text-xl font-bold mb-2"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Step {currentStep} of {totalSteps}
        </motion.h1>

        <motion.p
          className="text-indigo-300 mb-10 text-sm"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Complete all steps to create your investment profile.
        </motion.p>

        <div className="space-y-0">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              <motion.div
                className="flex items-center"
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 + step.number * 0.1, duration: 0.5 }}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center mr-3 transition-colors duration-300",
                    currentStep === step.number
                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                      : currentStep > step.number
                        ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                        : "bg-transparent text-slate-500 border border-slate-700 opacity-60"
                  )}
                >
                  {currentStep > step.number ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <step.icon className="w-4 h-4" />
                  )}
                </div>
                <span
                  className={cn(
                    "text-sm transition-colors duration-300",
                    currentStep === step.number
                      ? "text-white font-medium"
                      : currentStep > step.number
                        ? "text-indigo-300 font-medium"
                        : "text-slate-500 opacity-60"
                  )}
                >
                  {step.title}
                </span>
              </motion.div>

              {index < steps.length - 1 && (
                <div className="ml-3.5 my-1 flex flex-col items-center">
                  <div className="w-px h-4 bg-slate-700 opacity-30"></div>
                  <div className="w-px h-4 bg-slate-700 opacity-30"></div>
                  <div className="w-px h-4 bg-slate-700 opacity-30"></div>
                  <div className="w-px h-4 bg-slate-700 opacity-30"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-12 flex flex-col">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <PersonalInfoForm
              key="step1"
              formData={formData}
              handleInputChange={handleInputChange}
              handleSelectChange={handleSelectChange}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}

          {currentStep === 2 && (
            <FinancialInfoForm
              key="step2"
              formData={formData}
              handleInputChange={handleInputChange}
              handleSelectChange={handleSelectChange}
              handleGoalToggle={handleGoalToggle}
              goalsOpen={goalsOpen}
              setGoalsOpen={setGoalsOpen}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}

          {currentStep === 3 && (
            <InvestingBackgroundForm
              key="step3"
              formData={formData}
              handleSelectChange={handleSelectChange}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}

          {currentStep === 4 && (
            <RiskAssessmentForm
              key="step4"
              formData={formData}
              handleSelectChange={handleSelectChange}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function PersonalInfoForm({
  formData,
  handleInputChange,
  handleSelectChange,
  nextStep,
  prevStep,
}: any) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="flex-1 flex flex-col"
    >
      <Card className="bg-[#16213e] border-[#0f3460]/50 shadow-xl mb-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-center mb-6">
            <motion.div
              className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              <User className="w-8 h-8 text-indigo-400" />
            </motion.div>
          </div>

          <motion.h2
            className="text-2xl font-bold text-white mb-2 text-center"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Personal Information
          </motion.h2>

          <motion.p
            className="text-purple-300 mb-8 text-center"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Tell us about yourself to get started.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="space-y-2"
            >
              <Label
                htmlFor="fullName"
                className="text-sm font-medium text-purple-200"
              >
                Full Name
              </Label>
              <div className="relative">
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="pl-9 bg-[#0f3460]/50 border-[#0f3460] text-white focus-visible:ring-indigo-500"
                />
                <User className="absolute left-3 top-2.5 h-4 w-4 text-purple-400" />
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="space-y-2"
            >
              <Label
                htmlFor="dateOfBirth"
                className="text-sm font-medium text-purple-200"
              >
                Date of Birth
              </Label>
              <div className="relative">
                <Input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="pl-9 bg-[#0f3460]/50 border-[#0f3460] text-white focus-visible:ring-indigo-500"
                />
                <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-purple-400" />
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="space-y-2"
            >
              <Label
                htmlFor="email"
                className="text-sm font-medium text-purple-200"
              >
                Email Address
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john.doe@example.com"
                  className="pl-9 bg-[#0f3460]/50 border-[#0f3460] text-white focus-visible:ring-indigo-500"
                />
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-purple-400" />
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="space-y-2"
            >
              <Label
                htmlFor="phone"
                className="text-sm font-medium text-purple-200"
              >
                Phone Number
              </Label>
              <div className="relative">
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 234 567 890"
                  className="pl-9 bg-[#0f3460]/50 border-[#0f3460] text-white focus-visible:ring-indigo-500"
                />
                <Phone className="absolute left-3 top-2.5 h-4 w-4 text-purple-400" />
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="space-y-2"
            >
              <Label
                htmlFor="maritalStatus"
                className="text-sm font-medium text-purple-200"
              >
                Marital Status
              </Label>
              <Select
                value={formData.maritalStatus}
                onValueChange={(value) =>
                  handleSelectChange("maritalStatus", value)
                }
              >
                <SelectTrigger className="bg-[#0f3460]/50 border-[#0f3460] text-white focus:ring-indigo-500">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="bg-[#16213e] border-[#0f3460] text-purple-200">
                  {maritalStatus.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="space-y-2"
            >
              <Label
                htmlFor="dependents"
                className="text-sm font-medium text-purple-200"
              >
                Number of Dependents
              </Label>
              <div className="relative">
                <Input
                  id="dependents"
                  name="dependents"
                  type="number"
                  min="0"
                  value={formData.dependents}
                  onChange={handleInputChange}
                  className="pl-9 bg-[#0f3460]/50 border-[#0f3460] text-white focus-visible:ring-indigo-500"
                />
                <User className="absolute left-3 top-2.5 h-4 w-4 text-purple-400" />
              </div>
            </motion.div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-auto flex justify-between">
        <motion.button
          type="button"
          onClick={prevStep}
          className="px-6 py-3 text-purple-300 font-medium rounded-md border border-[#0f3460] hover:bg-[#0f3460]/50 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <X className="mr-2 h-4 w-4 inline" />
          Back
        </motion.button>

        <motion.button
          type="button"
          onClick={nextStep}
          className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-medium rounded-md transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Next Step
          <ChevronRight className="ml-2 h-4 w-4 inline" />
        </motion.button>
      </div>
    </motion.div>
  );
}

function FinancialInfoForm({
  formData,
  handleInputChange,
  handleSelectChange,
  handleGoalToggle,
  goalsOpen,
  setGoalsOpen,
  nextStep,
  prevStep,
}: any) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="flex-1 flex flex-col"
    >
      <Card className="bg-[#16213e] border-[#0f3460]/50 shadow-xl mb-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-center mb-6">
            <motion.div
              className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              <DollarSign className="w-8 h-8 text-green-400" />
            </motion.div>
          </div>

          <motion.h2
            className="text-2xl font-bold text-white mb-2 text-center"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Financial Information
          </motion.h2>

          <motion.p
            className="text-purple-300 mb-8 text-center"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Tell us about your financial situation.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="space-y-2"
            >
              <Label
                htmlFor="annualIncome"
                className="text-sm font-medium text-purple-200"
              >
                Annual Income
              </Label>
              <div className="relative">
                <Input
                  id="annualIncome"
                  name="annualIncome"
                  type="number"
                  value={formData.annualIncome}
                  onChange={handleInputChange}
                  placeholder="50000"
                  className="pl-9 bg-[#0f3460]/50 border-[#0f3460] text-white focus-visible:ring-indigo-500"
                />
                <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-purple-400" />
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="space-y-2"
            >
              <Label
                htmlFor="annualExpenses"
                className="text-sm font-medium text-purple-200"
              >
                Annual Expenses
              </Label>
              <div className="relative">
                <Input
                  id="annualExpenses"
                  name="annualExpenses"
                  type="number"
                  value={formData.annualExpenses}
                  onChange={handleInputChange}
                  placeholder="30000"
                  className="pl-9 bg-[#0f3460]/50 border-[#0f3460] text-white focus-visible:ring-indigo-500"
                />
                <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-purple-400" />
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="space-y-2"
            >
              <Label
                htmlFor="homeOwnership"
                className="text-sm font-medium text-purple-200"
              >
                Home Ownership Status
              </Label>
              <Select
                value={formData.homeOwnership}
                onValueChange={(value) =>
                  handleSelectChange("homeOwnership", value)
                }
              >
                <SelectTrigger className="bg-[#0f3460]/50 border-[#0f3460] text-white focus:ring-indigo-500">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="bg-[#16213e] border-[#0f3460] text-purple-200">
                  {homeOwnershipStatus.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="md:col-span-2 space-y-2"
            >
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-purple-200">
                  Primary Financial Goals
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-purple-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Select all that apply</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {financialGoals.map((goal) => (
                  <div key={goal.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={goal.value}
                      checked={formData.financialGoals.includes(goal.value)}
                      onCheckedChange={() => handleGoalToggle(goal.value)}
                      className="data-[state=checked]:bg-indigo-500 data-[state=checked]:border-indigo-500"
                    />
                    <label
                      htmlFor={goal.value}
                      className="text-sm font-medium text-purple-200 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {goal.label}
                    </label>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-auto flex justify-between">
        <motion.button
          type="button"
          onClick={prevStep}
          className="px-6 py-3 text-purple-300 font-medium rounded-md border border-[#0f3460] hover:bg-[#0f3460]/50 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <X className="mr-2 h-4 w-4 inline" />
          Back
        </motion.button>

        <motion.button
          type="button"
          onClick={nextStep}
          className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-medium rounded-md transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Next Step
          <ChevronRight className="ml-2 h-4 w-4 inline" />
        </motion.button>
      </div>
    </motion.div>
  );
}

function InvestingBackgroundForm({
  formData,
  handleSelectChange,
  nextStep,
  prevStep,
}: any) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="flex-1 flex flex-col"
    >
      <Card className="bg-[#16213e] border-[#0f3460]/50 shadow-xl mb-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-center mb-6">
            <motion.div
              className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              <TrendingUp className="w-8 h-8 text-blue-400" />
            </motion.div>
          </div>

          <motion.h2
            className="text-2xl font-bold text-white mb-2 text-center"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Investing Background
          </motion.h2>

          <motion.p
            className="text-purple-300 mb-8 text-center"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Tell us about your investment experience and preferences.
          </motion.p>

          <div className="space-y-6 mb-8">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="space-y-2"
            >
              <Label
                htmlFor="lifeStage"
                className="text-sm font-medium text-purple-200"
              >
                Which life stage best describes you?
              </Label>
              <Select
                value={formData.lifeStage}
                onValueChange={(value) =>
                  handleSelectChange("lifeStage", value)
                }
              >
                <SelectTrigger className="bg-[#0f3460]/50 border-[#0f3460] text-white focus:ring-indigo-500">
                  <SelectValue placeholder="Select life stage" />
                </SelectTrigger>
                <SelectContent className="bg-[#16213e] border-[#0f3460] text-purple-200">
                  {lifeStages.map((stage) => (
                    <SelectItem key={stage.value} value={stage.value}>
                      {stage.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="space-y-2"
            >
              <Label
                htmlFor="investmentKnowledge"
                className="text-sm font-medium text-purple-200"
              >
                Investment Knowledge?
              </Label>
              <Select
                value={formData.investmentKnowledge}
                onValueChange={(value) =>
                  handleSelectChange("investmentKnowledge", value)
                }
              >
                <SelectTrigger className="bg-[#0f3460]/50 border-[#0f3460] text-white focus:ring-indigo-500">
                  <SelectValue placeholder="Select knowledge level" />
                </SelectTrigger>
                <SelectContent className="bg-[#16213e] border-[#0f3460] text-purple-200">
                  {investmentKnowledge.map((knowledge) => (
                    <SelectItem key={knowledge.value} value={knowledge.value}>
                      {knowledge.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="space-y-3"
            >
              <Label className="text-sm font-medium text-purple-200">
                How would you react if your investment lost 20% in a year?
              </Label>
              <RadioGroup
                value={formData.investmentLossReaction}
                onValueChange={(value) =>
                  handleSelectChange("investmentLossReaction", value)
                }
                className="space-y-3"
              >
                {investmentLossReactions.map((reaction) => (
                  <div
                    key={reaction.value}
                    className="flex items-center space-x-2 border border-[#0f3460] rounded-lg p-3 cursor-pointer hover:bg-[#0f3460]/50 transition-colors"
                  >
                    <RadioGroupItem
                      value={reaction.value}
                      id={reaction.value}
                      className="data-[state=checked]:border-indigo-500 data-[state=checked]:bg-indigo-500"
                    />
                    <label
                      htmlFor={reaction.value}
                      className="text-sm font-medium text-purple-200 cursor-pointer"
                    >
                      {reaction.label}
                    </label>
                  </div>
                ))}
              </RadioGroup>
            </motion.div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-auto flex justify-between">
        <motion.button
          type="button"
          onClick={prevStep}
          className="px-6 py-3 text-purple-300 font-medium rounded-md border border-[#0f3460] hover:bg-[#0f3460]/50 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <X className="mr-2 h-4 w-4 inline" />
          Back
        </motion.button>

        <motion.button
          type="button"
          onClick={nextStep}
          className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-medium rounded-md transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Next Step
          <ChevronRight className="ml-2 h-4 w-4 inline" />
        </motion.button>
      </div>
    </motion.div>
  );
}

function RiskAssessmentForm({
  formData,
  handleSelectChange,
  nextStep,
  prevStep,
}: any) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="flex-1 flex flex-col"
    >
      <Card className="bg-[#16213e] border-[#0f3460]/50 shadow-xl mb-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-center mb-6">
            <motion.div
              className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              <BarChart className="w-8 h-8 text-purple-400" />
            </motion.div>
          </div>

          <motion.h2
            className="text-2xl font-bold text-white mb-2 text-center"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Risk Assessment
          </motion.h2>

          <motion.p
            className="text-purple-300 mb-8 text-center"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Help us understand your risk tolerance and investment timeline.
          </motion.p>

          <div className="space-y-6 mb-8">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="space-y-3"
            >
              <Label className="text-sm font-medium text-purple-200">
                What level of volatility would you be most comfortable with?
              </Label>
              <RadioGroup
                value={formData.volatilityComfort}
                onValueChange={(value) =>
                  handleSelectChange("volatilityComfort", value)
                }
                className="grid grid-cols-1 md:grid-cols-3 gap-3"
              >
                {volatilityLevels.map((level) => (
                  <div
                    key={level.value}
                    className="flex items-center space-x-2 border border-[#0f3460] rounded-lg p-3 cursor-pointer hover:bg-[#0f3460]/50 transition-colors"
                  >
                    <RadioGroupItem
                      value={level.value}
                      id={`volatility-${level.value}`}
                      className="data-[state=checked]:border-indigo-500 data-[state=checked]:bg-indigo-500"
                    />
                    <label
                      htmlFor={`volatility-${level.value}`}
                      className="text-sm font-medium text-purple-200 cursor-pointer"
                    >
                      {level.label}
                    </label>
                  </div>
                ))}
              </RadioGroup>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="space-y-3"
            >
              <Label className="text-sm font-medium text-purple-200">
                What is your risk capacity?
              </Label>
              <RadioGroup
                value={formData.riskCapacity}
                onValueChange={(value) =>
                  handleSelectChange("riskCapacity", value)
                }
                className="grid grid-cols-1 md:grid-cols-3 gap-3"
              >
                {riskCapacities.map((capacity) => (
                  <div
                    key={capacity.value}
                    className="flex items-center space-x-2 border border-[#0f3460] rounded-lg p-3 cursor-pointer hover:bg-[#0f3460]/50 transition-colors"
                  >
                    <RadioGroupItem
                      value={capacity.value}
                      id={`risk-${capacity.value}`}
                      className="data-[state=checked]:border-indigo-500 data-[state=checked]:bg-indigo-500"
                    />
                    <label
                      htmlFor={`risk-${capacity.value}`}
                      className="text-sm font-medium text-purple-200 cursor-pointer"
                    >
                      {capacity.label}
                    </label>
                  </div>
                ))}
              </RadioGroup>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="space-y-3"
            >
              <Label className="text-sm font-medium text-purple-200">
                How long do you plan to hold your investments?
              </Label>
              <RadioGroup
                value={formData.investmentTimeframe}
                onValueChange={(value) =>
                  handleSelectChange("investmentTimeframe", value)
                }
                className="grid grid-cols-1 md:grid-cols-2 gap-3"
              >
                {investmentTimeframes.map((timeframe) => (
                  <div
                    key={timeframe.value}
                    className="flex items-center space-x-2 border border-[#0f3460] rounded-lg p-3 cursor-pointer hover:bg-[#0f3460]/50 transition-colors"
                  >
                    <RadioGroupItem
                      value={timeframe.value}
                      id={`timeframe-${timeframe.value}`}
                      className="data-[state=checked]:border-indigo-500 data-[state=checked]:bg-indigo-500"
                    />
                    <label
                      htmlFor={`timeframe-${timeframe.value}`}
                      className="text-sm font-medium text-purple-200 cursor-pointer"
                    >
                      {timeframe.label}
                    </label>
                  </div>
                ))}
              </RadioGroup>
            </motion.div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-auto flex justify-between">
        <motion.button
          type="button"
          onClick={prevStep}
          className="px-6 py-3 text-purple-300 font-medium rounded-md border border-[#0f3460] hover:bg-[#0f3460]/50 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <X className="mr-2 h-4 w-4 inline" />
          Back
        </motion.button>

        <motion.button
          type="button"
          onClick={nextStep}
          className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-medium rounded-md transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Submit
          <FileUp className="ml-2 h-4 w-4 inline" />
        </motion.button>
      </div>
    </motion.div>
  );
}
