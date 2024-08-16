import { Link } from "react-router-dom";
import error404 from "../assets/404.gif";

const Error = () => {
  return (
    <div className="max-w-md md:max-w-2xl mx-auto">
      <img className="" src={error404} alt="" />
      <div className="text-center">
        <p className="text-2xl font-semibold md:text-3xl">Sorry, we couldn't find this page.</p>
        <p className="mt-4 mb-8">
          But dont worry, you can find plenty of other things on our homepage.
        </p>
      </div>
      <Link to="/">
        <button className="bg-[#e67e22] text-white px-4 py-2 rounded flex mx-auto">
          Back to Home
        </button>
      </Link>
    </div>
  );
};

export default Error;
