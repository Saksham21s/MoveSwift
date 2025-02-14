import block from '../../../assets/block-logo.png'
const BlockRider = () => {
  return (
    <main className="main-content">
  <div className="centered-container">
  <div className="image-container">
    <img src={block} alt="Image" />
  </div>
  <div className="text-container">
    <p>Some text content goes here.</p>
  </div>
  <div className="text-container">
    <p>Another text content.</p>
  </div>
  <div className="button-container">
    <div className="button-item">Button 1</div>
    <div className="button-item">Button 2</div>
  </div>
</div>

</main>
  );
};

export default BlockRider;
