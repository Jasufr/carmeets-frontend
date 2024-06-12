export interface Meeting {
  id: number;
  name: string;
  address: string;
  description: string;
  picture: string;
}

export interface Comment {
  id: number;
  meetingId: number;
  content: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  admin: boolean;
}
