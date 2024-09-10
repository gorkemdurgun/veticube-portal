"use server";

import {
  PiUserPlus as RegisterIcon,
  PiSignIn as LoginIcon,
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
  PiMapPin as StepsStartIcon,
  PiStethoscope as StepsHealthIcon,
  PiSyringe as StepsVaccinationIcon,
  PiTestTube as StepsTestIcon,
  PiTable as StepsTableIcon,
  PiCalendarDots as StepsCalendarIcon,
  PiCaretRight as ArrowIcon,
} from "react-icons/pi";

import { Card, FloatButton, Tooltip, Image as AntdImage, Calendar, Timeline, Tag, Divider } from "antd";
import Image from "next/image";
import Link from "next/link";

import { png, svg } from "@/assets";

import CustomButton from "@/components/common/custom-button";

import type { TooltipProps } from "antd";
import type { IconType } from "react-icons";

const Navbar = () => {
  return (
    <nav className="w-full flex flex-row items-center justify-between gap-4 p-4 bg-white shadow-md">
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 px-4 lg:px-32">
        <div className="flex flex-row items-center justify-start lg:justify-start gap-2">
          <div className="relative w-8 h-8 sm:w-16 sm:h-16">
            <Image src={png.Logo} alt="veticube-logo" layout="fill" />
          </div>
          <span className="text-lg sm:text-3xl text-green-600 font-semibold font-oswald">VETICUBE</span>
        </div>
        <div className="hidden sm:flex flex-row items-center justify-center gap-6">
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
        <div className="flex items-center justify-end gap-0 sm:gap-3">
          <Link href="/demo">
            <CustomButton variant="primary-text">
              <RegisterIcon className="w-5 h-5 mr-1" />
              <span className="hidden sm:block">Kayıt Ol</span>
            </CustomButton>
          </Link>
          <Link href="/login">
            <CustomButton variant="primary-text">
              <LoginIcon className="w-5 h-5 mr-1" />
              <span className="hidden sm:block">Giriş Yap</span>
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
        className="hidden lg:flex pointer-events-none lg:cursor-pointer"
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
        {icon &&
          icon({
            className: `absolute w-10 h-10 md:w-12 md:w-12 lg:w-20 lg:h-20 text-gray-500 bg-gray-50/50 p-2 lg:p-3 rounded-full shadow-xl ${iconClassName}`,
          })}
      </Tooltip>
    );
  };

  return (
    <section className="w-full pb-4 pt-6 lg:pb-12 lg:pt-24 bg-gradient-green-0-50">
      <div className="w-full relative flex px-4 lg:px-32">
        <FeatureTooltip
          placement="bottom"
          icon={RankingIcon}
          iconClassName="-top-6 lg:-top-12 left-12 lg:left-64"
          title="Rakiplerinizden önde olun, işletmenizi geliştirin"
        />
        <FeatureTooltip
          placement="rightBottom"
          icon={CalendarIcon}
          iconClassName="-top-6 lg:top-12 left-20 lg:left-16"
          title="Takvim yönetimi ile işlerinizi kolayca organize edin"
        />
        <FeatureTooltip
          placement="top"
          icon={AIIcon}
          iconClassName="bottom-auto lg:-bottom-12 -top-6 lg:top-auto left-28"
          title="Yapay zeka destekli çözümler ile günlük işlerinizi hızlandırın"
        />
        <FeatureTooltip
          placement="bottom"
          icon={GlobeIcon}
          iconClassName="-top-6 lg:-top-8 right-auto lg:right-48 left-36 lg:left-auto"
          title="Geleneksel çözümleri aşın, güncel teknolojileri kullanın"
        />
        <FeatureTooltip
          placement="right"
          icon={RocketIcon}
          iconClassName="bottom-auto lg:bottom-8 -top-6 lg:top-auto right-auto lg:right-16 left-44 lg:left-auto"
          title="Verimliliğinizi artırın, maliyetlerinizi düşürün"
        />
        <FeatureTooltip
          placement="left"
          icon={StockIcon}
          iconClassName="bottom-auto lg:-bottom-8 -top-6 lg:top-auto right-auto lg:right-64 left-52 lg:left-auto"
          title="Stoklarınızı ve envanterinizi kolayca yönetin, kayıpları azaltın"
        />
        <div className="w-full flex flex-col items-center justify-center text-center py-6 px-4 bg-green-600/10 rounded-2xl">
          <span className="text-2xl sm:text-4xl md:text-5xl text-teal-900 font-semibold font-oswald">
            Kliniğini
            <span className="heading-gradient-teal-1"> üst düzey teknoloji ile</span>&nbsp;
            <br className="flex lg:hidden" />
            <span className="heading-gradient-green-2 border-b-4 border-green-400">en verimli şekilde</span>&nbsp;yönet!
          </span>
          <p className="w-full text-xs sm:text-lg text-teal-700 font-raleway py-6 sm:py-4">
            Veteriner kliniğinizdeki iş süreçlerini geliştirmek için size özel çözümler sunuyoruz.
            <br className="hidden lg:flex" /> Hemen başlayın, ücretsiz deneme fırsatını kaçırmayın!
          </p>
          <CustomButton className="mt-0 lg:mt-4 px-8 sm:px-32 shadow-xl" variant="secondary-opaque">
            Hemen Başla, Ücretsiz Dene!
          </CustomButton>
        </div>
      </div>
    </section>
  );
};
const FeaturesSection = () => {
  return (
    <section className="w-full pb-4 pt-6 lg:pb-12 lg:pt-12 bg-gradient-green-0-50-reverse">
      <div className="relative w-full flex flex-col items-center justify-center text-center px-4 lg:px-32">
        <h5 className="text-lg sm:text-3xl text-teal-900 font-raleway font-semibold mb-2 mt-4 lg:mt-12">Tedavi sürecini baştan sona yönetin</h5>
        <p className="text-xs sm:text-lg text-teal-700 font-raleway text-center mb-4 lg:mb-8">
          Tedavi sürecinin her aşamasını adım adım takip edin, süreci tam anlamıyla kontrol edin.
          <br className="hidden lg:flex" />
          <span className="hidden sm:block">Hasta kabulünden muayeneye, tedavi planından ürün satışına, tüm süreci senkronize ilerletin.</span>
        </p>
        <div className="w-full flex flex-col gap-4 p-6 mt-2 rounded-t-xl bg-white">
          {/* Feature 1 */}
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_600px] items-center gap-6 sm:gap-12">
            <div className="flex flex-col items-center gap-4">
              <span className="heading-gradient-green-1 text-lg sm:text-2xl font-semibold">
                Otonom Sistem
                <br />
                <span className="heading-gradient-green-2">Kliniğinizin yönetimini kolaylaştırın</span>
              </span>
              <p className="lg:max-w-[600px] text-xs sm:text-md text-gray-600 font-raleway">
                Her adımı tek tek yönetmenize gerek kalmadan, kliniğinizdeki süreçleri otomatik hale getirin. Bu sayede operasyonel verimliliği
                artırırken, zamandan tasarruf edebilirsiniz. Sistemimiz, gereksiz iş yükünü azaltarak kliniğinizin sorunsuz çalışmasını sağlar.
              </p>
            </div>
            <div className="pointer-events-none flex items-center justify-center p-4 bg-gray-50 rounded-2xl">
              <Timeline
                className=" mt-8 -mb-8 text-start text-teal-800"
                mode="left"
                items={[
                  {
                    dot: <StepsStartIcon className="w-5 h-5" />,
                    children: (
                      <span className="inline-flex flex-col sm:flex-row items-start sm:items-center gap-2 mt-1">
                        (06/09/2024 - 12:00)
                        <ArrowIcon className="hidden sm:block" />
                        <span className="font-semibold"> Hasta kliniğe getirildi</span>
                      </span>
                    ),
                  },
                  {
                    dot: <StepsHealthIcon className="w-5 h-5" />,
                    children: (
                      <span className="inline-flex flex-col sm:flex-row items-start sm:items-center gap-2 mt-1">
                        (06/09/2024 - 13:30)
                        <ArrowIcon className="hidden sm:block" />
                        <span className="font-semibold"> Genel muayene edildi</span>
                      </span>
                    ),
                  },
                  {
                    dot: <StepsVaccinationIcon className="w-5 h-5" />,
                    children: (
                      <span className="inline-flex flex-col sm:flex-row items-start sm:items-center gap-2 mt-1">
                        (06/09/2024 - 14:00)
                        <ArrowIcon className="hidden sm:block" />
                        <span className="font-semibold"> İç - Dış Parazit aşısı yapıldı</span>
                      </span>
                    ),
                  },
                  {
                    dot: <StepsTestIcon className="w-5 h-5" />,
                    children: (
                      <span className="inline-flex flex-col sm:flex-row items-start sm:items-center  gap-2 mt-1">
                        (06/09/2024 - 14:40)
                        <ArrowIcon className="hidden sm:block" />
                        <span className="font-semibold"> Biyokimya için kan alındı</span>
                      </span>
                    ),
                  },
                  {
                    dot: <StepsTableIcon className="w-5 h-5" />,
                    children: (
                      <span className="inline-flex flex-col sm:flex-row items-start sm:items-center gap-2 mt-1">
                        (06/09/2024 - 15:00)
                        <ArrowIcon className="hidden sm:block" />
                        <span className="font-semibold"> Tedavi programı oluşturuldu</span>
                      </span>
                    ),
                  },
                  {
                    dot: <StepsCalendarIcon className="w-5 h-5" />,
                    children: (
                      <span className="inline-flex flex-col sm:flex-row items-start sm:items-center  gap-2 mt-1">
                        (06/09/2024 - 15:30)
                        <ArrowIcon className="hidden sm:block" />
                        <span className="font-semibold"> Kontrol için randevu alındı</span>
                      </span>
                    ),
                  },
                ]}
              />
            </div>
          </div>
          <Divider />
          {/* Feature 2 */}
          <div className="grid grid-cols-1 xl:grid-cols-[600px_1fr] items-center gap-6 sm:gap-12">
            <div className="order-unset xl:order-1 flex flex-col items-center gap-4">
              <span className="heading-gradient-green-1 text-lg sm:text-2xl font-semibold">
                Verilerin Gücünü Keşfedin
                <br />
                <span className="heading-gradient-green-2">Karmaşık verileri anlamlandırın</span>
              </span>
              <p className="lg:max-w-[600px] text-xs sm:text-md text-gray-600 font-raleway">
                Verilerinizi etkili ve anlaşılır grafiklere dönüştürüyoruz, böylece istatistiksel bilgileri kolayca analiz edebilir ve stratejik
                kararlar alabilirsiniz. Gelişmiş görselleştirme araçlarımızla, karmaşık verileri sadeleştirerek, iş süreçlerinize netlik ve hız
                kazandırıyoruz.
              </p>
            </div>
            <div className="pointer-events-none flex items-center justify-center p-4 bg-gray-50 rounded-2xl">
              <Image src={png.FeaturesChart} alt="feature-2" className="w-full max-w-[500px] h-auto" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
const ScreenshotsSection = () => {
  return (
    <section className="w-full pb-4 pt-6 lg:pb-12 lg:pt-12 bg-gradient-green-0-100">
      <div className="relative w-full flex flex-col items-center justify-center text-center px-4 lg:px-32">
        <h5 className="text-lg sm:text-3xl text-teal-900 font-raleway font-semibold mb-2 mt-4 lg:mt-12">Uygulama içine göz gezdirin</h5>
        <p className="text-xs sm:text-lg text-teal-700 font-raleway text-center mb-4 lg:mb-8">
          Ürünümüzün sunduğu özellikleri keşfetmek için ekran görüntülerine göz atın ve nasıl çalıştığını görün.
        </p>
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 p-2 sm:p-3 rounded-t-xl bg-white">
          <div className="relative flex items-center rounded-md bg-gray-100">
            <AntdImage
              alt="screenshot-1"
              src="https://cdn.dribbble.com/userupload/6457402/file/original-39d52d099d770ddab2f098db46f008d1.png?resize=1024x768&vertical=center"
            />
          </div>
          <div className="relative flex items-center rounded-md bg-gray-100">
            <AntdImage
              alt="screenshot-2"
              src="https://cdn.dribbble.com/userupload/6457404/file/original-9e44e82dd0a3f236113331bd7bc298ff.png?resize=1024x768&vertical=center"
            />
          </div>
          <div className="relative flex items-center rounded-md bg-gray-100">
            <AntdImage
              alt="screenshot-3"
              src="https://cdn.dribbble.com/userupload/6457405/file/original-bb57507e8c98a3f06cf58ae5d9bef090.png?resize=1024x768&vertical=center"
            />
          </div>
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 p-2 sm:p-3 rounded-b-xl bg-white">
          <div className="relative flex items-center rounded-md bg-gray-100">
            <AntdImage
              alt="screenshot-4"
              src="https://cdn.dribbble.com/userupload/6019897/file/original-ab082e26bcdc4ca092ac3499ace67b3b.png?resize=1024x768&vertical=center"
            />
          </div>
          <div className="relative flex items-center rounded-md bg-gray-100">
            <AntdImage
              alt="screenshot-5"
              src="https://cdn.dribbble.com/userupload/6019895/file/original-348d4f9a547fe9012ff443acf1f59c0e.png?resize=1024x768&vertical=center"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
const TrustedBrands = () => {
  return (
    <section className="w-full pb-4 pt-6 lg:pb-12 lg:pt-12 bg-green-100">
      <div className="relative w-full flex flex-col items-center justify-center px-0">
        <div className="w-full flex flex-col items-center justify-center px-4 lg:px-32">
          <h5 className="text-lg sm:text-3xl text-teal-900 font-raleway font-semibold mb-2 mt-4 lg:mt-12">İş ortaklarımız ve müşterilerimiz</h5>
          <span className="text-xs sm:text-lg text-teal-700 font-raleway text-center mb-4 lg:mb-8">
            Kaliteli çözümler ile, sektördeki en güçlü klinikler arasında siz de hemen yerinizi alın.
            <br />
            <span className="hidden sm:block">
              Veticube ailesine katılarak, yenilikçi ve gelişmiş çözümlerimizle iş süreçlerinizi optimize edin, farkınızı ortaya koyun.
            </span>
          </span>
        </div>
        <div className="group w-full overflow-x-auto scrollbar-hide flex items-center justify-around gap-4 sm:gap-12 pt-0 sm:pt-4">
          <Image
            width={96}
            height={96}
            src={png.Brand1}
            alt="brand-1"
            className="scale-[0.6] sm:scale-100 grayscale group-hover:grayscale-0 transition-all duration-300"
          />
          <Image
            width={96}
            height={96}
            src={png.Brand2}
            alt="brand-2"
            className="scale-[0.6] sm:scale-100 grayscale group-hover:grayscale-0 transition-all duration-300"
          />
          <Image
            width={96}
            height={96}
            src={png.Brand3}
            alt="brand-3"
            className="scale-[0.6] sm:scale-100 grayscale group-hover:grayscale-0 transition-all duration-300"
          />
          <Image
            width={96}
            height={96}
            src={png.Brand4}
            alt="brand-4"
            className="scale-[0.6] sm:scale-100 grayscale group-hover:grayscale-0 transition-all duration-300"
          />
          <Image
            width={96}
            height={96}
            src={png.Brand5}
            alt="brand-5"
            className="scale-[0.6] sm:scale-100 grayscale group-hover:grayscale-0 transition-all duration-300"
          />
          <Image
            width={96}
            height={96}
            src={png.Brand6}
            alt="brand-6"
            className="scale-[0.6] sm:scale-100 grayscale group-hover:grayscale-0 transition-all duration-300"
          />
        </div>
      </div>
    </section>
  );
};
const Footer = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center pt-8 lg:pt-12 bg-white">
      <div className="w-full flex items-center justify-between px-4 lg:px-32 pb-2 border-b border-green-200">
        <h5 className="text-sm lg:text-md text-teal-800 font-raleway">Bizimle iletişime geçin</h5>
        <div className="grid grid-cols-4 gap-3">
          <a href="https://wa.me/905301493599" target="_blank" rel="noreferrer">
            <WhatsappIcon className="w-4 lg:w-6 h-4 lg:h-6 text-teal-800" />
          </a>
          <a href="https://instagram.com/veticube" target="_blank" rel="noreferrer">
            <InstagramIcon className="w-4 lg:w-6 h-4 lg:h-6 text-teal-800" />
          </a>
          <a href="https://youtube.com/veticube" target="_blank" rel="noreferrer">
            <YoutubeIcon className="w-4 lg:w-6 h-4 lg:h-6 text-teal-800" />
          </a>
          <a href="mailto:info@veticube.com" target="_blank" rel="noreferrer">
            <MailIcon className="w-4 lg:w-6 h-4 lg:h-6 text-teal-800" />
          </a>
        </div>
      </div>
      <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4 px-4 lg:px-32 py-6 border-b border-green-200">
        <div className="w-full flex flex-col items-start justify-center gap-4">
          <h5 className="text-sm lg:text-md text-teal-900">Hakkımızda</h5>
          <ul className="w-full flex flex-col items-start justify-start gap-2 font-raleway">
            <li className="text-xs lg:text-sm text-teal-700">Veticube hakkında</li>
            <li className="text-xs lg:text-sm text-teal-700">Blog</li>
            <li className="text-xs lg:text-sm text-teal-700">İletişim</li>
          </ul>
        </div>
        <div className="w-full flex flex-col items-start justify-center gap-4">
          <h5 className="text-sm lg:text-md text-teal-900">Hizmetler</h5>
          <ul className="w-full flex flex-col items-start justify-start gap-2 font-raleway">
            <li className="text-xs lg:text-sm text-teal-700">Yoğun Bakım Ünitesi</li>
            <li className="text-xs lg:text-sm text-teal-700">Klinik Yönetim Sistemi</li>
            <li className="text-xs lg:text-sm text-teal-700">Veteriner Yazılımları</li>
          </ul>
        </div>
        <div className="w-full flex flex-col items-start justify-center gap-4">
          <h5 className="text-sm lg:text-md text-teal-900">Gizlilik ve Güvenlik</h5>
          <ul className="w-full flex flex-col items-start justify-start gap-2 font-raleway">
            <li className="text-xs lg:text-sm text-teal-700">Gizlilik Politikası</li>
            <li className="text-xs lg:text-sm text-teal-700">Kullanım Koşulları</li>
            <li className="text-xs lg:text-sm text-teal-700">Güvenlik</li>
          </ul>
        </div>
        <div className="w-full flex flex-col items-start justify-center gap-4">
          <h5 className="text-sm lg:text-md text-teal-900">Sosyal Medya</h5>
          <ul className="w-full flex flex-col items-start justify-start gap-2 font-raleway">
            <li className="text-xs lg:text-sm text-teal-700">Instagram</li>
            <li className="text-xs lg:text-sm text-teal-700">Youtube</li>
            <li className="text-xs lg:text-sm text-teal-700">Whatsapp</li>
          </ul>
        </div>
      </div>
      <div className="w-full flex flex-row items-center justify-between gap-4 px-4 lg:px-32 py-4">
        <span className="text-xs lg:text-sm text-teal-900 font-raleway">© 2023 Veticube. Tüm hakları saklıdır.</span>
        <span className="text-xs lg:text-sm text-teal-900 font-raleway">info@veticube.com</span>
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
        <ScreenshotsSection />
        <TrustedBrands />
      </div>
      <Footer />
    </main>
  );
}

export default Home;
