const loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm ">
      <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default loading;
