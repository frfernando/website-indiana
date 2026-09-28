/**
 * Utilitário Edge Nativo para Envio de E-mails via Resend REST API
 * Compatível com Cloudflare Pages / Workers e Node.js
 */

export interface ContactFormData {
    name: string;
    whatsapp: string;
    email: string;
    profile: string;
    interest?: string;
    message?: string;
}

export interface SendEmailOptions {
    to: string | string[];
    subject: string;
    html: string;
    text?: string;
    replyTo?: string;
    apiKey?: string;
    from?: string;
}

export interface SendEmailResult {
    success: boolean;
    id?: string;
    error?: string;
    statusCode?: number;
}

export function getEnv(key: string, fallback: string = ''): string {
    if (typeof import.meta !== 'undefined' && (import.meta as any).env?.[key]) {
        return (import.meta as any).env[key];
    }
    const proc = (globalThis as any).process;
    if (proc?.env?.[key]) {
        return proc.env[key];
    }
    return fallback;
}

export async function sendResendEmail(options: SendEmailOptions): Promise<SendEmailResult> {
    const apiKey = options.apiKey || getEnv('RESEND_API_KEY');

    if (!apiKey) {
        return {
            success: false,
            error: 'Chave RESEND_API_KEY não configurada no ambiente.'
        };
    }

    const defaultFrom = options.from || getEnv('RESEND_FROM_EMAIL', 'Indiana Ranch <notificacoes@sanbernarda.com>');

    const payload: Record<string, any> = {
        from: defaultFrom,
        to: Array.isArray(options.to) ? options.to : [options.to],
        subject: options.subject,
        html: options.html,
    };

    if (options.text) payload.text = options.text;
    if (options.replyTo) payload.reply_to = options.replyTo;

    try {
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            return {
                success: false,
                statusCode: response.status,
                error: (data as any).message || `Erro HTTP ${response.status} ao disparar via Resend.`
            };
        }

        return {
            success: true,
            id: (data as any).id,
            statusCode: response.status
        };
    } catch (err: any) {
        return {
            success: false,
            error: `Falha de conexão com a API do Resend: ${err?.message || err}`
        };
    }
}

/**
 * Gera o template HTML solene padrão Indiana Ranch para notificação interna de leads
 */
