import {
  PiDotDuotone as MatterIcon,
  PiCheckCircleDuotone as VerifyIcon,
  PiArrowRightLight as ViewAllIcon,
  PiArrowLeftBold as BlogLeftIcon,
  PiArrowRightBold as BlogRightIcon,
} from "react-icons/pi";

import Image from "next/image";

import CustomButton from "@/components/common/custom-button";

const whatWeDoList: {
  section: string;
  title: string;
  subtitle: string;
  description: string;
}[] = [
  {
    section: "icu",
    title: "Pet Intensive Care Unit (ICU)",
    subtitle: "Last technology and highly trained professionals",
    description:
      "We provide specialized care for pets that require intensive care. Our ICU is equipped with the latest technology and staffed by highly trained professionals to ensure the best possible care for your pet.",
  },
  {
    section: "clinic",
    title: "Clinic Management System",
    subtitle: "Designed to help veterinarians manage their practice",
    description:
      "Our clinic management system is designed to help veterinarians manage their practice more efficiently. It includes features such as appointment scheduling, patient records, billing, and more.",
  },
  {
    section: "services",
    title: "Specialized Veterinary Services",
    subtitle: "Surgery, dentistry, dermatology, and more",
    description:
      "We offer a wide range of specialized veterinary services, including surgery, dentistry, dermatology, and more. Our team of experts is dedicated to providing the best possible care for your pet.",
  },
];
const clinicsList: {
  logo: string;
  name: string;
  location: string;
}[] = [
  {
    logo: "https://img.freepik.com/premium-vector/cute-pet-shop-logo-vector-icon-illustration_441059-308.jpg",
    name: "Pet Care Clinic",
    location: "New York, NY",
  },
  {
    logo: "https://myrtleavenue.org/wp-content/uploads/2023/01/bond-vet-logo.jpg",
    name: "Bond Vet",
    location: "Los Angeles, CA",
  },
  {
    logo: "https://www.lumapps.com/sites/default/files/styles/og_image/public/2023/04/NVA_Logo_Parent_RGB.png?itok=x3TRRjOS",
    name: "National Veterinary Associates",
    location: "Berlin, Germany",
  },
  {
    logo: "https://images-platform.99static.com//h6QdlMcJzmD6jiPPlt5Kcev3fH4=/545x539:1159x1153/fit-in/500x500/99designs-contests-attachments/131/131871/attachment_131871233",
    name: "Brave Barkers",
    location: "Sydney, Australia",
  },
  {
    logo: "https://www.vin.com/projectassets/vinpromo/assets/images/family/drip-vet.png",
    name: "Drip Vet",
    location: "London, UK",
  },
  {
    logo: "https://www.drgwennmobilevet.com/wp-content/uploads/2021/05/Peake_Brook_Vet_Logo_FINAL-scaled.jpg",
    name: "Peake Brook Vet",
    location: "Melbourne, Australia",
  },
  {
    logo: "https://images.squarespace-cdn.com/content/v1/59ee341a3e2d094d95bb1a20/1508796357104-8YQC0ZJY1J74JCBIN8VZ/Lomond+Vet+Logo+2017+Colour.png",
    name: "Lomond Vet",
    location: "Glasgow, Scotland",
  },
  {
    logo: "https://allyurgentvet.com/wp-content/uploads/2023/07/AllyVUC_Logo-H.png",
    name: "Ally Urgent Vet",
    location: "San Francisco, CA",
  },
];
const pricingList: {
  plan: string;
  price: number;
  period: string;
  description: string;
  features: string[];
}[] = [
  {
    plan: "Basic",
    price: 4.99,
    period: "month",
    description: "For small clinics. We provide basic support for your clinic. Free trial available.",
    features: ["10 patients", "1 user", "Basic support", "Limited features"],
  },
  {
    plan: "Standard",
    price: 9.99,
    period: "month",
    description: "For medium clinics, if you have a team in your clinic. Free trial available.",
    features: ["25 patients", "5 users", "Standard support", "All features"],
  },
  {
    plan: "Premium",
    price: 19.99,
    period: "month",
    description: "For large clinics, like a hospital. You should have branches. Free trial available.",
    features: ["50 patients", "10 users", "Premium support", "All features", "Branches support", "AI support"],
  },
  {
    plan: "Custom",
    price: 49.99,
    period: "month",
    description: "Are you a big company? We can provide a custom plan for you. We can provide a custom plan for you.",
    features: ["Unlimited patients", "Unlimited users", "Custom support", "All features", "Branches support", "AI support"],
  },
];
const blogList: {
  title: string;
  content: string;
  createdAt: string;
  tags: string[];
  thumbnail: string;
}[] = [
  {
    title: "How to take care of your pet",
    content: "Taking care of your pet is important. Here are some tips to help you take care of your pet.",
    createdAt: "2020-05-25T14:00:00.000Z",
    tags: ["pets", "care", "tips"],
    thumbnail:
      "https://images.unsplash.com/photo-1617745143864-3907eaa93603?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "How to train your pet",
    content: "Training your pet is important. Here are some tips to help you train your pet.",
    createdAt: "2022-09-25T14:00:00.000Z",
    tags: ["pets", "training", "tips"],
    thumbnail:
      "https://images.unsplash.com/photo-1506242395783-cec2bda110e7?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "How to feed your pet",
    content: "Feeding your pet is important. Here are some tips to help you feed your pet.",
    createdAt: "2024-01-25T14:00:00.000Z",
    tags: ["pets", "feeding", "tips"],
    thumbnail:
      "https://images.unsplash.com/photo-1518882174711-1de40238921b?q=80&w=2458&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "How to play with your pet",
    content: "Playing with your pet is important. Here are some tips to help you play with your pet.",
    createdAt: "2023-11-25T14:00:00.000Z",
    tags: ["pets", "playing", "tips"],
    thumbnail:
      "https://images.unsplash.com/photo-1586042091284-bd35c8c1d917?q=80&w=3272&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "How to take care of your pet",
    content: "Taking care of your pet is important. Here are some tips to help you take care of your pet.",
    createdAt: "2022-04-25T14:00:00.000Z",
    tags: ["pets", "care", "tips"],
    thumbnail:
      "https://images.unsplash.com/photo-1566847438217-76e82d383f84?q=80&w=2847&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const WelcomeSection = () => {
  return (
    <section className="w-full flex flex-col items-center justify-start gap-4 p-8 pt-10 bg-gradient-to-b from-green-50 to-green-100 ">
      <div className="w-full md:max-w-7xl grid grid-cols-1 gap-4 md:gap-12 md:grid-cols-[2fr,3fr]">
        <div className="flex flex-col items-center md:items-start justify-center text-start gap-4 pt-8 md:pt-0 pb-2 md:pb-0 px-2 md:px-0 bg-transparent rounded-md">
          <span className="w-full flex flex-col items-center md:items-start">
            <h1 className="text-5xl text-green-500">What do we do at</h1>
            <h1 className="text-6xl font-bold heading-gradient bg-gradient-to-r from-green-800 to-green-600">Veticube ?</h1>
          </span>
          <span className="w-full max-w-xl flex flex-col text-justify items-center md:items-start gap-2">
            <p className="text-lg text-green-800 text-center md:text-start">
              We set out to equip the veterinary industry with smart systems! We currently provide the following services:
            </p>
          </span>
          <div className="w-full flex flex-col items-center md:items-start gap-1 md:gap-3">
            {whatWeDoList.map((item, index) => (
              <div
                key={index}
                id={item.section}
                className="w-full max-w-xl flex flex-row justify-start items-center gap-1 p-2 border border-green-100 rounded-lg bg-green-50"
              >
                <MatterIcon className="w-8 h-8 text-green-900" />
                <span className="w-full text-md text-green-800">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative h-[440px]">
          <Image
            priority
            layout="fill"
            className="object-cover z-10 border-4 border-white shadow-xl rounded-2xl"
            src="https://plus.unsplash.com/premium_photo-1661809024468-6fbc83533d1b?q=80&w=3271&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="veticube-machine"
          />
          {/* <div className="absolute top-16 right-0 z-1 rounded-2xl shadow-xl lg:flex hidden">
            <Image
              className="w-[400px] h-[400px] object-cover z-10 border-4 border-white shadow-xl"
              src="https://plus.unsplash.com/premium_photo-1661809024468-6fbc83533d1b?q=80&w=3271&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="veticube-machine"
            />
          </div>
          <div className="absolute top-8 left-12 z-0 rounded-2xl shadow-xl">
            <Image
              className="w-[100vw] lg:w-[300px] h-[300px] object-cover border-4 border-white"
              src="https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=3348&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="veticube-clinic-management"
            />
          </div>
          <div className="absolute -bottom-12 sm:-bottom-24 -left-0 z-1 rounded-2xl shadow-xl">
            <Image
              className="w-[400px] h-[200px] object-cover border-4 border-white"
              src="https://plus.unsplash.com/premium_photo-1677165653243-ac963970822b?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="veticube-machine"
            />
          </div> */}
        </div>
      </div>
    </section>
  );
};
const TrustedBySection = () => {
  return (
    <section className="w-full flex flex-col items-center justify-start gap-4 pt-16 sm:pt-24 bg-gradient-to-t from-green-100 to-green-100 ">
      <div className="w-full flex flex-col items-center justify-center gap-8">
        <h1 className="w-full max-w-7xl text-center text-green-500 text-3xl">Trusted by</h1>
        <div className="w-full justify-center gap-2 md:gap-4 px-8 md:px-0 overflow-x-hidden scrollbar-hide md:flex grid grid-cols-4">
          <div className="md:min-w-[120px] md:min-w-[180px] h-[80px] md:h-[100px] hidden md:flex items-center justify-center gap-4 bg-white rounded-lg" />
          {clinicsList.map((item, index) => (
            <div
              key={index}
              className="md:min-w-[120px] md:min-w-[180px] h-[100px] md:h-[100px] flex items-center justify-center gap-4 bg-white rounded-lg"
            >
              <Image src={item.logo} alt={item.name} width={100} height={100} />
            </div>
          ))}
          <div className="md:min-w-[120px] md:min-w-[180px] h-[100px] md:h-[100px] hidden md:flex items-center justify-center gap-4 bg-white rounded-lg" />
        </div>
      </div>
    </section>
  );
};
const OurMissionSection = () => {
  return (
    <div className="w-full flex flex-col items-center justify-start gap-4 p-8 pt-16 md:pt-24 md:pt-36 bg-gradient-to-b from-green-100 to-gray-100 overflow-hidden">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
        <div className="flex flex-col gap-4 text-justify">
          <h1 className="text-3xl text-green-500 text-center">Our Mission</h1>
          <div className="flex flex-col gap-2 lg:gap-4">
            <h2 className="text-md lg:text-lg text-black">
              Our mission is to provide the best possible care for your pet. We are committed to using the latest technology and the most
              advanced treatments to ensure the health and well-being of your pet.
            </h2>
            <h2 className="text-md lg:text-lg text-black">
              We are dedicated to providing the highest quality care for your pet. Our team of experts is committed to providing the best
              possible care for your pet, and we are always looking for ways to improve our services.
            </h2>
            <h2 className="text-md lg:text-lg text-black">
              We are committed to providing the best possible care for your pet. Our team of experts is dedicated to providing the highest
              quality care for your pet, and we are always looking for ways to improve our services.
            </h2>
          </div>
          <CustomButton size="lg" variant="primary-faded">
            <span className="w-full flex flex-row items-center justify-center gap-2">
              <span>Learn more</span>
              <BlogRightIcon className="w-6 h-6" />
            </span>
          </CustomButton>
        </div>
        <div className="flex flex-row-reverse justify-between lg:justify-start gap-2 sm:gap-4 -mr-0 lg:-mr-24">
          <div className="flex -mr-0 lg:-mr-12">
            <Image
              width={240}
              height={200}
              className="w-[240px] h-[200px] lg:h-[420px] object-cover z-10 border-4 border-white lg:rounded-full shadow-xl"
              src="https://images.unsplash.com/photo-1615111784767-4d7c527f32a1?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="veticube-machine"
            />
          </div>
          <div className="flex -mr-0 lg:-mr-12">
            <Image
              width={240}
              height={200}
              className="w-[240px] h-[200px] lg:h-[480px] object-cover z-10 border-4 border-white lg:rounded-full shadow-xl"
              src="https://images.unsplash.com/photo-1698949654875-544ecfef27ac?q=80&w=2694&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="veticube-machine"
            />
          </div>
          <div className="flex -mr-0 lg:-mr-12">
            <Image
              width={240}
              height={200}
              className="w-[240px] h-[200px] lg:h-[440px] object-cover z-10 border-4 border-white lg:rounded-full shadow-xl"
              src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=2688&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="veticube-machine"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

/*
const PricingSection = () => {
  return (
    <section className="w-full flex flex-col items-center justify-start gap-4 pt-16 md:pt-24  bg-gradient-to-b from-gray-100 to-cyan-50 ">
      <div className="w-full max-w-7xl flex flex-col items-center justify-center gap-8 px-8 md:px-0">
        <h1 className="text-center text-cyan-500">Packages and Pricing</h1>
        <motion.div
          initial={{ scale: 0.9, y: -100, opacity: 0 }}
          whileInView={{
            scale: 1,
            y: 0,
            opacity: 1,
          }}
          transition={{ duration: 1 }}
          className="w-full gap-2 md:gap-4 md:px-8 xl:px-0 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4"
        >
          {pricingList.map((item, index) => (
            <Card
              key={index}
              className="w-full flex flex-col items-start justify-start mx-auto gap-4 p-4 bg-white rounded-none md:rounded-2xl shadow-md h-[auto] md:h-[560px]"
            >
              <span
                className={`w-full flex flex-col items-start justify-center w-min py-2 px-8 rounded-lg ${
                  item.plan === "Custom" ? "bg-yellow-400 text-yellow-800" : "bg-cyan-100 text-cyan-800"
                }`}
              >
                {item.plan}
              </span>
              <span className="flex flex-row items-end justify-start gap-2">
                <span className="text-3xl lg:text-4xl text-default-700 font-bold">${item.price}</span>
                <span className="text-lg text-default-700">/ {item.period}</span>
              </span>
              <span className="text-lg text-cyan-800">{item.description}</span>

              <div className="w-full flex flex-col items-start justify-center gap-2">
                {item.features.map((feature, index) => (
                  <span key={index} className="w-full flex flex-row items-start justify-start gap-2">
                    <VerifyIcon className="w-6 h-6 text-cyan-700" />
                    <span className="text-md text-cyan-800">{feature}</span>
                  </span>
                ))}
              </div>
              <Button
                className={`w-full mt-auto mb-0 text-md text-white ${item.plan === "Custom" ? "bg-yellow-600 animate-jump" : "bg-cyan-600"}`}
              >
                Get started
              </Button>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
*/

/*
const BlogSection = () => {
  // const { ago } = useDate();

  return (
    <section className="w-full flex flex-col items-center justify-start gap-4 pt-16 md:pt-24 pb-24 px-8 xl:px-0 bg-gradient-to-t from-gray-200 to-cyan-50">
      <div className="w-full flex flex-col items-center justify-center gap-8">
        <span className="w-full max-w-7xl flex flex-row items-center justify-between gap-4">
          <h1 className="text-center text-cyan-500">Our latest blog posts</h1>
          <Link href="/blog" className="hidden sm:flex">
            <Button className="w-full md:w-auto bg-transparent text-cyan-500 text-md ">
              <span className="flex flex-row items-center justify-center  gap-2">
                <span>View all</span>
                <ViewAllIcon className="w-6 h-6" />
              </span>
            </Button>
          </Link>
        </span>
        <div className="relative w-full flex justify-center gap-4 md:gap-8 overflow-x-hidden scrollbar-hide">
          <div className="w-full max-w-7xl flex flex-col items-center justify-center gap-4">
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              whileInView={{
                y: 0,
                opacity: 1,
              }}
              transition={{ duration: 0.5 }}
              className="w-full grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {blogList?.slice(0, 3).map((item, index) => (
                <Card
                  key={index}
                  className="w-full flex flex-col items-start justify-between gap-6 p-4 bg-white rounded-none md:rounded-2xl shadow-none h-[auto] md:h-480px]"
                >
                  <span className="w-full flex flex-col-reverse lg:flex-row justify-between items-start gap-2">
                    <span className="text-cyan-800">{item.title}</span>
                      <span className={text({ size: "sm", className: "text-cyan-600" })}>{ago(item.createdAt)}</span> 
                  </span>
                  <div className="w-full flex flex-col sm:flex-row gap-4">
                    <Image className="w-[400px] h-[200px] object-cover rounded-lg" src={item.thumbnail} alt={item.title} />
                    <div className="w-full flex flex-col justify-between gap-2">
                      <span className="text-default-900 text-md">{item.content}</span>
                      <Button className="w-full bg-cyan-50 text-cyan-900 text-md">Read more</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </motion.div>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{
                y: 0,
                opacity: 1,
              }}
              transition={{ duration: 1 }}
              className="w-full grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {blogList?.slice(3, 5).map((item, index) => (
                <Card
                  key={index}
                  className="w-full flex flex-col items-start justify-start gap-6 p-4 bg-white rounded-none md:rounded-2xl shadow-none h-[auto] md:h-480px]"
                >
                  <span className="w-full flex flex-row justify-between items-center gap-2">
                    <span className="text-cyan-800">{item.title}</span>
                      <span className={text({ size: "sm", className: "text-cyan-600" })}>{ago(item.createdAt)}</span> 
                  </span>
                  <div className="w-full flex flex-row gap-4">
                    <Image className="w-[400px] h-[200px] object-cover rounded-lg" src={item.thumbnail} alt={item.title} />
                    <div className="w-full flex flex-col justify-between gap-2">
                      <span className="text-default-900">{item.content}</span>
                      <Button className="w-full bg-cyan-50 text-cyan-900 text-md">Read more</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
*/

function Home() {
  return (
    <section className="w-full flex flex-col items-center justify-start">
      <WelcomeSection />
      <TrustedBySection />
      <OurMissionSection />
      {/* <PricingSection /> */}
      {/* <BlogSection /> */}
    </section>
  );
}

export default Home;
