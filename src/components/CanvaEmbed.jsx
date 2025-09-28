import React from 'react';

const CanvaEmbed = ({ designId, height = 500 }) => {
  const id = designId || import.meta.env.VITE_CANVA_DESIGN_ID;
  if (!id) return null;
  const src = `https://www.canva.com/design/${id}/view?embed`;
  return (
    <div className="canva-embed" style={{ width: '100%', height }}>
      <iframe
        loading="lazy"
        allowFullScreen
        src={src}
        style={{ border: 'none', width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default CanvaEmbed;