export function buildContactNotificationHtml(data: ContactFormData, meta: { ip?: string; userAgent?: string; timestamp?: string }): string {
    const profileLabels: Record<string, string> = {
        lojista: 'Lojista / Revenda Agropecuária (Atacado)',
        haras: 'Haras / Centro de Treinamento',
        competidor: 'Competidor / Atleta de Prova',
        veterinario: 'Veterinário / Ferrador',
        consumidor: 'Consumidor Final / Proprietário'
    };

    const cleanProfile = profileLabels[data.profile] || data.profile;
    const cleanDate = meta.timestamp || new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

    return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nova Solicitação de Cotação - Indiana Ranch</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F4EFE6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1E293B;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #F4EFE6; padding: 30px 10px;">
        <tr>
            <td align="center">
                <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; width: 100%; background-color: #FFFFFF; border: 2px solid #000726; border-radius: 4px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,7,38,0.08);">
                    
                    <!-- CABEÇALHO WESTERN SOLENE -->
                    <tr>
                        <td style="background-color: #000726; padding: 24px 30px; border-bottom: 4px solid #B91C1C; text-align: center;">
                            <div style="color: #FCD34D; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; font-weight: bold; margin-bottom: 6px;">
                                ★ INDIANA RANCH ATACADO & MATRIZ ★
                            </div>
                            <h1 style="color: #FFFFFF; margin: 0; font-size: 22px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase;">
                                NOVA SOLICITAÇÃO DE COTAÇÃO
                            </h1>
                            <div style="display: inline-block; background-color: #B91C1C; color: #FFFFFF; font-size: 11px; font-weight: bold; padding: 3px 10px; border-radius: 2px; margin-top: 10px; text-transform: uppercase; letter-spacing: 1.5px;">
                                Cartaz Procura-se / Site Oficial
                            </div>
                        </td>
                    </tr>

                    <!-- CORPO DA MENSAGEM -->
                    <tr>
                        <td style="padding: 30px;">
                            
                            <p style="margin-top: 0; font-size: 15px; line-height: 1.6; color: #334155;">
                                Um novo cliente preencheu o formulário oficial de atendimento e cotação no site da Indiana Ranch. Seguem os dados completos para retorno imediato da equipe comercial:
                            </p>

                            <!-- TABELA DE DADOS DO CLIENTE -->
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 20px 0; border: 1px solid #E2E8F0; border-radius: 4px; border-collapse: separate; overflow: hidden;">
                                <tr style="background-color: #F8FAFC;">
                                    <td width="35%" style="padding: 12px 16px; font-size: 12px; font-weight: bold; color: #64748B; text-transform: uppercase; border-bottom: 1px solid #E2E8F0;">
                                        Nome / Razão Social
                                    </td>
                                    <td style="padding: 12px 16px; font-size: 14px; font-weight: 700; color: #000726; border-bottom: 1px solid #E2E8F0;">
                                        ${escapeHtml(data.name)}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px 16px; font-size: 12px; font-weight: bold; color: #64748B; text-transform: uppercase; border-bottom: 1px solid #E2E8F0;">
                                        WhatsApp
                                    </td>
                                    <td style="padding: 12px 16px; font-size: 14px; font-weight: 700; color: #000726; border-bottom: 1px solid #E2E8F0;">
                                        <a href="https://wa.me/55${data.whatsapp.replace(/\D/g, '')}" style="color: #059669; text-decoration: none; font-weight: bold;">
                                            ${escapeHtml(data.whatsapp)} ↗ (Chamar no WhatsApp)
                                        </a>
                                    </td>
                                </tr>
                                <tr style="background-color: #F8FAFC;">
                                    <td style="padding: 12px 16px; font-size: 12px; font-weight: bold; color: #64748B; text-transform: uppercase; border-bottom: 1px solid #E2E8F0;">
                                        E-mail
                                    </td>
                                    <td style="padding: 12px 16px; font-size: 14px; color: #000726; border-bottom: 1px solid #E2E8F0;">
                                        <a href="mailto:${escapeHtml(data.email)}" style="color: #0D5BA6; text-decoration: none; font-weight: 600;">
                                            ${escapeHtml(data.email)}
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px 16px; font-size: 12px; font-weight: bold; color: #64748B; text-transform: uppercase; border-bottom: 1px solid #E2E8F0;">
                                        Perfil do Cliente
                                    </td>
                                    <td style="padding: 12px 16px; font-size: 14px; font-weight: 700; color: #B91C1C; border-bottom: 1px solid #E2E8F0;">
                                        ${escapeHtml(cleanProfile)}
                                    </td>
                                </tr>
                                ${data.interest ? `
                                <tr style="background-color: #F8FAFC;">
                                    <td style="padding: 12px 16px; font-size: 12px; font-weight: bold; color: #64748B; text-transform: uppercase; border-bottom: 1px solid #E2E8F0;">
                                        Marcas / Produtos
                                    </td>
                                    <td style="padding: 12px 16px; font-size: 14px; color: #000726; border-bottom: 1px solid #E2E8F0;">
                                        ${escapeHtml(data.interest)}
                                    </td>
                                </tr>` : ''}
                                <tr>
                                    <td style="padding: 12px 16px; font-size: 12px; font-weight: bold; color: #64748B; text-transform: uppercase; vertical-align: top;">
                                        Mensagem / Demanda
                                    </td>
                                    <td style="padding: 12px 16px; font-size: 14px; color: #334155; line-height: 1.6; white-space: pre-line;">
                                        ${escapeHtml(data.message || 'Nenhuma mensagem adicional informada.')}
                                    </td>
                                </tr>
                            </table>

                            <!-- BOTÃO DE AÇÃO RÁPIDA -->
                            <div style="text-align: center; margin: 30px 0 15px 0;">
                                <a href="https://wa.me/55${data.whatsapp.replace(/\D/g, '')}" style="display: inline-block; background-color: #059669; color: #FFFFFF; font-size: 14px; font-weight: bold; text-decoration: none; padding: 12px 24px; border-radius: 4px; box-shadow: 0 2px 6px rgba(5,150,105,0.3);">
                                    Iniciar Conversa no WhatsApp
                                </a>
                            </div>

                        </td>
                    </tr>

                    <!-- RODAPÉ TÉCNICO -->
                    <tr>
                        <td style="background-color: #F8FAFC; padding: 16px 30px; border-top: 1px solid #E2E8F0; font-size: 11px; color: #94A3B8; text-align: center; line-height: 1.5;">
                            Data/Hora: ${cleanDate} &bull; Origem: Site Indiana Ranch (Cloudflare Edge)<br />
                            Notificação automática enviada para: <strong>atendimento@indianaranch.com.br</strong>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `;
}

function escapeHtml(text: string): string {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
