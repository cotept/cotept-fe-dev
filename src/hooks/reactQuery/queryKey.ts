export const queryKeys = {
  baekjoonController: {
    idCheck: (baekjoonId: string) => ['userCheck', baekjoonId] as const,
    solved: (baekjoonId: string) => ['solved', baekjoonId] as const,
    newSolved: (baekjoonId: string) => ['solved', 'new', baekjoonId],
    updateData: (baekjoonId: string) =>
      ['update', 'crawling', baekjoonId] as const,
  },
};
