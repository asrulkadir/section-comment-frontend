import React, { useEffect, useState } from 'react';
import './App.scss';
import apiService from './api/apiService';
// import Data from './types/data.type';
import { actionName, dataComment } from './utils/dataComment';
import Counter from './components/counter/counter';
import { Delete, Edit, Reply } from './assets/icons';
import FormComment from './components/formComment/formComment';
import Modal from './components/modal/modal';
import { DataBackend } from './types/data.type';
import { timeAgo } from './utils/convertTime';

function App() {
  const [data, setData] = useState<DataBackend>(dataComment);
  const [idComment, setIdComment] = useState<number>(0);
  const [idReply, setIdReply] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [deleteReplyById, setDeleteReplyById] = useState<number>(0);
  const [deleteCommentById, setDeleteCommentById] = useState<number>(0);
  const [width, setWidth] = useState<number>(window.innerWidth);

  const handleSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    apiService
      .getDataBackend()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        alert(err.response.data.error);
      });

    window.addEventListener('resize', handleSizeChange);
  }, []);

  const handleReply = (id: number) => {
    setIdComment((oldId) => (oldId === id ? 0 : id));
  };

  const handleReply2 = (id: number) => {
    setIdReply((oldId) => (oldId === id ? 0 : id));
  };

  const handleDeleteReply = (id: number) => {
    setShowModal(true);
    setDeleteReplyById(id);
  };

  const handleDeleteComment = (id: number) => {
    setShowModal(true);
    setDeleteCommentById(id);
  };

  return (
    <>
      <div>
        {data.comments.map((comment) => {
          return (
            <div key={comment.id}>
              <div className="comment">
                {width >= 768 && (
                  <Counter
                    score={comment.score}
                    id={comment.id}
                    isComment={true}
                    setData={setData}
                  />
                )}

                <div className="wrapper-username">
                  <div className="user">
                    <div>
                      <img src={comment.image} alt="" />
                      <p className="username">{comment.username}</p>
                      <p className="created-at">
                        {timeAgo(comment.created_at)}
                      </p>
                    </div>
                    {comment.username === data.current_user.username &&
                    width >= 768 ? (
                      <div className="delete-edit">
                        <div
                          className="delete"
                          onClick={() => handleDeleteComment(comment.id)}
                        >
                          <Delete /> <p>Delete</p>
                        </div>
                        <div
                          className="edit"
                          onClick={() => handleReply(comment.id)}
                        >
                          <Edit /> <p>Edit</p>
                        </div>
                      </div>
                    ) : comment.username !== data.current_user.username &&
                      width >= 768 ? (
                      <div
                        className="reply-icon"
                        onClick={() => handleReply(comment.id)}
                      >
                        <Reply /> <p>Reply</p>
                      </div>
                    ) : null}
                  </div>
                  <div className="content">
                    <p>{comment.content}</p>
                  </div>
                  {width < 768 && (
                    <div className="counter-reply-mobile">
                      <Counter
                        score={comment.score}
                        id={comment.id}
                        isComment={true}
                        setData={setData}
                      />

                      {comment.username === data.current_user.username ? (
                        <div className="delete-edit">
                          <div
                            className="delete"
                            onClick={() => handleDeleteComment(comment.id)}
                          >
                            <Delete /> <p>Delete</p>
                          </div>
                          <div
                            className="edit"
                            onClick={() => handleReply(comment.id)}
                          >
                            <Edit /> <p>Edit</p>
                          </div>
                        </div>
                      ) : (
                        <div
                          className="reply-icon"
                          onClick={() => handleReply(comment.id)}
                        >
                          <Reply /> <p>Reply</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              {comment.id === idComment &&
              comment.username !== data.current_user.username ? (
                <FormComment
                  imgSource={data.current_user.image}
                  buttonName={actionName.reply}
                  username={data.current_user.username}
                  replyingTo={comment.username}
                  id={comment.id}
                  setData={setData}
                  setIdComment={setIdComment}
                  setIdReply={setIdReply}
                />
              ) : comment.id === idComment &&
                comment.username === data.current_user.username ? (
                <FormComment
                  imgSource={data.current_user.image}
                  buttonName={actionName.edit}
                  editValue={comment.content}
                  username={data.current_user.username}
                  id={comment.id}
                  setData={setData}
                  setIdComment={setIdComment}
                  setIdReply={setIdReply}
                />
              ) : null}

              <div className="wrapper-replies">
                {comment.replies?.map((reply) => {
                  return (
                    <div key={reply.id} className="replies">
                      <div className="reply">
                        {width >= 768 && (
                          <Counter
                            score={reply.score}
                            id={reply.id}
                            isReply={true}
                            setData={setData}
                          />
                        )}
                        <div className="wrapper-username">
                          <div className="user">
                            <div>
                              <img src={reply.image} alt="" />
                              {data.current_user.username !== reply.username ? (
                                <p className="username">{reply.username}</p>
                              ) : (
                                <p className="username">
                                  {reply.username} <span>You</span>
                                </p>
                              )}
                              <p className="created-at">
                                {timeAgo(reply.created_at)}
                              </p>
                            </div>
                            {data.current_user.username !== reply.username &&
                            width >= 768 ? (
                              <div
                                className="reply-icon"
                                onClick={() => handleReply2(reply.id)}
                              >
                                <Reply /> <p>Reply</p>
                              </div>
                            ) : data.current_user.username === reply.username &&
                              width >= 768 ? (
                              <div className="delete-edit">
                                <div
                                  className="delete"
                                  onClick={() => handleDeleteReply(reply.id)}
                                >
                                  <Delete /> <p>Delete</p>
                                </div>
                                <div
                                  className="edit"
                                  onClick={() => handleReply2(reply.id)}
                                >
                                  <Edit /> <p>Edit</p>
                                </div>
                              </div>
                            ) : null}
                          </div>
                          <div className="content">
                            <p>
                              <span className="replying-to">
                                @{reply.replying_to}
                              </span>{' '}
                              {reply.content}
                            </p>
                          </div>
                          {width < 768 && (
                            <div className="counter-reply-mobile">
                              <Counter
                                score={reply.score}
                                id={reply.id}
                                isReply={true}
                                setData={setData}
                              />

                              {reply.username === data.current_user.username ? (
                                <div className="delete-edit">
                                  <div
                                    className="delete"
                                    onClick={() =>
                                      handleDeleteComment(reply.id)
                                    }
                                  >
                                    <Delete /> <p>Delete</p>
                                  </div>
                                  <div
                                    className="edit"
                                    onClick={() => handleReply2(reply.id)}
                                  >
                                    <Edit /> <p>Edit</p>
                                  </div>
                                </div>
                              ) : (
                                <div
                                  className="reply-icon"
                                  onClick={() => handleReply2(reply.id)}
                                >
                                  <Reply /> <p>Reply</p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      {reply.id === idReply &&
                      data.current_user.username !== reply.username ? (
                        <FormComment
                          imgSource={data.current_user.image}
                          buttonName={actionName.reply}
                          reply={true}
                          username={data.current_user.username}
                          replyingTo={reply.username}
                          id={comment.id}
                          setData={setData}
                          setIdReply={setIdReply}
                          setIdComment={setIdComment}
                        />
                      ) : reply.id === idReply &&
                        data.current_user.username === reply.username ? (
                        <FormComment
                          imgSource={data.current_user.image}
                          buttonName={actionName.edit}
                          reply={true}
                          editValue={reply.content}
                          username={data.current_user.username}
                          id={reply.id}
                          setData={setData}
                          setIdReply={setIdReply}
                          setIdComment={setIdComment}
                        />
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        <FormComment
          imgSource={data.current_user.image}
          buttonName={actionName.send}
          username={data.current_user.username}
          setData={setData}
          setIdComment={setIdComment}
          setIdReply={setIdReply}
        />
      </div>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        deleteCommentById={deleteCommentById}
        deleteReplyById={deleteReplyById}
        setDeleteCommentById={setDeleteCommentById}
        setDeleteReplyById={setDeleteReplyById}
        setData={setData}
      />
    </>
  );
}

export default App;
