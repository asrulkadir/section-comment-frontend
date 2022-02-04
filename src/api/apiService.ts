import axios from 'axios';
import {
  IPostComment,
  DataBackend,
  IPostReply,
  IEditContent,
  IEditScore,
} from '../types/data.type';

class apiService {
  getData() {
    return fetch('data.json', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  getDataBackend() {
    return axios.get<DataBackend>('http://localhost:1323/v1/data');
  }

  postComment(data: IPostComment) {
    return axios.post('http://localhost:1323/v1/comments', data);
  }

  deleteComment(id: number) {
    return axios.delete(`http://localhost:1323/v1/comments/${id}`);
  }

  postReply(data: IPostReply) {
    return axios.post('http://localhost:1323/v1/replies', data);
  }

  deleteReply(id: number) {
    return axios.delete(`http://localhost:1323/v1/replies/${id}`);
  }

  editComment(id: number | undefined, data: IEditContent) {
    return axios.put(`http://localhost:1323/v1/comments/${id}`, data);
  }

  editReply(id: number | undefined, data: IEditContent) {
    return axios.put(`http://localhost:1323/v1/replies/${id}`, data);
  }

  editCommentScore(id: number | undefined, data: IEditScore) {
    return axios.put(`http://localhost:1323/v1/comments/${id}/score`, data);
  }

  editReplyScore(id: number | undefined, data: IEditScore) {
    return axios.put(`http://localhost:1323/v1/replies/${id}/score`, data);
  }
}

export default new apiService();
