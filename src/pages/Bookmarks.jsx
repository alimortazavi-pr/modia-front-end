import { useEffect } from "react";
import { useDispatch } from "react-redux";

//Import Components
import Template from "components/layouts/Template";

//Import Actions
import { setTitle } from "store/actions/layouts";

export default function Bookmarks() {
  //Redux
  const dispatch = useDispatch();

  //Effects
  useEffect(() => {
    document.title = "Modia | Bookmarks";
    dispatch(setTitle("Bookmarks"));
  });

  return (
    <Template>
      <ul>
        <li className="border-y border-gray-500 px-4 py-3 flex">
          <div className="avatar">
            <div className="rounded-full w-12 h-12">
              <img
                src="http://daisyui.com/tailwind-css-component-profile-1@40w.png"
                alt=""
              />
            </div>
          </div>
          <div className="ml-3 flex-1">
            <div className="flex justify-between">
              <div>
                <span className="mr-1 text-sm font-semibold">
                  {/* {user?.name.length > 10
                    ? user?.name.slice(0, 9) + "..."
                    : user?.name} */}
                  Ali Mortazavi
                </span>
                <span className="mr-1 text-sm text-gray-500">
                  @
                  {/* {user?.username.length > 5
                    ? user?.username.slice(0, 4) + "..."
                    : user?.username} */}
                  alimortazavi-pr
                </span>
                <span className="text-sm text-gray-500">. Dec 16</span>
              </div>
              <span>
                <i className="fa-regular fa-ellipsis"></i>
              </span>
            </div>
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse euismod tempus erat, id ultricies tortor rhoncus a.
              Quisque nec porta magna. Maecenas sit amet tristique odio, dapibus
              pellentesque neque. Nulla ut quam in tellus ornare interdum vel
              in.
            </p>
            <div className="flex justify-between pt-3 px-3">
              <div className="text-gray-500">
                <i className="fa-light fa-message mr-2"></i>0
              </div>
              <div className="text-gray-500">
                <i className="fa-light fa-repeat mr-2"></i>0
              </div>
              <div className="text-gray-500">
                <i className="fa-light fa-heart mr-2"></i>0
              </div>
              <div className="text-gray-500">
                <i className="fa-light fa-arrow-up-from-bracket mr-2"></i>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </Template>
  );
}
