import React, { useState } from 'react';

type GithubUsernameFormProps = {
  onSubmitUsername: (username: string) => void;
};

const GithubUsernameForm = ({ onSubmitUsername }: GithubUsernameFormProps) => {
  const [input, setInput] = useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmitUsername(input);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  return (
    <form className="GithubUsernameForm" onSubmit={onSubmit}>
      <input onChange={onChange} value={input} />
      <button type="submit">조회</button>
    </form>
  );
};

export default GithubUsernameForm;
