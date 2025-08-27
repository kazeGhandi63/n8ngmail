import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { X, Plus, Save } from "lucide-react";

export default function RuleForm({ rule = null, onSave, onCancel }) {
  const [formData, setFormData] = useState(rule || {
    name: '',
    filter_type: 'sender',
    filter_value: '',
    action: 'organize',
    target_folder: '',
    is_active: true,
    priority_level: 'medium'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const folders = [
    'Dan Bisani',
    'Ray Woods',
    'Kimberly Felton',
    'Lixeira',
    'Spam',
    'Prioritários'
  ];

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-slate-200/60">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold text-slate-900">
          {rule ? 'Editar Regra' : 'Nova Regra'}
        </CardTitle>
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome da Regra</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Ex: Organizar emails Dan Bisani"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="filter_type">Tipo de Filtro</Label>
              <Select value={formData.filter_type} onValueChange={(value) => handleChange('filter_type', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sender">Remetente</SelectItem>
                  <SelectItem value="subject">Assunto</SelectItem>
                  <SelectItem value="content">Conteúdo</SelectItem>
                  <SelectItem value="priority">Prioridade</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="filter_value">Valor do Filtro</Label>
              <Input
                id="filter_value"
                value={formData.filter_value}
                onChange={(e) => handleChange('filter_value', e.target.value)}
                placeholder={
                  formData.filter_type === 'sender' ? 'email@exemplo.com' :
                  formData.filter_type === 'subject' ? 'Palavra-chave no assunto' :
                  formData.filter_type === 'content' ? 'Palavra-chave no conteúdo' :
                  'Nível de prioridade'
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="action">Ação</Label>
              <Select value={formData.action} onValueChange={(value) => handleChange('action', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="organize">Organizar em Pasta</SelectItem>
                  <SelectItem value="priority">Marcar como Prioritário</SelectItem>
                  <SelectItem value="spam">Marcar como Spam</SelectItem>
                  <SelectItem value="unsubscribe">Descadastrar</SelectItem>
                  <SelectItem value="auto_reply">Resposta Automática</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(formData.action === 'organize' || formData.action === 'spam') && (
              <div className="space-y-2">
                <Label htmlFor="target_folder">Pasta de Destino</Label>
                <Select value={formData.target_folder} onValueChange={(value) => handleChange('target_folder', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma pasta" />
                  </SelectTrigger>
                  <SelectContent>
                    {folders.map(folder => (
                      <SelectItem key={folder} value={folder}>{folder}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="priority_level">Nível de Prioridade</Label>
              <Select value={formData.priority_level} onValueChange={(value) => handleChange('priority_level', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Baixa</SelectItem>
                  <SelectItem value="medium">Média</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                  <SelectItem value="urgent">Urgente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="is_active"
              checked={formData.is_active}
              onCheckedChange={(checked) => handleChange('is_active', checked)}
            />
            <Label htmlFor="is_active" className="text-sm font-medium">
              Regra ativa
            </Label>
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              Salvar Regra
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}