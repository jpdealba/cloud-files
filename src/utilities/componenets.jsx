export const InputElement = ({ setElement, placeholder, type, value, disabled }) => {
  return (
    <div className="mb-4 transform md:scale-100 scale-90">
      <input
		onChange={setElement}
		value={value}
		disabled={disabled}
        type={type}
			  className={`form-control block w-full px-4 py-2 text-lg ${disabled &&
				  "cursor-not-allowed bg-gray-100 border border-gray-300 text-gray-900 text-gray-600"}
		font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
		 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-secondary focus:outline-none`}
        id={placeholder}
        placeholder={placeholder}
      />
    </div>
  );
};
