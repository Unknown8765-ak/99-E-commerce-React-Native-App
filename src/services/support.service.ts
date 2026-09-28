import { API_BASE_URL } from "@/constants/api";
import { ContactMessage ,ContactResponse } from "@/types/support.type";


export const sendContactMessage = async (
  data: ContactMessage
): Promise<ContactResponse> => {
  const response = await fetch(`${API_BASE_URL}/support/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to send message");
  }

  return result;
};