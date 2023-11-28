import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AddTagsAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const onSubmitForm = (e) => {
    e.preventDefault();
    const tag = e.target.tag.value;

    Swal.fire({
      title: "Are you sure?",
      text: `'${tag}' tag will be availabe for all users!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Add it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.post(`/tags`, { tag: tag }).then((res) => {
          console.log(res.data);
          if (res.data.insertedId) {
            Swal.fire({
              title: "Success",
              text: "Tag added successfully",
              icon: "success",
            });
            e.target.reset();
          }
        });
      }
    });

    console.log(tag);
  };
  return (
    <div>
      <p className="font-semibold text-lg underline py-6">
        Add Tags For Posts!
      </p>
      <form onSubmit={onSubmitForm} className="flex flex-col w-fit gap-4">
        <div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered input-lg w-full max-w-xs"
            name="tag"
            required={true}
          />
        </div>
        <div className="flex justify-end">
          <input
            className="btn bg-blue-600 text-white hover:bg-blue-800 hover:text-white"
            type="submit"
            value="Add"
          />
        </div>
      </form>
    </div>
  );
};

export default AddTagsAdmin;
