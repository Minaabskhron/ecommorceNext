const page = () => {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4 text-gray-500">
        please enter your Email
      </h1>
      <form action="">
        <label
          htmlFor="email"
          className="block pt-5 pb-2 font-semibold text-sm"
        >
          Email
        </label>
        <input
          id="email"
          placeholder="Your Email..."
          type="email"
          name="email"
          required
          className="ps-2 w-full py-2 border-2 border-gray-300 rounded-lg"
        />
        <div className="text-center">
          <button
            disabled
            className="w-3/4 mt-10 disabled:opacity-75 disabled:cursor-not-allowed bg-green-700 rounded-lg py-2 text-white cursor-pointer hover:bg-green-800"
          >
            verify
          </button>
        </div>
      </form>
    </div>
  );
};

export default page;
