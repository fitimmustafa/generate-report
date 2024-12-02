const ImageUploader = ({
  onUpload,
}: {
  onUpload: (files: FileList | null) => void;
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      onUpload(event.target.files);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="mb-4"
      />
    </div>
  );
};

export default ImageUploader;
