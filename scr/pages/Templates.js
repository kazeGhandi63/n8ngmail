import React, { useState, useEffect } from "react";
import { ResponseTemplate } from "@/entities/ResponseTemplate";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Edit, 
  Trash2, 
  FileText,
  Save,
  X,
  Clock,
  Tag
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function Templates() {
  const [templates, setTemplates] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    trigger_keywords: [],
    subject_template: '',
    body_template: '',
    sender_filter: '',
    priority_level: 'medium',
    is_active: true,
    delay_minutes: 0
  });

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      const templatesData = await ResponseTemplate.list("-created_date");
      setTemplates(templatesData);
    } catch (error) {
      console.error("Erro ao carregar templates:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTemplate = async (e) => {
    e.preventDefault();
    try {
      if (editingTemplate) {
        await ResponseTemplate.update(editingTemplate.id, formData);
      } else {
        await ResponseTemplate.create(formData);
      }
      resetForm();
      loadTemplates();
    } catch (error) {
      console.error("Erro ao salvar template:", error);
    }
  };

  const handleEditTemplate = (template) => {
    setEditingTemplate(template);
    setFormData(template);
    setShowForm(true);
  };

  const handleDeleteTemplate = async (templateId) => {
    if (confirm("Tem certeza que deseja excluir este template?")) {
      try {
        await ResponseTemplate.delete(templateId);
        loadTemplates();
      } catch (error) {
        console.error("Erro ao excluir template:", error);
      }
    }
  };

  const toggleTemplateStatus = async (template) => {
    try {
      await ResponseTemplate.update(template.id, { ...template, is_active: !template.is_active });
      loadTemplates();
    } catch (error) {
      console.error("Erro ao atualizar status do template:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      trigger_keywords: [],
      subject_template: '',
      body_template: '',
      sender_filter: '',
      priority_level: 'medium',
      is_active: true,
      delay_minutes: 0
    });
    setShowForm(false);
    setEditingTemplate(null);
  };

  const handleKeywordChange = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      e.preventDefault();
      const keyword = e.target.value.trim();
      if (!formData.trigger_keywords.includes(keyword)) {
        setFormData(prev => ({
          ...prev,
          trigger_keywords: [...prev.trigger_keywords, keyword]
        }));
      }
      e.target.value = '';
    }
  };

  const removeKeyword = (keyword) => {
    setFormData(prev => ({
      ...prev,
      trigger_keywords: prev.trigger_keywords.filter(k => k !== keyword)
    }));
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

  return (
    <div className="p-6 space-y-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Templates de Resposta</h1>
            <p className="text-slate-600 mt-1">Gerencie templates para respostas automáticas</p>
          </div>
          <Button 
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Novo Template
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
              <Card className="bg-white/90 backdrop-blur-sm border-slate-200/60">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    {editingTemplate ? 'Editar Template' : 'Novo Template'}
                  </CardTitle>
                  <Button variant="ghost" size="icon" onClick={resetForm}>
                    <X className="w-4 h-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSaveTemplate} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome do Template</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Ex: Resposta padrão para consultas"
                          required
                        />
                      </div>

                      <div className="space-y-2">
 