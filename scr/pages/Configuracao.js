import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Download, 
  Server, 
  Globe, 
  Settings, 
  Key, 
  CheckCircle,
  ExternalLink,
  Code,
  Cloud
} from 'lucide-react';

const workflowData = {
  "name": "Gmail Automation Workflow (Corrigido)",
  "nodes": [
    {
      "parameters": {
        "pollTimes": {
          "item": [
            {
              "mode": "everyMinute",
              "minute": 30
            }
          ]
        },
        "filters": {
          "readStatus": "unread"
        }
      },
      "name": "Gmail Trigger",
      "type": "n8n-nodes-base.gmail",
      "typeVersion": 2,
      "position": [240, 300],
      "credentials": {
        "gmailOAuth2": {
          "id": "1",
          "name": "Sua Credencial Gmail"
        }
      }
    },
    {
      "parameters": {
        "values": {
          "string": [
            {
              "name": "dashboard_url",
              "value": "https://seu-dashboard.vercel.app"
            }
          ]
        }
      },
      "name": "Set Variables",
      "type": "n8n-nodes-base.set",
      "typeVersion": 1,
      "position": [460, 300]
    },
    {
      "parameters": {
        "conditions": {
          "string": [
            {
              "value1": "={{ $json.from }}",
              "operation": "contains",
              "value2": "dan.bisani@example.com"
            }
          ]
        }
      },
      "name": "Check Dan Bisani",
      "type": "n8n-nodes-base.if",
      "typeVersion": 1,
      "position": [680, 100]
    },
    {
      "parameters": {
        "conditions": {
          "string": [
            {
              "value1": "={{ $json.from }}",
              "operation": "contains",
              "value2": "ray@woodslaw.com"
            }
          ]
        }
      },
      "name": "Check Ray Woods",
      "type": "n8n-nodes-base.if",
      "typeVersion": 1,
 