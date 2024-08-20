import axios, { AxiosResponse } from 'axios';
import { SearchReqest } from '../types/types';

// Получаем переменные окружения
const GITHUB_GRAPHQL_URL = process.env.REACT_APP_GITHUB_GRAPHQL_URL;
const token = process.env.REACT_APP_TOKEN;

export const searchRepositories = async (query: string, page: number = 1, perPage: number = 10) => {
  let allResults: any[] = []; // Массив для хранения всех результатов
  let hasNextPage = true; // Флаг для проверки наличия следующей страницы
  let endCursor: string | null = null; // Курсор для пагинации
  let currentPage = 1; // Текущая страница
  let totalCount = 0; // Общее количество репозиториев

  // Запрос для получения общего количества элементов
  const totalCountResponse = await axios.post(
    GITHUB_GRAPHQL_URL as string,
    {
      query: `
        query ($query: String!) {
          search(query: $query, type: REPOSITORY, first: 1) {
            repositoryCount
          }
        }
      `,
      variables: { query },
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  // Сохраняем общее количество репозиториев
  totalCount = totalCountResponse.data.data.search.repositoryCount || 0;

  while (hasNextPage) {
    // Запрос для получения результатов на текущей странице
    const response: AxiosResponse = await axios.post(
      GITHUB_GRAPHQL_URL as string,
      {
        query: `
          query ($query: String!, $first: Int!, $after: String) {
            search(query: $query, type: REPOSITORY, first: $first, after: $after) {
              edges {
                node {
                  ... on Repository {
                    name
                    stargazerCount
                    forkCount
                    updatedAt
                    licenseInfo {
                      name
                    }
                    primaryLanguage {
                      name
                    }
                    languages(first: 5) {
                      nodes {
                        name
                      }
                    }
                    repositoryTopics(first: 10) {
                      nodes {
                        topic {
                          name
                        }
                      }
                    }
                  }
                }
              }
              pageInfo {
                hasNextPage
                endCursor
              }
            }
          }
        `,
        variables: {
          query,
          first: perPage, // Количество результатов на страницу
          after: endCursor, // Курсор для пагинации
        },
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    const data = response.data.data.search as SearchReqest;

    // Объединяем текущие результаты с уже существующими
    allResults = allResults.concat(
      data.edges.map((edge: any) => ({
        ...edge.node,
        topics: edge.node.repositoryTopics.nodes.map((node: any) => node.topic.name),
      })),
    );

    // Обновляем информацию о пагинации
    hasNextPage = data.pageInfo.hasNextPage;
    endCursor = data.pageInfo.endCursor;

    // Если достигли необходимой страницы, прерываем цикл
    if (currentPage >= page) {
      break;
    }

    currentPage += 1; // Переходим к следующей странице
  }

  // Вычисляем общее количество страниц
  const totalPages = Math.ceil(totalCount / perPage);
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;

  return {
    results: allResults.slice(startIndex, endIndex), // Возвращаем результаты для текущей страницы
    totalCount, // Общее количество репозиториев
    totalPages, // Общее количество страниц
    currentPage: page, // Текущая страница
    hasNextPage, // Есть ли следующая страница
    perPage, // Количество результатов на страницу
  };
};
