export const STORY_ENDPOINTS = {
  list: (shopId: number) => `/_c/shops/${shopId}/stories`,
  markViewed: (shopId: number, storyId: number) =>
    `/_c/shops/${shopId}/stories/${storyId}/view`,
} as const;
