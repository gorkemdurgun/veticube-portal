"use server";

import {
  PiDotDuotone as MatterIcon,
  PiCheckCircleDuotone as VerifyIcon,
  PiArrowRightLight as ViewAllIcon,
  PiArrowLeftBold as BlogLeftIcon,
  PiArrowRightBold as BlogRightIcon,
  PiInstagramLogoDuotone as InstagramIcon,
  PiWhatsappLogoDuotone as WhatsappIcon,
  PiYoutubeLogoDuotone as YoutubeIcon,
  PiEnvelopeSimpleDuotone as MailIcon,
} from "react-icons/pi";

import { FloatButton, Tooltip } from "antd";
import Image from "next/image";
import Link from "next/link";

import { png, svg } from "@/assets";

import CustomButton from "@/components/common/custom-button";

const doingList: {
  section: string;
  title: string;
  subtitle: string;
  description: string;
}[] = [
  {
    section: "icu",
    title: "Yoğun Bakım Ünitesi (ICU)",
    subtitle: "Son teknoloji ile donatılmış, güvenli bir ortam",
    description:
      "En son teknolojiye sahip yoğun bakım ünitelerimiz ve modern ekipmanlarımızla, yoğun bakım ihtiyaçlarına yönelik en iyi destek sağlıyoruz.",
  },
  {
    section: "clinic",
    title: "Klinik Yönetim Sistemi",
    subtitle: "Tüm klinik süreçlerinizi tek bir platformda yönetin",
    description:
      "Klinik yönetim süreçlerinizi geliştirmek için tasarlanmış bulut tabanlı yazılımlarımız, klinik süreçlerinizi daha verimli bir şekilde yönetmenizi sağlar.",
  },
  {
    section: "services",
    title: "Özelleştirilmiş Veteriner Yazılımları",
    subtitle: "Veteriner kliniğiniz için size özel olarak tasarlanmış yazılımlar",
    description:
      "Veteriner kliniğiniz için özel olarak tasarlanmış yazılımlarımız, işletmenizin ihtiyaçlarına uygun olarak geliştirilir. Kapsamlı özelliklerimiz ve AI destekli teknolojilerimizle işlerinizi daha iyi hale getirin.",
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

const WhatsappButton = () => {
  return (
    <Tooltip arrow={false} title="Whatsapp ile iletişime geçin" placement="left" color="#059669">
      <FloatButton type="primary" icon={<WhatsappIcon className="text-green-100" />} />
    </Tooltip>
  );
};
const Navbar = () => {
  return (
    <nav className="w-full flex flex-row items-center justify-between gap-4 p-4 bg-green-50 shadow-md">
      <div className="w-full flex flex-col md:flex-row items-center justify-between px-8 md:px-24">
        <div className="w-1/2 flex flex-row items-center justify-center md:justify-start gap-4">
          <Image width={48} height={48} className="rounded-full" src={png.Logo} alt="veticube-logo" />
          <span className="text-3xl text-green-900 font-semibold font-oswald">VETICUBE</span>
        </div>
        <Link href="/demo" className="hidden md:flex">
          <span className="text-sm text-teal-700 font-raleway">Ücretsiz deneyin; taahhüt yok, kredi kartı yok!</span>
        </Link>
      </div>
    </nav>
  );
};
const WelcomeSection = () => {
  return (
    <section className="w-full flex flex-col items-center justify-start gap-4 p-8 pt-4 md:pt-12 bg-gradient-to-b from-green-50 to-green-100 ">
      <div className="w-full md:max-w-7xl grid grid-cols-1 gap-4 md:gap-12 md:grid-cols-[2fr,3fr]">
        <div className="flex flex-col items-center md:items-start justify-center text-start gap-4 md:gap-6 md:pt-8 md:pt-0 pb-2 md:pb-0 px-2 md:px-0 bg-transparent rounded-md">
          <span className="w-full flex flex-col items-center md:items-start">
            <h1 className="text-3xl md:text-5xl text-green-500">Ne mi yapıyoruz?</h1>
            <h1 className="hidden md:flex text-6xl font-bold heading-gradient bg-gradient-to-r from-green-800 to-green-600">Veticube</h1>
          </span>
          <span className="w-full max-w-xl flex flex-col text-justify items-center md:items-start gap-2">
            <p className="text-sm md:text-lg text-green-800 text-center md:text-start">
              Veterinerlik sektörünü akıllı sistemlerle donatmak için yola çıktık! Şu anda aşağıdaki hizmetleri sunuyoruz:
            </p>
          </span>
          <div className="w-full flex flex-col items-center md:items-start gap-1 md:gap-3">
            {doingList.map((item, index) => (
              <div
                key={index}
                id={item.section}
                className="w-full max-w-xl flex flex-row justify-start items-center gap-1 p-2 border border-green-100 rounded-lg bg-green-50"
              >
                <MatterIcon className="w-8 h-8 text-green-900" />
                <span className="w-full text-sm md:text-md text-green-800">{item.title}</span>
              </div>
            ))}
          </div>
          <Link href="/demo" className="w-full">
            <CustomButton size="lg" variant="secondary-faded" className="w-full mt-auto py-3 bg-teal-300">
              Ücretsiz denemeye başla
            </CustomButton>
          </Link>
        </div>
        <div className="relative h-[300px] md:h-[440px]">
          <Image
            priority
            layout="fill"
            className="object-cover z-10 border-4 border-white shadow-xl rounded-2xl"
            src="https://imgtr.ee/images/2024/09/02/19a88dbe26db6f97d3b94fb07870a0e9.png"
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
const Footer = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center bg-gradient-to-b from-green-100 to-green-50 pt-8 md:pt-12">
      <div className="w-full flex items-center justify-between px-4 md:px-24 pb-2 border-b border-teal-200">
        <h5 className="text-sm md:text-md text-teal-800 font-raleway">Bizimle iletişime geçin</h5>
        <div className="grid grid-cols-4 gap-3">
          <a href="https://wa.me/905301493599" target="_blank" rel="noreferrer">
            <WhatsappIcon className="w-4 md:w-6 h-4 md:h-6 text-teal-800" />
          </a>
          <a href="https://instagram.com/veticube" target="_blank" rel="noreferrer">
            <InstagramIcon className="w-4 md:w-6 h-4 md:h-6 text-teal-800" />
          </a>
          <a href="https://youtube.com/veticube" target="_blank" rel="noreferrer">
            <YoutubeIcon className="w-4 md:w-6 h-4 md:h-6 text-teal-800" />
          </a>
          <a href="mailto:info@veticube.com" target="_blank" rel="noreferrer">
            <MailIcon className="w-4 md:w-6 h-4 md:h-6 text-teal-800" />
          </a>
        </div>
      </div>
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 px-4 md:px-24 py-6 border-b border-teal-200">
        <div className="w-full flex flex-col items-start justify-center gap-4">
          <h5 className="text-sm md:text-md text-teal-900">Hakkımızda</h5>
          <ul className="w-full flex flex-col items-start justify-start gap-2 font-raleway">
            <li className="text-xs md:text-sm text-teal-700">Veticube hakkında</li>
            <li className="text-xs md:text-sm text-teal-700">Blog</li>
            <li className="text-xs md:text-sm text-teal-700">İletişim</li>
          </ul>
        </div>
        <div className="w-full flex flex-col items-start justify-center gap-4">
          <h5 className="text-sm md:text-md text-teal-900">Hizmetler</h5>
          <ul className="w-full flex flex-col items-start justify-start gap-2 font-raleway">
            <li className="text-xs md:text-sm text-teal-700">Yoğun Bakım Ünitesi</li>
            <li className="text-xs md:text-sm text-teal-700">Klinik Yönetim Sistemi</li>
            <li className="text-xs md:text-sm text-teal-700">Veteriner Yazılımları</li>
          </ul>
        </div>
        <div className="w-full flex flex-col items-start justify-center gap-4">
          <h5 className="text-sm md:text-md text-teal-900">Gizlilik ve Güvenlik</h5>
          <ul className="w-full flex flex-col items-start justify-start gap-2 font-raleway">
            <li className="text-xs md:text-sm text-teal-700">Gizlilik Politikası</li>
            <li className="text-xs md:text-sm text-teal-700">Kullanım Koşulları</li>
            <li className="text-xs md:text-sm text-teal-700">Güvenlik</li>
          </ul>
        </div>
        <div className="w-full flex flex-col items-start justify-center gap-4">
          <h5 className="text-sm md:text-md text-teal-900">Sosyal Medya</h5>
          <ul className="w-full flex flex-col items-start justify-start gap-2 font-raleway">
            <li className="text-xs md:text-sm text-teal-700">Instagram</li>
            <li className="text-xs md:text-sm text-teal-700">Youtube</li>
            <li className="text-xs md:text-sm text-teal-700">Whatsapp</li>
          </ul>
        </div>
      </div>
      <div className="w-full flex flex-row items-center justify-between gap-4 px-4 md:px-24 py-4">
        <span className="text-xs md:text-sm text-teal-900 font-raleway">© 2023 Veticube. Tüm hakları saklıdır.</span>
        <span className="text-xs md:text-sm text-teal-900 font-raleway">info@veticube.com</span>
      </div>
    </div>
  );
};

function Home() {
  return (
    <main className="w-full flex flex-col items-center justify-start">
      <WhatsappButton />
      <Navbar />
      <section className="w-full flex flex-col items-center justify-start">
        <WelcomeSection />
        {/* <PricingSection /> */}
      </section>
      <Footer />
    </main>
  );
}

export default Home;
