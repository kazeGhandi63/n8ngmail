import React, { useState, useEffect } from "react";
import { ProcessedEmail, EmailRule, ResponseTemplate } from "@/entities/all";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Mail, 
  AlertTriangle, 
  FolderKanban,
  Reply,
  Trash2,
  Settings,
  TrendingUp
} from "lucide-react";
import StatsCard from "../components/dashboard/StatsCard";
import ActivityFeed from "../components/dashboard/ActivityFeed";

export default function Dashboard() {
  const [emails, setEmails] = useState([]);
  const [rules, setRules] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [emailsData, rulesData, templatesData] = await Promise.all([
        ProcessedEmail.list("-processed_date"),
        EmailRule.list(),
        ResponseTemplate.list()
      ]);
      
      setEmails(emailsData);
      setRules(rulesData);
      setTemplates(templatesData);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  // Calcular estatísticas
  const totalEmails = emails.length;
  const priorityEmails = emails.filter(e => e.priority_level === 'high' || e.priority_level === 'urgent').length;
  const organizedEmails = emails.filter(e => e.action_taken === 'organized').length;
  const autoReplies = emails.filter(e => e.action_taken === 'auto_replied').length;
  const deletedSpam = emails.filter(e => e.action_taken === 'deleted').length;
  const activeRules = rules.filter(r => r.is_active).length;

  // Emails dos últimos 30 dias
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const recentEmails = emails.filter(e => 
    new Date(e.processed_date || e.created_date) > thirtyDaysAgo
  );

  return (
    <div className="p-6 space-y-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Dashboard de Automação Gmail
          </h1>
          <p className="text-slate-600">
            Monitore e gerencie suas automações de email em tempo real
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link to={createPageUrl("Emails")}>
            <StatsCard
              title="Total de Emails"
              value={totalEmails.toLocaleString()}
              icon={Mail}
              subtitle="Processados pelo sistema"
              change="+12%"
            />
          </Link>
          
          <Link to={createPageUrl("Emails?priority=high")}>
            <StatsCard
              title="Emails Prioritários"
              value={priorityEmails}
              icon={AlertTriangle}
              subtitle="Requerem atenção"
              change="+8%"
            />
          </Link>
          
          <Link to={createPageUrl("Emails?action=organized")}>
            <StatsCard
              title="Organizados"
              value={organizedEmails}
              icon={FolderKanban}
              subtitle="Movidos automaticamente"
              change="+15%"
            />
          </Link>
          
          <Link to={createPageUrl("Emails?action=auto_replied")}>
            <StatsCard
              title="Respostas Auto"
              value={autoReplies}
              icon={Reply}
              subtitle="Enviadas automaticamente"
              change="+22%"
            />
          </Link>
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link to={createPageUrl("Emails?action=deleted")}>
            <StatsCard
              title="Spam Deletado"
              value={deletedSpam}
              icon={Trash2}
              subtitle="Emails indesejados removidos"
            />
          </Link>
          
          <Link to={createPageUrl("Rules")}>
            <StatsCard
              title="Regras Ativas"
              value={activeRules}
              icon={Settings}
              subtitle={`${rules.length} regras totais`}
            />
          </Link>
          
          <Link to={createPageUrl("Templates")}>
            <StatsCard
              title="Templates"
              value={templates.length}
              icon={Reply}
              subtitle="Disponíveis para respostas"
            />
          </Link>
        </div>

        {/* Activity Feed and Quick Stats */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ActivityFeed emails={recentEmails} />
          </div>
          
          <div className="space-y-6">
            {/* Pastas Organizadas */}
            <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                Organização por Pasta
              </h3>
              <div className="space-y-3">
                {['Dan Bisani', 'Ray Woods', 'Kimberly Felton', 'Outros'].map((folder) => {
                  const count = emails.filter(e => e.target_folder === folder || (folder === 'Outros' && !e.target_folder)).length;
                  return (
                    <div key={folder} className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">{folder}</span>
                      <span className="font-semibold text-slate-900">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Status do Workflow */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200/60 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <h3 className="text-lg font-semibold text-slate-900">
                  Status do Workflow
                </h3>
              </div>
              <p className="text-sm text-slate-600 mb-2">Sistema ativo e funcionando</p>
              <p className="text-xs text-slate-500">
                Última execução: há 2 minutos<br />
                Próxima execução: em 28 minutos
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}