// interface Source {
//   png: string;
//   webp: string;
// }

// interface User {
//   image: Source;
//   username: string;
// }

// interface Replies {
//   id: number;
//   content: string;
//   createdAt: string;
//   score: number;
//   user: User;
// }

interface RepliesBackend {
  id: number;
  content: string;
  created_at: string;
  score: number;
  username: string;
  image: string;
  replying_to: string;
}

// interface Comment {
//   id: number;
//   content: string;
//   createdAt: string;
//   score: number;
//   user: User;
//   replies: Array<Replies>;
// }

interface CommentBackend {
  id: number;
  content: string;
  created_at: string;
  score: number;
  username: string;
  image: string;
  replies?: Array<RepliesBackend>;
}

// export default interface Data {
//   currentUser: User;
//   comments: Comment[];
// }

interface UserBackend {
  id: number;
  username: string;
  image: string;
}

export interface DataBackend {
  current_user: UserBackend;
  comments: CommentBackend[];
}

export interface IPostComment {
  content: string;
  username: string;
  score: number;
}

export interface IEditContent {
  content: string;
}

export interface IEditScore {
  score: number;
}

export interface IPostReply {
  content: string;
  username: string;
  score: number;
  replying_to: string;
}

export interface IActionName {
  edit: string;
  send: string;
  reply: string;
}
