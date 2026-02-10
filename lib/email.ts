
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
        console.log(`Subject: Confirmation de votre commande ${order.numero_commande}`);
        console.log(`Total: ${order.total}€`);
        return;
    }

    // Génération du contenu HTML de la facture
    const itemsHtml = order.items.map(item => `
    <tr style="border-bottom: 1px solid #eee;">
      <td style="padding: 10px; border-bottom: 1px solid #eee;">
        <strong>${item.nom_produit}</strong><br/>
        <span style="font-size: 12px; color: #666;">${item.marque || ''}</span>
        ${item.description ? `<p style="font-size: 12px; color: #888; margin: 5px 0;">${item.description.substring(0, 100)}...</p>` : ''}
        ${item.caracteristiques ? `<p style="font-size: 11px; color: #555;"><i>${JSON.stringify(item.caracteristiques).substring(0, 50)}...</i></p>` : ''}
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantite}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">${item.prix_unitaire.toFixed(2)} €</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">${(item.prix_unitaire * item.quantite).toFixed(2)} €</td>
    </tr>
  `).join('');

    const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #0070f3;">ClimaControl</h1>
        <p>Confirmation de commande</p>
      </div>
      
      <p>Bonjour ${order.client.prenom} ${order.client.nom},</p>
      <p>Merci pour votre commande ! Voici le récapitulatif ainsi que votre facture.</p>
      
      <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; margin-bottom: 20px;">
        <p><strong>Numéro de commande :</strong> ${order.numero_commande}</p>
        <p><strong>Date :</strong> ${order.date}</p>
        <p><strong>Adresse de livraison :</strong> ${order.client.adresse}</p>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <thead>
          <tr style="background-color: #f5f5f5;">
            <th style="padding: 10px; text-align: left;">Produit</th>
            <th style="padding: 10px; text-align: center;">Qté</th>
            <th style="padding: 10px; text-align: right;">Prix Unit.</th>
            <th style="padding: 10px; text-align: right;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" style="padding: 10px; text-align: right;"><strong>Total TTC</strong></td>
            <td style="padding: 10px; text-align: right;"><strong>${order.total.toFixed(2)} €</strong></td>
          </tr>
        </tfoot>
      </table>

      <div style="text-align: center; margin-top: 30px; font-size: 12px; color: #888;">
        <p>ClimaControl - Spécialiste Climatisation & Chauffage</p>
        <p>Montpellier - France</p>
      </div>
    </div>
  `;

    try {
        const info = await transporter.sendMail({
            from: `"ClimaControl" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
            to: order.client.email,
            subject: `Confirmation de commande ${order.numero_commande} - ClimaControl`,
            html: htmlContent,
        });
        console.log("Email sent: %s", info.messageId);
    } catch (error) {
        console.error("Error sending email:", error);
    }
}
