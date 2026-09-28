/**
 * functions/api/contato.ts — Cloudflare Pages Function nativa
 * Recebe o lead do formulário de cotação/contato, envia e-mail via Resend REST API
 * e retorna status JSON.
 */

interface Env {
    RESEND_API_KEY?: string;
    RESEND_TO_EMAIL?: string;
    RESEND_FROM_EMAIL?: string;
}

declare type PagesFunction<Env = unknown> = (context: {
    request: Request;
    env: Env;
}) => Response | Promise<Response>;

function escapeHtml(value: unknown): string {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
    try {
        let body: Record<string, any> = {};
        const contentType = request.headers.get('content-type') || '';

        if (contentType.includes('application/json')) {
            body = await request.json().catch(() => ({}));
        } else if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
            const formData = await request.formData().catch(() => new FormData());
            for (const [key, value] of formData.entries()) {
                body[key] = typeof value === 'string' ? value : value.name;
            }
        } else {
            return new Response(JSON.stringify({
                success: false,
                error: 'Tipo de conteúdo inválido. Envie JSON ou FormData.'
            }), {
                status: 415,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Honeypot anti-spam
        if (body.website_url || body._gotcha) {
            return new Response(JSON.stringify({
                success: true,
                message: 'Mensagem processada.'
            }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const name = (body.name || '').trim();
        const whatsapp = (body.whatsapp || '').trim();
        const email = (body.email || '').trim();
        const profile = (body.profile || 'lojista').trim();
        const interest = (body.interest || '').trim();
        const message = (body.message || '').trim();

        if (!name || name.length < 2) {
            return new Response(JSON.stringify({
                success: false,
                error: 'Por favor, informe seu nome completo ou razão social.'
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        if (!whatsapp || whatsapp.length < 8) {
            return new Response(JSON.stringify({
                success: false,
                error: 'Por favor, informe um número de WhatsApp válido com DDD.'
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            return new Response(JSON.stringify({
                success: false,
                error: 'Por favor, informe um endereço de e-mail válido.'
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const profileNames: Record<string, string> = {
            lojista: 'Atacado / Lojista',
            haras: 'Haras / CT',
            competidor: 'Atleta de Prova',
            veterinario: 'Veterinário / Ferrador',
            consumidor: 'Consumidor Final'
        };
        const profileTag = profileNames[profile] || profile;

        const apiKey = env.RESEND_API_KEY || '';
        const toEmail = env.RESEND_TO_EMAIL || 'atendimento@indianaranch.com.br';
        const fromEmail = env.RESEND_FROM_EMAIL || 'Indiana Ranch <notificacoes@sanbernarda.com>';

        const ip = request.headers.get('cf-connecting-ip') || 'Borda Cloudflare';
        const timestamp = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

        const row = (label: string, value: string) =>
            `<tr><td style="padding:8px 0;border-bottom:1px solid #E2DBD0;"><span style="font-size:11px;text-transform:uppercase;color:#8B6F4E;font-weight:700;">${label}</span><div style="font-size:14px;color:#000726;font-weight:600;margin-top:2px;">${escapeHtml(value) || '—'}</div></td></tr>`;

        const html = `<!DOCTYPE html>
<html lang="pt-BR">
<body style="margin:0;background-color:#FAF6F0;font-family:sans-serif;color:#000726;padding:24px 12px;">
<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border:2px solid #000726;border-radius:4px;overflow:hidden;">
<tr><td style="background:#000726;padding:20px 24px;border-bottom:3px solid #B91C1C;">
<h1 style="margin:0;font-size:18px;color:#ffffff;letter-spacing:1px;text-transform:uppercase;">★ Nova Cotação B2B — Indiana Ranch</h1>
<p style="margin:4px 0 0 0;font-size:12px;color:#FEF3C7;">Perfil: ${escapeHtml(profileTag)} • ${timestamp}</p>
</td></tr>
<tr><td style="padding:20px 24px;">
<table width="100%" cellpadding="0" cellspacing="0">
${row('Nome / Razão Social', name)}
${row('WhatsApp / Telefone', whatsapp)}
${row('E-mail Corporativo', email)}
${row('Categoria de Interesse', interest)}
${row('Mensagem / Demanda', message)}
${row('IP de Origem', ip)}
</table>
</td></tr>
<tr><td style="padding:0 24px 24px 24px;" align="center">
<a href="https://wa.me/55${whatsapp.replace(/\D/g, '')}" style="display:inline-block;background-color:#B91C1C;color:#ffffff;font-weight:700;font-size:13px;text-decoration:none;padding:12px 24px;border-radius:3px;">Atender no WhatsApp</a>
</td></tr>
</table></td></tr></table></body></html>`;

        const resendResponse = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from: fromEmail,
                to: [toEmail],
                subject: `★ Nova Cotação [${profileTag}]: ${name} - Indiana Ranch`,
                html,
                reply_to: email
            })
        });

        if (!resendResponse.ok) {
            const errData = await resendResponse.json().catch(() => ({}));
            console.error('[API Contato] Erro Resend:', errData);
            return new Response(JSON.stringify({
                success: false,
                error: 'Não foi possível enviar a mensagem no momento via e-mail. Por favor, contate nosso WhatsApp.'
            }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new Response(JSON.stringify({
            success: true,
            message: 'Solicitação de cotação enviada com sucesso! Nossa equipe entrará em contato em breve.'
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (err: any) {
        console.error('[API Contato] Exceção:', err);
        return new Response(JSON.stringify({
            success: false,
            error: 'Ocorreu um erro inesperado ao processar sua solicitação.'
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
