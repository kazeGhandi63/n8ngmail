import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Rocket, Github, Terminal, Key, CheckCircle } from 'lucide-react';

export default function DeployGuide() {
  const gitCommands = `
# 1. Navegue até a pasta do projeto descompactado
cd nome-da-pasta-do-projeto

# 2. Inicie um repositório Git e defina o branch principal
git init -b main

# 3. Adicione o seu repositório do GitHub como remoto
# (Substitua pela URL do seu repositório)
git remote add origin https://github.com/seu-usuario/seu-repositorio.git

# 4. Adicione todos os arquivos
git add .

# 5. Crie o primeiro commit
git commit -m "Primeiro commit do projeto"

# 6. Envie os arquivos para o GitHub
git push -u origin main
  `.trim();

  return (
    <div className="p-6 space-y-8 bg-gray-50/50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 tracking-tight">Guia de Deploy na Vercel</h1>
          <p className="mt-4 text-lg text-gray-600">
            Passo a passo para publicar seu dashboard online gratuitamente.
          </p>
        </div>

        <div className="space-y-8">
          {/* Passo 1: Baixar Código */}
          <Card className="bg-white/95 backdrop-blur-sm border-slate-200/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl text-gray-900">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold">1</span>
                <span>Baixar o Código-Fonte</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
              <p>Primeiro, você precisa do código-fonte do seu projeto. Clique no botão de download na parte superior do editor para baixar um arquivo <code>.zip</code> com todos os arquivos do seu aplicativo.</p>
              <p>Após o download, descompacte este arquivo em uma pasta no seu computador.</p>
            </CardContent>
          </Card>

          {/* Passo 2: Enviar para o GitHub */}
          <Card className="bg-white/95 backdrop-blur-sm border-slate-200/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl text-gray-900">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold">2</span>
                <Github className="w-6 h-6" />
                <span>Enviar para o GitHub</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
              <p>Com o código na sua máquina e o repositório criado no GitHub, use um terminal (como Git Bash, PowerShell, etc.) para enviar o código. Execute os seguintes comandos dentro da pasta do projeto:</p>
              <div className="p-4 bg-slate-900 text-white rounded-lg font-mono text-sm overflow-x-auto">
                <pre><code>{gitCommands}</code></pre>
              </div>
              <p>Após isso, seu código estará no repositório do GitHub.</p>
            </CardContent>
          </Card>

          {/* Passo 3: Importar na Vercel */}
          <Card className="bg-white/95 backdrop-blur-sm border-slate-200/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl text-gray-900">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold">3</span>
                <Rocket className="w-6 h-6 text-indigo-600" />
                <span>Importar na Vercel</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
              <ol className="list-decimal list-inside space-y-2">
                <li>Acesse seu <a href="https://vercel.com/dashboard" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Dashboard da Vercel</a>.</li>
                <li>Clique em <strong>"Add New..."</strong> e selecione <strong>"Project"</strong>.</li>
                <li>Na lista, encontre o repositório do GitHub que você acabou de atualizar e clique em <strong>"Import"</strong>.</li>
                <li>A Vercel detectará que é um projeto Vite/React. Você pode deixar todas as configurações de Build e Output como estão.</li>
              </ol>
            </CardContent>
          </Card>
          
          {/* Passo 4: Variáveis de Ambiente */}
          <Card className="bg-white/95 backdrop-blur-sm border-slate-200/60">
            <CardHeader>
 