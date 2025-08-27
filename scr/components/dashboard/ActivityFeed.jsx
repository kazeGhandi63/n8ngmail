import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { 
  Mail, 
  Trash2, 
  FolderKanban,
  AlertTriangle, 
  Reply 
} from "lucide-react";

const getActionIcon = (action) => {
  switch (action) {
    case 'organized': return <FolderKanban className="w-4 h-4" />;
    case 'prioritized': return <AlertTriangle className="w-4 h-4" />;
    case 'deleted': return <Trash2 className="w-4 h-4" />;
    case 'auto_replied': return <Reply className="w-4 h-4" />;
    default: return <Mail className="w-4 h-4" />;
  }
};

const getActionColor = (action) => {
  switch (action) {
    case 'organized': return 'bg-blue-100 text-blue-800';
    case 'prioritized': return 'bg-amber-100 text-amber-800';
    case 'deleted': return 'bg-red-100 text-red-800';
    case 'auto_replied': return 'bg-green-100 text-green-800';
    default: return 'bg-slate-100 text-slate-800';
  }
};

const getActionText = (action) => {
  switch (action) {
    case 'organized': return 'Organizado';
    case 'prioritized': return 'Priorizado';
    case 'deleted': return 'Deletado';
    case 'auto_replied': return 'Resposta Auto';
    case 'unsubscribed': return 'Descadastrado';
    default: return 'Processado';
  }
};

export default function ActivityFeed({ emails = [] }) {
  const recentEmails = emails
    .sort((a, b) => new Date(b.processed_date || b.created_date) - new Date(a.processed_date || a.created_date))
    .slice(0, 8);

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-900">
          Atividade Recente
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentEmails.length === 0 ? (
          <div className="text-center py-8">
            <Mail className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">Nenhum email processado ainda</p>
          </div>
        ) : (
          recentEmails.map((email) => (
            <div key={email.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors duration-200">
              <div className="p-2 bg-slate-100 rounded-lg flex-shrink-0">
                {getActionIcon(email.action_taken)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-slate-900 truncate">
                    {email.sender_name || email.sender}
                  </p>
                  <Badge variant="secondary" className={`${getActionColor(email.action_taken)} text-xs`}>
                    {getActionText(email.action_taken)}
                  </Badge>
                </div>
                <p className="text-sm text-slate-600 truncate mb-1">
                  {email.subject}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-400">
                    {format(new Date(email.processed_date || email.created_date), "dd/MM 'às' HH:mm", { locale: ptBR })}
                  </p>
                  {email.target_folder && (
                    <p className="text-xs text-blue-600">→ {email.target_folder}</p>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}