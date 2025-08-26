
import React, { useState, useEffect } from "react";
import { EmailRule } from "@/entities/EmailRule";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Filter,
  Mail,
  FolderKanban, // Changed from FolderMove to FolderKanban
  AlertTriangle,
  Reply
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import RuleForm from "../components/rules/RuleForm";

export default function Rules() {
  const [rules, setRules] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingRule, setEditingRule] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRules();
  }, []);

  const loadRules = async () => {
    try {
      const rulesData = await EmailRule.list("-created_date");
      setRules(rulesData);
    } catch (error) {
      console.error("Erro ao carregar regras:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveRule = async (ruleData) => {
    try {
      if (editingRule) {
        await EmailRule.update(editingRule.id, ruleData);
      } else {
        await EmailRule.create(ruleData);
      }
      setShowForm(false);
      setEditingRule(null);
      loadRules();
    } catch (error) {
      console.error("Erro ao salvar regra:", error);
    }
  };

  const handleEditRule = (rule) => {
    setEditingRule(rule);
    setShowForm(true);
  };

  const handleDeleteRule = async (ruleId) => {
    if (confirm("Tem certeza que deseja excluir esta regra?")) {
      try {
        await EmailRule.delete(ruleId);
        loadRules();
      } catch (error) {
        console.error("Erro ao excluir regra:", error);
      }
    }
  };

  const toggleRuleStatus = async (rule) => {
    try {
      await EmailRule.update(rule.id, { ...rule, is_active: !rule.is_active });
      loadRules();
    } catch (error) {
      console.error("Erro ao atualizar status da regra:", error);
    }
  };

  const getActionIcon = (action) => {
    switch (action) {
      case 'organize': return <FolderKanban className="w-4 h-4" />; // Used FolderKanban
      case 'priority': return <AlertTriangle className="w-4 h-4" />;
      case 'spam': return <Trash2 className="w-4 h-4" />;
      case 'auto_reply': return <Reply className="w-4 h-4" />;
      default: return <Mail className="w-4 h-4" />;
    }
  };

  const getActionText = (action) => {
    switch (action) {
      case 'organize': return 'Organizar';
      case 'priority': return 'Priorizar';
      case 'spam': return 'Spam';
      case 'unsubscribe': return 'Descadastrar';
      case 'auto_reply': return 'Resposta Auto';
      default: return action;
    }
  };

  const getActionColor = (action) => {
    switch (action) {
      case 'organize': return 'bg-blue-100 text-blue-800';
      case 'priority': return 'bg-amber-100 text-amber-800';
      case 'spam': return 'bg-red-100 text-red-800';
      case 'unsubscribe': return 'bg-purple-100 text-purple-800';
      case 'auto_reply': return 'bg-green-100 text-green-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Regras de Email</h1>
            <p className="text-slate-600 mt-1">Configure filtros e ações automáticas para seus emails</p>
          </div>
          <Button 
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nova Regra
          </Button>
        </div>

        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8"
            >
              <RuleForm
                rule={editingRule}
                onSave={handleSaveRule}
                onCancel={() => {
                  setShowForm(false);
                  setEditingRule(null);
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {loading ? (
          <div className="grid gap-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-4 bg-slate-200 rounded mb-2"></div>
                  <div className="h-3 bg-slate-200 rounded w-2/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid gap-4">
            <AnimatePresence>
              {rules.map((rule) => (
                <motion.div
                  key={rule.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-blue-50 rounded-lg">
                              {getActionIcon(rule.action)}
                            </div>
                            <div>
                              <h3 className="font-semibold text-slate-900">{rule.name}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  <Filter className="w-3 h-3 mr-1" />
                                  {rule.filter_type}: {rule.filter_value}
                                </Badge>
                                <Badge className={`${getActionColor(rule.action)} text-xs`}>
                                  {getActionText(rule.action)}
                                </Badge>
 