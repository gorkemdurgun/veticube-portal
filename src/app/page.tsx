"use server";

import {
  PiInstagramLogo as InstagramIcon,
  PiWhatsappLogo as WhatsappIcon,
  PiYoutubeLogo as YoutubeIcon,
  PiEnvelopeSimple as MailIcon,
  PiCalendarDotsDuotone as CalendarIcon,
  PiRocketLaunchDuotone as RocketIcon,
  PiGlobeHemisphereWestDuotone as GlobeIcon,
  PiRankingDuotone as RankingIcon,
  PiHeadCircuitDuotone as AIIcon,
  PiPackageDuotone as StockIcon,
} from "react-icons/pi";

import { Card, FloatButton, Tooltip } from "antd";
import Image from "next/image";
import Link from "next/link";

import { png, svg } from "@/assets";

import CustomButton from "@/components/common/custom-button";

import type { TooltipProps } from "antd";
import type { IconType } from "react-icons";

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

const Navbar = () => {
  return (
    <nav className="w-full flex flex-row items-center justify-between gap-4 p-4 bg-green-50 shadow-md">
      <div className="w-full grid grid-cols-3 px-8 md:px-24">
        <div className="flex flex-row items-center justify-center md:justify-start gap-2">
          <Image width={64} height={64} src={png.Logo} alt="veticube-logo" />
          <span className="text-3xl text-green-600 font-semibold font-oswald">VETICUBE</span>
        </div>
        <div className="flex flex-row items-center justify-center gap-6">
          <Link href="#">
            <span className="text-sm text-green-900 font-raleway">Özellikler</span>
          </Link>
          <Link href="#">
            <span className="text-sm text-green-900 font-raleway">Fiyatlandırma</span>
          </Link>
          <Link href="#">
            <span className="text-sm text-green-900 font-raleway">Blog</span>
          </Link>
          <Link href="#">
            <span className="text-sm text-green-900 font-raleway">İletişim</span>
          </Link>
        </div>
        <div className="flex items-center justify-end">
          <Link href="/demo">
            <CustomButton className="!px-12" variant="primary-faded">
              Ücretsiz Dene!
            </CustomButton>
          </Link>
        </div>
      </div>
    </nav>
  );
};
const WelcomeSection = () => {
  const FeatureTooltip = ({
    icon,
    title,
    iconClassName,
    placement,
  }: {
    icon: IconType;
    title: string;
    iconClassName: string;
    placement: TooltipProps["placement"];
  }) => {
    return (
      <Tooltip
        className="cursor-pointer"
        placement={placement}
        arrow={false}
        title={title}
        overlayInnerStyle={{
          width: "fit-content",
          padding: "8px 16px",
          textAlign: "center",
          backgroundColor: "#fff",
          color: "#67676c",
          font: "normal normal 600 14px/16px Raleway",
        }}
      >
        {icon && icon({ className: `absolute w-20 h-20 text-gray-500 bg-gray-50/50 p-3 rounded-full shadow-xl ${iconClassName}` })}
      </Tooltip>
    );
  };

  return (
    <section className="w-full flex flex-col items-center justify-start gap-4 pt-4 md:pt-12 bg-gradient-green-50-200">
      <div className="relative w-full flex px-8 md:px-24">
        <FeatureTooltip
          placement="bottom"
          icon={RankingIcon}
          iconClassName="-top-8 left-64"
          title="Rakiplerinizden önde olun, işletmenizi geliştirin"
        />
        <FeatureTooltip
          placement="rightBottom"
          icon={CalendarIcon}
          iconClassName="top-8 left-16"
          title="Takvim yönetimi ile işlerinizi kolayca organize edin"
        />
        <FeatureTooltip
          placement="top"
          icon={AIIcon}
          iconClassName="-bottom-8 left-48"
          title="Yapay zeka destekli çözümler ile günlük işlerinizi hızlandırın"
        />
        <FeatureTooltip
          placement="bottom"
          icon={GlobeIcon}
          iconClassName="-top-8 right-48"
          title="Geleneksel çözümleri aşın, güncel teknolojileri kullanın"
        />
        <FeatureTooltip
          placement="right"
          icon={RocketIcon}
          iconClassName="bottom-8 right-16"
          title="Verimliliğinizi artırın, maliyetlerinizi düşürün"
        />
        <FeatureTooltip
          placement="left"
          icon={StockIcon}
          iconClassName="-bottom-8 right-64"
          title="Stoklarınızı ve envanterinizi kolayca yönetin, kayıpları azaltın"
        />
        <div className="w-full flex flex-col items-center justify-center text-center py-6 px-4 bg-white rounded-2xl">
          <span className="text-5xl text-teal-900 font-semibold font-oswald">
            Kliniğini
            <span className="heading-gradient-teal-1"> üst düzey teknoloji ile</span>&nbsp;
            <span className="heading-gradient-green-2 border-b-4 border-green-400">en verimli şekilde</span>&nbsp;yönet!
          </span>
          <p className="w-full text-lg text-gray-700 font-raleway py-4">
            Veteriner kliniğinizin yönetimini kolaylaştırmak ve iş süreçlerinizi geliştirmek için size özel çözümler sunuyoruz.
            <br />
            Hemen başlayın, ücretsiz deneme fırsatını kaçırmayın!
          </p>
          <CustomButton size="md" className="mt-4 px-8 md:px-24 !font-[500] shadow-xl" variant="secondary-faded">
            Hemen Başla, Ücretsiz Dene!
          </CustomButton>
        </div>
      </div>
    </section>
  );
};
const FeaturesSection = () => {
  return (
    <section className="w-full flex flex-col items-center justify-start gap-4 py-8 md:py-12 bg-green-200">
      <div className="w-full flex flex-col items-center justify-center gap-4">
        <h2 className="text-3xl text-teal-900 font-semibold font-oswald">Neler Yapıyoruz?</h2>
        <p className="text-lg text-gray-700 font-raleway">Veteriner kliniğiniz için size özel çözümler sunuyoruz.</p>
      </div>
    </section>
  );
};
const Footer = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center pt-8 md:pt-12 bg-white">
      <div className="w-full flex items-center justify-between px-4 md:px-24 pb-2 border-b border-green-200">
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
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 px-4 md:px-24 py-6 border-b border-green-200">
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
      <FloatButton type="primary" icon={<WhatsappIcon className="text-green-100" />} />
      <Navbar />
      <div className="min-h-screen w-full flex flex-col">
        <WelcomeSection />
        <FeaturesSection />
      </div>
      <Footer />
    </main>
  );
}

export default Home;
