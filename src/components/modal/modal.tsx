import React from 'react';
import apiService from '../../api/apiService';
import './modal.scss';

interface Props {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  deleteCommentById: number;
  setDeleteCommentById: React.Dispatch<React.SetStateAction<number>>;
  deleteReplyById: number;
  setDeleteReplyById: React.Dispatch<React.SetStateAction<number>>;
}

const Modal = ({
  showModal,
  setShowModal,
  deleteCommentById,
  deleteReplyById,
  setDeleteCommentById,
  setDeleteReplyById,
}: Props) => {
  const handleDelete = () => {
    setShowModal(false);
    if (deleteCommentById && !deleteReplyById) {
      apiService
        .deleteComment(deleteCommentById)
        .then(() => {
          setDeleteCommentById(0);
          window.location.reload();
        })
        .catch((err) => {
          alert(err.response.data.error);
        });
    }

    if (!deleteCommentById && deleteReplyById) {
      apiService
        .deleteReply(deleteReplyById)
        .then(() => {
          setDeleteReplyById(0);
          window.location.reload();
        })
        .catch((err) => {
          alert(err.response.data.error);
        });
    }
  };

  return (
    <>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Delete comment</h3>
            <p>
              Are you sure want to delete this comment? This will remove the
              comment and can't be undone
            </p>
            <div className="modal-buttons">
              <button
                className="cancel-button"
                onClick={() => setShowModal(false)}
              >
                No, Cancel
              </button>
              <button className="delete-button" onClick={handleDelete}>
                Yes, delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
