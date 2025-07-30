import type { Media } from "../types/media";

const baseURL = "http://localhost:3000/api";

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  count?: number;
}

export async function GetMedia(): Promise<ApiResponse<Media[]>> {
  try {
    const response = await fetch(`${baseURL}/media`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching media:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch media",
      data: []
    };
  }
}

export async function CreateMedia(mediaData: Omit<Media, 'id' | 'createdAt'>): Promise<ApiResponse<Media>> {
  try {
    const response = await fetch(`${baseURL}/media`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mediaData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return {
      success: true,
      data: result
    };
  } catch (error) {
    console.error("Error creating media:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create media"
    };
  }
}
