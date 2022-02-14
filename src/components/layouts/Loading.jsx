function Loading(props) {
  return (
    <>
      {props.loading ? (
        <div className="absolute h-full w-full bg-gray-500 bg-opacity-50 z-50">
          <div className="h-screen w-screen flex justify-center items-center">
            <div className="animate-bounce text-purple-700 text-xl">
              LOADING
              <span className="ml-2">
                <i className="fa-light fa-spinner-third animate-spin"></i>
              </span>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Loading;
