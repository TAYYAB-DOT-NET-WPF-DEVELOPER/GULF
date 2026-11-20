export const http = {
  async get() {
    return { data: null };
  },
  async post() {
    throw new Error("Online submissions are temporarily unavailable.");
  },
};

export const getImageUrl = (path) => path || "";
