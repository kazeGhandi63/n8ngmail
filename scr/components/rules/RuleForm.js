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
