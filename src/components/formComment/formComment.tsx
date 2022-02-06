import React, { Dispatch, SetStateAction, useState } from 'react';
import {
  DataBackend,
  IEditContent,
  IPostComment,
  IPostReply,
} from '../../types/data.type';
import { actionName } from '../../utils/dataComment';
import apiService from '../../api/apiService';

import './formComment.scss';

interface Props {
  imgSource: string;
  buttonName: string;
  reply?: boolean;
  editValue?: string;
  username: string;
  replyingTo?: string;
  id?: number;
  setData: Dispatch<SetStateAction<DataBackend>>;
  setIdComment: Dispatch<SetStateAction<number>>;
  setIdReply: Dispatch<SetStateAction<number>>;
}

const FormComment = ({
  imgSource,
  buttonName,
  reply,
  editValue,
  username,
  replyingTo,
  id,
  setData,
  setIdComment,
  setIdReply,
}: Props) => {
  const [addComment, setAddComment] = useState<string>('');
  const [editedValue, setEditedValue] = useState<string>(editValue || '');

  const handleChange = (e: any) => {
    editValue ? setEditedValue(e.target.value) : setAddComment(e.target.value);
  };

  const handleSubmit = (e: any, buttonName: string) => {
    e.preventDefault();
    setIdReply(0);
    setIdComment(0);

    if (buttonName === actionName.send) {
      const data: IPostComment = {
        content: addComment,
        score: 0,
        username: username,
      };
      apiService
        .postComment(data)
        .then(() => {
          apiService.getDataBackend().then((res) => {
            setData(res.data);
          });
          setAddComment('');
        })
        .catch((err) => {
          alert(err);
        });
    }

    if (buttonName === actionName.reply) {
      const data: IPostReply = {
        content: addComment,
        score: 0,
        username: username,
        replying_to: replyingTo ? replyingTo : '',
        id_comment: id ? id : 0,
      };
      apiService
        .postReply(data)
        .then(() => {
          apiService.getDataBackend().then((res) => {
            setData(res.data);
          });
        })
        .catch((err) => {
          alert(err);
        });
    }

    if (buttonName === actionName.edit && !reply) {
      const data: IEditContent = {
        content: editedValue,
      };
      apiService
        .editComment(id, data)
        .then(() => {
          apiService.getDataBackend().then((res) => {
            setData(res.data);
          });
        })
        .catch((err) => {
          alert(err);
        });
    }

    if (buttonName === actionName.edit && reply) {
      const data: IEditContent = {
        content: editedValue,
      };
      apiService
        .editReply(id, data)
        .then(() => {
          apiService.getDataBackend().then((res) => {
            setData(res.data);
          });
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  return (
    <form className={reply ? 'reply' : 'comment'}>
      <img src={imgSource} alt="" />
      <textarea
        name="add-comment"
        value={editedValue ? editedValue : addComment}
        placeholder="Add a comment..."
        className="comment-area"
        onChange={handleChange}
      />
      <button
        className="send-button"
        type="submit"
        onClick={(e) => handleSubmit(e, buttonName)}
      >
        {buttonName}
      </button>
    </form>
  );
};

export default FormComment;
