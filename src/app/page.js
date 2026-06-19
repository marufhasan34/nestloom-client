import Banner from "@/components/Banner";
import CustomerReviews from "@/components/CustomerReviews";
import ExploreDreamLocations from "@/components/ExploreDreamLocations";
import HowNestLoomWorks from "@/components/HowNestLoomWorks";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function Home() {
  return (
    <div>
      <Banner />
      <WhyChooseUs /> 
     <CustomerReviews />
     <ExploreDreamLocations />
     <HowNestLoomWorks />
    </div>
  );
}
