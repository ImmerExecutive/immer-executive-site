export async function onRequestPost(context) {
    const { request, env } = context;

    try {
        const { name, email, message } = await request.json();

        if (!name || !email || !message) {
            return json({ error: 'Champs manquants.' }, 400);
        }

        const res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${env.RESEND_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: 'Immer Executive <contact@immer-executive.com>',
                to: 'contact@immer-executive.com',
                reply_to: email,
                subject: `Nouvelle demande — ${name}`,
                html: `
                    <p><strong>Nom :</strong> ${name}</p>
                    <p><strong>Email :</strong> ${email}</p>
                    <p><strong>Message :</strong></p>
                    <p>${message.replace(/\n/g, '<br>')}</p>
                `,
            }),
        });

        if (!res.ok) {
            const err = await res.json();
            return json({ error: err.message || 'Erreur Resend.' }, 500);
        }

        return json({ success: true }, 200);

    } catch (e) {
        return json({ error: e.message }, 500);
    }
}

function json(data, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: { 'Content-Type': 'application/json' },
    });
}
