import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/KhazarDictionary_logo_transparent.png';

const TermsContentAZ = () => {
    return (
        <div className='container'>

            <div className='text-center'>
                <Link to='/'>
                    <img className='pb-2 mt-5 border-bottom' src={logo} width='25%' alt='Khazar Dictionary Logo' />
                </Link>
            </div>

            <div className='mx-5'>

                <h3 className='text-center text-danger'>İstifadə Şərtləri</h3>
                <p>
                    Zəhmət olmasa bu istifadə şərtlərini diqqətlə oxuyunuz.
                    Bu internet saytını ziyarət edərək, burada yer alan məlumatları istifadə edərək və ya bu
                    internet saytına hər hansı bir məzmun əlavə edərək,
                    aşağıdakı istifadə şərtlərini qəbul etmiş sayılırsınız.
                    Əgər bu şərtləri qəbul etmirsinizsə, internet saytımıza giriş etməyiniz və istifadə etməyiniz xahiş olunur.
                </p>

                <h5>1. Sayt Məzmunu</h5>
                <p>
                    Bu internet saytı, Xəzər Universiteti tələbələri üçün hazırlanmış bir forum saytıdır.
                    Bu sayt, tələbələr arasında kommunikasiya, məlumat bölüşməsi, tədbir elanları, itirilmiş əşyaların elanları və sosial bağlar qurmaq məqsədilə hazırlanmışdır.
                    Saytda yer alan bütün məlumatlar, istifadəçilər arasında bölüşümlər vasitəsilə əldə edilir.
                    Bu səbəbdən, internet saytımızda yer alan məlumatları öz məsuliyyətinizdə istifadə etməlisiniz.
                </p>

                <h5>2. Saytın İstifadəsi</h5>
                <p>
                    Bu internet saytının istifadəsi, yerli və beynəlxalq qanunvericiliyə uyğun olmalıdır.
                    Bu internet saytını istifadə edərək, qanunsuz və ya zərərli fəaliyyətlərə baş verməyəcəyinizə razılaşmısız.
                </p>

                <h5>3. İstifadəçi Məsuliyyəti</h5>
                <p>
                    Bu internet saytını istifadə edərək, saytda olan məlumatları, göndərişləri, şərhləri və digər məzmunları paylaşa bilərsiniz.
                    Amma paylaşdığınız bütün məzmunların məsuliyyəti sizə aiddir.
                    Bu səbəbdən, paylaşdığınız məzmunların qanunlara uyğun, dürüst, doğru məzmunlar olduğundan və təhqir, qırğıçılıq, cinsiyyətçilik, pornografiya,
                    küçəltmək, digər qurumları zərər verən və s. məlumatlar içərmədiyindən əmin olun.
                    Bu cür qadağan edilmiş məzmunların paylaşılması halında, idarəçilərin məzmunların silinməsi və dəyişdirilməsi hüququ mövcuddur,
                    hətta ehtiyaclar halında idarəçilər məzmunu paylaşan istifadəçinin hesabını bağlaya, və ya tələb olunsa sayta girişi üçün tələb olunan təhsil e-poçtunu bloklaya bilərlər.
                </p>

                <h5>4. İstifadəçi Əməkdaşlığı</h5>
                <p>
                    Bu internet saytı tələbələr arasında kommunikasiya, məlumat bölüşməsi və sosial əlaqələr qurmağı məqsədilə hazırlanmışdır.
                    Buna görə də, digər istifadəçilərlə hörmətli bir şəkildə kommunikasiya qurmaq və onların hüquqlarını və gizliliyini qorumaq vacibdir.
                    Hər hansı bir münaqişə halında, problemi uyğun bir şəkildə həll etmək üçün digər istifadəçilərlə əməkdaşlıq etməlisiniz.
                </p>

                <h5>5. Itirilmiş Əşyaların Elanları</h5>
                <p>
                    Bu internet saytı, itirilmiş əşyaların elanlarına yer verir.
                    Lakin, saytda yer alan bu elanların doğruluğu və güvənilirliyi ilə bağlı heç bir məsuliyyət qəbul edilmir.
                </p>


                <h5>6. Sayt İçeriyinin İstifadəsi</h5>
                <p>
                    Bu internet saytında olan bütün məlumatlar, Xəzər Universitetinin tələbələri tərəfindən paylaşılan məlumatlardan ibarətdir.
                    Bu səbəbdən, internet saytımızda olan məlumatları öz məsuliyyətinizdə istifadə etməlisiniz. İnternet saytımızda olan məlumatlar,
                    yalnızca ümumi məlumat məqsədli olaraq verilir və hər hansı özəl məqsəd üçün istifadə edilə bilməz.
                </p>

                <h5>7. Sayt Təhlükəsizliyi</h5>
                <p>
                    Bu internet saytı, təhlükəsizliyin təmin edilməsi üçün lazım olan tədbirləri götürür və sizin məlumatlarınızın qorunmasını təmin edir.
                    Lakin, internet saytımızın təhlükəsizliyi və qorunması ilə bağlı heç bir şərtlər təmin etmirik.
                </p>


                <h5>8. İstifadəçi Məlumatlarının Saxlanılması</h5>
                <p>
                    Bu internet saytı, istifadəçilərin məktəb e-poçtları,
                    qeydiyyat zamanı göstərilən istifadəçi adları, görünən adları,
                    şifrələri və istifadəçilər tərəfindən paylaşılan məqalə məzmunları kimi müxtəlif məlumatları toplayır.
                    Bu məlumatlar, sayt tərəfindən idarə olunan bir verilənlər bazasında saxlanılır və
                    hər hansı bir üçüncü tərəf şirkəti ilə pul mənşəli paylaşılmır.
                </p>

                <h5>9. Fikri Mülkiyyət Haqları</h5>
                <p>
                    Bu internet saytı, müəllif hüququ, marka, ticarət sirri və digər fikri mülkiyyət
                    haqlarına tabi materialları əhatə edə bilər. Bu materiallar, internet sitemizin sahibi və ya
                    lisenziya sahibi tərəfindən qorunur. Saytımızda olan heç bir material, icazə olunmadan kopyalanamaz,
                    yayımlanamaz, yenidən istehsal edilə bilməz və ya istifadə edilə bilməz. Saytda fikri mülkiyyət hüququ
                    başqasında olan məzmunların paylaşılması və ya pozulması halında məsuliyyət paylaşan tərəfdə olacaq.
                    Sayt idarəçiləri belə paylaşımları silmək hüququna malikdirlər.
                </p>


                <h5>10. Başqa Saytlara Keçidlər</h5>
                <p>
                    Bu internet saytı, başqa saytlara keçidlər daxil edə bilər.
                    Bu keçidlər, məlumat məqsədilə təqdim olunur və internet saytımızın sahibi,
                    keçidlər olan saytların məzmunundan və ya təhlükəsizliyindən məsuliyyət daşımır.
                </p>

                <h5>11. Dəyişikliklər</h5>
                <p>
                    Bu internet saytının istifadə şərtləri,
                    hər hansı bir zamanda dəyişdirilə bilər. Bundan səbəb, bu səhifəni düzgün aralıqlarla yoxlayın.
                </p>

                <h5>12. Əlaqə</h5>
                <p>
                    Bu internet saytı ilə bağlı hər hansı bir sualınız,
                    təklifiniz və ya şikayətiniz varsa, bizimlə əlaqə saxlamaqdan çəkinməyin.
                    Əlaqə məlumatları, internet saytımızda yer alır.
                </p>

                <p className='text-muted'>Son Yeniləmə Tarixi: 21/04/2023</p>


            </div>


        </div>
    );
}

export default TermsContentAZ;