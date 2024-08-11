import mainBanner from '@/assets/landing.png';
import SearchBar from '@/components/SearchBar';

const HomePage = () => {
  return (
    <div className="mx-auto my-0 flex h-screen flex-col pt-[60px] lg:w-[1200px]">
      <div className="py-6 text-center  lg:mx-auto lg:w-4/5">
        <img src={mainBanner} className="inline-block" alt="" />
        <SearchBar />
      </div>
    </div>
  );
};

export default HomePage;
