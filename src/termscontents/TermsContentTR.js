import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/KhazarDictionary_logo_transparent.png';

const TermsContentTR = () => {
    return (
        <div className='container'>

            <div className='text-center'>
                <Link to='/'>
                    <img className='pb-2 mt-5 border-bottom' src={logo} width='25%' alt='Khazar Dictionary Logo' />
                </Link>
            </div>

            <div className='mx-5'>

                <h3 className='text-center text-danger'>Kullanım Koşulları</h3>
                <p>
                    Lütfen bu kullanım koşullarını dikkatlice okuyunuz.
                    Bu internet sitesini ziyaret ederek, burada yer alan bilgileri kullanarak ya da bu internet sitesine herhangi bir içerik ekleyerek,
                    aşağıdaki kullanım koşullarını kabul etmiş sayılırsınız. Eğer bu koşulları kabul etmiyorsanız, internet sitemize erişmeyiniz ve kullanmayınız.
                </p>

                <h5>1. Site İçeriği</h5>
                <p>
                    Bu internet sitesi, Khazar University öğrencileri için hazırlanmış bir forum sitesidir.
                    Bu site, öğrenciler arasında iletişim, bilgi paylaşımı, etkinlik duyuruları, kayıp eşya ilanları ve sosyal bağlar kurmak amacıyla hazırlanmıştır.
                    Sitede yer alan tüm bilgiler, kullanıcılar arasında yapılan paylaşımlardan oluşmaktadır.
                    Bu nedenle, internet sitemizde yer alan bilgileri kendi sorumluluğunuzda kullanmanız gerekmektedir.
                </p>

                <h5>2. Site Kullanımı</h5>
                <p>
                    Bu internet sitesinin kullanımı, tüm yerel ve uluslararası yasalara uygun olmalıdır.
                    Bu internet sitesini kullanarak, yasadışı veya zararlı faaliyetlerde bulunmayacağınızı kabul edersiniz.
                </p>

                <h5>3. Kullanıcı Sorumluluğu</h5>
                <p>
                    Bu internet sitesini kullanarak, sitede yer alan bilgileri, gönderileri, yorumları ve diğer içerikleri paylaşabilirsiniz.
                    Ancak, paylaştığınız tüm içeriklerin sorumluluğu size aittir.
                    Bu nedenle, paylaştığınız içeriklerin yasalara uygun, dürüst, doğru içerikler olduğundan ve hakaret, ırkçlılık, cinsiyetçilik, pornografik,
                    küçük düşürücü, başka kurumları zedeleyen vb. bilgiler içermeyen içerikler olduğundan emin olunuz.
                    Bu tarz yasak içeriklerin paylaşılması durumunda yöneticilerin içeriklerin kaldırılması ve değiştirilmesi hakkı bulunmaktadır,
                    hatta ihtiyaç halinde yöneticiler ilgili içeriği paylaşan kullanıcının hesabının kapatabilir ve okul e-postasını site de yasaklayabilir.
                </p>

                <h5>4. Kullanıcı İşbirliği</h5>
                <p>
                    Bu internet sitesi, öğrenciler arasında iletişim, bilgi paylaşımı ve sosyal bağlar kurmayı amaçlamaktadır.
                    Bu nedenle, diğer kullanıcılarla saygılı bir şekilde iletişim kurmanız ve diğer kullanıcıların haklarını ve gizliliğini korumanız gerekmektedir.
                    Herhangi bir uyuşmazlık yaşamanız durumunda, sorununuzu uygun bir şekilde çözmek için diğer kullanıcılarla işbirliği yapmanız gerekmektedir.
                </p>

                <h5>5. Kayıp Eşya İlanları</h5>
                <p>
                    Bu internet sitesi, kayıp eşya ilanlarına yer vermektedir.
                    Ancak, sitede yer alan bu ilanların doğruluğu ve güvenilirliği hakkında herhangi bir sorumluluk kabul edilmemektedir.
                </p>

                <h5>6. Site İçeriğinin Kullanımı</h5>
                <p>
                    Bu internet sitesinde yer alan tüm içerikler, Khazar University öğrencileri tarafından paylaşılan bilgilerden oluşmaktadır.
                    Bu nedenle, internet sitemizde yer alan bilgileri kendi sorumluluğunuzda kullanmanız gerekmektedir. İnternet sitemizde yer alan bilgiler,
                    yalnızca genel bilgi amaçlıdır ve herhangi bir özel amaç için kullanılamaz.
                </p>

                <h5>7. Site Güvenliği</h5>

                <p>
                    Bu internet sitesi, güvenliği sağlamak için gerekli önlemleri almakta ve bilgilerinizi korumaktadır.
                    Ancak, internet sitemizin güvenliği ve korunması konusunda herhangi bir garanti vermemekteyiz.
                </p>

                <h5>8. Kullanıcı Verilerinin Tutulması</h5>
                <p>
                    Bu internet sitesi, kullanıcıların okul e-postaları,
                    kayıt esnasında kullanıcı tarafından belirtilen kullanıcı adları, görünen adları,
                    şifreleri ve kullanıcılar tarafından paylaşılan gönderilerin içerikleri dahil olmak üzere çeşitli verileri toplamaktadır.
                    Bu veriler, site tarafından yönetilen bir veritabanında saklanmaktadır ve herhangi bir üçüncü taraf şirketiyle para karşılığında paylaşılmamaktadır.
                </p>

                <h5>9. Fikri Mülkiyet Hakları</h5>
                <p>
                    Bu internet sitesi, telif hakkı, marka, ticari sır ve diğer fikri mülkiyet haklarına tabi materyaller içerebilir.
                    Bu materyaller, internet sitemizin sahibi veya lisans sahibi tarafından korunmaktadır. İnternet sitemizde yer alan hiçbir materyal,
                    izin alınmadan kopyalanamaz, dağıtılamaz, yeniden üretilemez veya kullanılamaz.
                    Sitede fikri mülkiyet hakkı başkasında olan içeriklerin paylaşılması veya ihlaline yönelik yayın yapılması durumunda sorumluluk
                    paylaşımı yapanda olacaktır. Siteyöneticileri bu tip paylaşımları kaldırma hakkına sahiptir.
                </p>

                <h5>10. Diğer Sitelere Bağlantılar</h5>
                <p>
                    Bu internet sitesi, diğer sitelere bağlantılar içerebilir.
                    Bu bağlantılar, bilgi amaçlıdır ve internet sitemizin sahibi, bağlantılar içeren sitelerin içeriğinden veya güvenliğinden sorumlu değildir.
                </p>

                <h5>11. Değişiklikler</h5>
                <p>
                    Bu internet sitesinin kullanım koşulları, herhangi bir zamanda değiştirilebilir. Bu nedenle, bu sayfayı düzenli olarak kontrol etmeniz önerilir.
                </p>

                <h5>12. İletişim</h5>
                <p>
                    Bu internet sitesi hakkında herhangi bir sorunuz,
                    öneriniz veya şikayetiniz varsa, bizimle iletişime geçmekten çekinmeyin. İletişim bilgileri, internet sitemizde yer almaktadır.
                </p>

                <p className='text-muted'>Son Güncelleme Tarihi: 21/04/2023</p>

            </div>


        </div>
    );
}

export default TermsContentTR;