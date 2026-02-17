
import nodemailer from 'nodemailer';

// Configuration du transporteur SMTP
// Ces variables doivent être définies dans .env.local
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com', // Par défaut Gmail
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true', // true pour 465, false pour les autres ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface OrderItem {
  nom_produit: string;
  quantite: number;
  prix_unitaire: number;
  description?: string;
  marque?: string;
  caracteristiques?: any;
}

interface OrderDetails {
  numero_commande: string;
  client: {
    prenom: string;
    nom: string;
    email: string;
    adresse: string;
  };
  items: OrderItem[];
  total: number;
  date: string;
}

export async function sendOrderConfirmationEmail(order: OrderDetails) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn("⚠️ SMTP credentials not found. Email simulation:");
    console.log(`To: ${order.client.email}`);
    console.log(`Subject: FACTURE ${order.numero_commande} - ClimaControl`);
    console.log(`Total: ${order.total}€`);
    return;
  }

  const tva = order.total * 0.2 / 1.2; // Estimation TVA 20%
  const htc = order.total - tva;

  const itemsHtml = order.items.map(item => `
    <tr>
      <td style="padding: 12px 10px; border-bottom: 1px solid #edf2f7; text-align: left;">
        <div style="font-weight: 600; color: #2d3748;">${item.nom_produit}</div>
        <div style="font-size: 12px; color: #718096; margin-top: 2px;">${item.marque || ''}</div>
      </td>
      <td style="padding: 12px 10px; border-bottom: 1px solid #edf2f7; text-align: center; color: #4a5568;">${item.quantite}</td>
      <td style="padding: 12px 10px; border-bottom: 1px solid #edf2f7; text-align: right; color: #4a5568;">${item.prix_unitaire.toFixed(2)} €</td>
      <td style="padding: 12px 10px; border-bottom: 1px solid #edf2f7; text-align: right; font-weight: 600; color: #2d3748;">${(item.prix_unitaire * item.quantite).toFixed(2)} €</td>
    </tr>
  `).join('');

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #1a202c; margin: 0; padding: 0; }
        .container { max-width: 700px; margin: 20px auto; padding: 40px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
        .header { display: flex; justify-content: space-between; align-items: start; margin-bottom: 40px; padding-bottom: 20px; border-bottom: 2px solid #3182ce; }
        .logo { color: #3182ce; font-size: 28px; font-weight: 800; margin: 0; }
        .invoice-title { font-size: 24px; font-weight: 700; color: #2d3748; text-transform: uppercase; letter-spacing: 1px; margin: 0; }
        .info-grid { display: grid; grid-template-cols: 1fr 1fr; gap: 40px; margin-bottom: 40px; }
        .info-section h3 { font-size: 14px; text-transform: uppercase; color: #718096; margin-bottom: 8px; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; }
        .info-section p { margin: 4px 0; font-size: 15px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
        th { background-color: #f7fafc; padding: 12px 10px; text-align: left; font-size: 13px; text-transform: uppercase; color: #718096; border-bottom: 2px solid #e2e8f0; }
        .totals { margin-left: auto; width: 250px; }
        .total-row { display: flex; justify-content: space-between; padding: 8px 0; }
        .grand-total { border-top: 2px solid #3182ce; margin-top: 10px; padding-top: 10px; font-size: 18px; font-weight: 800; color: #3182ce; }
        .footer { text-align: center; margin-top: 50px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #a0aec0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div>
            <h1 class="logo">CLIMACONTROL</h1>
            <p style="font-size: 12px; color: #718096; margin: 5px 0;">Spécialiste HVAC & Énergies</p>
          </div>
          <div style="text-align: right;">
            <h2 class="invoice-title">Facture</h2>
            <p style="font-weight: 600; color: #4a5568; margin: 5px 0;">N° ${order.numero_commande}</p>
            <p style="font-size: 14px; color: #718096;">Date: ${order.date}</p>
          </div>
        </div>
        
        <div style="display: table; width: 100%; margin-bottom: 40px;">
          <div style="display: table-cell; width: 50%; padding-right: 20px; vertical-align: top;">
            <h3 style="font-size: 14px; text-transform: uppercase; color: #718096; margin-bottom: 8px; border-bottom: 1px solid #e2e8f0;">Émetteur</h3>
            <p style="margin: 4px 0; font-size: 15px;"><strong>ClimaControl SARL</strong></p>
            <p style="margin: 4px 0; font-size: 15px;">123 Rue de l'Énergie</p>
            <p style="margin: 4px 0; font-size: 15px;">34000 Montpellier, France</p>
            <p style="margin: 4px 0; font-size: 15px;">SIRET: 512 345 678 00012</p>
            <p style="margin: 4px 0; font-size: 15px;">TVA: FR 12 512345678</p>
          </div>
          <div style="display: table-cell; width: 50%; padding-left: 20px; vertical-align: top;">
            <h3 style="font-size: 14px; text-transform: uppercase; color: #718096; margin-bottom: 8px; border-bottom: 1px solid #e2e8f0;">Client</h3>
            <p style="margin: 4px 0; font-size: 15px;"><strong>${order.client.prenom} ${order.client.nom}</strong></p>
            <p style="margin: 4px 0; font-size: 15px;">${order.client.adresse}</p>
            <p style="margin: 4px 0; font-size: 15px;">Email: ${order.client.email}</p>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Désignation</th>
              <th style="text-align: center;">Qté</th>
              <th style="text-align: right;">P.U. HT</th>
              <th style="text-align: right;">Total HT</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <div style="float: right; width: 250px;">
          <div style="display: table; width: 100%; padding: 5px 0;">
            <div style="display: table-cell; text-align: left; color: #718096;">Total HT</div>
            <div style="display: table-cell; text-align: right; color: #2d3748;">${htc.toFixed(2)} €</div>
          </div>
          <div style="display: table; width: 100%; padding: 5px 0;">
            <div style="display: table-cell; text-align: left; color: #718096;">TVA (20%)</div>
            <div style="display: table-cell; text-align: right; color: #2d3748;">${tva.toFixed(2)} €</div>
          </div>
          <div style="display: table; width: 100%; padding: 15px 0 5px 0; border-top: 2px solid #3182ce; margin-top: 10px; font-weight: 800; font-size: 20px; color: #3182ce;">
            <div style="display: table-cell; text-align: left;">Total TTC</div>
            <div style="display: table-cell; text-align: right;">${order.total.toFixed(2)} €</div>
          </div>
        </div>
        <div style="clear: both;"></div>

        <div class="footer">
          <p>Merci pour votre confiance. En cas de question, contactez-nous à support@climacontrol.fr</p>
          <p><strong>ClimaControl SARL</strong> - Capital de 10 000€ - RCS Montpellier</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"ClimaControl" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: order.client.email,
      subject: `FACTURE ${order.numero_commande} - ClimaControl`,
      html: htmlContent,
    });
    console.log("Email sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

export async function sendPasswordResetEmail(email: string, prenom: string, resetLink: string) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn("⚠️ SMTP credentials not found. Reset simulation:");
    console.log(`To: ${email}`);
    console.log(`Reset Link: ${resetLink}`);
    return;
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #1a202c; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 20px auto; padding: 40px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
        .logo { color: #3182ce; font-size: 24px; font-weight: 800; text-align: center; margin-bottom: 30px; }
        .button-container { text-align: center; margin: 30px 0; }
        .button { display: inline-block; padding: 14px 28px; background-color: #3182ce; color: #ffffff !important; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 16px; }
        .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #a0aec0; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1 class="logo">CLIMACONTROL</h1>
        <p>Bonjour ${prenom},</p>
        <p>Vous avez demandé la réinitialisation de votre mot de passe pour votre compte ClimaControl.</p>
        <p>Cliquez sur le bouton ci-dessous pour choisir un nouveau mot de passe. <strong>Ce lien est valable pendant 1 heure.</strong></p>
        
        <div class="button-container">
          <a href="${resetLink}" class="button">Réinitialiser mon mot de passe</a>
        </div>
        
        <p>Si vous n'avez pas demandé ce changement, vous pouvez ignorer cet email en toute sécurité. Votre mot de passe actuel restera inchangé.</p>
        
        <div class="footer">
          <p>ClimaControl SARL - Montpellier, France</p>
          <p>&copy; ${new Date().getFullYear()} ClimaControl. Tous droits réservés.</p>
        </div>
      </div>
    </body>
    </html>
    `;

  try {
    await transporter.sendMail({
      from: `"ClimaControl" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: email,
      subject: "Réinitialisation de votre mot de passe - ClimaControl",
      html: htmlContent,
    });
  } catch (error) {
    console.error("Error sending reset email:", error);
  }
}
