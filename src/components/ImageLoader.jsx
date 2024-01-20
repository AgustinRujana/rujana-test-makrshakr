const ImageLoader = ({ src, className }) => {
  return (
    <div className={"h-full w-full overflow-hidden relative " + className}>
      <img
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        src="/images/cat.svg"
      />
      <img className="absolute object-cover w-full h-full" src={src} />
    </div>
  );
};

export default ImageLoader;
