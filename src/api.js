const API_BASE_URL = "https://api.videosdk.live";
const VIDEOSDK_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJlYTI4NTc2ZC1mN2Y3LTQ5ZjgtOWZkZi1hMjViYjhkMmNhOGUiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTc0NTQ2MDA0NSwiZXhwIjoxNzQ4MDUyMDQ1fQ.niF2MgL9gbectGWVSYWEpeb2VLl4ymYmArnueSVAbcE';
const API_AUTH_URL = process.env.REACT_APP_AUTH_URL;

export const getToken = async () => {
  if (VIDEOSDK_TOKEN && API_AUTH_URL) {
    console.error(
      "Error: Provide only ONE PARAMETER - either Token or Auth API"
    );
  } else if (VIDEOSDK_TOKEN) {
    return VIDEOSDK_TOKEN;
  } else if (API_AUTH_URL) {
    const res = await fetch(`${API_AUTH_URL}/get-token`, {
      method: "GET",
    });
    const { token } = await res.json();
    return token;
  } else {
    console.error("Error: ", Error("Please add a token or Auth Server URL"));
  }
};

export const createMeeting = async ({ token }) => {
  const url = `${API_BASE_URL}/v2/rooms`;
  const options = {
    method: "POST",
    headers: { Authorization: token, "Content-Type": "application/json" },
  };

  const response = await fetch(url, options)
  const data = await response.json()

  if (data.roomId) {
    return { meetingId: data.roomId, err: null }
  } else {
    return { meetingId: null, err: data.error }
  }

};

export const validateMeeting = async ({ roomId, token }) => {
  const url = `${API_BASE_URL}/v2/rooms/validate/${roomId}`;

  const options = {
    method: "GET",
    headers: { Authorization: token, "Content-Type": "application/json" },
  };

  const response = await fetch(url, options)

  if (response.status === 400) {
    const data = await response.text()
    return { meetingId: null, err: data }
  }

  const data = await response.json()

  if (data.roomId) {
    return { meetingId: data.roomId, err: null }
  } else {
    return { meetingId: null, err: data.error }
  }

};
