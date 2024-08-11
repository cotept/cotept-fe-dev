import { http, HttpResponse } from 'msw';
import { BASE_URL } from '@/apis';

export const userHandlers = [
  http.get(`${BASE_URL}login`, ({ request }) => {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId') || '';
    if (
      typeof userId !== 'string' ||
      userId === 'undefined' ||
      userId === 'notExistId' ||
      !userId.trim()
    ) {
      return HttpResponse.json(404, { status: 200 });
    }
    return HttpResponse.json(200, { status: 200 });
  }),
];
