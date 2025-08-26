import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Settings, ListChecks, Mail, Bot } from 'lucide-react';

export default function Guia() {
  return (
    <div className="p-6 space-y-8 bg-gray-50/50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 tracking-tight">Guia de Utilização</h1>
          <p className="mt-4 text-lg text-gray-600">
            Aprenda a automatizar sua caixa de entrada do Gmail e a focar no que realmente importa.
          </p>
        </div>

        <div className="space-y-8">
          <Card className="bg-white/95 backdrop-blur-sm border-slate-200/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl text-gray-900">
                <Lightbulb className="w-6 h-6 text-amber-500" />
                <span>Visão Geral</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
              <p>Este painel de controle permite gerenciar um fluxo de automação (workflow) para sua conta do Gmail. O objetivo é economizar seu tempo, organizando e respondendo e-mails automaticamente com base em regras que você define.</p>
              <p>O sistema funciona em segundo plano, verificando seus e-mails periodicamente e aplicando as regras que você configurar aqui.</p>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm border-slate-200/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl text-gray-900">
                <Settings className="w-6 h-6 text-blue-600" />
                <span>Regras de Email</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
              <p>Esta é a seção principal. Aqui você cria as "receitas" para a automação. Uma regra consiste em:</p>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li><strong>Gatilho:</strong> Uma condição que o e-mail deve atender (ex: remetente específico, palavra no assunto).</li>
                <li><strong>Ação:</strong> O que o sistema deve fazer quando o gatilho é ativado (ex: mover para uma pasta, marcar como importante, responder).</li>
              </ul>
              <div className="p-4 bg-slate-50 rounded-lg mt-4 border border-slate-200">
                <p className="font-semibold">Exemplo de Regra:</p>
                <p className="mt-2"><strong>SE</strong> um e-mail for recebido de <code>"dan.bisani@example.com"</code></p>
                <p><strong>ENTÃO</strong> mover para a pasta <code>"Dan Bisani"</code> e marcar como <code>alta prioridade</code>.</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/95 backdrop-blur-sm border-slate-200/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl text-gray-900">
                <ListChecks className="w-6 h-6 text-green-600" />
                <span>Templates de Resposta</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
                <p>Para as regras de "Resposta Automática", você pode criar modelos de e-mail (templates). Use marcadores como <code>{'{sender_name}'}</code> ou <code>{'{original_subject}'}</code> para personalizar suas respostas.</p>
                <p>Isto é útil para confirmações de recebimento, respostas a perguntas frequentes ou para informar que você responderá mais tarde.</p>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm border-slate-200/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl text-gray-900">
                <Mail className="w-6 h-6 text-slate-600" />
                <span>Emails Processados</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
              <p>Nesta tela, você pode ver um histórico de todos os e-mails que foram processados pelo sistema e qual ação foi tomada para cada um. É uma ótima maneira de verificar se suas regras estão funcionando como esperado.</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/95 backdrop-blur-sm border-slate-200/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl text-gray-900">
                <Bot className="w-6 h-6 text-indigo-600" />
                <span>Como Funciona?</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
              <p>Esta aplicação se conecta a um serviço de automação chamado <strong>n8n</strong>. Suas regras são enviadas para um "workflow" no n8n que, por sua vez, se conecta à sua conta do Gmail de forma segura usando a API oficial do Google.</p>
              <p>O workflow é executado a cada 30 minutos, lê os novos e-mails, compara com suas regras e executa as ações definidas. Nenhum dado sensível (como senhas) é armazenado aqui.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}