//Import Packages
import { CopyToClipboard } from "react-copy-to-clipboard";

//Import Components
import { Toast } from "assets/js/Swal";

export default function Share({ post }) {
  //Functions
  function copyCompleteMessage() {
    Toast.fire({
      icon: "success",
      title: "Link copied in the clipboard",
    });
  }

  return (
    <CopyToClipboard
      text={`http://localhost:3000/posts/${post._id}`}
      onCopy={copyCompleteMessage}
    >
      <div className="text-gray-500 cursor-pointer">
        <i className="fa-regular fa-arrow-up-from-bracket text-xl mr-2"></i>
      </div>
    </CopyToClipboard>
  );
}
