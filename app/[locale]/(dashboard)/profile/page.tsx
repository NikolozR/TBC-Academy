import { getUser } from "../../../api/api";
import ProfileForm from "../../../components/Profile/ProfileForm";
import ProfileSidebar from "../../../components/Profile/ProfileSidebar";

async function Profile() {
  const user: User = await getUser();
  return (
    <section className="mb-[80px]">
      <div className="container">
        <h1 className="font-poppins text-[3.375rem] font-medium text-center py-[40px]">
          My Profile
        </h1>
        <div className="flex gap-[80px]">
          <ProfileSidebar user={user} active="profile" />
          <ProfileForm user={user} />
        </div>
      </div>
    </section>
  );
}

export default Profile;
