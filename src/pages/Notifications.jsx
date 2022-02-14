import { useEffect } from "react";
import { useDispatch } from "react-redux";

//Import Components
import Template from "components/layouts/Template";

//Import Actions
import { setTitle } from "store/actions/layouts";

export default function Notifications() {
  //Redux
  const dispatch = useDispatch();

  //Effects
  useEffect(() => {
    document.title = "Modia | Notifications";
    dispatch(setTitle("Notifications"));
  });

  return (
    <Template>
      <div className="flex flex-col overflow-y-hidden">
        <div className="tabs justify-around border-b border-b-gray-600 h-10">
          <button className="tab tab-bordered border-purple-600 text-white">
            All
          </button>
          <button className="tab tab-bordered border-b-0">Mentions</button>
        </div>
      </div>
    </Template>
  );
}
