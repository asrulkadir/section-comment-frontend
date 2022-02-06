import {
  IPostComment,
  DataBackend,
  IPostReply,
  IEditContent,
  IEditScore,
} from '../types/data.type';
import http from '../http-common';

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
    return http.get<DataBackend>('v1/data');
  }

  postComment(data: IPostComment) {
    return http.post('v1/comments', data);
  }

  deleteComment(id: number) {
    return http.delete(`v1/comments/${id}`);
  }

  postReply(data: IPostReply) {
    return http.post('v1/replies', data);
  }

  deleteReply(id: number) {
    return http.delete(`v1/replies/${id}`);
  }

  editComment(id: number | undefined, data: IEditContent) {
    return http.put(`v1/comments/${id}`, data);
  }

  editReply(id: number | undefined, data: IEditContent) {
    return http.put(`v1/replies/${id}`, data);
  }

  editCommentScore(id: number | undefined, data: IEditScore) {
    return http.put(`v1/comments/${id}/score`, data);
  }

  editReplyScore(id: number | undefined, data: IEditScore) {
    return http.put(`v1/replies/${id}/score`, data);
  }
}

export default new apiService();
