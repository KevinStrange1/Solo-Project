import React from 'react';

function Bubble({
  name,
  onClick,
}: {
  name: string;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}) {
  return (
    <div className={`bubble bubble-white bubble-animate`} onClick={onClick}>
      {name}
    </div>
  );
}

export default Bubble;
