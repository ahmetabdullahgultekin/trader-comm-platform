import React from 'react';
import {motion} from 'framer-motion';
import {Shield} from 'lucide-react';
import {useTranslation} from '../hooks';
import SEO from '../components/common/SEO';

const PrivacyPolicyPage: React.FC = () => {
    const {t} = useTranslation();

    return (
        <>
            <SEO
                title="Gizlilik Politikası | Fahri Eren"
                description="Fahri Eren - Kişisel verilerinizin korunması ve gizlilik politikamız hakkında detaylı bilgi."
                keywords={['gizlilik politikası', 'kişisel verilerin korunması', 'KVKK', 'veri güvenliği', 'çerez politikası', 'Google AdSense']}
            />

            <div className="min-h-screen bg-gray-50 py-12">
                <div className="container mx-auto px-4 max-w-4xl">
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        className="bg-white rounded-lg shadow-lg p-8"
                    >
                        {/* Header */}
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                                <Shield className="w-8 h-8 text-blue-600"/>
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                                    Gizlilik Politikası
                                </h1>
                                <p className="text-gray-600 mt-1">
                                    Son Güncelleme: 21 Ekim 2025
                                </p>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="prose prose-lg max-w-none space-y-8">
                            {/* Introduction */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Giriş</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    Fahri Eren olarak, fahrieren.com web sitesini ziyaret eden kullanıcılarımızın
                                    gizliliğine büyük önem veriyoruz. Bu Gizlilik Politikası, kişisel verilerinizin
                                    nasıl toplandığını, kullanıldığını, saklandığını ve korunduğunu açıklamaktadır.
                                    Web sitemizi kullanarak bu politikayı kabul etmiş sayılırsınız.
                                </p>
                                <p className="text-gray-700 leading-relaxed mt-4">
                                    Bu politika, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) ve ilgili
                                    mevzuata uygun olarak hazırlanmıştır.
                                </p>
                            </section>

                            {/* Data Collection */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                    2. Toplanan Bilgiler
                                </h2>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Web sitemizi ziyaret ettiğinizde ve hizmetlerimizi kullandığınızda aşağıdaki
                                    bilgiler toplanabilir:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                    <li>
                                        <strong>İletişim Bilgileri:</strong> İsim, e-posta adresi, telefon numarası
                                        (iletişim formunu doldurduğunuzda)
                                    </li>
                                    <li>
                                        <strong>Teknik Bilgiler:</strong> IP adresi, tarayıcı türü, işletim sistemi,
                                        cihaz bilgileri
                                    </li>
                                    <li>
                                        <strong>Kullanım Verileri:</strong> Ziyaret edilen sayfalar, geçirilen süre,
                                        tıklama verileri
                                    </li>
                                    <li>
                                        <strong>Çerez Verileri:</strong> Tercihleriniz ve site kullanım
                                        alışkanlıklarınız
                                    </li>
                                </ul>
                            </section>

                            {/* Data Usage */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                    3. Bilgilerin Kullanımı
                                </h2>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Topladığımız bilgileri aşağıdaki amaçlarla kullanırız:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                    <li>İletişim taleplerinize yanıt vermek ve müşteri hizmeti sağlamak</li>
                                    <li>Ürün ve hizmetlerimiz hakkında bilgi vermek</li>
                                    <li>Web sitesi performansını iyileştirmek ve kullanıcı deneyimini optimize etmek
                                    </li>
                                    <li>Yasal yükümlülüklerimizi yerine getirmek</li>
                                    <li>Güvenlik ve dolandırıcılık önleme amacıyla</li>
                                    <li>İstatistiksel analiz ve pazar araştırması yapmak</li>
                                </ul>
                            </section>

                            {/* Google AdSense */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                    4. Google AdSense ve Reklamcılık
                                </h2>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Web sitemiz Google AdSense kullanmaktadır. Google AdSense, ilgi alanlarınıza uygun
                                    reklamlar göstermek için çerezler kullanır.
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                    <li>
                                        Google, sizin veya diğer kullanıcıların web sitelerine yaptıkları önceki
                                        ziyaretleri
                                        temel alarak reklamlar göstermek için çerezler kullanır
                                    </li>
                                    <li>
                                        Google'ın reklam çerezlerini kullanması, Google'a ve iş ortaklarına
                                        internet'teki
                                        sitemizi ve/veya diğer siteleri ziyaretinize dayanarak reklam gösterme olanağı
                                        sağlar
                                    </li>
                                    <li>
                                        Kullanıcılar{' '}
                                        <a
                                            href="https://www.google.com/settings/ads"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline"
                                        >
                                            Reklam Ayarları
                                        </a>{' '}
                                        sayfasını ziyaret ederek kişiselleştirilmiş reklamcılığı devre dışı bırakabilir
                                    </li>
                                </ul>
                            </section>

                            {/* Cookies */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Çerezler (Cookies)</h2>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Web sitemiz, kullanıcı deneyimini iyileştirmek için çerezler kullanır. Çerezler,
                                    cihazınıza kaydedilen küçük metin dosyalarıdır.
                                </p>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    <strong>Kullandığımız çerez türleri:</strong>
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                    <li><strong>Zorunlu Çerezler:</strong> Web sitesinin çalışması için gerekli</li>
                                    <li><strong>Performans Çerezleri:</strong> Site performansını analiz etmek için</li>
                                    <li><strong>Fonksiyonel Çerezler:</strong> Tercihlerinizi hatırlamak için</li>
                                    <li><strong>Reklam Çerezleri:</strong> İlgili reklamlar göstermek için</li>
                                </ul>
                                <p className="text-gray-700 leading-relaxed mt-4">
                                    Tarayıcı ayarlarınızdan çerezleri yönetebilir veya silebilirsiniz.
                                </p>
                            </section>

                            {/* Data Security */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Veri Güvenliği</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    Kişisel verilerinizin güvenliğini sağlamak için endüstri standardı güvenlik
                                    önlemleri
                                    alıyoruz. Ancak, internet üzerinden veri iletiminin veya elektronik depolamanın
                                    %100 güvenli olduğunu garanti edemeyiz. Verilerinizi korumak için elimizden geleni
                                    yapıyoruz.
                                </p>
                            </section>

                            {/* Third Party Services */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                    7. Üçüncü Taraf Hizmetler
                                </h2>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Web sitemiz aşağıdaki üçüncü taraf hizmetleri kullanabilir:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                    <li><strong>Google AdSense:</strong> Reklam gösterimi</li>
                                    <li><strong>Google Analytics:</strong> Web sitesi analizi (eğer kullanılıyorsa)</li>
                                    <li><strong>Google Maps:</strong> Konum gösterimi</li>
                                    <li><strong>WhatsApp:</strong> İletişim kolaylığı</li>
                                </ul>
                                <p className="text-gray-700 leading-relaxed mt-4">
                                    Bu hizmetlerin kendi gizlilik politikaları vardır ve bu politikaları incelemenizi
                                    öneririz.
                                </p>
                            </section>

                            {/* User Rights */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Kullanıcı Hakları</h2>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    KVKK kapsamında aşağıdaki haklara sahipsiniz:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                    <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                                    <li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme</li>
                                    <li>Kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp
                                        kullanılmadığını öğrenme
                                    </li>
                                    <li>Kişisel verilerinizin yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri
                                        bilme
                                    </li>
                                    <li>Kişisel verilerinizin eksik veya yanlış işlenmiş olması hâlinde bunların
                                        düzeltilmesini isteme
                                    </li>
                                    <li>Kişisel verilerinizin silinmesini veya yok edilmesini isteme</li>
                                </ul>
                            </section>

                            {/* Children's Privacy */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Çocukların Gizliliği</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    Web sitemiz 18 yaşın altındaki kullanıcılara yönelik değildir. Bilerek 18 yaşından
                                    küçük çocuklardan kişisel bilgi toplamıyoruz. Eğer 18 yaşından küçük bir çocuğun
                                    bize kişisel bilgi verdiğini fark ederseniz, lütfen bizimle iletişime geçin.
                                </p>
                            </section>

                            {/* Changes */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                    10. Politika Değişiklikleri
                                </h2>
                                <p className="text-gray-700 leading-relaxed">
                                    Bu Gizlilik Politikasını zaman zaman güncelleyebiliriz. Değişiklikler bu sayfada
                                    yayınlanacak ve "Son Güncelleme" tarihi güncellenecektir. Önemli değişikliklerde
                                    kullanıcılarımızı bilgilendireceğiz.
                                </p>
                            </section>

                            {/* Contact */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. İletişim</h2>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Gizlilik Politikamız hakkında sorularınız veya endişeleriniz varsa, bizimle
                                    iletişime geçebilirsiniz:
                                </p>
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <p className="text-gray-700 mb-2">
                                        <strong>İsim:</strong> Fahri Eren
                                    </p>
                                    <p className="text-gray-700 mb-2">
                                        <strong>Telefon:</strong> +90 532 617 16 35
                                    </p>
                                    <p className="text-gray-700 mb-2">
                                        <strong>E-posta:</strong> info@fahrieren.com
                                    </p>
                                    <p className="text-gray-700">
                                        <strong>Adres:</strong> Yeşilova, Antalya, Türkiye
                                    </p>
                                </div>
                            </section>

                            {/* Legal */}
                            <section className="border-t pt-8 mt-8">
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    Bu Gizlilik Politikası, Türkiye Cumhuriyeti yasalarına tabidir. Bu politika
                                    ile ilgili anlaşmazlıkların çözümünde Antalya mahkemeleri ve icra daireleri
                                    yetkilidir.
                                </p>
                            </section>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default PrivacyPolicyPage;
