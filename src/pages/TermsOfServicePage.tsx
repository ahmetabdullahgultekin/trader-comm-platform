import React from 'react';
import {motion} from 'framer-motion';
import {FileText} from 'lucide-react';
import {useTranslation} from '../hooks';
import SEO from '../components/common/SEO';

const TermsOfServicePage: React.FC = () => {
    const {t} = useTranslation();

    return (
        <>
            <SEO
                title="Kullanım Koşulları | Fahri Eren"
                description="Fahri Eren - Web sitesi kullanım koşulları ve şartları hakkında detaylı bilgi."
                keywords={['kullanım koşulları', 'hizmet şartları', 'yasal bildirim', 'kullanıcı sözleşmesi', 'ticaret', 'Fahri Eren']}
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
                                <FileText className="w-8 h-8 text-blue-600"/>
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                                    Kullanım Koşulları
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
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Genel Bilgiler</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    Bu web sitesi Fahri Eren tarafından işletilmektedir. Sitemizi ziyaret ederek
                                    ve kullanarak bu Kullanım Koşullarını kabul etmiş sayılırsınız. Eğer bu koşulları
                                    kabul etmiyorsanız, lütfen sitemizi kullanmayın.
                                </p>
                                <p className="text-gray-700 leading-relaxed mt-4">
                                    <strong>Web Sitesi:</strong> fahrieren.com<br/>
                                    <strong>İşletmeci:</strong> Fahri Eren<br/>
                                    <strong>Faaliyet Alanı:</strong> Emlak, Araç Alım-Satımı, Tarım Ürünleri, İnşaat
                                    Malzemeleri
                                </p>
                            </section>

                            {/* Services */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                    2. Hizmetlerimiz
                                </h2>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Fahrieren.com, aşağıdaki alanlarda bilgilendirme ve ticari faaliyet hizmeti sunar:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                    <li>
                                        <strong>Emlak:</strong> Konut, arsa, tarla ve ticari gayrimenkul alım-satım
                                        danışmanlığı
                                    </li>
                                    <li>
                                        <strong>Araç Alım-Satımı:</strong> İkinci el araç ticareti ve aracılık
                                        hizmetleri
                                    </li>
                                    <li>
                                        <strong>Tarım Ürünleri:</strong> Yumurta üretimi ve satışı (Eren Yumurta)
                                    </li>
                                    <li>
                                        <strong>İnşaat Malzemeleri:</strong> İnşaat malzemesi tedariki ve satışı
                                    </li>
                                </ul>
                                <p className="text-gray-700 leading-relaxed mt-4">
                                    Web sitemiz bilgilendirme amaçlıdır ve gösterilen ürünler/hizmetler stokta
                                    olmayabilir.
                                    Güncel bilgi için lütfen doğrudan iletişime geçin.
                                </p>
                            </section>

                            {/* User Responsibilities */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                    3. Kullanıcı Sorumlulukları
                                </h2>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Sitemizi kullanırken aşağıdaki kurallara uymayı kabul edersiniz:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                    <li>Yasalara uygun ve ahlaki şekilde kullanım</li>
                                    <li>Başkalarının haklarına saygılı davranış</li>
                                    <li>Yanıltıcı, yanlış veya eksik bilgi vermeme</li>
                                    <li>Siteyi zararlı yazılım, virüs veya benzeri tehditlerden koruma</li>
                                    <li>Telif hakları ve fikri mülkiyet haklarına saygı</li>
                                    <li>Ticari amaçlı spam veya istenmeyen içerik göndermeme</li>
                                    <li>Sistemleri veya güvenlik önlemlerini aşmaya çalışmama</li>
                                </ul>
                            </section>

                            {/* Intellectual Property */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                    4. Fikri Mülkiyet Hakları
                                </h2>
                                <p className="text-gray-700 leading-relaxed">
                                    Bu web sitesinde yer alan tüm içerik (metin, görsel, logo, tasarım, vb.)
                                    Fahri Eren'e aittir ve telif hakları ile korunmaktadır. İçeriğin izinsiz
                                    kopyalanması, çoğaltılması, dağıtılması veya kullanılması yasaktır.
                                </p>
                                <p className="text-gray-700 leading-relaxed mt-4">
                                    Sitede yer alan üçüncü taraf içerikler (Google Maps, reklamlar vb.) ilgili
                                    sahiplerinin mülkiyetindedir.
                                </p>
                            </section>

                            {/* Product Information */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                    5. Ürün ve Fiyat Bilgileri
                                </h2>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Web sitesinde gösterilen ürünler, fiyatlar ve özellikler bilgilendirme amaçlıdır:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                    <li>Ürün ve fiyat bilgileri önceden haber verilmeksizin değiştirilebilir</li>
                                    <li>Görseller temsilidir ve gerçek ürün farklılık gösterebilir</li>
                                    <li>Stok durumu anlık olarak değişebilir</li>
                                    <li>Yazım hataları ve teknik hatalar olabilir</li>
                                    <li>Nihai fiyat ve koşullar telefon/e-posta ile teyit edilmelidir</li>
                                </ul>
                            </section>

                            {/* Transactions */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                    6. Alım-Satım ve Sözleşmeler
                                </h2>
                                <p className="text-gray-700 leading-relaxed">
                                    Emlak, araç veya diğer ürünlerin alım-satımı için ayrı sözleşmeler düzenlenir.
                                    Web sitesi üzerinden sadece bilgi alışverişi ve ön görüşme yapılır. Resmi işlemler
                                    yüz yüze görüşme ve yasal belgelerle tamamlanır.
                                </p>
                                <p className="text-gray-700 leading-relaxed mt-4">
                                    Tüm alım-satım işlemleri Türkiye Cumhuriyeti yasalarına uygun şekilde
                                    gerçekleştirilir.
                                    Tapu, ruhsat ve diğer yasal süreçler ilgili resmi kurumlar aracılığıyla yapılır.
                                </p>
                            </section>

                            {/* Liability */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                    7. Sorumluluk Sınırlamaları
                                </h2>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Fahri Eren ve fahrieren.com aşağıdaki durumlardan sorumlu değildir:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                    <li>Web sitesindeki bilgi hatalarından veya eksikliklerden</li>
                                    <li>Üçüncü taraf web sitelerine verilen linklerden</li>
                                    <li>Teknik arızalar, kesintiler veya erişim sorunlarından</li>
                                    <li>Kullanıcıların site kullanımından kaynaklanan zararlardan</li>
                                    <li>İnternet bağlantısı veya cihaz sorunlarından</li>
                                    <li>Yetkisiz erişim veya veri ihlallerinden (makul önlemler alınmış olsa da)</li>
                                </ul>
                                <p className="text-gray-700 leading-relaxed mt-4">
                                    Site "olduğu gibi" sunulmaktadır ve herhangi bir garanti verilmemektedir.
                                </p>
                            </section>

                            {/* Privacy */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                    8. Gizlilik ve Kişisel Veriler
                                </h2>
                                <p className="text-gray-700 leading-relaxed">
                                    Kişisel verilerinizin işlenmesi{' '}
                                    <a href="/gizlilik-politikasi" className="text-blue-600 hover:underline">
                                        Gizlilik Politikamızda
                                    </a>{' '}
                                    detaylı olarak açıklanmıştır. Web sitesini kullanarak Gizlilik Politikamızı
                                    kabul etmiş sayılırsınız.
                                </p>
                            </section>

                            {/* Links */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                    9. Üçüncü Taraf Bağlantılar ve Reklamlar
                                </h2>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Web sitemiz üçüncü taraf web sitelerine linkler içerebilir ve Google AdSense
                                    reklamları gösterir:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                    <li>Üçüncü taraf sitelerin içeriğinden sorumlu değiliz</li>
                                    <li>Reklamlar Google tarafından sağlanır ve kontrol edilir</li>
                                    <li>Reklam tıklamalarından kaynaklanan sonuçlardan sorumlu değiliz</li>
                                    <li>Üçüncü taraf sitelerin gizlilik politikalarını incelemenizi öneririz</li>
                                </ul>
                            </section>

                            {/* Termination */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                    10. Hizmet Durdurma
                                </h2>
                                <p className="text-gray-700 leading-relaxed">
                                    Fahri Eren, herhangi bir zamanda ve herhangi bir nedenle web sitesini veya
                                    hizmetlerin bir kısmını geçici veya kalıcı olarak durdurma hakkını saklı tutar.
                                    Kullanıcıları önceden bilgilendirmeye çalışırız ancak bu bir yükümlülük değildir.
                                </p>
                            </section>

                            {/* Changes */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                    11. Kullanım Koşullarında Değişiklikler
                                </h2>
                                <p className="text-gray-700 leading-relaxed">
                                    Bu Kullanım Koşullarını dilediğimiz zaman güncelleyebiliriz. Değişiklikler
                                    bu sayfada yayınlanacak ve "Son Güncelleme" tarihi güncellenecektir.
                                    Değişikliklerden sonra siteyi kullanmaya devam etmeniz, yeni koşulları
                                    kabul ettiğiniz anlamına gelir.
                                </p>
                            </section>

                            {/* Applicable Law */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                    12. Uygulanacak Hukuk ve Yetki
                                </h2>
                                <p className="text-gray-700 leading-relaxed">
                                    Bu Kullanım Koşulları Türkiye Cumhuriyeti yasalarına tabidir. Bu koşullardan
                                    doğan veya bunlarla ilgili tüm uyuşmazlıkların çözümünde Antalya Mahkemeleri
                                    ve İcra Daireleri yetkilidir.
                                </p>
                            </section>

                            {/* Contact */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">13. İletişim</h2>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Kullanım Koşulları hakkında sorularınız için bizimle iletişime geçebilirsiniz:
                                </p>
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <p className="text-gray-700 mb-2">
                                        <strong>İşletme:</strong> Fahri Eren - Eren Ticaret
                                    </p>
                                    <p className="text-gray-700 mb-2">
                                        <strong>Yetkili Kişi:</strong> Fahri Eren
                                    </p>
                                    <p className="text-gray-700 mb-2">
                                        <strong>Telefon:</strong> +90 532 617 16 35
                                    </p>
                                    <p className="text-gray-700 mb-2">
                                        <strong>E-posta:</strong> info@fahrieren.com
                                    </p>
                                    <p className="text-gray-700 mb-2">
                                        <strong>Web:</strong> www.fahrieren.com
                                    </p>
                                    <p className="text-gray-700">
                                        <strong>Adres:</strong> Yeşilova, Antalya, Türkiye
                                    </p>
                                </div>
                            </section>

                            {/* Acceptance */}
                            <section className="border-t pt-8 mt-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                    14. Kabul ve Onay
                                </h2>
                                <p className="text-gray-700 leading-relaxed">
                                    Bu web sitesini kullanarak, yukarıdaki tüm Kullanım Koşullarını okuduğunuzu,
                                    anladığınızı ve kabul ettiğinizi beyan edersiniz. Eğer bu koşulları kabul
                                    etmiyorsanız, lütfen sitemizi kullanmayın.
                                </p>
                                <p className="text-gray-700 leading-relaxed mt-4">
                                    <strong>Yürürlük Tarihi:</strong> 21 Ekim 2025
                                </p>
                            </section>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default TermsOfServicePage;
