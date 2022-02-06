import React, { Dispatch, SetStateAction, useState } from 'react';
import apiService from '../../api/apiService';
import { Minus, Plus } from '../../assets/icons';
import { DataBackend } from '../../types/data.type';
import './counter.scss';

interface Props {
  score: number;
  id: number;
  isReply?: boolean;
  isComment?: boolean;
  setData: Dispatch<SetStateAction<DataBackend>>;
}

const Counter = ({ score, id, isComment, isReply, setData }: Props) => {
  const [fillPlus, setFillPlus] = useState<string>('#C5C6EF');
  const [fillMinus, setFillMinus] = useState<string>('#C5C6EF');

  const handlePlus = () => {
    if (isComment) {
      apiService
        .editCommentScore(id, { score: score + 1 })
        .then(() => {
          apiService.getDataBackend().then((res) => {
            setData(res.data);
          });
        })
        .catch((err) => {
          alert(err.response.data.error);
        });
    }

    if (isReply) {
      apiService
        .editReplyScore(id, { score: score + 1 })
        .then(() => {
          apiService.getDataBackend().then((res) => {
            setData(res.data);
          });
        })
        .catch((err) => {
          alert(err.response.data.error);
        });
    }
  };

  const handleMinus = () => {
    if (isComment) {
      apiService
        .editCommentScore(id, { score: score > 0 ? score - 1 : 0 })
        .then(() => {
          apiService.getDataBackend().then((res) => {
            setData(res.data);
          });
        })
        .catch((err) => {
          alert(err.response.data.error);
        });
    }

    if (isReply) {
      apiService
        .editReplyScore(id, { score: score > 0 ? score - 1 : 0 })
        .then(() => {
          apiService.getDataBackend().then((res) => {
            setData(res.data);
          });
        })
        .catch((err) => {
          alert(err.response.data.error);
        });
    }
  };

  return (
    <div className="score">
      <div
        className="icon-plus"
        onMouseOver={() => setFillPlus('#5357B6')}
        onMouseLeave={() => setFillPlus('#C5C6EF')}
        onClick={handlePlus}
      >
        <Plus fill={fillPlus} />
      </div>
      <div className="score-value">{score}</div>
      <div
        className="icon-minus"
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
