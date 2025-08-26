
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { 
  Mail, 
  Trash2, 
  FolderKanban, // Changed from FolderMove to FolderKanban
  AlertTriangle, 
  Reply 
} from "lucide-react";

const getActionIcon = (action) => {
  switch (action) {
    case 'organized': return <FolderKanban className="w-4 h-4" />; // Updated to FolderKanban
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
