import Contribution from '@/components/Contribution';
import ProfileCard from '@/components/ProfileCard';
import { useParams } from 'react-router-dom';

const ProfilePage = () => {
  const params = useParams() as {id : string};
  return (
    <div className="lg:w-[1200px] my-0 mx-auto pt-[60px] px-[16px] lg:px-0">
      <ProfileCard />
      <Contribution params={params} />
    </div>
  );
};

export default ProfilePage;
