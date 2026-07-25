import {
  CreditCard,
  MessageSquare,
  Database,
  FileText,
  BarChart3,
  Mail,
  MessageCircle,
  Briefcase,
  Layers,
  Settings,
  Shield,
} from "lucide-react";

export default function IntegrationGrid() {
  const integrations = [
    { icon: CreditCard, label: "CRM" },
    { icon: MessageSquare, label: "Slack" },
    { icon: Database, label: "Data" },
    { label: "Duowork", core: true },
    { icon: FileText, label: "Docs" },
    { icon: BarChart3, label: "BI" },
    { icon: Mail, label: "Email" },
    { icon: MessageCircle, label: "Support" },
    { icon: Briefcase, label: "Ops" },
    { icon: Layers, label: "Finance" },
    { icon: Settings, label: "API" },
    { icon: Shield, label: "Auth" },
  ];

  return (
    <div className="mt-auto bg-[#1c1c1c] border border-duo-grey/30 rounded-[14px] md:rounded-[18px] p-3 md:p-4 relative overflow-hidden">
      <div className="flex items-center justify-between mb-2.5 md:mb-3.5 font-mono text-[9px] md:text-[11px] text-white/50 tracking-[0.06em]">
        <span className="hidden md:inline">// connected_stack</span>
        <span className="md:hidden">// stack</span>
        <span className="flex items-center gap-1 md:gap-1.5 text-duo-green-200 text-[8px] md:text-[11px]">
          <span className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-duo-green-200 shadow-[0_0_0_2px_rgba(158,255,81,0.18)] md:shadow-[0_0_0_3px_rgba(158,255,81,0.18)]" />
          live sync
        </span>
      </div>

      <div className="grid grid-cols-4 md:grid-cols-6 gap-1.5 md:gap-2.5">
        {integrations.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className={`aspect-square rounded-[10px] md:rounded-[14px] border flex flex-col items-center justify-center gap-1 md:gap-1.5 text-[8px] md:text-[10px] font-semibold text-center tracking-[0.02em] transition-all duration-200 relative ${
                item.core
                  ? "bg-duo-green-200 text-duo-dark border-duo-green-200 shadow-[0_8px_20px_-8px_rgba(158,255,81,0.5)] md:shadow-[0_12px_26px_-10px_rgba(158,255,81,0.5)]"
                  : "bg-[#2b2b2b] border-duo-grey/30 text-white/[0.72] hover:-translate-y-0.5 hover:border-duo-green-200/[0.32] hover:text-white"
              }`}
            >
              {Icon && (
                <Icon
                  className={`w-3.5 md:w-5 h-3.5 md:h-5 ${item.core ? "text-duo-dark" : "text-white"}`}
                  strokeWidth={1.8}
                />
              )}
              <span className="hidden sm:inline">{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
