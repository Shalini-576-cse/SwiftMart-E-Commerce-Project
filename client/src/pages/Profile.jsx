const Profile = () => {

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const logoutHandler = () => {

    localStorage.removeItem(
      "userInfo"
    );

    window.location.href = "/login";
  };

  return (

    <div className="p-6 max-w-xl mx-auto">

      <div className="border rounded-lg shadow-md p-6">

        <h1 className="text-3xl font-bold mb-6">
          User Profile
        </h1>

        <div className="space-y-4">

          <div>

            <h2 className="font-bold">
              Name
            </h2>

            <p>
              {userInfo?.name}
            </p>

          </div>

          <div>

            <h2 className="font-bold">
              Email
            </h2>

            <p>
              {userInfo?.email}
            </p>

          </div>

          <div>

            <h2 className="font-bold">
              Role
            </h2>

            <p>
              {userInfo?.role}
            </p>

          </div>

        </div>

        <button
          onClick={logoutHandler}
          className="bg-red-500 text-white px-6 py-3 rounded mt-6"
        >
          Logout
        </button>

      </div>

    </div>
  );
};

export default Profile;