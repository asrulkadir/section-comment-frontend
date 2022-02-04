import React, { useState } from 'react';
import apiService from '../../api/apiService';
import { Minus, Plus } from '../../assets/icons';
import './counter.scss';

interface Props {
  score: number;
  id: number;
  isReply?: boolean;
  isComment?: boolean;
}

const Counter = ({ score, id, isComment, isReply }: Props) => {
  const [fillPlus, setFillPlus] = useState<string>('#C5C6EF');
  const [fillMinus, setFillMinus] = useState<string>('#C5C6EF');

  const handlePlus = () => {
    if (isComment) {
      apiService
        .editCommentScore(id, { score: score + 1 })
        .then(() => {
          window.location.reload();
        })
        .catch((err) => {
          alert(err.response.data.error);
        });
    }

    if (isReply) {
      apiService
        .editReplyScore(id, { score: score + 1 })
        .then(() => {
          window.location.reload();
        })
        .catch((err) => {
          alert(err.response.data.error);
        });
    }
  };

  const handleMinus = () => {
    if (isComment) {
      apiService
        .editCommentScore(id, { score: score - 1 })
        .then(() => {
          window.location.reload();
        })
        .catch((err) => {
          alert(err.response.data.error);
        });
    }

    if (isReply) {
      apiService
        .editReplyScore(id, { score: score - 1 })
        .then(() => {
          window.location.reload();
        })
        .catch((err) => {
          alert(err.response.data.error);
        });
    }
  };

  return (
    <div className="score">
      <div
        className="icon-counter"
        onMouseOver={() => setFillPlus('#5357B6')}
        onMouseLeave={() => setFillPlus('#C5C6EF')}
        onClick={handlePlus}
      >
        <Plus fill={fillPlus} />
      </div>
      <div className="score-value">{score}</div>
      <div
        className="icon-counter"
        onMouseOver={() => setFillMinus('#5357B6')}
        onMouseLeave={() => setFillMinus('#C5C6EF')}
        onClick={handleMinus}
      >
        <Minus fill={fillMinus} />
      </div>
    </div>
  );
};

export default Counter;