
import React, { useState, useEffect } from "react";
import { ProcessedEmail } from "@/entities/ProcessedEmail";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Mail, 
  Search, 
  Filter,
  Calendar,
  User,
  FolderKanban,
  AlertTriangle,
  Trash2,
  Reply,
  ExternalLink
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function Emails() {
  const [emails, setEmails] = useState([]);
  const [filteredEmails, setFilteredEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');

  useEffect(() => {
    loadEmails();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const action = params.get('action');
    const priority = params.get('priority');

    if (action) setFilterAction(action);
    if (priority) setFilterPriority(priority);
  }, [window.location.search]);

  useEffect(() => {
    applyFilters();
  }, [emails, searchTerm, filterAction, filterPriority]);

  const loadEmails = async () => {
    try {
      const emailsData = await ProcessedEmail.list("-processed_date");
      setEmails(emailsData);
    } catch (error) {
      console.error("Erro ao carregar emails:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = emails;

    // Filtro por busca
    if (searchTerm) {
      filtered = filtered.filter(email => 
        email.sender?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        email.sender_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        email.subject?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro por ação
    if (filterAction !== 'all') {
      filtered = filtered.filter(email => email.action_taken === filterAction);
    }

    // Filtro por prioridade
    if (filterPriority !== 'all') {
      filtered = filtered.filter(email => email.priority_level === filterPriority);
    }

    setFilteredEmails(filtered);
  };

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
      case 'unsubscribed': return 'bg-purple-100 text-purple-800';
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

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const getPriorityText = (priority) => {
    switch (priority) {
      case 'urgent': return 'Urgente';
      case 'high': return 'Alta';
      case 'medium': return 'Média';
      case 'low': return 'Baixa';
      default: return priority;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Emails Processados</h1>
          <p className="text-slate-600 mt-1">Histórico de todos os emails processados pelo sistema</p>
        </div>

        {/* Filtros */}
        <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Filter className="w-5 h-5" />
              Filtros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Buscar por remetente ou assunto..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={filterAction} onValueChange={setFilterAction}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por ação" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as Ações</SelectItem>
                  <SelectItem value="organized">Organizados</SelectItem>
                  <SelectItem value="prioritized">Priorizados</SelectItem>
                  <SelectItem value="deleted">Deletados</SelectItem>
                  <SelectItem value="auto_replied">Resposta Automática</SelectItem>
                  <SelectItem value="unsubscribed">Descadastrados</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por prioridade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as Prioridades</SelectItem>
                  <SelectItem value="urgent">Urgente</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                  <SelectItem value="medium">Média</SelectItem>
                  <SelectItem value="low">Baixa</SelectItem>
                </SelectContent>
              </Select>
 