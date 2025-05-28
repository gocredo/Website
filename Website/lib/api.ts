import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000',//process.env.NEXT_PUBLIC_BASE_URL || 
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
  },
});

interface AboutPageResponse {
  data: {
    getAboutPage: {
      id: string;
      businessId: string;
      description: string;
      mission: string;
      vision: string;
      createdAt: string;
      updatedAt: string;
    };
  };
}

export async function getAboutPage(businessId: string): Promise<AboutPageResponse['data']['getAboutPage']> {
  const query = `
    query GetAboutPage {
      getAboutPage(businessId: "${businessId}") {
        id
        businessId
        description
        mission
        vision
        createdAt
        updatedAt
      }
    }
  `;

  try {
    const response = await api.post('/graphql', { query });
    return response.data.data.getAboutPage;
  } catch (error) {
    console.error('Error fetching About page data:', error);
    throw new Error('Failed to fetch About page data');
  }
}