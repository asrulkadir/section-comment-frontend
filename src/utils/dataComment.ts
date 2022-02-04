import { DataBackend, IActionName } from '../types/data.type';
// import Data from '../types/data.type';

// export const dataComment: Data = {
//   currentUser: {
//     image: {
//       png: '',
//       webp: '',
//     },
//     username: '',
//   },
//   comments: [
//     {
//       id: 0,
//       content: '',
//       createdAt: '',
//       score: 0,
//       user: {
//         image: {
//           png: '',
//           webp: '',
//         },
//         username: '',
//       },
//       replies: [
//         {
//           id: 1,
//           content: '',
//           createdAt: '',
//           score: 0,
//           user: {
//             image: {
//               png: '',
//               webp: '',
//             },
//             username: '',
//           },
//         },
//       ],
//     },
//   ],
// };

export const dataComment: DataBackend = {
  current_user: {
    id: 0,
    image: '',
    username: '',
  },
  comments: [
    {
      id: 0,
      content: '',
      created_at: '',
      score: 0,
      username: '',
      image: '',
      replies: [
        {
          id: 1,
          content: '',
          created_at: '',
          score: 0,
          username: '',
          image: '',
          replying_to: '',
        },
      ],
    },
  ],
};

export const actionName: IActionName = {
  edit: 'Edit',
  send: 'Send',
  reply: 'Reply',
};
