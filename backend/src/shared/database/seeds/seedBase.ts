import { Pool, PoolClient } from 'pg';

export interface BaseData {
  language: { id: string };
  settings: { id: string };
}

function generateUUID(index: number): string {
  // Formato: 00000000-0000-0000-0000-000000000001, 2, 3...
  return `00000000-0000-0000-0000-${String(index).padStart(12, '0')}`;
}

export async function seedBase(pool: Pool): Promise<BaseData> {
  console.log('01 🌍 Base: idiomas + settings...');

  const client: PoolClient = await pool.connect();

  try {
    await client.query('BEGIN');

    // Criar primeiro idioma
    const lang1Id = generateUUID(1);
    await client.query(
      `INSERT INTO languages (id, flag, language_code, language_name) 
       VALUES ($1, $2, $3, $4)`,
      [
        lang1Id,
        JSON.stringify({
          id: 1,
          original: 'https://flagicons.lipis.dev/flags/4x3/us.svg',
          thumbnail: 'https://flagicons.lipis.dev/flags/4x3/us.svg',
        }),
        'en',
        'English',
      ],
    );

    // Criar segundo idioma
    const lang2Id = generateUUID(2);
    await client.query(
      `INSERT INTO languages (id, flag, language_code, language_name) 
       VALUES ($1, $2, $3, $4)`,
      [
        lang2Id,
        JSON.stringify({
          id: 2,
          original: 'https://flagicons.lipis.dev/flags/4x3/br.svg',
          thumbnail: 'https://flagicons.lipis.dev/flags/4x3/br.svg',
        }),
        'pt',
        'Português',
      ],
    );

    // Criar settings
    const settingsId = generateUUID(3);
    const settingsData = {
      siteTitle: 'Loja Marvel',
      siteSubtitle: 'Seu marketplace multi-vendedor completo',
      currency: 'BRL',
      currencyToWalletRatio: 1,
      minimumOrderAmount: 0,
      freeShippingAmount: 100,
      useAi: false,
      useGoogleMap: false,
      guestCheckout: true,
      defaultPaymentGateway: 'stripe',
      taxClass: null,
      shippingClass: null,
      logo: {
        id: null,
        original: 'https://via.placeholder.com/200x60?text=Loja+Marvel',
        thumbnail: 'https://via.placeholder.com/80x24?text=Marvel',
      },
      seo: {
        metaTitle: 'Loja Marvel',
        metaDescription: 'Plataforma de e-commerce multi-vendedor',
        ogTitle: 'Loja Marvel',
        ogDescription: 'Plataforma de e-commerce multi-vendedor',
        twitterHandle: '@lojamarvel',
        twitterCardType: 'summary_large_image',
      },
      contactDetails: {
        contact: '+55 62 99999-9999',
        location: {
          lat: -13.4391,
          lng: -49.1481,
          formattedAddress: 'Porangatu, GO, Brasil',
        },
        socials: [
          { icon: 'FacebookIcon', url: 'https://facebook.com' },
          { icon: 'TwitterIcon', url: 'https://twitter.com' },
          { icon: 'InstagramIcon', url: 'https://instagram.com' },
        ],
        website: 'https://lojamarvel.com.br',
        emailAddress: 'contato@lojamarvel.com.br',
      },
      deliveryTime: [
        { title: 'Entrega Expressa', description: '1-2 dias úteis' },
        { title: 'Entrega Padrão', description: '3-5 dias úteis' },
      ],
      paymentGateway: [
        { name: 'Stripe', title: 'Cartão de Crédito / Débito' },
        { name: 'Pagamento na Entrega', title: 'Pagar na Entrega' },
      ],
    };

    await client.query(
      `INSERT INTO settings (id, language, options) 
       VALUES ($1, $2, $3)`,
      [settingsId, 'pt', JSON.stringify(settingsData)],
    );

    await client.query('COMMIT');

    console.log(`   ✔ English language criada (${lang1Id})`);
    console.log(`   ✔ Português language criada (${lang2Id})`);
    console.log(`   ✔ Settings (pt) criada (${settingsId})`);

    return {
      language: { id: lang1Id },
      settings: { id: settingsId },
    };
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Erro no seed base:', error);
    throw error;
  } finally {
    client.release();
  }
}
