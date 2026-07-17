import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { LandingLayout } from "@/layouts/LandingLayout";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { AuthLayout } from "@/layouts/AuthLayout";
import { AuthProvider } from "@/context/AuthContext";
import { WorkspaceProvider } from "@/context/WorkspaceContext";
import { ProtectedRoute } from "./ProtectedRoute";

// Imports from the new folder structure
import { LandingPage } from "@/pages/Landing";
import { DashboardPage } from "@/pages/Dashboard";
import { CopilotPage } from "@/pages/AICopilot";
import { AnalyticsPage } from "@/pages/Analytics";
import { CRMPage } from "@/pages/CRM";
import { DocumentsPage } from "@/pages/Documents";
import { OnboardingPage } from "@/pages/Onboarding";
import { IndustryModuleView } from "@/pages/Industry/IndustryModuleView";

// Core Business Pages
import { SalesPage } from "@/pages/Sales";
import { MarketingPage } from "@/pages/Marketing";
import { FinancePage } from "@/pages/Finance";
import { HRMSPage } from "@/pages/HRMS";
import { SupportPage } from "@/pages/Support";
import { InventoryPage } from "@/pages/Inventory";
import { ERPPage } from "@/pages/ERP";

// Auth and Settings Pages
import { LoginPage } from "@/pages/Login";
import { RegisterPage } from "@/pages/Register";
import { NotificationsPage } from "@/pages/Notifications";
import { ProfilePage } from "@/pages/Profile";
import { SettingsPage } from "@/pages/Settings";

// New Enterprise AI Modules
import { AdvisorPage } from "@/pages/Advisor";
import { ExecutivePage } from "@/pages/Executive";
import { RiskCenterPage } from "@/pages/RiskCenter";
import { BranchesPage } from "@/pages/Branches";
import { DigitalTwinPage } from "@/pages/DigitalTwin";
import { GoalsPage } from "@/pages/Goals";
import { SustainabilityPage } from "@/pages/Sustainability";
import { MeetingsPage } from "@/pages/Meetings";
import { BranchDetail } from "@/pages/Branches/BranchDetail";
import { InventoryForecast } from "@/pages/Inventory/Forecast";

export function AppRoutes() {
  return (
    <AuthProvider>
      <WorkspaceProvider>
        <Routes>
          <Route element={<LandingLayout />}>
            <Route path="/" element={<LandingPage />} />
          </Route>

          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected App Routes */}
          <Route path="app" element={<ProtectedRoute />}>
            {/* Standalone full-screen setup onboarding */}
            <Route path="onboarding" element={<OnboardingPage />} />
            
            <Route element={<DashboardLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="dashboard" element={<Navigate to="/app" replace />} />
              <Route path="industry/:moduleId" element={<IndustryModuleView />} />
            
              {/* Core Business */}
              <Route path="sales" element={<SalesPage />} />
              <Route path="marketing" element={<MarketingPage />} />
              <Route path="crm" element={<CRMPage />} />
              <Route path="finance" element={<FinancePage />} />
              <Route path="hrms" element={<HRMSPage />} />
              <Route path="hr" element={<HRMSPage />} />
              <Route path="support" element={<SupportPage />} />
              <Route path="documents" element={<DocumentsPage />} />
              <Route path="sustainability" element={<SustainabilityPage />} />
              
              {/* Operations & Supply */}
              <Route path="erp" element={<ERPPage />} />
              <Route path="branches" element={<BranchesPage />} />
              <Route path="branches/:branchId" element={<BranchDetail />} />
              <Route path="inventory" element={<InventoryPage />} />
              <Route path="inventory/forecast" element={<InventoryForecast />} />
              
              {/* AI & Intelligence */}
              <Route path="ai-copilot" element={<CopilotPage />} />
              <Route path="copilot" element={<CopilotPage />} />
              <Route path="advisor" element={<AdvisorPage />} />
              <Route path="meetings" element={<MeetingsPage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              
              {/* Executive */}
              <Route path="executive" element={<ExecutivePage />} />
              <Route path="goals" element={<GoalsPage />} />
              <Route path="risks" element={<RiskCenterPage />} />
              <Route path="digital-twin" element={<DigitalTwinPage />} />

              {/* Global / User */}
              <Route path="notifications" element={<NotificationsPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>
          </Route>
        </Routes>
      </WorkspaceProvider>
    </AuthProvider>
  );
}
