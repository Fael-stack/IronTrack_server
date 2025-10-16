import './page.css';

export default function Casa() {
  return (
    <div className="casa-container">
      <div className="casa-hero">
        <div className="casa-hero-overlay">
          <h1 className="casa-title">Iron track</h1>
          <p className="casa-subtitle">Perfeito para seus treinos!</p>
        </div>
      </div>
      <section className="casa-about">
        <h2>O que é o projeto Iron Track?</h2>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </p>
      </section>
    </div>
  );
}
