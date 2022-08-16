export const ModalTitle = ({ title, color = "text-white" }) => (
  <h2 className={`text-xl leading-6 font-medium ${color}`}>{title}</h2>
);

export const ModalDescription = ({ description, color = "text-gray-500" }) => (
  <p className={`text-sm ${color}`}>{description}</p>
);

export default function Modal({ icon, title, description }) {
  return (
    <div className="flex items-center justify-center h-screen p-4 text-center sm:p-0 bg-slate-900 bg-opacity-75">
      <div className=" bg-slate-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl w-full max-w-sm ">
        <div>
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-sky-200">
            {icon}
          </div>
          <div className="mt-3 text-center sm:mt-5">
            {title}
            <div className="mt-2">{description}</div>
          </div>
        </div>
        <div className="mt-5 sm:mt-6">
          <button
            type="button"
            className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-sky-600 text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:text-sm"
            onClick={() => console.log("hello")}
          >
            Go back
          </button>
        </div>
      </div>
    </div>
  );
}
