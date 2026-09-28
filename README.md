<div align="center">
  <h1>🌾 Indiana Ranch & Implementos Agrícolas</h1>
  <p><strong>Portal Corporativo & Catálogo Western · Edge Computing & Despacho Transacional Serverless</strong></p>
  <p>
    <a href="https://github.com/frfernando/website-indiana"><img src="https://img.shields.io/badge/Status-Produção-22c55e?style=for-the-badge&logo=statuspage&logoColor=white" alt="Status" /></a>
    <a href="https://github.com/frfernando/website-indiana"><img src="https://img.shields.io/badge/Stack-Astro_SSR_+_Resend-FF5F00?style=for-the-badge&logo=astro&logoColor=white" alt="Stack" /></a>
    <a href="https://github.com/frfernando/website-indiana"><img src="https://img.shields.io/badge/Edge-Cloudflare_Functions-F38020?style=for-the-badge&logo=cloudflare&logoColor=white" alt="Cloudflare Edge" /></a>
  </p>
</div>

---

## 📌 Visão Geral do Estudo de Caso

A **Indiana Ranch** é uma marca consolidada no segmento country, selaria e implementos agrícolas, atendendo produtores rurais, haras e amantes do estilo de vida western.

O projeto consistiu em construir uma presença digital ultraveloz e independente, permitindo ao cliente expor suas linhas de produtos, responder cotações agrícolas em segundos e receber pedidos e contatos diretamente por e-mail e WhatsApp sem custos recorrentes de hospedagens dedicadas caras.

---

## 🔍 O Antes (O Desafio)

* **Dependência Excessiva de Redes Sociais:** O cliente concentrava todo o fluxo em mensagens avulsas no Instagram, sem um catálogo oficial indexado pelo Google.
* **Fricção de Navegação em Redes 3G/4G Rurais:** Clientes no campo sofriam com sites pesados e lentos para abrir fotos de produtos e maquinários.
* **Custo & Complexidade de Manutenção:** Manter uma loja virtual tradicional (WooCommerce/Magento) gerava custos contínuos de servidor e lentidão no banco de dados para apenas solicitar cotações de atacado e varejo.

---

## 💡 O Porquê (A Estratégia de Engenharia)

* **Por que Astro SSR com Cloudflare Functions?**  
  Eliminamos qualquer servidor fixo (Node.js/PHP com custo mensal em dólar). As páginas estáticas são distribuídas pela CDN global e, quando o visitante submete uma cotação, uma **Cloudflare Worker Edge Function** é invocada instantaneamente em microssegundos.
* **Por que Resend API para Despacho?**  
  Em vez de protocolos SMTP lentos e suscetíveis a cair em caixas de spam, integramos a moderna **Resend API** em TypeScript puro, garantindo entrega do formulário de contato em menos de 1 segundo diretamente na caixa postal da gerência.
* **Por que Design Mobile-First Otimizado?**  
  Mais de 85% do público agro navega exclusivamente via smartphone. A interface foi desenhada com botões táteis generosos, tipografia de alto contraste sob luz solar e compressão de imagens em formato moderno.

---

## 🚀 O Depois (Resultados & Impacto)

| Métrica / Critério | Cenário Anterior | Portal Indiana Ranch |
|---|---|---|
| **Tempo de Resposta em Redes Móveis** | Inexistente / &gt; 5s | **⚡ &lt; 1 segundo em qualquer conexão** |
| **Custo Fixo de Servidor de Backend** | R$ 150 - R$ 350 / mês | **R$ 0,00 (Serverless Edge Global)** |
| **Taxa de Entrega de Cotações** | Falhas frequentes de SMTP | **100% de entregabilidade via Resend API** |
| **Integração Omnichannel** | Mensagens soltas | **Funil estruturado direto para WhatsApp com mensagem personalizada** |

---

## 🧰 Stack Tecnológica & Decisões de Arquitetura

* **Framework:** `Astro 7` com modo SSR adaptativo
* **Funções na Borda:** `Cloudflare Pages Functions` (`functions/api/contato.ts`)
* **Serviço Transacional:** `Resend API` com tipagem estrita
* **Design & Estilo:** `CSS3 Modular` & `Design Tokens` responsivos
* **Higiene de Segurança:** Zero segredos no cliente, validação rigorosa de payload e variáveis de ambiente isoladas

---

## 🛠️ Como Executar o Projeto Localmente

```bash
# 1. Clonar o repositório
git clone https://github.com/frfernando/website-indiana.git
cd website-indiana

# 2. Instalar dependências
npm install

# 3. Configurar variáveis de ambiente (.env)
cp .env.example .env
# Adicione: RESEND_API_KEY=sua_chave

# 4. Rodar em ambiente local
npm run dev
```

---

<div align="center">
  <p>Engenharia e Arquitetura desenvolvidas por <b><a href="https://github.com/frfernando">Fernando Reis</a></b> · <b><a href="https://sanbernarda.com">SanBernarda Studio</a></b></p>
</div>
