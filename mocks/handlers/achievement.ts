import { http, HttpResponse } from 'msw';
import { BASE_URL } from '@/apis';
import success_data from '@mocks/data/achievement/success.json';
import empty_data from '@mocks/data/achievement/empty.json';

export const achievementHandlers = [
  http.get(`${BASE_URL}achievement`, ({ request }) => {
    const url = new URL(request.url);
    const userId = url.searchParams.get('id');

    if (
      typeof userId !== 'string' ||
      userId === 'undefined' ||
      !userId.trim()
    ) {
      return new HttpResponse(
        `AxiosError: Request failed with status code 404`,
        {
          status: 404,
          statusText: `AxiosError: Request failed with status code 404`,
        },
      );
    }

    if (userId === 'notExistId') {
      return new HttpResponse(
        `AxiosError: Request failed with status code 502`,
        {
          status: 502,
          statusText: `AxiosError: Request failed with status code 502`,
        },
      );
    }

    if (userId === 'empty') {
      return HttpResponse.json(empty_data, { status: 200 });
    }

    return HttpResponse.json(success_data, { status: 200 });
  }),
];
