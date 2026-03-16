export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, phone, message } = req.body || {}

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' })
  }

  const webhookUrl = process.env.WEBHOOKURL

  if (!webhookUrl) {
    return res.status(500).json({ error: 'Server not configured' })
  }

  const body = { name, email, phone, message }

  const webhookSecret = process.env.WEBHOOKSECRET
  if (webhookSecret) {
    body._webhook_secret = webhookSecret
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    const data = await response.json().catch(() => ({}))
    return res.status(response.status).json(data)
  } catch (err) {
    return res.status(502).json({ error: 'Service unavailable' })
  }
}
